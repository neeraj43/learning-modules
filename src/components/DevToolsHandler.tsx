'use client'

import { useEffect } from 'react'

const DevToolsHandler = () => {
  useEffect(() => {
    // Handle React DevTools profiling warnings for React 19 compatibility
    const originalConsoleWarn = console.warn
    const originalConsoleError = console.error

    const suppressProfilerWarnings = (originalMethod: typeof console.warn) => {
      return (...args: any[]) => {
        const message = args[0]
        if (typeof message === 'string') {
          // Suppress specific React DevTools profiling warnings
          if (
            message.includes('Timeline profiling not supported') ||
            message.includes('Timeline profiler requires a development or profiling build') ||
            message.includes('react-dom@^18') ||
            message.includes('Profiler API') ||
            message.includes('DevTools profiler')
          ) {
            // Optionally show a user-friendly message instead
            if (process.env.NODE_ENV === 'development') {
              console.info(
                '💡 React DevTools Profiling: This app uses React 19. For profiling, please update React DevTools extension or use React 18 build.'
              )
            }
            return // Suppress the warning
          }
        }
        // Allow other warnings/errors to show normally
        originalMethod.apply(console, args)
      }
    }

    // Override console methods during development
    if (process.env.NODE_ENV === 'development') {
      console.warn = suppressProfilerWarnings(originalConsoleWarn)
      console.error = suppressProfilerWarnings(originalConsoleError)
    }

    // Cleanup function to restore original console methods
    return () => {
      console.warn = originalConsoleWarn
      console.error = originalConsoleError
    }
  }, [])

  // Also handle any global React DevTools hooks
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // Check if React DevTools is present
      const isReactDevToolsPresent = !!(
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || 
        (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__
      )

      if (isReactDevToolsPresent) {
        console.info(
          '🔧 React DevTools detected. Note: Some profiling features may not be available with React 19. This is normal and doesn\'t affect your app.'
        )
      }
    }
  }, [])

  return null // This component doesn't render anything
}

export default DevToolsHandler
