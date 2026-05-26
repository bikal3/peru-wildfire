# Peru Fire Dashboard — Analysis Extensions Design Spec

**Date:** 2026-05-26
**Extends:** `2026-05-26-peru-fire-dashboard-design.md`
**Type:** Feature additions to existing Next.js dashboard

---

## Overview

Four new analysis sections added to the existing single-page dashboard, plus a year filter wired into the map and regional table. All data is served statically — pre-computed stats are baked into `constants.ts` at build time; one new GeoJSON file (burned areas) is added to `public/data/`.

---

## Features

### 1. Fire by Land Governance Type (new section)

A Recharts PieChart showing how fires are distributed across land governance categories, using spatial join columns already present in `fire_hotspots.geojson`.

**Category assignment logic (priority order — each point assigned to exactly one):**
1. National Protected Area (`natural_ca` non-empty)
2. Regional Conservation (`region_ca` non-empty)
3. Private Conservation (`private_ca` non-empty)
4. Unprotected Forest (all others)

Note: Indigenous territory columns (`nativa_tit`, `nativa_sol`, `campesina_`) were empty in the dataset — no fires overlapped those boundaries in the spatial join.

**Real values (all years):**
| Category | Count | % |
|---|---|---|
| Unprotected Forest | 31,925 | 98.6% |
| National Protected Area | 329 | 1.0% |
| Regional Conservation | 105 | 0.3% |
| Private Conservation | 5 | 0.0% |

**Colors:** Unprotected `#6c757d`, National PA `#2d6a4f`, Regional `#457b9d`, Private `#f4a261`

**Component:** `LandGovernanceChart.tsx` — Recharts `PieChart` with `Tooltip` showing count + %. A two-sentence finding callout sits beside the chart: "98.6% of detected fires burned in unprotected forest. 329 hotspots (1.0%) fell within national protected areas."

---

### 2. Active Fire Hotspots vs Burned Area (new section)

A Recharts `LineChart` with two lines over the 2001–2024 overlap period, using pre-computed annual totals. Left Y-axis: hotspot count (red). Right Y-axis: burned area polygon count (green). Both use their own `YAxis` with `yAxisId`.

**Real annual values (2001–2024):**

| Year | Hotspots | Burned Areas |
|---|---|---|
| 2001 | 28 | 320 |
| 2002 | 660 | 942 |
| 2003 | 1264 | 2881 |
| 2004 | 915 | 1452 |
| 2005 | 2137 | 6759 |
| 2006 | 1053 | 1991 |
| 2007 | 1950 | 3061 |
| 2008 | 1351 | 1561 |
| 2009 | 1033 | 1541 |
| 2010 | 1741 | 5129 |
| 2011 | 1058 | 1096 |
| 2012 | 1940 | 3064 |
| 2013 | 1164 | 1908 |
| 2014 | 853 | 1715 |
| 2015 | 1450 | 2032 |
| 2016 | 1479 | 4037 |
| 2017 | 928 | 1532 |
| 2018 | 1299 | 1945 |
| 2019 | 1721 | 3010 |
| 2020 | 1533 | 3972 |
| 2021 | 1313 | 1694 |
| 2022 | 1718 | 4975 |
| 2023 | 1502 | 2439 |
| 2024 | 2227 | 6198 |

**Component:** `BurnedAreaChart.tsx` — `ResponsiveContainer` → `LineChart`. Data from `ANNUAL_STATS` in `constants.ts`. No loading state needed (data is static).

---

### 3. Regional Fire Ranking Table (new section)

Sortable table showing top 20 districts by fire count. Updates when the year filter changes (shared `selectedYear` state from `page.tsx`).

**Columns:** Rank · District name · Hotspot count · % of total · Visual progress bar

**Data:** Pre-computed per-year lookup `REGIONAL_STATS` in `constants.ts`:
```typescript
Record<'all' | string, { region: string; count: number }[]>
// keys: 'all', '2000', '2001', ..., '2024'
// each value: top 20 districts sorted desc by count
```

