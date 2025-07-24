import { Request, Response } from 'express';
import * as TaskController from '../controllers/task.controller';
import * as TaskService from '../services/task.service';

jest.mock('../services/task.service', () => ({
  createTask: jest.fn(),
  getAllTasks: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn()
}));

describe('Task Controller (unit)', () => {
  const mockRes = (): Response => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.sendStatus = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createTask should return 201 with task', async () => {
    const req = { body: { title: 'Test', completed: false } } as Request;
    const res = mockRes();
    (TaskService.createTask as jest.Mock).mockResolvedValue(req.body);

    await TaskController.createTask(req, res);

    expect(TaskService.createTask).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('getAllTasks should return 200 with task list', async () => {
    const req = {} as Request;
    const res = mockRes();
    const mockTasks = [{ title: 'T1' }, { title: 'T2' }];
    (TaskService.getAllTasks as jest.Mock).mockResolvedValue(mockTasks);

    await TaskController.getAllTasks(req, res);

    expect(TaskService.getAllTasks).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });

  it('updateTask should return 200 with updated task', async () => {
    const req = {
      params: { id: '123' },
      body: { title: 'Updated', completed: true },
    } as unknown as Request;
    const res = mockRes();
    const updatedTask = { id: '123', title: 'Updated', completed: true };
    (TaskService.updateTask as jest.Mock).mockResolvedValue(updatedTask);

    await TaskController.updateTask(req, res);

    expect(TaskService.updateTask).toHaveBeenCalledWith('123', req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedTask);
  });

  it('deleteTask should return 204', async () => {
    const req = {
      params: { id: '456' },
    } as unknown as Request;
    const res = mockRes();
    (TaskService.deleteTask as jest.Mock).mockResolvedValue(true);

    await TaskController.deleteTask(req, res);

    expect(TaskService.deleteTask).toHaveBeenCalledWith('456');
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });
});
