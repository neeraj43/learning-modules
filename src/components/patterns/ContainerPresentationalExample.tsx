'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Database, Eye, Code, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Mock API service
const userService = {
  async fetchUsers(page: number = 1, limit: number = 5) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const users = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer', avatar: '👩‍💻', active: true },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer', avatar: '👨‍🎨', active: false },
      { id: 3, name: 'Carol Chen', email: 'carol@example.com', role: 'Manager', avatar: '👩‍💼', active: true },
      { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'DevOps', avatar: '👨‍🔧', active: true },
      { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'QA Engineer', avatar: '👩‍🔬', active: false },
      { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Product Owner', avatar: '👨‍💼', active: true },
    ]
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = users.slice(startIndex, endIndex)
    
    return {
      data: paginatedUsers,
      total: users.length,
      page,
      totalPages: Math.ceil(users.length / limit)
    }
  },

  async searchUsers(query: string) {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const users = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer', avatar: '👩‍💻', active: true },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer', avatar: '👨‍🎨', active: false },
      { id: 3, name: 'Carol Chen', email: 'carol@example.com', role: 'Manager', avatar: '👩‍💼', active: true },
    ]
    
    return users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.role.toLowerCase().includes(query.toLowerCase())
    )
  }
}

// ===============================
// PRESENTATIONAL COMPONENTS
// ===============================

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string
  active: boolean
}

// Pure presentational component - only receives props and renders UI
const UserCard = ({ user, onEdit, onDelete }: {
  user: User
  onEdit: (user: User) => void
  onDelete: (id: number) => void
}) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
    <div className="flex items-center space-x-3 mb-3">
      <div className="text-3xl">{user.avatar}</div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-600">{user.role}</p>
      </div>
      <div className={`w-3 h-3 rounded-full ${user.active ? 'bg-green-500' : 'bg-gray-400'}`} />
    </div>
    <div className="flex space-x-2">
      <Button size="sm" variant="ghost" onClick={() => onEdit(user)}>
        Edit
      </Button>
      <Button size="sm" variant="danger" onClick={() => onDelete(user.id)}>
        Delete
      </Button>
    </div>
  </div>
)

// Pure presentational component for loading state
const LoadingSpinner = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
    <p className="text-gray-600">{message}</p>
  </div>
)

// Pure presentational component for error state
const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
    <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
    <p className="text-red-800 mb-3">{message}</p>
    <Button size="sm" variant="danger" onClick={onRetry}>
      Try Again
    </Button>
  </div>
)

// Pure presentational component for search
const SearchBar = ({ 
  query, 
  onQueryChange, 
  onSearch, 
  isSearching 
}: {
  query: string
  onQueryChange: (query: string) => void
  onSearch: () => void
  isSearching: boolean
}) => (
  <div className="flex space-x-2 mb-4">
    <input
      type="text"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search users..."
      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      onKeyPress={(e) => e.key === 'Enter' && onSearch()}
    />
    <Button 
      onClick={onSearch}
      loading={isSearching}
      disabled={!query.trim()}
    >
      Search
    </Button>
  </div>
)

// Pure presentational component for pagination
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) => (
  <div className="flex items-center justify-center space-x-2 mt-4">
    <Button
      size="sm"
      variant="ghost"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage <= 1}
    >
      Previous
    </Button>
    
    <span className="text-sm text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    
    <Button
      size="sm"
      variant="ghost"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage >= totalPages}
    >
      Next
    </Button>
  </div>
)

