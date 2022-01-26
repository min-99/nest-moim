import { Test, TestingModule } from '@nestjs/testing';
import { MoimsService } from './moims.service';

describe('MoimsService', () => {
  let service: MoimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoimsService],
    }).compile();

    service = module.get<MoimsService>(MoimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
