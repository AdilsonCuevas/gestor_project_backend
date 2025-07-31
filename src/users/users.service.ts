import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { usuario } from './entity/user.entity';
import { CreateUsuarioDto } from './dto/users.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(usuario)
    private UsuarioRepository: Repository<usuario>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<usuario> {

    try {
      const hashPass = await hash(createUsuarioDto.password, 10);
      const user = this.UsuarioRepository.create({
        ...createUsuarioDto,
        password: hashPass,
      });
      return await this.UsuarioRepository.save(user);

    } catch (error) {
      throw new BadRequestException("Error registro de usuario " + error);
    };

  }

  async findAll(): Promise<usuario[]> {
    const data = await this.UsuarioRepository.find();
    return data;
  }

  async findOne(id: string) {
    const data = await this.UsuarioRepository.findOne({
      where: { id: id }
    });

    return data;
  }

  async findAllDev() {
    const data = await this.UsuarioRepository.find({
      where: {
        role: In(['developer', 'manager']),
      }
    });

    const result = data.map(dev => ({
      id: dev.id,
      name: dev.name,
      role: dev.role,
    }));

    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<usuario> {
    const usuario = await this.UsuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrada`);
    }

    const updatedTask = this.UsuarioRepository.merge(usuario, updateUserDto);
    return this.UsuarioRepository.save(updatedTask);
  }
}
