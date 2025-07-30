import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { LeaveStatus } from 'src/common/enums/leaveStatus.enum';
import { LeaveType } from 'src/common/enums/leaveType.enum';
import { Employee } from 'src/modules/employees/domain/models/employee.model';
import { User } from 'src/users/models/users.model';

@Table({ tableName: 'leave_request', timestamps: true })
export class LeaveRequest extends Model<LeaveRequest> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM(...Object.values(LeaveType)),
    allowNull: false,
  })
  type: LeaveType;

  @Column({
    type: DataType.ENUM(...Object.values(LeaveStatus)),
    defaultValue: LeaveStatus.PENDING,
    allowNull: false,
  })
  status: LeaveStatus;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reason: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  rejectReason: string;

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  employeeId: string;

  @BelongsTo(() => Employee, 'employeeId')
  employee: Employee;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  processedByUserId: string;

  @BelongsTo(() => User, 'processedByUserId')
  processedBy: User;
}
