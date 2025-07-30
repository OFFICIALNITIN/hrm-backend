import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ProcessLeaveRequestDto {
  @ApiProperty({
    description: 'Reason for rejection (only required if rejecting)',
    example: 'Request conflicts with the project deadline',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  rejectReason?: string;
}
