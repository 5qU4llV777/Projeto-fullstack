import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsInt()
  projectId: number;
}