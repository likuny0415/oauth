import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { PhotoService } from "./photo.service";
import { PhotoController } from "./photo.controller";



@Module({
    controllers:[PhotoController],
    providers: [PrismaService, PhotoService]
    
})

export class PhotoModule {}