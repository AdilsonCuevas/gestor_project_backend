import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuario } from 'src/users/entity/user.entity';
import { proyecto } from './entity/proyecto.entity';
import { Task } from 'src/tasks/entity/tareas.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([usuario]), 
    TypeOrmModule.forFeature([Task]), 
    TypeOrmModule.forFeature([proyecto]), 
    JwtModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, usuario, proyecto, Task],
  exports: [proyecto],
})
export class ProjectsModule {}
