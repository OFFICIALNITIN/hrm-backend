import { Module } from '@nestjs/common';
import { DepartmentsController } from './api/departments.controller';
import { DepartmentsService } from './app/departments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './domain/models/department.model';
import { DepartmentRepository } from './app/departments.repository';

@Module({
  imports: [SequelizeModule.forFeature([Department])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentRepository],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
