# Share-Nearby · Community Pantry

A premium frontend for a community pantry web app—share and request items with your neighbourhood (Bangalore). Built with React, Vite, Tailwind CSS, and dummy data only.

## Tech Stack

- **React 18** + **Vite 5**
- **JavaScript** (no TypeScript)
- **Tailwind CSS**
- **React Router DOM**
- **lucide-react** icons
- **Dummy data** (no backend)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

## Project Structure

```
src/
├── components/     # Reusable UI (Sidebar, TopNavbar, StatCard, ItemCard, FilterBar, EmptyState, Toast)
├── components/ui/  # Primitives (Button, Input, Card, Badge, Label, Select, Textarea, Skeleton)
├── data/           # Dummy data (items.js, requests.js)
├── layouts/        # DashboardLayout
├── lib/            # utils (cn, formatRelativeTime, formatDate)
├── pages/          # All 12 pages
├── routes/         # App routes
├── App.jsx
├── main.jsx
└── index.css
```

## Pages

1. **Landing** — Hero, features, CTA
2. **Login** — Email/password form
3. **Signup** — Name, email, password
4. **Dashboard** — Layout with sidebar + top navbar
5. **Dashboard Home** — Stats + recent activity
6. **Browse Items** — Grid, filters (Groceries, Clothes, Books, Essentials), search, sort (Newest, Nearest, Popular)
7. **Post Item** — Form (title, category, description, condition, image upload UI, location) + validation + success toast
8. **Item Details** — Full item view + “Request item”
9. **My Listings** — User’s posted items
10. **My Requests** — Requested items (pending/accepted/declined)
11. **Profile Settings** — Name, email, default location
12. **404** — Not found page

## UI Notes

- Responsive (mobile + desktop)
- Sidebar collapses on mobile; top navbar has search, notifications, user dropdown
- Soft shadows, rounded-2xl, consistent spacing, hover and micro-animations
- Skeleton loading on dashboard and browse
- Toast on “Posted successfully!” and “Request sent!”

## Dummy Data

- **Locations:** Whitefield, HSR Layout, Koramangala, Indiranagar
- **Categories:** Groceries, Clothes, Books, Essentials
- See `src/data/items.js` and `src/data/requests.js`
