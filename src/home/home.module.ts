import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [
    TypeOrmModule.forFeature([Home])
  ],
  exports: [
    TypeOrmModule
  ]
})
export class HomeModule {}
