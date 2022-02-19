import { IsString, IsNumber, IsDateString, IsBoolean, IsNotEmpty, IsEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AddFeedbackDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    user_id:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    feedback:boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    field_delivery_id:number

   

}