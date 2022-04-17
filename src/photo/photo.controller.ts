import { Body, Controller, Post } from "@nestjs/common";
import { Photo } from "@prisma/client";
import { PhotoService } from "./photo.service";

@Controller('photo') 
export class PhotoController {

    constructor(
        private photoService: PhotoService
    ) {}

    @Post('like')
    async createPhoto(@Body() request) {
        return await this.photoService.createPhoto(request)
    }
} 