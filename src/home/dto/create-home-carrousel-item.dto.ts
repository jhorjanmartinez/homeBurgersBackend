import { IsString } from 'class-validator';

export class CreateHomeCarrouselItemDto {
  @IsString()
  imagesUrl: string;

  @IsString()
  title: string;
}
