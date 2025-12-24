import { Module } from '@nestjs/common';
import { CustomizationsService } from './customizations.service';
import { CustomizationsController } from './customizations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customization } from './entities/customization.entity';
import { Customization_item } from './entities/customization-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customization, Customization_item]),
  ],
  controllers: [CustomizationsController],
  providers: [CustomizationsService],
})
export class CustomizationsModule {}
