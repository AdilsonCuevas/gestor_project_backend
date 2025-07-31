import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guards';
import { Body, Put, Param, Post, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsuarioDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtGuard)
    @Get()
    @ApiOperation({ summary: 'LIstar Usuarios por paginacion' })
    async listarProyectos() {
        return await this.usersService.findAll();
    }

    @UseGuards(JwtGuard)
    @Get('dev')
    @ApiOperation({ summary: 'LIstar Usuarios developers' })
    async listarDevelopers() {
        return await this.usersService.findAllDev();
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    @ApiOperation({ summary: 'LIstar Usuarios por paginacion' })
    async oneOuser(@Param('id') id: string) {
        return await this.usersService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Post()
    @ApiOperation({ summary: 'Crear Usuario nuevo' })
    async CreateProject(@Body() dto: CreateUsuarioDto) {
        return await this.usersService.create(dto);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Actualizacion informacion de proyecto' })
    async ActualizarProject(@Param('id') id: string, @Body() updateProjectDto: UpdateUserDto) {
        return await this.usersService.update(id, updateProjectDto);
    }
}
