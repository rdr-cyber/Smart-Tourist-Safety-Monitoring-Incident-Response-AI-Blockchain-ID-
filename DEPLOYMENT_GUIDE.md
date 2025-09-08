# Deployment Guide for Smart Tourist Safety Monitoring System

This guide will help you deploy the Smart Tourist Safety Monitoring & Incident Response system to Vercel.

## Prerequisites

1. A Vercel account (free at [vercel.com](https://vercel.com))
2. Node.js installed on your local machine
3. Git installed on your local machine

## Preparing the Application for Deployment

### 1. Project Structure
The application is already structured for deployment with:
- `public/` directory for static assets
- `src/` directory for React components
- `server.js` for the backend API
- `vercel.json` for deployment configuration

### 2. Environment Variables
Create a `.env.production` file in the `web-app` directory with:
```
REACT_APP_API_URL=https://your-vercel-url/api
REACT_APP_APP_NAME=Smart Tourist Safety Admin
REACT_APP_VERSION=1.0.0
```

## Deploying to Vercel

### Option 1: Deploy from Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in to your account
2. Click "New Project"
3. Import the `web-app` directory from your Git repository or upload the files directly
4. Configure the project settings:
   - Framework Preset: Create React App
   - Root Directory: Leave as is
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Add environment variables if needed
6. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI globally:
   ```
   npm install -g vercel
   ```

2. Navigate to the `web-app` directory:
   ```
   cd web-app
   ```

3. Deploy the project:
   ```
   vercel --prod
   ```

4. Follow the prompts to configure your deployment

## Vercel Configuration

The `vercel.json` file in the project root contains the deployment configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["dist/**"]
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/public/index.html"
    }
  ]
}
```

## Post-Deployment Configuration

### 1. Update API URLs
After deployment, update the API URLs in your frontend code to point to your Vercel deployment URL.

### 2. Environment Variables
Set the following environment variables in your Vercel project settings:
- `REACT_APP_API_URL` - Your Vercel deployment URL + `/api`
- `PORT` - Vercel will automatically set this

## India-Themed Imagery

The application includes India-themed imagery for popular tourist destinations:
- Taj Mahal, Agra
- Gateway of India, Mumbai
- Hawa Mahal, Jaipur
- India Gate, Delhi
- Kedarnath Temple, Uttarakhand
- Jagannath Temple, Puri
- Qutub Minar, Delhi
- Mysore Palace, Mysore

These images are stored in the `public/images` directory and are referenced throughout the application.

## Custom Domain (Optional)

To use a custom domain:

1. In your Vercel dashboard, go to your project settings
2. Navigate to the "Domains" section
3. Add your custom domain
4. Follow the DNS configuration instructions provided

## Troubleshooting

### Common Issues

1. **API Endpoints Not Working**
   - Check that your `vercel.json` routes are correctly configured
   - Verify environment variables are set correctly

2. **Images Not Loading**
   - Ensure images are placed in the `public/images` directory
   - Check that image paths in components are correct

3. **Build Failures**
   - Verify all dependencies are listed in `package.json`
   - Check for syntax errors in your code

### Support

If you encounter issues with deployment:
1. Check the Vercel deployment logs for error messages
2. Verify your project structure matches the requirements
3. Contact Vercel support if needed

## Updating the Deployment

To update your deployed application:

1. Make changes to your local code
2. Commit and push to your Git repository
3. If connected to Git, Vercel will automatically deploy
4. Or run `vercel --prod` to manually deploy updates

## Monitoring and Analytics

Vercel provides built-in monitoring and analytics:
- Real-time performance metrics
- Error tracking
- Visitor analytics
- Deployment history

Access these features through your Vercel dashboard.