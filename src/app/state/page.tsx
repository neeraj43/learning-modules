'use client'

import { useState, useReducer, useContext, createContext, useCallback, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Database,
  RefreshCw,
  Plus,
  Minus,
  RotateCcw,
  Settings,
  User,
  ShoppingCart,
  Bell,
  Activity,
  Zap,
  Code,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  Download,
  Upload
} from 'lucide-react'
import { useAppStore, useCart, useTodoStats } from '@/store/useAppStore'

// Context API Example
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Reducer Example
type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number }

interface CounterState {
  count: number
  history: number[]
}

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1]
      }
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1]
      }
    case 'RESET':
      return {
        count: 0,
        history: [0]
      }
    case 'SET':
      return {
        count: action.payload,
        history: [...state.history, action.payload]
      }
    default:
      return state
  }
}

const StateManagementPage = () => {
  const [activeExample, setActiveExample] = useState('useState')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const examples = [
    { id: 'useState', name: 'useState Hook', icon: Zap, color: 'from-blue-500 to-cyan-500' },
    { id: 'useReducer', name: 'useReducer Hook', icon: Settings, color: 'from-purple-500 to-indigo-500' },
    { id: 'useContext', name: 'Context API', icon: Database, color: 'from-green-500 to-emerald-500' },
    { id: 'zustand', name: 'Zustand Store', icon: Activity, color: 'from-orange-500 to-red-500' },
    { id: 'patterns', name: 'Best Practices', icon: BookOpen, color: 'from-pink-500 to-rose-500' },
  ]

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  const renderExample = () => {
    switch (activeExample) {
      case 'useState':
        return <UseStateExample />
      case 'useReducer':
        return <UseReducerExample />
      case 'useContext':
        return <UseContextExample theme={theme} toggleTheme={toggleTheme} />
      case 'zustand':
        return <ZustandExample />
      case 'patterns':
        return <BestPracticesExample />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            State Management Mastery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master React state management from built-in hooks to advanced patterns and external libraries
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {examples.map((example) => {
            const Icon = example.icon
            return (
              <motion.button
                key={example.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveExample(example.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeExample === example.id
                    ? `bg-gradient-to-r ${example.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                {example.name}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Example Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExample}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {renderExample()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// useState Example
const UseStateExample = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [todos, setTodos] = useState<string[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [isVisible, setIsVisible] = useState(true)

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo.trim()])
      setNewTodo('')
    }
  }

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">useState Hook Examples</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Counter Example */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Simple Counter</h3>
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-blue-600">{count}</div>
              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCount(count - 1)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                >
                  <Minus className="w-4 h-4" />
                  Decrement
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCount(0)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCount(count + 1)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Increment
                </motion.button>
              </div>
            </div>
          </div>

          {/* Input Example */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Controlled Input</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              {name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 rounded-lg border border-purple-200"
                >
                  <p className="text-purple-800">Hello, <strong>{name}</strong>! 👋</p>
                  <p className="text-sm text-purple-600 mt-1">Character count: {name.length}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Todo List Example */}
        <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Array State Management</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a new todo"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addTodo}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </motion.button>
            </div>
            
            <AnimatePresence>
              <div className="space-y-2">
                {todos.map((todo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white p-3 rounded-lg border border-green-200 flex items-center justify-between"
                  >
                    <span>{todo}</span>
                    <button
                      onClick={() => removeTodo(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
            
            {todos.length === 0 && (
              <p className="text-gray-500 text-center py-4">No todos yet. Add one above!</p>
            )}
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-8 bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Code Example
          </h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [todos, setTodos] = useState<string[]>([])

// Update state
setCount(count + 1)
setName(e.target.value)
setTodos([...todos, newTodo])

// Functional updates for better performance
setCount(prev => prev + 1)
setTodos(prev => [...prev, newTodo])`}
          </pre>
        </div>
      </div>
    </div>
  )
}

// useReducer Example
const UseReducerExample = () => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    history: [0]
  })

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">useReducer Hook Example</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Counter Interface */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Counter</h3>
          <div className="text-center space-y-6">
            <div className="text-6xl font-bold text-purple-600">{state.count}</div>
            
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'DECREMENT' })}
                className="bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
              >
                <Minus className="w-4 h-4" />
                -1
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'INCREMENT' })}
                className="bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                +1
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'SET', payload: 10 })}
                className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600"
              >
                Set to 10
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'RESET' })}
                className="bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </motion.button>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">History</h3>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {state.history.slice(-10).map((value, index) => (
              <div
                key={index}
                className="bg-white p-2 rounded border border-indigo-200 text-sm"
              >
                Step {state.history.length - 10 + index + 1}: {value}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Total steps: {state.history.length}
          </p>
        </div>
      </div>

      {/* Code Example */}
      <div className="mt-8 bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Code className="w-5 h-5" />
          Reducer Implementation
        </h3>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1]
      }
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1]
      }
    case 'RESET':
      return { count: 0, history: [0] }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(counterReducer, {
  count: 0,
  history: [0]
})`}
        </pre>
      </div>
    </div>
  )
}

// Context API Example
const UseContextExample = ({ 
  theme, 
  toggleTheme 
}: { 
  theme: 'light' | 'dark'
  toggleTheme: () => void 
}) => {
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Context API Example</h2>
        </div>

        <div className="space-y-8">
          <ThemeToggleComponent />
          <NestedComponent />
          
          {/* Code Example */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Context Implementation
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Create Context
const ThemeContext = createContext()

// Provider
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  <App />
</ThemeContext.Provider>

// Consumer
const { theme, toggleTheme } = useContext(ThemeContext)`}
            </pre>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

