import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetMovieDto } from './dto/get-movie.dto';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { Types } from 'mongoose';
import { CustomRequest } from 'src/common/interfaces/custom-request.interface';

@ApiBearerAuth()
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    type: GetMovieDto,
    description: 'Get all movies',
    isArray: true,
  })
  getMovies() {
    return this.moviesService.findAllMovies();
  }

  @Get('me')
  @ApiOkResponse({
    type: GetMovieDto,
    description: 'Get movies booked by user',
  })
  getMoviesByAuthenticatedUser(@Request() request: CustomRequest) {
    return this.moviesService.findMovieByUserId(request.user.sub);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({
    type: GetMovieDto,
    description: 'Get movie by ID',
  })
  @ApiNoContentResponse({
    description: 'Movie not found',
    status: HttpStatus.NO_CONTENT,
  })
  getMovieById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
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
  updateMovie(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateMovieDto: CreateMovieDto,
  ) {
    return this.moviesService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: GetMovieDto,
    description: 'Delete movie by ID',
  })
  deleteMovie(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.moviesService.deleteMovie(id);
  }
}
