import { Module } from '@nestjs/common';
import { MoimsService } from './moims.service';

@Module({
  providers: [MoimsService],
  exports: [MoimsService],
})
export class MoimsModule {}
