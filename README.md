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
VITE_API_BASE_URL=https://api.nal.usda.gov/fdc/v1
VITE_API_KEY=DEMO_KEY
```

Main endpoints used by the app:

- Food search: `/foods/search`
- Food detail: `/food/{fdcId}`

## Run Locally

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` before running the app. The included `DEMO_KEY` is free for testing.
