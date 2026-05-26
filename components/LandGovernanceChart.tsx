import { LAND_GOV_STATS } from '@/lib/constants'
import MonthlySeasonalityChart from './MonthlySeasonalityChart'

export default function LandGovernanceChart() {
  return (
    <section className="px-8 py-10 bg-amber-50 border-t border-amber-100">
      <h2 className="text-xl font-semibold text-green-900 mb-2">
        Fire by Land Governance Type
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Distribution of fire hotspots across land governance categories · All years (2000–2024)
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-amber-200">
          <p className="text-sm font-semibold text-orange-700 mb-3">Key finding</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            98.6% of detected fires burned in unprotected forest. 329 hotspots (1.0%) fell
            within national protected areas.
          </p>
          <ul className="mt-4 space-y-2">
            {LAND_GOV_STATS.map(({ type, count, pct, color }) => (
              <li key={type} className="flex items-center gap-2 text-sm text-gray-600">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span>{type}</span>
                <span className="ml-auto text-gray-400">
                  {count.toLocaleString()} · {pct}%
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg p-6 border border-amber-200">
          <MonthlySeasonalityChart />
        </div>
      </div>
    </section>
  )
}
