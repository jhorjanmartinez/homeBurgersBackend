import { Module } from '@nestjs/common';
import { CateringService } from './catering.service';
import { CateringController } from './catering.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catering } from './entities/catering.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Catering])
  ],
  controllers: [CateringController],
  providers: [CateringService],
})
export class CateringModule {}
