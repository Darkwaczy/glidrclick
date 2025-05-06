
# Social Media OAuth Server

This is a backend server for handling OAuth flows and social media integrations for the dashboard application.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with your OAuth credentials and configuration:
   ```
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret
   PORT=5000
   CLIENT_URL=http://localhost:3000
   SESSION_SECRET=your_session_secret_here
   ```

3. Start the server:
   ```
   npm start
   ```

## API Endpoints

- `GET /api/health` - Check server health
- `GET /api/platforms` - Get all connected platforms for the current user
- `GET /api/auth/:platform` - Initialize OAuth flow for a platform
- `DELETE /api/platforms/:platformId` - Disconnect a platform
- `POST /api/publish/:platformId` - Publish content to a social platform

## Supported Platforms

- Facebook
- (More platforms coming soon)
