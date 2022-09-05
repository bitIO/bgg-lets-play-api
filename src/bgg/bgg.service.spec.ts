import { Test, TestingModule } from '@nestjs/testing';
import { BggService } from './bgg.service';

describe('BggService', () => {
  let service: BggService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BggService],
    }).compile();

    service = module.get<BggService>(BggService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
