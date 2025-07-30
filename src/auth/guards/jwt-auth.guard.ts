import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  //   constructor(private jwtService: JwtService) {
  //     super();
  //   }
  //   canActivate(context: ExecutionContext): boolean {
  //     const request = context.switchToHttp().getRequest<Request>();
  //     const token = request.cookies?.access_token as string;
  //     if (!token) {
  //       throw new UnauthorizedException('No authentication token found');
  //     }
  //
  //     try {
  //       const payload = this.jwtService.verify<object>(token, {
  //         secret: process.env.JWT_SECRET,
  //       });
  //
  //       request.user = payload;
  //       return true;
  //     } catch (error) {
  //       throw new UnauthorizedException('Invalid authentication token');
  //     }
  //   }
}
