import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RolesEnum } from 'src/common/enums/roles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (_, ret) {
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

  @Prop({ enum: RolesEnum, default: RolesEnum.CUSTOMER })
  role: RolesEnum;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
