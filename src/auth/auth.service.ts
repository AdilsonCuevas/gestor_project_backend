
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto } from 'src/users/dto/users.dto';
import { usuario } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(usuario)
    private usuarioRepository: Repository<usuario>,
  ) { }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      username: user.email,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      sub: user.id
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret:
            this.configService.get('JWT_SECRET'),
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7h',
          secret:
            this.configService.get('JWT_REFRESH'),
        }),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.findByEmail(dto.username);
    if (user && (await compare(dto.passwork, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: {
        Lastname: user.sub,
      },
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
          secret:
            '8rAAfvf0NV/QeucnoEI2Juj8f3lLt12ierdv9I/QAmi53tvMy3V16bDAB+8r4uFl/JZFE7vbFSVRprLEeEhtWg==',
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7h',
          secret:
            '0h9Ljc5jZalrQSXqOGTtd5lhewyJrAeHmTlFNK4z6b8+wQQrsOL0b4oqK+eJk0XWUJL0mL0xJse+td8e7nWw0A==',
        }),
      },
    };
  }

  async register(dto: CreateUsuarioDto) {
    try {
      const hashPass = await hash(dto.password, 10);
      const user = this.usuarioRepository.create({
        ...dto,
        password: hashPass,
      });
      return await this.usuarioRepository.save(user);

    } catch (error) {
      throw new BadRequestException("Error registro de usuario " + error);
    };
  }

  async profile() {

  }

  async findByEmail(email: string) {
    return await this.usuarioRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
