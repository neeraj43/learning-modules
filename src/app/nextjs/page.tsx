'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Server, 
  Globe, 
  Zap, 
  Database, 
  Route, 
  Code, 
  FileText, 
  Layers,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface Post {
  id: number
  title: string
  content: string
  author: string
  category: string
  tags: string[]
  publishedAt: string
  views: number
  likes: number
}

interface ApiResponse<T> {
  success: boolean
  data: T
  total?: number
  message?: string
  error?: string
}

const NextJSPage = () => {
  const [activeSection, setActiveSection] = useState('routing')
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [apiResults, setApiResults] = useState<Record<string, any>>({})

  const sections = [
    { id: 'routing', name: 'File-based Routing', icon: Route },
    { id: 'api', name: 'API Routes', icon: Server },
    { id: 'rendering', name: 'Rendering Methods', icon: Globe },
    { id: 'optimization', name: 'Performance', icon: Zap },
    { id: 'middleware', name: 'Middleware', icon: Layers },
    { id: 'features', name: 'Built-in Features', icon: FileText }
  ]

  // API Examples
  const fetchUsers = async (filters?: { role?: string; limit?: number }) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters?.role) params.append('role', filters.role)
      if (filters?.limit) params.append('limit', filters.limit.toString())
      
      const response = await fetch(`/api/users?${params}`)
      const result: ApiResponse<User[]> = await response.json()
      
      if (result.success) {
        setUsers(result.data)
        setApiResults(prev => ({ ...prev, users: result }))
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPosts = async (filters?: { category?: string; limit?: number }) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters?.category) params.append('category', filters.category)
      if (filters?.limit) params.append('limit', filters.limit.toString())
      
      const response = await fetch(`/api/posts?${params}`)
      const result: ApiResponse<Post[]> = await response.json()
      
      if (result.success) {
        setPosts(result.data)
        setApiResults(prev => ({ ...prev, posts: result }))
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (userData: { name: string; email: string; role: string }) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      const result: ApiResponse<User> = await response.json()
      
      if (result.success) {
        await fetchUsers() // Refresh list
        setApiResults(prev => ({ ...prev, createUser: result }))
      }
      
      return result
    } catch (error) {
      console.error('Error creating user:', error)
      return { success: false, error: 'Network error' }
    }
  }

  useEffect(() => {
    // Initial data fetch
    fetchUsers({ limit: 3 })
    fetchPosts({ limit: 3 })
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case 'routing':
        return <RoutingSection />
      case 'api':
        return (
          <ApiSection 
            users={users}
            posts={posts}
            loading={loading}
            onFetchUsers={fetchUsers}
            onFetchPosts={fetchPosts}
            onCreateUser={createUser}
            apiResults={apiResults}
          />
        )
      case 'rendering':
        return <RenderingSection />
      case 'optimization':
        return <OptimizationSection />
      case 'middleware':
        return <MiddlewareSection />
      case 'features':
        return <FeaturesSection />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
            Next.js Features
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Explore the powerful features of Next.js including routing, API routes, rendering methods, and optimizations
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 lg:sticky lg:top-24 lg:h-fit">
            <nav className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Next.js Features</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                      activeSection === section.id
                        ? 'bg-green-100 text-green-800 border-2 border-green-300 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  )
}

// Routing Section
const RoutingSection = () => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">File-based Routing</h2>
      <p className="text-gray-600 mb-6">
        Next.js uses file-based routing where the file structure in the `app` directory determines your routes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Route Examples</h3>
          <div className="space-y-2">
            <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
              <code className="text-sm font-mono text-gray-900">/app/page.tsx</code>
              <p className="text-sm text-gray-700 font-medium">→ /</p>
            </div>
            <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
              <code className="text-sm font-mono text-gray-900">/app/about/page.tsx</code>
              <p className="text-sm text-gray-700 font-medium">→ /about</p>
            </div>
            <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
              <code className="text-sm font-mono text-gray-900">/app/blog/[slug]/page.tsx</code>
              <p className="text-sm text-gray-700 font-medium">→ /blog/my-post</p>
            </div>
            <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
              <code className="text-sm font-mono text-gray-900">/app/shop/[...slug]/page.tsx</code>
              <p className="text-sm text-gray-700 font-medium">→ /shop/category/product</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Special Files</h3>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
              <code className="text-sm font-mono text-gray-900">layout.tsx</code>
              <p className="text-sm text-gray-700 font-medium">Shared UI for a segment</p>
            </div>
            <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
              <code className="text-sm font-mono text-gray-900">loading.tsx</code>
              <p className="text-sm text-gray-700 font-medium">Loading UI</p>
            </div>
            <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
              <code className="text-sm font-mono text-gray-900">error.tsx</code>
              <p className="text-sm text-gray-700 font-medium">Error UI</p>
            </div>
            <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
              <code className="text-sm font-mono text-gray-900">not-found.tsx</code>
              <p className="text-sm text-gray-700 font-medium">404 UI</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Navigation Examples</h3>
        <div className="flex flex-wrap gap-2">
          <Link 
            href="/" 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/javascript" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            JavaScript
          </Link>
          <Link 
            href="/react" 
            className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
          >
            React
          </Link>
          <Link 
            href="/examples" 
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
          >
            Examples
          </Link>
        </div>
      </div>
    </motion.div>
  </div>
)

