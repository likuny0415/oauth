import { Injectable } from "@nestjs/common";
import { Photo, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";


@Injectable()
export class PhotoService {

    constructor(
        private prisma: PrismaService
    ) {}

    async createPhoto(request) {
        const { id, width, height, alt_description, user, urls } = request
        
       
        const { regular, thumb } = urls
        const { name, profile_image, links } = user


        console.log(request)

        // regular_url String
        // thumb_url String
        // user_name String
        // user_links_html String
        // user_profile_image_medium String

        const photo = {
            id,
            width,
            height,
            alt_description,
            regular_url: regular,
            thumb_url: thumb,
            user_name: name,
            user_links_html: links.html,
            user_profile_image_medium: profile_image.medium
        }
        
        // const createPhoto = await this.prisma.photo.create({
           
        // })
        return createPhoto
    }

   
}