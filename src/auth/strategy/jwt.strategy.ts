import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/models/users.model';
import { Request } from 'express';

const cookieExtractor = (req: Request): string | null => {
  if (req && req.cookies) {
    return (req.cookies['access_token'] as string | undefined) || null;
  }

  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error('JWT secret is not configured');
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: { sub: string; email: string }): Promise<User> {
    const user = await this.userService.findByUserId(payload.sub);

    return user;
  }
}
