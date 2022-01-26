import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoimsService } from './moims/moims.service';
import { MoimsModule } from './moims/moims.module';

@Module({
  imports: [AuthModule, UsersModule, MoimsModule],
  controllers: [AppController],
  providers: [AppService, MoimsService],
})
export class AppModule {}
