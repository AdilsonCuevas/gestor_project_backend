import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateTaskDto } from 'src/projects/dto/createTask.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
}