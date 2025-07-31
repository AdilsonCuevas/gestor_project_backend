import { Controller, Get, Post, Put, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './auth/guards/jwt.guards';

@ApiTags('')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(JwtGuard)
  @Get()
  @ApiOperation({ summary: 'LIstar en el rol de desarrolladores' })
  listarUsuarios(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({ summary: 'Crear Desarrollador' })
  createDev(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Eliminar Desarrollador' })
  remove(@Param('id') id: string) {

  }
}
