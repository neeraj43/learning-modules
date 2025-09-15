import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/layout/Header'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()
  })

  it('renders the logo and title', () => {
    render(<Header />)
    
    expect(screen.getByText('Learning Modules')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /learning modules/i })).toHaveAttribute('href', '/')
  })

  it('renders all main navigation categories', () => {
    render(<Header />)
    
    // Check for main category labels
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('Databases')).toBeInTheDocument()
    expect(screen.getByText('DevOps')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
  })

  it('shows mobile menu button on small screens', () => {
    render(<Header />)
    
    const mobileButton = screen.getByRole('button')
    expect(mobileButton).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const mobileButton = screen.getByRole('button')
    
    // Initially mobile menu should not be visible
    expect(screen.queryByRole('navigation')).not.toBeVisible()
    
    // Click to open mobile menu
    await user.click(mobileButton)
    
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeVisible()
    })
  })

  it('renders dropdown items for JavaScript category', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const javascriptButton = screen.getByText('JavaScript')
    
    // Hover over JavaScript to show dropdown
    await user.hover(javascriptButton)
    
    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument()
      expect(screen.getByText('Interactive Examples')).toBeInTheDocument()
    })
  })

  it('renders dropdown items for React category', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const reactButton = screen.getByText('React')
    
    // Hover over React to show dropdown
    await user.hover(reactButton)
    
    await waitFor(() => {
      expect(screen.getByText('React Concepts')).toBeInTheDocument()
      expect(screen.getByText('Advanced React')).toBeInTheDocument()
      expect(screen.getByText('Design Patterns')).toBeInTheDocument()
      expect(screen.getByText('State Management')).toBeInTheDocument()
      expect(screen.getByText('Forms & Validation')).toBeInTheDocument()
    })
  })

  it('applies active styles to current page link', () => {
    // Mock the pathname to be /javascript
    const mockUsePathname = jest.requireMock('next/navigation').usePathname
    mockUsePathname.mockReturnValue('/javascript')
    
    render(<Header />)
    
    // Check if any element with JavaScript link has active styling
    const jsLink = screen.getByRole('link', { name: /javascript fundamentals/i })
    expect(jsLink).toHaveClass('text-blue-600')
  })

  it('has proper accessibility attributes', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    
    const logoLink = screen.getByRole('link', { name: /learning modules/i })
    expect(logoLink).toBeInTheDocument()
  })

  it('contains all expected navigation links', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    // Check JavaScript links
    await user.hover(screen.getByText('JavaScript'))
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /javascript fundamentals/i })).toHaveAttribute('href', '/javascript')
      expect(screen.getByRole('link', { name: /interactive examples/i })).toHaveAttribute('href', '/examples')
    })
  })

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const mobileButton = screen.getByRole('button')
    
    // Open mobile menu
    await user.click(mobileButton)
    
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeVisible()
    })
    
    // Click on a navigation item in mobile menu
    const homeLink = screen.getByRole('link', { name: /learning modules/i })
    await user.click(homeLink)
    
    // Mobile menu should close (navigation should not be visible)
    await waitFor(() => {
      expect(screen.queryByRole('navigation')).not.toBeVisible()
    })
  })
})
