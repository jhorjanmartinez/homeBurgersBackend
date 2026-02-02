import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { AddCustomizationsToProductDto } from './dto/add-customizations.dto';
import { Customization } from 'src/customizations/entities/customization.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,


    @InjectRepository(Customization)
    private readonly customizationRepository: Repository<Customization>


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


  async addCustomizations( productId: string, addCustomizationsToProductDto: AddCustomizationsToProductDto ) {


    const { customizationIds } = addCustomizationsToProductDto;

    const product = await this.productRepository.findOne({
      where: {product_id: productId },
      relations: {
        customizations: true,
      }
    });

    if( !product )
      throw new NotFoundException(`Product with id ${productId} not found`,);


    const customizations  = await this.customizationRepository.findBy({
      customization_id: In(customizationIds)
    });


    if (customizations.length === 0)
      throw new NotFoundException(`No valid customizations found`)


    product.customizations = customizations

    await this.productRepository.save(product);


    return product

  }



async findAll(categorySlug?: string) {

  const products = await this.productRepository.find({
    relations: { 
      category: true,
      customizations: true
    },
    where: categorySlug 
      ? { category: { slug: categorySlug } } 
      : {} 
  });

  return products.map( product => { 
    const opcions = product.customizations && product.customizations.length > 0;

    return {
      ...product,
      has_customizations: opcions,
      customizations:undefined
    }

  } )

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

async findOneFull(productId: string) {

  const product = await this.productRepository.findOne({
    where: { product_id: productId },
    relations: {
      category: true,
      customizations: {
        customization_items: true,
      },
    },
  });

  if (!product)
    throw new NotFoundException(`Product with id ${productId} not found`);

  return product;
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
