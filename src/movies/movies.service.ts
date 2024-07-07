import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async createMovie(movie: CreateMovieDto) {
    const createdMovie = new this.movieModel(movie);

    return createdMovie.save();
  }

  async findMovieById(id: string) {
    const movie = await this.movieModel.findById(id);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async findAllMovies() {
    return this.movieModel.find();
  }

  async updateMovie(id: string, movie: CreateMovieDto) {
    return this.movieModel.findByIdAndUpdate(id, { $set: movie });
  }

  async deleteMovie(id: string) {
    const deletedMovie = await this.movieModel.findByIdAndDelete(id);

    if (!deletedMovie) {
      throw new NotFoundException('Movie not found');
    }

    return deletedMovie;
  }
}
