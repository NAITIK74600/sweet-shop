# 🚀 Vercel Deployment Guide

## Quick Deployment Steps

### Method 1: Using Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

#### Step 2: Login to Vercel
```powershell
vercel login
```

#### Step 3: Deploy Backend
```powershell
cd "c:\Users\naiti\OneDrive\Desktop\New folder\backend"
vercel
```
Follow prompts:
- Set up and deploy? **Y**
- Which scope? **Select your account**
- Link to existing project? **N**
- Project name? **sweet-shop-backend**
- Directory? **./** (press Enter)
- Override settings? **N**

#### Step 4: Set Environment Variables
```powershell
vercel env add JWT_SECRET
```
Enter value: `your_super_secret_jwt_key_change_this_in_production_2025`

```powershell
vercel env add NODE_ENV
```
Enter value: `production`

#### Step 5: Deploy Frontend
```powershell
cd "c:\Users\naiti\OneDrive\Desktop\New folder\frontend"
vercel
```
Follow same prompts with project name: **sweet-shop-frontend**

#### Step 6: Update Frontend API URL
After backend deployment, copy the backend URL (e.g., https://sweet-shop-backend.vercel.app)

Edit `frontend/src/api/axios.ts` and update baseURL:
```typescript
const api = axios.create({
  baseURL: 'https://your-backend-url.vercel.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

#### Step 7: Redeploy Frontend
```powershell
cd "c:\Users\naiti\OneDrive\Desktop\New folder\frontend"
vercel --prod
```

---

### Method 2: Using Vercel Dashboard (Easier)

#### For Backend:

1. Go to https://vercel.com/new
2. Import from GitHub: `NAITIK74600/sweet-shop`
3. **Root Directory:** `backend`
4. **Framework Preset:** Other
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`
7. **Install Command:** `npm install`
8. Add Environment Variables:
   - `JWT_SECRET` = `your_super_secret_jwt_key_change_this_in_production_2025`
   - `NODE_ENV` = `production`
   - `JWT_EXPIRES_IN` = `24h`
9. Click **Deploy**

#### For Frontend:

1. Go to https://vercel.com/new again
2. Import same repo: `NAITIK74600/sweet-shop`
3. **Root Directory:** `frontend`
4. **Framework Preset:** Vite
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`
7. Add Environment Variables:
   - `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
8. Click **Deploy**

---

## ⚠️ Important Notes

### 1. Database Issue
SQLite doesn't work on Vercel (serverless). You need to:

**Option A: Use Vercel Postgres (Recommended)**
```powershell
# Install Vercel Postgres
vercel postgres create
```

**Option B: Use External Database**
- Supabase (Free PostgreSQL): https://supabase.com
- PlanetScale (Free MySQL): https://planetscale.com
- MongoDB Atlas (Free): https://mongodb.com/atlas

### 2. CORS Configuration
Backend will need CORS for frontend domain. Already configured in `src/app.ts`

### 3. API Routes
All API routes must start with `/api` for Vercel serverless functions.

---

## 🎯 Recommended: Easy Deployment with Supabase

Since SQLite won't work on Vercel, I recommend using Supabase (free PostgreSQL):

1. **Create Supabase Account:** https://supabase.com
2. **Create New Project**
3. **Get Database URL** from Project Settings > Database
4. **Update Backend:** Change database config to use Supabase

Would you like me to help set this up?

---

## 📝 Quick CLI Commands

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy backend
cd backend
vercel --prod

# Deploy frontend  
cd ../frontend
vercel --prod

# View deployments
vercel ls

# Check logs
vercel logs
```

---

## ✅ After Deployment

Your apps will be live at:
- Frontend: `https://sweet-shop-frontend.vercel.app`
- Backend: `https://sweet-shop-backend.vercel.app`

Don't forget to update the API URL in frontend after backend deployment!
