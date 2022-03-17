import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./users.schema";
import { Model } from 'mongoose'

@Injectable()
export class UserRepository {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    
    async create(provider: string, thirdPartyId: string): Promise<User> {
        const curUser = new this.userModel({provider, thirdPartyId});
        return curUser.save();
    }


    async findOne(provider: string, thirdPartyId: string): Promise<User | undefined> {
        const user = await this.userModel.findOne( { provider, thirdPartyId }).exec();
        
        if (!user) {
            throw new NotFoundException('Could not find user.');
        }
        return user;
    }

    async findAll() {
        return await this.userModel.find();
    }
}