import request from 'supertest';
import app from '../index';
import { sequelize } from '../sequelize';

describe('App Root Endpoint', () => {
  it('GET /ping should return pong', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'pong' });
  });
});

afterAll(async () => {
  await sequelize.close(); // fermeture propre de la BDD
});
