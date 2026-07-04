import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user: User) => user.tasks)
  user: User;

  @ManyToOne(() => Project, (project: Project) => project.tasks)
  project: Project;
}
