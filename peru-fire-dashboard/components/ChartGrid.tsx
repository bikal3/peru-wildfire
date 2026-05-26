import Image from 'next/image'

const CHARTS = [
  {
    title: 'Annual Fire Trend',
    caption: 'Total hotspots per year · NASA FIRMS',
    src: '/charts/annual_fire_trend.png',
    alt: 'Bar chart showing annual fire hotspot counts for Peru',
  },
  {
    title: 'Monthly Distribution',
    caption: 'Jan–Dec distribution · peak: August–September',
    src: '/charts/fire_incidents_by_month.png',
    alt: 'Bar chart of fire hotspots by month showing Aug–Sep peak',
  },
  {
    title: 'Seasonal Decomposition',
    caption: 'STL trend · seasonal · residual components',
    src: '/charts/monthly_fire_decomposition.png',
    alt: 'STL decomposition plot of monthly fire time series',
  },
]

export default function ChartGrid() {
  return (
    <section className="px-8 py-10 bg-gray-50 border-t border-green-100">
      <h2 className="text-xl font-semibold text-green-900 mb-6">Temporal Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CHARTS.map((chart) => (
          <div key={chart.title} className="bg-white rounded-lg border border-green-100 overflow-hidden shadow-sm">
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
    </section>
  )
}
