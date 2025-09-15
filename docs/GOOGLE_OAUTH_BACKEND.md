# Google OAuth Integration - Backend Requirements

This document outlines the backend endpoints required for the Google OAuth integration.

## Required Backend Endpoints

### 1. OAuth Token Exchange

**Endpoint**: `POST /auth/google/exchange`

**Purpose**: Exchange Google authorization code for access/refresh tokens

**Request Body**:

```json
{
  "code": "google_authorization_code",
  "state": "csrf_protection_state",
  "redirectUri": "http://localhost:3000/auth/google/callback"
}
```

**Response** (Success):

```json
{
  "success": true,
  "token": "jwt_token_for_user_session",
  "user": {
    "id": "user_id",
    "email": "user@gmail.com",
    "name": "User Name",
    "picture": "https://..."
  }
}
```

**Response** (Error):

```json
{
  "success": false,
  "message": "Error description"
}
```

### 2. Google Connection Status

**Endpoint**: `GET /auth/google/status`

**Purpose**: Check if current user has Google account connected

**Headers**: Include user authentication (cookies/JWT)

**Response**:

```json
{
  "connected": true,
  "email": "user@gmail.com",
  "lastSynced": "2025-01-08T10:30:00Z"
}
```

### 3. Disconnect Google Account

**Endpoint**: `POST /auth/google/disconnect`

**Purpose**: Revoke Google tokens and unlink account

**Headers**: Include user authentication

**Response**:

```json
{
  "success": true,
  "message": "Google account disconnected successfully"
}
```

## Google OAuth Setup Instructions

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing one
3. Enable Gmail API:
   - Go to APIs & Services > Library
   - Search for "Gmail API"
   - Click Enable

### 2. OAuth2 Credentials

1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (development)
   - `https://yourdomain.com/auth/google/callback` (production)

### 3. OAuth Consent Screen

1. Go to APIs & Services > OAuth consent screen
2. Choose "External" (for public users)
3. Fill required fields:
   - App name: "Gystify"
   - User support email
   - Developer contact information
4. Add scopes:
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/gmail.modify`
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`

### 4. Environment Variables

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here

# Database (for storing tokens)
DATABASE_URL=your_database_url

# JWT for user sessions
JWT_SECRET=your_jwt_secret
```

## Backend Implementation Notes

### Token Storage

- Store Google access_token and refresh_token securely in database
- Associate with user account
- Implement token refresh logic for expired access tokens

### Security Considerations

- Validate state parameter to prevent CSRF attacks
- Use HTTPS in production
- Store refresh tokens encrypted
- Implement proper error handling and logging

### Gmail API Integration

After successful OAuth:

- Use stored access tokens to make Gmail API calls
- Implement automatic token refresh
- Handle API rate limits
- Process emails for summarization

## Frontend Configuration

Update your `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
NEXT_PUBLIC_HOSTNAME
=http://localhost:3000
```

## Flow Summary

1. **Frontend**: User clicks "Connect Gmail" button
2. **Frontend**: Redirects to Google OAuth consent screen
3. **Google**: User grants permissions, redirects back with authorization code
4. **Frontend**: Sends code to backend `/auth/google/exchange`
5. **Backend**: Exchanges code for tokens, creates/updates user, returns JWT
6. **Frontend**: Stores JWT, redirects to dashboard
7. **Backend**: Uses stored Google tokens to access Gmail API for email processing
