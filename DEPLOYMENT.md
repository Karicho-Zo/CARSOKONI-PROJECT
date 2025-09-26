# Deployment Instructions for Carsokoni

## Vercel Deployment

### Option 1: Using Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project root:
   ```bash
   cd carsokoni
   vercel
   ```

4. Follow the prompts to configure your deployment.

### Option 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./carsokoni` (if your repo has multiple projects)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Click "Deploy"

## Netlify Deployment

### Option 1: Using Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   cd carsokoni
   netlify deploy --prod
   ```

4. When prompted:
   - **Publish directory**: `dist`
   - **Build command**: `npm run build`

### Option 2: Using Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Sites" → "Deploy manually" or connect your Git repository
3. For manual deployment:
   - Drag and drop the `dist` folder after building
4. For Git integration:
   - Connect your repository
   - Set build settings:
     - **Base directory**: `./carsokoni` (if applicable)
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

## Build Process

Before deployment, make sure to build the project:

```bash
cd carsokoni
npm run build
```

This will create a `dist` folder with the production-ready files.

## Environment Variables

If you need environment variables (for future API integrations):

1. Create a `.env` file in the project root
2. Add your variables (e.g., `VITE_API_URL=https://api.example.com`)
3. For Vercel: Add them in the dashboard under Project Settings → Environment Variables
4. For Netlify: Add them in Site Settings → Environment Variables

## Custom Domain

- **Vercel**: Go to Project Settings → Domains
- **Netlify**: Go to Site Settings → Domain Management

## Testing Deployment Locally

To test the production build locally:

```bash
cd carsokoni
npm run build
npm run preview
```

This will serve the built files on `http://localhost:4173`

## Performance Optimization

The project includes several optimizations:
- Code splitting with React.lazy
- Image optimization (using placeholder images)
- Memoization with React.memo
- Debounced search
- Error boundaries

## Troubleshooting

### Build Fails
- Ensure all dependencies are installed: `npm install`
- Check for any linting errors: `npm run lint`
- Verify Node.js version compatibility

### Routing Issues
- For SPA routing, ensure `_redirects` file is in `public` folder for Netlify:
  ```
  /*    /index.html   200
  ```
- Vercel handles React Router automatically

### Environment Variables Not Working
- Ensure variables start with `VITE_` for client-side access
- Restart the development server after adding new variables