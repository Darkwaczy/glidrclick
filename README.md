
# Social Media Integration Project

This project demonstrates a social media OAuth integration with a React frontend and Node.js backend.

## Project Structure

- `/src` - React frontend application
- `/server` - Node.js Express backend for OAuth and API handling

## Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your OAuth credentials:
   ```
   FACEBOOK_APP_ID=958890536078118
   FACEBOOK_APP_SECRET=your_facebook_app_secret_here
   PORT=5000
   CLIENT_URL=http://localhost:3000
   SESSION_SECRET=your_session_secret_here
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

The server will run on `http://localhost:5000`.

## Frontend Setup

The frontend is already configured to communicate with the backend API. Make sure to:

1. Run the frontend development server:
   ```
   npm run dev
   ```

2. Access the application at `http://localhost:3000`

## Using the Application

1. Navigate to the Social page in your dashboard
2. Click "Connect Platform" to initiate the OAuth flow
3. Authorize the application to access your social media account
4. Once connected, you can post content to your social media accounts

## Security Notes

- Access tokens are stored securely on the backend
- OAuth flows are handled properly with secure redirects
- HTTPS is recommended for production deployments

## Supported Platforms

Currently implemented:
- Facebook

Coming soon:
- Twitter
- Instagram
- WordPress Blog
