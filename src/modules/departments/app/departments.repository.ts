import { InjectModel } from '@nestjs/sequelize';
import { Department } from '../domain/models/department.model';
import { CreateDepartmentDto } from '../api/dtos/create-department.dto';
import { UpdateDepartmentDto } from '../api/dtos/update-department.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentRepository {
  constructor(
    @InjectModel(Department) private readonly DepartmentRepo: typeof Department,
  ) {}

  async create(createDepartment: CreateDepartmentDto): Promise<Department> {
    return this.DepartmentRepo.create(createDepartment as Department);
  }

  async findAll(): Promise<Department[]> {
    return this.DepartmentRepo.findAll({ include: 'employees' });
  }

  async findOne(id: number): Promise<Department | null> {
    return this.DepartmentRepo.findByPk(id, { include: 'employees' });
  }

  async findByName(name: string): Promise<Department | null> {
    return this.DepartmentRepo.findOne({ where: { name } });
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<[number, Department[]]> {
    return this.DepartmentRepo.update(updateDepartmentDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<void> {
    const department = await this.DepartmentRepo.findOne({ where: { id } });
    await department?.destroy();
  }
}
