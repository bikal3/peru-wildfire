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

  it('renders the year range slider', () => {
    render(<FireMap />)
    expect(screen.getByRole('slider', { name: /Select year/i })).toBeInTheDocument()
  })

  it('renders the All years button', () => {
    render(<FireMap />)
    expect(screen.getByRole('button', { name: /All years/i })).toBeInTheDocument()
  })

  it('calls onYearChange with a number when slider changes', () => {
    const onYearChange = jest.fn()
    render(<FireMap onYearChange={onYearChange} />)
    const slider = screen.getByRole('slider', { name: /Select year/i })
    fireEvent.change(slider, { target: { value: '2022' } })
    expect(onYearChange).toHaveBeenCalledWith(2022)
  })

  it('calls onYearChange with null when All years is clicked', () => {
    const onYearChange = jest.fn()
    render(<FireMap onYearChange={onYearChange} />)
    const slider = screen.getByRole('slider', { name: /Select year/i })
    fireEvent.change(slider, { target: { value: '2020' } })
    fireEvent.click(screen.getByRole('button', { name: /All years/i }))
    expect(onYearChange).toHaveBeenLastCalledWith(null)
  })
})
