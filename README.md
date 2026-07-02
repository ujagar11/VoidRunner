# VoidRunner

A full-stack online judge built with the MERN stack. Write code, run it against test cases in an isolated Docker sandbox, get an instant verdict, and even ask an AI to review your solution — all from a LeetCode-style problem page.

## Features

- **Auth** — register/login with JWT, passwords hashed with bcrypt
- **Problem set** — browse problems with difficulty badges (Easy/Medium/Hard), search and filter by difficulty/solved status
- **Code editor** — Monaco editor (same engine as VS Code) with support for C++, Python, and Java
- **Online judge** — submitted code runs inside isolated, resource-limited Docker containers (no network access, memory caps, execution timeouts)
- **Run vs Submit** — Run tests against sample cases only; Submit tests against all cases (including hidden ones) and saves your submission
- **AI code review** — get instant feedback on your solution powered by Gemini
- **Verdicts** — Accepted, Wrong Answer, Time Limit Exceeded, Runtime Error, Compilation Error, with the failing test case flagged

## Tech stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Monaco Editor, Axios

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt

**Execution engine:** Docker (isolated containers per submission), Gemini API for AI review

## Project structure

```
GhoulOJ/
├── backend/
│   ├── controller/        # request handlers (auth, problems, submissions)
│   ├── model/              # Mongoose schemas (User, Problem, Submission)
│   ├── routes/              # Express route definitions
│   ├── middleware/           # JWT auth, optional auth, rate limiting
│   ├── judge/                  # execution engine
│   │   ├── docker/               # Dockerfiles for cpp / python / java
│   │   ├── languageConfig.js      # per-language compile/run commands
│   │   ├── fileManager.js          # temp file creation & cleanup
│   │   ├── dockerRunner.js          # spawns Docker, captures output
│   │   ├── judgeService.js           # orchestrates execution + verdict logic
│   │   └── aiReview.js                # Gemini-powered code review
│   ├── database/
│   └── server.js
│
└── frontend/
    └── src/
        ├── features/
        │   ├── auth/            # login / signup
        │   ├── problemset/      # problem list + detail page
        │   ├── coding-area/     # Monaco editor, run/submit, output panel
        │   └── dashboard/       # (planned) submission history & stats
        └── shared/              # axios instance, shared components
```

## How code execution works

1. User writes code in the Monaco editor and clicks **Run** or **Submit**
2. Backend writes the code to a temporary, uniquely-named folder
3. A fresh Docker container is spun up with `--network none` and a memory cap, mounting that folder
4. Compiled languages (C++, Java) are compiled first; a failed compile returns a `Compilation Error` immediately
5. The program runs with the test case's input piped to stdin, with a hard timeout (catches infinite loops as `TLE`)
6. Output is compared against the expected output to produce a verdict
7. The temporary folder is deleted immediately after, regardless of outcome
8. **Run** only tests sample cases and saves nothing; **Submit** tests all cases (including hidden ones) and saves a `Submission` record, updating the user's solved list on `Accepted`

## Getting started

### Prerequisites

- Node.js
- MongoDB (local or Atlas)
- Docker Desktop (must be running — the judge shells out to the Docker CLI)
- A Google Gemini API key (for AI code review)

### Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see `.env.example`):

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_genai_api_key
```

Build the judge's Docker images (one-time setup):

```bash
docker build -t judge-cpp -f judge/docker/Dockerfile.cpp .
docker build -t judge-python -f judge/docker/Dockerfile.python .
docker build -t judge-java -f judge/docker/Dockerfile.java .
```

Start the server:

```bash
npx nodemon server.js
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

### Seeding problems

There's currently no admin UI — add problems directly via `POST /problems` (e.g. with Postman):

```json
{
  "title": "Fibonacci Number",
  "description": "Given an integer n, return the nth Fibonacci number.",
  "difficulty": "Easy",
  "constraints": "0 <= n <= 30",
  "testCases": [
    { "input": "5", "expectedOutput": "5", "isHidden": false },
    { "input": "20", "expectedOutput": "6765", "isHidden": true }
  ]
}
```

## API overview

| Method | Route | Description |
|---|---|---|
| POST | `/register` | Create an account |
| POST | `/login` | Log in, returns a JWT |
| GET | `/problems` | List all problems (with solved status if logged in) |
| GET | `/problems/:id` | Get one problem (hidden test cases stripped) |
| POST | `/problems` | Create a problem *(currently unprotected — no admin roles yet)* |
| POST | `/run` | Run code against sample test cases only |
| POST | `/submit` | Run code against all test cases, saves the submission |
| POST | `/ai-review` | Get an AI-generated review of your code (rate-limited) |

## Roadmap

- [ ] Dashboard — submission history and solved-problem stats per user
- [ ] Admin role for problem management (currently open/unprotected)
- [ ] Per-test-case breakdown on submission results
- [ ] Submission queue for handling concurrent load
- [ ] More refinement in fronted

## Notes

This is a learning/portfolio project — security and scaling decisions (e.g. unprotected problem-creation route, synchronous Docker execution, JWT in localStorage) were made deliberately to keep v1 simple, with notes left above on what a production version would change.
