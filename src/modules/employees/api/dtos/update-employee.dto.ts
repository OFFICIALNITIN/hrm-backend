import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

export class updateEmployeeDto extends PartialType(CreateEmployeeDto) {
  userId?: never;
}
