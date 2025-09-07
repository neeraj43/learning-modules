'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Code, Eye, Settings, Users, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Example reusable components demonstrating component-based architecture

// 1. Atomic Components (Smallest building blocks)
const Avatar = ({ src, alt, size = 'md' }: { src: string; alt: string; size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-200`}
    />
  )
}

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800'
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}

// 2. Molecular Components (Combinations of atoms)
const UserCard = ({ 
  user, 
  showActions = true 
}: { 
  user: { name: string; role: string; avatar: string; status: 'online' | 'offline' | 'away' }
  showActions?: boolean
}) => {
  const statusVariants = {
    online: 'success',
    offline: 'default',
    away: 'warning'
  } as const

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center space-x-3 mb-3">
        <Avatar src={user.avatar} alt={user.name} />
        <div>
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
        <Badge variant={statusVariants[user.status]}>
          {user.status}
        </Badge>
      </div>
      
      {showActions && (
        <div className="flex space-x-2">
          <Button size="sm" variant="primary">
            <Users className="w-4 h-4 mr-1" />
            Connect
          </Button>
          <Button size="sm" variant="ghost">
            <Eye className="w-4 h-4 mr-1" />
            View Profile
          </Button>
        </div>
      )}
    </div>
  )
}

const ProductCard = ({ 
  product 
}: { 
  product: { name: string; price: number; image: string; rating: number; reviews: number }
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square bg-gray-100 flex items-center justify-center text-4xl">
        {product.image}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <Button size="sm" variant="primary">Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}

// 3. Organism Components (Complex combinations)
const TeamSection = ({ users }: { users: any[] }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  )
}

const ProductGrid = ({ products }: { products: any[] }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

const ComponentBasedExample = () => {
  const [activeTab, setActiveTab] = useState('demo')

  // Sample data
  const sampleUsers = [
    { name: 'Alice Johnson', role: 'Frontend Developer', avatar: '👩‍💻', status: 'online' as const },
    { name: 'Bob Smith', role: 'Backend Developer', avatar: '👨‍💻', status: 'away' as const },
    { name: 'Carol Chen', role: 'UI/UX Designer', avatar: '👩‍🎨', status: 'online' as const },
    { name: 'David Wilson', role: 'DevOps Engineer', avatar: '👨‍🔧', status: 'offline' as const }
  ]

  const sampleProducts = [
    { name: 'Wireless Headphones', price: 99.99, image: '🎧', rating: 4, reviews: 156 },
    { name: 'Smart Watch', price: 299.99, image: '⌚', rating: 5, reviews: 89 },
    { name: 'Laptop Stand', price: 49.99, image: '💻', rating: 4, reviews: 234 }
  ]

  const tabs = [
    { id: 'demo', label: 'Live Demo', icon: Eye },
    { id: 'structure', label: 'Component Structure', icon: Package },
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
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Component-Based Architecture Demo</h3>
              <p className="text-blue-800 text-sm">
                Below are examples of reusable components built following atomic design principles. 
                Each component is self-contained and can be easily tested, documented, and reused.
              </p>
            </div>
            
            <TeamSection users={sampleUsers} />
            <ProductGrid products={sampleProducts} />
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Atomic Design Hierarchy</h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-medium text-green-900 mb-2">Atoms (Basic Building Blocks)</h4>
                  <p className="text-green-800 text-sm mb-2">Smallest components that can't be broken down further</p>
                  <div className="flex flex-wrap gap-2">
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Avatar</code>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Badge</code>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Button</code>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Input</code>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-medium text-blue-900 mb-2">Molecules (Simple Combinations)</h4>
                  <p className="text-blue-800 text-sm mb-2">Groups of atoms functioning together as a unit</p>
                  <div className="flex flex-wrap gap-2">
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">UserCard</code>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">ProductCard</code>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">SearchBar</code>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">FormField</code>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-medium text-purple-900 mb-2">Organisms (Complex Components)</h4>
                  <p className="text-purple-800 text-sm mb-2">Groups of molecules forming distinct sections</p>
                  <div className="flex flex-wrap gap-2">
                    <code className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">TeamSection</code>
                    <code className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">ProductGrid</code>
                    <code className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Header</code>
                    <code className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Footer</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Atom Example: Avatar Component</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Avatar.tsx - Atomic component
interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
}

const Avatar = ({ src, alt, size = 'md' }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={\`\${sizeClasses[size]} rounded-full object-cover border-2 border-gray-200\`}
    />
  )
}`}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Molecule Example: UserCard Component</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// UserCard.tsx - Molecular component using atoms
interface UserCardProps {
  user: {
    name: string
    role: string
    avatar: string
    status: 'online' | 'offline' | 'away'
  }
  showActions?: boolean
}

const UserCard = ({ user, showActions = true }: UserCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center space-x-3 mb-3">
        <Avatar src={user.avatar} alt={user.name} />
        <div>
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
        <Badge variant={statusVariants[user.status]}>
          {user.status}
        </Badge>
      </div>
      
      {showActions && (
        <div className="flex space-x-2">
          <Button size="sm" variant="primary">Connect</Button>
          <Button size="sm" variant="ghost">View Profile</Button>
        </div>
      )}
    </div>
  )
}`}</pre>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Benefits of Component-Based Architecture</h4>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• <strong>Reusability:</strong> Components can be used across different parts of the application</li>
                <li>• <strong>Maintainability:</strong> Changes to a component automatically propagate everywhere it's used</li>
                <li>• <strong>Testability:</strong> Each component can be tested in isolation</li>
                <li>• <strong>Consistency:</strong> Ensures UI consistency across the application</li>
                <li>• <strong>Scalability:</strong> New features can be built by composing existing components</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default ComponentBasedExample
