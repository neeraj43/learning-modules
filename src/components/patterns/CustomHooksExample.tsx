'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Code, Play, Eye, Download, Wifi, WifiOff, Timer, MousePointer2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// ===============================
// CUSTOM HOOKS
// ===============================

// 1. useCounter - Simple state management hook
const useCounter = (initialValue: number = 0, step: number = 1) => {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount(prev => prev + step), [step])
  const decrement = useCallback(() => setCount(prev => prev - step), [step])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  const setValue = useCallback((value: number | ((prev: number) => number)) => {
    setCount(value)
  }, [])

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
    isZero: count === 0,
    isPositive: count > 0,
    isNegative: count < 0
  }
}

// 2. useToggle - Boolean state toggle hook
const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(prev => !prev), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue
  }
}

// 3. useDebounce - Debounce values to reduce API calls
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// 4. useOnlineStatus - Network status detection
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

// 5. useInterval - Declarative interval hook
const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(() => {})

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }
    
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// 6. useMousePosition - Track mouse coordinates
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mousePosition
}

// 7. useFetch - Data fetching with loading and error states
interface UseFetchOptions {
  immediate?: boolean
}

const useFetch = <T = unknown>(url: string | null, options: UseFetchOptions = {}) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async () => {
    if (!url) return

    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data based on URL
      const mockData = {
        '/api/users': [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ],
        '/api/posts': [
          { id: 1, title: 'Hello World', content: 'First post' },
          { id: 2, title: 'React Hooks', content: 'Custom hooks are awesome' }
        ]
      }

      setData(mockData[url as keyof typeof mockData] as T || { message: 'Data loaded' } as T)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    if (options.immediate !== false) {
      execute()
    }
  }, [execute, options.immediate])

  const refetch = useCallback(() => {
    execute()
  }, [execute])

  return { data, loading, error, refetch }
}

// ===============================
// DEMO COMPONENTS
// ===============================

const CounterDemo = () => {
  const counter = useCounter(0, 1)
  const stepCounter = useCounter(5, 5)

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">useCounter Hook</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Basic Counter</h4>
          <div className="flex items-center space-x-4">
            <Button size="sm" onClick={counter.decrement}>-</Button>
            <span className="text-2xl font-bold text-blue-600">{counter.count}</span>
            <Button size="sm" onClick={counter.increment}>+</Button>
            <Button size="sm" variant="ghost" onClick={counter.reset}>Reset</Button>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Status: {counter.isZero ? 'Zero' : counter.isPositive ? 'Positive' : 'Negative'}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Step Counter (±5)</h4>
          <div className="flex items-center space-x-4">
            <Button size="sm" onClick={stepCounter.decrement}>-5</Button>
            <span className="text-2xl font-bold text-green-600">{stepCounter.count}</span>
            <Button size="sm" onClick={stepCounter.increment}>+5</Button>
            <Button size="sm" variant="ghost" onClick={stepCounter.reset}>Reset</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ToggleDemo = () => {
  const darkMode = useToggle(false)
  const notifications = useToggle(true)
  const sidebar = useToggle(false)

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">useToggle Hook</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Dark Mode</span>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant={darkMode.value ? 'primary' : 'ghost'} onClick={darkMode.toggle}>
              {darkMode.value ? 'ON' : 'OFF'}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Notifications</span>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant={notifications.value ? 'success' : 'ghost'} onClick={notifications.toggle}>
              {notifications.value ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Sidebar</span>
          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={sidebar.setTrue} disabled={sidebar.value}>
              Show
            </Button>
            <Button size="sm" onClick={sidebar.setFalse} disabled={!sidebar.value}>
              Hide
            </Button>
          </div>
        </div>

        {sidebar.value && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-100 p-3 rounded border-l-4 border-blue-500"
          >
            <p className="text-sm text-gray-600">Sidebar is now visible!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

const DebounceDemo = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [searchCount, setSearchCount] = useState(0)

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchCount(prev => prev + 1)
    }
  }, [debouncedSearchTerm])

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">useDebounce Hook</h3>
      
      <div className="space-y-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="text-sm text-gray-600 space-y-1">
          <div>Immediate value: <span className="font-mono bg-gray-100 px-1 rounded">{searchTerm || '(empty)'}</span></div>
          <div>Debounced value: <span className="font-mono bg-gray-100 px-1 rounded">{debouncedSearchTerm || '(empty)'}</span></div>
          <div>Search triggered: <span className="font-semibold">{searchCount} times</span></div>
        </div>
        
        <p className="text-xs text-gray-500">
          The debounced value updates 500ms after you stop typing, reducing API calls.
        </p>
      </div>
    </div>
  )
}

