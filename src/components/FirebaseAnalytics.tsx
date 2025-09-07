'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/firebase'
import { logEvent } from 'firebase/analytics'

const FirebaseAnalytics = () => {
  useEffect(() => {
    // Only initialize analytics if it's available (client-side)
    if (analytics) {
      // Log page view
      logEvent(analytics, 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
      })
      
      console.log('Firebase Analytics initialized successfully')
    }
  }, [])

  // This component doesn't render anything
  return null
}

export default FirebaseAnalytics
