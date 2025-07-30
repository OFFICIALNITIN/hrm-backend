import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LeaveType } from 'src/common/enums/leaveType.enum';

export class CreateLeaveRequest {
  @ApiProperty({ enum: LeaveType, example: LeaveType.ANNUAL })
  @IsEnum(LeaveType)
  @IsNotEmpty()
  type: LeaveType;

  @ApiProperty({ example: '2024-08-15' })
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: '2024-08-20' })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ required: false, example: 'Family vacation' })
  @IsString()
  @IsNotEmpty()
  reason?: string;
}
