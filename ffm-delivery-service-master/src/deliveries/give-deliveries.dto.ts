import { IsString, IsNumber, IsDateString, IsBoolean, IsNotEmpty, IsEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class GiveAttendenceDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    delivery_time:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    delivery_location_lattitude:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    delivery_location_longitude:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    user_id:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    field_delivery_id:number

   

}