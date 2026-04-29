# Deployment Guide - Sakshi.ai

## 1. Push to GitHub

### Option A: Use existing GitHub repo
```bash
# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/sakshi-ai.git

# Push to main branch
git push -u origin main
```

### Option B: Create new GitHub repo via CLI
```bash
# Install GitHub CLI if not present
# Create new repository
gh repo create sakshi-ai --public --source=. --push
```

## 2. Deploy to Vercel

### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option B: GitHub Integration (Auto-deploy)
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://yatuxxswgaugitskfoqk.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_j9zdUeHIgwjUGYPpJ8ctyA_zcBRNSDW
   ```
5. Click "Deploy"

## 3. Configure Environment Variables on Vercel

In Vercel Dashboard → Project Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://yatuxxswgaugitskfoqk.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_j9zdUeHIgwjUGYPpJ8ctyA_zcBRNSDW
```

## 4. Verify Deployment

Check these URLs after deployment:
- **Home**: `https://your-domain.vercel.app/`
- **Verify Document**: `https://your-domain.vercel.app/verify`
- **Stamp Duty Calculator**: `https://your-domain.vercel.app/stamp-duty-calculator`

## 5. Quick Deploy Commands

```bash
# Full deployment flow
git add -A
git commit -m "feat: Add all features"
git push origin main
vercel --prod
```

## 6. Troubleshooting

### Build fails on Vercel?
- Check that `next.config.ts` has `output: 'export'` and `distDir: 'dist'`
- Verify all dependencies are in `package.json`
- Check Environment Variables are set

### Images not loading?
- Use `next/image` with proper configuration
- Or use standard `<img>` tags for static export

### API routes not working?
- For static export, API routes need to be serverless functions
- Consider using Vercel Serverless Functions or Edge Functions

---

**Last Updated**: April 29, 2026
