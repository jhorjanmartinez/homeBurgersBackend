import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class NewsService {

  private readonly logger = new Logger('NewsService')

  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>
  ){}

  async create(createNewsDto: CreateNewsDto) {


    try {
      const news = this.newsRepository.create(createNewsDto)
      await this.newsRepository.save(news)

      return news

    } catch(error){
      this.handleDBExceptions(error)
    }

  }

  async findAll() {

    return await this.newsRepository.find()

  }

  async findOne(term: string) {

    let news: News | null = null;


    if(isUUID(term) ) {
      news = await this.newsRepository.findOneBy({ news_id: term })
    } else {
      news = await this.newsRepository.findOneBy({slug: term })
    }


    if(!news)
      throw new NotFoundException(`news with id ${ term } not found`)

    return news

  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }

    private handleDBExceptions( error: any ) {
      if(error.code === '23505'  )
      throw new BadRequestException(error.detail )

      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, check server logs')
  }

}
