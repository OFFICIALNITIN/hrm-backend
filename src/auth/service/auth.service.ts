import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login.dto';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto): Promise<{
    data: {
      token: string;
      userData: { userId: string; email: string; role: Role };
    };
  }> {
    const user = await this.userService.findUserByEmail(loginData.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      data: {
        token: access_token,
        userData: {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
      },
    };
  }
}
