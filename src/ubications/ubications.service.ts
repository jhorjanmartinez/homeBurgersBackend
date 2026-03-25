import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUbicationDto } from './dto/create-ubication.dto';
import { UpdateUbicationDto } from './dto/update-ubication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ubication } from './entities/ubication.entity';
import { Repository } from 'typeorm';
import { CreateUbicationItemDto } from './dto/create-ubication-item.dto';
import { ubicationItem } from './entities/ubication-item.entity';

@Injectable()
export class UbicationsService {

  private readonly logger = new Logger('UbicationsService')

  constructor(
    @InjectRepository(Ubication)
    private readonly ubicationRepository: Repository<Ubication>,

    @InjectRepository(ubicationItem)
    private readonly ubicationItemRepository: Repository<ubicationItem>
  ){}

  async create(createUbicationDto: CreateUbicationDto) {

    try {

      const ubication = this.ubicationRepository.create(createUbicationDto)
      await this.ubicationRepository.save( ubication );

      return ubication

    } catch(error) {
      this.handleDBExceptions(error)
    }

  }


  async createItem( createUbicationItemDto: CreateUbicationItemDto) {

    const { ubication_id , ...dataCreateUbicationItem } = createUbicationItemDto


    const ubication = await this.ubicationRepository.findOne({
      where: { ubication_id }
    });


    if (!ubication)
      throw new NotFoundException(`ubications with id ${ ubication_id } not found `);

    const ubicationItem = this.ubicationItemRepository.create({
      ...dataCreateUbicationItem,
      ubication
    })


    await this. ubicationItemRepository.save(ubicationItem)

    return ubicationItem

  }







  findAll() {

    return this.ubicationRepository.find({
      relations: {
        ubicationsItems: true
      }
    })

  }

  findOne(id: number) {
    return `This action returns a #${id} ubication`;
  }

  update(id: number, updateUbicationDto: UpdateUbicationDto) {
    return `This action updates a #${id} ubication`;
  }

  remove(id: number) {
    return `This action removes a #${id} ubication`;
  }



    private handleDBExceptions( error: any ) {
      if(error.code === '23505'  )
      throw new BadRequestException(error.detail )

      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check server logs')
  }


}
