import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { EmployeesModule } from 'src/modules/employees/employees.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), EmployeesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
