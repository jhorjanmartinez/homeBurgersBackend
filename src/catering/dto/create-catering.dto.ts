import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"



export class CreateCateringDto {


    @IsString()
    @IsNotEmpty()
    names:string
    
    @IsString()
    @MinLength(10)
    telephone: string


    @IsEmail()
    @IsNotEmpty()
    email: string


    @IsString()
    @IsNotEmpty()
    message: string

}
