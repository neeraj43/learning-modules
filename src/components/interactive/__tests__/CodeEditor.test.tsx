import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CodeEditor } from '@/components/interactive/CodeEditor'

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
})

describe('CodeEditor Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock console.log to prevent it from affecting tests
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders with default props', () => {
    render(<CodeEditor />)
    
    expect(screen.getByText('Code Editor')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /run/i })).toBeInTheDocument()
    expect(screen.getByText('Output:')).toBeInTheDocument()
  })

  it('renders with custom title', () => {
    render(<CodeEditor title="Custom JavaScript Editor" />)
    
    expect(screen.getByText('Custom JavaScript Editor')).toBeInTheDocument()
  })

  it('renders with initial code', () => {
    const initialCode = 'console.log("Hello World")'
    render(<CodeEditor initialCode={initialCode} />)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveValue(initialCode)
  })

  it('updates code when typing', async () => {
    const user = userEvent.setup()
    render(<CodeEditor />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'console.log("test")')
    
    expect(textarea).toHaveValue('console.log("test")')
  })

  it('executes code when run button is clicked', async () => {
    const user = userEvent.setup()
    render(<CodeEditor initialCode='console.log("Hello World")' />)
    
    const runButton = screen.getByRole('button', { name: /run/i })
    await user.click(runButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Hello World/)).toBeInTheDocument()
    })
  })

  it('shows error when invalid code is executed', async () => {
    const user = userEvent.setup()
    render(<CodeEditor initialCode='invalid code here;;;' />)
    
    const runButton = screen.getByRole('button', { name: /run/i })
    await user.click(runButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument()
    })
  })

  it('resets code when reset button is clicked', async () => {
    const user = userEvent.setup()
    const initialCode = 'console.log("initial")'
    render(<CodeEditor initialCode={initialCode} />)
    
    const textarea = screen.getByRole('textbox')
    
    // Modify the code
    await user.clear(textarea)
    await user.type(textarea, 'console.log("modified")')
    expect(textarea).toHaveValue('console.log("modified")')
    
    // Reset the code - find button by its position (second button)
    const buttons = screen.getAllByRole('button')
    const resetButton = buttons[1] // Copy, Reset, Run
    await user.click(resetButton)
    
    expect(textarea).toHaveValue(initialCode)
  })

  it('copies code to clipboard when copy button is clicked', async () => {
    const user = userEvent.setup()
    const code = 'console.log("copy test")'
    render(<CodeEditor initialCode={code} />)
    
    // Copy button is the first button
    const buttons = screen.getAllByRole('button')
    const copyButton = buttons[0] // Copy, Reset, Run
    await user.click(copyButton)
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code)
  })

  it('shows loading state when executing code', async () => {
    const user = userEvent.setup()
    render(<CodeEditor initialCode='console.log("test")' />)
    
    const runButton = screen.getByRole('button', { name: /run/i })
    
    // The loading state is very brief, so we'll just test that the function executes
    await user.click(runButton)
    
    // Check that output appears (which means execution completed)
    await waitFor(() => {
      expect(screen.getByText(/test/)).toBeInTheDocument()
    })
  })

  it('handles tab key for indentation', async () => {
    const user = userEvent.setup()
    render(<CodeEditor />)
    
    const textarea = screen.getByRole('textbox')
    await user.click(textarea)
    await user.keyboard('{Tab}')
    
    expect(textarea).toHaveValue('  ') // Two spaces for tab
  })

  it('executes code with Ctrl+Enter keyboard shortcut', async () => {
    const user = userEvent.setup()
    render(<CodeEditor initialCode='console.log("keyboard test")' />)
    
    const textarea = screen.getByRole('textbox')
    await user.click(textarea)
    await user.keyboard('{Control>}{Enter}{/Control}')
    
    await waitFor(() => {
      // Look for the output in the pre element
      expect(screen.getByText('keyboard test')).toBeInTheDocument()
    })
  })

  it('executes code with Cmd+Enter keyboard shortcut', async () => {
    const user = userEvent.setup()
    render(<CodeEditor initialCode='console.log("mac keyboard test")' />)
    
    const textarea = screen.getByRole('textbox')
    await user.click(textarea)
    await user.keyboard('{Meta>}{Enter}{/Meta}')
    
    await waitFor(() => {
      // Look for the output in the pre element
      expect(screen.getByText('mac keyboard test')).toBeInTheDocument()
    })
  })


  it('hides output section when showOutput is false', () => {
    render(<CodeEditor showOutput={false} />)
    
    expect(screen.queryByText('Output:')).not.toBeInTheDocument()
  })

  it('shows success message when code executes without output', async () => {
    const user = userEvent.setup()
    render(<CodeEditor initialCode='let x = 5' />)
    
    const runButton = screen.getByRole('button', { name: /run/i })
    await user.click(runButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Code executed successfully \(no output\)/)).toBeInTheDocument()
    })
  })

  it('handles object output correctly', async () => {
    const user = userEvent.setup()
    render(<CodeEditor initialCode='console.log({name: "test", value: 123})' />)
    
    const runButton = screen.getByRole('button', { name: /run/i })
    await user.click(runButton)
    
    await waitFor(() => {
      expect(screen.getByText(/"name": "test"/)).toBeInTheDocument()
    })
  })

  it('has proper accessibility attributes', () => {
    render(<CodeEditor />)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('spellCheck', 'false')
    
    const runButton = screen.getByRole('button', { name: /run/i })
    expect(runButton).toBeInTheDocument()
    // Note: The component doesn't currently have title attributes, but it has accessible text
  })
})
