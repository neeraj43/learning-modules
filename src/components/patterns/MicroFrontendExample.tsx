'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, ExternalLink, Code, Globe, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface MicroFrontend {
  name: string
  url: string
  description: string
  exposedComponents: string[]
  status: 'available' | 'loading' | 'error'
}

const MicroFrontendExample = () => {
  const [selectedMfe, setSelectedMfe] = useState<string | null>(null)
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const microFrontends: MicroFrontend[] = [
    {
      name: 'Design System',
      url: 'http://localhost:3002',
      description: 'Shared UI components and design tokens',
      exposedComponents: ['Button', 'Input', 'Modal', 'Card', 'Typography'],
      status: 'available'
    },
    {
      name: 'User Management',
      url: 'http://localhost:3003', 
      description: 'Authentication and user profile components',
      exposedComponents: ['LoginForm', 'UserProfile', 'PermissionGate'],
      status: 'available'
    },
    {
      name: 'Analytics Dashboard',
      url: 'http://localhost:3004',
      description: 'Charts and analytics visualization components',
      exposedComponents: ['ChartContainer', 'MetricsCard', 'DataTable'],
      status: 'loading'
    }
  ]

  const loadComponent = async (mfeName: string, componentName: string) => {
    setLoadingStates(prev => ({ ...prev, [`${mfeName}-${componentName}`]: true }))
    
    // Simulate loading a remote component
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLoadingStates(prev => ({ ...prev, [`${mfeName}-${componentName}`]: false }))
    alert(`Loaded ${componentName} from ${mfeName} micro-frontend!`)
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Module Federation Architecture</h3>
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 mb-4">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> Module Federation is temporarily disabled due to compatibility issues with Next.js 15.5.2. 
            The configuration and examples below demonstrate how it would work in a production environment.
          </p>
        </div>
        <p className="text-blue-800 leading-relaxed mb-4">
          Module Federation allows you to share components, utilities, and entire applications across different 
          frontend applications. Each micro-frontend can be developed, deployed, and maintained independently.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-300">
            <Package className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-blue-900">Independent Deployment</h4>
            <p className="text-sm text-blue-700">Each micro-frontend can be deployed separately</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-300">
            <Globe className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-blue-900">Runtime Integration</h4>
            <p className="text-sm text-blue-700">Components are loaded at runtime, not build time</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-300">
            <Zap className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-blue-900">Technology Freedom</h4>
            <p className="text-sm text-blue-700">Different teams can use different tech stacks</p>
          </div>
        </div>
      </div>

      {/* Configuration Example */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Webpack Configuration</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`// next.config.js
const ModuleFederationPlugin = require('@module-federation/nextjs-mf/webpack');

config.plugins.push(
  new ModuleFederationPlugin({
    name: 'comprehensive-web-app',
    filename: 'static/chunks/remoteEntry.js',
    exposes: {
      './Button': './src/components/ui/Button',
      './TodoApp': './src/components/examples/TodoComponent',
      './useLocalStorage': './src/hooks/useLocalStorage',
    },
    remotes: {
      designSystem: 'design_system@http://localhost:3002/_next/static/chunks/remoteEntry.js',
      userManagement: 'user_management@http://localhost:3003/_next/static/chunks/remoteEntry.js',
    },
    shared: {
      react: { singleton: true, requiredVersion: '^19.1.0' },
      'react-dom': { singleton: true, requiredVersion: '^19.1.0' },
    },
  })
);`}</pre>
        </div>
      </div>

      {/* Available Micro-frontends */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Micro-frontends</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {microFrontends.map((mfe) => (
            <motion.div
              key={mfe.name}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{mfe.name}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  mfe.status === 'available' ? 'bg-green-500' :
                  mfe.status === 'loading' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{mfe.description}</p>
              
              <div className="space-y-2">
                <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  Exposed Components
                </h5>
                <div className="space-y-1">
                  {mfe.exposedComponents.map((component) => (
                    <div key={component} className="flex items-center justify-between">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{component}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        loading={loadingStates[`${mfe.name}-${component}`]}
                        onClick={() => loadComponent(mfe.name, component)}
                        disabled={mfe.status !== 'available'}
                        icon={<ExternalLink className="w-3 h-3" />}
                      >
                        Load
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Usage Example */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Component Usage</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`// Importing remote components
import React, { Suspense } from 'react';

// Dynamic import from design system micro-frontend
const RemoteButton = React.lazy(() => 
  import('designSystem/Button').catch(() => ({ default: () => <div>Component not available</div> }))
);

// Usage in your application
function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading component...</div>}>
        <RemoteButton variant="primary" onClick={() => console.log('Clicked!')}>
          Remote Button
        </RemoteButton>
      </Suspense>
    </div>
  );
}`}</pre>
        </div>
      </div>

      {/* Benefits and Considerations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-900 mb-3">Benefits</h4>
          <ul className="space-y-2 text-sm text-green-800">
            <li>• Independent team development</li>
            <li>• Faster deployment cycles</li>
            <li>• Technology diversity</li>
            <li>• Reduced code duplication</li>
            <li>• Better fault isolation</li>
          </ul>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-900 mb-3">Considerations</h4>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>• Network overhead for loading</li>
            <li>• Complex debugging across apps</li>
            <li>• Version compatibility challenges</li>
            <li>• Need for good governance</li>
            <li>• Testing complexity</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MicroFrontendExample
