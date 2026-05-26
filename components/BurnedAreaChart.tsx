'use client'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { ANNUAL_STATS } from '@/lib/constants'

export default function BurnedAreaChart() {
  return (
    <section className="px-8 py-10 bg-white border-t border-green-100">
      <h2 className="text-xl font-semibold text-green-900 mb-2">
        Active Fire Hotspots vs Burned Area
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Annual comparison 2001–2024 · Left axis: Fire Hotspots count ·
        Right axis: Burned Areas polygon count
      </p>
      <div className="flex gap-6 mb-4 text-sm text-gray-600">
        <span className="flex items-center gap-2">
          <span className="inline-block w-6 border-t-2 border-red-500" />
          Fire Hotspots
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-6 border-t-2 border-green-700" />
          Burned Areas
        </span>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ANNUAL_STATS}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="hotspots"
              stroke="#e63946"
              name="Fire Hotspots"
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="burnedArea"
              stroke="#2d6a4f"
              name="Burned Areas"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
