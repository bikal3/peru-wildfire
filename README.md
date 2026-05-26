# Peru Wildfire Dashboard

An interactive web dashboard visualising 24 years of fire hotspot and burned area data across Peru (2000–2024), built with Next.js, MapLibre GL, and Recharts.

**Live site:** [bikal3.github.io/peru-wildfire](https://bikal3.github.io/peru-wildfire/)

---

## Features

- **Interactive fire map** — heatmap of 32,000+ NASA FIRMS hotspots with layer toggles (protected areas, indigenous territories, country boundary) and a year filter slider
- **Temporal analysis** — annual trend chart, monthly seasonality bar chart, and STL decomposition
- **Land governance breakdown** — distribution of fire hotspots across protected vs. unprotected land
- **Monthly fire seasonality** — highlights the August–September dry-season peak
- **Active fire hotspots vs. burned area** — dual-axis line chart comparing FIRMS and MODIS MCD64A1 (2001–2024)
- **Regional fire ranking** — top-20 districts by hotspot count, filterable by year

---

## Data Sources

| Dataset | Description | Provider |
|---------|-------------|----------|
| NASA FIRMS | Active fire hotspots (MODIS + VIIRS, 375 m–1 km) | NASA |
| MODIS MCD64A1 | Monthly burned area polygons, Collection 6.1 | NASA / UMD |
| Protected Areas | National protected area boundaries | SERNANP |
| Indigenous Territories | Native community land boundaries | MINAM |
| Country Boundary | Peru administrative boundary | SERNANP / MINAM |

---

## Project Structure

```
peru-wildfire/
├── app/                        # Next.js App Router (layout, page, globals)
├── components/                 # React components
│   ├── FireMap.tsx             # MapLibre GL interactive map
│   ├── ChartGrid.tsx           # Static analysis chart grid
│   ├── BurnedAreaChart.tsx     # Recharts dual-axis line chart
│   ├── LandGovernanceChart.tsx # Land governance stat card + seasonality
│   ├── MonthlySeasonalityChart.tsx # Monthly bar chart
│   ├── RegionalTable.tsx       # Top-20 districts table
│   ├── Hero.tsx / StatsBar.tsx / Methodology.tsx / Footer.tsx
│   └── __tests__/              # Jest + Testing Library tests
├── lib/
│   └── constants.ts            # Data URLs, map config, chart data
├── public/
│   ├── data/                   # GeoJSON files served to the map
│   └── charts/                 # Static analysis chart images
├── analysis/
│   ├── notebooks/
│   │   ├── 01_data_preparation.ipynb   # MODIS download + clip pipeline
│   │   └── 02_fire_analysis.ipynb      # EDA, temporal trends, DBSCAN clustering
│   ├── scripts/
│   │   └── convert_to_geojson.py       # Shapefile → GeoJSON conversion
│   └── outputs/                        # Generated charts and CSVs
└── .github/workflows/deploy.yml        # GitHub Actions → GitHub Pages
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
git clone https://github.com/bikal3/peru-wildfire.git
cd peru-wildfire
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Run tests

```bash
npx jest
```

### Production build

```bash
npm run build
```

---

## Analysis Notebooks

The `analysis/notebooks/` folder contains two Python notebooks (GeoPandas, scikit-learn, Matplotlib):

| Notebook | Purpose |
|----------|---------|
| `01_data_preparation.ipynb` | Downloads MODIS MCD64A1 burned area archives via SFTP, extracts and merges tiles, clips to Peru boundary, exports yearly shapefiles |
| `02_fire_analysis.ipynb` | Loads NASA FIRMS hotspot data, produces temporal trend charts, monthly seasonality heatmaps, and DBSCAN spatiotemporal fire cluster analysis |

Install Python dependencies:

```bash
conda env create -f docs/gis-project/Peru/environment.yml
conda activate <env-name>
```

---

## Deployment

The site deploys automatically to GitHub Pages on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

To set up GitHub Pages for the first time:

1. Go to **Settings → Pages** in the repository
2. Set **Source** to `Deploy from a branch`
3. Set **Branch** to `gh-pages` / `/ (root)`
4. Save — the next push to `main` will publish the site

---

## Tech Stack

- [Next.js 14](https://nextjs.org) — App Router, static export
- [MapLibre GL JS](https://maplibre.org) via [react-map-gl](https://visgl.github.io/react-map-gl/)
- [Recharts](https://recharts.org) — line and bar charts
- [Tailwind CSS](https://tailwindcss.com)
- [Jest](https://jestjs.io) + [Testing Library](https://testing-library.com)
- Python — GeoPandas, scikit-learn, Matplotlib, DBSCAN

---

## License

MIT
