import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    googleId: string

    @Prop()
    facebookid: string
}

export const UserSchema = SchemaFactory.createForClass(User);


