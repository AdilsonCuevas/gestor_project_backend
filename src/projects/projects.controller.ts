import { Body, Controller, Get, Post, Put, Param, UseGuards, Delete, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtGuard } from 'src/auth/guards/jwt.guards';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProyectoDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { CreateTaskDto } from './dto/createTask.dto';

@ApiTags('Proyectos')
@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) { }

    @UseGuards(JwtGuard)
    @Get()
    @ApiOperation({ summary: 'LIstar proyectos' })
    async listarProyectos() {
        return await this.projectsService.findAll();
    }

    @UseGuards(JwtGuard)
    @Post()
    @ApiOperation({ summary: 'Crear Proyecto nuevo' })
    async CreateProject(@Body() dto: CreateProyectoDto) {
        return await this.projectsService.create(dto);
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    @ApiOperation({ summary: 'informacion de un proyecto' })
    async allOneProject(@Param('id') id: string) {
        return await this.projectsService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Actualizacion informacion de proyecto' })
    async ActualizarProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return await this.projectsService.update(id, updateProjectDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un proyecto' })
    async DeleteProject(@Param('id') id: string) {
        return await this.projectsService.delete(id);
    }

    @UseGuards(JwtGuard)
    @Get(':id/tasks')
    @ApiOperation({ summary: 'LIstar tareas de un proyecto' })
    async listarTasks(@Param('id') id: string) {
        return await this.projectsService.findAllTask(id);
    }

    @UseGuards(JwtGuard)
    @Post(':id/tasks')
    @ApiOperation({ summary: 'Crear Tarea nueva a un proyecto' })
    async CreateTask(@Param('id') id: string, @Body() dto: CreateTaskDto) {
        return await this.projectsService.createTask(id, dto);
    }

}
