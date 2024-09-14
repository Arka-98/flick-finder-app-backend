import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserTypesEnum } from 'src/enums/user-types.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
    },
  },
})
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ type: Number })
  phone: number;

  @Prop({ type: Date })
  dob: Date;

  @Prop({ enum: UserTypesEnum, default: UserTypesEnum.CUSTOMER })
  type: UserTypesEnum;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
