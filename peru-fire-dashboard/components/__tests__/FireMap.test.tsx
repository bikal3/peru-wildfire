import { render, screen, fireEvent } from '@testing-library/react'
import FireMap from '../FireMap'

// react-map-gl/maplibre and maplibre-gl are mocked in __mocks__/

describe('FireMap', () => {
  it('renders the map container', () => {
    render(<FireMap />)
    expect(screen.getByTestId('map-container')).toBeInTheDocument()
  })

  it('renders a toggle button for each layer', () => {
    render(<FireMap />)
    expect(screen.getByRole('button', { name: /Fire Hotspots/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Protected Areas/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Indigenous/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Country Boundary/i })).toBeInTheDocument()
  })

  it('toggles a layer off when its button is clicked', () => {
    render(<FireMap />)
    const btn = screen.getByRole('button', { name: /Fire Hotspots/i })
    expect(btn).toHaveClass('opacity-100')
    fireEvent.click(btn)
    expect(btn).toHaveClass('opacity-40')
  })

  it('toggles a layer back on when clicked again', () => {
    render(<FireMap />)
    const btn = screen.getByRole('button', { name: /Fire Hotspots/i })
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(btn).toHaveClass('opacity-100')
  })
})
