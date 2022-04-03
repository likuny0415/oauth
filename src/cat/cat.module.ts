import { Module } from "@nestjs/common";
import { CatsService } from "./cat.service";
import { CatController } from "./cat.controller";
import { PrismaService } from "src/prisma.service";


@Module({
  
  controllers: [CatController],
  providers: [CatsService, PrismaService],
})
export class CatModule {}
