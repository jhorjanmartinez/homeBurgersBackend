import { Controller, Get, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { HomeService } from './home.service';


@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}



  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.homeService.findOne(id);
  }

}
