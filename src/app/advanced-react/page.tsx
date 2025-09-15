'use client'

import { useState, useRef, useCallback, useMemo, forwardRef, useImperativeHandle, useEffect, createContext } from 'react'
import { motion } from 'framer-motion'
import { Target, Zap, Layers, ArrowRight, MousePointer } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CodeEditor } from '@/components/interactive/CodeEditor'

// CSS-in-JS styled components using template literals
const StyledDiv = ({ children, color = 'blue', className = '' }: { children: React.ReactNode; color?: string; className?: string }) => {
  const styles = {
    blue: 'bg-blue-100 border-blue-300 text-blue-800',
    green: 'bg-green-100 border-green-300 text-green-800',
    purple: 'bg-purple-100 border-purple-300 text-purple-800',
    red: 'bg-red-100 border-red-300 text-red-800'
  }
  
  return (
    <div className={`p-4 border-2 rounded-lg ${styles[color as keyof typeof styles]} ${className}`}>
      {children}
    </div>
  )
}

// Performance Context for demonstration
const PerformanceContext = createContext<{
  rerenderCount: number
  incrementRerenders: () => void
}>({
  rerenderCount: 0,
  incrementRerenders: () => {}
})

// 1. Advanced useRef Examples
const AdvancedUseRefExamples = () => {
  const [count, setCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const prevCountRef = useRef<number | undefined>(undefined)
  const renderCountRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const [isRunning, setIsRunning] = useState(false)

  // Track previous value
  useEffect(() => {
    prevCountRef.current = count
    renderCountRef.current += 1
  })

  // Timer management with useRef
  const startTimer = () => {
    if (intervalRef.current) return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
      setIsRunning(false)
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }

  return (
    <div className="space-y-6">
      <StyledDiv color="blue">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Advanced useRef Examples
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* DOM References */}
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium mb-2">DOM References</h4>
            <input
              ref={inputRef}
              type="text"
              placeholder="Focus me programmatically"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <Button size="sm" onClick={focusInput}>Focus & Select</Button>
          </div>

          {/* Previous Values */}
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium mb-2">Tracking Previous Values</h4>
            <div className="space-y-2 text-sm">
              <div>Current count: <strong>{count}</strong></div>
              <div>Previous count: <strong>{prevCountRef.current ?? 'None'}</strong></div>
              <div>Render count: <strong>{renderCountRef.current}</strong></div>
            </div>
          </div>

          {/* Timer Management */}
          <div className="bg-white p-4 rounded border md:col-span-2">
            <h4 className="font-medium mb-2">Timer Management</h4>
            <div className="flex items-center gap-4 mb-2">
              <div className="text-2xl font-bold text-blue-600">{count}s</div>
              <div className="flex gap-2">
                <Button size="sm" onClick={startTimer} disabled={isRunning}>Start</Button>
                <Button size="sm" onClick={stopTimer} disabled={!isRunning}>Stop</Button>
                <Button size="sm" onClick={() => setCount(0)} variant="ghost">Reset</Button>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Using useRef to persist timer reference across renders
            </p>
          </div>
        </div>
      </StyledDiv>

      {/* Interactive Code Example */}
      <CodeEditor
        title="useRef Interactive Example"
        initialCode={`// useRef for DOM manipulation
const inputRef = useRef(null)
const countRef = useRef(0)

// Access DOM element
const focusInput = () => {
  inputRef.current?.focus()
}

// Persist values across renders
const increment = () => {
  countRef.current += 1
  console.log('Count (not causing re-render):', countRef.current)
}

console.log('Try calling focusInput() or increment()')`}
        height="150px"
      />
    </div>
  )
}

// ForwardRef Example
interface CustomInputProps {
  placeholder?: string
  onEnterKey?: (value: string) => void
}

interface CustomInputRef {
  focus: () => void
  clear: () => void
  getValue: () => string
}

const CustomInput = forwardRef<CustomInputRef, CustomInputProps>(
  ({ placeholder, onEnterKey }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      },
      getValue: () => inputRef.current?.value || ''
    }))

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && onEnterKey && inputRef.current) {
        onEnterKey(inputRef.current.value)
      }
    }

    return (
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )
  }
)

CustomInput.displayName = 'CustomInput'

