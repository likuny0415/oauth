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
        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await this.prisma.user.create({data})
        return {
            userId: user.id,
            email: user.email,
        }
    }

    // thirdPartyId: profile.id || jsonProfile.id,
    //     provider: profile.provider,
    //     displayName: profile.username,
    //     username: profile.login || jsonProfile.login,
    //     email: profile.email || Array.isArray(profile.emails) && profile.emails[0].value,
    //     picture: `${jsonProfile.avatar_url}&size=200`

    async signup(UserProfile) {
        const { thirdPartyId, provider, email, displayName, picture  } = UserProfile
        
        const data = { thirdPartyId, provider, email, displayName, picture  }
        const user = await this.prisma.user.create({
            data
        })
        return user
    }

    async findAll() {
        const users = await this.prisma.user.findMany();
        return users
    }

}
