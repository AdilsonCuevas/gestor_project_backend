import { AuthService } from './auth.service';
import { Body, Controller, Get, Query, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';
import { RefreshJwtGuard } from './guards/refresh.guards';
import { JwtGuard } from './guards/jwt.guards';
import { CreateUsuarioDto } from 'src/users/dto/users.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesion' })
    async login(@Body() dto: LoginDto) {
        return await this.authService.login(dto);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    @ApiOperation({ summary: 'Refrescar el token de loggin' })
    async refreshToken(@Request() req) {
        return await this.authService.refreshToken(req);
    }

    @Post('register')
    @ApiOperation({ summary: 'registrar usuario sin autenticacion' })
    async register(@Body() dto: CreateUsuarioDto) {
        return await this.authService.register(dto);
    }

    @UseGuards(JwtGuard)
    @Get('profile')
    @ApiOperation({ summary: 'Visualisar informacion del usuario loggeado' })
    async profile() {
        //return await this.authService.profile();
    }

    @UseGuards(JwtGuard)
    @Get('dashboard')
    @ApiOperation({ summary: 'LIstar Usuarios por paginacion' })
    async dashboard(@Query('role') role: string,
        @Query('email') email: string
    ) {
        return await this.authService.dashboard(role, email);
    }
}
