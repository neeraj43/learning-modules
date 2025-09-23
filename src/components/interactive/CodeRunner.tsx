'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  AlertTriangle, 
  Info,
  Lightbulb,
  Terminal,
  Code,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CodeRunnerProps {
  code: string
  language: string
  title?: string
  description?: string
  expectedOutput?: string[]
  hints?: string[]
  onCodeChange?: (code: string) => void
  readOnly?: boolean
}

const CodeRunner: React.FC<CodeRunnerProps> = ({
  code: initialCode,
  language,
  title,
  description,
  expectedOutput,
  hints,
  onCodeChange,
  readOnly = false
}) => {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [copied, setCopied] = useState(false)
  const [executionTime, setExecutionTime] = useState<number>(0)

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    onCodeChange?.(newCode)
    // Clear previous output when code changes
    setOutput([])
    setError('')
  }

  const executeCode = async () => {
    setIsRunning(true)
    setError('')
    setOutput([])
    
    const startTime = performance.now()
    
    try {
      // Create output capture
      const outputLines: string[] = []
      
      // Override console.log to capture output
      const originalLog = console.log
      console.log = (...args) => {
        const line = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')
        outputLines.push(line)
      }

      // Simulate execution delay for UX
      await new Promise(resolve => setTimeout(resolve, 500))

      if (language === 'javascript' || language === 'js') {
        // Execute JavaScript code
        new Function(code)()
      } else {
        // For other languages, provide educational feedback
        outputLines.push(`📝 This is ${language} code for learning purposes.`)
        outputLines.push(`✨ In a real environment, this would be compiled and executed.`)
        outputLines.push(`💡 Try our interactive JavaScript demos to see live results!`)
      }

      // Restore console.log
      console.log = originalLog
      
      const endTime = performance.now()
      setExecutionTime(endTime - startTime)
      setOutput(outputLines)

      // Check if output matches expected (for learning validation)
      if (expectedOutput && expectedOutput.length > 0) {
        const matches = expectedOutput.every((expected, index) => 
          outputLines[index]?.includes(expected)
        )
        if (matches) {
          outputLines.push('')
          outputLines.push('🎉 Perfect! Your code produces the expected output!')
        }
      }

    } catch (err) {
      const endTime = performance.now()
      setExecutionTime(endTime - startTime)
      
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(errorMessage)
      
      // Provide helpful error explanations for beginners
      const helpfulErrors = getHelpfulErrorMessage(errorMessage)
      if (helpfulErrors) {
        setError(helpfulErrors)
      }
    } finally {
      setIsRunning(false)
    }
  }

  const getHelpfulErrorMessage = (error: string): string => {
    if (error.includes('Unexpected token')) {
      return `Syntax Error: There's a problem with your code structure. Check for missing brackets, semicolons, or quotes. 
      
Original error: ${error}`
    }
    if (error.includes('is not defined')) {
      return `Variable Error: You're using a variable that hasn't been declared. Make sure to declare variables with 'let', 'const', or 'var'.
      
Original error: ${error}`
    }
    if (error.includes('Cannot read property')) {
      return `Property Error: You're trying to access a property of something that doesn't exist or is null/undefined.
      
Original error: ${error}`
    }
    return error
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput([])
    setError('')
    onCodeChange?.(initialCode)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      {(title || description) && (
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          {title && (
            <div className="flex items-center gap-2 mb-1">
              <Code className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-gray-900">{title}</h4>
            </div>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}

      {/* Code Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          readOnly={readOnly}
          className={`w-full p-4 font-mono text-sm bg-gray-900 text-gray-100 border-none resize-none focus:outline-none ${
            readOnly ? 'cursor-default' : ''
          }`}
          style={{ minHeight: '200px' }}
          placeholder={`Enter your ${language} code here...`}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <Button
            onClick={executeCode}
            disabled={isRunning}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
          
          <Button
            onClick={resetCode}
            variant="ghost"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          
          <Button
            onClick={copyCode}
            variant="ghost"
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {hints && hints.length > 0 && (
            <Button
              onClick={() => setShowHints(!showHints)}
              variant="ghost"
              className="flex items-center gap-2 text-blue-600"
            >
              <Lightbulb className="w-4 h-4" />
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </Button>
          )}
          
          {executionTime > 0 && (
            <span className="text-xs text-gray-500">
              Executed in {executionTime.toFixed(1)}ms
            </span>
          )}
        </div>
      </div>

      {/* Hints */}
      <AnimatePresence>
        {showHints && hints && hints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 border-t border-blue-200 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">Hints</span>
            </div>
            <ul className="space-y-1">
              {hints.map((hint, index) => (
                <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  {hint}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Output */}
      {(output.length > 0 || error) && (
        <div className="border-t border-gray-200">
          <div className="bg-gray-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 font-medium">Output</span>
              {output.length > 0 && !error && (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}
            </div>
            
            {error ? (
              <div className="bg-red-900 border border-red-700 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-red-300 font-medium">Error</span>
                </div>
                <pre className="text-red-200 text-sm whitespace-pre-wrap">{error}</pre>
              </div>
            ) : output.length > 0 ? (
              <div className="bg-gray-900 rounded border border-gray-700 p-3">
                {output.map((line, index) => (
                  <div key={index} className="text-gray-100 text-sm font-mono">
                    {line || '\u00A0'} {/* Non-breaking space for empty lines */}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm flex items-center gap-2">
                <Info className="w-4 h-4" />
                Click &quot;Run Code&quot; to see the output here
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeRunner
