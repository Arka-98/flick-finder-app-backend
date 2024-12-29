import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { KafkaModule, UserUtil } from '@flick-finder/common';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('save', function (next) {
            if (!this.isModified('password')) {
              return next();
            }

            this.password = UserUtil.hashPassword(this.password).join('.');

            next();
          });

          return schema;
        },
      },
    ]),
    KafkaModule,
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
