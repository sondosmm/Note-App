# Notes Application API

A full-featured RESTful API for managing notes with user authentication, built with Node.js, Express, and MongoDB.

## Features

### 🔐 Authentication System
- **User Registration** - Create new user accounts with email/password
- **User Login** - Authenticate users and receive JWT tokens
- **Token Refresh** - Automatic token renewal for continuous sessions
- **Logout** - Secure session termination
- **Email Notifications** - Welcome emails sent upon registration
- **Password Encryption** - Bcrypt hashing for secure password storage
- **JWT Authentication** - Access and refresh token system
- **HTTP-Only Cookies** - Secure token storage in cookies

### 📝 Notes Management
- **Create Notes** - Add new notes with title and optional image
- **Read Notes** - Retrieve all notes with pagination support
- **Read Single Note** - Get specific note by ID
- **Update Notes** - Modify note title and/or image
- **Delete Notes** - Remove notes and associated images
- **Image Upload** - Attach images to notes
- **Auto Slug Generation** - SEO-friendly URL slugs
- **Image Management** - Automatic deletion of old images on update/delete

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Email Service**: Nodemailer (Gmail)
- **Environment Variables**: dotenv

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd notes-app
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in the root directory
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/notes-app
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```

4. Start the server
```bash
npm start
# or for development
npm run dev
```

## API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "id": "user_id_here"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "accessToken": "jwt_token_here"
}
```
*Cookies: accessToken, refreshToken (HTTP-only)*

#### Refresh Token
```http
POST /api/auth/refresh
Cookie: refreshToken=<token>
```

**Response:**
```json
{
  "accessToken": "new_jwt_token_here"
}
```

#### Logout
```http
POST /api/auth/logout
Cookie: refreshToken=<token>
```

**Response:**
```json
{
  "message": "user loged out successfully"
}
```

### Notes Routes

All notes routes require authentication (send accessToken in cookie or Authorization header)

#### Get All Notes
```http
GET /api/notes?page=1&limit=4
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "total": 4,
  "page": 1,
  "data": [
    {
      "_id": "note_id",
      "title": "My Note",
      "slug": "my-note",
      "image": "uploads/notes/image.jpg",
      "createdAt": "2025-10-17T10:00:00.000Z"
    }
  ]
}
```

#### Get Single Note
```http
GET /api/notes/:id
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "data": {
    "_id": "note_id",
    "title": "My Note",
    "slug": "my-note",
    "image": "uploads/notes/image.jpg"
  }
}
```

#### Create Note
```http
POST /api/notes
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data

title: My New Note
image: <file>
```

**Response:**
```json
{
  "message": "Note created successfully",
  "data": {
    "_id": "note_id",
    "title": "My New Note",
    "slug": "my-new-note",
    "image": "uploads/notes/image.jpg"
  }
}
```

#### Update Note
```http
PUT /api/notes/:id
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data

title: Updated Note Title
image: <file> (optional)
```

**Response:**
```json
{
  "data": {
    "_id": "note_id",
    "title": "Updated Note Title",
    "slug": "updated-note-title",
    "image": "uploads/notes/new-image.jpg"
  }
}
```

#### Delete Note
```http
DELETE /api/notes/:id
Authorization: Bearer <accessToken>
```

**Response:**
```
204 No Content
```

## Authentication Flow

1. **Registration**: User signs up → Password hashed → User saved → Welcome email sent
2. **Login**: User credentials verified → Access & refresh tokens generated → Tokens stored in HTTP-only cookies
3. **Protected Routes**: Middleware checks accessToken → Verifies JWT → Allows/denies access
4. **Token Refresh**: When accessToken expires → Use refreshToken → Get new tokens
5. **Logout**: Refresh token deleted from database → Cookies cleared

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ HTTP-only cookies (prevents XSS)
- ✅ Refresh token rotation
- ✅ Token blacklisting on logout
- ✅ Protected routes with middleware
- ✅ Email validation
- ✅ Duplicate email prevention

## File Upload

- Images stored in `uploads/notes/` directory
- Supported formats: jpg, jpeg, png
- Old images automatically deleted on update/delete
- File size and type validation via Multer middleware

## Error Handling

The API uses consistent error responses:

```json
{
  "error": "Error message here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `204` - No Content (Delete)
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (Duplicate)
- `500` - Server Error

## Pagination

Notes endpoints support pagination:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 4)

Example: `GET /api/v1/notes?page=2&limit=10`

## Project Structure

```
├── controllers/
│   ├── authController.js
│   └── NoteController.js
├── models/
│   ├── userModel.js
│   ├── tokenModel.js
│   └── NoteModel.js
├── middleware/
│   ├── auth.js
│   └── uploadImage.js
├── routes/
│   ├── authRoutes.js
│   └── noteRoutes.js
├── utils/
│   ├── apiError.js
│   ├── generateTokens.js
│   └── asyncHandler.js
├── uploads/
│   └── notes/
├── config.env
└── server.js
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/notes` |
| `JWT_ACCESS_SECRET` | Secret for access tokens | `your_secret_key` |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | `your_refresh_secret` |
| `JWT_ACCESS_EXPIRE` | Access token expiry | `15m` |
| `JWT_REFRESH_EXPIRE` | Refresh token expiry | `7d` |
| `EMAIL_USER` | Gmail address | `your@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password | `app_specific_password` |

## Gmail Setup for Emails

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App Passwords
   - Select "Mail" and your device
   - Copy the generated password
3. Use the app password in `EMAIL_PASSWORD` environment variable

