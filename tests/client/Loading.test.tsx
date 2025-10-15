import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

import Loading from '@/components/Loading'

// Helper function to render components with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Loading Component', () => {
  it('renders loading component with logo', () => {
    renderWithRouter(<Loading />)
    
    // Check if the app name is displayed (more specific test)
    expect(screen.getByText('MonoMERN')).toBeInTheDocument()
  })

  it('renders as a link to home page', () => {
    renderWithRouter(<Loading />)
    
    // Check if it's a link to "/" - get the first link
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/')
  })
})
