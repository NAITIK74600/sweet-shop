import { Request, Response } from 'express';
import { User, Sweet, sequelize } from '../models';

export const seedDatabase = async (req: Request, res: Response) => {
  try {
    // Sync database first
    await sequelize.sync({ alter: true });
    
    // Check if data already exists
    const userCount = await User.count();
    if (userCount > 0) {
      return res.status(200).json({ message: 'Database already seeded' });
    }

    // Create admin user
    await User.create({
      email: 'admin@sweetshop.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin'
    });

    // Create regular user
    await User.create({
      email: 'user@sweetshop.com',
      password: 'user123',
      name: 'Regular User',
      role: 'user'
    });

    // Create sample sweets
    await Sweet.bulkCreate([
      {
        name: 'Milk Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100,
        description: 'Creamy milk chocolate bar',
        imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400'
      },
      {
        name: 'Gummy Bears',
        category: 'Gummies',
        price: 1.99,
        quantity: 200,
        description: 'Colorful gummy bears',
        imageUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400'
      },
      {
        name: 'Dark Chocolate',
        category: 'Chocolate',
        price: 3.99,
        quantity: 75,
        description: 'Rich dark chocolate',
        imageUrl: 'https://images.unsplash.com/photo-1548848723-fac6d4e22e6e?w=400'
      }
    ]);

    res.status(200).json({ 
      message: 'Database seeded successfully',
      credentials: {
        admin: 'admin@sweetshop.com / admin123',
        user: 'user@sweetshop.com / user123'
      }
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
};
