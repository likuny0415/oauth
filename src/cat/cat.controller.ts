import { Body, Controller, Post } from '@nestjs/common';
import { Cat } from '@prisma/client';

import { CatsService } from './cat.service';


@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatsService) {}
  

  @Post("create")
  async createCat(@Body() catData) {
    return this.catService.create(catData)
  }
  
  @Post("find")
  async findOne(@Body() catData: Cat) {
    return this.catService.findOne(catData)
  }
  
}
