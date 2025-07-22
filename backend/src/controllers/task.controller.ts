import { Request, Response } from 'express';
import { Task } from '../models/task.model';

// Créer une tâche
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title is required and must be a string' });
    }
//
    const task = await Task.create({ title, completed: false });
    return res.status(201).json(task);
  } catch (error) {
    console.error('❌ Failed to create task:', error);
    return res.status(500).json({ error: 'Failed to create task' });
  }
};

// Lire toutes les tâches
export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error('❌ Failed to fetch tasks:', error);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Mettre à jour une tâche
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = await Task.findByPk(Number(id));
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    return res.status(200).json(task);
  } catch (error) {
    console.error('❌ Failed to update task:', error);
    return res.status(500).json({ error: 'Failed to update task' });
  }
};

// Supprimer une tâche
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(Number(id));
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.destroy();
    return res.sendStatus(204);
  } catch (error) {
    console.error('❌ Failed to delete task:', error);
    return res.status(500).json({ error: 'Failed to delete task' });
  }
};
export const sayHello = () => {
  return 'Hello from controller';
};
