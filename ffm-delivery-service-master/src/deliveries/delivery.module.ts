import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEntity } from './delivery.entity';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { DeliveryAlbumsEntity } from './albums.entity';
import { DeliveryPhotosEntity } from './photos.entity';

@Module({
    imports:[TypeOrmModule.forFeature([DeliveryEntity,DeliveryAlbumsEntity,DeliveryPhotosEntity]),HttpModule],
    controllers:[DeliveryController],
    providers:[DeliveryService]
})
export class DeliveryModule {}
