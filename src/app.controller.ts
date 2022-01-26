import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { JwtRefreshGuard } from './auth/jwt-refresh.guard';
import { MoimsService } from './moims/moims.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private moimsService: MoimsService,
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

  @UseGuards(JwtAuthGuard)
  @Get('myMoims')
  async myMoims(@Query('page') page, @Query('size') size) {
    return await this.moimsService.find({ page, size });
  }

  @UseGuards(JwtAuthGuard)
  @Get('myMoim/:id')
  async myMoim(@Param() params) {
    return this.moimsService.findOne(Number(params.id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('myMoim/meeting/:id')
  async myMoimMeeting(
    @Param() params,
    @Query('page') page,
    @Query('size') size,
  ) {
    return this.moimsService.findMeetings({
      id: Number(params.id),
      page,
      size,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('myMoim/member/:id')
  async myMoimMember(
    @Param() params,
    @Query('page') page,
    @Query('size') size,
  ) {
    return this.moimsService.findMembers({
      id: Number(params.id),
      page,
      size,
    });
  }
}
