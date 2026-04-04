import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CateringService } from './catering.service';
import { CreateCateringDto } from './dto/create-catering.dto';
import { UpdateCateringDto } from './dto/update-catering.dto';

@Controller('catering')
export class CateringController {
  constructor(private readonly cateringService: CateringService) {}

  @Post()
  create(@Body() createCateringDto: CreateCateringDto) {
    return this.cateringService.create(createCateringDto);
  }

  // @Get()
  // findAll() {
  //   return this.cateringService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cateringService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCateringDto: UpdateCateringDto) {
  //   return this.cateringService.update(+id, updateCateringDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cateringService.remove(+id);
  // }
}
