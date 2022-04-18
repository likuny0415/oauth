import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';

@Injectable()
export class DogsService {

  constructor(private prisma: PrismaService) {}
  
  create(createDogInput) {
    // const { age, name, toys } = createDogInput
    console.log(createDogInput)
    
    // return this.prisma.dog.create({
    //   data: createDogInput
    // })
    return {
      id: 1,
      age: 18,
      name: "dog1",
    }
  }

  findAll() {
    return [{
      id: 1,
      exampleField: 1
    },
    {
      id: 2,
      exampleField: 2
    }]
  }

  findOne(id: number) {
    return `This action returns a #${id} dog`;
  }

  update(id: number, updateDogInput: UpdateDogInput) {
    return `This action updates a #${id} dog`;
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }
}
