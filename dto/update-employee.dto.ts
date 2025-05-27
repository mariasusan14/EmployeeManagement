import {
  IsNumber,
  IsString,
  IsEnum,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import { CreateAddressDto } from "./create-address.dto";

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsNumber()
  age:number;

  @IsOptional()
  @IsEnum(EmployeeRole)
  role: EmployeeRole;

  @IsOptional()
  @IsString()
  emp_id: string;

  @IsOptional()
  @IsNumber()
  experience: number;

  @IsOptional()
  joiningDate: Date;

  @IsOptional()
  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;

  @IsOptional()
  @IsNumber()
  department_id: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
