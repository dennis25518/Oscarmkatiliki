# Vercel Deployment Guide

## Prerequisites

Before deploying to Vercel, ensure you have:
- A Vercel account (https://vercel.com)
- Your GitHub repository connected to Vercel
- Supabase project credentials

## Environment Variables

On Vercel, you need to set the following environment variables in your project settings:

1. **VITE_SUPABASE_PROJECT_URL** - Your Supabase project URL
   - Example: `https://qcppnmseqwtxabuknmil.supabase.co`

2. **VITE_SUPABASE_ANON_KEY** - Your Supabase anonymous/public key
   - Example: `sb_publishable_eNHJV3cyeXCWdiXflQHmvg_n0eWkYJ7`

### Steps to Configure Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with the corresponding value
4. Select which environments they apply to (Production, Preview, Development)
5. Save and redeploy

## Deployment Process

### Option 1: Automatic Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite app configuration
3. Set environment variables in Vercel dashboard
4. Push changes to `main` branch - Vercel will automatically build and deploy

### Option 2: Manual Deployment via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project directory
vercel

# For production deployment
vercel --prod
```

## Build Configuration

The project uses the following build settings:
- **Framework**: Vite (React)
- **Build Command**: `npm run build`
- **Dev Command**: `npm run dev`
- **Install Command**: `npm install`
- **Node Version**: 20.x

These are defined in `vercel.json` and automatically detected by Vercel.

## Troubleshooting

### Build Fails with "Cannot find environment variables"

**Solution**: Ensure all `VITE_*` environment variables are set in Vercel dashboard. Vite variables must be prefixed with `VITE_` to be accessible in the browser.

### Build Fails with Module Errors

**Solution**: 
1. Clear Vercel's build cache: Project Settings → Advanced → Clear Build Cache
2. Redeploy
3. Check that all dependencies are listed in `package.json`

### Large Bundle Size Warning

The application currently has a ~528KB JavaScript bundle. This is due to:
- React + React DOM
- Tailwind CSS
- Icon library (react-icons)
- Supabase client

**Optimizations available** (if needed):
- Implement code splitting for route-based chunks
- Use dynamic imports for heavy components
- Remove unused dependencies

## Local Testing Before Deployment

Test the production build locally:

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## Monitoring Deployments

After deployment:
1. Check Vercel dashboard for successful deployment
2. Visit your deployed URL to verify functionality
3. Monitor for runtime errors in Vercel's Observability tools
4. Check browser console for any client-side errors

## Database Setup

Make sure your Supabase instance has the required tables:
- `products`
- `profiles`
- `orders`
- `payment_methods`
- `maswali` (contact messages)

See main README.md for database schema details.

## Security Notes

- Never commit `.env` files to Git
- Use `.env.example` as a template
- Rotate Supabase keys regularly
- Enable Row Level Security (RLS) on Supabase tables
- Use environment-specific variables for sensitive data
