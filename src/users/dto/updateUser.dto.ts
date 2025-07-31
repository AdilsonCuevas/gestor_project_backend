import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './users.dto';

export class UpdateUserDto extends PartialType(CreateUsuarioDto) {}