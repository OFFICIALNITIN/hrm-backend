import { InjectModel } from '@nestjs/sequelize';
import { Employee } from '../domain/models/employee.model';
import { CreateEmployeeDto } from '../api/dtos/create-employee.dto';
import { User } from 'src/users/models/users.model';
import { Department } from 'src/modules/departments/domain/models/department.model';
import { updateEmployeeDto } from '../api/dtos/update-employee.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesRepository {
  constructor(
    @InjectModel(Employee) private readonly employeeModel: typeof Employee,
  ) {}

  async create(createEmployee: CreateEmployeeDto): Promise<Employee> {
    return this.employeeModel.create(createEmployee as Employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.findAll({
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Department },
      ],
    });
  }

  async findOne(id: string): Promise<Employee | null> {
    // Do NOT use raw: true here, so we get a Sequelize model instance
    return await this.employeeModel.findByPk(id, {
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Department },
      ],
    });
  }

  async findByUserId(userId: string): Promise<Employee | null> {
    return this.employeeModel.findOne({
      where: { userId },
      include: [{ model: Department }],
    });
  }

  async upadate(
    id: string,
    updateEmployee: updateEmployeeDto,
  ): Promise<[number, Employee[]]> {
    return this.employeeModel.update(updateEmployee, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: string): Promise<void> {
    const employee = await this.findOne(id);
    await employee?.destroy({ force: true });
  }
}
