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
  constructor(private moviesService: MoviesService) {}

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
    description: 'Get movie by id',
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
    description: 'Update movie',
  })
  updateMovie(@Param('id') id: string, @Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.updateMovie(id, createMovieDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: GetMovieDto,
    description: 'Delete movie',
  })
  deleteMovie(@Param('id') id: string) {
    return this.moviesService.deleteMovie(id);
  }
}
