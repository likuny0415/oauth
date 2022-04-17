import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Cat } from '@prisma/client';

import { CatsService } from './cat.service';


@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatsService,
    private readonly http: HttpService) {}
  

  @Post("create")
  async createCat(@Body() catData) {
    return this.catService.create(catData)
  }
  
  @Post("find")
  async findOne(@Body() catData: Cat) {
    return this.catService.findOne(catData)
  }

  @Get() 

  Me() {
    const obj = {
      "id": "rZBmXd-oqW8",
      "width": 2925,
      "height": 4259,
      "alt_description": "person holding boxed water underwater",
      "urls": {
          "regular": "https://images.unsplash.com/photo-1564419429381-98dbcf916478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTkxNjJ8MXwxfHNlYXJjaHwxfHxzZWF8ZW58MHx8fHwxNjQ5ODM3NTgx&ixlib=rb-1.2.1&q=80&w=1080",
          "thumb": "https://images.unsplash.com/photo-1564419429381-98dbcf916478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTkxNjJ8MXwxfHNlYXJjaHwxfHxzZWF8ZW58MHx8fHwxNjQ5ODM3NTgx&ixlib=rb-1.2.1&q=80&w=200"
      },
      "user": {
          "id": "8Ae1yJe8OoA",
          "username": "boxedwater",
          "name": "Boxed Water Is Better",
          "profile_image": {
              "small": "https://images.unsplash.com/profile-1557251674406-effb9d313841?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
              "medium": "https://images.unsplash.com/profile-1557251674406-effb9d313841?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
              "large": "https://images.unsplash.com/profile-1557251674406-effb9d313841?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
          }
      }
  }
   return obj   
  }  
  
  
}