// Pure presentational component for user list
const UserList = ({ 
  users,
  loading,
  error,
  onEdit,
  onDelete,
  onRetry
}: {
  users: User[]
  loading: boolean
  error: string | null
  onEdit: (user: User) => void
  onDelete: (id: number) => void
  onRetry: () => void
}) => {
  if (loading) return <LoadingSpinner message="Loading users..." />
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />
  if (users.length === 0) return (
    <div className="text-center py-8 text-gray-500">
      <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
      <p>No users found</p>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

// ===============================
// CONTAINER COMPONENTS
// ===============================

// Container component - handles all the business logic and state
const UserListContainer = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [isSearchMode, setIsSearchMode] = useState(false)

  const fetchUsers = async (page: number = 1) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await userService.fetchUsers(page)
      setUsers(result.data)
      setCurrentPage(result.page)
      setTotalPages(result.totalPages)
    } catch (err) {
      setError('Failed to fetch users. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const searchUsers = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    setError(null)
    
    try {
      const results = await userService.searchUsers(searchQuery)
      setSearchResults(results)
      setIsSearchMode(true)
    } catch (err) {
      setError('Failed to search users. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setIsSearchMode(false)
  }

  const handleEdit = (user: User) => {
    alert(`Edit user: ${user.name}`)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      // In real app, this would make an API call
      if (isSearchMode) {
        setSearchResults(prev => prev.filter(user => user.id !== id))
      } else {
        setUsers(prev => prev.filter(user => user.id !== id))
      }
    }
  }

  const handlePageChange = (page: number) => {
    if (!isSearchMode) {
      fetchUsers(page)
    }
  }

  const handleRetry = () => {
    if (isSearchMode) {
      searchUsers()
    } else {
      fetchUsers(currentPage)
    }
  }

  // Load initial data
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <SearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onSearch={searchUsers}
        isSearching={isSearching}
      />
      
      {isSearchMode && (
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Search results for &quot;{searchQuery}&quot; ({searchResults.length} found)
          </span>
          <Button size="sm" variant="ghost" onClick={clearSearch}>
            Clear Search
          </Button>
        </div>
      )}

      <UserList
        users={isSearchMode ? searchResults : users}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRetry={handleRetry}
      />
      
      {!isSearchMode && !loading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

// ===============================
// MAIN COMPONENT
// ===============================

const ContainerPresentationalExample = () => {
  const [activeTab, setActiveTab] = useState('demo')

  const tabs = [
    { id: 'demo', label: 'Live Demo', icon: Eye },
    { id: 'pattern', label: 'Pattern Overview', icon: Database },
    { id: 'code', label: 'Code Examples', icon: Code }
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
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Container/Presentational Pattern Demo</h3>
              <p className="text-blue-800 text-sm">
                Try searching for users or navigating through pages. Notice how the UI (presentational) 
                components are completely separate from the business logic (container) components.
              </p>
            </div>
            <UserListContainer />
          </div>
        )}

        {activeTab === 'pattern' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Presentational Components
                </h3>
                <ul className="text-green-800 text-sm space-y-2">
                  <li>• Focus only on how things look</li>
                  <li>• Receive data and callbacks via props</li>
                  <li>• Don&apos;t manage application state</li>
                  <li>• Highly reusable and testable</li>
                  <li>• Usually functional components</li>
                </ul>
                
                <div className="mt-4">
                  <h4 className="font-medium text-green-900 mb-2">Examples:</h4>
                  <div className="flex flex-wrap gap-1">
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">UserCard</code>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">SearchBar</code>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Pagination</code>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">UserList</code>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Container Components
                </h3>
                <ul className="text-blue-800 text-sm space-y-2">
                  <li>• Focus on how things work</li>
                  <li>• Manage state and side effects</li>
                  <li>• Handle API calls and business logic</li>
                  <li>• Pass data and callbacks to presentational</li>
                  <li>• Usually class components or hooks</li>
                </ul>
                
                <div className="mt-4">
                  <h4 className="font-medium text-blue-900 mb-2">Examples:</h4>
                  <div className="flex flex-wrap gap-1">
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">UserListContainer</code>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">SearchContainer</code>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">FormContainer</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">Benefits of This Pattern</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• <strong>Separation of Concerns:</strong> UI logic separate from business logic</li>
                  <li>• <strong>Reusability:</strong> Presentational components can be reused anywhere</li>
                  <li>• <strong>Testability:</strong> Easier to test UI and logic separately</li>
                </ul>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• <strong>Maintainability:</strong> Changes to one don&apos;t affect the other</li>
                  <li>• <strong>Team Collaboration:</strong> Designers can work on UI, developers on logic</li>
                  <li>• <strong>Debugging:</strong> Easier to isolate and fix issues</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Presentational Component Example</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Pure presentational component - only props in, JSX out
const UserCard = ({ user, onEdit, onDelete }: {
  user: User
  onEdit: (user: User) => void
  onDelete: (id: number) => void
}) => (
  <div className="bg-white p-4 rounded-lg border">
    <div className="flex items-center space-x-3 mb-3">
      <div className="text-3xl">{user.avatar}</div>
      <div className="flex-1">
        <h3 className="font-medium">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-600">{user.role}</p>
      </div>
    </div>
    <div className="flex space-x-2">
      <Button onClick={() => onEdit(user)}>Edit</Button>
      <Button onClick={() => onDelete(user.id)}>Delete</Button>
    </div>
  </div>
)`}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Container Component Example</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Container component - handles all state and business logic
const UserListContainer = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await userService.fetchUsers()
      setUsers(result.data)
    } catch (err) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (user: User) => {
    // Business logic for editing
    console.log('Editing user:', user)
  }

  const handleDelete = (id: number) => {
    // Business logic for deletion
    setUsers(prev => prev.filter(user => user.id !== id))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Passes data and callbacks to presentational component
  return (
    <UserList
      users={users}
      loading={loading}
      error={error}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onRetry={fetchUsers}
    />
  )
}`}</pre>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Key Principles</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Presentational components are &quot;dumb&quot; - they don&apos;t know where data comes from</li>
                <li>• Container components are &quot;smart&quot; - they know how to fetch and manage data</li>
                <li>• Props flow down, events flow up</li>
                <li>• Presentational components should be pure functions when possible</li>
                <li>• Container components handle side effects and state management</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default ContainerPresentationalExample
