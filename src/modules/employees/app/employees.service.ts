import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmployeesRepository } from './employees.repository';
import { UsersService } from 'src/users/services/users.service';
import { DepartmentsService } from 'src/modules/departments/app/departments.service';
import { Employee } from '../domain/models/employee.model';
import { CreateEmployeeDto } from '../api/dtos/create-employee.dto';
import { updateEmployeeDto } from '../api/dtos/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly EmployeeRepo: EmployeesRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly departmentService: DepartmentsService,
  ) {}

  async create(createEmployee: CreateEmployeeDto): Promise<Employee> {
    // 1. Validate that the user exits and doesn't already have profile
    await this.usersService.findByUserId(createEmployee.userId); // If not found will throw NotFound Exeception

    const existingEmployee = await this.EmployeeRepo.findByUserId(
      createEmployee.userId,
    );

    if (existingEmployee) {
      throw new ConflictException(
        `User with the ID ${createEmployee.userId} is already an employee profile`,
      );
    }

    // 2. Validate that departmen exits if provided
    if (createEmployee.departmentId) {
      await this.departmentService.findOne(createEmployee.departmentId); // Throws exeception if not found
    }

    // Create the employee
    const employee = await this.EmployeeRepo.create(createEmployee);

    // Update the user to set employeeId
    await this.usersService.update(employee.userId, {
      employeeId: employee.id,
    });
    return employee;
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.EmployeeRepo.findOne(id);

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async findAll(): Promise<{ data: Employee[] }> {
    const employees = await this.EmployeeRepo.findAll();
    return { data: employees };
  }

  async findByUserId(id: string): Promise<{ data: Employee }> {
    const employee = await this.EmployeeRepo.findByUserId(id);

    if (!employee) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      data: employee,
    };
  }

  async update(
    id: string,
    updateEmployee: updateEmployeeDto,
  ): Promise<Employee> {
    await this.findOne(id); // Ensure Employee exits

    if (updateEmployee.departmentId) {
      await this.departmentService.findOne(updateEmployee.departmentId); // Ensure that department exits
    }

    const [, [updatedEmployee]] = await this.EmployeeRepo.upadate(
      id,
      updateEmployee,
    );

    return this.findOne(updatedEmployee.id);
  }

  async remove(id: string): Promise<void> {
    const employee = await this.findOne(id);
    if (employee) {
      // Set employeeId to null in the user

      await this.usersService.update(employee.get('userId'), {
        employeeId: employee.id,
      });
      // Now delete the employee
      await this.EmployeeRepo.remove(id);
    }
  }
}
