# DoubleTick — Customers List

A small React app (Vite) that generates and displays a list of customers for demo purposes.

## Features
- Simulated customer dataset (configurable size).
- Search, page-scoped sorting, pagination.
- Responsive layout with mobile breakpoints.
- IndexedDB persistence (optional) to store customers locally.

## Project structure
Key files:
- `src/App.jsx` — main app and data loading logic
- `src/components/` — table, header, search, filters, pagination
- `src/utils/dataGenerator.js` — generates mock customer data
- `src/utils/indexedDb.js` — minimal IndexedDB helper (open/get/save/clear)
- `public/test_user.svg` — default avatar used for generated customers
- `src/styles/` — CSS including responsive rules

## Prerequisites
- Node.js 18+ recommended
- npm (bundled with Node.js)

## Install & Run (PowerShell)
```powershell
cd "c:\Users\kesha\OneDrive\Desktop\Doubletick"
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## Notes about data and IndexedDB
- On first run the app attempts to load customers from IndexedDB (`doubletick-db` / `customers`). If the DB is empty the app will generate a dataset and (depending on size) may persist it.
- By default the app now generates 1,000,000 customers when no persisted data exists. Persisting such a large set to IndexedDB is skipped by default to avoid blocking the browser. If you want to persist large datasets, consider chunked saves or server-side storage instead.
- Inspect IndexedDB in Chrome/Edge DevTools: `F12 → Application → IndexedDB → http://localhost:5173`.
- To reset stored customers from the browser: open DevTools → Application → IndexedDB → right-click `customers` object store → `Clear`.

## Developer tips
- For development, reduce the generated dataset in `src/App.jsx` to a smaller amount (e.g., 10_000) for faster load and lower memory usage.
- Add a UI action to clear/re-seed the DB if you need repeatable testing.
- To persist large datasets safely, implement chunked background writes. I can add a `seedInChunks(batchSize)` helper if you want.

## Troubleshooting
- If you see errors referencing `lucide-react`, remove the package or run `npm uninstall lucide-react` and reinstall dependencies.
- If the dev server fails, try removing `node_modules` and `package-lock.json` and running `npm install` again.

## Next improvements (optional)
- Virtualized list rendering (e.g., `react-window`) to handle large sets with less memory.
- Chunked IndexedDB seeding with progress UI.
- Mobile-friendly card layout for very small screens.

---
If you'd like, I can:
- Add a "Reset / Re-seed" button to `src/App.jsx` to clear and regenerate the DB.
- Implement chunked persistence for the 1M dataset.
- Add a small loading indicator while the app generates or loads data.
