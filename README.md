# Abstractive Speech-to-Text Summarization

Full-stack web application for authenticated, chat-style abstractive summarization using text prompts and optional audio input.

The project includes:
- A React + Vite frontend (TypeScript)
- A Node.js + Express backend API with MongoDB
- Google OAuth + JWT-based authentication
- Integration with a FastAPI model service for summarization

## Table of Contents

1. Overview
2. Tech Stack
3. Project Structure
4. Prerequisites
5. Environment Variables
6. Setup and Run
7. API Endpoints
8. Frontend Routes
9. Notes and Known Caveats

## Overview

Users can:
- Create an account with email/password or sign in with Google
- Log in and access a dashboard chat interface
- Send text prompts for model responses
- Upload or record audio and send it with a prompt

The frontend calls:
- The backend API for authentication and user profile data
- The FastAPI model service for text/audio summarization responses

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- Google OAuth client

### Backend
- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- Google Auth Library

## Project Structure

```text
.
|-- BackEnd/
|   |-- auth/
|   |-- Controllers/
|   |-- DataBase/
|   |-- Errors/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- package.json
|   `-- server.js
|-- front_end/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- services/
|   |   `-- utility/
|   `-- package.json
|-- inference-using-fast-api.ipynb
`-- README.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB (local instance or MongoDB Atlas)
- Google OAuth Client ID (for Google Sign-In)
- Running FastAPI summarization service (for `/model` and `/upload` calls)

## Environment Variables

### Backend (`BackEnd/.env`)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/abstractive_speech
JWT_SECRET=replace_with_secure_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

### Frontend (`front_end/.env`)

```env
VITE_BACK_END_API_URL=http://localhost:5000
VITE_FAST_API_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

Notes:
- The backend CORS origin is currently set to `http://localhost:5173`.
- `VITE_GOOGLE_CLIENT_ID` should match `GOOGLE_CLIENT_ID` for token audience verification.

## Setup and Run

Install and run each service in separate terminals.

### 1) Backend

```bash
cd BackEnd
npm install
npm run dev
```

Available scripts:
- `npm start` - run with Node
- `npm run dev` - run with Nodemon

### 2) Frontend

```bash
cd front_end
npm install
npm run dev
```

Available scripts:
- `npm run dev` - start Vite dev server
- `npm run build` - type-check and build
- `npm run lint` - run ESLint
- `npm run preview` - preview production build

### 3) FastAPI Model Service

Start your FastAPI server so the frontend can call:
- `POST /model` for text-only prompts
- `POST /upload` for audio + text prompts

Set `VITE_FAST_API_URL` to the FastAPI base URL.

## API Endpoints

### Auth and User (Express backend)

Base URL: `http://localhost:5000`

- `POST /user/register`
	- Body: `{ username, email, password }`
	- Returns JWT and user profile

- `POST /user/login`
	- Body: `{ email, password }`
	- Returns JWT and user profile

- `POST /auth/google`
	- Body: `{ credential }` (Google ID token)
	- Verifies Google token, creates/fetches user, returns JWT

- `GET /user/data`
	- Header: `Authorization: Bearer <token>`
	- Returns authenticated user data

### Model Service (FastAPI)

Base URL: value of `VITE_FAST_API_URL`

- `POST /model`
	- Body: `{ prompt }`
	- Returns model text response

- `POST /upload`
	- Body: `{ filename, content_type, audio_data, prompt }`
	- Returns model response for audio + prompt

## Frontend Routes

- `/login` - login page
- `/signup` - sign-up page
- `/dashboard` - chat dashboard (history + chat UI)

Unknown routes redirect to `/login`.

## Notes and Known Caveats

- Backend route file is named `uesr_api.js` (typo in filename, but imported consistently).
- Dashboard route component file is named `dashboad.tsx` (typo in filename, but imported consistently).
- Some frontend service methods exist but are not fully wired across all components.
- Root notebook `inference-using-fast-api.ipynb` can be used for model-side experimentation.

---

If you want, I can also generate:
- a production deployment section (Docker/Nginx/PM2)
- a contributor guide
- and a troubleshooting section with common setup errors
