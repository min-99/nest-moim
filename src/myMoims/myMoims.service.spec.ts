import { Test, TestingModule } from '@nestjs/testing';
import { MyMoimsService } from './myMoims.service';

describe('MyMoimsService', () => {
  let service: MyMoimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyMoimsService],
    }).compile();

    service = module.get<MyMoimsService>(MyMoimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
