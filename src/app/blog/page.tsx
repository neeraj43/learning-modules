'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Users, ArrowRight, Play, ExternalLink, Code } from 'lucide-react'
import Link from 'next/link'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'

// Blog article type
interface BlogArticle {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  difficulty: string
  tags: string[]
  publishDate: string
  author: string
  videoRef?: string
  content: string
}

// Blog article data
const blogArticles: BlogArticle[] = [
  {
    id: 'react-startup-lifecycle',
    title: 'How React Applications Start: From Bundle to Browser',
    excerpt: 'Deep dive into React application startup process, file loading order, and initial render cycle',
    category: 'React Fundamentals',
    readTime: '8 min read',
    difficulty: 'Intermediate',
    tags: ['React', 'Bundle', 'Startup', 'Performance'],
    publishDate: '2024-09-15',
    author: 'React Learning Team',
    videoRef: 'https://www.youtube.com/watch?v=8pDqJVdNa44',
    content: `
# How React Applications Start: From Bundle to Browser

## Table of Contents
1. [The Initial File Structure](#initial-structure)
2. [Bundle Loading Process](#bundle-loading)
3. [React Initialization](#react-init)
4. [Component Mounting](#component-mounting)
5. [Hydration Process](#hydration)

## The Initial File Structure {#initial-structure}

When you run \`npm start\` or \`yarn dev\`, your React application goes through a sophisticated startup process. Let's trace this journey from the very beginning.

### Entry Points and Key Files

\`\`\`
src/
├── index.tsx           # 🎯 Main entry point
├── App.tsx            # 🏠 Root component
├── index.css         # 🎨 Global styles
└── components/       # 📦 Component tree
\`\`\`

### 1. **index.html** - The Foundation
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>React App</title>
  <link rel="stylesheet" href="/static/css/main.css">
</head>
<body>
  <div id="root"></div>
  <script src="/static/js/main.js"></script>
</body>
</html>
\`\`\`

## Bundle Loading Process {#bundle-loading}

### Phase 1: HTML Parse and Resource Discovery
1. **HTML parsing** begins
2. **CSS resources** discovered and downloaded
3. **JavaScript bundles** discovered
4. **Critical resources** prioritized

### Phase 2: JavaScript Execution
\`\`\`javascript
// main.js bundle execution order:
1. Webpack runtime
2. Vendor chunks (React, ReactDOM)
3. Application code
4. Entry point execution
\`\`\`

## React Initialization {#react-init}

### Step-by-Step Process

\`\`\`tsx
// 1. React entry point (index.tsx)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 2. Root element selection
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// 3. Initial render
root.render(<App />)
\`\`\`

### What Happens During \`createRoot\`?
1. **Fiber root creation** - React's reconciliation engine
2. **Event system setup** - Event delegation initialization
3. **Scheduler initialization** - Task prioritization system
4. **Initial render preparation**

## Component Mounting {#component-mounting}

### The Mounting Lifecycle

\`\`\`tsx
// Component lifecycle during startup
1. Constructor / useState initialization
2. render() method execution
3. Virtual DOM creation
4. DOM commit
5. useEffect / componentDidMount execution
\`\`\`

### Performance Considerations

\`\`\`tsx
// ❌ Avoid heavy computations in render
function App() {
  const expensiveValue = heavyComputation() // Bad!
  
  return <div>{expensiveValue}</div>
}

// ✅ Use useMemo for expensive operations
function App() {
  const expensiveValue = useMemo(() => 
    heavyComputation(), []
  )
  
  return <div>{expensiveValue}</div>
}
\`\`\`

## Hydration Process (SSR) {#hydration}

In Next.js applications, hydration is crucial:

\`\`\`tsx
// Client-side hydration process
1. Server-rendered HTML loads instantly
2. JavaScript bundles download
3. React "hydrates" static HTML
4. Event listeners attached
5. Interactive application ready
\`\`\`

## Performance Metrics

### Core Web Vitals Impact
- **FCP (First Contentful Paint)**: CSS and initial HTML
- **LCP (Largest Contentful Paint)**: Main content rendering
- **FID (First Input Delay)**: JavaScript execution completion
- **CLS (Cumulative Layout Shift)**: Layout stability

## Optimization Strategies

### 1. Code Splitting
\`\`\`tsx
// Lazy load components
const LazyComponent = lazy(() => import('./LazyComponent'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  )
}
\`\`\`

### 2. Preloading Critical Resources
\`\`\`html
<link rel="preload" href="/critical.css" as="style">
<link rel="preload" href="/hero-image.jpg" as="image">
\`\`\`

### 3. Bundle Analysis
\`\`\`bash
# Analyze your bundle size
npm run build --analyze
# or
npx webpack-bundle-analyzer build/static/js/*.js
\`\`\`

## Video References

### Essential Watching
1. **React Fiber Architecture** - [Lin Clark's React Conf Talk](https://www.youtube.com/watch?v=ZCuYPiUIONs)
2. **React Performance** - [Kent C. Dodds Performance Workshop](https://kentcdodds.com/blog/optimize-react-re-renders)
3. **Bundle Optimization** - [Webpack Academy Bundle Analysis](https://webpack.academy/)

## Tools for Analysis

### Development Tools
- **React DevTools Profiler** - Measure render performance
- **Chrome DevTools Performance** - Analyze loading timeline
- **Lighthouse** - Overall performance audit
- **Bundle Analyzer** - Visualize bundle composition

## Next Steps

Understanding React's startup process helps you:
- 🎯 Identify performance bottlenecks
- 📦 Optimize bundle loading
- ⚡ Improve initial page load
- 🔧 Better debugging capabilities

Ready to dive deeper? Check out our next article on CSS chunk optimization!
    `
  },
  {
    id: 'css-chunk-optimization',
    title: 'CSS Chunks and Loading Optimization: A Complete Guide',
    excerpt: 'Master CSS chunk loading, critical CSS extraction, and advanced optimization techniques',
    category: 'Performance',
    readTime: '10 min read',
    difficulty: 'Advanced',
    tags: ['CSS', 'Performance', 'Chunks', 'Optimization'],
    publishDate: '2024-09-15',
    author: 'Performance Team',
    videoRef: 'https://www.youtube.com/watch?v=4-Lel1oaV4M',
    content: `
# CSS Chunks and Loading Optimization: A Complete Guide

## Table of Contents
1. [Understanding CSS Chunks](#css-chunks)
2. [Loading Strategies](#loading-strategies)
3. [Critical CSS Extraction](#critical-css)
4. [Advanced Optimization](#advanced-optimization)
5. [Measurement and Tools](#tools)

## Understanding CSS Chunks {#css-chunks}

### What Are CSS Chunks?

CSS chunks are separate CSS files generated during the build process, typically created by:
- **Route-based splitting** - CSS per page/route
- **Component-based splitting** - CSS per component
- **Vendor splitting** - Third-party CSS libraries

\`\`\`
build/
├── static/css/
│   ├── main.css           # 🎯 Critical/global styles
│   ├── 1.chunk.css        # 📄 Route-specific styles
│   ├── 2.chunk.css        # 🔧 Component styles
│   └── vendors.css        # 📦 Third-party styles
\`\`\`

### How CSS Chunks Are Generated

\`\`\`javascript
// Webpack CSS chunk configuration
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
  ],
}
\`\`\`

## Loading Strategies {#loading-strategies}

### 1. Synchronous Loading (Default)
\`\`\`html
<!-- Blocks rendering until loaded -->
<link rel="stylesheet" href="/static/css/main.css">
\`\`\`

**Pros**: Prevents FOUC (Flash of Unstyled Content)
**Cons**: Blocks initial render

### 2. Asynchronous Loading
\`\`\`html
<!-- Non-blocking CSS load -->
<link rel="preload" href="/static/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/static/css/main.css"></noscript>
\`\`\`

### 3. Progressive Enhancement
\`\`\`tsx
// Load CSS chunks dynamically
const loadCSS = (href: string) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = resolve
    link.onerror = reject
    document.head.appendChild(link)
  })
}

// Usage in component
useEffect(() => {
  loadCSS('/static/css/dashboard.css')
}, [])
\`\`\`

## Critical CSS Extraction {#critical-css}

### What is Critical CSS?

Critical CSS includes styles needed for **above-the-fold** content - what users see immediately.

### Automatic Extraction Tools

#### 1. Critical CSS Plugin
\`\`\`javascript
const CriticalCssPlugin = require('critical-css-webpack-plugin')

module.exports = {
  plugins: [
    new CriticalCssPlugin({
      base: path.join(__dirname, 'build'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      width: 1300,
      height: 900,
      penthouse: {
        blockJSRequests: false,
      }
    })
  ]
}
\`\`\`

#### 2. Critters (Used by Next.js)
\`\`\`javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true, // Enables automatic critical CSS
  },
}
\`\`\`

### Manual Critical CSS Strategy

\`\`\`css
/* critical.css - Above the fold styles */
.header { /* Critical */ }
.hero-section { /* Critical */ }
.navigation { /* Critical */ }

/* non-critical.css - Below the fold */
.footer { /* Non-critical */ }
.modal { /* Non-critical */ }
.testimonials { /* Non-critical */ }
\`\`\`

## Advanced Optimization {#advanced-optimization}

### 1. CSS-in-JS Optimization

\`\`\`tsx
// ❌ Runtime CSS-in-JS (slower)
const StyledComponent = styled.div\`
  color: \${props => props.theme.primary};
  font-size: 16px;
\`

// ✅ Zero-runtime CSS-in-JS
import { css } from '@emotion/react'

const styles = css\`
  color: var(--primary);
  font-size: 16px;
\`
\`\`\`

### 2. Tailwind CSS Optimization

\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Enable JIT for faster builds
  mode: 'jit',
  // Purge unused styles
  purge: {
    enabled: true,
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
  },
}
\`\`\`

### 3. SCSS/SASS Optimization

\`\`\`scss
// Use @use instead of @import for better tree-shaking
@use 'variables' as vars;
@use 'mixins' as mix;

// Avoid deep nesting (max 3 levels)
.card {
  .header {
    .title { } // ✅ OK
    .subtitle {
      .description { } // ❌ Too deep
    }
  }
}
\`\`\`

### 4. CSS Custom Properties for Dynamic Theming

\`\`\`css
/* Define CSS variables */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6b7280;
  --background: #ffffff;
}

[data-theme="dark"] {
  --primary-color: #60a5fa;
  --secondary-color: #9ca3af;
  --background: #111827;
}

/* Use in components */
.button {
  background-color: var(--primary-color);
  color: var(--background);
}
\`\`\`

## CSS Loading Performance Patterns

### 1. Resource Hints
\`\`\`html
<!-- Preload critical CSS -->
<link rel="preload" href="/critical.css" as="style">

<!-- Prefetch non-critical CSS -->
<link rel="prefetch" href="/dashboard.css">

<!-- Preconnect to font CDNs -->
<link rel="preconnect" href="https://fonts.googleapis.com">
\`\`\`

### 2. Font Loading Optimization
\`\`\`css
/* Use font-display for better loading experience */
@font-face {
  font-family: 'Open Sans';
  src: url('/fonts/opensans.woff2') format('woff2');
  font-display: swap; /* Show fallback font immediately */
}
\`\`\`

### 3. CSS Container Queries (Modern)
\`\`\`css
/* Responsive design without media queries */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
\`\`\`

## Measurement and Tools {#tools}

### Performance Metrics

#### CSS-Specific Metrics
- **CSSOM Construction Time** - How long CSS parsing takes
- **Render Blocking Time** - Time spent waiting for CSS
- **Style Recalculation** - Time spent computing styles
- **Layout Thrashing** - Unnecessary layout recalculations

### Essential Tools

#### 1. Chrome DevTools
\`\`\`javascript
// Measure CSS performance
performance.mark('css-start')
// ... CSS loading
performance.mark('css-end')
performance.measure('css-load', 'css-start', 'css-end')
\`\`\`

#### 2. Bundle Analyzers
\`\`\`bash
# Analyze CSS bundle sizes
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/css/*.css
\`\`\`

#### 3. CSS Coverage (Chrome DevTools)
1. Open DevTools → Coverage Tab
2. Record page load
3. See unused CSS percentage
4. Identify optimization opportunities

### Real-World Performance Case Study

\`\`\`javascript
// Before optimization
Initial CSS bundle: 450KB
Render blocking time: 380ms
First Contentful Paint: 1.2s

// After optimization (critical CSS + lazy loading)
Critical CSS: 45KB
Non-critical CSS: 405KB (lazy loaded)
Render blocking time: 80ms
First Contentful Paint: 0.4s

// 🎉 Result: 70% faster initial render!
\`\`\`

## Video References

### Must-Watch Resources
1. **CSS Performance** - [Harry Roberts - CSS for Software Engineers](https://www.youtube.com/watch?v=wjslAWJtNWU)
2. **Critical CSS** - [Addy Osmani - Critical Resource Optimization](https://www.youtube.com/watch?v=YJGCZCaIZkQ)
3. **Modern CSS Loading** - [Una Kravets - New CSS Features](https://www.youtube.com/watch?v=VQraviuwbzU)

## Implementation Checklist

### ✅ Immediate Actions
- [ ] Extract critical CSS for above-the-fold content
- [ ] Implement CSS chunking strategy
- [ ] Add resource hints (preload/prefetch)
- [ ] Optimize font loading

### ✅ Advanced Optimizations
- [ ] Implement CSS-in-JS optimization
- [ ] Set up automated critical CSS extraction
- [ ] Configure CSS tree-shaking
- [ ] Implement progressive CSS loading

### ✅ Monitoring
- [ ] Set up CSS performance monitoring
- [ ] Track CSS bundle sizes
- [ ] Monitor Core Web Vitals
- [ ] Regular performance audits

Ready for the next level? Check out our comprehensive React Performance Optimization guide!
    `
  },
  {
    id: 'react-performance-optimization',
    title: 'React Performance Optimization: Build & Runtime Strategies',
    excerpt: 'Complete guide to optimizing React applications for production - from build-time to runtime',
    category: 'Performance',
    readTime: '12 min read',
    difficulty: 'Advanced',
    tags: ['React', 'Performance', 'Optimization', 'Production'],
    publishDate: '2024-09-15',
    author: 'Performance Team',
    videoRef: 'https://www.youtube.com/watch?v=00RoZflFE34',
    content: `
# React Performance Optimization: Build & Runtime Strategies

## Table of Contents
1. [Build-Time Optimizations](#build-time)
2. [Runtime Performance](#runtime-performance)
3. [Bundle Optimization](#bundle-optimization)
4. [Memory Management](#memory-management)
5. [Monitoring & Measurement](#monitoring)

## Build-Time Optimizations {#build-time}

### 1. Production Build Configuration

\`\`\`javascript
// webpack.config.js - Production optimizations
module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console.logs
            drop_debugger: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
        },
      },
    },
  },
}
\`\`\`

### 2. Tree Shaking Configuration

\`\`\`javascript
// package.json - Enable tree shaking
{
  "sideEffects": false, // Mark package as side-effect free
  // OR specify specific files with side effects
  "sideEffects": ["*.css", "*.scss", "./src/polyfills.js"]
}

// Import optimization
// ❌ Imports entire library
import * as _ from 'lodash'

// ✅ Import only what you need
import { debounce, throttle } from 'lodash'
// OR use babel-plugin-import
import debounce from 'lodash/debounce'
\`\`\`

### 3. Code Splitting Strategies

\`\`\`tsx
// 1. Route-based splitting
const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

// 2. Component-based splitting
const ExpensiveModal = lazy(() => import('./ExpensiveModal'))

function App() {
  const [showModal, setShowModal] = useState(false)
  
  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Show Modal
      </button>
      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <ExpensiveModal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </div>
  )
}

// 3. Feature-based splitting
const AdminPanel = lazy(() => 
  import('./AdminPanel').then(module => ({
    default: module.AdminPanel
  }))
)
\`\`\`

## Runtime Performance {#runtime-performance}

### 1. React.memo and Memoization

\`\`\`tsx
// ❌ Component re-renders on every parent render
const ExpensiveComponent = ({ data, onUpdate }) => {
  const processedData = expensiveComputation(data)
  return <div>{processedData}</div>
}

// ✅ Memoized component with custom comparison
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => 
    expensiveComputation(data), [data]
  )
  
  return <div>{processedData}</div>
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.data.id === nextProps.data.id
})

// ✅ useCallback for stable function references
const ParentComponent = () => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])
  
  // ❌ New function on every render
  const handleUpdate = (id) => {
    setItems(items => items.map(item => 
      item.id === id ? { ...item, updated: true } : item
    ))
  }
  
  // ✅ Memoized callback
  const handleUpdate = useCallback((id) => {
    setItems(items => items.map(item => 
      item.id === id ? { ...item, updated: true } : item
    ))
  }, []) // Empty deps because we use functional update
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <ExpensiveComponent data={items} onUpdate={handleUpdate} />
    </div>
  )
}
\`\`\`

### 2. Virtual Scrolling for Large Lists

\`\`\`tsx
import { FixedSizeList as List } from 'react-window'

const VirtualizedList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <div className="item">
        {items[index].name}
      </div>
    </div>
  )
  
  return (
    <List
      height={600}        // Container height
      itemCount={items.length}
      itemSize={50}       // Each item height
      width="100%"
    >
      {Row}
    </List>
  )
}

// For dynamic heights
import { VariableSizeList } from 'react-window'

const DynamicVirtualizedList = ({ items }) => {
  const getItemSize = (index) => {
    // Calculate dynamic height based on content
    return items[index].content.length > 100 ? 120 : 60
  }
  
  return (
    <VariableSizeList
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </VariableSizeList>
  )
}
\`\`\`

### 3. Optimizing Re-renders

\`\`\`tsx
// ❌ Causes unnecessary re-renders
const App = () => {
  const [user, setUser] = useState({ name: '', email: '' })
  const [posts, setPosts] = useState([])
  
  return (
    <div>
      <UserProfile user={user} />
      <PostsList posts={posts} />
    </div>
  )
}

// ✅ Split state to reduce re-render scope
const App = () => {
  return (
    <div>
      <UserProfileContainer />
      <PostsListContainer />
    </div>
  )
}

const UserProfileContainer = () => {
  const [user, setUser] = useState({ name: '', email: '' })
  return <UserProfile user={user} onUpdate={setUser} />
}

const PostsListContainer = () => {
  const [posts, setPosts] = useState([])
  return <PostsList posts={posts} onUpdate={setPosts} />
}

// ✅ Use context wisely to avoid prop drilling
const ThemeContext = createContext()
const UserContext = createContext()

// Split contexts to minimize re-renders
const App = () => (
  <ThemeProvider>
    <UserProvider>
      <MainApp />
    </UserProvider>
  </ThemeProvider>
)
\`\`\`

## Bundle Optimization {#bundle-optimization}

### 1. Analyzing Bundle Size

\`\`\`bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Add to package.json scripts
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
  }
}

# Run analysis
npm run analyze
\`\`\`

### 2. Dynamic Imports for Vendor Libraries

\`\`\`tsx
// ❌ Chart.js loaded upfront (large bundle)
import Chart from 'chart.js/auto'

const Dashboard = () => {
  return <Chart data={chartData} />
}

// ✅ Load Chart.js only when needed
const Dashboard = () => {
  const [ChartComponent, setChartComponent] = useState(null)
  
  useEffect(() => {
    const loadChart = async () => {
      const { default: Chart } = await import('chart.js/auto')
      const ChartReact = ({ data }) => {
        // Chart implementation
        return <canvas ref={chartRef} />
      }
      setChartComponent(() => ChartReact)
    }
    
    loadChart()
  }, [])
  
  return ChartComponent ? <ChartComponent data={chartData} /> : <Loader />
}

// ✅ Create a reusable dynamic import hook
const useDynamicImport = (importFunc) => {
  const [component, setComponent] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    importFunc()
      .then(module => {
        setComponent(() => module.default)
        setLoading(false)
      })
      .catch(console.error)
  }, [importFunc])
  
  return { component, loading }
}

// Usage
const Dashboard = () => {
  const { component: Chart, loading } = useDynamicImport(
    () => import('chart.js/auto')
  )
  
  if (loading) return <Loader />
  return <Chart data={chartData} />
}
\`\`\`

### 3. Service Worker for Caching

\`\`\`javascript
// sw.js - Service Worker for aggressive caching
const CACHE_NAME = 'app-v1'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/api/critical-data'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
  )
})

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
\`\`\`

## Memory Management {#memory-management}

### 1. Preventing Memory Leaks

\`\`\`tsx
// ❌ Memory leak - event listener not cleaned up
const Component = () => {
  useEffect(() => {
    const handleScroll = () => {
      // Handle scroll
    }
    
    window.addEventListener('scroll', handleScroll)
    // Missing cleanup!
  }, [])
  
  return <div>Content</div>
}

// ✅ Proper cleanup
const Component = () => {
  useEffect(() => {
    const handleScroll = () => {
      // Handle scroll
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return <div>Content</div>
}

// ✅ AbortController for fetch requests
const Component = () => {
  useEffect(() => {
    const controller = new AbortController()
    
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data', {
          signal: controller.signal
        })
        const data = await response.json()
        setData(data)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error)
        }
      }
    }
    
    fetchData()
    
    return () => {
      controller.abort()
    }
  }, [])
}
\`\`\`

### 2. Optimizing Large Objects

\`\`\`tsx
// ❌ Storing large objects in state
const [largeDataset, setLargeDataset] = useState(hugeArray)

// ✅ Use refs for large objects that don't trigger re-renders
const largeDatasetRef = useRef(hugeArray)
const [currentPage, setCurrentPage] = useState(0)

// ✅ Implement pagination for large datasets
const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(0)
  
  const paginatedData = useMemo(() => {
    const start = currentPage * itemsPerPage
    return data.slice(start, start + itemsPerPage)
  }, [data, currentPage, itemsPerPage])
  
  return {
    paginatedData,
    currentPage,
    setCurrentPage,
    totalPages: Math.ceil(data.length / itemsPerPage)
  }
}
\`\`\`

## Monitoring & Measurement {#monitoring}

### 1. Performance Metrics

\`\`\`tsx
// Custom performance monitoring hook
const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Measure component mount time
    const mountStart = performance.now()
    
    return () => {
      const mountTime = performance.now() - mountStart
      console.log(\`Component mounted in \${mountTime}ms\`)
      
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'component_mount',
          value: Math.round(mountTime)
        })
      }
    }
  }, [])
}

// Render performance monitoring
const useRenderPerformance = (componentName) => {
  const renderCount = useRef(0)
  const lastRenderTime = useRef(performance.now())
  
  useEffect(() => {
    renderCount.current++
    const now = performance.now()
    const timeSinceLastRender = now - lastRenderTime.current
    lastRenderTime.current = now
    
    console.log(\`\${componentName} - Render #\${renderCount.current}, Time since last: \${timeSinceLastRender}ms\`)
  })
}
\`\`\`

### 2. Core Web Vitals Monitoring

\`\`\`javascript
// Install web-vitals
npm install web-vitals

// Monitor Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric)
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
\`\`\`

### 3. React DevTools Profiler

\`\`\`tsx
// Wrap components in Profiler for detailed metrics
import { Profiler } from 'react'

const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
  console.log({
    id,              // Component identifier
    phase,           // "mount" or "update"
    actualDuration,  // Time spent rendering
    baseDuration,    // Estimated time without memoization
    startTime,       // When render started
    commitTime       // When changes were committed
  })
}

const App = () => (
  <Profiler id="App" onRender={onRenderCallback}>
    <Header />
    <Profiler id="Main" onRender={onRenderCallback}>
      <MainContent />
    </Profiler>
    <Footer />
  </Profiler>
)
\`\`\`

## Video References

### Essential Learning Resources
1. **React Performance** - [React Conf 2019 - Optimizing React Performance](https://www.youtube.com/watch?v=00RoZflFE34)
2. **Bundle Optimization** - [Webpack Academy - Bundle Splitting](https://webpack.academy/)
3. **Core Web Vitals** - [Google I/O - Web Vitals](https://www.youtube.com/watch?v=AQqFZ5t8uNc)
4. **Memory Management** - [JavaScript Memory Management](https://www.youtube.com/watch?v=LJF92V7r1dc)

## Performance Checklist

### ✅ Build Optimization
- [ ] Enable production mode
- [ ] Configure tree shaking
- [ ] Implement code splitting
- [ ] Analyze bundle size
- [ ] Set up service worker

### ✅ Runtime Optimization
- [ ] Use React.memo appropriately
- [ ] Implement virtual scrolling for large lists
- [ ] Optimize state structure
- [ ] Use useCallback/useMemo wisely
- [ ] Split contexts to minimize re-renders

### ✅ Memory Management
- [ ] Clean up event listeners
- [ ] Cancel ongoing requests
- [ ] Use refs for large non-reactive data
- [ ] Implement pagination
- [ ] Monitor memory usage

### ✅ Monitoring
- [ ] Set up performance monitoring
- [ ] Track Core Web Vitals
- [ ] Use React DevTools Profiler
- [ ] Monitor bundle sizes over time
- [ ] Set up performance budgets

## Next Steps

Master these optimization techniques to:
- 🚀 Achieve sub-second load times
- ⚡ Smooth 60fps interactions
- 📱 Better mobile performance
- 💰 Reduce hosting costs
- 😊 Improved user experience

Ready to implement? Start with build optimization and work your way through runtime performance!
    `
  }
]

const BlogPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'React Fundamentals', 'Performance', 'Optimization', 'Build Tools']

  const filteredArticles = blogArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (selectedArticle) {
    return <BlogArticle article={selectedArticle} onBack={() => setSelectedArticle(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              React Deep Dive Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides on React application lifecycle, performance optimization, 
              build strategies, and modern development practices.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-lg">In-Depth Articles</h3>
              </div>
              <p className="text-gray-600">Comprehensive guides covering React fundamentals to advanced optimization</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-2">
                <Play className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-lg">Video References</h3>
              </div>
              <p className="text-gray-600">Curated video resources from industry experts and conferences</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-lg">Code Examples</h3>
              </div>
              <p className="text-gray-600">Practical implementations and real-world optimization techniques</p>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded">
                      {article.difficulty}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {article.author}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{article.publishDate}</span>
                      <div className="flex items-center gap-2 text-blue-600 font-medium">
                        Read More <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// Blog Article Component
interface BlogArticleProps {
  article: BlogArticle
  onBack: () => void
}

const BlogArticle: React.FC<BlogArticleProps> = ({ article, onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Articles
        </button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
              {article.category}
            </span>
            <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded">
              {article.difficulty}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {article.author}
              </div>
              <span>{article.publishDate}</span>
            </div>
          </div>
          
          {/* Video Reference */}
          {article.videoRef && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Featured Video Resource</span>
                <Link href={article.videoRef} target="_blank" className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                  Watch Now <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <MarkdownRenderer content={article.content} />
      </div>
    </div>
  )
}

export default BlogPage
