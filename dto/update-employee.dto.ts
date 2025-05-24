import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateEmployeeDto{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email:string;

}
