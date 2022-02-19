import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendenceEntity } from './attendences.entity';
import { AttendencesController } from './attendances.controller';
import { AttendencesService } from './attendences.service';
import { AlbumsEntity } from './albums.entity';
import { PhotosEntity } from './photos.entity';
import { DashboardUserEntity } from './dashboard-user.entity';

@Module({
    imports:[TypeOrmModule.forFeature([AttendenceEntity,AlbumsEntity,PhotosEntity,DashboardUserEntity]),HttpModule],
    controllers:[AttendencesController],
    providers:[AttendencesService]
})
export class AttendancesModule {}
