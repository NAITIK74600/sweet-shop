@echo off
echo 🍬 Sweet Shop Management System - Setup Script
echo ==============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18 or higher.
    pause
    exit /b 1
)

echo ✓ Node.js version:
node --version
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  PostgreSQL command-line tools not found.
    echo    Please ensure PostgreSQL is installed and accessible.
) else (
    echo ✓ PostgreSQL is installed
)

echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed successfully

echo.
echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed successfully

cd ..

echo.
echo ⚙️  Setting up environment file...
if not exist "backend\.env" (
    copy "backend\.env.example" "backend\.env"
    echo ✓ Created backend\.env file
    echo ⚠️  Please edit backend\.env with your database credentials
) else (
    echo ✓ backend\.env already exists
)

echo.
echo ==============================================
echo ✅ Setup completed successfully!
echo.
echo Next steps:
echo 1. Edit backend\.env with your database credentials
echo 2. Create PostgreSQL database using pgAdmin or psql
echo 3. Start backend: cd backend ^&^& npm run dev
echo 4. Start frontend: cd frontend ^&^& npm run dev
echo 5. Open http://localhost:3000 in your browser
echo.
echo For more information, see README.md
echo ==============================================
echo.
pause
