// src/tests/task.service.test.ts
import * as TaskService from '../services/task.service';
import { Task } from '../models/task.model';

jest.mock('../models/task.model', () => ({
  Task: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn()
  }
}));

describe('Task Service', () => {
  afterEach(() => jest.clearAllMocks());

  it('createTask should call Task.create', async () => {
    const mockData = { title: 'Test Task' };
    (Task.create as jest.Mock).mockResolvedValue(mockData);

    const result = await TaskService.createTask(mockData);

    expect(Task.create).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockData);
  });

  it('getAllTasks should call Task.findAll', async () => {
    const mockTasks = [{ title: 'T1' }];
    (Task.findAll as jest.Mock).mockResolvedValue(mockTasks);

    const result = await TaskService.getAllTasks();

    expect(Task.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockTasks);
  });

  it('updateTask should call task.update', async () => {
    const mockTask = { update: jest.fn().mockResolvedValue({ title: 'Updated' }) };
    (Task.findByPk as jest.Mock).mockResolvedValue(mockTask);

    const result = await TaskService.updateTask('1', { title: 'Updated' });

    expect(Task.findByPk).toHaveBeenCalledWith(1);
    expect(mockTask.update).toHaveBeenCalledWith({ title: 'Updated' });
    expect(result).toEqual({ title: 'Updated' });
  });

  it('deleteTask should call task.destroy', async () => {
    const mockTask = { destroy: jest.fn().mockResolvedValue(true) };
    (Task.findByPk as jest.Mock).mockResolvedValue(mockTask);

    await TaskService.deleteTask('1');

    expect(Task.findByPk).toHaveBeenCalledWith(1);
    expect(mockTask.destroy).toHaveBeenCalled();
  });
});

import { isTaskCompleted } from '../services/task.service';

describe('isTaskCompleted', () => {
  it('should return true when task is completed', () => {
    expect(isTaskCompleted({ completed: true })).toBe(true);
  });

  it('should return false when task is not completed', () => {
    expect(isTaskCompleted({ completed: false })).toBe(false);
  });
});
