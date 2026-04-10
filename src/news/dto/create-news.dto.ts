import { IsString } from "class-validator"

export class CreateNewsDto {

    @IsString()
    title: string


    @IsString()
    content: string


    @IsString()
    card_image: string


    @IsString()
    banner_image: string


}
