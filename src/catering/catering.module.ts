import { Module } from '@nestjs/common';
import { CateringService } from './catering.service';
import { CateringController } from './catering.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catering } from './entities/catering.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Catering]),
    AuthModule
  ],
  controllers: [CateringController],
  providers: [CateringService],
})
export class CateringModule {}
