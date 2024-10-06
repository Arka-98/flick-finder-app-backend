import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Theater } from './schemas/theater.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TheatersService {
  constructor(
    @InjectModel(Theater.name) private readonly theaterModel: Model<Theater>,
  ) {}

  async findAllTheaters() {
    return this.theaterModel.find();
  }

  async findTheaterById(id: Types.ObjectId) {
    return this.theaterModel.findById(id);
  }

  async createTheater(theater: Theater) {
    return this.theaterModel.create(theater);
  }

  async updateTheater(id: Types.ObjectId, theater: Theater) {
    return this.theaterModel.findByIdAndUpdate(id, theater, {
      new: true,
    });
  }

  async deleteTheater(id: Types.ObjectId) {
    return this.theaterModel.findByIdAndDelete(id);
  }
}
