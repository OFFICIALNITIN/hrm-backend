import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LeaveRequest } from '../domain/leave-request.model';
import { CreateLeaveRequest } from '../api/dto/create-leave-request.dto';
import { Employee } from 'src/modules/employees/domain/models/employee.model';
import { User } from 'src/users/models/users.model';
import { Department } from 'src/modules/departments/domain/models/department.model';
import { raw } from 'express';

@Injectable()
export class LeaveRepository {
  constructor(
    @InjectModel(LeaveRequest)
    private readonly leaveRequestModel: typeof LeaveRequest,
  ) {}

  async create(leaveRequestData: CreateLeaveRequest): Promise<LeaveRequest> {
    return this.leaveRequestModel.create(leaveRequestData as any);
  }

  async findById(id: string): Promise<LeaveRequest | null> {
    return this.leaveRequestModel.findOne({
      where: { id },
      include: [
        {
          model: Employee,
          include: [
            { model: User, attributes: { exclude: ['password'] } },
            { model: Department },
          ],
        },
      ],
    });
    // return this.leaveRequestModel.findOne(where, {
    //   include: [
    //     {
    //       model: Employee,
    //       include: [
    //         { model: User, attributes: { exclude: ['password'] } },
    //         { model: Department },
    //       ],
    //     },
    //   ],
    // });
  }

  async findByEmployeeId(employeeId: string): Promise<LeaveRequest[]> {
    return this.leaveRequestModel.findAll({
      where: { employeeId },
      order: [['createdAt', 'DESC']],
      include: [{ model: Employee }],
    });
  }

  async findAllRequests(status?: string): Promise<LeaveRequest[]> {
    if (status === 'all') {
      return this.leaveRequestModel.findAll({
        include: [
          {
            model: Employee,
            include: [{ model: User, attributes: { exclude: ['password'] } }],
            order: [['createdAt', 'ASC']],
          },
        ],
      });
    }
    return this.leaveRequestModel.findAll({
      where: { status: status },
      include: [
        {
          model: Employee,
          include: [{ model: User, attributes: { exclude: ['password'] } }],
          order: [['createdAt', 'ASC']],
        },
      ],
    });
  }

  async deleteRequest(id: string): Promise<number> {
    return this.leaveRequestModel.destroy({
      where: { id },
    });
  }

  async save(request: LeaveRequest): Promise<LeaveRequest> {
    return request.save();
  }
}
