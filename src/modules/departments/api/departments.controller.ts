import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DepartmentsService } from '../app/departments.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/dtos/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UpdateDepartmentDto } from './dtos/update-department.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Department } from '../domain/models/department.model';

@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private departmentService: DepartmentsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.HR)
  @ApiOperation({ summary: 'Create a new department' })
  @ApiResponse({
    status: 201,
    description: 'The department has been sucessfully created.',
    type: Department,
  })
  cretae(@Body() createDepartmentBody: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentBody);
  }

  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  @ApiResponse({
    status: 200,
    description: 'List of all departments.',
    type: [Department],
  })
  @Roles(Role.ADMIN, Role.HR, Role.USER)
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get department by Id' })
  @Roles(Role.ADMIN, Role.HR, Role.USER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.HR)
  @ApiOperation({ summary: 'Update a department' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartment: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(id, updateDepartment);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.departmentService.remove(id);
  }
}
