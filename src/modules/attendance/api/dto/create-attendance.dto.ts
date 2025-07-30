import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateAttendanceDto {
  @IsUUID(4, { message: 'Employee ID must be a valid UUID' })
  @IsNotEmpty()
  employeeId: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsDateString()
  @IsNotEmpty()
  @Type(() => Date)
  checkInTime: Date;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  checkOutTime?: Date;
}
