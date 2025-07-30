import { Controller, Post, UseGuards } from '@nestjs/common';
import { AttendanceService } from '../app/attendance.service';
import { User } from 'src/users/models/users.model';
import { Roles } from 'src/auth/dtos/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { currentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Roles(Role.ADMIN, Role.HR, Role.USER)
  @Post('check-in')
  checkIn(@currentUser() user: User) {
    return this.attendanceService.checkIn(user);
  }
}
