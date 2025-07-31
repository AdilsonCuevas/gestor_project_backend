import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEnum,
    IsUUID,
    IsDateString,
    ArrayNotEmpty,
} from 'class-validator';

export enum ProyectoStatus {
    PLANNING = 'planning',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

export enum ProyectoPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export class CreateProyectoDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(ProyectoStatus)
    @IsOptional()
    status?: ProyectoStatus;

    @IsEnum(ProyectoPriority)
    @IsOptional()
    priority?: ProyectoPriority;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsUUID()
    managerId: string;

    @ArrayNotEmpty()
    @IsUUID('all', { each: true })
    developersIds: string[];
}