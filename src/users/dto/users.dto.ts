import { IsString, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';

export enum Roles {
    ADMIN = 'admin',
    MANAGER = 'manager',
    DEVELOPER = 'developer',
}

export class CreateUsuarioDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(Roles)
    @IsOptional()
    role?: Roles;

    @IsString()
    @IsOptional()
    avatar?: string;
}