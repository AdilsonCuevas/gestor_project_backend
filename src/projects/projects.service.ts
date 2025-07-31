import { Injectable, NotFoundException } from '@nestjs/common';
import { proyecto } from './entity/proyecto.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entity/tareas.entity';
import { usuario } from 'src/users/entity/user.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { CreateProyectoDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(proyecto)
        private proyectoRepository: Repository<proyecto>,

        @InjectRepository(Task)
        private taskRepository: Repository<Task>,

        @InjectRepository(usuario)
        private usuarioRepository: Repository<usuario>,
    ) { }

    async findAll() {
        const data = await this.proyectoRepository.find();

        return data;
    }

    async create(data: CreateProyectoDto) {
        const { managerId, developersIds, ...rest } = data;

        const manager = await this.usuarioRepository.findOne({
            where: { id: managerId },
        });
        if (!manager) {
            throw new NotFoundException('Manager no encontrado');
        }

        const developers = await this.usuarioRepository.find({
            where: {
                id: In(developersIds),
            },
        });

        const proyectoNuevo = this.proyectoRepository.create({
            ...rest,
            managerId: manager,
            developersIds: developers,
        });

        return this.proyectoRepository.save(proyectoNuevo);
    }

    async findOne(id: string) {
        const proyecto = await this.proyectoRepository.findOne({
            where: { id },
            relations: ['managerId', 'developersIds'],
        });

        if (!proyecto) {
            throw new NotFoundException(`Proyecto con ID ${id} no encontrada`);
        }

        const dataToSend = {
            id: proyecto.id,
            name: proyecto.name,
            description: proyecto.description,
            status: proyecto.status,
            priority: proyecto.priority,
            startDate: proyecto.startDate,
            endDate: proyecto.endDate,
            managerId: proyecto.managerId.id,
            developersIds: proyecto.developersIds.map(dev => dev.id),
            createdAt: proyecto.createdAt
        };

        return dataToSend;
    }

    async update(id: string, data: UpdateProjectDto): Promise<proyecto> {
        const existingProject = await this.proyectoRepository.findOne({
            where: { id },
        });

        if (!existingProject) {
            throw new BadRequestException('Proyecto no encontrado');
        }

        const { managerId, developersIds, ...rest } = data;

        Object.assign(existingProject, rest);

        if (managerId) {
            const manager = await this.usuarioRepository.findOne({
                where: { id: managerId },
            });
            if (!manager) {
                throw new BadRequestException('Manager no encontrado');
            }
            existingProject.managerId = manager;
        }

        if (developersIds && Array.isArray(developersIds)) {
            const developers = await this.usuarioRepository.find({
                where: {
                    id: In(developersIds),
                },
            });
            existingProject.developersIds = developers;
        }

        return await this.proyectoRepository.save(existingProject);
    }

    async delete(id: string): Promise<void> {
        const proyecto = await this.proyectoRepository.findOneBy({ id });

        if (!proyecto) {
            throw new NotFoundException(`Proyecto con ID ${id} no encontrada`);
        }

        await this.proyectoRepository.remove(proyecto);
    }

    async findAllTask(id: string) {
        try {
            const data = await this.taskRepository.find({
                where: {
                    projectId: { id: id },
                }
            });

            const result = data.map(dev => ({
                id: dev.id,
                title: dev.title,
                description: dev.description,
                status: dev.status,
                priority: dev.priority,
                projectId: dev.projectId.id,
                assignedTo: dev.assignedTo.name,
                estimatedHours: dev.estimatedHours,
                actualHours: dev.actualHours,
                dueDate: dev.dueDate,
                createdAt: dev.createdAt,
            }));

            return result;
        } catch (error) {
            throw new NotFoundException("Error encontrar tareas" + error);
        }
    }

    async createTask(id: string, data: CreateTaskDto) {
        const project = await this.proyectoRepository.findOne({ where: { id: id } });
        if (!project) {
            throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
        }

        if (data.assignedTo) {
            const user = await this.usuarioRepository.findOne({ where: { id: data.assignedTo } });
            if (!user) {
                throw new NotFoundException(`Usuario con ID ${data.assignedTo} no encontrado`);
            } else {
                const task = this.taskRepository.create({
                    ...data,
                    projectId: project,
                    assignedTo: user
                });


                const datos = await this.taskRepository.save(task);
                return datos;
            }
        }
    }
}
