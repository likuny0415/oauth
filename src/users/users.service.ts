import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';


@Injectable()
export class UsersService {

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findOne(provider: string, thirdPartyId: string) {
        
        const user = await this.prisma.user.findFirst({
            where: {
                provider: provider,
                thirdPartyId: thirdPartyId
            }
        })
        if (user) {
            return {
                code:200,
                userId: user.id
            }
        } else {
            return {
                code:200,
                msg: "Not find"
            }
        }
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await this.prisma.user.create({data})
        return {
            userId: user.id,
            email: user.email,
        }
    }

    async signup(UserProfile) {
        const { thirdPartyId, provider, email, displayName, picture  } = UserProfile
        
        const data = { thirdPartyId, provider, email, displayName, picture  }
        const user = await this.prisma.user.create({
            data
        })
        return {
            userId: user.id,
            email: user.email,
        }
    }

    async findAll() {
        const users = await this.prisma.user.findMany();
        return users
    }

}
