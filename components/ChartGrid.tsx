'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const CHARTS = [
  {
    title: 'Annual Fire Trend',
    caption: 'Total hotspots per year · NASA FIRMS',
    src: `${BASE}/charts/annual_fire_trend.png`,
    alt: 'Bar chart showing annual fire hotspot counts for Peru',
  },
  {
    title: 'Year × Month Heatmap',
    caption: 'Fire intensity by year and month · 2000–2024',
    src: `${BASE}/charts/fire_year_month_heatmap.png`,
    alt: 'Heatmap showing fire hotspot counts by year and month',
  },
  {
    title: 'Seasonal Decomposition',
    caption: 'STL trend · seasonal · residual components',
    src: `${BASE}/charts/monthly_fire_decomposition.png`,
    alt: 'STL decomposition plot of monthly fire time series',
  },
]

type Chart = typeof CHARTS[number]

function Lightbox({ chart, onClose }: { chart: Chart; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[70vh]">
          <Image
            src={chart.src}
            alt={chart.alt}
            fill
            className="object-contain p-4"
            unoptimized
          />
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{chart.title}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{chart.caption}</p>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded px-3 py-1"
          >
            Close ✕
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ChartGrid() {
  const [active, setActive] = useState<Chart | null>(null)

  return (
    <section className="px-8 py-10 bg-gray-50 border-t border-green-100">
      <h2 className="text-xl font-semibold text-green-900 mb-6">Temporal Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CHARTS.map((chart) => (
          <div
            key={chart.title}
            className="bg-white rounded-lg border border-green-100 overflow-hidden shadow-sm cursor-zoom-in hover:shadow-md transition-shadow"
            onClick={() => setActive(chart)}
          >
            <div className="relative w-full h-48">
              <Image
                src={chart.src}
                alt={chart.alt}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>
            <div className="px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-800">{chart.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{chart.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {active && <Lightbox chart={active} onClose={() => setActive(null)} />}
    </section>
  )
}
