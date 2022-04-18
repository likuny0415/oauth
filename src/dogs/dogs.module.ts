import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsResolver } from './dogs.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [DogsResolver, DogsService, PrismaService]
})
export class DogsModule {}
