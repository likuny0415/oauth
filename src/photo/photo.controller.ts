import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { Photo } from "@prisma/client";
import { PhotoService } from "./photo.service";

@Controller('photo') 
@UseGuards(AuthGuard('jwt'))
export class PhotoController {

    constructor(
        private photoService: PhotoService
    ) {}

    @Post('like')
    async createPhoto(@Body() request, @Req() req) {
        const { userId } = req.user
        request.userId = userId
        return await this.photoService.createPhoto(request)
    }

    @Get('findall')
    async findAll(@Req() req, @Query() query) {
        const { userId } = req.user    
        return await this.photoService.findAll(userId, query)
    }

} 