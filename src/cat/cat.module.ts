import { Module } from "@nestjs/common";
import { CatsService } from "./cat.service";
import { CatController } from "./cat.controller";
import { PrismaService } from "src/prisma.service";
import { HttpModule } from "@nestjs/axios";


@Module({
  imports: [
    HttpModule
  ],
  controllers: [CatController],
  providers: [CatsService, PrismaService],
})
export class CatModule {}
