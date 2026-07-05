import api from './api';
import { Task } from '../types';

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get<Task[]>('/tasks');
  return data;
}

export async function createTask(title: string, projectId: number): Promise<Task> {
  const { data } = await api.post<Task>('/tasks', { title, projectId });
  return data;
}

export async function updateTask(id: number, payload: Partial<Pick<Task, 'title' | 'completed'>>): Promise<Task> {
  const { data } = await api.patch<Task>(`/tasks/${id}`, payload);
  return data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`);
}