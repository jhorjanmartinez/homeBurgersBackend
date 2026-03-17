import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>
  ){}


  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.OrderRepository.create(createOrderDto)

    return await this.OrderRepository.save(newOrder)

  }

  async findAll() {

    return await this.OrderRepository.find({
      relations: {
        order_items: true
      }
    })

  }

  async findOne(id: string ) {
    return await this.OrderRepository.findOne({
      where: {id},
      relations: {
        order_items:true
      }
    })
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.OrderRepository.update(id, updateOrderDto)

    return await this.findOne(id)
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
