import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LeaveRepository } from './leave.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/modules/employees/domain/models/employee.model';
import { CreateLeaveRequest } from '../api/dto/create-leave-request.dto';
import { LeaveRequest } from '../domain/leave-request.model';
import { User } from 'src/users/models/users.model';
import { LeaveStatus } from 'src/common/enums/leaveStatus.enum';
import { ProcessLeaveRequestDto } from '../api/dto/process-leave-request.dto';

@Injectable()
export class LeaveService {
  constructor(
    private readonly leaveRepository: LeaveRepository,

    // We need Employee model to find the employee profile of request user
    @InjectModel(Employee) private readonly employeeModel: typeof Employee,
  ) {}

  async create(
    createDto: CreateLeaveRequest,
    user: User,
  ): Promise<LeaveRequest> {
    const employee = await this.employeeModel.findOne({
      where: { userId: user.id },
    });

    if (!employee) {
      throw new ForbiddenException('User does not have an employee profile');
    }

    if (new Date(createDto.startDate) > new Date(createDto.endDate)) {
      throw new BadRequestException('Start date cannot be after end date');
    }

    const leaveRequestData = {
      ...createDto,
      employeeId: employee.id,
      status: LeaveStatus.PENDING,
    };

    return this.leaveRepository.create(leaveRequestData);
  }

  async findMyRequests(user: User): Promise<{ data: LeaveRequest[] }> {
    const employee = await this.employeeModel.findOne({
      where: { userId: user.id },
    });
    if (!employee) {
      return { data: [] };
    }

    const requests = await this.leaveRepository.findByEmployeeId(employee.id);

    return {
      data: requests,
    };
  }

  async findAllRequests(status?: string): Promise<LeaveRequest[]> {
    return this.leaveRepository.findAllRequests(status);
  }

  async getRequestById(id: string): Promise<LeaveRequest> {
    const request = await this.leaveRepository.findById(id);

    if (!request) {
      throw new NotFoundException(`Leave request with the ID ${id} not found`);
    }
    return request;
  }

  async approveRequest(
    id: string,
    processedByUser: User,
  ): Promise<LeaveRequest> {
    const request = await this.leaveRepository.findById(id);

    if (!request) throw new NotFoundException('Request not found');
    const requestStatus = request.get('status');

    if (requestStatus !== LeaveStatus.PENDING) {
      throw new BadRequestException(
        `Cannot approve the request with the status ${request?.status}`,
      );
    }

    request.set('status', LeaveStatus.APPROVED);
    request.set('processedByUserId', processedByUser.id);

    return this.leaveRepository.save(request);
  }

  async rejectRequest(
    id: string,
    processedByUser: User,
  ): Promise<LeaveRequest> {
    const request = await this.leaveRepository.findById(id);

    if (!request) throw new NotFoundException('Request not found');
    const requestStatus = request.get('status');

    if (requestStatus !== LeaveStatus.PENDING) {
      throw new BadRequestException(
        `Cannot reject a request with status ${requestStatus}`,
      );
    }

    request.set('status', LeaveStatus.REJECTED);
    request.set('processedByUserId', processedByUser.id);

    return this.leaveRepository.save(request);
  }

  async deleteRequest(id: string, user: User): Promise<void> {
    const request = await this.leaveRepository.findById(id);

    if (!request) {
      throw new NotFoundException(`Leave request with the ID ${id} not found`);
    }

    // Get the employee profile of the current user
    const employee = await this.employeeModel.findOne({
      where: { userId: user.id },
    });

    if (!employee) {
      throw new ForbiddenException('User does not have an employee profile');
    }

    console.log(request);

    console.log(request.employeeId, employee.id);

    const employeeId = request.get('employeeId');
    const requestStatus = request.get('status');

    // Check if the request belongs to the current user
    if (employeeId !== employee.id) {
      throw new ForbiddenException(
        'You can only delete your own leave requests',
      );
    }

    // Only allow deletion of pending requests
    if (requestStatus !== LeaveStatus.PENDING) {
      throw new BadRequestException(
        `Cannot delete a request with status ${requestStatus}. Only pending requests can be deleted.`,
      );
    }

    await this.leaveRepository.deleteRequest(id);
  }
}
