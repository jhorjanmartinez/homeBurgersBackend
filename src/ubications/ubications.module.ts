import { Module } from '@nestjs/common';
import { UbicationsService } from './ubications.service';
import { UbicationsController } from './ubications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubication } from './entities/ubication.entity';
import { ubicationItem } from './entities/ubication-item.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ubication, ubicationItem]),
    AuthModule
  ],
  controllers: [UbicationsController],
  providers: [UbicationsService],
})
export class UbicationsModule {}
