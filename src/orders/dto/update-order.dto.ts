import { orderOptions } from '../entities/order-options.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
    @IsEnum(orderOptions)
    @IsNotEmpty()
    status: orderOptions
}
