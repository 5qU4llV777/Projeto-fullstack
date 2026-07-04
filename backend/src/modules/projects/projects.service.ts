import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {}

  findAll() {
    return this.projectsRepository.find();
  }

  async findOne(id: number) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: { tasks: true },
    });
    if (!project) throw new NotFoundException('Projeto não encontrado');
    return project;
  }

  create(dto: CreateProjectDto) {
    const project = this.projectsRepository.create(dto);
    return this.projectsRepository.save(project);
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    await this.projectsRepository.remove(project);
    return { deleted: true };
  }
}