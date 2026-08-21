````md
# Personal Habit Tracking

A backend application for managing personal habits, tracking daily progress and maintaining habit completion history with secure user authentication.

Built with:

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Zod Validation
- Jest + Supertest

---

# Features

## Authentication
- User registration
- User login
- JWT based authentication
- Password hashing using bcrypt

## Habit Management
- Create habits
- Get all habits
- Get habit by ID
- Update habit
- Delete habit

## Habit Tracking
- Mark habit as completed for the day
- Prevent duplicate completion on the same day
- View habit completion history

---

# Project Setup

## 1. Clone repository

```bash
git clone <repository-url>

cd personal-habit-tracking
````

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Environment Variables

Create `.env` file in the root directory:

```env
PORT=4000

MONGODB_URI=<your-mongodb-uri>

JWT_SECRET=<your-secret-key>

JWT_EXPIRES_IN=7d
```

For running tests create:

`.env.test`

```env
MONGO_URI=<test-mongodb-uri>

JWT_SECRET=test_secret
```

Example files are available:

```
.env.example
.env.test.example
```

---

# Running the Application

## Development

Runs TypeScript directly using tsx:

```bash
npm run dev
```

Server:

```
http://localhost:4000
```

---

## Production Build

Compile TypeScript:

```bash
npm run build
```

Start server:

```bash
npm start
```

---

# Testing

Run all tests:

```bash
npm test
```

Test coverage includes:

* Health check API
* Authentication APIs
* Habit CRUD APIs
* Habit tracking APIs

---

# Database Setup

The application uses MongoDB Atlas.

Create a MongoDB database and update:

```
MONGODB_URI
```

in `.env`.

Collections are created automatically by Mongoose.

---

# Database Schema Design

## User Schema

Collection:

```
users
```

Fields:

```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

Relationships:

* One user can have multiple habits.
* One user can have multiple tracking logs.

---

## Habit Schema

Collection:

```
habits
```

Fields:

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "title": "Drink Water",
  "description": "Drink 3 litres daily",
  "frequency": "daily",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

Relationships:

```
User 1 -------- * Habit
```

---

## Tracking Log Schema

Collection:

```
trackinglogs
```

Fields:

```json
{
  "_id": "ObjectId",
  "habitId": "ObjectId",
  "userId": "ObjectId",
  "completedAt": "Date"
}
```

Relationships:

```
Habit 1 -------- * TrackingLog
User  1 -------- * TrackingLog
```

---

# Authentication

The API uses JWT authentication.

After successful login, the server returns:

```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

For protected routes add:

```
Authorization: Bearer <token>
```

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
```

---

# API Documentation

Base URL:

```
http://localhost:4000
```

---

# Authentication Routes

## Register User

### POST

```
/register
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@test.com"
  }
}
```

---

## Login User

### POST

```
/login
```

Request:

```json
{
  "email": "john@test.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@test.com"
  }
}
```

---

# Habit Routes

All habit routes require JWT authentication.

Header:

```
Authorization: Bearer <token>
```

---

## Create Habit

### POST

```
/habits
```

Request:

```json
{
  "title": "Exercise",
  "description": "30 minutes workout",
  "frequency": "daily"
}
```

Response:

```json
{
  "success": true,
  "habit": {
    "title": "Exercise"
  }
}
```

---

## Get All Habits

### GET

```
/habits
```

Response:

```json
{
  "success": true,
  "habits": []
}
```

---

## Get Habit By ID

### GET

```
/habits/:id
```

Example:

```
/habits/65abc123
```

---

## Update Habit

### PUT

```
/habits/:id
```

Request:

```json
{
  "title": "Read Books"
}
```

---

## Delete Habit

### DELETE

```
/habits/:id
```

---

# Habit Tracking Routes

## Mark Habit Complete

### POST

```
/habits/:id/track
```

Example:

```
POST /habits/65abc123/track
```

Response:

```json
{
  "success": true,
  "message": "Habit completed successfully"
}
```

A habit cannot be completed twice on the same day.

---

## Get Habit History

### GET

```
/habits/:id/history
```

Response:

```json
{
  "success": true,
  "message": "Habit history fetched successfully",
  "history": [
    {
      "date": "2026-08-21",
      "completed": true
    },
    {
      "date": "2026-08-20",
      "completed": false
    },
    {
      "date": "2026-08-19",
      "completed": false
    },
    {
      "date": "2026-08-18",
      "completed": false
    },
    {
      "date": "2026-08-17",
      "completed": false
    },
    {
      "date": "2026-08-16",
      "completed": false
    },
    {
      "date": "2026-08-15",
      "completed": false
    }
  ],
  "streak": 1
}
```

---

# Error Response Format

All errors follow:

```json
{
  "success": false,
  "message": "Error message"
}
```

Common status codes:

| Status | Meaning               |
| ------ | --------------------- |
| 400    | Validation error      |
| 401    | Unauthorized          |
| 404    | Resource not found    |
| 409    | Conflict              |
| 500    | Internal server error |

---

# Folder Structure

```
src
├── config
│   └── db.ts
├── controllers
├── middleware
├── models
├── routes
├── services
├── validators
├── app.ts
└── server.ts

tests
├── app.test.ts
├── auth.test.ts
├── habit.test.ts
└── setup.ts

```
