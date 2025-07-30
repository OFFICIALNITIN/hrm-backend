import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LeaveService } from '../app/leave.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { CreateLeaveRequest } from './dto/create-leave-request.dto';
import { currentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/models/users.model';
import { Roles } from 'src/auth/dtos/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ProcessLeaveRequestDto } from './dto/process-leave-request.dto';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Roles(Role.ADMIN, Role.HR, Role.USER)
  @Post()
  create(@Body() createDto: CreateLeaveRequest, @currentUser() user: User) {
    return this.leaveService.create(createDto, user);
  }

  @Roles(Role.USER, Role.ADMIN, Role.HR)
  @Get('my/requests')
  findMyRequests(@currentUser() user: User) {
    return this.leaveService.findMyRequests(user);
  }

  @Roles(Role.HR, Role.ADMIN)
  @Get('all/requests')
  findAllPending(@Query('status') status?: string) {
    console.log(status);
    return this.leaveService.findAllRequests(status);
  }

  @Roles(Role.HR, Role.ADMIN)
  @Patch(':id/approve')
  approveRequest(
    @Param('id', ParseUUIDPipe) id: string,
    @currentUser() user: User,
  ) {
    return this.leaveService.approveRequest(id, user);
  }

  @Roles(Role.HR, Role.ADMIN)
  @Patch(':id/reject')
  rejectRequest(
    @Param('id', ParseUUIDPipe) id: string,
    body: ProcessLeaveRequestDto,
    @currentUser() user: User,
  ) {
    return this.leaveService.rejectRequest(id, user);
  }

  @Roles(Role.USER)
  @Delete(':id')
  deleteRequest(
    @Param('id', ParseUUIDPipe) id: string,
    @currentUser() user: User,
  ) {
    return this.leaveService.deleteRequest(id, user);
  }
}
