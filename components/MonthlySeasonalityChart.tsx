'use client'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'
import { MONTHLY_STATS } from '@/lib/constants'

const PEAK_MONTHS = new Set(['Aug', 'Sep'])

export default function MonthlySeasonalityChart() {
  return (
    <div>
      <p className="text-sm font-semibold text-orange-700 mb-1">Fire seasonality</p>
      <p className="text-xs text-gray-500 mb-4">
        Hotspots by month · All years (2000–2024) · Peak: August–September
      </p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MONTHLY_STATS} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} width={45} />
            <Tooltip
              formatter={(value) => [Number(value).toLocaleString(), 'Hotspots']}
            />
            <Bar dataKey="hotspots" radius={[3, 3, 0, 0]}>
              {MONTHLY_STATS.map(({ month }) => (
                <Cell
                  key={month}
                  fill={PEAK_MONTHS.has(month) ? '#e63946' : '#94a3b8'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
