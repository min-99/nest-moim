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
import { BoardsService } from './boards/boards.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly moimsService: MoimsService,
    private readonly boardsService: BoardsService,
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

  @UseGuards(JwtAuthGuard)
  @Get('board/categoryList')
  async boardCategoryList() {
    return this.boardsService.findCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Get('myMoim/:moimId/require/board/list')
  async myMoimRequireBoardListByMoimId(@Param() params) {
    const moimId = Number(params.moimId);
    const moim = await this.moimsService.findOne(moimId);
    if (moim.code === 200) {
      return this.boardsService.findByRequired();
    }
    return moim;
  }

  @UseGuards(JwtAuthGuard)
  @Get('myMoim/:moimId/board/list')
  async myMoimBoardListByMoimId(
    @Param() params,
    @Query('page') page,
    @Query('size') size,
    @Query('categoryId') categoryId,
  ) {
    const moimId = Number(params.moimId);
    const moim = await this.moimsService.findOne(moimId);
    if (moim.code === 200) {
      return this.boardsService.find({
        moimId,
        page,
        size,
        categoryId,
      });
    }
    return moim;
  }

  @UseGuards(JwtAuthGuard)
  @Get('myMoim/:moimId/board/:boardId')
  async myMoimBoardByMoimId(@Param() params, @Request() request) {
    const { userId } = request.user;
    const moimId = Number(params.moimId);
    const boardId = Number(params.boardId);
    const moim = await this.moimsService.findOne(moimId);
    if (moim.code === 200) {
      return this.boardsService.findOne({
        userId,
        moimId,
        boardId,
      });
    }
    return moim;
  }
}