// 2. ForwardRef & useImperativeHandle
const ForwardRefExample = () => {
  const customInputRef = useRef<CustomInputRef>(null)
  const [messages, setMessages] = useState<string[]>([])

  const handleMessage = (value: string) => {
    if (value.trim()) {
      setMessages(prev => [...prev, value])
      customInputRef.current?.clear()
    }
  }

  return (
    <StyledDiv color="green">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ArrowRight className="w-5 h-5" />
        forwardRef & useImperativeHandle
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded border">
          <h4 className="font-medium mb-2">Custom Input with Imperative API</h4>
          <div className="space-y-2">
            <CustomInput
              ref={customInputRef}
              placeholder="Type and press Enter..."
              onEnterKey={handleMessage}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => customInputRef.current?.focus()}>
                Focus
              </Button>
              <Button size="sm" onClick={() => customInputRef.current?.clear()}>
                Clear
              </Button>
              <Button size="sm" onClick={() => {
                const value = customInputRef.current?.getValue()
                alert(`Current value: "${value}"`)
              }}>
                Get Value
              </Button>
            </div>
          </div>
          
          {messages.length > 0 && (
            <div className="mt-4">
              <h5 className="font-medium text-sm mb-2">Messages:</h5>
              <div className="space-y-1">
                {messages.map((msg, index) => (
                  <div key={index} className="text-sm bg-gray-100 p-2 rounded">
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <CodeEditor
          title="forwardRef Example"
          initialCode={`// Creating a custom component with forwardRef
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null)
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => inputRef.current.value = '',
    getValue: () => inputRef.current?.value
  }))
  
  return <input ref={inputRef} {...props} />
})

// Usage
const parentRef = useRef(null)
// parentRef.current.focus()
// parentRef.current.clear()
console.log('forwardRef allows parent components to access child methods')`}
          height="150px"
        />
      </div>
    </StyledDiv>
  )
}

// 3. Performance Optimization with useMemo and useCallback
const PerformanceExample = () => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5])
  const [filter, setFilter] = useState('')
  const [rerenderCount, setRerenderCount] = useState(0)

  // Expensive calculation - memoized
  const expensiveValue = useMemo(() => {
    console.log('🔄 Calculating expensive value...')
    let result = 0
    for (let i = 0; i < count * 100000; i++) {
      result += Math.sqrt(i)
    }
    return result.toFixed(2)
  }, [count])

  // Filtered items - memoized
  const filteredItems = useMemo(() => {
    console.log('🔍 Filtering items...')
    return items.filter(item => item.toString().includes(filter))
  }, [items, filter])

  // Memoized callback to prevent child re-renders
  const addItem = useCallback(() => {
    setItems(prev => [...prev, Math.floor(Math.random() * 100)])
  }, [])

  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }, [])

  useEffect(() => {
    setRerenderCount(prev => prev + 1)
  }, [count, items, filter])

  return (
    <PerformanceContext.Provider value={{
      rerenderCount,
      incrementRerenders: () => setRerenderCount(prev => prev + 1)
    }}>
      <StyledDiv color="purple">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Performance Optimization (useMemo & useCallback)
        </h3>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">useMemo - Expensive Calculation</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => setCount(c => c + 1)}>
                      Count: {count}
                    </Button>
                    <span className="text-sm text-gray-600">
                      Result: {expensiveValue}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Check console to see when calculation runs
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Render Tracking</h4>
                <div className="text-sm space-y-1">
                  <div>Component renders: <strong>{rerenderCount}</strong></div>
                  <Button size="sm" onClick={() => setRerenderCount(0)} variant="ghost">
                    Reset Count
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium mb-2">useMemo - Filtered List</h4>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Filter items..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="flex-1 px-3 py-1 border rounded text-sm"
                />
                <Button size="sm" onClick={addItem}>Add Item</Button>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {filteredItems.map((item, index) => (
                  <button
                    key={`${item}-${index}`}
                    onClick={() => removeItem(items.indexOf(item))}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
                  >
                    {item} ×
                  </button>
                ))}
              </div>
              
              <p className="text-xs text-gray-600">
                Filtered: {filteredItems.length} / {items.length} items
              </p>
            </div>
          </div>

          <CodeEditor
            title="Performance Optimization Example"
            initialCode={`// useMemo - Expensive calculation
const expensiveValue = useMemo(() => {
  console.log('Calculating...')
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i)
  }
  return result
}, [dependency]) // Only recalculates when dependency changes

// useCallback - Memoized function
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b]) // Only recreates when a or b changes

console.log('These hooks prevent unnecessary recalculations and re-renders')`}
            height="120px"
          />
        </div>
      </StyledDiv>
    </PerformanceContext.Provider>
  )
}

