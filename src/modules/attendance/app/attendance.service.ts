import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { Employee } from 'src/modules/employees/domain/models/employee.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { Attendance } from '../domain/models/attendance.model';
import { getTodayDateString } from 'src/core/utils/date.utils';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    @InjectModel(Employee) private readonly employeeModel: typeof Employee,
  ) {}

  private async getEmployeeFromUser(user: User): Promise<Employee> {
    const employee = await this.employeeModel.findOne({
      where: { userId: user.id },
    });

    if (!employee) {
      throw new ForbiddenException(
        'User does not have an associated employee.',
      );
    }

    return employee;
  }

  async checkIn(user: User): Promise<Attendance> {
    const employee = await this.getEmployeeFromUser(user);
    const today = getTodayDateString();

    const existingRecord = await this.attendanceRepository.findTodaysRecord(
      employee.id,
      today,
    );

    if (existingRecord) {
      throw new ConflictException('You have already checked in today.');
    }

    return this.attendanceRepository.create({
      employeeId: employee.id,
      date: new Date(today),
      checkInTime: new Date(),
    });
  }
}
