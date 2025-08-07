import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { usuario } from 'src/users/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuard } from './guards/jwt.guards';
import { proyecto } from 'src/projects/entity/proyecto.entity';
import { Task } from 'src/tasks/entity/tareas.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([usuario]),
    TypeOrmModule.forFeature([proyecto]),
    TypeOrmModule.forFeature([Task])
  ],
  controllers: [AuthController],
  providers: [JwtService, AuthService, usuario],
  exports: [],
})
export class AuthModule { }
