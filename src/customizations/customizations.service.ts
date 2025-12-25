import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCustomizationDto } from './dto/create-customization.dto';
import { UpdateCustomizationDto } from './dto/update-customization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customization } from './entities/customization.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Customization_item } from './entities/customization-item.entity';
import { CreateCustomizationItemDto } from './dto/create-customization-item.dto';

@Injectable()
export class CustomizationsService {

  private readonly logger = new Logger('CategoriesService')


  constructor(
    @InjectRepository(Customization)
    private readonly customizationRepository: Repository<Customization>,

    @InjectRepository(Customization_item)
    private readonly customizationItemRepository: Repository<Customization_item>
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


async createItem(createCustomizationItemDto: CreateCustomizationItemDto) {
  
  const { customization_id, name, price } = createCustomizationItemDto
  
  const customization = await this.customizationRepository.findOne({
    where: { customization_id }
  });


  if( !customization )
    throw new NotFoundException(`Customization with id ${ customization_id } not found`);


  const customizationItem = this.customizationItemRepository.create({
    name, price, customization
  })


  await this.customizationItemRepository.save(customizationItem)

  return customizationItem

}





  findAll(paginationDto: PaginationDto) {
    
    const { limit = 10, offset = 0 } = paginationDto

    return this.customizationRepository.find({
      take: limit,
      skip: offset,
    })

  }


  async findAllWithItems() {


    return this.customizationRepository.find({
      relations: {
        customization_items: true
      }
    })

  }


  findOne(id: number) {
    return `This action returns a #${id} customization`;
  }


  async findOneWithItems( customization_id: string ){

    const customization = await this.customizationRepository.findOne({
      where: { customization_id },
      relations: {
        customization_items: true,
      },

    });

    if (!customization)
      throw new NotFoundException(`Customization with id ${customization_id} not found`,)


    return customization

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
