import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/tareas.entity';
import { UpdateTaskDto } from './dto/tasks-update.dto';
import { usuario } from 'src/users/entity/user.entity';
import { proyecto } from 'src/projects/entity/proyecto.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,

        @InjectRepository(usuario)
        private usuarioRepository: Repository<usuario>,

        @InjectRepository(proyecto)
        private proyectoRepository: Repository<proyecto>,
    ) { }

    async update(id: string, updateTaskDto: UpdateTaskDto) {
        const existtask = await this.taskRepository.findOne({ where: { id }, });

        if (!existtask) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
        }

        const { assignedTo, projectId, ...rest } = updateTaskDto;

        Object.assign(existtask, rest);

        if (assignedTo) {
            const user = await this.usuarioRepository.findOne({
                where: { id: assignedTo },
            });
            if (!user) {
                throw new BadRequestException('Manager no encontrado');
            }
            existtask.assignedTo = user;
        }

        if (projectId) {
            const project = await this.proyectoRepository.findOne({
                where: { id: projectId },
            });
            if (!project) {
                throw new BadRequestException('Manager no encontrado');
            }
            existtask.projectId = project;
        }

        return await this.taskRepository.save(existtask);
    }

    async Delete(id: string) {
        const task = await this.taskRepository.findOneBy({ id });

        if (!task) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
        }

        await this.taskRepository.remove(task);
    }

    async findOne(id: string) {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
        }

        const dataToSend = {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            projectId: task.projectId.id,
            assignedTo: task.assignedTo.id,
            estimatedHours: task.estimatedHours,
            actualHours: task.actualHours,
            dueDate: task.dueDate,
            createdAt: task.createdAt,
        }
        return dataToSend;
    }
}