**All-years top 5:** Puerto Inca 4,390 · Padre Abad 3,857 · Coronel Portillo 3,461 · Tambopata 2,399 · Bellavista 1,988

**2024 top 5:** Coronel Portillo 485 · Tahuamanu 303 · Padre Abad 273 · Puerto Inca 188 · Ucayali 117

**Component:** `RegionalTable.tsx` — accepts `year: number | null` prop. Looks up `REGIONAL_STATS[year ? String(year) : 'all']`. Each row has a progress bar scaled to the top region's count.

---

### 4. Year Slider in FireMap (modification)

A range input (2000–2024) and "All years" reset button added above the layer toggles in `FireMap.tsx`. Fires `onYearChange(year: number | null)` callback.

**Map filtering:** When a year is selected, the heatmap `Source` gets a MapLibre `filter` prop:
```js
filter={['==', ['slice', ['get', 'ACQ_DATE'], 0, 4], String(selectedYear)]}
```
When "All years" is selected, the filter prop is omitted (undefined).

**State location:** `selectedYear: number | null` lives in `app/page.tsx`. Passed as:
- `onYearChange` prop to `FireMap`
- `year` prop to `RegionalTable`

`LandGovernanceChart` and `BurnedAreaChart` are **not** filtered by year — they always show all-years data.

---

## Data Pipeline Changes

### Burned area data

The `BurnedAreaChart` uses pre-computed `ANNUAL_STATS` baked into `constants.ts`. No GeoJSON conversion needed — the annual counts are computed by the stats script and hardcoded. The `peru_burned_area.shp` file is read only during the build-time stats computation, not served to the browser.

### New constants in `lib/constants.ts`

```typescript
export const LAND_GOV_STATS = [
  { type: 'Unprotected Forest',       count: 31925, pct: 98.6, color: '#6c757d' },
  { type: 'National Protected Area',  count: 329,   pct: 1.0,  color: '#2d6a4f' },
  { type: 'Regional Conservation',    count: 105,   pct: 0.3,  color: '#457b9d' },
  { type: 'Private Conservation',     count: 5,     pct: 0.0,  color: '#f4a261' },
]

export const ANNUAL_STATS: { year: number; hotspots: number; burnedArea: number }[] = [
  // 2001–2024, values from table above
]

export const REGIONAL_STATS: Record<string, { region: string; count: number }[]> = {
  all: [...],
  '2000': [...],
  // ...through '2024'
}

export const YEAR_RANGE = { min: 2000, max: 2024 }
```

---

## File Structure Changes

```
peru-fire-dashboard/
├── components/
│   ├── LandGovernanceChart.tsx    ← new
│   ├── BurnedAreaChart.tsx        ← new
│   ├── RegionalTable.tsx          ← new
│   ├── FireMap.tsx                ← modified (year slider + onYearChange)
│   └── __tests__/
│       ├── LandGovernanceChart.test.tsx  ← new
│       ├── BurnedAreaChart.test.tsx      ← new
│       └── RegionalTable.test.tsx        ← new
├── app/
│   └── page.tsx                   ← modified (selectedYear state, new sections)
├── lib/
│   └── constants.ts               ← modified (3 new exports + YEAR_RANGE)
└── public/
    └── data/
        └── burned_areas.geojson   ← new
```

---

## Revised Page Order

1. Hero
2. StatsBar
3. FireMap *(year slider added)*
4. **LandGovernanceChart** *(new)*
5. ChartGrid *(unchanged)*
6. **BurnedAreaChart** *(new)*
7. **RegionalTable** *(new, year-filtered)*
8. Methodology
9. Footer

---

## Dependencies

- `recharts` must be re-added: `npm install recharts` (was removed in prior cleanup)

---

## Out of Scope

- Rendering burned area polygons on the interactive map
- Filtering `LandGovernanceChart` or `BurnedAreaChart` by year
- Sorting the regional table by column headers (rank by count only)
- Indigenous territory breakdown (columns are empty in dataset)
