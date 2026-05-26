import { render, screen } from '@testing-library/react'
import MonthlySeasonalityChart from '../MonthlySeasonalityChart'

jest.mock('@/lib/constants', () => ({
  MONTHLY_STATS: [
    { month: 'Jan', hotspots: 636 },
    { month: 'Aug', hotspots: 8949 },
    { month: 'Sep', hotspots: 15892 },
  ],
}))

describe('MonthlySeasonalityChart', () => {
  it('renders the bar chart container', () => {
    render(<MonthlySeasonalityChart />)
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('renders the seasonality heading', () => {
    render(<MonthlySeasonalityChart />)
    expect(screen.getByText(/Fire seasonality/i)).toBeInTheDocument()
  })

  it('renders the peak month description', () => {
    render(<MonthlySeasonalityChart />)
    expect(screen.getByText(/August–September/i)).toBeInTheDocument()
  })

  it('renders the year range in the description', () => {
    render(<MonthlySeasonalityChart />)
    expect(screen.getByText(/2000–2024/)).toBeInTheDocument()
  })
})
