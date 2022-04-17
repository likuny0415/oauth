import { Test, TestingModule } from '@nestjs/testing';
import { BirdResolver } from './bird.resolver';
import { BirdService } from './bird.service';

describe('BirdResolver', () => {
  let resolver: BirdResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BirdResolver, BirdService],
    }).compile();

    resolver = module.get<BirdResolver>(BirdResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
