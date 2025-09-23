'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb, 
  Target,
  ArrowRight,
  Copy,
  Check,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface BeginnerGuideProps {
  topic: string
  steps: {
    title: string
    description: string
    tip?: string
    code?: string
    tryIt?: string
  }[]
  nextTopics?: string[]
}

const BeginnerGuide: React.FC<BeginnerGuideProps> = ({ topic, steps, nextTopics }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showTips, setShowTips] = useState(true)
  const [copiedCode, setCopiedCode] = useState<number | null>(null)

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
  }

  const copyCode = async (code: string, stepIndex: number) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(stepIndex)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Beginner Guide</h3>
            <p className="text-blue-600 font-medium">{topic}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTips(!showTips)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title={showTips ? "Hide tips" : "Show tips"}
          >
            <Lightbulb className={`w-5 h-5 ${showTips ? 'fill-current' : ''}`} />
          </button>
          <div className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">
            {completedSteps.length}/{steps.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
              index === currentStep
                ? 'bg-blue-600 text-white'
                : completedSteps.includes(index)
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {completedSteps.includes(index) ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <div className={`w-4 h-4 rounded-full border-2 ${
                index === currentStep ? 'border-white' : 'border-gray-400'
              }`} />
            )}
            <span className="text-sm">{step.title}</span>
          </button>
        ))}
      </div>

      {/* Current Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-900">
              {currentStepData.title}
            </h4>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            {currentStepData.description}
          </p>

          {/* Code Example */}
          {currentStepData.code && (
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm">Example Code</span>
                <button
                  onClick={() => copyCode(currentStepData.code!, currentStep)}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 text-sm transition-colors"
                >
                  {copiedCode === currentStep ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="text-gray-100 text-sm overflow-x-auto">
                <code>{currentStepData.code}</code>
              </pre>
            </div>
          )}

          {/* Try It Section */}
          {currentStepData.tryIt && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Try It Yourself</span>
              </div>
              <p className="text-green-700 text-sm">{currentStepData.tryIt}</p>
            </div>
          )}

          {/* Tip */}
          {currentStepData.tip && showTips && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Pro Tip</span>
              </div>
              <p className="text-yellow-700 text-sm">{currentStepData.tip}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  variant="ghost"
                  className="text-gray-600"
                >
                  ← Previous
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => markStepComplete(currentStep)}
                variant={completedSteps.includes(currentStep) ? "ghost" : "primary"}
                className={completedSteps.includes(currentStep) ? "text-green-600" : ""}
              >
                {completedSteps.includes(currentStep) ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </>
                ) : (
                  'Mark Complete'
                )}
              </Button>
              
              {currentStep < steps.length - 1 && (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next →
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Completion Message */}
      {completedSteps.length === steps.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">Congratulations! 🎉</span>
          </div>
          <p className="text-green-700 text-sm mb-3">
            You&apos;ve completed the {topic} guide! You&apos;re ready to move on to more advanced topics.
          </p>
          
          {nextTopics && nextTopics.length > 0 && (
            <div>
              <p className="text-green-700 text-sm font-medium mb-2">What&apos;s next:</p>
              <div className="flex flex-wrap gap-2">
                {nextTopics.map((next, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {next}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default BeginnerGuide
