import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Customization } from 'src/customizations/entities/customization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Customization])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
