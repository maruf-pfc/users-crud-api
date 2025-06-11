import request from 'supertest';
import app from '../../app.js';

describe('Health Check Route', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
