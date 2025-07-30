import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from '../app/employees.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/dtos/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { updateEmployeeDto } from './dtos/update-employee.dto';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}
  @Post()
  @Roles(Role.ADMIN, Role.HR)
  create(@Body() createEmployeeBody: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeBody);
  }

  @Get()
  @Roles(Role.ADMIN, Role.HR, Role.USER)
  findAll() {
    return this.employeeService.findAll();
  }

  @Get('detail/:id')
  @Roles(Role.USER, Role.ADMIN, Role.HR)
  findByUserId(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.findByUserId(id);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.HR)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.HR)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeeBody: updateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeBody);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.HR)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.remove(id);
  }
}
