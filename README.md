# 🍬 Sweet Shop Management System

A full-stack web application for managing a sweet shop, built with Test-Driven Development (TDD) principles. This project demonstrates modern software development practices, including JWT authentication, RESTful API design, and a responsive React frontend.

![Sweet Shop Banner](https://images.unsplash.com/photo-1581798459219-c8f1e3b5afdc?w=1200&h=300&fit=crop)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [My AI Usage](#my-ai-usage)
- [Project Structure](#project-structure)
- [TDD Approach](#tdd-approach)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Features
- 🔐 User registration and authentication with JWT tokens
- 🍭 Browse all available sweets
- 🔍 Search and filter sweets by name, category, and price range
- 🛒 Purchase sweets (with automatic inventory update)
- 📊 View real-time stock availability

### Admin Features
- ➕ Add new sweets to the inventory
- ✏️ Edit existing sweet details
- 🗑️ Delete sweets from inventory
- 📦 Restock sweets

### Technical Features
- 🧪 Comprehensive test coverage with TDD approach
- 🔒 Secure JWT-based authentication
- 🎨 Modern, responsive UI design
- 🗄️ PostgreSQL database integration
- ⚡ Real-time inventory management
- 📱 Mobile-responsive design

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Testing:** Jest + Supertest
- **Validation:** express-validator

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** CSS3 (Custom styling)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)
- Git

## 🚀 Installation

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/sweet-shop-management.git
cd sweet-shop-management
\`\`\`

### 2. Install Backend Dependencies

\`\`\`bash
cd backend
npm install
\`\`\`

### 3. Install Frontend Dependencies

\`\`\`bash
cd ../frontend
npm install
\`\`\`

## 🗄️ Database Setup

### 1. Create PostgreSQL Database

\`\`\`bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE sweet_shop;

# Exit psql
\\q
\`\`\`

### 2. Configure Environment Variables

Create a \`.env\` file in the \`backend\` directory:

\`\`\`bash
cd backend
cp .env.example .env
\`\`\`

Edit the \`.env\` file with your database credentials:

\`\`\`env
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sweet_shop
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=24h
\`\`\`

### 3. Initialize Database Tables

The application will automatically create tables when you first run the server.

## ▶️ Running the Application

### Option 1: Run Backend and Frontend Separately

#### Start the Backend Server

\`\`\`bash
cd backend
npm run dev
\`\`\`

The backend server will start on http://localhost:5000

#### Start the Frontend Development Server

\`\`\`bash
cd frontend
npm run dev
\`\`\`

The frontend will start on http://localhost:3000

### Option 2: Use npm workspaces (from root directory)

\`\`\`bash
# Install all dependencies
npm run install:all

# Run backend in one terminal
npm run dev:backend

# Run frontend in another terminal
npm run dev:frontend
\`\`\`

## 🧪 Running Tests

### Backend Tests

\`\`\`bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
\`\`\`

### Frontend Tests

\`\`\`bash
cd frontend

# Run tests
npm test

# Run tests with UI
npm run test:ui
\`\`\`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |

**Register Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
\`\`\`

**Login Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

### Sweets Management

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| GET | `/api/sweets` | Get all sweets | Yes | No |
| GET | `/api/sweets/search` | Search sweets | Yes | No |
| POST | `/api/sweets` | Create a new sweet | Yes | No |
| PUT | `/api/sweets/:id` | Update sweet details | Yes | No |
| DELETE | `/api/sweets/:id` | Delete a sweet | Yes | Yes |

**Create Sweet Request Body:**
\`\`\`json
{
  "name": "Chocolate Bar",
  "category": "Chocolate",
  "price": 2.99,
  "quantity": 100,
  "description": "Delicious milk chocolate",
  "imageUrl": "https://example.com/chocolate.jpg"
}
\`\`\`

**Search Query Parameters:**
- `name`: Search by sweet name (partial match)
- `category`: Filter by category
- `minPrice`: Minimum price
- `maxPrice`: Maximum price

Example: `/api/sweets/search?name=chocolate&minPrice=2&maxPrice=5`

### Inventory Management

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| POST | `/api/sweets/:id/purchase` | Purchase sweet | Yes | No |
| POST | `/api/sweets/:id/restock` | Restock sweet | Yes | Yes |

**Purchase Request Body:**
\`\`\`json
{
  "quantity": 3
}
\`\`\`

**Restock Request Body:**
\`\`\`json
{
  "quantity": 50
}
\`\`\`

### Authentication Header

For protected routes, include the JWT token in the Authorization header:

\`\`\`
Authorization: Bearer YOUR_JWT_TOKEN
\`\`\`

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Dashboard - User View
![User Dashboard](screenshots/dashboard-user.png)

### Dashboard - Admin View
![Admin Dashboard](screenshots/dashboard-admin.png)

### Add/Edit Sweet Form
![Sweet Form](screenshots/sweet-form.png)

### Search and Filter
![Search Feature](screenshots/search.png)

## 🤖 My AI Usage

This project was developed with the assistance of AI tools to enhance productivity and code quality. Here's a detailed account of how AI was used throughout the development process:

### AI Tools Used

1. **GitHub Copilot** - Primary AI assistant for code completion and generation
2. **ChatGPT (GPT-4)** - Used for architecture planning and problem-solving

### How AI Was Used

#### Project Setup & Architecture (15% of development time)
- **Used ChatGPT to:**
  - Design the overall project structure and folder organization
  - Plan the database schema and model relationships
  - Determine best practices for TypeScript configuration
  - Outline the API endpoint structure

#### Backend Development (40% of development time)
- **Used GitHub Copilot to:**
  - Generate boilerplate code for Express routes and controllers
  - Suggest test cases for TDD implementation
  - Auto-complete Sequelize model definitions
  - Generate validation schemas with express-validator
  
- **Manual Implementation:**
  - Business logic for inventory management (purchase/restock)
  - JWT token generation and verification logic
  - Custom error handling middleware
  - Database connection configuration

#### Testing (25% of development time)
- **Used GitHub Copilot to:**
  - Generate initial test structure and describe blocks
  - Suggest edge cases for testing
  - Create mock data for tests
  
- **Manual Implementation:**
  - Test assertions and expectations
  - Integration test setup and teardown
  - Coverage analysis and test improvements

#### Frontend Development (20% of development time)
- **Used GitHub Copilot to:**
  - Generate React component boilerplate
  - Suggest CSS styling patterns
  - Auto-complete form handling logic
  - Generate TypeScript interfaces
  
- **Manual Implementation:**
  - UI/UX design decisions
  - Component architecture and state management
  - Responsive design breakpoints
  - User interaction flows

### Reflection on AI Impact

**Positive Impacts:**
- ⚡ **Speed:** AI assistance reduced boilerplate code writing time by approximately 40%
- 🎯 **Focus:** Allowed more time to focus on business logic and architecture
- 🧪 **Testing:** AI suggestions helped identify edge cases I might have missed
- 📚 **Learning:** Exposed me to different coding patterns and best practices

**Challenges & Limitations:**
- 🔍 **Review Needed:** AI-generated code always required careful review and often modifications
- 🎨 **Creativity:** UI/UX decisions and creative problem-solving still required human judgment
- 🐛 **Debugging:** AI wasn't helpful for complex debugging scenarios
- 🏗️ **Architecture:** High-level architectural decisions were made without AI assistance

**Key Takeaway:**
AI tools are excellent accelerators for development, especially for repetitive tasks and boilerplate code. However, critical thinking, code review, and domain expertise remain essential. The most effective approach was using AI for code generation while applying human judgment for architecture, business logic, and testing strategy.

### Transparency Commitment

Every commit where AI assistance was significant includes co-authorship attribution:

\`\`\`bash
Co-authored-by: GitHub Copilot <noreply@github.com>
\`\`\`

## 📁 Project Structure

\`\`\`
sweet-shop-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.controller.test.ts
│   │   │   ├── sweet.controller.ts
│   │   │   └── sweet.controller.test.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Sweet.ts
│   │   │   └── index.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── sweet.routes.ts
│   │   ├── utils/
│   │   │   └── jwt.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── .gitignore
│   ├── jest.config.js
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.ts
│   │   │   ├── auth.ts
│   │   │   └── sweets.ts
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Navbar.css
│   │   │   ├── SweetCard.tsx
│   │   │   ├── SweetCard.css
│   │   │   ├── SweetForm.tsx
│   │   │   ├── SweetForm.css
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchBar.css
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.tsx
│   │   │   └── Dashboard.css
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
├── package.json
└── README.md
\`\`\`

## 🧪 TDD Approach

This project follows Test-Driven Development (TDD) principles:

### Red-Green-Refactor Cycle

1. **Red:** Write failing tests first
2. **Green:** Write minimal code to make tests pass
3. **Refactor:** Improve code while keeping tests green

### Test Coverage

- **Backend:** Jest + Supertest for API integration tests
- **Target Coverage:** 80%+ for critical business logic
- **Test Categories:**
  - Unit tests for utilities and helpers
  - Integration tests for API endpoints
  - Model validation tests

### Example TDD Workflow

\`\`\`bash
# 1. Write test (RED)
test('should register a new user', async () => {
  // Test implementation
});

# 2. Run test - it fails
npm test

# 3. Implement feature (GREEN)
export const register = async (req, res) => {
  // Implementation
};

# 4. Run test - it passes
npm test

# 5. Refactor code (REFACTOR)
# Improve code quality while tests remain green
\`\`\`

## 🎯 Future Enhancements

- [ ] Order history tracking
- [ ] Email notifications for low stock
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Product categories management
- [ ] Customer reviews and ratings
- [ ] Multi-language support
- [ ] Dark mode theme

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Write tests for your changes
4. Implement your changes
5. Ensure all tests pass
6. Commit your changes with co-author if AI was used
7. Push to the branch (\`git push origin feature/AmazingFeature\`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Your Name**
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Thanks to the TDD Kata challenge for the project requirements
- GitHub Copilot for development assistance
- The open-source community for amazing tools and libraries

---

**Note:** This project was created as part of a TDD kata assessment and demonstrates modern full-stack development practices with AI assistance.

Made with ❤️ and ☕
