import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUserById(id: Types.ObjectId) {
    return this.userModel.findById(id).exec();
  }

  async getUsers() {
    return this.userModel.find({}).exec();
  }

  async updateUserById(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, { $set: updateUserDto }).exec();
  }

  async deleteUserById(id: Types.ObjectId) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
