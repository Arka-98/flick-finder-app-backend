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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TheatersService } from './theaters.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { Types } from 'mongoose';
import { GetTheaterDto } from './dto/get-theater.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';

@ApiBearerAuth()
@Roles(RolesEnum.ADMIN, RolesEnum.VENDOR)
@ApiTags('theaters')
@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Get()
  @ApiOkResponse({
    type: GetTheaterDto,
    description: 'Get all theaters',
    isArray: true,
  })
  async findAllTheaters() {
    return this.theatersService.findAllTheaters();
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetTheaterDto,
    description: 'Get theater by ID',
  })
  async findTheaterById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.theatersService.findTheaterById(id);
  }

  @Post()
  @ApiOkResponse({
    type: GetTheaterDto,
    description: 'Create new theater',
  })
  async createTheater(@Body() createTheaterDto: CreateTheaterDto) {
    return this.theatersService.createTheater(createTheaterDto);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: GetTheaterDto,
    description: 'Update theater',
  })
  async updateTheater(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateTheaterDto: CreateTheaterDto,
  ) {
    return this.theatersService.updateTheater(id, updateTheaterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete theater',
  })
  async deleteTheater(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.theatersService.deleteTheater(id);
  }
}
