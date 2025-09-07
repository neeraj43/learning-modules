'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  Layers, 
  Package, 
  Share2, 
  Split, 
  Code2,
  Globe,
  Settings,
  FileText,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Import pattern examples
import MicroFrontendExample from '@/components/patterns/MicroFrontendExample'
import ComponentBasedExample from '@/components/patterns/ComponentBasedExample'
import ProviderPatternExample from '@/components/patterns/ProviderPatternExample'
import ContainerPresentationalExample from '@/components/patterns/ContainerPresentationalExample'
import CustomHooksExample from '@/components/patterns/CustomHooksExample'

const PatternsPage = () => {
  const { t } = useTranslation('common')
  const [activePattern, setActivePattern] = useState('microfrontend')

  const patterns = [
    { 
      id: 'microfrontend', 
      name: t('patterns.microfrontend'), 
      icon: Layers,
      description: 'Module Federation for component sharing across applications',
      benefits: ['Independent deployments', 'Team autonomy', 'Technology diversity', 'Scalable architecture']
    },
    { 
      id: 'componentBased', 
      name: t('patterns.componentBased'), 
      icon: Package,
      description: 'Modular, reusable components with clear interfaces',
      benefits: ['Reusability', 'Maintainability', 'Testing isolation', 'Clear boundaries']
    },
    { 
      id: 'provider', 
      name: t('patterns.provider'), 
      icon: Share2,
      description: 'Context-based state sharing and dependency injection',
      benefits: ['Global state management', 'Prop drilling elimination', 'Centralized logic', 'Easy testing']
    },
    { 
      id: 'containerPresentation', 
      name: t('patterns.containerPresentation'), 
      icon: Split,
      description: 'Separation of business logic from presentation',
      benefits: ['Separation of concerns', 'Reusable UI', 'Easier testing', 'Better organization']
    },
    { 
      id: 'customHooks', 
      name: t('patterns.customHooks'), 
      icon: Code2,
      description: 'Reusable business logic extracted into custom hooks',
      benefits: ['Logic reuse', 'Cleaner components', 'Easier testing', 'Better abstraction']
    }
  ]

  const renderPattern = () => {
    switch (activePattern) {
      case 'microfrontend':
        return <MicroFrontendExample />
      case 'componentBased':
        return <ComponentBasedExample />
      case 'provider':
        return <ProviderPatternExample />
      case 'containerPresentation':
        return <ContainerPresentationalExample />
      case 'customHooks':
        return <CustomHooksExample />
      default:
        return null
    }
  }

  const currentPattern = patterns.find(p => p.id === activePattern)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent mb-4">
            {t('patterns.title')}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Learn modern architecture patterns for scalable React applications
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 lg:sticky lg:top-24 lg:h-fit">
            <nav className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Architecture Patterns</h3>
              <div className="space-y-2">
                {patterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => setActivePattern(pattern.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 border ${
                      activePattern === pattern.id
                        ? 'bg-indigo-50 text-indigo-800 border-indigo-200 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <pattern.icon className={`w-5 h-5 mt-0.5 ${
                        activePattern === pattern.id ? 'text-indigo-600' : 'text-gray-500'
                      }`} />
                      <div>
                        <h4 className="font-medium mb-1">{pattern.name}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {pattern.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Pattern Info */}
            {currentPattern && (
              <motion.div
                key={activePattern}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <currentPattern.icon className="w-8 h-8 text-indigo-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">{currentPattern.name}</h2>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentPattern.description}
                </p>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentPattern.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Interactive Example */}
            <motion.div
              key={`example-${activePattern}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Interactive Example</h2>
              {renderPattern()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatternsPage
