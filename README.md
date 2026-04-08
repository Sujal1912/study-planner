# Smart Study Planner App

A full-stack study planner with authentication, analytics, and export tools.

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)

## Upgraded Features
- User Sign Up and Login (JWT auth)
- Private tasks per user account
- Add/edit/delete tasks with subject, topic, deadline, exam date, estimated hours
- Mark task completed/pending
- Log study sessions in minutes per task
- Streak tracking (current and longest)
- Study time analytics (total minutes)
- Exam countdown and upcoming exam list
- Priority score for each task
- Export timetable to PDF

## Setup

### 1. Backend setup
```bash
cd server
npm install
```

Create `.env` in `server/`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_study_planner
JWT_SECRET=replace_with_a_secure_long_random_string
```

Run backend:
```bash
npm run dev
```

### 2. Frontend setup
```bash
cd client
npm install
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`
"# study-planner" 
