import { IsString, IsNumber, IsDateString, IsBoolean, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AssignAttendenceDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    assigned_time:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    assigned_location_lattitude:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    assigned_location_longitude:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    address:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    title:string;

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
    admin_id:number


}