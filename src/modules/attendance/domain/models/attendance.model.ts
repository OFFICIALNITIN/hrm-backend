import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  Index,
  BelongsTo,
} from 'sequelize-typescript';

import { Employee } from 'src/modules/employees/domain/models/employee.model';

@Table({ tableName: 'attendance', timestamps: true })
export class Attendance extends Model<Attendance> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Index('employee_date_unique_idx')
  @ForeignKey(() => Employee)
  @Column({ type: DataType.UUID, allowNull: false })
  employeeId: string;

  @Index('employee_date_unique_idx')
  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  checkInTime: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  checkOutTime: Date;

  @BelongsTo(() => Employee)
  employee: Employee;
}
