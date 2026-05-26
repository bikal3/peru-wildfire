import { render, screen } from '@testing-library/react'
import ChartGrid from '../ChartGrid'

describe('ChartGrid', () => {
  it('renders the temporal analysis heading', () => {
    render(<ChartGrid />)
    expect(screen.getByText(/Temporal Analysis/i)).toBeInTheDocument()
  })

  it('renders all three chart panel titles', () => {
    render(<ChartGrid />)
    expect(screen.getByText(/Annual Fire Trend/i)).toBeInTheDocument()
    expect(screen.getByText(/Monthly Distribution/i)).toBeInTheDocument()
    expect(screen.getByText(/Seasonal Decomposition/i)).toBeInTheDocument()
  })

  it('renders three chart images', () => {
    render(<ChartGrid />)
    const imgs = screen.getAllByRole('img')
    expect(imgs.length).toBe(3)
  })
})
