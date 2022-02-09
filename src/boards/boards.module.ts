import { Module } from '@nestjs/common';
import { MocksService } from 'src/mocks/mocks.service';
import { BoardsService } from './boards.service';

@Module({
  providers: [BoardsService, MocksService],
  exports: [BoardsService],
})
export class BoardsModule {}
