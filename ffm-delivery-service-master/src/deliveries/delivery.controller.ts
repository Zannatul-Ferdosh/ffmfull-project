import { Controller, Get, Post, Body, Param, Put, UseGuards, UsePipes, UseInterceptors,  UploadedFile, Res, Headers, UploadedFiles } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { AssignDeliveryDTO } from './assign-deliveries.dto';
import { GiveAttendenceDTO } from './give-deliveries.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { AdminAuthGuard } from '../shared/admin-auth.guard';
import { AddFeedbackDTO } from './add-feedback.dto';
import { diskStorage } from  'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { UpdatePaymentStatusDTO } from './payment-status.dto';
import { RemoveDeliveryDto } from './remove-delivery.dto';
import { ApiTags,ApiHeader,ApiResponse,ApiNotFoundResponse,ApiInternalServerErrorResponse,ApiBody,ApiBearerAuth, ApiConsumes, ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiHeader({
  name: 'bearer',
  description: 'Authorization Token',
})
@ApiBearerAuth('access-token')
@Controller('api/v1/field-force/delivery/deliveries')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService){}
  
  @Post()
  @ApiTags('deliveries')   
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiResponse({ status: 409, description: 'Data Already Exist , please use update api for update.'})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @ApiBody({
      description: 'Assigned Delivery',
      type: AssignDeliveryDTO
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(new AdminAuthGuard())
  assignUserToDeliveries(@Body() data:AssignDeliveryDTO) {
    return  this.deliveryService.assignUserToDeliveries(data);
  }

  @Post('/update-deliveries/:id')
  @ApiTags('deliveries')   
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiResponse({ status: 409, description: 'Data Already Exist , please use update api for update.'})
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @ApiBody({
      description: 'Updated Delivery',
      type: AssignDeliveryDTO
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(new AdminAuthGuard())
  updateDeliveries(@Body() data:Partial<AssignDeliveryDTO>,@Param('id') id:number) {
    return  this.deliveryService.updateDeliveries(data,id);
  }

  @Post('/remove-deliveries')
  @ApiTags('deliveries')   
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiResponse({ status: 409, description: 'Data Already Exist , please use update api for update.'})
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @ApiBody({
      description: 'Removed Delivery',
      type: RemoveDeliveryDto
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(new AdminAuthGuard())
  removeUserFromDeliveries(@Body() data:RemoveDeliveryDto) {
    return  this.deliveryService.removeDelivery(data);
  }

  @Get('/get-delivery/:id')
  @ApiTags('deliveries')   
  @ApiResponse({ status: 200, description: 'record list'})
  @ApiResponse({ status: 403, description: 'Jwt Token Error.'})
  @ApiNotFoundResponse({description: 'Request not found'})
  @UsePipes(new ValidationPipe())
  @UseGuards(new AdminAuthGuard())
  getDeliveryById(@Param('id') id:number) {
    return  this.deliveryService.getDeliveryById(id);
  }

  @Get('/admin/delivery-list/:id')
  @ApiTags('deliveries')   
  @ApiResponse({ status: 200, description: 'record list'})
  @ApiResponse({ status: 403, description: 'Jwt Token Error.'})
  @ApiNotFoundResponse({description: 'Request not found'})
  @UseGuards(new AdminAuthGuard())
  adminAttendenceList(@Param('id') id:number) {
    return  this.deliveryService.getAdminAssignedDeliveryList(id);
  }

  @Put('/user-deliveries')
  @ApiTags('deliveries')   
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiResponse({ status: 409, description: 'Data Already Exist , please use update api for update.'})
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @ApiBody({
      description: 'Give Delivery',
      type: GiveAttendenceDTO
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  giveAttendence(@Body() data:GiveAttendenceDTO){
    return this.deliveryService.giveDeliveries(data)
  }


  @Get('/user/deliveries-list/:id')
  @ApiTags('deliveries')   
  @ApiResponse({ status: 200, description: 'record list'})
  @ApiResponse({ status: 403, description: 'Jwt Token Error.'})
  @ApiNotFoundResponse({description: 'Request not found'})
  @UseGuards(new AuthGuard())
  getUserDeliveryList(@Param('id') id:number){
    return this.deliveryService.getUserDeliveryList(id);
  }

  @Get("/user/delivery-details/:id")
  @ApiTags('deliveries')   
  @ApiResponse({ status: 200, description: 'record list'})
  @ApiResponse({ status: 403, description: 'Jwt Token Error.'})
  @ApiNotFoundResponse({description: 'Request not found'})
  @UseGuards(new AuthGuard())
  getDeliveryDetails(@Param('id') id:number){
    return this.deliveryService.getDeliveryDetails(id);
  }

  @Post("/user/give-delivery-feedback")
  @ApiTags('deliveries')   
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiResponse({ status: 409, description: 'Data Already Exist , please use update api for update.'})
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @ApiBody({
      description: 'Added Feedback',
      type: AddFeedbackDTO
  })
  @UseGuards(new AuthGuard())
  giveDeliveryFeedback(@Body() data:AddFeedbackDTO){
    return this.deliveryService.giveDeliveryFeedback(data);
  }

  @Post("/user/update-delivery-payment-status")
  @ApiTags('deliveries')   
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiResponse({ status: 409, description: 'Data Already Exist , please use update api for update.'})
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @ApiBody({
      description: 'Updated Payment',
      type: UpdatePaymentStatusDTO
  })
  @UseGuards(new AuthGuard())
  updatePaymentStatus(@Body() data:UpdatePaymentStatusDTO){
    return this.deliveryService.updatePaymentStatus(data);
  }



  @Post('/avatar/upload/:userId/:fieldDeliveryId')
  @ApiTags('deliveries')   
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiResponse({ status: 409, description: 'Data Already Exist , please use update api for update.'})
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @UseGuards(new AuthGuard())
  @UseInterceptors(FileInterceptor('image'))
  uploadedFile(
    @UploadedFile() file,
    @Param('userId') user_id:number,
    @Param('fieldDeliveryId') field_delivery_id:number,
  ) {
    return this.deliveryService.setAvatar(user_id,field_delivery_id,file);
  }


  @ApiExcludeEndpoint()
  @Get('/:imgpath')
  @UseGuards(new AuthGuard())
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  

  

   

  


}