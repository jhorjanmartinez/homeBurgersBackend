import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UbicationsService } from './ubications.service';
import { CreateUbicationDto } from './dto/create-ubication.dto';
import { UpdateUbicationDto } from './dto/update-ubication.dto';
import { CreateUbicationItemDto } from './dto/create-ubication-item.dto';

@Controller('ubications')
export class UbicationsController {
  constructor(private readonly ubicationsService: UbicationsService) {}

  @Post()
  create(@Body() createUbicationDto: CreateUbicationDto) {
    return this.ubicationsService.create(createUbicationDto);
  }


  @Post('items')
  createItem(@Body() dto:CreateUbicationItemDto ) {
    return this.ubicationsService.createItem(dto)
  }



  @Get()
  findAll() {
    return this.ubicationsService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.ubicationsService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUbicationDto: UpdateUbicationDto) {
    return this.ubicationsService.update(+id, updateUbicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ubicationsService.remove(+id);
  }
}
