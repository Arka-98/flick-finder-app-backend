import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    ConfigService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [ConfigService],
})
export class AppModule {}
