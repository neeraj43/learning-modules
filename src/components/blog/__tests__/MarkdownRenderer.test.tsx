import { render, screen } from '@testing-library/react'
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer'

describe('MarkdownRenderer Component', () => {
  it('renders simple text content', () => {
    const content = 'This is a simple text'
    render(<MarkdownRenderer content={content} />)
    
    expect(screen.getByText('This is a simple text')).toBeInTheDocument()
  })

  it('renders headings correctly', () => {
    const content = '# Main Heading\n## Sub Heading\n### Third Level'
    render(<MarkdownRenderer content={content} />)
    
    expect(screen.getByRole('heading', { level: 1, name: 'Main Heading' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Sub Heading' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Third Level' })).toBeInTheDocument()
  })

  it('renders paragraphs correctly', () => {
    const content = 'First paragraph.\n\nSecond paragraph.'
    render(<MarkdownRenderer content={content} />)
    
    expect(screen.getByText('First paragraph.')).toBeInTheDocument()
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument()
  })

  it('renders links correctly', () => {
    const content = 'Check out [this link](https://example.com) for more info.'
    render(<MarkdownRenderer content={content} />)
    
    const link = screen.getByRole('link', { name: 'this link' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('renders bold text correctly', () => {
    const content = 'This is **bold text** in a sentence.'
    render(<MarkdownRenderer content={content} />)
    
    const boldElement = screen.getByText('bold text')
    expect(boldElement).toBeInTheDocument()
    expect(boldElement.tagName).toBe('STRONG')
  })

  it('renders italic text correctly', () => {
    const content = 'This is *italic text* in a sentence.'
    render(<MarkdownRenderer content={content} />)
    
    const italicElement = screen.getByText('italic text')
    expect(italicElement).toBeInTheDocument()
    expect(italicElement.tagName).toBe('EM')
  })

  it('renders code blocks correctly', () => {
    const content = '```javascript\nconsole.log("Hello World");\n```'
    render(<MarkdownRenderer content={content} />)
    
    const codeBlock = screen.getByText('console.log("Hello World");')
    expect(codeBlock).toBeInTheDocument()
    expect(codeBlock.closest('pre')).toBeInTheDocument()
  })

  it('renders inline code correctly', () => {
    const content = 'Use the `console.log()` function to print.'
    render(<MarkdownRenderer content={content} />)
    
    const inlineCode = screen.getByText('console.log()')
    expect(inlineCode).toBeInTheDocument()
    expect(inlineCode.tagName).toBe('CODE')
  })

  it('renders unordered lists correctly', () => {
    const content = '- First item\n- Second item\n- Third item'
    render(<MarkdownRenderer content={content} />)
    
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(list.tagName).toBe('UL')
    
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(3)
    expect(listItems[0]).toHaveTextContent('First item')
    expect(listItems[1]).toHaveTextContent('Second item')
    expect(listItems[2]).toHaveTextContent('Third item')
  })

  it('renders ordered lists correctly', () => {
    const content = '1. First step\n2. Second step\n3. Third step'
    render(<MarkdownRenderer content={content} />)
    
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(list.tagName).toBe('OL')
    
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(3)
    expect(listItems[0]).toHaveTextContent('First step')
    expect(listItems[1]).toHaveTextContent('Second step')
    expect(listItems[2]).toHaveTextContent('Third step')
  })

  it('renders blockquotes correctly', () => {
    const content = '> This is a blockquote\n> with multiple lines'
    render(<MarkdownRenderer content={content} />)
    
    const blockquote = screen.getByText(/This is a blockquote/)
    expect(blockquote.closest('blockquote')).toBeInTheDocument()
  })

  it('renders horizontal rules correctly', () => {
    const content = 'Before rule\n\n---\n\nAfter rule'
    render(<MarkdownRenderer content={content} />)
    
    expect(screen.getByText('Before rule')).toBeInTheDocument()
    expect(screen.getByText('After rule')).toBeInTheDocument()
    
    // Check for hr element
    const hr = document.querySelector('hr')
    expect(hr).toBeInTheDocument()
  })

  it('handles empty content gracefully', () => {
    render(<MarkdownRenderer content="" />)
    
    // Should render without crashing
    const container = screen.getByRole('article')
    expect(container).toBeInTheDocument()
  })

  it('handles null content gracefully', () => {
    render(<MarkdownRenderer content={null as unknown as string} />)
    
    // Should render without crashing
    const container = screen.getByRole('article')
    expect(container).toBeInTheDocument()
  })

  it('handles undefined content gracefully', () => {
    render(<MarkdownRenderer content={undefined as unknown as string} />)
    
    // Should render without crashing
    const container = screen.getByRole('article')
    expect(container).toBeInTheDocument()
  })

  it('renders complex markdown correctly', () => {
    const content = `# Main Title

This is a paragraph with **bold** and *italic* text.

## Code Example

Here's some inline \`code\` and a code block:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## List of Features

- Feature one
- Feature two with [a link](https://example.com)
- Feature three

> Important note about the features above.

---

That's all for now!`

    render(<MarkdownRenderer content={content} />)
    
    // Check various elements are rendered
    expect(screen.getByRole('heading', { level: 1, name: 'Main Title' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Code Example' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'List of Features' })).toBeInTheDocument()
    expect(screen.getByText('bold')).toBeInTheDocument()
    expect(screen.getByText('italic')).toBeInTheDocument()
    expect(screen.getByText('code')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'a link' })).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText(/Important note/)).toBeInTheDocument()
  })

  it('applies correct CSS classes for styling', () => {
    const content = '# Heading\n\nParagraph text.'
    render(<MarkdownRenderer content={content} />)
    
    const container = screen.getByRole('article')
    expect(container).toHaveClass('prose')
    expect(container).toHaveClass('prose-lg')
    expect(container).toHaveClass('max-w-none')
  })

  it('has proper semantic structure', () => {
    const content = '# Title\n\nContent here.'
    render(<MarkdownRenderer content={content} />)
    
    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('renders strikethrough text correctly', () => {
    const content = 'This text is ~~strikethrough~~.'
    render(<MarkdownRenderer content={content} />)
    
    const strikeText = screen.getByText('strikethrough')
    expect(strikeText).toBeInTheDocument()
    expect(strikeText.tagName).toBe('DEL')
  })

  it('renders tables correctly', () => {
    const content = `| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |`

    render(<MarkdownRenderer content={content} />)
    
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    
    expect(screen.getByRole('columnheader', { name: 'Header 1' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Header 2' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Cell 1' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Cell 2' })).toBeInTheDocument()
  })
})
