import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsDateString()
  @IsNotEmpty()
  hireDate: Date;

  @IsNumber()
  @IsOptional()
  salary?: number;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @IsOptional()
  departmentId?: number;
}
