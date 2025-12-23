import { IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {


    @IsString()
    @MinLength(1)
    name: string

    @IsOptional()
    @IsString()
    description?: string;

    @IsInt()
    @Min(0)
    price: number;


    @IsString()
    image: string;


    @IsString()
    category_id: string;

}
