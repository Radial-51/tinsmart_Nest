import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  } 

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const { password, ...rest } = updateUserDto;
    if (id !== undefined) {
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userRepository.update(id, { ...rest, password: hashedPassword });
      } else {
        await this.userRepository.update(id, rest);
      }
      return this.userRepository.findOne({ where: { id } });
    } else {
      return undefined; // Retorna undefined si el id es undefined
    }
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async resetPassword(userId: number, newPassword: string): Promise<void> {
    if (!newPassword) {
      throw new BadRequestException('La nueva contraseña no puede estar vacía');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(userId, { password: hashedPassword });
  }
}
