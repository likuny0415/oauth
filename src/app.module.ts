import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { TodoController } from './todo/todo.controller';
import { TodoModuel } from './todo/todo.module';



require('dotenv').config()
@Module({
  imports: [
    CatModule,
    UsersModule,
    AuthModule,
    TodoModuel
  ],
  controllers: [AppController],
  providers: [AppService,     PrismaService
  ],
})
export class AppModule {}
