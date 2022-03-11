import { Module } from "@nestjs/common";
import { CatsService } from "./cat.service";
import { CatController } from "./cat.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Cat, CatSchema } from "./cat.schema";
import { CatRepository } from "./cat.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatController],
  providers: [CatsService, CatRepository],
})
export class CatModule {}
