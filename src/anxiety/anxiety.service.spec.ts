import { Test, TestingModule } from '@nestjs/testing';
import { AnxietyService } from './anxiety.service';

describe('AnxietyService', () => {
  let service: AnxietyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnxietyService],
    }).compile();

    service = module.get<AnxietyService>(AnxietyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
