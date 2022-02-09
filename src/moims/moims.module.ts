import { Module } from '@nestjs/common';
import { MocksService } from 'src/mocks/mocks.service';
import { MoimsService } from './moims.service';

@Module({
  providers: [MoimsService, MocksService],
  exports: [MoimsService],
})
export class MoimsModule {}
