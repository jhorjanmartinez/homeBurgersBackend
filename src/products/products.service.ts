import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>

  ) {}

  async create(createProductDto: CreateProductDto) {

    try {

      const { category_id, ...productData } = createProductDto;

      const category = await this.categoryRepository.findOneBy({
        category_id
      });

      if(!category)
        throw new BadRequestException('Category not found')

      const product = this.productRepository.create({
        ...productData,
        category
      })
      await this.productRepository.save(product)

      return product;
      
    } catch (error) {
      

      this.handleDBExceptions(error)

    }

  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto

    return this.productRepository.find({
      take: limit,
      skip: offset
    })
  }

  async findOne(term: string) {
    
    let product: Product | null = null

    if ( isUUID(term) ) {
       product = await this.productRepository.findOneBy({product_id: term })
    }


    if( !product )
      throw new NotFoundException(`product with id ${ term } not found`);

      return product


  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.productRepository.preload({
      product_id: id,
      ...updateProductDto
    })


    if ( !product )
      throw new NotFoundException(`Category with id ${id} not found`)


    try {
      
      await this.productRepository.save(product);
      return product;

    } catch (error) {
      this.handleDBExceptions(error)
    }


  }

  async remove(id: string ) {
    
    const product = await this.findOne(id )
    await this.productRepository.remove(product)

  }


  private handleDBExceptions(error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail)

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs')

  }

}
