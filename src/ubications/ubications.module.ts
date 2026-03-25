import { Module } from '@nestjs/common';
import { UbicationsService } from './ubications.service';
import { UbicationsController } from './ubications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubication } from './entities/ubication.entity';
import { ubicationItem } from './entities/ubication-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ubication, ubicationItem])
  ],
  controllers: [UbicationsController],
  providers: [UbicationsService],
})
export class UbicationsModule {}
