
import { Injectable, HttpStatus, HttpService, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendenceEntity } from './attendences.entity';
import { Repository } from 'typeorm';
import { AlbumsEntity } from './albums.entity';
import { PhotosEntity } from './photos.entity';
const Cloud = require('@google-cloud/storage')
const path = require('path')
const CLOUD_BUCKET = "field-force-app-images";

import { Logger } from '@nestjs/common';
import mime from 'mime-types';


const fs = require("fs");
import { v4 as uuidv4 } from 'uuid';
import { log } from 'util';
import { finished } from 'stream';


const { Storage } = Cloud
const storage = new Storage({
  keyFilename: './groovy-medium-257215-caee3108960b.json',
  projectId: 'techserve4u',
})




@Injectable()
export class AttendencesService {
    constructor( 
        @InjectRepository(AttendenceEntity) private attendenceRepository:Repository<AttendenceEntity>,
        @InjectRepository(AlbumsEntity) private albumRepository:Repository<AlbumsEntity>,
        @InjectRepository(PhotosEntity) private photoRepository:Repository<PhotosEntity>,
        private readonly httpService: HttpService
    ){}

    async assignUserToAttendence(payload){
        try{
            const user = await this.attendenceRepository.query(`SELECT COUNT(id) FROM users WHERE id=${payload.user_id}`);
            if(user[0].count == 0){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message": `User with id ${payload.user_id} does not exist.`
                };
            }else{
                let attendences = new AttendenceEntity();
                attendences.title = payload.title;
                attendences.assigned_time = payload.assigned_time;
                attendences.assigned_location_lattitude = payload.assigned_location_lattitude;
                attendences.assigned_location_longitude = payload.assigned_location_longitude;
                attendences.user_id = payload.user_id;
                attendences.attendence_status = payload.attendence_status;
                attendences.admin_id = payload.admin_id;
                attendences.address = payload.address;
                let data = await this.attendenceRepository.save(attendences);
    
                return {
                    "status":true,
                    "statusCode":HttpStatus.CREATED,
                    "data":data
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

    async removeAttendence(payload){
        try{
            let attendences = await this.attendenceRepository.findOne({ where: {id:payload.field_attendence_id,user_id:payload.user_id}});

            if(!attendences){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_ACCEPTABLE,
                    "message":"Attendence not found"
                };
            }

            const deletedAttendence = await this.attendenceRepository.delete(payload.field_attendence_id);
            if(deletedAttendence.affected){
                return {
                    "status":true,
                    "statusCode":201,
                    "message":"Attendence deleted successfully"
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

    async updateAttendence(payload,id){
        try{
            let attendences = await this.attendenceRepository.findOne({ where: {id:id}});

            if(!attendences){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_ACCEPTABLE,
                    "message":"Attendence not found"
                };
            }

            const updatedAttendence = await this.attendenceRepository.update(id,payload);
            if(updatedAttendence.affected){
                return {
                    "status":true,
                    "statusCode":201,
                    "message":"Attendence updated successfully",
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

    async getAttendenceById(id){
        try{

            let details = {
                attendence:[],
                photo_urls:[]
            };
            
            const data = await this.attendenceRepository.query(
                `SELECT field_attendence.*,main_user.first_name AS user_name,admin_user.first_name AS admin_name
                FROM field_attendence 
                LEFT JOIN dashboard_users  AS admin_user ON field_attendence.admin_id = admin_user.id
                LEFT JOIN users  AS main_user ON field_attendence.user_id = main_user.id
                WHERE field_attendence.id = ${id}
                `
            );

            if(data.length == 0){
                return {
                    "status":false,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message":"Field attendence does not exist"
                };
            }
            

            const albums = await this.albumRepository.findOne({where:{field_attendence_id:id}});
            if(!albums){
                data.forEach(element => {
                    details.attendence.push(element);
                });
                return {
                    "status":true,
                    "statusCode":HttpStatus.FOUND,
                    "data":details
                };

            }

            const photo_urls = await this.photoRepository.find({where:{album_id:albums.id}});

            let photo_url = [];
            photo_urls.forEach(element => {
                photo_url.push(element.photo_url);
            });

            

            data.forEach(element => {
                details.attendence.push(element);
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

    async getAdminAssignedAttendenceList(id){
        try{
            const data = await this.attendenceRepository.query(`
                SELECT field_attendence.*,
                dashboard_users.first_name AS admin_first_name,dashboard_users.last_name AS admin_last_name,
                dashboard_users.phone_number AS admin_phone,
                users.first_name AS user_first_name,users.last_name AS user_last_name,
                users.phone_number AS user_phone
                FROM field_attendence 
                LEFT JOIN dashboard_users ON field_attendence.admin_id = dashboard_users.id
                LEFT JOIN users ON field_attendence.user_id = users.id
                WHERE field_attendence.admin_id = ${id}
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

    async giveAttendence(payload){
        try{
            //const data = await this.attendenceRepository.create(payload);
            let attendences = await this.attendenceRepository.findOne({ where: {id:payload.field_attendence_id,user_id:payload.user_id}});

            if(attendences){
                if(attendences.album_id){
                    return {
                        "status":true,
                        "statusCode":HttpStatus.NOT_ACCEPTABLE,
                        "message":"Attendence already given"
                    };
                }
                let album = new AlbumsEntity();
                album.field_attendence_id = payload.field_attendence_id;
                let createdAlbum = await this.albumRepository.save(album);
                
                let data =  await this.attendenceRepository.update({id:payload.field_attendence_id},{
                    attendence_time : payload.attendence_time,
                    attendence_location_lattitude:payload.attendence_location_lattitude,
                    attendence_location_longitude: payload.attendence_location_longitude,
                    attendence_status:payload.attendence_status,
                    album_id:createdAlbum.id
                })

                if(data.affected){
                    return {
                        "status":true,
                        "statusCode":HttpStatus.OK,
                        "message":"Attendence given successfully"
                    };
                }else{
                    return {
                        "status":true,
                        "statusCode":HttpStatus.NOT_MODIFIED,
                        "message":"Attendence given failed"
                    };
                }
            }else{
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message":"Field attendence does not exist"
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

    async getUserAttendenceList(id){
        try{
            const data = await this.attendenceRepository.find({ where: {user_id:id}});
            console.log(data.length);
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

    async getAttendenceDeatils(id){
        try{

            let details = {
                attendence:[],
                photo_urls:[]
            };
            
            const data = await this.attendenceRepository.query(
                `SELECT field_attendence.*,main_user.first_name AS user_name,admin_user.first_name AS admin_name
                FROM field_attendence 
                LEFT JOIN dashboard_users  AS admin_user ON field_attendence.admin_id = admin_user.id
                LEFT JOIN users  AS main_user ON field_attendence.user_id = main_user.id
                WHERE field_attendence.id = ${id}
                `
            );

            if(data.length == 0){
                return {
                    "status":false,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message":"Field attendence does not exist"
                };
            }
            

            const albums = await this.albumRepository.findOne({where:{field_attendence_id:id}});
            if(!albums){
                data.forEach(element => {
                    details.attendence.push(element);
                });
                return {
                    "status":true,
                    "statusCode":HttpStatus.OK,
                    "data":details
                };

            }

            const photo_urls = await this.photoRepository.find({where:{album_id:albums.id}});

            let photo_url = [];
            photo_urls.forEach(element => {
                photo_url.push(element.photo_url);
            });

            

            data.forEach(element => {
                details.attendence.push(element);
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

    async giveAttendenceFeedback(payload){

        try{
            const attendences = await this.attendenceRepository.find({ where: {id:payload.field_attendence_id,user_id:payload.user_id}});
            if(!attendences.length){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message":"Field attendence does not exist"
                };
            }

            await this.attendenceRepository.update(payload.field_attendence_id,{
                comment:payload.feedback
            })

            return {
                "status":true,
                "statusCode":201,
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

    async setAvatar(user_id,field_attendence_id,file){
        console.log(file);
        try{
            const attendences = await this.attendenceRepository.findOne({ where: {id:field_attendence_id,user_id:user_id}});
            if(!attendences){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_FOUND,
                    "message":"Field attendence does not exist"
                };
            }
            if(!attendences.attendence_status){
                return {
                    "status":true,
                    "statusCode":HttpStatus.NOT_ACCEPTABLE,
                    "message":"Please give attendence first, then upload"
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

                let photos = new PhotosEntity;
                photos.album_id = attendences.album_id;
                photos.photo_url = `https://files.techserve4u.com/${blob.name}`;
                await this.photoRepository.save(photos);


                return {
                    success: true,
                    "statusCode":201,
                    "message":"Photos added successfully",
                    fileUrl: `https://files.techserve4u.com/${blob.name}`
                };

               

           

        }catch(err){
            return {
                "status":false,
                "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
                "message":err.message
            };
        }
    }


    // async setAvatar(user_id,field_attendence_id,file_name){
    //     try{
    //         const attendences = await this.attendenceRepository.findOne({ where: {id:field_attendence_id,user_id:user_id}});
    //         if(!attendences){
    //             return {
    //                 "status":true,
    //                 "statusCode":HttpStatus.NOT_FOUND,
    //                 "message":"Field attendence does not exist"
    //             };
    //         }
    //         let photos = new PhotosEntity;
    //         photos.album_id = attendences.album_id;
    //         photos.photo_url = `${file_name}`;
    //         await this.photoRepository.save(photos);

    //         return {
    //             "status":true,
    //             "statusCode":HttpStatus.OK,
    //             "message":"Photos added successfully"
    //         }

    //     }catch(err){
    //         return {
    //             "status":false,
    //             "statusCode":HttpStatus.INTERNAL_SERVER_ERROR,
    //             "message":err.message
    //         };
    //     }
    // }



  

  
}