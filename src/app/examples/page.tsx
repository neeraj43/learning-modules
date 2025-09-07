'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  CheckSquare, 
  User, 
  Moon, 
  Sun, 
  Plus,
  Minus,
  Trash2,
  Bell,
  X,
  Star,
  Filter,
  Calendar,
  Timer,
  Target
} from 'lucide-react'
import { useAppStore, useUser, useTheme, useTodos, useCart, useTodoStats } from '@/store/useAppStore'

const ExamplesPage = () => {
  const [activeExample, setActiveExample] = useState('todo')

  const examples = [
    { id: 'todo', name: 'Todo App', icon: CheckSquare },
    { id: 'cart', name: 'Shopping Cart', icon: ShoppingCart },
    { id: 'auth', name: 'Authentication', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ]

  const renderExample = () => {
    switch (activeExample) {
      case 'todo':
        return <TodoExample />
      case 'cart':
        return <CartExample />
      case 'auth':
        return <AuthExample />
      case 'notifications':
        return <NotificationExample />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-4">
            Real-World Examples
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete applications demonstrating JavaScript, React, and Next.js concepts in action
          </p>
        </motion.div>

        {/* Theme Toggle */}
        <ThemeToggle />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 lg:sticky lg:top-24 lg:h-fit">
            <nav className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Examples</h3>
              <div className="space-y-2">
                {examples.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => setActiveExample(example.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                      activeExample === example.id
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <example.icon className="w-4 h-4" />
                    <span className="font-medium">{example.name}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderExample()}
          </div>
        </div>
      </div>
    </div>
  )
}

// Theme Toggle Component
const ThemeToggle = () => {
  const theme = useTheme()
  const { toggleTheme } = useAppStore()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-20 right-4 z-40"
    >
      <button
        onClick={toggleTheme}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </motion.div>
  )
}

// Todo Example
const TodoExample = () => {
  const [newTodo, setNewTodo] = useState('')
  const [newCategory, setNewCategory] = useState('work')
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium')
  
  const todos = useTodos()
  const stats = useTodoStats()
  const filter = useAppStore((state) => state.filter)
  const addTodo = useAppStore((state) => state.addTodo)
  const toggleTodo = useAppStore((state) => state.toggleTodo)
  const deleteTodo = useAppStore((state) => state.deleteTodo)
  const setFilter = useAppStore((state) => state.setFilter)
  const clearCompleted = useAppStore((state) => state.clearCompleted)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo.trim(), newCategory, newPriority)
      setNewTodo('')
    }
  }

  const categories = ['work', 'personal', 'shopping', 'health', 'learning']
  const priorities = [
    { value: 'low', label: 'Low', color: 'green' },
    { value: 'medium', label: 'Medium', color: 'yellow' },
    { value: 'high', label: 'High', color: 'red' }
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Todo Application</h2>
        <div className="flex gap-2">
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Zustand Store
          </span>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            Local Storage
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-800">Total</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-green-800">Completed</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
          <div className="text-sm text-orange-800">Active</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(stats.completionRate * 100)}%
          </div>
          <div className="text-sm text-purple-800">Complete</div>
        </div>
      </div>

      {/* Add Todo Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {priorities.map(priority => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex gap-2">
          {(['all', 'active', 'completed'] as const).map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
        
        {stats.completed > 0 && (
          <button
            onClick={clearCompleted}
            className="text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            Clear Completed
          </button>
        )}
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4 text-purple-600"
              />
              
              <div className="flex-1">
                <div className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {todo.text}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {todo.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                    todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {todo.priority}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {todos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <CheckSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No todos yet. Add one above to get started!</p>
        </div>
      )}
    </motion.div>
  )
}

// Shopping Cart Example
const CartExample = () => {
  const cart = useCart()
  const addToCart = useAppStore((state) => state.addToCart)
  const removeFromCart = useAppStore((state) => state.removeFromCart)
  const updateQuantity = useAppStore((state) => state.updateQuantity)
  const clearCart = useAppStore((state) => state.clearCart)

  const products = [
    { id: '1', name: 'JavaScript Course', price: 99.99, image: '📚' },
    { id: '2', name: 'React Bootcamp', price: 149.99, image: '⚛️' },
    { id: '3', name: 'Next.js Masterclass', price: 199.99, image: '🚀' },
    { id: '4', name: 'TypeScript Guide', price: 79.99, image: '📘' },
    { id: '5', name: 'Node.js Backend', price: 129.99, image: '💻' },
    { id: '6', name: 'Database Design', price: 89.99, image: '🗄️' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Products */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Online Course Store</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{product.image}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-xl font-bold text-green-600 mb-3">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Cart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Shopping Cart ({cart.itemCount} items)
          </h2>
          {cart.items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.items.length > 0 ? (
          <div className="space-y-4">
            {cart.items.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="text-2xl">{products.find(p => p.id === item.id)?.image}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-green-600">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="text-right text-xl font-bold">
                Total: ${cart.total.toFixed(2)}
              </div>
              <button className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Your cart is empty. Add some courses above!</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Authentication Example
const AuthExample = () => {
  const user = useUser()
  const { login, logout } = useAppStore()
  const [loginForm, setLoginForm] = useState({ name: '', email: '' })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.name && loginForm.email) {
      login({
        id: Date.now().toString(),
        name: loginForm.name,
        email: loginForm.email,
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: true
        }
      })
      setLoginForm({ name: '', email: '' })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Authentication</h2>

      {user ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Welcome back!</h3>
            <p className="text-green-700">Name: {user.name}</p>
            <p className="text-green-700">Email: {user.email}</p>
            <p className="text-green-700">Theme: {user.preferences.theme}</p>
            <p className="text-green-700">
              Notifications: {user.preferences.notifications ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={loginForm.name}
              onChange={(e) => setLoginForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Login
          </button>
        </form>
      )}
    </motion.div>
  )
}

// Notification Example
const NotificationExample = () => {
  const notifications = useAppStore(state => state.notifications)
  const { addNotification, removeNotification, clearNotifications } = useAppStore()
  const [message, setMessage] = useState('')

  const notificationTypes = [
    { type: 'success', message: '✅ Operation completed successfully!' },
    { type: 'warning', message: '⚠️ Please check your input' },
    { type: 'error', message: '❌ Something went wrong' },
    { type: 'info', message: 'ℹ️ Here\'s some useful information' }
  ]

  const handleAddNotification = () => {
    if (message.trim()) {
      addNotification(message)
      setMessage('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification System</h2>

      <div className="space-y-4">
        {/* Add Custom Notification */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAddNotification}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Pre-defined Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {notificationTypes.map((notif, index) => (
            <button
              key={index}
              onClick={() => addNotification(notif.message)}
              className="text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {notif.message}
            </button>
          ))}
        </div>

        {/* Clear All */}
        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            Clear All Notifications
          </button>
        )}

        {/* Notifications Display */}
        <div className="space-y-2">
          <h3 className="font-semibold">Active Notifications ({notifications.length})</h3>
          <AnimatePresence>
            {notifications.map((notification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <span>{notification}</span>
                <button
                  onClick={() => removeNotification(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No notifications. Add some above to see them here!</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ExamplesPage
