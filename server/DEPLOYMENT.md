
# Deployment Guide

This document provides guidance on deploying the social media OAuth application to production.

## Backend Deployment

### Option 1: Heroku

1. Create a Heroku account and install the Heroku CLI
2. Log in to Heroku CLI:
   ```
   heroku login
   ```
3. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```
4. Set environment variables:
   ```
   heroku config:set FACEBOOK_APP_ID=your_facebook_app_id
   heroku config:set FACEBOOK_APP_SECRET=your_facebook_app_secret
   heroku config:set CLIENT_URL=https://your-frontend-url.com
   heroku config:set SESSION_SECRET=your_session_secret
   ```
5. Deploy the backend:
   ```
   git subtree push --prefix server heroku main
   ```

### Option 2: Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Set environment variables in the Render dashboard
6. Deploy the service

## Frontend Deployment

### Option 1: Vercel

1. Connect your GitHub repository to Vercel
2. Configure the environment variables
3. Deploy the application

### Option 2: Netlify

1. Connect your GitHub repository to Netlify
2. Configure the build settings: `npm run build`
3. Set environment variables
4. Deploy the application

## Production Configuration

1. Update the OAuth redirect URIs in your Facebook Developer Console to include your production URLs
2. Ensure all API endpoints use HTTPS
3. Update the API base URL in the frontend to point to your production backend
4. Consider adding rate limiting and additional security measures

## SSL/HTTPS

Always use HTTPS in production for:
- Frontend application
- Backend API endpoints
- OAuth redirects

## Monitoring and Maintenance

1. Set up logging to monitor application performance
2. Implement error tracking
3. Create a token refresh strategy to handle expired tokens
4. Plan for API version updates (Facebook Graph API changes periodically)
