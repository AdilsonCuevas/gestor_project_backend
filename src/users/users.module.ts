import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usuario } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([usuario]), JwtModule],
  providers: [UsersService, usuario],
  controllers: [UsersController],
  exports: [usuario]
})
export class UsersModule {}
