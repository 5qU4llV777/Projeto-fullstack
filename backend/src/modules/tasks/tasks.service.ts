import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.tasksRepository.find({ relations: { project: true, user: true }, });
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: { project: true, user: true },
    });
    if (!task) throw new NotFoundException('Tarefa não encontrada');
    return task;
  }

  create(dto: CreateTaskDto, userId: number) {
    const task = this.tasksRepository.create({
      title: dto.title,
      project: { id: dto.projectId } as any,
      user: { id: userId } as any,
    });
    return this.tasksRepository.save(task);
  }

  async update(id: number, dto: UpdateTaskDto) {
    const task = await this.findOne(id);
    Object.assign(task, dto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task);
    return { deleted: true };
  }
}