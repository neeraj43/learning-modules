'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef, useReducer } from 'react'
import { motion } from 'framer-motion'
import { Heart, ThumbsUp, Star, Plus, Minus, RefreshCw } from 'lucide-react'

// 1. FUNCTIONAL COMPONENT WITH PROPS
interface WelcomeProps {
  name: string
  age?: number
  isVip?: boolean
}

export const Welcome: React.FC<WelcomeProps> = ({ name, age, isVip = false }) => {
  return (
    <div className={`p-4 rounded-lg ${isVip ? 'bg-gold bg-yellow-100 border-yellow-300' : 'bg-gray-100'} border`}>
      <h3 className="font-semibold">Welcome, {name}!</h3>
      {age && <p className="text-gray-600">Age: {age}</p>}
      {isVip && <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">VIP Member</span>}
    </div>
  )
}

// 2. STATE MANAGEMENT WITH USESTATE
export const Counter = () => {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  const increment = () => setCount(prev => prev + step)
  const decrement = () => setCount(prev => prev - step)
  const reset = () => setCount(0)

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Counter Example</h3>
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-4">{count}</div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={decrement}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={increment}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={reset}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Step:</label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="w-16 px-2 py-1 border rounded text-center"
            min="1"
          />
        </div>
      </div>
    </div>
  )
}

// 3. EVENT HANDLING
export const EventExamples = () => {
  const [message, setMessage] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [keyPressed, setKeyPressed] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Message submitted: ${message}`)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setKeyPressed(e.key)
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Event Handling</h3>
      
      {/* Form Event */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message..."
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Mouse Event */}
      <div
        onMouseMove={handleMouseMove}
        className="bg-gray-100 p-4 rounded mb-4 h-32 flex items-center justify-center cursor-crosshair"
      >
        <div>
          <p className="text-sm text-gray-600">Move mouse here</p>
          <p className="text-xs">Position: ({mousePosition.x}, {mousePosition.y})</p>
        </div>
      </div>

      {/* Keyboard Event */}
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Type here to see key events..."
        className="w-full px-3 py-2 border rounded"
      />
      {keyPressed && (
        <p className="text-sm text-gray-600 mt-2">Last key pressed: <code className="bg-gray-200 px-1 rounded">{keyPressed}</code></p>
      )}
    </div>
  )
}

// 4. CONDITIONAL RENDERING
export const ConditionalRendering = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<'guest' | 'user' | 'admin'>('guest')
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Conditional Rendering</h3>
      
      <div className="space-y-4">
        {/* Simple conditional */}
        <div>
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className={`px-4 py-2 rounded transition-colors ${
              isLoggedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
          
          {isLoggedIn && (
            <p className="mt-2 text-green-600">Welcome back! You are logged in.</p>
          )}
        </div>

        {/* Ternary operator */}
        <div>
          <p className="mb-2">Status: {isLoggedIn ? '✅ Authenticated' : '❌ Not authenticated'}</p>
        </div>

        {/* Multiple conditions */}
        <div>
          <div className="flex gap-2 mb-2">
            {(['guest', 'user', 'admin'] as const).map(type => (
              <button
                key={type}
                onClick={() => setUserType(type)}
                className={`px-3 py-1 rounded text-sm ${
                  userType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          {userType === 'guest' && <p className="text-gray-600">Please log in to continue</p>}
          {userType === 'user' && <p className="text-blue-600">Welcome, user!</p>}
          {userType === 'admin' && <p className="text-purple-600">Admin access granted</p>}
        </div>

        {/* Toggle details */}
        <div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            {showDetails ? 'Hide' : 'Show'} Details
          </button>
          
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 p-3 bg-gray-100 rounded"
            >
              <p>These are the additional details that can be toggled on and off.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

// 5. LISTS AND KEYS
export const ListExamples = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', category: 'Fruit', price: 1.50 },
    { id: 2, name: 'Banana', category: 'Fruit', price: 0.75 },
    { id: 3, name: 'Carrot', category: 'Vegetable', price: 0.60 },
    { id: 4, name: 'Broccoli', category: 'Vegetable', price: 2.00 }
  ])
  const [filter, setFilter] = useState<'all' | 'Fruit' | 'Vegetable'>('all')
  const [newItem, setNewItem] = useState('')

  const filteredItems = items.filter(item => 
    filter === 'all' || item.category === filter
  )

  const addItem = () => {
    if (newItem.trim()) {
      const newId = Math.max(...items.map(item => item.id)) + 1
      setItems(prev => [...prev, {
        id: newId,
        name: newItem,
        category: 'Fruit',
        price: 1.00
      }])
      setNewItem('')
    }
  }

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Lists and Keys</h3>
      
      {/* Add new item */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={addItem}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        {(['all', 'Fruit', 'Vegetable'] as const).map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1 rounded text-sm ${
              filter === filterType ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Items list */}
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded border"
          >
            <div>
              <span className="font-medium text-gray-900">{item.name}</span>
              <span className="text-sm text-gray-800 ml-2 font-medium">({item.category})</span>
              <span className="text-sm text-green-700 ml-2 font-semibold">${item.price.toFixed(2)}</span>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Remove
            </button>
          </motion.div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <p className="text-gray-900 text-center py-4 font-medium">No items found</p>
      )}
    </div>
  )
}

// 6. CONTROLLED COMPONENTS (FORMS)
export const ControlledForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    country: '',
    interests: [] as string[],
    newsletter: false,
    comments: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Form submitted! Check console for data.')
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      country: '',
      interests: [],
      newsletter: false,
      comments: ''
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Controlled Form Components</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Number Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="120"
          />
        </div>

        {/* Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="au">Australia</option>
          </select>
        </div>

        {/* Checkboxes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
          <div className="space-y-2">
            {['Technology', 'Sports', 'Music', 'Travel', 'Reading'].map(interest => (
              <label key={interest} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                  className="mr-2"
                />
                {interest}
              </label>
            ))}
          </div>
        </div>

        {/* Single Checkbox */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
              className="mr-2"
            />
            Subscribe to newsletter
          </label>
        </div>

        {/* Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any additional comments..."
          />
        </div>

        {/* Submit and Reset */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Form Data Preview */}
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h4 className="font-medium mb-2">Form Data Preview:</h4>
        <pre className="text-sm text-gray-600 whitespace-pre-wrap">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  )
}

// 7. LIKE BUTTON WITH EFFECT
export const LikeButton = () => {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [likeHistory, setLikeHistory] = useState<string[]>([])

  useEffect(() => {
    // Simulate loading likes from API
    const savedLikes = localStorage.getItem('likes')
    if (savedLikes) {
      setLikes(parseInt(savedLikes))
    }
  }, [])

  useEffect(() => {
    // Save likes to localStorage whenever it changes
    localStorage.setItem('likes', likes.toString())
  }, [likes])

  useEffect(() => {
    // Add to history when liked
    if (isLiked) {
      const timestamp = new Date().toLocaleTimeString()
      setLikeHistory(prev => [...prev.slice(-4), `Liked at ${timestamp}`])
    }
  }, [isLiked])

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1)
      setIsLiked(true)
    } else {
      setLikes(prev => prev - 1)
      setIsLiked(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">useEffect Example</h3>
      
      <div className="text-center">
        <motion.button
          onClick={handleLike}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 mx-auto px-6 py-3 rounded-full transition-colors ${
            isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
        </motion.button>

        {likeHistory.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium mb-2">Recent Activity:</p>
            <ul className="space-y-1">
              {likeHistory.map((entry, index) => (
                <li key={index} className="text-xs">{entry}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
