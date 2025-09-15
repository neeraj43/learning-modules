'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Server, Code, Play, FileText, Package, Globe, Database, Terminal, Settings } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'

const NodeJSPage = () => {
  const [activeSection, setActiveSection] = useState('basics')

  const sections = [
    { id: 'basics', name: 'Node.js Basics', icon: '🟢' },
    { id: 'modules', name: 'Modules & NPM', icon: '📦' },
    { id: 'filesystem', name: 'File System', icon: '📁' },
    { id: 'http', name: 'HTTP & Servers', icon: '🌐' },
    { id: 'express', name: 'Express.js', icon: '⚡' },
    { id: 'async', name: 'Async Patterns', icon: '🔄' },
    { id: 'database', name: 'Database Integration', icon: '💾' },
    { id: 'auth', name: 'Authentication', icon: '🔐' },
    { id: 'deployment', name: 'Deployment', icon: '🚀' }
  ]

  const codeExamples = {
    basics: [
      {
        title: 'Node.js Global Objects',
        description: 'Understanding global objects available in Node.js environment',
        code: `// Global objects in Node.js
console.log('Process ID:', process.pid)
console.log('Node version:', process.version)
console.log('Platform:', process.platform)
console.log('Current directory:', process.cwd())
console.log('Environment:', process.env.NODE_ENV || 'development')

// __dirname and __filename (not available in ES modules)
console.log('Current file:', __filename)
console.log('Current directory:', __dirname)

// setTimeout and setInterval (same as browser)
setTimeout(() => {
  console.log('This runs after 1 second')
}, 1000)

// Buffer - Node.js specific
const buffer = Buffer.from('Hello Node.js', 'utf8')
console.log('Buffer:', buffer)
console.log('Buffer to string:', buffer.toString())

// Global object (like window in browser)
console.log('Global object keys:', Object.keys(global).slice(0, 5))`
      },
      {
        title: 'Event Loop and Process',
        description: 'Understanding Node.js event loop and process management',
        code: `// Event loop demonstration
console.log('Start')

// Immediate
setImmediate(() => {
  console.log('setImmediate')
})

// Next tick - highest priority
process.nextTick(() => {
  console.log('nextTick')
})

// Timeout
setTimeout(() => {
  console.log('setTimeout')
}, 0)

// Promise - microtask queue
Promise.resolve().then(() => {
  console.log('Promise')
})

console.log('End')

// Process events
process.on('exit', (code) => {
  console.log(\`Process exiting with code: \${code}\`)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  process.exit(1)
})

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully')
  process.exit(0)
})`
      }
    ],
    modules: [
      {
        title: 'CommonJS vs ES Modules',
        description: 'Understanding different module systems in Node.js',
        code: `// CommonJS (traditional Node.js)
// math.js
function add(a, b) {
  return a + b
}

function multiply(a, b) {
  return a * b
}

module.exports = { add, multiply }
// OR
exports.add = add
exports.multiply = multiply

// Using CommonJS
const { add, multiply } = require('./math')
const math = require('./math')

console.log('Add:', add(5, 3))
console.log('Multiply:', multiply(4, 7))

// ES Modules (modern)
// math.mjs or with "type": "module" in package.json
export function add(a, b) {
  return a + b
}

export function multiply(a, b) {
  return a * b
}

// Default export
export default function subtract(a, b) {
  return a - b
}

// Using ES Modules
import subtract, { add, multiply } from './math.mjs'
// OR
import * as math from './math.mjs'

console.log('Subtract:', subtract(10, 3))`
      },
      {
        title: 'NPM Package Management',
        description: 'Working with NPM packages and package.json',
        code: `// package.json example
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A sample Node.js application",
  "main": "index.js",
  "type": "module", // Use ES modules
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^6.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^28.0.0"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}

// NPM commands
// npm init -y                  // Initialize package.json
// npm install express          // Install dependency
// npm install -D nodemon       // Install dev dependency
// npm install                  // Install all dependencies
// npm update                   // Update packages
// npm audit                    // Security audit
// npm run start                // Run script

// Environment variables with dotenv
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000
const DB_URL = process.env.DATABASE_URL
const JWT_SECRET = process.env.JWT_SECRET

console.log('Server will run on port:', PORT)`
      }
    ],
    filesystem: [
      {
        title: 'File System Operations',
        description: 'Reading, writing, and manipulating files with Node.js',
        code: `import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'

// Synchronous file operations (blocking)
try {
  const data = fs.readFileSync('data.txt', 'utf8')
  console.log('File content:', data)
} catch (error) {
  console.error('Error reading file:', error.message)
}

// Asynchronous with callbacks
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err)
    return
  }
  console.log('Async content:', data)
})

// Asynchronous with Promises
async function fileOperations() {
  try {
    // Read file
    const content = await fsPromises.readFile('data.txt', 'utf8')
    console.log('Promise content:', content)
    
    // Write file
    await fsPromises.writeFile('output.txt', 'Hello Node.js!', 'utf8')
    console.log('File written successfully')
    
    // Append to file
    await fsPromises.appendFile('output.txt', '\\nAppended text', 'utf8')
    
    // Copy file
    await fsPromises.copyFile('output.txt', 'backup.txt')
    
    // Get file stats
    const stats = await fsPromises.stat('output.txt')
    console.log('File size:', stats.size, 'bytes')
    console.log('Is file:', stats.isFile())
    console.log('Is directory:', stats.isDirectory())
    console.log('Created:', stats.birthtime)
    console.log('Modified:', stats.mtime)
    
  } catch (error) {
    console.error('File operation error:', error)
  }
}

fileOperations()`
      },
      {
        title: 'Directory Operations',
        description: 'Working with directories and paths',
        code: `import fs from 'fs/promises'
import path from 'path'

async function directoryOperations() {
  try {
    // Create directory
    await fs.mkdir('uploads', { recursive: true })
    
    // Read directory contents
    const files = await fs.readdir('./')
    console.log('Directory contents:', files)
    
    // Read directory with file types
    const dirents = await fs.readdir('./', { withFileTypes: true })
    dirents.forEach(dirent => {
      console.log(\`\${dirent.name} - \${dirent.isDirectory() ? 'Directory' : 'File'}\`)
    })
    
    // Path operations
    const filePath = path.join('uploads', 'image.jpg')
    console.log('Full path:', filePath)
    console.log('Directory:', path.dirname(filePath))
    console.log('Filename:', path.basename(filePath))
    console.log('Extension:', path.extname(filePath))
    console.log('Filename without ext:', path.parse(filePath).name)
    
    // Resolve absolute path
    console.log('Absolute path:', path.resolve(filePath))
    
    // Check if file/directory exists
    try {
      await fs.access('uploads')
      console.log('uploads directory exists')
    } catch {
      console.log('uploads directory does not exist')
    }
    
  } catch (error) {
    console.error('Directory operation error:', error)
  }
}

directoryOperations()`
      }
    ],
    http: [
      {
        title: 'Basic HTTP Server',
        description: 'Creating HTTP servers with Node.js built-in modules',
        code: `import http from 'http'
import url from 'url'

// Create basic HTTP server
const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url, true)
  const path = parsedUrl.pathname
  const query = parsedUrl.query
  const method = req.method
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // Handle different routes
  if (path === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>Welcome to Node.js Server!</h1>')
    
  } else if (path === '/api/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]
    res.end(JSON.stringify(users))
    
  } else if (path === '/api/users' && method === 'POST') {
    let body = ''
    
    req.on('data', chunk => {
      body += chunk.toString()
    })
    
    req.on('end', () => {
      try {
        const userData = JSON.parse(body)
        console.log('Received user data:', userData)
        
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ 
          message: 'User created successfully',
          user: userData 
        }))
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Invalid JSON' }))
      }
    })
    
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Route not found' }))
  }
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`)
})

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error)
})`
      }
    ],
    express: [
      {
        title: 'Express.js Basics',
        description: 'Building web applications with Express.js framework',
        code: `import express from 'express'
