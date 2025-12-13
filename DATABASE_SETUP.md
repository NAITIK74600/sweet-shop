# Database Setup Guide

This guide will help you set up the PostgreSQL database for the Sweet Shop Management System.

## Prerequisites

- PostgreSQL installed (version 12 or higher)
- Access to PostgreSQL command line (psql) or pgAdmin

## Option 1: Using psql Command Line

### Step 1: Connect to PostgreSQL

```bash
# On Windows
psql -U postgres

# On macOS/Linux
sudo -u postgres psql
```

### Step 2: Create Database

```sql
CREATE DATABASE sweet_shop;
```

### Step 3: Create a Dedicated User (Optional but Recommended)

```sql
-- Create user
CREATE USER sweet_shop_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE sweet_shop TO sweet_shop_user;

-- Connect to the database
\c sweet_shop

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO sweet_shop_user;
```

### Step 4: Exit psql

```sql
\q
```

## Option 2: Using pgAdmin

1. Open pgAdmin and connect to your PostgreSQL server
2. Right-click on "Databases" and select "Create" > "Database..."
3. Enter database name: `sweet_shop`
4. Click "Save"

## Option 3: Using SQL Script

Save this as `create_database.sql`:

```sql
-- Create database
CREATE DATABASE sweet_shop
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Create user (optional)
CREATE USER sweet_shop_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE sweet_shop TO sweet_shop_user;

-- Connect to database
\c sweet_shop

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO sweet_shop_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO sweet_shop_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO sweet_shop_user;
```

Run the script:

```bash
psql -U postgres -f create_database.sql
```

## Configure Application

Update your `backend/.env` file with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sweet_shop
DB_USER=postgres  # or sweet_shop_user if you created a dedicated user
DB_PASSWORD=your_password
```

## Initialize Tables

The application will automatically create the necessary tables when you first run the server:

```bash
cd backend
npm run dev
```

You should see:
```
✓ Database connection established successfully
✓ Database synced successfully
```

## Verify Setup

### Check Tables

```bash
psql -U postgres -d sweet_shop
```

```sql
-- List all tables
\dt

-- You should see:
-- users
-- sweets
```

### Check Table Structure

```sql
-- View users table
\d users

-- View sweets table
\d sweets
```

## Create Test Admin User

After starting the server, you can register a user and manually promote them to admin:

```sql
-- Connect to database
psql -U postgres -d sweet_shop

-- Update user role to admin
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

## Troubleshooting

### Cannot connect to database

**Issue:** Application fails to connect to PostgreSQL

**Solution:**
1. Check if PostgreSQL is running:
   ```bash
   # Windows
   sc query postgresql-x64-14
   
   # macOS
   brew services list | grep postgresql
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Verify connection settings in `.env`
3. Check PostgreSQL is listening on correct port:
   ```bash
   netstat -an | grep 5432
   ```

### Authentication failed

**Issue:** Password authentication failed for user

**Solution:**
1. Verify credentials in `.env` file
2. Check PostgreSQL pg_hba.conf authentication settings
3. Try resetting the PostgreSQL user password:
   ```sql
   ALTER USER postgres WITH PASSWORD 'new_password';
   ```

### Permission denied for schema public

**Issue:** Cannot create tables in the database

**Solution:**
```sql
GRANT ALL ON SCHEMA public TO your_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO your_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO your_user;
```

### Database already exists

**Issue:** Error when trying to create database that already exists

**Solution:**
```sql
-- Drop existing database (WARNING: This deletes all data)
DROP DATABASE IF EXISTS sweet_shop;

-- Then create new database
CREATE DATABASE sweet_shop;
```

## Backup and Restore

### Backup Database

```bash
pg_dump -U postgres sweet_shop > sweet_shop_backup.sql
```

### Restore Database

```bash
psql -U postgres sweet_shop < sweet_shop_backup.sql
```

## Reset Database

To start fresh (WARNING: This deletes all data):

```bash
# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS sweet_shop;"
psql -U postgres -c "CREATE DATABASE sweet_shop;"

# Restart the application to recreate tables
cd backend
npm run dev
```

## Production Recommendations

1. **Use Environment-Specific Credentials:**
   - Never commit `.env` files to version control
   - Use strong passwords
   - Create dedicated database users with limited privileges

2. **Connection Pooling:**
   - The application uses Sequelize connection pooling
   - Adjust pool settings in `backend/src/config/database.ts` for production

3. **SSL Connection:**
   - Enable SSL for production databases
   - Add to Sequelize config:
     ```typescript
     dialectOptions: {
       ssl: {
         require: true,
         rejectUnauthorized: false
       }
     }
     ```

4. **Regular Backups:**
   - Set up automated backups
   - Test restore procedures regularly

5. **Monitoring:**
   - Monitor connection pool usage
   - Set up alerts for connection failures
   - Log slow queries

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [PostgreSQL Tutorials](https://www.postgresqltutorial.com/)
