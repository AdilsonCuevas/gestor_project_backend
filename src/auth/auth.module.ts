import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { usuario } from 'src/users/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuard } from './guards/jwt.guards';

@Module({

  imports: [
    TypeOrmModule.forFeature([usuario]),
    
  ],
  controllers: [AuthController],
  providers: [ JwtService, AuthService, usuario],
  exports: [],
})
export class AuthModule {}
