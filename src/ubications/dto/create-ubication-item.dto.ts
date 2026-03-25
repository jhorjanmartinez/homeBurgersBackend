import { IsString, IsUUID } from "class-validator"

export class CreateUbicationItemDto {

    @IsString()
    image:string


    @IsString()
    title: string

    @IsString()
    description: string


    @IsString()
    google_maps_url: string

    
    @IsUUID()
    ubication_id: string

}