import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { Repository } from 'typeorm';


@Injectable()
export class HomeService {

  constructor(
    @InjectRepository(Home)
    private readonly homeRepository: Repository<Home>
  ){}


    findOne(home_id: string ) {
    return this.homeRepository.findOneBy({ home_id })
  }

}



