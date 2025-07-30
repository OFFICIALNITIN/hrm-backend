import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attendance } from '../domain/models/attendance.model';
import { Employee } from 'src/modules/employees/domain/models/employee.model';
import { User } from 'src/users/models/users.model';

@Injectable()
export class AttendanceRepository {
  constructor(
    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,
  ) {}

  async create(data: Partial<Attendance>): Promise<Attendance> {
    return this.attendanceModel.create(data as Attendance);
  }

  async findTodaysRecord(
    employeeId: string,
    date: string,
  ): Promise<Attendance | null> {
    return this.attendanceModel.findOne({ where: { employeeId, date } });
  }

  async findByEmployeeId(employeeId: string): Promise<Attendance[]> {
    return this.attendanceModel.findAll({
      where: { employeeId },
      order: [['date', 'DESC']],
    });
  }

  async findByDate(date: string): Promise<Attendance[]> {
    return this.attendanceModel.findAll({
      where: { date },
      include: [
        {
          model: Employee,
          include: [{ model: User, attributes: ['id', 'email'] }],
        },
      ],
    });
  }

  async save(attendance: Attendance): Promise<Attendance> {
    return attendance.save();
  }
}