const OnlineStatusDemo = () => {
  const isOnline = useOnlineStatus()

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">useOnlineStatus Hook</h3>
      
      <div className="flex items-center space-x-3">
        {isOnline ? (
          <Wifi className="w-6 h-6 text-green-500" />
        ) : (
          <WifiOff className="w-6 h-6 text-red-500" />
        )}
        <div>
          <div className={`font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </div>
          <div className="text-xs text-gray-500">
            Try disconnecting your internet to see the status change
          </div>
        </div>
      </div>
    </div>
  )
}

const IntervalDemo = () => {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useInterval(() => {
    setCount(count + 1)
  }, isRunning ? 1000 : null)

  const reset = () => {
    setCount(0)
    setIsRunning(false)
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">useInterval Hook</h3>
      
      <div className="text-center space-y-4">
        <div className="text-3xl font-bold text-blue-600 flex items-center justify-center">
          <Timer className="w-8 h-8 mr-2" />
          {count}s
        </div>
        
        <div className="flex justify-center space-x-2">
          <Button
            size="sm"
            variant={isRunning ? 'danger' : 'success'}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button size="sm" variant="ghost" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

const MousePositionDemo = () => {
  const mousePosition = useMousePosition()

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">useMousePosition Hook</h3>
      
      <div className="flex items-center space-x-4">
        <MousePointer2 className="w-6 h-6 text-blue-500" />
        <div className="font-mono text-sm">
          <div>X: <span className="font-bold text-blue-600">{mousePosition.x}px</span></div>
          <div>Y: <span className="font-bold text-blue-600">{mousePosition.y}px</span></div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Move your mouse around to see the coordinates update
      </p>
    </div>
  )
}

const FetchDemo = () => {
  const [endpoint, setEndpoint] = useState<string | null>(null)
  const { data, loading, error, refetch } = useFetch(endpoint, { immediate: false })

  const endpoints = [
    { label: 'Users', value: '/api/users' },
    { label: 'Posts', value: '/api/posts' }
  ]

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">useFetch Hook</h3>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          {endpoints.map(({ label, value }) => (
            <Button
              key={value}
              size="sm"
              variant={endpoint === value ? 'primary' : 'ghost'}
              onClick={() => setEndpoint(value)}
            >
              {label}
            </Button>
          ))}
        </div>

        {endpoint && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Endpoint: {endpoint}</span>
              <Button size="sm" onClick={refetch} disabled={loading}>
                <Download className="w-4 h-4 mr-1" />
                Refetch
              </Button>
            </div>

            {loading && (
              <div className="text-sm text-blue-600">Loading...</div>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
                Error: {error}
              </div>
            )}

            {data !== null && !loading && (
              <div className="bg-gray-50 p-3 rounded border">
                <pre className="text-xs text-gray-800 overflow-x-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ===============================
// MAIN COMPONENT
// ===============================

const CustomHooksExample = () => {
  const [activeTab, setActiveTab] = useState('demo')

  const tabs = [
    { id: 'demo', label: 'Live Demo', icon: Play },
    { id: 'hooks', label: 'Hook Library', icon: Code },
    { id: 'benefits', label: 'Benefits', icon: Eye }
  ]

  const hookExamples = [
    {
      name: 'useCounter',
      description: 'State management for numeric counters with increment, decrement, and reset',
      code: `const { count, increment, decrement, reset } = useCounter(0)`
    },
    {
      name: 'useToggle',
      description: 'Boolean state toggle with utility functions',
      code: `const { value, toggle, setTrue, setFalse } = useToggle(false)`
    },
    {
      name: 'useDebounce',
      description: 'Debounce values to reduce unnecessary API calls or computations',
      code: `const debouncedValue = useDebounce(searchTerm, 500)`
    },
    {
      name: 'useOnlineStatus',
      description: 'Detect network connectivity status',
      code: `const isOnline = useOnlineStatus()`
    },
    {
      name: 'useInterval',
      description: 'Declarative setInterval with automatic cleanup',
      code: `useInterval(callback, isRunning ? 1000 : null)`
    },
    {
      name: 'useMousePosition',
      description: 'Track mouse coordinates anywhere on the page',
      code: `const { x, y } = useMousePosition()`
    },
    {
      name: 'useFetch',
      description: 'Data fetching with loading and error states',
      code: `const { data, loading, error, refetch } = useFetch('/api/users')`
    }
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'demo' && (
          <div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6">
              <h3 className="font-semibold text-purple-900 mb-2">Custom Hooks Demo</h3>
              <p className="text-purple-800 text-sm">
                Interact with these examples to see how custom hooks encapsulate and reuse stateful logic 
                across different components. Each hook handles its own state and provides a clean API.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CounterDemo />
              <ToggleDemo />
              <DebounceDemo />
              <OnlineStatusDemo />
              <IntervalDemo />
              <MousePositionDemo />
              <div className="md:col-span-2 lg:col-span-1">
                <FetchDemo />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hooks' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Custom Hook Library</h3>
              <p className="text-blue-800 text-sm">
                A collection of reusable custom hooks that encapsulate common patterns and stateful logic.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {hookExamples.map((hook, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{hook.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{hook.description}</p>
                    </div>
                  </div>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                    {hook.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-4">Benefits of Custom Hooks</h3>
                <ul className="text-green-800 space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Reusability:</strong> Share stateful logic between components</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Separation of Concerns:</strong> Extract business logic from UI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Testability:</strong> Easy to unit test in isolation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Composability:</strong> Combine multiple hooks together</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-4">Best Practices</h3>
                <ul className="text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Start with &quot;use&quot; prefix for naming</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Return objects for multiple values</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use useCallback and useMemo when needed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Handle cleanup in useEffect</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Example: Creating a Custom Hook</h3>
              <pre className="text-sm overflow-x-auto">{`// 1. Extract stateful logic into a custom hook
const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount(prev => prev + step), [step])
  const decrement = useCallback(() => setCount(prev => prev - step), [step])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  return { count, increment, decrement, reset }
}

// 2. Use the hook in multiple components
const ComponentA = () => {
  const counter = useCounter(0, 1)
  return <div>{counter.count} <button onClick={counter.increment}>+</button></div>
}

const ComponentB = () => {
  const timer = useCounter(60, -1) // Countdown timer
  return <div>Time left: {timer.count}</div>
}`}</pre>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">When to Create Custom Hooks</h4>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• You have stateful logic that&apos;s used in multiple components</li>
                <li>• You want to extract complex useEffect logic</li>
                <li>• You need to encapsulate API calls or external service interactions</li>
                <li>• You want to create reusable business logic abstractions</li>
                <li>• You need to manage complex state with multiple related values</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default CustomHooksExample
