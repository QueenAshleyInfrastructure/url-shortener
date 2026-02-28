# Lab 4 — Dynamic Routing (Blog App)

## Overview

A simple blog application with:

- **Mock blog data** — in-memory posts with `id`, `slug`, `title`, `content` (see `src/lib/posts.js`).
- **Public blog pages** — index at `/blog` listing all posts (each links to `/blog/[slug]`), and dynamic post page at `/blog/:slug` that shows the post or "Post not found."
- **Auth (AuthContext)** — `isAuthenticated`, `login()`, `logout()`; no real credentials.
- **Login page** — `/login` with a "Log In" button that calls `login()` and redirects to Admin.
- **Navbar** — "Log In" when logged out; "Log Out" and "Admin" link when logged in.
- **Protected Admin** — `/admin` shows "Welcome to the Admin Dashboard."; unauthenticated users are redirected to `/login`.

## How to run

From the **project root** (2025-RTT-74):

```bash
cd "mod-10/LAB 4"
npm install
npm run dev
```

If you're already inside another lab (e.g. LAB 3), go to LAB 4 first:

```bash
cd "../LAB 4"
npm install
npm run dev
```

Then open the URL shown (e.g. http://localhost:5173). Use "Log In" to access the Admin page; visiting `/admin` while logged out redirects to `/login`.

## Project structure

- `src/lib/posts.js` — mock blog data and `getPostBySlug(slug)`
- `src/context/AuthContext.jsx` — auth state and `login`/`logout`
- `src/pages/` — Home, BlogIndex, BlogPost, Login, Admin
- `src/components/` — Navbar, ProtectedRoute

## Grading (complete/incomplete)

- **Deliverables:** All source files, README, and runnable app.
- **Requirements:** Blog index and dynamic post pages, auth flow, protected `/admin`, and redirect to `/login` when not authenticated.
