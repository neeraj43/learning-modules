'use client'

import React, { 
  useState, 
  useEffect, 
  useContext, 
  useReducer, 
  useCallback, 
  useMemo, 
  useRef, 
  createContext,
  forwardRef,
  useImperativeHandle
} from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Square, RotateCcw, Plus, Minus } from 'lucide-react'

// Context for useContext example
const ThemeContext = createContext<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
}>({
  theme: 'light',
  toggleTheme: () => {}
})

const UserContext = createContext<{
  user: { name: string; role: string } | null
  setUser: (user: { name: string; role: string } | null) => void
}>({
  user: null,
  setUser: () => {}
})

// 1. useState Examples
export const UseStateExamples = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">useState Hook</h3>
      
      <div className="space-y-6">
        {/* Simple Counter */}
        <div>
          <h4 className="font-medium mb-2">Simple State</h4>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount(c => c - 1)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xl font-semibold">{count}</span>
            <button
              onClick={() => setCount(c => c + 1)}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Input State */}
        <div>
          <h4 className="font-medium mb-2">Input State</h4>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="px-3 py-2 border rounded mr-2"
          />
          {name && <span className="text-blue-600">Hello, {name}!</span>}
        </div>

        {/* Complex State (Array of Objects) */}
        <div>
          <h4 className="font-medium mb-2">Complex State - Todo List</h4>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new todo..."
              className="flex-1 px-3 py-2 border rounded"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {todos.map(todo => (
              <div key={todo.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 2. useEffect Examples
export const UseEffectExamples = () => {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [posts, setPosts] = useState<{id: number; title: string; body: string}[]>([])
  const [loading, setLoading] = useState(false)

  // Effect with cleanup (timer)
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  // Effect that runs once (component mount)
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Effect with dependency
  useEffect(() => {
    document.title = `Timer: ${seconds}s`
    return () => {
      document.title = 'Complete Developer Learning Hub'
    }
  }, [seconds])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockPosts = [
        { id: 1, title: 'First Post', body: 'This is the first post' },
        { id: 2, title: 'Second Post', body: 'This is the second post' },
        { id: 3, title: 'Third Post', body: 'This is the third post' }
      ]
      setPosts(mockPosts)
    } finally {
      setLoading(false)
    }
  }

  const resetTimer = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">useEffect Hook</h3>
      
      <div className="space-y-6">
        {/* Timer with cleanup */}
        <div>
          <h4 className="font-medium mb-2">Timer with Cleanup</h4>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-4">{seconds}s</div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-white ${
                  isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={resetTimer}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Window width tracker */}
        <div>
          <h4 className="font-medium mb-2">Window Resize Listener</h4>
          <p className="text-gray-600">Current window width: <span className="font-semibold">{windowWidth}px</span></p>
          <p className="text-sm text-gray-700">Resize your browser window to see the effect!</p>
        </div>

        {/* Data fetching */}
        <div>
          <h4 className="font-medium mb-2">Data Fetching</h4>
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 mb-3"
          >
            {loading ? 'Loading...' : 'Fetch Posts'}
          </button>
          {posts.length > 0 && (
            <div className="space-y-2">
              {posts.map(post => (
                <div key={post.id} className="p-3 bg-gray-50 rounded">
                  <h5 className="font-medium">{post.title}</h5>
                  <p className="text-sm text-gray-600">{post.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 3. useContext Examples
export const UseContextExamples = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  const login = () => setUser({ name: 'John Doe', role: 'admin' })
  const logout = () => setUser(null)

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">useContext Hook</h3>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={toggleTheme}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Toggle Theme ({theme})
              </button>
              <button
                onClick={user ? logout : login}
                className={`px-4 py-2 rounded text-white ${
                  user ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {user ? 'Logout' : 'Login'}
              </button>
            </div>
            
            <ThemedComponent />
            <UserDisplay />
          </div>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

const ThemedComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  return (
    <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <p>This component uses the theme context: <strong>{theme}</strong></p>
      <button
        onClick={toggleTheme}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Toggle from child
      </button>
    </div>
  )
}

const UserDisplay = () => {
  const { user } = useContext(UserContext)
  
  return (
    <div className="p-4 bg-blue-50 rounded">
      {user ? (
        <div>
          <p><strong>Welcome, {user.name}!</strong></p>
          <p className="text-sm text-gray-600">Role: {user.role}</p>
        </div>
      ) : (
        <p className="text-gray-600">Please log in to see user information</p>
      )}
    </div>
  )
}

// 4. useReducer Example
type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number }

const counterReducer = (state: number, action: CounterAction): number => {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    case 'reset':
      return 0
    case 'set':
      return action.payload
    default:
      return state
  }
}

export const UseReducerExample = () => {
  const [count, dispatch] = useReducer(counterReducer, 0)
  const [inputValue, setInputValue] = useState('')

  const setCustomValue = () => {
    const value = parseInt(inputValue)
    if (!isNaN(value)) {
      dispatch({ type: 'set', payload: value })
      setInputValue('')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">useReducer Hook</h3>
      
      <div className="text-center space-y-4">
        <div className="text-3xl font-bold text-purple-600">{count}</div>
        
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => dispatch({ type: 'decrement' })}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Decrement
          </button>
          <button
            onClick={() => dispatch({ type: 'increment' })}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Increment
          </button>
          <button
            onClick={() => dispatch({ type: 'reset' })}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        <div className="flex gap-2 justify-center">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Set custom value"
            className="px-3 py-2 border rounded"
          />
          <button
            onClick={setCustomValue}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Set Value
          </button>
        </div>

        <div className="text-sm text-gray-600 mt-4">
          <p>useReducer is useful for complex state logic</p>
          <p>Actions: increment, decrement, reset, set</p>
        </div>
      </div>
    </div>
  )
}

// 5. useCallback and useMemo Examples
export const UseCallbackUseMemoExample = () => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<number[]>([])
  const [input, setInput] = useState('')

  // Expensive calculation that we want to memoize
  const expensiveCalculation = useMemo(() => {
    console.log('Calculating expensive value...')
    let result = 0
    for (let i = 0; i < count * 1000000; i++) {
      result += i
    }
    return result
  }, [count])

  // Function that we want to memoize to prevent child re-renders
  const addItem = useCallback(() => {
    setItems(prev => [...prev, Math.random()])
  }, [])

  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }, [])

  // Filtered items memoized
  const filteredItems = useMemo(() => {
    console.log('Filtering items...')
    return items.filter(item => item.toString().includes(input))
  }, [items, input])

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">useCallback & useMemo Hooks</h3>
      
      <div className="space-y-6">
        {/* useMemo example */}
        <div>
          <h4 className="font-medium mb-2">useMemo - Expensive Calculation</h4>
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={() => setCount(c => c + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Increment Count ({count})
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Expensive result: {expensiveCalculation}
            <br />
            <em>Check console to see when calculation runs</em>
          </p>
        </div>

        {/* useCallback example */}
        <div>
          <h4 className="font-medium mb-2">useCallback - Stable Function References</h4>
          <button
            onClick={addItem}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-3"
          >
            Add Random Item
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Filter items..."
            className="w-full px-3 py-2 border rounded mb-3"
          />

          <div className="space-y-2">
            {filteredItems.map((item, index) => (
              <div key={item} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">{item.toFixed(6)}</span>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 mt-2">
            Items count: {items.length} | Filtered: {filteredItems.length}
            <br />
            <em>Check console to see when filtering runs</em>
          </p>
        </div>
      </div>
    </div>
  )
}

// 6. useRef Examples
export const UseRefExample = () => {
  const [count, setCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const prevCountRef = useRef<number>(0)
  const renderCountRef = useRef(0)

  useEffect(() => {
    prevCountRef.current = count
    renderCountRef.current += 1
  })

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">useRef Hook</h3>
      
      <div className="space-y-6">
        {/* DOM reference */}
        <div>
          <h4 className="font-medium mb-2">DOM Reference</h4>
          <div className="flex gap-2 mb-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="This input can be focused programmatically"
              className="flex-1 px-3 py-2 border rounded"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={focusInput}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Focus Input
            </button>
            <button
              onClick={clearInput}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear & Focus
            </button>
          </div>
        </div>

        {/* Persistent values */}
        <div>
          <h4 className="font-medium mb-2">Persistent Values (Don&apos;t Trigger Re-renders)</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCount(c => c + 1)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Increment Count
              </button>
              <span className="font-semibold">Current: {count}</span>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p>Previous count: {prevCountRef.current ?? 'N/A'}</p>
              <p>Render count: {renderCountRef.current}</p>
              <p className="italic">useRef values persist between renders without causing re-renders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 7. Custom Hook Example
const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      }
      return initialValue
    } catch (error) {
      console.error('Error reading localStorage:', error)
      return initialValue
    }
  })

  const setValue = (value: string | ((val: string) => string)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error('Error setting localStorage:', error)
    }
  }

  return [storedValue, setValue] as const
}

export const CustomHookExample = () => {
  const [name, setName] = useLocalStorage('user-name', '')
  const [email, setEmail] = useLocalStorage('user-email', '')
  const [notes, setNotes] = useLocalStorage('user-notes', '')

  const clearAll = () => {
    setName('')
    setEmail('')
    setNotes('')
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Custom Hook - useLocalStorage</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter some notes"
            rows={3}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={clearAll}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear All
          </button>
        </div>

        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
          <p className="font-medium mb-1">Custom Hook Benefits:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Reusable state logic</li>
            <li>Automatic localStorage synchronization</li>
            <li>Error handling built-in</li>
            <li>Data persists across page refreshes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
