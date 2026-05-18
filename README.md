# Event Calendar

Pet project: an event calendar with two user roles:

- child — can open tasks, submit answers, and unlock gifts
- parent — can manage events in the admin panel

## Features

- event list
- event details page
- answer validation
- gift unlocking after correct answers
- create / edit / delete events
- drag & drop deletion
- search and status filters

## Architecture

- public pages: SSR + React Query hydration
- admin panel: client-side rendering

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- dnd-kit

## Run locally

```bash
npm install
npm run dev
```
