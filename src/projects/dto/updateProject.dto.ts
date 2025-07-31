import { PartialType } from '@nestjs/mapped-types';
import { CreateProyectoDto } from './createProject.dto';

export class UpdateProjectDto extends PartialType(CreateProyectoDto) {}