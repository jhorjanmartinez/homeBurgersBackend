import { Module } from '@nestjs/common';
import { CustomizationsService } from './customizations.service';
import { CustomizationsController } from './customizations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customization } from './entities/customization.entity';
import { Customization_item } from './entities/customization-item.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customization, Customization_item]),
    AuthModule
  ],
  controllers: [CustomizationsController],
  providers: [CustomizationsService],
})
export class CustomizationsModule {}
