
import { Injectable, HttpStatus, HttpService, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryEntity } from './delivery.entity';
import { Repository } from 'typeorm';
import { DeliveryAlbumsEntity } from './albums.entity';
import { DeliveryPhotosEntity } from './photos.entity';
const Cloud = require('@google-cloud/storage')
const path = require('path')
const CLOUD_BUCKET = "field-force-app-images";

const fs = require("fs");
import { v4 as uuidv4 } from 'uuid';
import { log } from 'util';


const { Storage } = Cloud
const storage = new Storage({
  keyFilename: './groovy-medium-257215-caee3108960b.json',
  projectId: 'techserve4u',
})




@Injectable()
export class DeliveryService {
    constructor( 
        @InjectRepository(DeliveryEntity) private deliveryRepository:Repository<DeliveryEntity>,
        @InjectRepository(DeliveryAlbumsEntity) private albumRepository:Repository<DeliveryAlbumsEntity>,
        @InjectRepository(DeliveryPhotosEntity) private photoRepository:Repository<DeliveryPhotosEntity>,
        private readonly httpService: HttpService
    ){}

    async assignUserToDeliveries(payload){
        try{
            const user = await this.deliveryRepository.query(`SELECT COUNT(id) FROM users WHERE id=${payload.user_id}`);
            if(user[0].count == 0){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message": `User with id ${payload.user_id} does not exist.`
                };
            }else{
                let deliveries = new DeliveryEntity();
                deliveries.title = payload.title;
                deliveries.assigned_delivery_time = payload.assigned_delivery_time;
                deliveries.assigned_location_lattitude = payload.assigned_location_lattitude;
                deliveries.assigned_location_longitude = payload.assigned_location_longitude;
                deliveries.user_id = payload.user_id;
                deliveries.delivery_status = false;
                deliveries.payment_status = false;
                deliveries.admin_id = payload.admin_id;
                deliveries.client_address = payload.client_address;
                deliveries.client_name = payload.client_name;
                deliveries.bill_amount = payload.bill_amount ? payload.bill_amount : 0;
                deliveries.is_paid = payload.is_paid;
                let data = await this.deliveryRepository.save(deliveries);
    
                return {
                    "status":true,
                    "statusCode":HttpStatus.CREATED,
                    "data":data,
                    "message":"Delivery Assigned Successfully"
                };
            }
            
        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }
        
    }

    async updateDeliveries(payload,id){
        try{
            let deliveries = await this.deliveryRepository.findOne({ where: {id:id}});

            if(!deliveries){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_ACCEPTABLE,
                    "message":"Delivery not found"
                };
            }

            const updatedDeliveries = await this.deliveryRepository.update(id,payload);
            if(updatedDeliveries.affected){
                return {
                    "status":true,
                    "statusCode":HttpStatus.OK,
                    "message":"Delivery updated successfully",
                };
            }

        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }
    }

    async removeDelivery(payload){
        try{
            let deliveries = await this.deliveryRepository.findOne({ where: {id:payload.field_delivery_id,user_id:payload.user_id}});

            if(!deliveries){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_ACCEPTABLE,
                    "message":"Delivery not found"
                };
            }

            const deletedDeliveries = await this.deliveryRepository.delete(payload.field_delivery_id);
            if(deletedDeliveries.affected){
                return {
                    "status":true,
                    "statusCode":HttpStatus.OK,
                    "message":"Delivery deleted successfully"
                };
            }

        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }
    }

    async getDeliveryById(id){
        try{

            let details = {
                deliveries:[],
                photo_urls:[]
            };


            const data = await this.deliveryRepository.query(
                `SELECT field_deliveries.*,main_user.first_name AS user_name,admin_user.first_name AS admin_name
                FROM field_deliveries 
                LEFT JOIN dashboard_users  AS admin_user ON field_deliveries.admin_id = admin_user.id
                LEFT JOIN users  AS main_user ON field_deliveries.user_id = main_user.id
                WHERE field_deliveries.id = ${id}
                `
            );

            if(data.length == 0){
                return {
                    "status":false,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message":"Field delivery does not exist"
                };
            }



            const albums = await this.albumRepository.findOne({where:{field_delivery_id:id}});
            if(!albums){
                data.forEach(element => {
                    details.deliveries.push(element);
                });
                return {
                    "status":true,
                    "statusCode":HttpStatus.FOUND,
                    "data":details
                };
            }
            const photo_urls = await this.photoRepository.find({where:{delivery_album_id:albums.id}});

            let photo_url = [];
            photo_urls.forEach(element => {
                photo_url.push(element.photo_url);
            });

            data.forEach(element => {
                details.deliveries.push(element);
            });
            details.photo_urls.push(photo_url);
            if(data.length){
                return {
                    "status":true,
                    "statusCode":HttpStatus.FOUND,
                    "data":details
                };
            }

            
            
        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }
    }

    async getAdminAssignedDeliveryList(id){
        try{
            const data = await this.deliveryRepository.query(`
            SELECT field_deliveries.*,
            dashboard_users.first_name AS admin_first_name,dashboard_users.last_name AS admin_last_name,
            dashboard_users.phone_number AS admin_phone,
            users.first_name AS user_first_name,users.last_name AS user_last_name,
            users.phone_number AS user_phone
            FROM field_deliveries 
            LEFT JOIN dashboard_users ON field_deliveries.admin_id = dashboard_users.id
            LEFT JOIN users ON field_deliveries.user_id = users.id
            WHERE field_deliveries.admin_id = ${id}
            `);
            if(data.length == 0){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NO_CONTENT,
                    "data":data,
                    "message":"No data found"
                };
            }
            return {
                "status":true,
                "statusCode":HttpStatus.OK,
                "data":data
            };
        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }
    }

    async giveDeliveries(payload){
        try{
            //const data = await this.attendenceRepository.create(payload);
            let deliveries = await this.deliveryRepository.findOne({ where: {id:payload.field_delivery_id,user_id:payload.user_id}});

            if(deliveries){
                if(deliveries.album_id){
                    return {
                        "status":true,
                        "statusCode":HttpStatus.NOT_ACCEPTABLE,
                        "message":"Deliveries already given"
                    };
                }
                let album = new DeliveryAlbumsEntity();
                album.field_delivery_id = payload.field_delivery_id;
                let createdAlbum = await this.albumRepository.save(album);
                
                let data =  await this.deliveryRepository.update({id:payload.field_delivery_id},{
                    delivery_time : payload.delivery_time,
                    delivery_location_lattitude:payload.delivery_location_lattitude,
                    delivery_location_longitude: payload.delivery_location_longitude,
                    delivery_status:true,
                    album_id:createdAlbum.id
                })

                if(data.affected){
                    return {
                        "status":true,
                        "statusCode":HttpStatus.CREATED,
                        "message":"Deliveries given successfully"
                    };
                }else{
                    return {
                        "status":true,
                        "statusCode":HttpStatus.NOT_MODIFIED,
                        "message":"Delivery failed"
                    };
                }
            }else{
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message":"Field delivery does not exist"
                };
            }
            


            
        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }
    }

    async getUserDeliveryList(id){
        try{
            const data = await this.deliveryRepository.find({ where: {user_id:id}});
            if(!data.length){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NO_CONTENT,
                    "data":data,
                    "message":"No data found"
                };
            }
            return {
                "status":true,
                "statusCode":HttpStatus.OK,
                "data":data
            };
        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }
    }

    async getDeliveryDetails(id){
        try{

            let details = {
                deliveries:[],
                photo_urls:[]
            };


            const data = await this.deliveryRepository.query(
                `SELECT field_deliveries.*,main_user.first_name AS user_name,admin_user.first_name AS admin_name
                FROM field_deliveries 
                LEFT JOIN dashboard_users  AS admin_user ON field_deliveries.admin_id = admin_user.id
                LEFT JOIN users  AS main_user ON field_deliveries.user_id = main_user.id
                WHERE field_deliveries.id = ${id}
                `
            );

            if(data.length == 0){
                return {
                    "status":false,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message":"Field delivery does not exist"
                };
            }



            const albums = await this.albumRepository.findOne({where:{field_delivery_id:id}});
            if(!albums){
                data.forEach(element => {
                    details.deliveries.push(element);
                });
                return {
                    "status":true,
                    "statusCode":HttpStatus.FOUND,
                    "data":details
                };
            }
            const photo_urls = await this.photoRepository.find({where:{delivery_album_id:albums.id}});

            let photo_url = [];
            photo_urls.forEach(element => {
                photo_url.push(element.photo_url);
            });

            data.forEach(element => {
                details.deliveries.push(element);
            });
            details.photo_urls.push(photo_url);
            if(data.length){
                return {
                    "status":true,
                    "statusCode":HttpStatus.FOUND,
                    "data":details
                };
            }

            
            
        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }
    }

    async giveDeliveryFeedback(payload){

        try{
            const attendences = await this.deliveryRepository.find({ where: {id:payload.field_delivery_id,user_id:payload.user_id}});
            if(!attendences.length){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message":"Field delivery does not exist"
                };
            }

            await this.deliveryRepository.update(payload.field_delivery_id,{
                note:payload.feedback
            })

            return {
                "status":true,
                "statusCode":HttpStatus.OK,
                "message":"Feedback given successfully"
            }

        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }

    }


    async updatePaymentStatus(payload){

        try{
            const deliveries = await this.deliveryRepository.find({ where: {id:payload.field_delivery_id,user_id:payload.user_id}});
            if(!deliveries.length){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message":"Field delivery does not exist"
                };
            }

            await this.deliveryRepository.update(payload.field_delivery_id,{
                payment_status:true
            })

            return {
                "status":true,
                "statusCode":HttpStatus.OK,
                "message":"Payment status update successfully"
            }

        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }

    }

    async setAvatar(user_id,field_delivery_id,file){
        console.log(file);
        try{
            const deliveries = await this.deliveryRepository.findOne({ where: {id:field_delivery_id,user_id:user_id}});
            if(!deliveries){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message":"Field delivery does not exist"
                };
            }
            if(!deliveries.delivery_status){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_ACCEPTABLE,
                    "message":"Please give delivery first, then upload"
                };
            }

            const bucket = await storage.bucket(CLOUD_BUCKET);


            const { originalname, buffer } = file
            const type = await file.mimetype.split('/')[1];
            const blob = bucket.file(uuidv4()+originalname.replace(/ /g, "_"));

                


            const blobStream = blob.createWriteStream({
                resumable: true,
                contentType: type,
            })
            await blobStream.on('finish', () => {
                
                log("file uploaded");
                console.log('finished');
            })
            .on('error', (err) => {
                log(`Unable to upload image, something went wrong`);
                log(err);
                console.log(err);
            })
            .end(buffer)

            let photos = new DeliveryPhotosEntity;
            photos.delivery_album_id = deliveries.album_id;
            photos.photo_url = `https://files.techserve4u.com/${blob.name}`;
            await this.photoRepository.save(photos);

            return {
                success: true,
                "statusCode":HttpStatus.OK,
                "message":"Photos added successfully",
                fileUrl: `https://files.techserve4u.com/${blob.name}`
            }

        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }
    }

    



  

  
}