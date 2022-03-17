import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document

@Schema()
export class User {

    @Prop()
    provider: string

    @Prop()
    thirdPartyId: string
}

export const UserSchema = SchemaFactory.createForClass(User);


