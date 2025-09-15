'use client'

import { ReactNode } from 'react'
import { Play, CheckCircle } from 'lucide-react'

interface MarkdownRendererProps {
  content: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Simple markdown-like parser for our blog content
  const parseContent = (text: string): ReactNode[] => {
    const lines = text.split('\n')
    const elements: ReactNode[] = []
    let inCodeBlock = false
    let codeBlockContent = ''
    let codeBlockLanguage = ''

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Handle code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeBlockLanguage = line.slice(3).trim()
          codeBlockContent = ''
        } else {
          inCodeBlock = false
          elements.push(
            <div key={i} className="my-6">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code className={`language-${codeBlockLanguage}`}>
                  {codeBlockContent.trim()}
                </code>
              </pre>
            </div>
          )
          codeBlockContent = ''
        }
        continue
      }

      if (inCodeBlock) {
        codeBlockContent += line + '\n'
        continue
      }

      // Handle headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
            {line.slice(2)}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-2xl font-semibold text-gray-900 mt-6 mb-3">
            {line.slice(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-xl font-semibold text-gray-900 mt-5 mb-2">
            {line.slice(4)}
          </h3>
        )
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={i} className="text-lg font-medium text-gray-900 mt-4 mb-2">
            {line.slice(5)}
          </h4>
        )
      }
      // Handle lists
      else if (line.match(/^\d+\./)) {
        elements.push(
          <li key={i} className="ml-6 mb-1 text-gray-700 list-decimal">
            {parseInlineMarkdown(line.replace(/^\d+\.\s*/, ''))}
          </li>
        )
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className="ml-6 mb-1 text-gray-700 list-disc">
            {parseInlineMarkdown(line.slice(2))}
          </li>
        )
      }
      // Handle checkboxes
      else if (line.startsWith('- [ ] ')) {
        elements.push(
          <div key={i} className="flex items-center gap-2 ml-6 mb-2">
            <input type="checkbox" disabled className="w-4 h-4" />
            <span className="text-gray-700">{line.slice(6)}</span>
          </div>
        )
      } else if (line.startsWith('- [x] ') || line.startsWith('- [✓] ')) {
        elements.push(
          <div key={i} className="flex items-center gap-2 ml-6 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-gray-700 line-through">{line.slice(6)}</span>
          </div>
        )
      }
      // Handle special sections
      else if (line.startsWith('### Essential Watching') || line.startsWith('### Must-Watch Resources') || line.startsWith('### Video References')) {
        elements.push(
          <div key={i} className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
            <div className="flex items-center gap-2 mb-2">
              <Play className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">
                {line.slice(4)}
              </h3>
            </div>
          </div>
        )
      }
      // Handle performance metrics sections
      else if (line.includes('Before optimization') || line.includes('After optimization')) {
        elements.push(
          <div key={i} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
            <code className="text-sm text-yellow-800">{line}</code>
          </div>
        )
      }
      // Handle regular paragraphs
      else if (line.trim() && !line.startsWith('//') && !line.startsWith('*')) {
        elements.push(
          <p key={i} className="text-gray-700 mb-4 leading-relaxed">
            {parseInlineMarkdown(line)}
          </p>
        )
      }
      // Handle empty lines
      else if (line.trim() === '') {
        elements.push(<div key={i} className="mb-2" />)
      }
    }

    return elements
  }

  const parseInlineMarkdown = (text: string): ReactNode => {
    // Handle inline code
    text = text.replace(/`([^`]+)`/g, '<code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
    
    // Handle bold text
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong className="font-semibold">$1</strong>')
    
    // Handle italic text
    text = text.replace(/\*([^*]+)\*/g, '<em className="italic">$1</em>')
    
    // Handle links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
      if (url.startsWith('http')) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline inline-flex items-center gap-1">${linkText} <ExternalLink className="w-3 h-3" /></a>`
      }
      return `<a href="${url}" className="text-blue-600 hover:text-blue-700 underline">${linkText}</a>`
    })

    return <span dangerouslySetInnerHTML={{ __html: text }} />
  }

  return (
    <div className="prose prose-lg max-w-none">
      {parseContent(content)}
    </div>
  )
}

export default MarkdownRenderer
