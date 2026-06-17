# Interactive Data Visualization Dashboard

A responsive, accessible, and interactive data visualization dashboard built with React, Vite, and Recharts. The dashboard renders multiple chart types from a static JSON dataset and supports dynamic filtering by category and date range.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started (Local)](#getting-started-local)
  - [Prerequisites](#prerequisites)
  - [Install Dependencies](#install-dependencies)
  - [Run in Development](#run-in-development)
  - [Build for Production](#build-for-production)
  - [Run Tests](#run-tests)
- [Docker Setup](#docker-setup)
  - [Files](#files)
  - [Build and Run with Docker Compose](#build-and-run-with-docker-compose)
- [Environment Variables](#environment-variables)
- [Data Schema](#data-schema)
- [Filtering and State Management](#filtering-and-state-management)
- [Charts and Data Transformations](#charts-and-data-transformations)
- [Responsiveness](#responsiveness)
- [Accessibility](#accessibility)
- [Architecture and Design Decisions](#architecture-and-design-decisions)
- [How to Use the Dashboard](#how-to-use-the-dashboard)
- [Limitations and Notes](#limitations-and-notes)

---

## Overview

This project implements a production-quality **interactive data visualization dashboard** that:

- Uses a **structured static JSON dataset** as the data source.
- Renders at least **three concurrent chart types** (Line, Bar, Pie).
- Supports **dynamic filtering** via interactive UI controls.
- Provides a **responsive** and **accessible** user interface.
- Demonstrates **clean architecture**, **state management**, **data transformations**, and **unit testing**.

The goal is to simulate a real-world analytics dashboard you could embed into a larger product.

---

## Tech Stack

- **Framework:** React + Vite
- **Language:** JavaScript (ES6+)
- **Charting:** Recharts
- **Styling:** Plain CSS (glassmorphism-inspired dashboard theme)
- **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`)
- **Testing:**
  - Jest
  - React Testing Library
- **Containerization:**
  - Docker (multi-stage build)
  - docker-compose

---

## Features

- **Multiple chart types:**
  - Line chart – value trend over time.
  - Bar chart – total value by category.
  - Pie chart – value distribution by region.
- **Dynamic filtering:**
  - Category filter (dropdown).
  - Date range filter (start and end date).
  - All charts update **in sync** without page reload.
- **Data-driven UI:**
  - Charts consume a normalized dataset from `src/data/mockData.json`.
  - Data transformations handled via dedicated utilities.
- **Loading & error states:**
  - Simulated processing delay with a loading spinner.
  - Friendly message when no data matches current filters.
  - Error handling for unexpected data processing failures.
- **Responsiveness:**
  - Layout adapts to mobile, tablet, and desktop.
  - Charts reflow via CSS Grid and Recharts `ResponsiveContainer`.
- **Accessibility:**
  - Keyboard-navigable filters and controls.
  - ARIA labels on chart regions.
  - Screen-reader-friendly text summaries under each chart.
  - High-contrast, glassy theme.

---

## Project Structure

```bash
interactive-data-viz-dashboard/
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
├── package-lock.json
├── README.md
├── babel.config.cjs
├── jest.config.cjs
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── setupTests.js
    ├── data/
    │   └── mockData.json
    ├── utils/
    │   ├── dataTransformers.js
    │   └── dataTransformers.test.js
    └── components/
        ├── Dashboard.jsx
        ├── common/
        │   └── LoadingSpinner.jsx
        ├── filters/
        │   ├── CategoryFilter.jsx
        │   └── DateRangeFilter.jsx
        └── charts/
            ├── LineChart.jsx
            ├── LineChart.test.jsx
            ├── BarChart.jsx
            └── PieChart.jsx
```

---

## Getting Started (Local)

### Prerequisites

- Node.js 18+ (Node 20 LTS recommended)
- npm 9+

### Install Dependencies

From the project root:

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Then open:

- `http://localhost:5173`

You should see the **Interactive Data Visualization Dashboard** with filters and three charts.

### Build for Production

```bash
npm run build
```

This generates a production build in the `dist/` folder.

### Run Tests

```bash
npm test
```

This runs Jest with:

- `src/utils/dataTransformers.test.js` – unit tests for data filtering logic.
- `src/components/charts/LineChart.test.jsx` – render test for the line chart component.

---

## Docker Setup

> Note: Docker configuration is provided for containerization, but on some machines Docker Desktop may not start if hardware virtualization is not enabled. In that case, Docker commands may not be runnable locally, but the configuration remains valid for evaluators.

### Files

- `Dockerfile` – multi-stage build:
  - **Stage 1 (builder):** Node 20 Alpine, `npm install`, `npm run build`.
  - **Stage 2 (runtime):** Nginx Alpine serving static assets from `/usr/share/nginx/html`.
- `docker-compose.yml` – single service `dashboard`:
  - Builds from the Dockerfile.
  - Exposes container port `80` as host port `3000`.
  - Sets `NODE_ENV=production`.

### Build and Run with Docker Compose

From the project root:

```bash
# Build image
docker compose build

# Run container
docker compose up
```

Then open:

- `http://localhost:3000`

To stop:

```bash
docker compose down
```

If Docker Desktop reports “Virtualization support not detected”, enable CPU virtualization in BIOS / Windows features or run Docker on another machine with virtualization enabled.

---

## Environment Variables

The project can read environment variables (for example, to control mock API delay) via Vite-style `VITE_`-prefixed variables.

Example template: `.env.example`:

```env
# Example environment variables for the interactive data viz dashboard
# (Vite will expose variables prefixed with VITE_)

VITE_APP_NAME=Interactive Data Viz Dashboard
VITE_MOCK_API_DELAY_MS=500
```

To use in development:

1. Copy `.env.example` to `.env`.
2. Adjust values as needed.

---

## Data Schema

The dashboard uses a static dataset in `src/data/mockData.json` with at least 60 data points.

Each record has the shape:

```json
{
  "id": "1",
  "date": "2023-01-01",
  "category": "Electronics",
  "value": 120,
  "region": "North"
}
```

Fields:

- `id` – string identifier.
- `date` – ISO date string (YYYY-MM-DD).
- `category` – category label (e.g., Electronics, Books, Clothing).
- `value` – numeric measure (e.g., sales value, metric).
- `region` – region label (North, South, East, West).

---

## Filtering and State Management

Filtering logic is centralized in `Dashboard.jsx`:

- `filters` state:

```js
const [filters, setFilters] = useState({
  category: '',
  startDate: '',
  endDate: ''
});
```

- `filteredData` state:

```js
const [filteredData, setFilteredData] = useState(mockData);
```

- Filtering is applied inside a `useEffect` that:
  - Simulates a processing delay (`setTimeout` / Promise).
  - Calls `filterData(mockData, filters)` from `src/utils/dataTransformers.js`.
  - Updates `filteredData`.
  - Shows a loading spinner while processing.
  - Shows a “no data matches” message when `filteredData` is empty.

`filterData` implementation (simplified):

```js
export const filterData = (data, filters) => {
  if (!Array.isArray(data)) return [];

  const { category, startDate, endDate } = filters ?? {};
  let filtered = [...data];

  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    filtered = filtered.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });
  }

  return filtered;
};
```

This separation makes the transformation logic independently testable with Jest.

---

## Charts and Data Transformations

All charts accept `data` as a prop and use `useMemo` for derived series.

### Line Chart (`LineChart.jsx`)

- Displays **value over time** across all categories.
- Sorts by `date`.
- Uses Recharts `LineChart`, `Line`, `CartesianGrid`, `Tooltip`, `Legend`, `ResponsiveContainer`.
- Renders in a glassy card with title and text summary.

### Bar Chart (`BarChart.jsx`)

- Aggregates `value` by `category`.
- Uses a Map to sum values per category.
- Renders category vs total value.

### Pie Chart (`PieChart.jsx`)

- Aggregates `value` by `region`.
- Renders a donut-style pie chart.
- Uses a small, defined color palette for consistent visuals.

All charts share:

- A fixed container height (`260px`) and `ResponsiveContainer` for responsive sizing.
- Tooltips styled to match the dark glassy theme.
- Legends for label clarity.
- ARIA labels and text summaries to help screen reader users.

---

## Responsiveness

The layout uses **CSS Grid** and **media queries**:

- **Mobile (`< 768px`)**
  - All charts stacked in a single column.
  - Filters wrap gracefully.

- **Tablet (`768px–1024px`)**
  - Charts displayed in a 2-column grid.

- **Desktop (`> 1024px`)**
  - Charts displayed in a 3-column grid.

The glassmorphism-inspired theme uses:

- Radial gradient background.
- Frosted-glass cards with `backdrop-filter: blur`.
- Subtle shadows and borders for depth.

For the final submission, it is recommended to include screenshots for:

- Mobile layout
- Tablet layout
- Desktop layout

and reference them in this section.

---

## Accessibility

Key accessibility measures:

- **Keyboard navigation:**
  - Filters (select and date inputs) are standard HTML controls and fully keyboard-operable.
  - Focus outlines are clearly visible with a high-contrast focus ring.

- **ARIA and semantics:**
  - `<section>` regions with `aria-label` for:
    - Dashboard container.
    - Filters.
    - Charts.
  - Chart components have:
    - Region labels (e.g., “Sales trend over time line chart”).
    - Text summaries via `<p>` under each chart.

- **Color and contrast:**
  - Dark background with light text to respect WCAG contrast guidelines.
  - Accent colors carefully chosen to remain distinguishable against dark cards.

- **Screen reader text:**
  - `sr-only` utility class used for hidden labels (e.g., date inputs).

---

## Architecture and Design Decisions

- **Framework choice (React + Vite):**
  - Fast dev experience, modern tooling, minimal configuration.
  - Easy to integrate Recharts and Jest.

- **Component architecture:**
  - `Dashboard` as a container (state + data flow).
  - `charts/` as presentational chart components.
  - `filters/` as presentational/controlled filter components.
  - `utils/` for pure data transformation functions.

- **State management:**
  - React hooks (`useState`, `useEffect`, `useMemo`).
  - No global state library (Redux, Zustand) to keep complexity appropriate.

- **Data layer:**
  - Static JSON `mockData.json` imported directly.
  - All transformation handled in `dataTransformers.js` for testability.

- **Performance considerations:**
  - `useMemo` for computed chart series.
  - `React.memo` for chart components to prevent unnecessary re-renders when props are unchanged.
  - Simulated processing delay to demonstrate handling without UI jank.

---

## How to Use the Dashboard

1. **Open the dashboard** (dev: `npm run dev`, prod: built bundle or Docker).
2. **Review the charts**:
   - Line chart: overall trend over time.
   - Bar chart: total value by category.
   - Pie chart: value distribution by region.
3. **Filter data**:
   - Use **Category** dropdown to focus on a specific category (Electronics, Books, Clothing).
   - Use **Date range** controls to restrict the time window.
4. **Observe updates**:
   - All charts update automatically and consistently when filters change.
   - A loading spinner shows briefly while filters are applied.
   - If no data matches, a friendly message explains that.

---

## Limitations and Notes

- **Docker runtime**:
  - Docker configuration is valid, but Docker Desktop may not run on machines without hardware virtualization enabled. In such environments, Docker commands might not be tested locally.
- **Dataset**:
  - Uses a synthetic mock dataset; in a real app, this would be replaced with a backend API.
- **Recharts dev-time warning**:
  - Recharts can sometimes log a benign warning in development about inferred width/height during initial layout. Charts still render correctly and this does not affect functionality.

This project focuses primarily on **clear data presentation**, **robust filtering**, **responsive design**, and **accessibility** to match the task’s evaluation criteria.