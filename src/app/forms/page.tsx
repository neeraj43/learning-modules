'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Briefcase,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Send,
  RefreshCw,
  Plus,
  Minus,
  Upload,
  Star
} from 'lucide-react'

// Validation schemas
const basicFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number'),
  age: z.number().min(16, 'Must be at least 16 years old').max(120, 'Please enter a valid age'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
})

const advancedFormSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  confirmPassword: z.string(),
  birthDate: z.string().min(1, 'Birth date is required'),
  country: z.string().min(1, 'Please select a country'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  experience: z.enum(['junior', 'mid', 'senior', 'lead']),
  newsletter: z.boolean(),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  rating: z.number().min(1, 'Please provide a rating').max(5),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const dynamicFormSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  technologies: z.array(z.object({
    name: z.string().min(1, 'Technology name is required'),
    experience: z.number().min(1).max(10),
  })).min(1, 'Add at least one technology'),
  features: z.array(z.string()).min(1, 'Add at least one feature'),
})

type BasicForm = z.infer<typeof basicFormSchema>
type AdvancedForm = z.infer<typeof advancedFormSchema>
type DynamicForm = z.infer<typeof dynamicFormSchema>

const FormsPage = () => {
  const [activeForm, setActiveForm] = useState('basic')
  const [submissionResult, setSubmissionResult] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const forms = [
    { id: 'basic', name: 'Basic Form', icon: User },
    { id: 'advanced', name: 'Advanced Form', icon: Briefcase },
    { id: 'dynamic', name: 'Dynamic Form', icon: Plus },
    { id: 'validation', name: 'Validation Examples', icon: CheckCircle },
  ]

  const renderForm = () => {
    switch (activeForm) {
      case 'basic':
        return <BasicFormExample onSubmit={setSubmissionResult} />
      case 'advanced':
        return <AdvancedFormExample onSubmit={setSubmissionResult} showPassword={showPassword} setShowPassword={setShowPassword} />
      case 'dynamic':
        return <DynamicFormExample onSubmit={setSubmissionResult} />
      case 'validation':
        return <ValidationExamples />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Form Handling Mastery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master React Hook Form, Zod validation, and advanced form patterns used in modern web applications
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {forms.map((form, index) => {
            const Icon = form.icon
            return (
              <motion.button
                key={form.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveForm(form.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeForm === form.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                {form.name}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Form Content */}
        <motion.div
          key={activeForm}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {renderForm()}
        </motion.div>

        {/* Submission Result */}
        {submissionResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mt-8"
          >
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900">Form Submitted Successfully!</h3>
              </div>
              <pre className="bg-green-100 p-4 rounded-lg text-sm text-green-800 overflow-x-auto">
                {submissionResult}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Basic Form Component
const BasicFormExample = ({ onSubmit }: { onSubmit: (data: string) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<BasicForm>({
    resolver: zodResolver(basicFormSchema),
  })

  const onFormSubmit = async (data: BasicForm) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    onSubmit(JSON.stringify(data, null, 2))
    reset()
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Basic Form with Validation</h2>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              {...register('firstName')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              {...register('lastName')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              {...register('email')}
              type="email"
              className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register('phone')}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age *
            </label>
            <input
              {...register('age', { valueAsNumber: true })}
              type="number"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your age"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.age.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website (Optional)
          </label>
          <input
            {...register('website')}
            type="url"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.website ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://example.com"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.website.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio (Optional)
          </label>
          <textarea
            {...register('bio')}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
              errors.bio ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell us about yourself..."
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.bio.message}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Form
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
          >
            Reset
          </motion.button>
        </div>
      </form>
    </div>
  )
}

// Advanced Form Component (placeholder for now)
const AdvancedFormExample = ({ 
  onSubmit, 
  showPassword, 
  setShowPassword 
}: { 
  onSubmit: (data: string) => void
  showPassword: boolean
  setShowPassword: (show: boolean) => void
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Advanced Form Features</h2>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-600">Advanced form with complex validation, conditional fields, and file uploads coming soon!</p>
      </div>
    </div>
  )
}

// Dynamic Form Component (placeholder for now)
const DynamicFormExample = ({ onSubmit }: { onSubmit: (data: string) => void }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Plus className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">Dynamic Form Fields</h2>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-600">Dynamic forms with add/remove fields functionality coming soon!</p>
      </div>
    </div>
  )
}

// Validation Examples Component
const ValidationExamples = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle className="w-6 h-6 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-900">Validation Patterns</h2>
      </div>

      <div className="space-y-8">
        {/* Validation Types */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Validation Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Email Validation</h4>
              <code className="text-sm text-gray-600">
                z.string().email(&apos;Invalid email format&apos;)
              </code>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Phone Validation</h4>
              <code className="text-sm text-gray-600">
                z.string().regex(/^\+?[\d\s-()]+$/, &apos;Invalid phone&apos;)
              </code>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Password Strength</h4>
              <code className="text-sm text-gray-600">
                z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
              </code>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">URL Validation</h4>
              <code className="text-sm text-gray-600">
                z.string().url(&apos;Must be valid URL&apos;)
              </code>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Validation Best Practices</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-900">Use client-side validation for immediate feedback</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-900">Always validate on the server for security</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-900">Provide clear, actionable error messages</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-900">Use schema validation libraries like Zod</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-900">Implement debounced validation for better UX</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormsPage
