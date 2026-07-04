import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find({ select: { id: true, name: true, email: true }, });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: { id: true, name: true, email: true },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }
}