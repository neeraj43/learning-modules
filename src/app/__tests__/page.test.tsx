import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '@/app/page'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.ComponentProps<'h1'>) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: React.ComponentProps<'p'>) => <p {...props}>{children}</p>,
  },
}))

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/Comprehensive Web Development Learning Platform/i)).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Home />)
    
    expect(screen.getByText(/Master modern web development/i)).toBeInTheDocument()
  })

  it('renders all feature cards', () => {
    render(<Home />)
    
    // Check for key feature cards
    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument()
    expect(screen.getByText('React Development')).toBeInTheDocument()
    expect(screen.getByText('Next.js Framework')).toBeInTheDocument()
    expect(screen.getByText('Advanced React')).toBeInTheDocument()
    expect(screen.getByText('Node.js Development')).toBeInTheDocument()
    expect(screen.getByText('MySQL Database')).toBeInTheDocument()
    expect(screen.getByText('Python Development')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL Advanced')).toBeInTheDocument()
    expect(screen.getByText('MongoDB NoSQL')).toBeInTheDocument()
    expect(screen.getByText('Docker & Containers')).toBeInTheDocument()
    expect(screen.getByText('AWS Cloud Services')).toBeInTheDocument()
    expect(screen.getByText('Testing & QA')).toBeInTheDocument()
  })

  it('renders feature descriptions', () => {
    render(<Home />)
    
    expect(screen.getByText(/ES6+, DOM manipulation, async programming/i)).toBeInTheDocument()
    expect(screen.getByText(/Hooks, components, state management/i)).toBeInTheDocument()
    expect(screen.getByText(/SSR, routing, API routes, deployment/i)).toBeInTheDocument()
  })

  it('has proper navigation links for each feature', () => {
    render(<Home />)
    
    // Check that feature cards are links
    expect(screen.getByRole('link', { name: /javascript fundamentals/i })).toHaveAttribute('href', '/javascript')
    expect(screen.getByRole('link', { name: /react development/i })).toHaveAttribute('href', '/react')
    expect(screen.getByRole('link', { name: /next\.js framework/i })).toHaveAttribute('href', '/nextjs')
    expect(screen.getByRole('link', { name: /advanced react/i })).toHaveAttribute('href', '/advanced-react')
    expect(screen.getByRole('link', { name: /node\.js development/i })).toHaveAttribute('href', '/nodejs')
    expect(screen.getByRole('link', { name: /mysql database/i })).toHaveAttribute('href', '/mysql')
  })

  it('renders icons for each feature card', () => {
    render(<Home />)
    
    // Check that icons are present (they should be rendered as svg elements)
    const svgElements = screen.getAllByRole('img', { hidden: true })
    expect(svgElements.length).toBeGreaterThan(0)
  })

  it('has responsive grid layout', () => {
    render(<Home />)
    
    // Check for grid classes
    const gridContainer = screen.getByRole('main').querySelector('.grid')
    expect(gridContainer).toHaveClass('grid')
    expect(gridContainer).toHaveClass('md:grid-cols-2')
    expect(gridContainer).toHaveClass('lg:grid-cols-3')
  })

  it('has proper heading hierarchy', () => {
    render(<Home />)
    
    // Check main heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    
    // Check feature card headings
    const featureHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(featureHeadings.length).toBeGreaterThan(10) // Should have multiple feature cards
  })

  it('has proper semantic structure', () => {
    render(<Home />)
    
    // Check for main content area
    expect(screen.getByRole('main')).toBeInTheDocument()
    
    // Check for proper article/section structure
    const articles = screen.getAllByRole('article')
    expect(articles.length).toBeGreaterThan(0)
  })

  it('includes call-to-action elements', () => {
    render(<Home />)
    
    // Check for actionable elements
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(10) // Should have many feature links
  })

  it('renders with proper container styling', () => {
    render(<Home />)
    
    const mainContainer = screen.getByRole('main')
    expect(mainContainer).toHaveClass('min-h-screen')
  })

  it('includes blog section link', () => {
    render(<Home />)
    
    expect(screen.getByRole('link', { name: /blog & articles/i })).toHaveAttribute('href', '/blog')
  })

  it('includes design patterns link', () => {
    render(<Home />)
    
    expect(screen.getByRole('link', { name: /design patterns/i })).toHaveAttribute('href', '/patterns')
  })

  it('includes state management link', () => {
    render(<Home />)
    
    expect(screen.getByRole('link', { name: /state management/i })).toHaveAttribute('href', '/state')
  })

  it('includes forms section link', () => {
    render(<Home />)
    
    expect(screen.getByRole('link', { name: /forms & validation/i })).toHaveAttribute('href', '/forms')
  })

  it('has accessible feature cards', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    // Check that feature cards are keyboard accessible
    const firstFeatureLink = screen.getByRole('link', { name: /javascript fundamentals/i })
    
    // Should be focusable
    await user.tab()
    expect(firstFeatureLink).toHaveFocus()
  })

  it('shows feature card hover effects', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const featureCard = screen.getByRole('link', { name: /javascript fundamentals/i })
    
    // Check initial state
    expect(featureCard).toHaveClass('hover:shadow-xl')
    
    // Hover over the card
    await user.hover(featureCard)
    
    // Card should still have hover classes (CSS handles the visual changes)
    expect(featureCard).toHaveClass('transition-all')
  })
})
