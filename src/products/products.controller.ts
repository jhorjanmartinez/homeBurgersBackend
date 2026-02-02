import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AddCustomizationsToProductDto } from './dto/add-customizations.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

@Post(':id/customizations')
addCustomizations(
  @Param('id') productId: string,
  @Body() dto: AddCustomizationsToProductDto,
) {
  return this.productsService.addCustomizations(productId, dto);
}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('category/:slug') 
  findByCategory(@Param('slug') slug: string) {
    return this.productsService.findAll(slug);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
  }


  @Get(':id/full')
  findOneFull(@Param('id') id: string) {
    return this.productsService.findOneFull(id);
}



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
