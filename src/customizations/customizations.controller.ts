import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomizationsService } from './customizations.service';
import { CreateCustomizationDto } from './dto/create-customization.dto';
import { UpdateCustomizationDto } from './dto/update-customization.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateCustomizationItemDto } from './dto/create-customization-item.dto';

@Controller('customizations')
export class CustomizationsController {
  constructor(
    private readonly customizationsService: CustomizationsService) {}

  @Post()
  create(@Body() createCustomizationDto: CreateCustomizationDto) {
    return this.customizationsService.create(createCustomizationDto);
  }

  @Post('items')
  createItem(@Body() dto: CreateCustomizationItemDto) {
  return this.customizationsService.createItem(dto);
}


  @Get()
  findAll(@Query() paginationDto:PaginationDto ) {
    return this.customizationsService.findAll(paginationDto);
  }

  @Get('with-items')
  findAllWithItems() {
    return this.customizationsService.findAllWithItems();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customizationsService.findOneWithItems(id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomizationDto: UpdateCustomizationDto) {
    return this.customizationsService.update(+id, updateCustomizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customizationsService.remove(+id);
  }
}
