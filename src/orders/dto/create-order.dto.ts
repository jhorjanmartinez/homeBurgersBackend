import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { orderOptions } from "../entities/order-options.entity";
import { CreateOrderItemDto } from "./create-order-item.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    customer_name:string;


    @IsString()
    @IsNotEmpty()
    customer_phone: string;


    @IsEnum(orderOptions)
    @IsOptional()
    status?: orderOptions


    @IsNumber()
    @IsPositive()
    total_amount: number;


    @IsArray()
    @ValidateNested({ each: true })
    @Type( () => CreateOrderItemDto )
    order_items: CreateOrderItemDto[]

}
