import { Module } from '@nestjs/common';
import { AttendanceController } from './api/attendance.controller';
import { AttendanceService } from './app/attendance.service';
import { AttendanceRepository } from './app/attendance.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attendance } from './domain/models/attendance.model';
import { EmployeesRepository } from '../employees/app/employees.repository';
import { EmployeesModule } from '../employees/employees.module';
import { Employee } from '../employees/domain/models/employee.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Attendance, Employee]),
    EmployeesModule,
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceRepository, EmployeesRepository],
})
export class AttendanceModule {}
