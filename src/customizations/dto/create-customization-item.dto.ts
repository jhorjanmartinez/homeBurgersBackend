import { IsInt, IsString, IsUUID, Min } from "class-validator";

export class CreateCustomizationItemDto{

  @IsUUID()
  customization_id: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  price: number


}