import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import AppLogo, { SmallAppLogo } from '@/components/AppLogo'

// Helper function to render components with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('AppLogo Component', () => {
  it('renders app logo with correct name', () => {
    renderWithRouter(<AppLogo />)
    
    // Check if the app name is displayed
    expect(screen.getByText('MonoMERN')).toBeInTheDocument()
  })

  it('renders as a link to home page', () => {
    renderWithRouter(<AppLogo />)
    
    // Check if it's a link to "/" - get the first link
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/')
  })

  it('has proper styling classes', () => {
    renderWithRouter(<AppLogo />)
    
    const links = screen.getAllByRole('link')
    const logoContainer = links[0].firstChild
    expect(logoContainer).toHaveClass('flex', 'items-center', 'gap-3')
  })
})

describe('SmallAppLogo Component', () => {
  it('renders small logo without text', () => {
    renderWithRouter(<SmallAppLogo />)
    
    // Should not contain the app name text (check that none of the links contain text)
    const links = screen.getAllByRole('link')
    const hasTextLink = links.some(link => link.textContent?.includes('MonoMERN'))
    expect(hasTextLink).toBe(false)
    
    // Should still be a link
    expect(links[0]).toHaveAttribute('href', '/')
  })

  it('has smaller dimensions', () => {
    renderWithRouter(<SmallAppLogo />)
    
    const links = screen.getAllByRole('link')
    const iconContainer = links[0].firstChild
    expect(iconContainer).toHaveClass('w-10', 'h-10')
  })
})