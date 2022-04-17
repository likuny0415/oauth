import { Module } from '@nestjs/common';
import { BirdService } from './bird.service';
import { BirdResolver } from './bird.resolver';

@Module({
  providers: [BirdResolver, BirdService]
})
export class BirdModule {}
