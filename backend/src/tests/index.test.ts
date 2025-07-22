import request from 'supertest';
import app from '../index';

describe('App Root Endpoint', () => {
  it('GET /ping should return pong', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'pong' });
  });
});
it('App should be defined', () => {
  expect(app).toBeDefined();
});

it('GET /unknown should return 404', async () => {
  const res = await request(app).get('/unknown');
  expect(res.status).toBe(404);
});
