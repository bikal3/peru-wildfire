import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

it('renders built-with note', () => {
  render(<Footer />)
  expect(screen.getByText(/Next\.js/i)).toBeInTheDocument()
})

it('renders GitHub link in footer', () => {
  render(<Footer />)
  expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
})
