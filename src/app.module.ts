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
import { BirdModule } from './bird/bird.module';

require("dotenv").config();
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
    }),
    CatModule,
    UsersModule,
    AuthModule,
    TodoModuel,
    HttpModule,
    PhotoModule,
    BirdModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
