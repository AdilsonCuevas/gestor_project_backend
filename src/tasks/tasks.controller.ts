import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Put, Param, Get, UseGuards, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtGuard } from 'src/auth/guards/jwt.guards';
import { UpdateTaskDto } from './dto/tasks-update.dto';

@ApiTags('Tareas')
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @UseGuards(JwtGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Eliminar una tarea' })
    async GetTasks(@Param('id') id: string) {
        return await this.tasksService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Actualizacion de una Tarea' })
    async UpdateProject(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return await this.tasksService.update(id, updateTaskDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una tarea' })
    async DeleteProject(@Param('id') id: string) {
        return await this.tasksService.Delete(id);
    }
}
