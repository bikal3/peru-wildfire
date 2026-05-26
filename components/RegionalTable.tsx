import { REGIONAL_STATS } from '@/lib/constants'

interface RegionalTableProps {
  year: number | null
}

export default function RegionalTable({ year }: RegionalTableProps) {
  const key = year !== null ? String(year) : 'all'
  const rows = REGIONAL_STATS[key] ?? []
  const maxCount = rows[0]?.count ?? 1
  const total = rows.reduce((s, r) => s + r.count, 0)

  return (
    <section className="px-8 py-10 bg-amber-50 border-t border-amber-100">
      <h2 className="text-xl font-semibold text-green-900 mb-2">Regional Fire Ranking</h2>
      <p className="text-sm text-gray-500 mb-4">
        Top 20 districts by hotspot count ·{' '}
        {year ? `Year: ${year}` : 'All years (2000–2024)'}
      </p>
      <div className="overflow-hidden rounded-lg border border-amber-200">
        <table className="w-full text-sm">
          <thead className="bg-amber-100 text-orange-800">
            <tr>
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">District</th>
              <th className="px-4 py-3 text-right">Hotspots</th>
              <th className="px-4 py-3 text-right">% of top 20</th>
              <th className="px-4 py-3 text-left w-32">Share</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ region, count }, i) => {
              const pct = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0'
              const barWidth = Math.round((count / maxCount) * 100)
              return (
                <tr key={region} className="border-t border-amber-100 hover:bg-amber-50">
                  <td className="px-4 py-2 text-gray-400">#{i + 1}</td>
                  <td className="px-4 py-2 font-medium text-gray-800">{region}</td>
                  <td className="px-4 py-2 text-right text-gray-700">
                    {count.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-500">{pct}%</td>
                  <td className="px-4 py-2">
                    <div
                      className="h-2 bg-red-500 rounded"
                      style={{ width: `${barWidth}%` }}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
