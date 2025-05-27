import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";


export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password:string;

  @IsEnum(EmployeeRole)
  role:EmployeeRole
  
  @IsNotEmpty()
  @IsString()
  emp_id:string

  @IsNotEmpty()
  @IsNumber()
  experience: number;

  @IsNotEmpty()
  joiningDate:Date;

  @IsEnum(EmployeeStatus)
  status:EmployeeStatus;
  
  @IsNotEmpty()
  @IsNumber()
  department_id:number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

}