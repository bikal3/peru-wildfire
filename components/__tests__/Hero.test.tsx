import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders the project title', () => {
    render(<Hero />)
    expect(screen.getByText(/Wildfire Hotspot Analysis in Peru/i)).toBeInTheDocument()
  })

  it('renders all skill tags', () => {
    render(<Hero />)
    expect(screen.getByText(/GIS.*QGIS.*ArcGIS/i)).toBeInTheDocument()
    expect(screen.getByText(/MODIS.*FIRMS/i)).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument()
  })
})
