import { Module } from '@nestjs/common';
import { MyMoimsService } from './myMoims.service';

@Module({
  providers: [MyMoimsService],
  exports: [MyMoimsService],
})
export class MyMoimsModule {}
