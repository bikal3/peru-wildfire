import { render, screen } from '@testing-library/react'
import LandGovernanceChart from '../LandGovernanceChart'

describe('LandGovernanceChart', () => {
  it('renders the section heading', () => {
    render(<LandGovernanceChart />)
    expect(screen.getByRole('heading', { name: /Land Governance/i })).toBeInTheDocument()
  })

  it('renders the 98.6% finding callout', () => {
    render(<LandGovernanceChart />)
    expect(screen.getByText(/98\.6% of detected fires/)).toBeInTheDocument()
  })

  it('renders the 329 hotspots callout', () => {
    render(<LandGovernanceChart />)
    expect(screen.getByText(/329 hotspots/i)).toBeInTheDocument()
  })

  it('renders all four governance category labels', () => {
    render(<LandGovernanceChart />)
    expect(screen.getByText('Unprotected Forest')).toBeInTheDocument()
    expect(screen.getByText('National Protected Area')).toBeInTheDocument()
    expect(screen.getByText('Regional Conservation')).toBeInTheDocument()
    expect(screen.getByText('Private Conservation')).toBeInTheDocument()
  })
})
