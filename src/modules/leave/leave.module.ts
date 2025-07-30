import { Module } from '@nestjs/common';
import { LeaveController } from './api/leave.controller';
import { LeaveService } from './app/leave.service';
import { LeaveRepository } from './app/leave.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { LeaveRequest } from './domain/leave-request.model';
import { Employee } from '../employees/domain/models/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([LeaveRequest, Employee])],
  controllers: [LeaveController],
  providers: [LeaveService, LeaveRepository],
})
export class LeaveModule {}
