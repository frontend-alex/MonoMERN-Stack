import request from 'supertest';
import { getTestApp } from './test.utilts';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const app = getTestApp();
    
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });
});