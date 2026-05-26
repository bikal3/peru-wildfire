import { render, screen } from '@testing-library/react'
import StatsBar from '../StatsBar'

describe('StatsBar', () => {
  it('renders all four stat values', () => {
    render(<StatsBar />)
    expect(screen.getByText('32,364')).toBeInTheDocument()
    expect(screen.getByText('1.0%')).toBeInTheDocument()
    expect(screen.getByText('September')).toBeInTheDocument()
    expect(screen.getByText('329')).toBeInTheDocument()
  })

  it('renders stat labels', () => {
    render(<StatsBar />)
    expect(screen.getByText(/Fire Hotspots/i)).toBeInTheDocument()
    expect(screen.getByText(/Protected Areas/i)).toBeInTheDocument()
  })
})
