import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const accessToken = this.jwtService.sign({
      username: user.username,
      sub: user.userId,
    });
    const refreshToken = this.jwtService.sign(
      {
        username: user.username,
        sub: user.userId,
      },
      {
        secret: jwtConstants.refreshSecret,
        expiresIn: '1440m',
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
