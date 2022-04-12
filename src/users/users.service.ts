import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(provider: string, thirdPartyId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        provider: provider,
        thirdPartyId: thirdPartyId,
      },
    });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
        where: {
            email: email
        },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({ data });
    return {
      userId: user.id,
      email: user.email,
    };
  }

  // Passport signup
  async createUser(email: string, password: string) {
    const provider = "local";

    const salt = await bcrypt.genSalt(10)
    
    password = await bcrypt.hash(password, salt);
    
    const data = { email, password, provider };

    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  async verifyUser(passwordFromUser: string, passwordInDb: string) {
    const result = await bcrypt.compare(passwordFromUser, passwordInDb)
    return result
  }

  // OAuth login
  async signup(UserProfile) {
    const { thirdPartyId, provider, email, displayName, picture } = UserProfile;

    const data = { thirdPartyId, provider, email, displayName, picture };
    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }
}
