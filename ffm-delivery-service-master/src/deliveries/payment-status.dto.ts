import { IsString, IsNumber, IsDateString, IsBoolean, IsNotEmpty, IsEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentStatusDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    user_id:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    field_delivery_id:number

   

}