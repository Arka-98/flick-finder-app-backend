import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetMovieDto } from './dto/get-movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOkResponse({
    type: GetMovieDto,
    description: 'Get all movies',
    isArray: true,
  })
  getMovies() {
    return this.moviesService.findAllMovies();
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetMovieDto,
    description: 'Get movie by ID',
  })
  getMovieById(@Param('id') id: string) {
    return this.moviesService.findMovieById(id);
  }

  @Post()
  @ApiOkResponse({
    type: GetMovieDto,
    description: 'Create new movie',
    isArray: false,
  })
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: GetMovieDto,
    description: 'Update movie by ID',
  })
  updateMovie(@Param('id') id: string, @Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.updateMovie(id, createMovieDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: GetMovieDto,
    description: 'Delete movie by ID',
  })
  deleteMovie(@Param('id') id: string) {
    return this.moviesService.deleteMovie(id);
  }
}
