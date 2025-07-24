// src/services/task.service.ts
import { Task } from '../models/task.model';

export const createTask = async (data: any) => {
  return await Task.create(data);
};

export const getAllTasks = async () => {
  return await Task.findAll();
};

export const updateTask = async (id: string, data: any) => {
  const task = await Task.findByPk(Number(id));
  if (!task) throw new Error('Task not found');
  return await task.update(data);
};

export const deleteTask = async (id: string) => {
  const task = await Task.findByPk(Number(id));
  if (!task) throw new Error('Task not found');
  await task.destroy();
};

export function isTaskCompleted(task: { completed: boolean }): boolean {
  return task.completed;
}
