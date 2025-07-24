/**
 * @note
 * Tests E2E désactivés en local car la base PostgreSQL (Docker) n'est pas disponible.
 * Pour les réactiver : retirer `.skip` de `describe.skip(...)`
 */

import request from 'supertest';
import app from '../index';

// ⏸️ On ignore ce bloc complet pendant les tests
describe.skip('Task Controller (E2E)', () => {
  it('should return 404 if task not found on update', async () => {
    const res = await request(app)
      .put('/api/tasks/999999')
      .send({ title: 'Updated' });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Task not found');
  });

  it('should return 404 if task not found on delete', async () => {
    const res = await request(app).delete('/api/tasks/999999');

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Task not found');
  });
});
