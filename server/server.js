
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

// In-memory store for tokens (replace with a database in production)
const tokenStore = {};

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'social-media-oauth-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get connected platforms for the current user
app.get('/api/platforms', (req, res) => {
  // In a real app, you would get the user ID from the authenticated session
  const userId = req.session.userId || 'demo-user';
  
  const userTokens = tokenStore[userId] || {};
  const platforms = Object.keys(userTokens).map(platformId => {
    return {
      id: platformId,
      name: getPlatformName(platformId),
      icon: platformId,
      isConnected: true,
      accountName: userTokens[platformId].accountName || `@user_${platformId}`,
      lastSync: userTokens[platformId].lastSync || new Date().toISOString(),
      syncFrequency: userTokens[platformId].syncFrequency || "daily",
      notifications: userTokens[platformId].notifications || { mentions: true, messages: true }
    };
  });
  
  res.json(platforms);
});

// Initialize OAuth flow
app.get('/api/auth/:platform', (req, res) => {
  const { platform } = req.params;
  
  // Set user ID in session
  req.session.userId = req.session.userId || 'demo-user';
  
  // Store the return URL if provided
  if (req.query.returnTo) {
    req.session.returnTo = req.query.returnTo;
  }
  
  switch (platform) {
    case 'facebook':
      const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/facebook/callback`;
      const facebookAuthUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=pages_manage_posts,pages_read_engagement`;
      
      res.redirect(facebookAuthUrl);
      break;
      
    // Add other platforms here
    
    default:
      res.status(400).json({ error: 'Unsupported platform' });
  }
});

// OAuth callback handlers
app.get('/api/auth/facebook/callback', async (req, res) => {
  const { code } = req.query;
  const userId = req.session.userId;
  
  if (!code) {
    return res.redirect(`${process.env.CLIENT_URL}/dashboard/social?error=auth_failed`);
  }
  
  try {
    const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/facebook/callback`;
    
    // Exchange code for access token
    const tokenResponse = await axios.get(
      `https://graph.facebook.com/v20.0/oauth/access_token`,
      {
        params: {
          client_id: process.env.FACEBOOK_APP_ID,
          client_secret: process.env.FACEBOOK_APP_SECRET,
          redirect_uri: redirectUri,
          code
        }
      }
    );
    
    const accessToken = tokenResponse.data.access_token;
    
    // Get user info
    const userResponse = await axios.get(
      `https://graph.facebook.com/v20.0/me`,
      {
        params: { access_token: accessToken }
      }
    );
    
    // Store the token
    if (!tokenStore[userId]) {
      tokenStore[userId] = {};
    }
    
    tokenStore[userId]['facebook'] = {
      accessToken,
      accountName: `@${userResponse.data.name.toLowerCase().replace(/\s+/g, '_')}`,
      lastSync: new Date().toISOString(),
      syncFrequency: "daily",
      notifications: { mentions: true, messages: true }
    };
    
    // Redirect back to the app
    const returnTo = req.session.returnTo || '/dashboard/social';
    res.redirect(`${process.env.CLIENT_URL}${returnTo}?connected=facebook`);
    
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.redirect(`${process.env.CLIENT_URL}/dashboard/social?error=auth_failed&details=${error.message}`);
  }
});

// Disconnect a platform
app.delete('/api/platforms/:platformId', (req, res) => {
  const { platformId } = req.params;
  const userId = req.session.userId || 'demo-user';
  
  if (tokenStore[userId] && tokenStore[userId][platformId]) {
    delete tokenStore[userId][platformId];
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Platform not connected' });
  }
});

// Post to social media
app.post('/api/publish/:platformId', async (req, res) => {
  const { platformId } = req.params;
  const { content, title } = req.body;
  const userId = req.session.userId || 'demo-user';
  
  if (!tokenStore[userId] || !tokenStore[userId][platformId]) {
    return res.status(401).json({ error: 'Platform not connected' });
  }
  
  try {
    switch (platformId) {
      case 'facebook':
        const accessToken = tokenStore[userId][platformId].accessToken;
        
        // Post to Facebook
        const response = await axios.post(
          `https://graph.facebook.com/v20.0/me/feed`,
          {
            message: content
          },
          {
            params: { access_token: accessToken }
          }
        );
        
        res.json({
          success: true,
          postId: response.data.id
        });
        break;
        
      // Add other platforms here
      
      default:
        res.status(400).json({ error: 'Unsupported platform' });
    }
  } catch (error) {
    console.error(`Error posting to ${platformId}:`, error);
    res.status(500).json({
      error: 'Failed to post content',
      details: error.message
    });
  }
});

// Helper functions
function getPlatformName(platformId) {
  const platforms = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    instagram: 'Instagram',
    wordpress: 'WordPress Blog'
  };
  
  return platforms[platformId] || platformId;
}

// Start server
app.listen(port, () => {
  console.log(`Social media OAuth server running on port ${port}`);
});
