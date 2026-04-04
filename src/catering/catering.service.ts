import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCateringDto } from './dto/create-catering.dto';
import { UpdateCateringDto } from './dto/update-catering.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catering } from './entities/catering.entity';

@Injectable()
export class CateringService {

  private readonly logger = new Logger('CateringService')

  constructor(
    @InjectRepository(Catering)
    private readonly cateringRepository: Repository<Catering>
  ) {}


  async create(createCateringDto: CreateCateringDto) {

    try {
      const catering = this.cateringRepository.create(createCateringDto)
      await this.cateringRepository.save( catering )

      return catering

    }  catch (error) {

      this.handleDBExceptions(error)

    }

  }

  findAll() {
    return `This action returns all catering`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catering`;
  }

  update(id: number, updateCateringDto: UpdateCateringDto) {
    return `This action updates a #${id} catering`;
  }

  remove(id: number) {
    return `This action removes a #${id} catering`;
  }



    private handleDBExceptions( error: any ) {
      if(error.code === '23505'  )
      throw new BadRequestException(error.detail )

      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check server logs')
  }

}
