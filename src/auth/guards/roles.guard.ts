import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums/role.enum';
import { ROLES_KEY } from '../dtos/decorators/roles.decorator';
import { Request } from 'express';
import { User } from 'src/users/models/users.model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;

    return requiredRole.includes(user.role);
  }
}