// 4. Event Bubbling Examples
const EventBubblingExample = () => {
  const [events, setEvents] = useState<string[]>([])
  const [stopPropagation, setStopPropagation] = useState(false)

  const addEvent = (event: string) => {
    setEvents(prev => [...prev, `${new Date().toLocaleTimeString()}: ${event}`])
  }

  const handleOuterClick = () => addEvent('Outer div clicked')
  const handleMiddleClick = (e: React.MouseEvent) => {
    if (stopPropagation) e.stopPropagation()
    addEvent('Middle div clicked')
  }
  const handleInnerClick = (e: React.MouseEvent) => {
    if (stopPropagation) e.stopPropagation()
    addEvent('Inner button clicked')
  }

  const clearEvents = () => setEvents([])

  return (
    <StyledDiv color="red">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MousePointer className="w-5 h-5" />
        Event Bubbling & Propagation
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded border">
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={stopPropagation}
                onChange={(e) => setStopPropagation(e.target.checked)}
              />
              Stop Propagation
            </label>
            <Button size="sm" onClick={clearEvents} variant="ghost">
              Clear Events
            </Button>
          </div>
          
          {/* Nested elements for bubbling demonstration */}
          <div
            onClick={handleOuterClick}
            className="p-8 bg-red-100 border-2 border-red-300 rounded cursor-pointer"
          >
            <div className="mb-2 text-sm font-medium text-red-800">Outer Container</div>
            <div
              onClick={handleMiddleClick}
              className="p-6 bg-yellow-100 border-2 border-yellow-300 rounded cursor-pointer"
            >
              <div className="mb-2 text-sm font-medium text-yellow-800">Middle Container</div>
              <button
                onClick={handleInnerClick}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Inner Button
              </button>
            </div>
          </div>
          
          {/* Event log */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">Event Log:</h4>
            <div className="bg-gray-100 p-3 rounded max-h-32 overflow-y-auto">
              {events.length === 0 ? (
                <p className="text-gray-500 text-sm">Click on any element to see event bubbling</p>
              ) : (
                events.map((event, index) => (
                  <div key={index} className="text-sm font-mono">
                    {event}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <CodeEditor
          title="Event Bubbling Example"
          initialCode={`// Event bubbling demonstration
const handleClick = (e, elementName) => {
  console.log(\`\${elementName} clicked\`)
  
  // Stop event from bubbling up
  // e.stopPropagation()
  
  // Prevent default behavior
  // e.preventDefault()
}

// Events bubble from inner to outer elements
// unless stopPropagation() is called

// Try clicking different elements and observe the order
console.log('Event bubbling: inner → middle → outer')`}
          height="120px"
        />
      </div>
    </StyledDiv>
  )
}

// 5. CSS-in-JS Examples
const CSSInJSExample = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'colorful'>('light')
  const [isAnimated, setIsAnimated] = useState(false)

  // Dynamic styles based on props/state
  const getThemeStyles = (theme: string) => {
    const themes = {
      light: {
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        color: '#333',
        border: '2px solid #e1e5e9'
      },
      dark: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        border: '2px solid #4c51bf'
      },
      colorful: {
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
        color: '#333',
        border: '2px solid #ff6b9d'
      }
    }
    return themes[theme as keyof typeof themes]
  }

  const dynamicCardStyle = {
    ...getThemeStyles(theme),
    padding: '24px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    transform: isAnimated ? 'scale(1.05) rotate(2deg)' : 'scale(1) rotate(0deg)',
    boxShadow: isAnimated 
      ? '0 20px 40px rgba(0,0,0,0.2)' 
      : '0 4px 6px rgba(0,0,0,0.1)'
  }

  return (
    <StyledDiv color="blue">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Layers className="w-5 h-5" />
        CSS-in-JS Examples
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded border">
          <h4 className="font-medium mb-4">Dynamic Styling</h4>
          
          <div className="flex gap-2 mb-4">
            {(['light', 'dark', 'colorful'] as const).map(t => (
              <Button
                key={t}
                size="sm"
                variant={theme === t ? 'primary' : 'ghost'}
                onClick={() => setTheme(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Button>
            ))}
            <label className="flex items-center gap-2 ml-4">
              <input
                type="checkbox"
                checked={isAnimated}
                onChange={(e) => setIsAnimated(e.target.checked)}
              />
              Animated
            </label>
          </div>
          
          <div style={dynamicCardStyle}>
            <h5 className="font-bold mb-2">Dynamic CSS-in-JS Card</h5>
            <p className="text-sm opacity-90">
              This card&apos;s styles are generated dynamically based on the selected theme and animation state.
              The styles are computed in JavaScript and applied inline.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <h4 className="font-medium mb-2">Styled Component Pattern</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StyledDiv color="blue">Blue Variant</StyledDiv>
            <StyledDiv color="green">Green Variant</StyledDiv>
            <StyledDiv color="purple">Purple Variant</StyledDiv>
          </div>
        </div>

        <CodeEditor
          title="CSS-in-JS Example"
          initialCode={`// CSS-in-JS with dynamic styles
const getButtonStyles = (variant, size) => ({
  padding: size === 'small' ? '8px 16px' : '12px 24px',
  backgroundColor: variant === 'primary' ? '#3b82f6' : '#6b7280',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  }
})

// Template literal CSS
const styledDiv = \`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  padding: 20px;
  border-radius: 10px;
  color: white;
\`

console.log('CSS-in-JS allows dynamic styling with JavaScript!')`}
          height="150px"
        />
      </div>
    </StyledDiv>
  )
}

// Main Page Component
const AdvancedReactPage = () => {
  const [activeSection, setActiveSection] = useState('refs')

  const sections = [
    { id: 'refs', name: 'useRef & ForwardRef', icon: Target },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'events', name: 'Event Bubbling', icon: MousePointer },
    { id: 'css-in-js', name: 'CSS-in-JS', icon: Layers },
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'refs':
        return (
          <div className="space-y-8">
            <AdvancedUseRefExamples />
            <ForwardRefExample />
          </div>
        )
      case 'performance':
        return <PerformanceExample />
      case 'events':
        return <EventBubblingExample />
      case 'css-in-js':
        return <CSSInJSExample />
      default:
        return <AdvancedUseRefExamples />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Advanced React Concepts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master performance optimization, advanced hooks, event handling, and modern styling techniques 
              with interactive examples and live code editors.
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.name}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderSection()}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AdvancedReactPage
