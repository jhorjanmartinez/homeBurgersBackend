import { IsString } from "class-validator";

export class CreateUbicationDto {

    @IsString()
    name:string

}
