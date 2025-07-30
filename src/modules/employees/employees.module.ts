import { forwardRef, Module } from '@nestjs/common';
import { EmployeesController } from './api/employees.controller';
import { EmployeesService } from './app/employees.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './domain/models/employee.model';
import { EmployeesRepository } from './app/employees.repository';
import { UsersModule } from 'src/users/users.module';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Employee]),
    forwardRef(() => UsersModule),
    DepartmentsModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesRepository],
  exports: [EmployeesService],
})
export class EmployeesModule {}
