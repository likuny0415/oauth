import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./users.schema";
import { Model } from 'mongoose'
import { NotFoundError } from "rxjs";
import { CreateUerDTO } from "./dto/create-user.dto";

@Injectable()
export class UserRepository {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    
    async createUser(id: string, authType: string): Promise<User> {
        const newUser = new User();
        if (authType == "google") {
            newUser.googleId = id;
        }
        if (authType == "facebook") {
            newUser.facebookid = id;
        }
        const curUser = new this.userModel(newUser);
        return curUser.save();
    }

    async

    async findUser(id: string): Promise<User | undefined> {
        let user
        try {
            user = await this.userModel.findOne({googleId: id}).exec();
            console.log(user)
        } catch(e) {
            return e;
        }
        if (!user) {
            throw new NotFoundException("Not find this user");
        }
        return user;
    }
}