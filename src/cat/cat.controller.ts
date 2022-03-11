import { Body, Controller, Get, Post } from '@nestjs/common';
import { Cat } from './cat.schema';
import { CatsService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatsService) {}

  @Post("create")
  async addCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catService.create(createCatDto.name, createCatDto.age, createCatDto.breed);
  }

  @Get("find")
  async getAllCats(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Post('delete')
  async removeCat(@Body() createCatDto: CreateCatDto) {
    return this.catService.removeCat(createCatDto.name, createCatDto.age, createCatDto.breed);
  }
}
