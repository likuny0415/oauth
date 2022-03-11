
import { Model, FilterQuery } from 'mongoose';
import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatRepository } from './cat.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catRepository: CatRepository) {}

  async create(name: string, age: number, breed: string): Promise<Cat> {
    return await this.catRepository.create(
        {
            name,
            age,
            breed
        }
    )
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.findAll({});
  }

  async removeCat(name: string, age: number, breed: string) {
    return this.catRepository.removeCat({
      name,
      age,
      breed
  });
  }
}