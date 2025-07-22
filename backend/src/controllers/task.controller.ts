// src/controllers/task.controller.ts
import { Request, Response } from 'express';
import * as TaskService from '../services/task.service';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title is required and must be a string' });
    }

    const task = await TaskService.createTask({ title, completed: false });
    return res.status(201).json(task);
  } catch (error: any) {
    console.error('❌ Failed to create task:', error);
    return res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getAllTasks();
    return res.status(200).json(tasks);
  } catch (error: any) {
    console.error('❌ Failed to fetch tasks:', error);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await TaskService.updateTask(id, req.body);
    return res.status(200).json(updated);
  } catch (error: any) {
    console.error('❌ Failed to update task:', error);
    return res.status(error.message === 'Task not found' ? 404 : 500).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await TaskService.deleteTask(id);
    return res.sendStatus(204);
  } catch (error: any) {
    console.error('❌ Failed to delete task:', error);
    return res.status(error.message === 'Task not found' ? 404 : 500).json({ error: error.message });
  }
};
