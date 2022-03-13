import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cat, CatDocument } from "./cat.schema";
import { Model, FilterQuery } from 'mongoose';


@Injectable()
export class CatRepository {
    constructor(
        @InjectModel(Cat.name) private catModel: Model<CatDocument>
    ){}

    
    async create(cat: Cat): Promise<Cat> {
        const newCat = new this.catModel(cat);
        return newCat.save()
    }

    async findAll(catFilterQuery: FilterQuery<Cat>): Promise<Cat[]> {
        return this.catModel.find(catFilterQuery);
    }

    async removeCat(cat: Cat) {
        return this.catModel.deleteOne(cat);
    }

    async findOne(id: string): Promise<Cat | undefined> {
        let cat;
        try {
            cat = await this.catModel.findById({_id: id}).exec()
            console.log(cat);
        } catch (e) {
            throw new NotFoundException('Could not find cat.'); 
        }
        if (!cat) {
            throw new NotFoundException("Not find the cat")
        }
        return cat;
    }
}