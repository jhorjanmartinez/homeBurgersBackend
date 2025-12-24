import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCustomizationDto } from './dto/create-customization.dto';
import { UpdateCustomizationDto } from './dto/update-customization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customization } from './entities/customization.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CustomizationsService {

  private readonly logger = new Logger('CategoriesService')


  constructor(
    @InjectRepository(Customization)
    private readonly customizationRepository: Repository<Customization>
  ){

  }

  async create(createCustomizationDto: CreateCustomizationDto) {


    try {
      const customization = this.customizationRepository.create(createCustomizationDto)
        await this.customizationRepository.save( customization )

        return customization

    } catch (error) {
      
      this.handleDBExceptions(error)

    }

  }

  findAll(paginationDto: PaginationDto) {
    
    const { limit = 10, offset = 0 } = paginationDto

    return this.customizationRepository.find({
      take: limit,
      skip: offset,
    })

  }

  findOne(id: number) {
    return `This action returns a #${id} customization`;
  }

  update(id: number, updateCustomizationDto: UpdateCustomizationDto) {
    return `This action updates a #${id} customization`;
  }

  remove(id: number) {
    return `This action removes a #${id} customization`;
  }

    private handleDBExceptions( error: any ) {
      if(error.code === '23505'  )
      throw new BadRequestException(error.detail )

      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check server logs')
  }

}
