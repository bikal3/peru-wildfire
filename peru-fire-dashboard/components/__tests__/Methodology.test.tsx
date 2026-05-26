import { render, screen } from '@testing-library/react'
import Methodology from '../Methodology'

it('lists FIRMS as a data source', () => {
  render(<Methodology />)
  expect(screen.getByText(/FIRMS/i)).toBeInTheDocument()
})

it('lists Python in the pipeline', () => {
  render(<Methodology />)
  expect(screen.getByText(/Python/i)).toBeInTheDocument()
})
