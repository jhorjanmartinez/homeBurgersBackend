import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HomeService {

  private readonly logger = new Logger('HomeService')

  constructor(
    @InjectRepository(Home)
    private readonly HomeRepository: Repository<Home>
  ){}

  async create(createHomeDto: CreateHomeDto) {

    try {
      
      const home = this.HomeRepository.create(createHomeDto)
      await this.HomeRepository.save(home)


      return home

    } catch (error) {
      this.handleDBExceptions(error)
    }

  }

  async findAll() {
    return await this.HomeRepository.find({
      relations: {
        homeCarrousels: true
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} home`;
  }

  async update(id: string, updateHomeDto: UpdateHomeDto) {

    const home = await this.HomeRepository.preload({
      home_id: id,
      ...updateHomeDto,
    })

    if (!home) throw new NotFoundException(`home with id: ${id} not found`)


      try {
        await this.HomeRepository.save( home )
        return home
      } catch (error) {
        this.handleDBExceptions(error);
      }

  }

  remove(id: number) {
    return `This action removes a #${id} home`;
  }


    private handleDBExceptions( error: any ) {
      if(error.code === '23505'  )
      throw new BadRequestException(error.detail )

      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check server logs')
  }

}
