import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { HomeCarrouselItem } from './entities/home-carrousel-item.entity';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [
    TypeOrmModule.forFeature([Home, HomeCarrouselItem])
  ]
})
export class HomeModule {}