// API Section
interface ApiSectionProps {
  users: User[]
  posts: Post[]
  loading: boolean
  onFetchUsers: (filters?: { role?: string; limit?: number }) => void
  onFetchPosts: (filters?: { category?: string; limit?: number }) => void
  onCreateUser: (userData: { name: string; email: string; role: string }) => Promise<any>
  apiResults: Record<string, any>
}

const ApiSection: React.FC<ApiSectionProps> = ({
  users,
  posts,
  loading,
  onFetchUsers,
  onFetchPosts,
  onCreateUser,
  apiResults
}) => {
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' })
  const [userFilter, setUserFilter] = useState('')
  const [postFilter, setPostFilter] = useState('')

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await onCreateUser(newUser)
    if (result.success) {
      setNewUser({ name: '', email: '', role: 'user' })
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">API Routes</h2>
        <p className="text-gray-600 mb-6">
          Next.js API routes allow you to create backend endpoints as part of your Next.js application.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users API */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Users API
            </h3>
            
            <div className="space-y-4">
              {/* Fetch Users */}
              <div>
                <div className="flex gap-2 mb-2">
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="px-3 py-2 border rounded"
                  >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                  </select>
                  <button
                    onClick={() => onFetchUsers(userFilter ? { role: userFilter } : undefined)}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
                    Fetch Users
                  </button>
                </div>
                
                <div className="space-y-2">
                  {users.map(user => (
                    <div key={user.id} className="p-3 bg-gray-50 rounded flex justify-between items-center">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email} • {user.role}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' :
                        user.role === 'moderator' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create User */}
              <form onSubmit={handleCreateUser} className="space-y-2">
                <h4 className="font-medium">Create New User</h4>
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Create User
                </button>
              </form>
            </div>
          </div>

          {/* Posts API */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Posts API
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-2 mb-2">
                <select
                  value={postFilter}
                  onChange={(e) => setPostFilter(e.target.value)}
                  className="px-3 py-2 border rounded"
                >
                  <option value="">All Categories</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Guide">Guide</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Backend">Backend</option>
                </select>
                <button
                  onClick={() => onFetchPosts(postFilter ? { category: postFilter } : undefined)}
                  disabled={loading}
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
                >
                  Fetch Posts
                </button>
              </div>
              
              <div className="space-y-2">
                {posts.map(post => (
                  <div key={post.id} className="p-3 bg-gray-50 rounded">
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{post.content.substring(0, 80)}...</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>By {post.author}</span>
                      <span>{post.category}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>👁 {post.views}</span>
                      <span>❤️ {post.likes}</span>
                      <div className="flex gap-1">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-gray-200 px-1 rounded">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* API Results */}
        {Object.keys(apiResults).length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">API Responses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(apiResults).map(([key, result]) => (
                <div key={key} className="p-3 bg-gray-900 text-gray-100 rounded overflow-auto">
                  <h4 className="font-medium mb-2 text-green-400">{key}:</h4>
                  <pre className="text-xs">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// Rendering Section
const RenderingSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-lg p-6"
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Rendering Methods</h2>
    <p className="text-gray-600 mb-6">
      Next.js provides multiple rendering strategies to optimize performance and user experience.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* SSR */}
      <div className="p-4 border rounded-lg">
        <div className="flex items-center mb-3">
          <Server className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold">SSR</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">Server-Side Rendering</p>
        <ul className="text-sm space-y-1">
          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-1" /> SEO friendly</li>
          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-1" /> Fast initial load</li>
          <li className="flex items-center"><XCircle className="w-3 h-3 text-red-500 mr-1" /> Server load</li>
        </ul>
        <div className="mt-3 p-2 bg-gray-100 rounded">
          <code className="text-xs">
            {`// app/page.tsx
export default async function Page() {
  const data = await fetch('...')
  return <div>{data}</div>
}`}
          </code>
        </div>
      </div>

      {/* SSG */}
      <div className="p-4 border rounded-lg">
        <div className="flex items-center mb-3">
          <Globe className="w-6 h-6 text-green-500 mr-2" />
          <h3 className="text-lg font-semibold">SSG</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">Static Site Generation</p>
        <ul className="text-sm space-y-1">
          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-1" /> Ultra fast</li>
          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-1" /> CDN friendly</li>
          <li className="flex items-center"><XCircle className="w-3 h-3 text-red-500 mr-1" /> Build time data</li>
        </ul>
        <div className="mt-3 p-2 bg-gray-100 rounded">
          <code className="text-xs">
            {`// Build time generation
export default async function Page() {
  const data = await fetch('...', {
    cache: 'force-cache'
  })
  return <div>{data}</div>
}`}
          </code>
        </div>
      </div>

      {/* CSR */}
      <div className="p-4 border rounded-lg">
        <div className="flex items-center mb-3">
          <Zap className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold">CSR</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">Client-Side Rendering</p>
        <ul className="text-sm space-y-1">
          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-1" /> Interactive</li>
          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-1" /> Real-time data</li>
          <li className="flex items-center"><XCircle className="w-3 h-3 text-red-500 mr-1" /> SEO challenges</li>
        </ul>
        <div className="mt-3 p-2 bg-gray-100 rounded">
          <code className="text-xs">
            {`// Client-side fetching
'use client'
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData)
}, [])`}
          </code>
        </div>
      </div>
    </div>

    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
      <h3 className="font-semibold text-blue-900 mb-2">Hybrid Rendering</h3>
      <p className="text-sm text-blue-800">
        Next.js allows you to mix rendering strategies within the same application. 
        You can use SSG for marketing pages, SSR for dynamic content, and CSR for interactive features.
      </p>
    </div>
  </motion.div>
)

// Optimization Section
const OptimizationSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-lg p-6"
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Optimizations</h2>
    <p className="text-gray-600 mb-6">
      Next.js includes many built-in optimizations to make your applications fast by default.
    </p>

    <div className="space-y-6">
      {/* Image Optimization */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Image Optimization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="text-sm space-y-1">
              <li>• Automatic format optimization (WebP, AVIF)</li>
              <li>• Responsive images with srcset</li>
              <li>• Lazy loading by default</li>
              <li>• Blur placeholder support</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <code className="text-sm">
              {`import Image from 'next/image'

<Image
  src="/photo.jpg"
  alt="Description"
  width={500}
  height={300}
  placeholder="blur"
  priority={true}
/>`}
            </code>
          </div>
        </div>
      </div>

      {/* Code Splitting */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Automatic Code Splitting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Benefits:</h4>
            <ul className="text-sm space-y-1">
              <li>• Smaller bundle sizes</li>
              <li>• Faster page loads</li>
              <li>• Route-based splitting</li>
              <li>• Dynamic imports support</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <code className="text-sm">
              {`// Dynamic import
const DynamicComponent = dynamic(
  () => import('../components/Heavy'),
  { 
    loading: () => <p>Loading...</p>,
    ssr: false 
  }
)`}
            </code>
          </div>
        </div>
      </div>

      {/* Caching */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Intelligent Caching</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-green-50 rounded">
            <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-medium">Request Memoization</h4>
            <p className="text-sm text-gray-600">Automatic deduplication</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded">
            <Database className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-medium">Data Cache</h4>
            <p className="text-sm text-gray-600">Persistent across requests</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded">
            <Layers className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-medium">Full Route Cache</h4>
            <p className="text-sm text-gray-600">Static at build time</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

// Middleware Section
const MiddlewareSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-lg p-6"
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Middleware</h2>
    <p className="text-gray-600 mb-6">
      Middleware allows you to run code before a request is completed, enabling authentication, redirects, and more.
    </p>

    <div className="space-y-4">
      <div className="p-4 bg-gray-900 rounded">
        <h3 className="font-medium mb-2 text-green-400">middleware.ts</h3>
        <code className="text-sm text-gray-100 whitespace-pre-wrap font-mono">
          {`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Authentication check
  const token = request.cookies.get('token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Add custom headers
  const response = NextResponse.next()
  response.headers.set('X-Custom-Header', 'value')
  
  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
}`}
        </code>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border-2 border-gray-300 rounded-lg bg-white">
          <h3 className="font-semibold mb-2 text-gray-900">Use Cases</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>• Authentication & Authorization</li>
            <li>• Server-side redirects</li>
            <li>• Path rewriting</li>
            <li>• Feature flags</li>
            <li>• Rate limiting</li>
            <li>• Logging & Analytics</li>
          </ul>
        </div>
        <div className="p-4 border-2 border-gray-300 rounded-lg bg-white">
          <h3 className="font-semibold mb-2 text-gray-900">Limitations</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>• Runs at the Edge Runtime</li>
            <li>• Limited Node.js APIs</li>
            <li>• 4MB code limit</li>
            <li>• No file system access</li>
            <li>• Cannot modify response body</li>
          </ul>
        </div>
      </div>
    </div>
  </motion.div>
)

// Features Section
const FeaturesSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-lg p-6"
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Built-in Features</h2>
    <p className="text-gray-600 mb-6">
      Next.js comes with many features out of the box to enhance developer experience and application performance.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        {
          title: 'TypeScript Support',
          description: 'Built-in TypeScript support with zero configuration',
          icon: Code,
          color: 'blue'
        },
        {
          title: 'CSS Support',
          description: 'CSS Modules, Sass, CSS-in-JS, and Tailwind CSS',
          icon: Palette,
          color: 'pink'
        },
        {
          title: 'Environment Variables',
          description: 'Support for .env files and runtime configuration',
          icon: Settings,
          color: 'green'
        },
        {
          title: 'Fast Refresh',
          description: 'Instant feedback for React component edits',
          icon: RefreshCw,
          color: 'orange'
        },
        {
          title: 'Bundle Analyzer',
          description: 'Visualize and analyze your bundle size',
          icon: PieChart,
          color: 'purple'
        },
        {
          title: 'PWA Support',
          description: 'Progressive Web App features with next-pwa',
          icon: Smartphone,
          color: 'indigo'
        }
      ].map((feature, index) => (
        <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
          <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-3`}>
            <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
          </div>
          <h3 className="font-semibold mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-2">Getting Started</h3>
      <p className="text-sm text-gray-700 mb-3">
        Create a new Next.js application with all the latest features:
      </p>
      <code className="text-sm bg-gray-900 text-green-400 p-3 rounded block">
        npx create-next-app@latest my-app --typescript --tailwind --eslint --app
      </code>
    </div>
  </motion.div>
)

// Missing imports for the features section
import { Palette, Settings, PieChart, Smartphone } from 'lucide-react'

export default NextJSPage
