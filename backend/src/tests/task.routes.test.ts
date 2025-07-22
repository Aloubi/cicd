import express from 'express';
import request from 'supertest';

// ✅ Mock de getAllTasks AVANT d'importer les routes
jest.mock('../controllers/task.controller', () => ({
  getAllTasks: jest.fn((req, res) => {
    return res.status(200).json([{ id: 1, title: 'Mocked Task' }]);
  }),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn()
}));

// Ensuite on peut importer les routes
import taskRoutes from '../routes/task.routes';

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task Routes', () => {
  it('GET /api/tasks should return mocked task', async () => {
    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, title: 'Mocked Task' }]);
  });
});
