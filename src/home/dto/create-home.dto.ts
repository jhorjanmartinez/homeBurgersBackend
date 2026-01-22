import { IsString, IsArray, ValidateNested } from 'class-validator';
import { CreateHomeCarrouselItemDto } from './create-home-carrousel-item.dto';
import { Type } from 'class-transformer';

export class CreateHomeDto {


    @IsString()
    homeVideoUrl: string


    @IsString()
    homePrincipal: string

    @IsString()
    sala: string

    @IsString()
    sala2: string

    @IsString()
    hamburguesa4: string

    @IsString()
    hamburguesa: string


    @IsArray()
    @ValidateNested({ each: true })
    @Type( () => CreateHomeCarrouselItemDto )
    homeCarrousels: CreateHomeCarrouselItemDto[]

}
