import { ArrayNotEmpty, IsArray, IsUUID } from "class-validator";

export class AddCustomizationsToProductDto  {
   
   @IsArray()
   @ArrayNotEmpty()
   @IsUUID('all', {each: true} )
    customizationIds: string[]
}