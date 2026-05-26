import { render, screen, within } from '@testing-library/react'
import BurnedAreaChart from '../BurnedAreaChart'

describe('BurnedAreaChart', () => {
  it('renders the section heading', () => {
    render(<BurnedAreaChart />)
    expect(screen.getByRole('heading', { name: /Burned Area/i })).toBeInTheDocument()
  })

  it('renders the dual-line chart container', () => {
    render(<BurnedAreaChart />)
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })

  it('renders the year range in the description', () => {
    render(<BurnedAreaChart />)
    expect(screen.getByText(/2001/)).toBeInTheDocument()
    expect(screen.getByText(/2024/)).toBeInTheDocument()
  })

  it('renders the hotspot legend label', () => {
    const { container } = render(<BurnedAreaChart />)
    const legendDiv = container.querySelector<HTMLElement>('.flex.gap-6')
    expect(within(legendDiv!).getByText(/Fire Hotspots/i)).toBeInTheDocument()
  })

  it('renders the burned area legend label', () => {
    const { container } = render(<BurnedAreaChart />)
    const legendDiv = container.querySelector<HTMLElement>('.flex.gap-6')
    expect(within(legendDiv!).getByText(/Burned Areas/i)).toBeInTheDocument()
  })
})
