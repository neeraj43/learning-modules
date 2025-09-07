'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Welcome, 
  Counter, 
  EventExamples, 
  ConditionalRendering, 
  ListExamples, 
  ControlledForm,
  LikeButton
} from '@/components/examples/ReactBasicExamples'

const ReactPage = () => {
  const [activeSection, setActiveSection] = useState('components')

  const sections = [
    { id: 'components', name: 'Components & Props', icon: '🧱' },
    { id: 'state', name: 'State Management', icon: '📊' },
    { id: 'events', name: 'Event Handling', icon: '⚡' },
    { id: 'conditional', name: 'Conditional Rendering', icon: '🔀' },
    { id: 'lists', name: 'Lists & Keys', icon: '📋' },
    { id: 'forms', name: 'Forms & Controlled Components', icon: '📝' },
    { id: 'effects', name: 'Side Effects', icon: '🔄' }
  ]

  const conceptExplanations = {
    components: {
      title: 'Components & Props',
      description: 'React components are the building blocks of any React application. They accept props (properties) as input and return JSX elements.',
      keyPoints: [
        'Components can be functional or class-based (functional preferred)',
        'Props are read-only and passed from parent to child',
        'Components should be pure functions when possible',
        'Use TypeScript interfaces for prop validation'
      ],
      code: `interface WelcomeProps {
  name: string
  age?: number
  isVip?: boolean
}

const Welcome: React.FC<WelcomeProps> = ({ name, age, isVip = false }) => {
  return (
    <div className={\`p-4 rounded-lg \${isVip ? 'bg-yellow-100' : 'bg-gray-100'}\`}>
      <h3>Welcome, {name}!</h3>
      {age && <p>Age: {age}</p>}
      {isVip && <span>VIP Member</span>}
    </div>
  )
}`
    },
    state: {
      title: 'State Management',
      description: 'State allows components to create and manage their own data. When state changes, the component re-renders.',
      keyPoints: [
        'Use useState hook for local component state',
        'State updates are asynchronous',
        'Always use functional updates for state that depends on previous state',
        'State should be immutable - never mutate directly'
      ],
      code: `const [count, setCount] = useState(0)
const [step, setStep] = useState(1)

// Functional update - recommended when new state depends on previous
const increment = () => setCount(prev => prev + step)
const decrement = () => setCount(prev => prev - step)

// Direct update - fine when not depending on previous state
const reset = () => setCount(0)`
    },
    events: {
      title: 'Event Handling',
      description: 'React uses SyntheticEvents which wrap native DOM events to provide consistent behavior across browsers.',
      keyPoints: [
        'Event handlers receive SyntheticEvent objects',
        'Use arrow functions or bind to preserve "this" context',
        'Prevent default behavior with e.preventDefault()',
        'Stop event propagation with e.stopPropagation()'
      ],
      code: `const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault() // Prevent form submission
  // Handle form logic
}

const handleClick = (e: React.MouseEvent) => {
  console.log('Clicked at:', e.clientX, e.clientY)
}

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    // Handle enter key
  }
}`
    },
    conditional: {
      title: 'Conditional Rendering',
      description: 'Conditionally render JSX elements based on state or props using JavaScript logical operators.',
      keyPoints: [
        'Use && for simple conditional rendering',
        'Use ternary operator for if-else conditions',
        'Extract complex conditions into variables',
        'Use early returns for cleaner code'
      ],
      code: `// Simple conditional with &&
{isLoggedIn && <UserDashboard />}

// Ternary operator for if-else
{isLoggedIn ? <UserDashboard /> : <LoginForm />}

// Multiple conditions
{userType === 'admin' && <AdminPanel />}
{userType === 'user' && <UserPanel />}
{userType === 'guest' && <GuestPanel />}`
    },
    lists: {
      title: 'Lists & Keys',
      description: 'Render lists of elements using map() function. Keys help React identify which items have changed.',
      keyPoints: [
        'Use map() to transform arrays into JSX elements',
        'Always provide unique keys for list items',
        'Keys should be stable, predictable, and unique',
        'Avoid using array indices as keys when possible'
      ],
      code: `const items = [
  { id: 1, name: 'Apple', price: 1.50 },
  { id: 2, name: 'Banana', price: 0.75 }
]

// Render list with proper keys
{items.map(item => (
  <div key={item.id}>
    <span>{item.name}</span>
    <span>\${item.price}</span>
  </div>
))}`
    },
    forms: {
      title: 'Forms & Controlled Components',
      description: 'Controlled components have their value controlled by React state, making form handling predictable.',
      keyPoints: [
        'Controlled components get their value from state',
        'onChange handlers update the state',
        'Single source of truth for form data',
        'Easier to validate and manipulate form data'
      ],
      code: `const [formData, setFormData] = useState({
  name: '',
  email: ''
})

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({
    ...prev,
    [name]: value
  }))
}

// Controlled input
<input
  name="name"
  value={formData.name}
  onChange={handleChange}
/>`
    },
    effects: {
      title: 'Side Effects',
      description: 'useEffect hook lets you perform side effects in functional components (data fetching, subscriptions, etc.).',
      keyPoints: [
        'useEffect runs after every render by default',
        'Dependency array controls when effect runs',
        'Empty dependency array means effect runs once',
        'Return cleanup function to prevent memory leaks'
      ],
      code: `// Effect that runs once on mount
useEffect(() => {
  fetchData()
}, [])

// Effect that runs when dependency changes
useEffect(() => {
  updateTitle(count)
}, [count])

// Effect with cleanup
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick')
  }, 1000)
  
  return () => clearInterval(timer)
}, [])`
    }
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'components':
        return (
          <div className="space-y-6">
            <Welcome name="John Doe" age={30} />
            <Welcome name="Jane Smith" isVip />
            <Welcome name="Bob Wilson" />
          </div>
        )
      case 'state':
        return <Counter />
      case 'events':
        return <EventExamples />
      case 'conditional':
        return <ConditionalRendering />
      case 'lists':
        return <ListExamples />
      case 'forms':
        return <ControlledForm />
      case 'effects':
        return <LikeButton />
      default:
        return null
    }
  }

  const currentConcept = conceptExplanations[activeSection as keyof typeof conceptExplanations]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-4">
            React Concepts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master React fundamentals with interactive examples and hands-on demonstrations
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 lg:sticky lg:top-24 lg:h-fit">
            <nav className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">React Concepts</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Concept Explanation */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentConcept.title}</h2>
              <p className="text-gray-600 mb-6">{currentConcept.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Key Points */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Points:</h3>
                  <ul className="space-y-2">
                    {currentConcept.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Example */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Code Example:</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{currentConcept.code}</code>
                  </pre>
                </div>
              </div>
            </motion.div>

            {/* Interactive Demo */}
            <motion.div
              key={`demo-${activeSection}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Interactive Demo</h2>
              {renderSection()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReactPage
