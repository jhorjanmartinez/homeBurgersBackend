import { IsEnum, IsInt, IsOptional, IsString, Max, Min, MinLength } from "class-validator"
import { CustomizationOptionType } from "../customization-option.enum"

export class CreateCustomizationDto {

    @IsString()
    @MinLength(1)
    title: string

    @IsEnum(CustomizationOptionType)
    @IsOptional()
    options: CustomizationOptionType

    @IsInt()
    @Min(1)
    @Max(6)
    maxSelection: number
}
