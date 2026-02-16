# SpeakMate - AI English Speaking Companion

SpeakMate is a production-ready SaaS application...

## 🚀 Features
...

## 🛠 Tech Stack

-   **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, ShadCN UI.
-   **Backend**: Next.js Server Actions, NextAuth.js (Auth.js), Prisma ORM.
-   **Database**: PostgreSQL (Dockerized).
-   **AI**: OpenAI GPT-4o, Whisper, ElevenLabs.

## ⚡️ Getting Started

### 1. Prerequisites
-   Docker & Docker Compose
-   Node.js 18+

### 2. Installation

```bash
git clone https://github.com/your-username/speak-mate.git
cd speak-mate
npm install
```

### 3. Database Setup (Docker)

1.  Start the PostgreSQL container:
    ```bash
    docker-compose up -d
    ```

2.  Push Schema to Database:
    ```bash
    npx prisma db push
    ```

### 4. Environment Variables

Copy `.env.example` to `.env`.
Ensure `DATABASE_URL="postgresql://postgres:password@localhost:5432/speakmate"` matches your docker-compose config.
Generate `AUTH_SECRET` using `openssl rand -base64 32`.

### 5. Run App
```bash
npm run dev
```

Visit http://localhost:3000

## 🐳 Docker Commands

-   Start DB: `docker-compose up -d`
-   Stop DB: `docker-compose down`
-   View Logs: `docker logs speakmate_db`

