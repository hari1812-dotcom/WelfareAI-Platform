# WelfareAI Platform - Citizen Portal Backend

## Project Overview
AI-Powered Social Welfare Scheme Eligibility, Planning, and Benefit Tracking System — A Lifelong AI Welfare Companion.
This project includes a complete Node.js + Express backend that powers a modern React frontend dashboard. The focus of the system is the implementation of a Lifetime Eligibility Radar, Citizen Welfare Roadmap, Government Benefit Portfolio, and AI Welfare Coach using real server data backed by MongoDB.

## Architecture
- **Frontend**: React (Vite), React Router, TailwindCSS.
- **Backend API**: Node.js, Express.js.
- **Database**: MongoDB (via Mongoose), utilizing models for Citizens, Schemes, Benefits, Applications, and Documents.
- **Authentication**: JWT-based stateless authentication on user accounts with encrypted bcrypt passwords.

## Technology Stack
- **Database**: MongoDB + Mongoose
- **Backend Framework**: Express.js
- **Auth**: bcryptjs + jsonwebtoken
- **Frontend Framework**: React + Vite
- **Styling**: Tailwind CSS + Custom Design System

## MongoDB Setup
1. Ensure you have MongoDB running locally, or use a MongoDB Atlas cluster.
2. The initial database will be created automatically upon connection.

## Environment Variables
Create a `.env` file in the `backend/` directory:
```
MONGODB_URI=mongodb://127.0.0.1:27017/welfareai
JWT_SECRET=your_secret_key_here
PORT=5000
```

## Backend Setup
```bash
cd backend
npm install
node seed.js
npm start
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Seed Data
A script is provided in `backend/seed.js`. Running it will dynamically generate various scheme models, applying conditional matching logic ready for evaluation by the eligibility engine against different user models. Run `node seed.js` to populate mock schemes in MongoDB.

## API Overview
- `POST /api/auth/register` - Create citizen account
- `POST /api/auth/login` - Exchange credentials for JWT token
- `GET /api/auth/me` - Fetch active logged-in user profile
- `GET /api/dashboard/` - Authenticated retrieval of living citizen dashboard metrics.
- `GET /api/health` - Basic health check.

## Demo Accounts
- Registration logic dynamically links JWTs for any new user creation.

## How to Run
1. Start MongoDB.
2. In Terminal A (Backend): `npm run dev` in `/backend`.
3. In Terminal B (Frontend): `npm run dev` in `/frontend`.
4. Open the presented localhost port corresponding with your Vite instance (e.g. `localhost:5173`).

## Important Assumptions
- Currently configured strictly for the `CITIZEN` role.
- Certain application/welfare dashboard metrics on the `/api/dashboard` view are aggregated dynamically behind the scenes for demo display as true multi-collection pipelines expand.
- Auth validation enforces HTTP headers parsing the `Bearer` token schema.