const ThemeToggleComponent = () => {
  const context = useContext(ThemeContext)
  if (!context) return null
  
  const { theme, toggleTheme } = context

  return (
    <div className={`p-6 rounded-xl border-2 transition-colors ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-600 text-white' 
        : 'bg-green-50 border-green-200 text-gray-900'
    }`}>
      <h3 className="text-lg font-semibold mb-4">Theme Toggle Component</h3>
      <div className="flex items-center justify-between">
        <span>Current theme: <strong>{theme}</strong></span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            theme === 'dark'
              ? 'bg-yellow-500 text-yellow-900 hover:bg-yellow-400'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          Switch to {theme === 'dark' ? 'Light' : 'Dark'}
        </motion.button>
      </div>
    </div>
  )
}

const NestedComponent = () => {
  const context = useContext(ThemeContext)
  if (!context) return null
  
  const { theme } = context

  return (
    <div className={`p-6 rounded-xl border-2 transition-colors ${
      theme === 'dark' 
        ? 'bg-gray-700 border-gray-500 text-white' 
        : 'bg-blue-50 border-blue-200 text-gray-900'
    }`}>
      <h3 className="text-lg font-semibold mb-4">Deeply Nested Component</h3>
      <p>This component can access the theme context without prop drilling!</p>
      <p className="text-sm opacity-75 mt-2">
        Theme: {theme} | Accessed via useContext hook
      </p>
    </div>
  )
}

// Zustand Example
const ZustandExample = () => {
  const cart = useCart()
  const todoStats = useTodoStats()
  const user = useAppStore((state) => state.user)
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-900">Zustand Global Store</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cart State */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Shopping Cart</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Items:</span>
              <span className="font-medium">{cart.itemCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-medium">${cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Products:</span>
              <span className="font-medium">{cart.items.length}</span>
            </div>
          </div>
        </div>

        {/* Todo Stats */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Todo Statistics</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-medium">{todoStats.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Completed:</span>
              <span className="font-medium">{todoStats.completed}</span>
            </div>
            <div className="flex justify-between">
              <span>Active:</span>
              <span className="font-medium">{todoStats.active}</span>
            </div>
            <div className="flex justify-between">
              <span>Progress:</span>
              <span className="font-medium">{Math.round(todoStats.completionRate * 100)}%</span>
            </div>
          </div>
        </div>

        {/* User State */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">User Status</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={`font-medium ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
                {isAuthenticated ? 'Logged In' : 'Guest'}
              </span>
            </div>
            {user && (
              <>
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium text-sm">{user.email}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="mt-8 bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Code className="w-5 h-5" />
          Zustand Store Usage
        </h3>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Using Zustand store
const cart = useCart()
const todoStats = useTodoStats()
const user = useAppStore(state => state.user)
const addTodo = useAppStore(state => state.addTodo)

// Accessing computed values
console.log(cart.total) // Auto-calculated
console.log(todoStats.completionRate) // Memoized`}
        </pre>
      </div>
    </div>
  )
}

// Best Practices Example
const BestPracticesExample = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-pink-600" />
          <h2 className="text-2xl font-bold text-gray-900">State Management Best Practices</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* When to Use What */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">When to Use Each Approach</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  useState
                </h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Local component state</li>
                  <li>• Simple values (strings, numbers, booleans)</li>
                  <li>• Form inputs and toggles</li>
                  <li>• UI state (modals, dropdowns)</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  useReducer
                </h4>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• Complex state logic</li>
                  <li>• Multiple related state updates</li>
                  <li>• State with history/undo functionality</li>
                  <li>• Predictable state transitions</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Context API
                </h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Avoid prop drilling</li>
                  <li>• Theme, authentication, language</li>
                  <li>• Configuration data</li>
                  <li>• Infrequently changing data</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  External Stores (Zustand, Redux)
                </h4>
                <ul className="text-orange-800 text-sm space-y-1">
                  <li>• Complex application state</li>
                  <li>• State shared across many components</li>
                  <li>• Persistent state</li>
                  <li>• DevTools and debugging</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance Tips */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Performance Best Practices</h3>
            
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Do&apos;s
                </h4>
                <ul className="text-emerald-800 text-sm space-y-1">
                  <li>• Use functional updates for better performance</li>
                  <li>• Memoize expensive calculations</li>
                  <li>• Split state logically</li>
                  <li>• Use stable selector functions</li>
                  <li>• Implement proper error boundaries</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Don&apos;ts
                </h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Don&apos;t mutate state directly</li>
                  <li>• Avoid creating objects in selectors</li>
                  <li>• Don&apos;t overuse Context for everything</li>
                  <li>• Avoid deep nesting in state</li>
                  <li>• Don&apos;t ignore React&apos;s batching</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Optimization Tips
                </h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Use React.memo for expensive components</li>
                  <li>• Implement useMemo and useCallback wisely</li>
                  <li>• Consider state colocation</li>
                  <li>• Use suspense for async state</li>
                  <li>• Profile with React DevTools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-8 bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Optimization Examples
          </h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Functional updates
setCount(prev => prev + 1)
setTodos(prev => [...prev, newTodo])

// ✅ Good: Memoized selectors
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// ✅ Good: Stable selector
const todoStats = useStore(state => ({
  total: state.todos.length,
  completed: state.todos.filter(t => t.done).length
}), shallow)

// ❌ Bad: Creating objects in render
const stats = { total: todos.length, completed: completed.length }`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default StateManagementPage
