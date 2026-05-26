import React from 'react'

export const ResponsiveContainer = ({ children }: { children?: React.ReactNode }) => (
  <div>{children}</div>
)
export const PieChart = ({ children }: { children?: React.ReactNode }) => (
  <div data-testid="pie-chart">{children}</div>
)
export const Pie = () => null
export const Cell = () => null
export const Tooltip = () => null
export const Legend = () => null
export const LineChart = ({ children }: { children?: React.ReactNode }) => (
  <div data-testid="line-chart">{children}</div>
)
export const Line = () => null
export const XAxis = () => null
export const YAxis = () => null
export const CartesianGrid = () => null
export const BarChart = ({ children }: { children?: React.ReactNode }) => (
  <div data-testid="bar-chart">{children}</div>
)
export const Bar = () => null
