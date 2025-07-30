import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ModelCtor } from 'sequelize-typescript';
import { Employee } from 'src/modules/employees/domain/models/employee.model';
import { Department } from 'src/modules/departments/domain/models/department.model';
import { EmployeesService } from 'src/modules/employees/app/employees.service';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ModelCtor<User>,
    @Inject(forwardRef(() => EmployeesService))
    private readonly EmployeeService: EmployeesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email is already exists');
    }

    // The password will be hashed by the BeforeCreate hook in the model
    const user = await this.userModel.create(createUserDto as any);
    // Don't return the password in the reponse
    const { password, ...result } = user.get();

    return result as User;
  }

  async findAll(): Promise<{ data: User[] }> {
    const users = await this.userModel.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Employee,
          include: [Department],
        },
      ],
    });
    return {
      data: users,
    };
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { email },
      include: [
        {
          model: Employee,
          include: [Department],
        },
      ],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByUserId(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new NotFoundException('User not found with this Id');
    }

    return user;
  }

  async update(userId: string, updateBody: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with the ID ${userId} not found`);
    }

    if (!updateBody.employeeId) {
      throw new BadRequestException('EmployeeId Id required');
    }

    const employee = await this.EmployeeService.findOne(updateBody.employeeId);
    if (!employee) {
      throw new NotFoundException(
        `Employee with the ID ${updateBody.employeeId} not found`,
      );
    }

    if (updateBody.employeeId !== undefined) {
      // Use a direct update to ensure persistence
      await this.userModel.update(
        { employeeId: updateBody.employeeId },
        { where: { id: userId } },
      );
      // Refetch the user to return the updated instance
      const updatedUser = await this.userModel.findByPk(userId);
      if (!updatedUser) {
        throw new NotFoundException(
          `User with the ID ${userId} not found after update`,
        );
      }

      return updatedUser;
    }
    if (updateBody.email !== undefined) {
      user.email = updateBody.email;
    }
    if (updateBody.role !== undefined) {
      user.role = updateBody.role;
    }

    const savedUser = await user.save();

    return savedUser;
  }
}
