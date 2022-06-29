import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CatModule } from "./cat/cat.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma.service";
import { TodoModuel } from "./todo/todo.module";
import { HttpModule } from "@nestjs/axios";
import { PhotoModule } from "./photo/photo.module";
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ApolloDriver } from "@nestjs/apollo";


require("dotenv").config();
@Module({
  imports: [

    CatModule,
    UsersModule,
    AuthModule,
    TodoModuel,
    HttpModule,
    PhotoModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
