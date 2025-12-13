#!/bin/bash

echo "🍬 Sweet Shop Management System - Setup Script"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL command-line tools not found."
    echo "   Please ensure PostgreSQL is installed and accessible."
else
    echo "✓ PostgreSQL is installed"
fi

echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✓ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -eq 0 ]; then
    echo "✓ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "⚙️  Setting up environment file..."
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✓ Created backend/.env file"
    echo "⚠️  Please edit backend/.env with your database credentials"
else
    echo "✓ backend/.env already exists"
fi

echo ""
echo "=============================================="
echo "✅ Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your database credentials"
echo "2. Create PostgreSQL database: createdb sweet_shop"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: cd frontend && npm run dev"
echo "5. Open http://localhost:3000 in your browser"
echo ""
echo "For more information, see README.md"
echo "=============================================="
