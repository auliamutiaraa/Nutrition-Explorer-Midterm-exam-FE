# Nutrition Explorer

Nutrition Explorer is a React + Vite public API explorer for browsing food products and their nutrition details.

## Tech Stack

- React with Vite
- JavaScript
- Tailwind CSS
- React Router
- USDA FoodData Central public API

## Public API

This project uses the free USDA FoodData Central API:

```env
VITE_API_BASE_URL=https://api.nal.usda.gov
VITE_API_KEY=DEMO_KEY
```

Main endpoints used by the app:

- API root: `https://api.nal.usda.gov`
- Food search: `/fdc/v1/foods/search`
- Food detail: `/fdc/v1/food/{fdcId}`

## Run Locally

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` before running the app. The included `DEMO_KEY` is free for testing.
