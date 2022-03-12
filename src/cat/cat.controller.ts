import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Cat } from './cat.schema';
import { CatsService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
require('dotenv').config();
@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatsService) {}

  @Post("create")
  async addCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catService.create(createCatDto.name, createCatDto.age, createCatDto.breed);
  }

  @Get("findAll")
  async getAllCats(): Promise<Cat[]> {
    console.log(process.env.KEY)
    return this.catService.findAll();
  }

  @Post('delete')
  async removeCat(@Body() createCatDto: CreateCatDto) {
    return this.catService.removeCat(createCatDto.name, createCatDto.age, createCatDto.breed);
  }

  @Get(':id')
  async findOne(@Param("id") params): Promise<Cat | undefined> {
    console.log(params)
    return this.catService.findOne(params)
  }
}
