import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { JwtRefreshGuard } from './auth/jwt-refresh.guard';
import { MyMoimsService } from './myMoims/myMoims.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private myMoimsService: MyMoimsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('myMoims')
  async myMoims(@Request() req) {
    return this.myMoimsService.myMoims(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh')
  async refresh(@Request() req) {
    return this.authService.login(req.user);
  }
}
