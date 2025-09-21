'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, RotateCcw, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CodeEditorProps {
  initialCode?: string
  title?: string
  height?: string
  showOutput?: boolean
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '',
  title = 'Code Editor',
  height = '200px',
  showOutput = true
}) => {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [code])

  const executeCode = () => {
    setIsRunning(true)
    setError('')
    setOutput('')

    try {
      // Create a safe execution environment
      const originalConsoleLog = console.log
      const logs: string[] = []
      
      // Override console.log to capture output
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '))
      }

      // Check if this is test code or Node.js code
      const isTestCode = /\b(describe|test|it|expect|beforeEach|beforeAll|afterEach|afterAll)\s*\(/.test(code)
      const isNodeCode = /\b(require|module\.exports|exports\.|__dirname|__filename|process\.)\s*/.test(code)
      
      if (isTestCode || isNodeCode) {
        // Provide mock testing functions for demonstration
        const testResults: string[] = []
        
        // Mock Node.js and testing environment
        const mockNodeModules: Record<string, unknown> = {
          'next/jest': () => ({
            dir: './',
            createJestConfig: (config: unknown) => config
          }),
          '@testing-library/jest-dom': {},
          '@testing-library/react': {
            render: () => ({ getByText: () => ({}), getByRole: () => ({}) }),
            screen: { getByText: () => ({}), getByRole: () => ({}) },
            fireEvent: { click: () => ({}), change: () => ({}) }
          },
          'jest-environment-jsdom': 'jsdom',
          'path': {
            join: (...args: string[]) => args.join('/'),
            resolve: (...args: string[]) => '/' + args.join('/')
          },
          'fs': {
            readFileSync: () => 'mock file content',
            writeFileSync: () => {},
            existsSync: () => true
          }
        }

        const mockJest = {
          describe: (name: string, fn: () => void) => {
            testResults.push(`📁 Test Suite: ${name}`)
            try {
              fn()
            } catch (e) {
              testResults.push(`  ❌ Suite failed: ${e}`)
            }
          },
          test: (name: string, fn: () => void | Promise<void>) => {
            try {
              const result = fn()
              if (result instanceof Promise) {
                testResults.push(`  ⏳ ${name} (async test - simulated)`)
              } else {
                testResults.push(`  ✅ ${name}`)
              }
            } catch (e) {
              testResults.push(`  ❌ ${name} - ${e}`)
            }
          },
          it: (name: string, fn: () => void | Promise<void>) => {
            try {
              const result = fn()
              if (result instanceof Promise) {
                testResults.push(`  ⏳ ${name} (async test - simulated)`)
              } else {
                testResults.push(`  ✅ ${name}`)
              }
            } catch (e) {
              testResults.push(`  ❌ ${name} - ${e}`)
            }
          },
          expect: (actual: unknown) => ({
            toBe: (expected: unknown) => {
              if (actual === expected) {
                testResults.push(`    ✓ Expected ${actual} to be ${expected}`)
              } else {
                throw new Error(`Expected ${actual} to be ${expected}`)
              }
            },
            toEqual: (expected: unknown) => {
              if (JSON.stringify(actual) === JSON.stringify(expected)) {
                testResults.push(`    ✓ Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`)
              } else {
                throw new Error(`Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`)
              }
            },
            toHaveBeenCalled: () => {
              testResults.push(`    ✓ Mock function was called`)
            },
            toHaveBeenCalledWith: (...args: unknown[]) => {
              testResults.push(`    ✓ Mock function was called with ${JSON.stringify(args)}`)
            },
            not: {
              toHaveBeenCalled: () => {
                testResults.push(`    ✓ Mock function was not called`)
              }
            }
          }),
          beforeEach: (fn: () => void) => {
            testResults.push(`  🔄 Setup: beforeEach`)
            try {
              fn()
            } catch (e) {
              testResults.push(`  ❌ beforeEach failed: ${e}`)
            }
          },
          jest: {
            fn: () => ({
              mockReturnValue: (value: unknown) => ({ returnValue: value }),
              mockResolvedValue: (value: unknown) => ({ resolvedValue: value })
            })
          }
        }

        // Mock Node.js globals
        const mockNodeGlobals = {
          require: (moduleName: string) => {
            testResults.push(`📦 Required module: ${moduleName}`)
            return mockNodeModules[moduleName] || { 
              default: {},
              createJestConfig: (config: unknown) => config
            }
          },
          module: {
            exports: {}
          },
          exports: {},
          __dirname: '/mock/directory',
          __filename: '/mock/directory/file.js',
          process: {
            cwd: () => '/mock/project',
            env: { NODE_ENV: 'test' }
          },
          global: typeof window !== 'undefined' ? window : {}
        }

        // Create a function to execute the test/Node.js code safely
        const executeFunction = new Function(
          'describe', 'test', 'it', 'expect', 'beforeEach', 'beforeAll', 'afterEach', 'afterAll', 'jest',
          'require', 'module', 'exports', '__dirname', '__filename', 'process', 'global',
          `
          try {
            ${code}
          } catch (e) {
            throw e;
          }
        `)

        executeFunction(
          mockJest.describe, 
          mockJest.test, 
          mockJest.it, 
          mockJest.expect, 
          mockJest.beforeEach, 
          mockJest.beforeEach, // beforeAll
          mockJest.beforeEach, // afterEach
          mockJest.beforeEach, // afterAll
          mockJest.jest,
          // Node.js globals
          mockNodeGlobals.require,
          mockNodeGlobals.module,
          mockNodeGlobals.exports,
          mockNodeGlobals.__dirname,
          mockNodeGlobals.__filename,
          mockNodeGlobals.process,
          mockNodeGlobals.global
        )
        
        // Show test/Node.js results
        if (testResults.length > 0) {
          if (isTestCode) {
            logs.push('🧪 TEST EXECUTION SIMULATION:')
            logs.push(...testResults)
            logs.push('')
            logs.push('Note: This is a simulation of test execution for learning purposes.')
            logs.push('In a real environment, use Jest, Vitest, or similar testing frameworks.')
          } else {
            logs.push('📦 NODE.JS CODE SIMULATION:')
            logs.push(...testResults)
            logs.push('')
            logs.push('Note: This is a simulation of Node.js environment for learning purposes.')
            logs.push('In a real environment, run this code with Node.js runtime.')
          }
        }
      } else {
        // Regular code execution
        const executeFunction = new Function(`
          try {
            ${code}
          } catch (e) {
            throw e;
          }
        `)

        executeFunction()
      }
      
      // Restore original console.log
      console.log = originalConsoleLog
      
      setOutput(logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput('')
    setError('')
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = textareaRef.current
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const spaces = '  ' // 2 spaces for indentation
        
        setCode(code.substring(0, start) + spaces + code.substring(end))
        
        // Set cursor position after the inserted spaces
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + spaces.length
        }, 0)
      }
    }
    
    // Ctrl/Cmd + Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      executeCode()
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300 text-sm font-medium ml-2">{title}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={copyCode}
            className="text-gray-300 hover:text-white"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={resetCode}
            className="text-gray-300 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="success"
            onClick={executeCode}
            loading={isRunning}
            className="text-white"
          >
            <Play className="w-4 h-4" />
            Run
          </Button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-900 text-gray-100 p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none"
          style={{ minHeight: height }}
          placeholder="// Write your code here...&#10;// Press Ctrl/Cmd + Enter to run&#10;// Press Tab for indentation"
          spellCheck={false}
        />
      </div>

      {/* Output Section */}
      {showOutput && (
        <div className="border-t border-gray-700">
          {/* Output */}
          {output && (
            <div className="bg-gray-800 p-4">
              <div className="text-green-400 text-xs font-semibold mb-2">OUTPUT:</div>
              <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                {output}
              </pre>
            </div>
          )}
          
          {/* Error */}
          {error && (
            <div className="bg-red-900/20 border-t border-red-700 p-4">
              <div className="text-red-400 text-xs font-semibold mb-2">ERROR:</div>
              <pre className="text-red-300 text-sm font-mono whitespace-pre-wrap">
                {error}
              </pre>
            </div>
          )}
          
          {/* Instructions */}
          {!output && !error && (
            <div className="bg-gray-800 p-4 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Press &quot;Run&quot; or Ctrl/Cmd + Enter to execute your code
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Default export removed - use named export instead