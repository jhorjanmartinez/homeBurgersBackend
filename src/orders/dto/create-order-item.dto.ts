import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
export class CreateOrderItemDto {

    @IsString()
    @IsNotEmpty()
    product_name: string;

    @IsNumber()
    @Min(0)
    base_price: number;

    @IsInt()
    @IsPositive()
    quantity: number

    @IsNumber()
    @Min(1)
    unit_price: number

    @IsOptional()
    customization?:any

}