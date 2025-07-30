import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    example: 'Human Resources',
    description: 'Name of the department',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  @MinLength(2)
  @MaxLength(100)
  name: string;
}