import cors from 'cors'

const app = express()

// Middleware
app.use(cors())
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

// Logging middleware
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url}\`)
  next()
})

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express API!' })
})

// Route parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  res.json({ userId, message: \`User \${userId} details\` })
})

// Query parameters
app.get('/search', (req, res) => {
  const { q, page = 1, limit = 10 } = req.query
  res.json({ 
    query: q,
    page: parseInt(page),
    limit: parseInt(limit),
    results: []
  })
})

// POST route with validation
app.post('/users', (req, res) => {
  const { name, email, age } = req.body
  
  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Name and email are required' 
    })
  }
  
  // Simulate user creation
  const newUser = {
    id: Date.now(),
    name,
    email,
    age: age || null,
    createdAt: new Date().toISOString()
  }
  
  res.status(201).json({ 
    message: 'User created successfully',
    user: newUser 
  })
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error)
  res.status(500).json({ error: 'Internal server error' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(\`Express server running on port \${PORT}\`)
})`
      }
    ]
  }

  const renderSection = () => {
    const examples = codeExamples[activeSection as keyof typeof codeExamples] || []
    
    return (
      <div className="space-y-8">
        {examples.map((example, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {example.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {example.description}
              </p>
              
              <CodeEditor
                title={example.title}
                initialCode={example.code}
                height="300px"
              />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Node.js Development
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master server-side JavaScript with Node.js - from basics to advanced patterns, 
              APIs, database integration, and deployment strategies.
            </p>
          </motion.div>

          {/* Interactive Node.js Playground */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">Node.js Playground</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Experiment with Node.js concepts! Try server-side JavaScript and see instant results.
              </p>
              <CodeEditor
                title="Node.js Playground"
                initialCode={`// Welcome to Node.js!
// Try these Node.js specific examples:

// 1. Process information
console.log('Node.js version:', process.version)
console.log('Platform:', process.platform)

// 2. Global objects
console.log('Current working directory:', process.cwd())

// 3. Environment variables
console.log('NODE_ENV:', process.env.NODE_ENV || 'development')

// 4. Buffer operations
const buffer = Buffer.from('Hello Node.js!')
console.log('Buffer:', buffer.toString())

// 5. Async operations
setTimeout(() => {
  console.log('This runs asynchronously!')
}, 100)

// 6. Event loop demonstration
setImmediate(() => console.log('setImmediate'))
process.nextTick(() => console.log('nextTick'))

console.log('Synchronous code runs first!')

// Try your own Node.js code below:
`}
                height="350px"
              />
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
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

          {/* Learning Path */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🚀 Node.js Learning Path
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">🌱</div>
                <h3 className="font-semibold mb-2">Beginner</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Node.js basics & global objects</li>
                  <li>• Modules & NPM</li>
                  <li>• File system operations</li>
                  <li>• Basic HTTP servers</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">🔧</div>
                <h3 className="font-semibold mb-2">Intermediate</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Express.js framework</li>
                  <li>• Async patterns & promises</li>
                  <li>• Database integration</li>
                  <li>• Authentication & security</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">🚀</div>
                <h3 className="font-semibold mb-2">Advanced</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Microservices architecture</li>
                  <li>• Performance optimization</li>
                  <li>• Testing & debugging</li>
                  <li>• Production deployment</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default NodeJSPage
