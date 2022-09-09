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
    const obj =  {
    "id": "jwTvCQQJXh0",
    "width": 5184,
    "height": 3456,
    "alt_description": "landscape photography of woods",
    "urls": {
        "regular": "https://images.unsplash.com/photo-1516214104703-d870798883c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTkxNjJ8MHwxfHNlYXJjaHwxMXx8Zm9yZXN0fGVufDB8fHx8MTY1MDM3MjU4Mg&ixlib=rb-1.2.1&q=80&w=1080",
        "thumb": "https://images.unsplash.com/photo-1516214104703-d870798883c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTkxNjJ8MHwxfHNlYXJjaHwxMXx8Zm9yZXN0fGVufDB8fHx8MTY1MDM3MjU4Mg&ixlib=rb-1.2.1&q=80&w=200",
    },
    "user": {
      
        "id": "DeIzyLUFsbE",
        "name": "Imat Bagja Gumilar",        
        "links": {
          "html": "https://unsplash.com/@imatbagjagumilar",          
        },
        "profile_image": {
          "medium": "https://images.unsplash.com/profile-fb-1516183945-b46edb25e964.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
        }
      }
    }
  
   return obj   
  }  
  
  
}
