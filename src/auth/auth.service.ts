import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersUtils } from '../users/users.utils';
import { SecuredUser } from '../users/users.types';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<SecuredUser> {
    const user = await this.usersService.getByUsername(username);
    if (user && user.password === pass) {
      return UsersUtils.secureUserData(user);
    }
    return null;
  }

  async login(user: SecuredUser): Promise<JwtPayload> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
