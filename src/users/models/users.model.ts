import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';
import { Employee } from 'src/modules/employees/domain/models/employee.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: Role.USER,
  })
  declare role: Role;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.UUID, allowNull: true, unique: true })
  employeeId: string;

  @BelongsTo(() => Employee)
  employee: Employee;

  @BeforeCreate
  static async hashPassword(instance: User) {
    if (instance.password && !instance.password.startsWith('$2b$')) {
      instance.password = await bcrypt.hash(instance.password, 10);
    }
  }
}
