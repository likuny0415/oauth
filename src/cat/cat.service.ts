
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cat, Prisma } from '@prisma/client';
import { map } from 'rxjs';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService,
    private httpService: HttpService) {}

  async create(data: Prisma.CatCreateInput) {
    return this.prisma.cat.create({data})
  }

  async findOne(catData: Cat) {
    return this.prisma.cat.findMany({
      where: {
        name: catData.name,

      }
    })
  }

  findAll(htttRequest: string) {
    return this.httpService.get(htttRequest).pipe(
      map(response => response.data)
    )
  }
}