import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entity/tareas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { proyecto } from 'src/projects/entity/proyecto.entity';
import { usuario } from 'src/users/entity/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Task, proyecto, usuario]), JwtModule],
  controllers: [TasksController],
  providers: [TasksService, Task],
  exports: [Task]
})
export class TasksModule { }
