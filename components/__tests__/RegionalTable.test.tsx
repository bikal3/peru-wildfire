import { render, screen } from '@testing-library/react'
import RegionalTable from '../RegionalTable'

jest.mock('@/lib/constants', () => ({
  REGIONAL_STATS: {
    'all': [
      { region: 'Puerto Inca', count: 4390 },
      { region: 'Padre Abad', count: 3857 },
    ],
    '2024': [
      { region: 'Coronel Portillo', count: 485 },
      { region: 'Tahuamanu', count: 303 },
    ],
  },
}))

describe('RegionalTable', () => {
  it('renders the section heading', () => {
    render(<RegionalTable year={null} />)
    expect(screen.getByRole('heading', { name: /Regional Fire Ranking/i })).toBeInTheDocument()
  })

  it('shows top all-years district (Puerto Inca) when year is null', () => {
    render(<RegionalTable year={null} />)
    expect(screen.getByText('Puerto Inca')).toBeInTheDocument()
  })

  it('shows top 2024 district (Coronel Portillo) when year is 2024', () => {
    render(<RegionalTable year={2024} />)
    expect(screen.getByText('Coronel Portillo')).toBeInTheDocument()
  })

  it('does not show all-years data when a year is selected', () => {
    render(<RegionalTable year={2024} />)
    expect(screen.queryByText('Puerto Inca')).not.toBeInTheDocument()
  })

  it('renders rank numbers starting at #1', () => {
    render(<RegionalTable year={null} />)
    expect(screen.getByText('#1')).toBeInTheDocument()
    expect(screen.getByText('#2')).toBeInTheDocument()
  })

  it('shows "All years" label when year is null', () => {
    render(<RegionalTable year={null} />)
    expect(screen.getByText(/All years/i)).toBeInTheDocument()
  })

  it('shows selected year label when year is provided', () => {
    render(<RegionalTable year={2024} />)
    expect(screen.getByText(/Year: 2024/i)).toBeInTheDocument()
  })
})
