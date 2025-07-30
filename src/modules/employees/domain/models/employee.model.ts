import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Department } from 'src/modules/departments/domain/models/department.model';
import { User } from 'src/users/models/users.model';

@Table({
  tableName: 'employees',
  timestamps: true,
})
export class Employee extends Model<Employee> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  jobTitle: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  hireDate: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  salary: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false, unique: true })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;
}
