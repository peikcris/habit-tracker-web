# Habit Tracker

A full-stack habit tracker where you sign up, add daily habits, check them off, and build streaks.

**Live demo:** https://habit-tracker-web-red.vercel.app
**Backend API:** https://github.com/peikcris/habit-tracker-api

> The demo runs on free hosting. The first request can take up to a minute while the server wakes up, and demo data may reset periodically.


## Features
- Sign up and log in with JWT authentication
- Add, complete, and delete habits
- Daily progress summary ("2 of 3 done today")
- Streak counter for consecutive days 🔥
- Session persists across page reloads
- Loading and error states, including automatic logout when a session expires

## Tech stack
- React 19 with Vite
- JavaScript (ES modules), Fetch API
- Deployed on Vercel

## How it works
The app is a single-page React frontend that talks to a separate REST API
([habit-tracker-api](https://github.com/peikcris/habit-tracker-api)).
After logging in, the JWT is stored in `localStorage` and sent with every
request in the `Authorization` header. The frontend sends the user's local date,
so streaks are calculated for the right day in any time zone.

## Run locally
1. Start the [API](https://github.com/peikcris/habit-tracker-api) on port 3000.
2. Then run:

```bash
git clone https://github.com/peikcris/habit-tracker-web.git
cd habit-tracker-web
npm install
npm run dev
```

Open http://localhost:5173

To use a different API, set the environment variable `VITE_API_URL`
(for example `https://your-api.example.com/api`). It defaults to `http://localhost:3000/api`.

## Project structure
```
src/
├── api.js       # fetch helper that adds the auth token
├── Auth.jsx     # login and signup screen
├── Habits.jsx   # habit list, add, complete, delete
├── App.jsx      # auth state and layout
└── index.css    # styles
```

## What I learned
- Connecting a React frontend to a separate REST API
- Handling authentication tokens on the client
- Deploying a full-stack app across Vercel and Render
