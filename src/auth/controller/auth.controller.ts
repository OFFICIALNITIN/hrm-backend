import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../service/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { currentUser } from '../decorators/current-user.decorator';
import { User } from 'src/users/models/users.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const {
      data: { token, userData },
    } = await this.authService.login(loginDto);

    // const csrf = randomBytes(16).toString('hex');

    // 1. Set the main authentication JWT cookie (HttpOnly)

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(Date.now() + 3600 * 1000 * 24),
    });

    // 2. Set the CSRF token cookie ( NOT HttpOnly)

    // response.cookie('csrf-token', csrf, {
    //   httpOnly: false,
    //   secure: process.env.NODE_ENV === ' production',
    //   sameSite: 'strict',
    //   expires: new Date(Date.now() + 3600 * 1000 * 24),
    // });

    return userData;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('csrf-token');

    return { message: 'Logged Out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verifyAuth(@currentUser() user: User) {
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
