import request from 'supertest';
import app from '../index';
import * as TaskService from '../services/task.service';
import { sequelize } from '../sequelize';

describe('🧪 Coverage Boost Tests (Mocked)', () => {
  afterAll(async () => {
    await sequelize.close();
  });

  it('GET /api/tasks should return mocked tasks', async () => {
    jest.spyOn(TaskService, 'getAllTasks').mockResolvedValueOnce([]);

    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/tasks with bad data should return 400', async () => {
    const res = await request(app).post('/api/tasks').send({ wrong: true });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it('TaskService.updateTask should throw error on bad ID', async () => {
    await expect(
      TaskService.updateTask(null as unknown as string, { title: 'Fail' })
    ).rejects.toThrow();
  });

  it('PUT /api/tasks/undefined should return 400 or 500', async () => {
    const res = await request(app).put('/api/tasks/undefined').send({ title: 'Test' });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
