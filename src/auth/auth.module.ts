import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UserRepository } from 'src/users/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.schema';

@Module({
  imports:[UsersModule, MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
