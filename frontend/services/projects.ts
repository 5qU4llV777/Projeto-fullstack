import api from './api';
import { Project } from '../types';

export async function getProjects(): Promise<Project[]> {
  const { data } = await api.get<Project[]>('/projects');
  return data;
}

export async function createProject(name: string): Promise<Project> {
  const { data } = await api.post<Project>('/projects', { name });
  return data;
}