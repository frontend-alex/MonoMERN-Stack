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
    
    // Check if it's a link to "/"
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })

  it('has proper styling classes', () => {
    renderWithRouter(<AppLogo />)
    
    const logoContainer = screen.getByRole('link').firstChild
    expect(logoContainer).toHaveClass('flex', 'items-center', 'gap-3')
  })
})

describe('SmallAppLogo Component', () => {
  it('renders small logo without text', () => {
    renderWithRouter(<SmallAppLogo />)
    
    // Should not contain the app name text
    expect(screen.queryByText('MonoMERN')).not.toBeInTheDocument()
    
    // Should still be a link
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })

  it('has smaller dimensions', () => {
    renderWithRouter(<SmallAppLogo />)
    
    const iconContainer = screen.getByRole('link').firstChild
    expect(iconContainer).toHaveClass('w-10', 'h-10')
  })
})
