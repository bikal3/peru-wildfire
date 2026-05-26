import { STATS } from '@/lib/constants'

export default function StatsBar() {
  return (
    <div className="flex flex-wrap gap-0 bg-gray-50 border-b border-green-100">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex-1 min-w-[140px] text-center py-4 px-6 border-r border-green-100 last:border-r-0"
        >
          <div className="text-2xl font-bold" style={{ color: stat.color }}>
            {stat.value}
          </div>
          <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
