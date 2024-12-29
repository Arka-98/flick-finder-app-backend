import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@flick-finder/common';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  @ApiOkResponse({
    description: 'Health check',
  })
  healthCheck() {
    return this.appService.healthCheck();
  }
}
