'use client'

import { createContext, useContext, useState, useReducer, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Settings, User, Bell, Palette, Volume2, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// 1. Theme Provider Example
interface ThemeContextType {
  theme: 'light' | 'dark'
  primaryColor: string
  toggleTheme: () => void
  setPrimaryColor: (color: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [primaryColor, setPrimaryColor] = useState('#3b82f6')

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, primaryColor, toggleTheme, setPrimaryColor }}>
      <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} rounded-lg p-4 transition-colors`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

// 2. Notification Provider Example
interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = { ...notification, id: Date.now().toString() }
    setNotifications(prev => [...prev, newNotification])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id)
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications must be used within NotificationProvider')
  return context
}

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map(notification => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className={`p-3 rounded-lg shadow-lg max-w-sm ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            notification.type === 'warning' ? 'bg-yellow-500 text-black' :
            'bg-blue-500 text-white'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm">{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 text-xs opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// 3. Settings Provider with Reducer
interface SettingsState {
  language: string
  notifications: boolean
  sound: boolean
  autoSave: boolean
  privacy: 'public' | 'friends' | 'private'
}

type SettingsAction = 
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'TOGGLE_NOTIFICATIONS' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'TOGGLE_AUTO_SAVE' }
  | { type: 'SET_PRIVACY'; payload: 'public' | 'friends' | 'private' }
  | { type: 'RESET_SETTINGS' }

const initialSettings: SettingsState = {
  language: 'en',
  notifications: true,
  sound: true,
  autoSave: false,
  privacy: 'friends'
}

const settingsReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, notifications: !state.notifications }
    case 'TOGGLE_SOUND':
      return { ...state, sound: !state.sound }
    case 'TOGGLE_AUTO_SAVE':
      return { ...state, autoSave: !state.autoSave }
    case 'SET_PRIVACY':
      return { ...state, privacy: action.payload }
    case 'RESET_SETTINGS':
      return initialSettings
    default:
      return state
  }
}

interface SettingsContextType {
  settings: SettingsState
  dispatch: React.Dispatch<SettingsAction>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings)

  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettings must be used within SettingsProvider')
  return context
}

// Component that uses all providers
const ThemeControls = () => {
  const { theme, primaryColor, toggleTheme, setPrimaryColor } = useTheme()
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center">
        <Palette className="w-4 h-4 mr-2" />
        Theme Settings
      </h3>
      <div className="flex items-center space-x-4">
        <Button size="sm" onClick={toggleTheme}>
          {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        </Button>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Primary Color:</span>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

const NotificationTester = () => {
  const { addNotification } = useNotifications()
  
  const notificationTypes = [
    { type: 'success' as const, message: 'Success! Operation completed.', label: 'Success' },
    { type: 'error' as const, message: 'Error! Something went wrong.', label: 'Error' },
    { type: 'warning' as const, message: 'Warning! Please check your input.', label: 'Warning' },
    { type: 'info' as const, message: 'Info: Here is some information.', label: 'Info' }
  ]
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center">
        <Bell className="w-4 h-4 mr-2" />
        Notification System
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {notificationTypes.map(({ type, message, label }) => (
          <Button
            key={type}
            size="sm"
            variant={type === 'success' ? 'success' : type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'primary'}
            onClick={() => addNotification({ type, message })}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}

const SettingsPanel = () => {
  const { settings, dispatch } = useSettings()
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center">
        <Settings className="w-4 h-4 mr-2" />
        Application Settings
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Notifications</span>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => dispatch({ type: 'TOGGLE_NOTIFICATIONS' })}
            className="rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Sound</span>
          <input
            type="checkbox"
            checked={settings.sound}
            onChange={() => dispatch({ type: 'TOGGLE_SOUND' })}
            className="rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Auto Save</span>
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={() => dispatch({ type: 'TOGGLE_AUTO_SAVE' })}
            className="rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Privacy</span>
          <select
            value={settings.privacy}
            onChange={(e) => dispatch({ type: 'SET_PRIVACY', payload: e.target.value as any })}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="public">Public</option>
            <option value="friends">Friends</option>
            <option value="private">Private</option>
          </select>
        </div>
        
        <Button
          size="sm"
          variant="secondary"
          onClick={() => dispatch({ type: 'RESET_SETTINGS' })}
          fullWidth
        >
          Reset Settings
        </Button>
      </div>
    </div>
  )
}

const ProviderPatternExample = () => {
  const [showCode, setShowCode] = useState(false)
  
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Provider Pattern</h3>
        <p className="text-blue-800 text-sm">
          The Provider pattern uses React Context to share state and functions across the component tree 
          without prop drilling. It's perfect for global state, themes, authentication, and configuration.
        </p>
      </div>

      {/* Toggle Code View */}
      <div className="flex justify-center">
        <Button
          variant={showCode ? 'primary' : 'secondary'}
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? 'Show Demo' : 'Show Code'}
        </Button>
      </div>

      {showCode ? (
        // Code Examples
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Context Creation</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`// 1. Create Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 2. Create Provider Component
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [primaryColor, setPrimaryColor] = useState('#3b82f6')

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, primaryColor, toggleTheme, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Create Custom Hook
const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}`}</pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Provider with Reducer</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`// Settings with useReducer for complex state
const settingsReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, notifications: !state.notifications }
    default:
      return state
  }
}

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings)

  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {children}
    </SettingsContext.Provider>
  )
}`}</pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage in Components</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`// Using the context in components
const ThemeControls = () => {
  const { theme, toggleTheme, setPrimaryColor } = useTheme()
  
  return (
    <div>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
      </button>
      <input
        type="color"
        onChange={(e) => setPrimaryColor(e.target.value)}
      />
    </div>
  )
}

// Multiple providers can be nested
function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <SettingsProvider>
          <MyApp />
        </SettingsProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}`}</pre>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Benefits</h4>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Eliminates prop drilling</li>
                <li>• Centralized state management</li>
                <li>• Easy to test providers in isolation</li>
                <li>• Flexible and composable</li>
                <li>• Type-safe with TypeScript</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2">Best Practices</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Create custom hooks for context access</li>
                <li>• Throw errors for missing providers</li>
                <li>• Split contexts by concern</li>
                <li>• Use useReducer for complex state</li>
                <li>• Memoize context values when needed</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        // Live Demo
        <NotificationProvider>
          <SettingsProvider>
            <ThemeProvider>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ThemeControls />
                <NotificationTester />
                <SettingsPanel />
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Current State</h4>
                <div className="text-sm text-gray-600">
                  Try the controls above to see how the Provider pattern enables 
                  global state management without prop drilling. The theme, notifications, 
                  and settings are all managed by separate providers.
                </div>
              </div>
            </ThemeProvider>
          </SettingsProvider>
        </NotificationProvider>
      )}
    </div>
  )
}

export default ProviderPatternExample
