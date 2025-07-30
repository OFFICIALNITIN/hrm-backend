import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DepartmentRepository } from './departments.repository';
import { CreateDepartmentDto } from '../api/dtos/create-department.dto';
import { Department } from '../domain/models/department.model';
import { UpdateDepartmentDto } from '../api/dtos/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private readonly departmentRepo: DepartmentRepository) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const existingDepartment = await this.departmentRepo.findByName(
      createDepartmentDto.name,
    );

    if (existingDepartment) {
      throw new ConflictException(
        `Department with the name ${existingDepartment.name} already exists`,
      );
    }

    return this.departmentRepo.create(createDepartmentDto);
  }

  async findAll(): Promise<{ data: Department[] }> {
    const departments = await this.departmentRepo.findAll();
    return {
      data: departments,
    };
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepo.findOne(id);

    if (!department) {
      throw new NotFoundException(`Department with the ID ${id} Not Found`);
    }

    return department;
  }

  async update(
    id: number,
    updateDepartment: UpdateDepartmentDto,
  ): Promise<Department> {
    await this.findOne(id);

    const [_, [updatedDepartment]] = await this.departmentRepo.update(
      id,
      updateDepartment,
    );

    return updatedDepartment;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.departmentRepo.remove(id);
  }
}
