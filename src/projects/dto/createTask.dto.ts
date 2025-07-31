import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsUUID,
    IsNumber,
    IsDateString,
    IsOptional,
} from 'class-validator';

export enum ProyectoStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    REVIEW = 'review',
    DONE = 'done',
}

export enum ProyectoPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(ProyectoStatus)
    @IsOptional()
    status?: ProyectoStatus;

    @IsEnum(ProyectoPriority)
    @IsOptional()
    priority?: ProyectoPriority;

    @IsUUID()
    projectId: string;

    @IsUUID()
    assignedTo: string;

    @IsNumber()
    estimatedHours: number;

    @IsNumber()
    actualHours: number;

    @IsDateString()
    dueDate: Date;
}
