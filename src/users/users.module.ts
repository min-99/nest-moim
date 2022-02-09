import { Module } from '@nestjs/common';
import { MocksService } from 'src/mocks/mocks.service';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, MocksService],
  exports: [UsersService],
})
export class UsersModule {}
