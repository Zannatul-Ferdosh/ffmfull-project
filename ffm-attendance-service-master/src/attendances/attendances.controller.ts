import { Controller, Get, Post, Body, Param, Put, UseGuards, UsePipes, UseInterceptors,  UploadedFile, Res, Headers, UploadedFiles, Delete } from '@nestjs/common';
import { AttendencesService } from './attendences.service';
import { AssignAttendenceDTO } from './assign-attendence.dto';
import { GiveAttendenceDTO } from './give-attendence.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { AdminAuthGuard } from '../shared/admin-auth.guard';
import { ApiTags,ApiHeader,ApiResponse,ApiNotFoundResponse,ApiInternalServerErrorResponse,ApiBody,ApiBearerAuth, ApiConsumes, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AddFeedbackDTO } from './add-feedback.dto';
import { diskStorage } from  'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { extname } from 'path';
import { RemoveAttendenceDto } from './remove-attendence.dto';

@ApiHeader({
  name: 'bearer',
  description: 'Authorization Token',
})
@ApiBearerAuth('access-token')
@Controller('api/v1/field-force/attendence/attendences')
export class AttendencesController {
  constructor(private attendenceService: AttendencesService){}
  

  @Post()
  @ApiTags('attendance')   
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiResponse({ status: 409, description: 'Data Already Exist , please use update api for update.'})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @ApiBody({
      description: 'Assigned Attendance',
      type: AssignAttendenceDTO
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(new AdminAuthGuard())
  assignUserToAttendence(@Body() data:AssignAttendenceDTO) {
    return  this.attendenceService.assignUserToAttendence(data);
  }

  @Post('/update-attendence/:id')
  @ApiTags('attendance')   
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiResponse({ status: 409, description: 'Data Already Exist , please use update api for update.'})
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @ApiBody({
      description: 'Updated Attendance',
      type: AssignAttendenceDTO
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(new AdminAuthGuard())
  updateAttendence(@Body() data:Partial<AssignAttendenceDTO>,@Param('id') id:number) {
    return  this.attendenceService.updateAttendence(data,id);
  }

  @Post('/remove-attendence')
  @ApiTags('attendance')   
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @ApiBody({
      description: 'Removed Attendance',
      type: RemoveAttendenceDto
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(new AdminAuthGuard())
  removeUserFromAttendence(@Body() data:RemoveAttendenceDto) {
    return  this.attendenceService.removeAttendence(data);
  }

  @Get('/get-attendence/:id')
  @ApiTags('attendance')   
  @ApiResponse({ status: 200, description: 'record list'})
  @ApiResponse({ status: 403, description: 'Jwt Token Error.'})
  @ApiNotFoundResponse({description: 'Request not found'})
  @UsePipes(new ValidationPipe())
  @UseGuards(new AdminAuthGuard())
  getAttendenceById(@Param('id') id:number) {
    return  this.attendenceService.getAttendenceById(id);
  }

  @Get('/admin/attendence-list/:id')
  @ApiTags('attendance')   
  @ApiResponse({ status: 200, description: 'record list'})
  @ApiResponse({ status: 403, description: 'Jwt Token Error.'})
  @ApiNotFoundResponse({description: 'Request not found'})
  @UseGuards(new AdminAuthGuard())
  adminAttendenceList(@Param('id') id:number) {
    return  this.attendenceService.getAdminAssignedAttendenceList(id);
  }

  @Put('/user-attendence')
  @ApiTags('attendance')   
  @ApiResponse({ status: 200, description: 'The record has been successfully Updated.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @ApiBody({
      description: 'Give Attendance',
      type: GiveAttendenceDTO
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  giveAttendence(@Body() data:GiveAttendenceDTO){
    return this.attendenceService.giveAttendence(data)
  }


  @Get('/user/attendence-list/:id')
  @ApiTags('attendance')   
  @ApiResponse({ status: 200, description: 'record list'})
  @ApiResponse({ status: 403, description: 'Jwt Token Error.'})
  @ApiNotFoundResponse({description: 'Request not found'})
  @UseGuards(new AuthGuard())
  getUserAttendenceList(@Param('id') id:number){
    return this.attendenceService.getUserAttendenceList(id);
  }

  @Get("/user/attendence-details/:id")
  @ApiTags('attendance')   
  @ApiResponse({ status: 200, description: 'record list'})
  @ApiResponse({ status: 403, description: 'Jwt Token Error.'})
  @ApiNotFoundResponse({description: 'Request not found'})
  @UseGuards(new AuthGuard())
  getAttendenceDetails(@Param('id') id:number){
    return this.attendenceService.getAttendenceDeatils(id);
  }

  @Post("/user/give-attendence-feedback")
  @ApiTags('attendance')   
  @ApiResponse({ status: 200, description: 'The record has been successfully Updated.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @ApiBody({
      description: 'Added Feedback',
      type: AddFeedbackDTO
  })
  @UseGuards(new AuthGuard())
  giveAttendenceFeedback(@Body() data:AddFeedbackDTO){
    return this.attendenceService.giveAttendenceFeedback(data);
  }

  @Post('/avatar/upload/:userId/:fieldAttendenceId')
  @ApiTags('attendance')   
  @ApiResponse({ status: 200, description: 'The record has been successfully Updated.'})
  @ApiResponse({ status: 403, description: 'Unauthorized.'})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiInternalServerErrorResponse({description: 'Internal Server error.'})
  @UseGuards(new AuthGuard())
  @UseInterceptors(FileInterceptor('image'))
  uploadedFile(
    @UploadedFile() file,
    @Param('userId') user_id:number,
    @Param('fieldAttendenceId') field_attendence_id:number,
  ) {
    return this.attendenceService.setAvatar(user_id,field_attendence_id,file);
  }


  @ApiExcludeEndpoint()
  @Get('/:imgpath')
  @UseGuards(new AuthGuard())
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  

   

  


}