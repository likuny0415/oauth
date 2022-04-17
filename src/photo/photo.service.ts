import { Injectable } from "@nestjs/common";
import { Photo } from "@prisma/client";
import { PrismaService } from "src/prisma.service";


@Injectable()
export class PhotoService {

    constructor(
        private prisma: PrismaService
    ) {}

    async createPhoto(request) {
        const { id, width, height, alt_description, user, urls } = request
        
        // urls.regular, urls.thumb
        const { regular, thumb } = urls

        const createPhoto = await this.prisma

        // const createUrls = await this.prisma.url.createMany({
        //     data: [
        //         { photoId: id, format: "regular", link: regular},
        //         { photoId: id, format: "thumb", link: thumb }
        //     ]
        // })
        return 
    }

   
}