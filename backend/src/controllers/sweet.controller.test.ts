import request from 'supertest';
import express, { Express } from 'express';
import sweetRoutes from '../routes/sweet.routes';
import { User, Sweet } from '../models';
import sequelize from '../config/database';
import { generateToken } from '../utils/jwt';

const app: Express = express();
app.use(express.json());
app.use('/api/sweets', sweetRoutes);

describe('Sweet Controller Tests', () => {
  let userToken: string;
  let adminToken: string;
  let userId: number;
  let adminId: number;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Create regular user
    const user = await User.create({
      email: 'user@example.com',
      password: 'Password123!',
      name: 'Regular User',
      role: 'user'
    });
    userId = user.id;
    userToken = generateToken({ id: user.id, email: user.email, role: user.role });

    // Create admin user
    const admin = await User.create({
      email: 'admin@example.com',
      password: 'Password123!',
      name: 'Admin User',
      role: 'admin'
    });
    adminId = admin.id;
    adminToken = generateToken({ id: admin.id, email: admin.email, role: admin.role });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  afterEach(async () => {
    await Sweet.destroy({ where: {} });
  });

  describe('POST /api/sweets', () => {
    it('should create a new sweet with valid token', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 2.99,
          quantity: 100,
          description: 'Delicious milk chocolate'
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Chocolate Bar');
      expect(response.body.category).toBe('Chocolate');
    });

    it('should not create sweet without authentication', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .send({
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 2.99,
          quantity: 100
        });

      expect(response.status).toBe(401);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Chocolate Bar'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/sweets', () => {
    beforeEach(async () => {
      await Sweet.bulkCreate([
        {
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 2.99,
          quantity: 100
        },
        {
          name: 'Gummy Bears',
          category: 'Gummies',
          price: 1.99,
          quantity: 50
        }
      ]);
    });

    it('should get all sweets with authentication', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    it('should not get sweets without authentication', async () => {
      const response = await request(app).get('/api/sweets');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/sweets/search', () => {
    beforeEach(async () => {
      await Sweet.bulkCreate([
        {
          name: 'Milk Chocolate Bar',
          category: 'Chocolate',
          price: 2.99,
          quantity: 100
        },
        {
          name: 'Dark Chocolate',
          category: 'Chocolate',
          price: 3.99,
          quantity: 50
        },
        {
          name: 'Gummy Bears',
          category: 'Gummies',
          price: 1.99,
          quantity: 75
        }
      ]);
    });

    it('should search sweets by name', async () => {
      const response = await request(app)
        .get('/api/sweets/search?name=chocolate')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    it('should search sweets by category', async () => {
      const response = await request(app)
        .get('/api/sweets/search?category=Gummies')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe('Gummy Bears');
    });

    it('should search sweets by price range', async () => {
      const response = await request(app)
        .get('/api/sweets/search?minPrice=2&maxPrice=3')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });

  describe('PUT /api/sweets/:id', () => {
    let sweetId: number;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Original Name',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100
      });
      sweetId = sweet.id;
    });

    it('should update sweet with valid token', async () => {
      const response = await request(app)
        .put(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Updated Name',
          price: 3.49
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Name');
      expect(parseFloat(response.body.price)).toBe(3.49);
    });

    it('should return 404 for non-existent sweet', async () => {
      const response = await request(app)
        .put('/api/sweets/99999')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Updated Name'
        });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    let sweetId: number;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'To Delete',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100
      });
      sweetId = sweet.id;
    });

    it('should allow admin to delete sweet', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toContain('deleted');
    });

    it('should not allow regular user to delete sweet', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    let sweetId: number;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'For Purchase',
        category: 'Chocolate',
        price: 2.99,
        quantity: 10
      });
      sweetId = sweet.id;
    });

    it('should purchase sweet and decrease quantity', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 3 });

      expect(response.status).toBe(200);
      expect(response.body.quantity).toBe(7);
    });

    it('should not allow purchase when insufficient stock', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 20 });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Insufficient stock');
    });

    it('should validate purchase quantity', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: -1 });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    let sweetId: number;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'For Restock',
        category: 'Chocolate',
        price: 2.99,
        quantity: 10
      });
      sweetId = sweet.id;
    });

    it('should allow admin to restock sweet', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 50 });

      expect(response.status).toBe(200);
      expect(response.body.quantity).toBe(60);
    });

    it('should not allow regular user to restock', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 50 });

      expect(response.status).toBe(403);
    });
  });
});
