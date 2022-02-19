import { IsString, IsNumber, IsDateString, IsBoolean, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AssignDeliveryDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    assigned_delivery_time:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    assigned_location_lattitude:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    assigned_location_longitude:string;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    client_name:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    client_address:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    user_id:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    admin_id:number

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    is_paid:boolean


}