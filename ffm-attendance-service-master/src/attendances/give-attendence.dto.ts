import { IsString, IsNumber, IsDateString, IsBoolean, IsNotEmpty, IsEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class GiveAttendenceDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    attendence_time:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    attendence_location_lattitude:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    attendence_location_longitude:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    user_id:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    attendence_status:boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    field_attendence_id:number

   

}