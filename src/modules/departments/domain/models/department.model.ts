import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Employee } from 'src/modules/employees/domain/models/employee.model';

@Table({
  tableName: 'departments',
  timestamps: true,
})
export class Department extends Model<Department> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Employee)
  employees: Employee[];
}
