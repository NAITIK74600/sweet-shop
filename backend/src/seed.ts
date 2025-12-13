import { testConnection, syncDatabase, User, Sweet } from './models';

const seedData = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    // Connect to database
    await testConnection();
    
    // Sync database (force: true will drop and recreate tables)
    await syncDatabase(true);
    
    // Create admin user
    const admin = await User.create({
      email: 'admin@sweetshop.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin'
    });
    console.log('✓ Admin user created');
    console.log(`  Email: admin@sweetshop.com`);
    console.log(`  Password: admin123`);
    
    // Create regular user
    const user = await User.create({
      email: 'user@sweetshop.com',
      password: 'user123',
      name: 'Regular User',
      role: 'user'
    });
    console.log('✓ Regular user created');
    console.log(`  Email: user@sweetshop.com`);
    console.log(`  Password: user123`);
    
    // Create sample sweets
    const sweets = await Sweet.bulkCreate([
      {
        name: 'Milk Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100,
        description: 'Creamy milk chocolate bar made with premium cocoa',
        imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400'
      },
      {
        name: 'Dark Chocolate Truffle',
        category: 'Chocolate',
        price: 4.99,
        quantity: 50,
        description: 'Rich dark chocolate truffles with a smooth ganache center',
        imageUrl: 'https://images.unsplash.com/photo-1548848723-fac6d4e22e6e?w=400'
      },
      {
        name: 'Gummy Bears',
        category: 'Gummies',
        price: 1.99,
        quantity: 200,
        description: 'Colorful and fruity gummy bears',
        imageUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400'
      },
      {
        name: 'Strawberry Lollipop',
        category: 'Lollipops',
        price: 0.99,
        quantity: 150,
        description: 'Sweet strawberry flavored lollipop',
        imageUrl: 'https://images.unsplash.com/photo-1623246123320-0d6636755796?w=400'
      },
      {
        name: 'Caramel Candy',
        category: 'Caramel',
        price: 3.49,
        quantity: 80,
        description: 'Soft and chewy caramel candies',
        imageUrl: 'https://images.unsplash.com/photo-1606312619811-5a5b4e49e049?w=400'
      },
      {
        name: 'Mint Chocolate',
        category: 'Chocolate',
        price: 3.99,
        quantity: 60,
        description: 'Refreshing mint chocolate bars',
        imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400'
      },
      {
        name: 'Rainbow Sour Belts',
        category: 'Sour Candy',
        price: 2.49,
        quantity: 120,
        description: 'Tangy and colorful sour candy belts',
        imageUrl: 'https://images.unsplash.com/photo-1581798459219-c8f1e3b5afdc?w=400'
      },
      {
        name: 'Cotton Candy',
        category: 'Cotton Candy',
        price: 1.49,
        quantity: 90,
        description: 'Fluffy and sweet cotton candy',
        imageUrl: 'https://images.unsplash.com/photo-1624818943134-7b2c0ff7c9b6?w=400'
      },
      {
        name: 'Chocolate Fudge',
        category: 'Fudge',
        price: 5.99,
        quantity: 40,
        description: 'Rich and creamy chocolate fudge',
        imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400'
      },
      {
        name: 'Jelly Beans',
        category: 'Jelly',
        price: 2.99,
        quantity: 180,
        description: 'Assorted flavored jelly beans',
        imageUrl: 'https://images.unsplash.com/photo-1587241321921-91ded5d51c6e?w=400'
      }
    ]);
    
    console.log(`✓ Created ${sweets.length} sample sweets`);
    
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Admin: admin@sweetshop.com / admin123');
    console.log('   User:  user@sweetshop.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
