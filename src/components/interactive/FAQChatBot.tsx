'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Bot, User, X, HelpCircle, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  isTyping?: boolean
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

const FAQChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! 👋 I\'m your learning assistant. Ask me anything about programming, frameworks, databases, or any topic from our courses!',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'chat' | 'faq'>('chat')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Comprehensive FAQ Database
  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'What is the difference between JavaScript and Java?',
      answer: 'Despite similar names, JavaScript and Java are completely different languages. JavaScript is a scripting language primarily used for web development, while Java is a compiled, object-oriented language used for enterprise applications, Android development, and more. JavaScript runs in browsers and Node.js, while Java runs on the Java Virtual Machine (JVM).',
      category: 'Programming Languages',
      tags: ['javascript', 'java', 'basics', 'differences']
    },
    {
      id: '2',
      question: 'How do I start learning React?',
      answer: 'To start learning React: 1) Learn JavaScript fundamentals first, 2) Understand HTML/CSS, 3) Learn ES6+ features, 4) Start with create-react-app, 5) Learn components, JSX, and props, 6) Understand state and hooks, 7) Practice with small projects. Our React section has step-by-step tutorials!',
      category: 'React',
      tags: ['react', 'beginner', 'learning-path', 'getting-started']
    },
    {
      id: '3',
      question: 'What is MongoDB and when should I use it?',
      answer: 'MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. Use MongoDB when: 1) You need flexible schemas, 2) Working with complex nested data, 3) Rapid prototyping, 4) Horizontal scaling is important, 5) Real-time analytics. It\'s great for content management, IoT applications, and modern web apps.',
      category: 'Databases',
      tags: ['mongodb', 'nosql', 'database', 'when-to-use']
    },
    {
      id: '4',
      question: 'How do I deploy a Next.js application?',
      answer: 'Next.js can be deployed in several ways: 1) Vercel (recommended) - simple git integration, 2) Netlify - great for static sites, 3) AWS/Google Cloud/Azure, 4) Self-hosted with PM2, 5) Docker containers. For static export, use `next build && next export`. Our deployment section covers all methods!',
      category: 'Next.js',
      tags: ['nextjs', 'deployment', 'vercel', 'hosting']
    },
    {
      id: '5',
      question: 'What\'s the difference between SQL and NoSQL databases?',
      answer: 'SQL databases (MySQL, PostgreSQL) use structured tables with predefined schemas and ACID transactions. NoSQL databases (MongoDB, DynamoDB) offer flexible schemas, horizontal scaling, and various data models (document, key-value, graph). Choose SQL for complex relationships and transactions, NoSQL for flexibility and scale.',
      category: 'Databases',
      tags: ['sql', 'nosql', 'database', 'comparison']
    },
    {
      id: '6',
      question: 'How do I handle errors in JavaScript?',
      answer: 'JavaScript error handling: 1) try-catch blocks for synchronous code, 2) catch() for Promises, 3) async/await with try-catch, 4) window.onerror for global errors, 5) Custom error classes, 6) Proper error logging. Always validate inputs and provide meaningful error messages to users.',
      category: 'JavaScript',
      tags: ['javascript', 'error-handling', 'try-catch', 'debugging']
    },
    {
      id: '7',
      question: 'What are React Hooks and why use them?',
      answer: 'React Hooks let you use state and lifecycle features in functional components. Key hooks: useState (state management), useEffect (side effects), useContext (context), useMemo (memoization), useCallback (function memoization). Benefits: simpler code, better reusability, easier testing, and no class component complexity.',
      category: 'React',
      tags: ['react', 'hooks', 'usestate', 'useeffect', 'functional-components']
    },
    {
      id: '8',
      question: 'How do I optimize website performance?',
      answer: 'Website optimization techniques: 1) Minimize HTTP requests, 2) Optimize images (WebP, lazy loading), 3) Minify CSS/JS, 4) Use CDN, 5) Enable gzip compression, 6) Optimize database queries, 7) Implement caching, 8) Code splitting, 9) Remove unused code, 10) Use performance monitoring tools.',
      category: 'Performance',
      tags: ['performance', 'optimization', 'web-vitals', 'speed']
    },
    {
      id: '9',
      question: 'What is Docker and why should I use it?',
      answer: 'Docker containerizes applications, packaging code with dependencies for consistent deployment across environments. Benefits: 1) Environment consistency, 2) Faster deployment, 3) Scalability, 4) Isolation, 5) Version control for infrastructure. Use for microservices, CI/CD pipelines, and development environment standardization.',
      category: 'DevOps',
      tags: ['docker', 'containers', 'deployment', 'devops']
    },
    {
      id: '10',
      question: 'How do I learn programming effectively?',
      answer: 'Effective programming learning: 1) Start with fundamentals, 2) Practice daily coding, 3) Build real projects, 4) Read others\' code, 5) Join communities, 6) Teach others, 7) Debug systematically, 8) Stay updated with tech trends, 9) Focus on problem-solving, 10) Be patient and persistent. Practice is key!',
      category: 'Learning',
      tags: ['learning', 'programming', 'study-tips', 'career']
    },
    // JavaScript Advanced Questions
    {
      id: '11',
      question: 'What is the difference between async/await and Promises?',
      answer: 'async/await is syntactic sugar built on top of Promises that makes asynchronous code look synchronous. Promises use .then() and .catch() chains, while async/await uses try-catch blocks. async/await provides better readability and error handling, especially for sequential operations. Both are interchangeable, but async/await is generally preferred for new code.',
      category: 'JavaScript',
      tags: ['javascript', 'async', 'await', 'promises', 'asynchronous']
    },
    {
      id: '12',
      question: 'How does the \'this\' keyword work in JavaScript?',
      answer: 'The \'this\' keyword refers to the object that is currently executing the function. Its value depends on how the function is called: 1) In methods, \'this\' refers to the owner object, 2) In regular functions, \'this\' refers to the global object (window in browsers), 3) In arrow functions, \'this\' is inherited from the enclosing scope, 4) In event handlers, \'this\' refers to the element that triggered the event.',
      category: 'JavaScript',
      tags: ['javascript', 'this', 'context', 'scope', 'arrow-functions']
    },
    {
      id: '13',
      question: 'What are JavaScript closures and why are they useful?',
      answer: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. Closures are useful for: 1) Data privacy and encapsulation, 2) Creating factory functions, 3) Module patterns, 4) Callbacks and event handlers, 5) Partial application and currying. They\'re fundamental to JavaScript\'s functional programming capabilities.',
      category: 'JavaScript',
      tags: ['javascript', 'closures', 'scope', 'functions', 'privacy']
    },
    {
      id: '14',
      question: 'What is the difference between let, const, and var?',
      answer: 'var: function-scoped, hoisted, can be redeclared and reassigned. let: block-scoped, hoisted but not initialized (temporal dead zone), can be reassigned but not redeclared. const: block-scoped, hoisted but not initialized, cannot be reassigned or redeclared (but objects/arrays can be mutated). Use const by default, let when reassignment is needed, avoid var in modern JavaScript.',
      category: 'JavaScript',
      tags: ['javascript', 'let', 'const', 'var', 'scope', 'hoisting']
    },
    // React Advanced Questions
    {
      id: '15',
      question: 'When should I use useCallback and useMemo?',
      answer: 'useCallback memoizes functions to prevent unnecessary re-renders of child components that depend on those functions. useMemo memoizes expensive calculations. Use them when: 1) Passing functions to child components wrapped in React.memo, 2) Functions are dependencies in other hooks, 3) Expensive computations that don\'t need to run on every render. Don\'t overuse them - measure performance first!',
      category: 'React',
      tags: ['react', 'usecallback', 'usememo', 'performance', 'memoization']
    },
    {
      id: '16',
      question: 'How do I manage global state without Redux?',
      answer: 'Several alternatives to Redux: 1) React Context + useReducer for complex state, 2) Zustand for lightweight state management, 3) Jotai for atomic state management, 4) React Query/SWR for server state, 5) Local storage + custom hooks for persistence. Choose based on complexity: Context for simple sharing, dedicated libraries for complex apps.',
      category: 'React',
      tags: ['react', 'state-management', 'context', 'zustand', 'redux-alternatives']
    },
    {
      id: '17',
      question: 'What is the difference between controlled and uncontrolled components?',
      answer: 'Controlled components: React controls the form data through state (value prop + onChange). Uncontrolled components: DOM controls the form data, accessed via refs. Controlled components provide better validation, dynamic behavior, and testing. Uncontrolled components are simpler for basic forms. Generally prefer controlled components for better React patterns.',
      category: 'React',
      tags: ['react', 'forms', 'controlled', 'uncontrolled', 'components']
    },
    {
      id: '18',
      question: 'How do I prevent memory leaks in React?',
      answer: 'Common memory leak prevention: 1) Clean up subscriptions and timers in useEffect cleanup functions, 2) Cancel network requests when components unmount, 3) Remove event listeners, 4) Clear intervals/timeouts, 5) Avoid storing references to unmounted components, 6) Use React.memo() wisely, 7) Check for infinite re-renders. Always return cleanup functions from useEffect.',
      category: 'React',
      tags: ['react', 'memory-leaks', 'useeffect', 'cleanup', 'performance']
    },
    // Next.js Questions
    {
      id: '19',
      question: 'What is the difference between SSR, SSG, and CSR in Next.js?',
      answer: 'SSR (Server-Side Rendering): Pages are rendered on each request on the server. SSG (Static Site Generation): Pages are pre-rendered at build time. CSR (Client-Side Rendering): Pages are rendered in the browser using JavaScript. Use SSG for content that doesn\'t change often, SSR for dynamic content that needs SEO, CSR for interactive dashboards. Next.js supports all three.',
      category: 'Next.js',
      tags: ['nextjs', 'ssr', 'ssg', 'csr', 'rendering', 'performance']
    },
    {
      id: '20',
      question: 'How do Next.js API routes work?',
      answer: 'Next.js API routes create serverless functions in the /api directory. Each file exports a handler function that receives req and res objects. They support HTTP methods (GET, POST, PUT, DELETE), middleware, and can connect to databases. Perfect for creating RESTful APIs, form handling, authentication, and third-party integrations without a separate backend server.',
      category: 'Next.js',
      tags: ['nextjs', 'api-routes', 'serverless', 'backend', 'rest']
    },
    {
      id: '21',
      question: 'What is Next.js middleware and how do I use it?',
      answer: 'Next.js middleware runs code before a request is completed, allowing you to modify the request/response. Common uses: 1) Authentication checks, 2) Redirects and rewrites, 3) Headers modification, 4) A/B testing, 5) Bot detection. Create middleware.ts in your root directory. It runs on Edge Runtime for better performance.',
      category: 'Next.js',
      tags: ['nextjs', 'middleware', 'authentication', 'redirects', 'edge']
    },
    // Node.js Questions
    {
      id: '22',
      question: 'How does the Node.js event loop work?',
      answer: 'The event loop is Node.js\'s concurrency model. It has phases: 1) Timer phase (setTimeout, setInterval), 2) Pending callbacks, 3) Poll phase (fetching new I/O events), 4) Check phase (setImmediate), 5) Close callbacks. Node.js is single-threaded but uses libuv for I/O operations. Understanding this helps write efficient, non-blocking code.',
      category: 'Node.js',
      tags: ['nodejs', 'event-loop', 'asynchronous', 'concurrency', 'libuv']
    },
    {
      id: '23',
      question: 'What is the difference between require() and import?',
      answer: 'require() is CommonJS (Node.js default), synchronous, dynamic imports allowed anywhere. import is ES6 modules, static analysis, hoisted, tree-shaking friendly. Node.js supports both with .mjs files or "type": "module" in package.json. Import is preferred for modern development due to better optimization and standardization.',
      category: 'Node.js',
      tags: ['nodejs', 'require', 'import', 'modules', 'commonjs', 'es6']
    },
    // Python Questions
    {
      id: '24',
      question: 'What is the difference between Django and Flask?',
      answer: 'Django: Full-featured framework with batteries included (ORM, admin, auth, templating). Best for large applications. Flask: Micro-framework, minimal core with extensions. More flexible but requires more setup. Choose Django for rapid development with standard features, Flask for custom architectures or APIs. Both are excellent for different use cases.',
      category: 'Python',
      tags: ['python', 'django', 'flask', 'web-frameworks', 'comparison']
    },
    {
      id: '25',
      question: 'How do I manage Python dependencies and virtual environments?',
      answer: 'Use virtual environments to isolate project dependencies: 1) venv (built-in): python -m venv myenv, 2) conda for data science, 3) pipenv for automatic Pipfile management, 4) poetry for modern dependency management. Always use virtual environments to avoid conflicts between projects. Requirements.txt for simple projects, poetry/pipenv for complex ones.',
      category: 'Python',
      tags: ['python', 'virtual-environments', 'pip', 'poetry', 'dependencies']
    },
    {
      id: '26',
      question: 'What is the difference between list comprehensions and generator expressions?',
      answer: 'List comprehensions create a complete list in memory: [x*2 for x in range(10)]. Generator expressions create an iterator: (x*2 for x in range(10)). Generators are memory-efficient for large datasets, lazy evaluation, can be consumed only once. Use list comprehensions for small datasets you need multiple times, generators for large datasets or streaming data.',
      category: 'Python',
      tags: ['python', 'list-comprehensions', 'generators', 'memory', 'performance']
    },
    // Java Questions
    {
      id: '27',
      question: 'What is the difference between JPA and Hibernate?',
      answer: 'JPA (Java Persistence API) is a specification for ORM in Java. Hibernate is the most popular implementation of JPA. JPA provides annotations and interfaces, Hibernate implements them and adds extra features. You can switch JPA implementations (EclipseLink, OpenJPA), but Hibernate-specific features lock you in. Use JPA annotations for portability.',
      category: 'Java',
      tags: ['java', 'jpa', 'hibernate', 'orm', 'database', 'spring']
    },
    {
      id: '28',
      question: 'What is Spring Boot and how does it differ from Spring?',
      answer: 'Spring Boot is an opinionated framework built on top of Spring Framework. Key differences: 1) Auto-configuration reduces boilerplate, 2) Embedded servers (Tomcat, Jetty), 3) Starter dependencies for easy setup, 4) Production-ready features (metrics, health checks), 5) Minimal XML configuration. Spring Boot makes Spring development faster and easier.',
      category: 'Java',
      tags: ['java', 'spring', 'spring-boot', 'framework', 'auto-configuration']
    },
    {
      id: '29',
      question: 'What are the SOLID principles in Java?',
      answer: 'SOLID principles for better code design: S - Single Responsibility (one reason to change), O - Open/Closed (open for extension, closed for modification), L - Liskov Substitution (objects should be replaceable with subtypes), I - Interface Segregation (many specific interfaces), D - Dependency Inversion (depend on abstractions). These principles improve maintainability and flexibility.',
      category: 'Java',
      tags: ['java', 'solid', 'design-principles', 'oop', 'best-practices']
    },
    // MongoDB Questions
    {
      id: '30',
      question: 'How do I optimize MongoDB queries for better performance?',
      answer: 'MongoDB optimization strategies: 1) Create appropriate indexes on queried fields, 2) Use compound indexes for multiple field queries, 3) Limit returned fields with projection, 4) Use aggregation pipeline efficiently, 5) Avoid large skip() operations, 6) Monitor with explain(), 7) Consider data modeling patterns, 8) Use read preferences for replica sets.',
      category: 'Databases',
      tags: ['mongodb', 'performance', 'indexes', 'aggregation', 'optimization']
    },
    {
      id: '31',
      question: 'What is MongoDB aggregation and when should I use it?',
      answer: 'MongoDB aggregation pipeline processes documents through stages like $match, $group, $sort, $project. Use for: 1) Complex data transformations, 2) Analytics and reporting, 3) Data summarization, 4) Multi-collection operations with $lookup, 5) Real-time calculations. More powerful than simple find() queries but requires careful optimization for large datasets.',
      category: 'Databases',
      tags: ['mongodb', 'aggregation', 'pipeline', 'analytics', 'data-processing']
    },
    // Docker Questions
    {
      id: '32',
      question: 'What are Docker best practices for production?',
      answer: 'Docker production best practices: 1) Use multi-stage builds to reduce image size, 2) Run as non-root user, 3) Use specific tags, avoid :latest, 4) Minimize layers and dependencies, 5) Use .dockerignore files, 6) Implement health checks, 7) Set resource limits, 8) Use secrets management, 9) Regular security scanning, 10) Implement proper logging.',
      category: 'DevOps',
      tags: ['docker', 'production', 'security', 'best-practices', 'optimization']
    },
    {
      id: '33',
      question: 'What is the difference between Docker images and containers?',
      answer: 'Docker images are read-only templates containing application code, dependencies, and configuration. Containers are running instances of images - they\'re the actual execution environment. Think of images as classes and containers as objects. You can create multiple containers from one image. Images are built once, containers are created and destroyed as needed.',
      category: 'DevOps',
      tags: ['docker', 'images', 'containers', 'basics', 'concepts']
    },
    // AWS Questions
    {
      id: '34',
      question: 'What AWS services should I use for hosting a web application?',
      answer: 'Common AWS hosting patterns: 1) EC2 + RDS for traditional apps, 2) Lambda + API Gateway for serverless, 3) ECS/EKS for containers, 4) Elastic Beanstalk for easy deployment, 5) S3 + CloudFront for static sites, 6) Amplify for full-stack apps. Consider factors: traffic patterns, scaling needs, maintenance preferences, and cost requirements.',
      category: 'AWS',
      tags: ['aws', 'hosting', 'ec2', 'lambda', 'serverless', 'deployment']
    },
    {
      id: '35',
      question: 'How do I secure my AWS resources?',
      answer: 'AWS security best practices: 1) Use IAM roles and policies (principle of least privilege), 2) Enable MFA for all users, 3) Use VPC for network isolation, 4) Encrypt data at rest and in transit, 5) Enable CloudTrail for auditing, 6) Regular security groups reviews, 7) Use AWS Config for compliance, 8) Implement AWS WAF for web applications, 9) Regular access reviews.',
      category: 'AWS',
      tags: ['aws', 'security', 'iam', 'vpc', 'encryption', 'best-practices']
    },
    // Testing Questions
    {
      id: '36',
      question: 'What is the difference between unit, integration, and end-to-end tests?',
      answer: 'Unit tests: Test individual functions/components in isolation, fast, many tests. Integration tests: Test how different parts work together, medium speed, fewer tests. E2E tests: Test complete user workflows, slow, few tests. Follow the testing pyramid: many unit tests, some integration tests, few E2E tests. Each level catches different types of bugs.',
      category: 'Testing',
      tags: ['testing', 'unit-tests', 'integration-tests', 'e2e', 'testing-pyramid']
    },
    {
      id: '37',
      question: 'How do I test React components effectively?',
      answer: 'React testing strategies: 1) Use React Testing Library for user-centric tests, 2) Test behavior, not implementation, 3) Mock external dependencies, 4) Test user interactions (clicks, form inputs), 5) Use Jest for unit tests, 6) Test error states and edge cases, 7) Use MSW for API mocking, 8) Avoid testing internal component state directly.',
      category: 'Testing',
      tags: ['testing', 'react', 'react-testing-library', 'jest', 'mocking']
    },
    // Career and Best Practices
    {
      id: '38',
      question: 'How do I prepare for technical interviews?',
      answer: 'Technical interview preparation: 1) Master data structures and algorithms, 2) Practice coding on whiteboards/online platforms, 3) Study system design for senior roles, 4) Review your projects thoroughly, 5) Practice behavioral questions (STAR method), 6) Research the company and role, 7) Prepare thoughtful questions, 8) Mock interviews with peers, 9) Stay calm and think out loud during coding.',
      category: 'Career',
      tags: ['career', 'interviews', 'algorithms', 'system-design', 'preparation']
    },
    {
      id: '39',
      question: 'What are the most important skills for a full-stack developer?',
      answer: 'Essential full-stack skills: 1) Frontend: HTML/CSS, JavaScript, React/Vue/Angular, 2) Backend: Node.js/Python/Java, databases, APIs, 3) DevOps: Git, CI/CD, cloud services, 4) Soft skills: Problem-solving, communication, 5) Architecture: System design, security basics, 6) Tools: IDE, debugging, testing. Focus on depth in one stack, breadth across the full stack.',
      category: 'Career',
      tags: ['career', 'full-stack', 'skills', 'frontend', 'backend', 'devops']
    },
    {
      id: '40',
      question: 'How do I keep up with rapidly changing technology?',
      answer: 'Staying current in tech: 1) Follow tech blogs and newsletters, 2) Join developer communities (Reddit, Discord, Twitter), 3) Attend conferences and meetups, 4) Take online courses regularly, 5) Contribute to open source, 6) Build side projects with new tech, 7) Follow industry leaders, 8) Focus on fundamentals that don\'t change often, 9) Learn new tools when needed for projects.',
      category: 'Career',
      tags: ['career', 'learning', 'technology', 'staying-current', 'growth']
    },
    {
      id: '41',
      question: 'What are the main differences between C++ and other programming languages?',
      answer: 'C++ offers direct memory management, multiple inheritance, and compiled performance. Unlike Python/JavaScript, it requires manual memory management but provides maximum control and speed.',
      category: 'C++',
      tags: ['cpp', 'comparison', 'memory', 'performance']
    },
    {
      id: '42',
      question: 'How do pointers work in C++ and why are they important?',
      answer: 'Pointers store memory addresses of variables. They\'re crucial for dynamic memory allocation, building data structures like linked lists, and enabling efficient parameter passing.',
      category: 'C++',
      tags: ['cpp', 'pointers', 'memory', 'data-structures']
    },
    {
      id: '43',
      question: 'What data structure should I use for fast searching?',
      answer: 'Hash tables (O(1) average), binary search trees (O(log n)), or sorted arrays with binary search (O(log n)). Hash tables are fastest for key-based lookups.',
      category: 'Data Structures',
      tags: ['data-structures', 'searching', 'performance', 'optimization']
    },
    {
      id: '44',
      question: 'When should I use a linked list vs an array?',
      answer: 'Use arrays for: random access, cache efficiency, known size. Use linked lists for: frequent insertions/deletions, unknown size, memory scattered access patterns.',
      category: 'Data Structures',
      tags: ['data-structures', 'arrays', 'linked-lists', 'comparison']
    },
    {
      id: '45',
      question: 'How do I avoid memory leaks in C++?',
      answer: 'Use RAII principles, smart pointers (unique_ptr, shared_ptr), match every \'new\' with \'delete\', use containers like vector instead of raw arrays, and use tools like valgrind for detection.',
      category: 'C++',
      tags: ['cpp', 'memory', 'debugging', 'best-practices']
    }
  ]

  // Simple AI response logic based on keywords
  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    // Check for FAQ matches first
    const matchingFAQ = faqs.find(faq => 
      faq.tags.some(tag => message.includes(tag)) ||
      message.includes(faq.question.toLowerCase().substring(0, 10))
    )
    
    if (matchingFAQ) {
      return matchingFAQ.answer
    }

    // Keyword-based responses
    if (message.includes('react')) {
      return 'React is a powerful library for building user interfaces! Check out our React section for components, hooks, state management, and real-world examples. I can help with useState, useEffect, performance optimization, testing, and more. What specific React topic would you like to explore?'
    }
    
    if (message.includes('javascript') || message.includes('js')) {
      return 'JavaScript is the foundation of modern web development! Our JavaScript section covers variables, functions, objects, async programming, closures, and ES6+ features. I can explain async/await, the \'this\' keyword, event handling, and more. What JavaScript concept can I help you with?'
    }
    
    if (message.includes('mongodb') || message.includes('database')) {
      return 'MongoDB is a fantastic NoSQL database! I can help you with queries, schema design, aggregation pipelines, indexing, and real-world examples. Also covers SQL vs NoSQL comparisons and performance optimization. Check our MongoDB section for hands-on tutorials!'
    }
    
    if (message.includes('next') || message.includes('nextjs')) {
      return 'Next.js is an amazing React framework! It offers SSR, SSG, API routes, middleware, and excellent performance. I can explain the differences between rendering methods, deployment strategies, and best practices. What Next.js feature interests you?'
    }
    
    if (message.includes('java')) {
      return 'Java is a robust, object-oriented language! Our Java section covers OOP concepts, Spring Framework, JPA/Hibernate, collections, and enterprise development. I can help with SOLID principles, testing with JUnit, and real-life projects. Perfect for backend development and Android apps!'
    }
    
    if (message.includes('python')) {
      return 'Python is versatile and beginner-friendly! Great for web development, data science, automation, and AI. Our Python section includes frameworks like Django/Flask, virtual environments, and practical projects. I can explain list comprehensions, generators, and more!'
    }
    
    if (message.includes('docker') || message.includes('container')) {
      return 'Docker is essential for modern development! I can help you understand containers vs images, best practices for production, multi-stage builds, and security. Perfect for consistent deployments and microservices architecture!'
    }
    
    if (message.includes('aws') || message.includes('cloud')) {
      return 'AWS offers powerful cloud services! I can guide you through hosting options (EC2, Lambda, S3), security best practices, cost optimization, and deployment strategies. What AWS service or cloud concept interests you?'
    }
    
    if (message.includes('node') || message.includes('nodejs')) {
      return 'Node.js brings JavaScript to the backend! I can explain the event loop, modules (require vs import), Express.js, API development, and performance optimization. What Node.js topic would you like to explore?'
    }
    
    if (message.includes('spring') || message.includes('springboot')) {
      return 'Spring Boot makes Java development easier! I can help with dependency injection, auto-configuration, REST APIs, data access with JPA, testing, and microservices architecture. What Spring concept interests you?'
    }
    
    if (message.includes('test') || message.includes('testing')) {
      return 'Testing is crucial for quality code! I can explain unit tests, integration tests, E2E tests, Jest, React Testing Library, mocking strategies, and the testing pyramid. What testing concept would you like to learn?'
    }
    
    if (message.includes('performance') || message.includes('optimize')) {
      return 'Performance optimization is key for great user experience! I can help with React performance (useMemo, useCallback), web vitals, lazy loading, code splitting, database optimization, and caching strategies. What performance aspect interests you?'
    }
    
    if (message.includes('interview') || message.includes('technical interview')) {
      return 'Technical interviews can be challenging! I can help you prepare with algorithm practice, system design concepts, behavioral questions (STAR method), and project discussions. Focus on data structures, problem-solving, and clear communication!'
    }
    
    if (message.includes('help') || message.includes('start') || message.includes('begin')) {
      return 'I\'m here to help you learn! 🚀 You can ask me about:\n\n• Programming languages (JavaScript, Python, Java, C++, Node.js)\n• Frameworks (React, Next.js, Spring, Django/Flask)\n• Data Structures & Algorithms (arrays, trees, sorting, Big O)\n• Databases (MongoDB, SQL, performance optimization)\n• DevOps (Docker, AWS, deployment)\n• Career advice and interview preparation\n\nWhat would you like to learn about?'
    }
    
    if (message.includes('career') || message.includes('job') || message.includes('fullstack') || message.includes('full-stack')) {
      return 'Great question about tech careers! Focus on: 1) Master fundamentals, 2) Build a portfolio with real projects, 3) Learn full-stack skills (frontend, backend, databases), 4) Contribute to open source, 5) Network with developers, 6) Stay current with technology. What specific career path interests you?'
    }
    
    if (message.includes('project') || message.includes('build')) {
      return 'Building projects is the best way to learn! 💡 Start with:\n\n• To-do app (state management, CRUD)\n• Blog system (authentication, databases)\n• E-commerce site (payments, user management)\n• Social media app (real-time features)\n• REST API (backend development)\n\nOur examples section has complete project tutorials with Java, React, and more!'
    }
    
    if (message.includes('async') || message.includes('promise') || message.includes('await')) {
      return 'Asynchronous programming is essential for modern JavaScript! I can explain Promises, async/await, error handling, the event loop, and best practices for handling API calls and time-based operations. What async concept would you like to understand better?'
    }
    
    if (message.includes('hook') || message.includes('usestate') || message.includes('useeffect')) {
      return 'React Hooks are powerful for functional components! I can explain useState, useEffect, useContext, useCallback, useMemo, custom hooks, and when to use each one. Hooks make React development more intuitive and reusable!'
    }

    if (message.includes('cpp') || message.includes('c++') || message.includes('pointer')) {
      return 'C++ is a powerful systems programming language! 🔧 I can help with pointers, memory management, object-oriented programming, templates, and performance optimization. Our C++ section covers data structures like linked lists, trees, hash tables, and algorithms. Perfect for understanding how computers really work and essential for coding interviews!'
    }

    if (message.includes('data structure') || message.includes('algorithm') || message.includes('linked list') || message.includes('tree') || message.includes('hash table') || message.includes('stack') || message.includes('queue')) {
      return 'Data structures are fundamental to efficient programming! 📊 I can explain arrays, linked lists, stacks, queues, trees, graphs, hash tables, and their time complexities (Big O notation). Also covers sorting algorithms, searching techniques, and when to use each structure. Essential for coding interviews, system design, and building performant applications!'
    }

    // Default responses
    const defaultResponses = [
      'That\'s an interesting question! While I may not have a specific answer, I recommend checking our comprehensive tutorials in the navigation menu. Each section has hands-on examples and explanations.',
      'Great question! Our learning modules cover that topic extensively. Try exploring the relevant sections above, and feel free to ask more specific questions about what you find.',
      'I\'d love to help you with that! Check out our interactive code examples - you can run and modify them to better understand the concepts. What specific aspect would you like to focus on?',
      'Excellent inquiry! Programming is all about practice and exploration. Our platform has real-world examples and projects that might help answer your question. Keep exploring and asking great questions!'
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    
    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(input),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1500) // 1-2.5 second delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const faqCategories = Array.from(new Set(faqs.map(faq => faq.category)))

  return (
    <>
      {/* Chat Bot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          boxShadow: [
            "0 10px 25px rgba(0, 0, 0, 0.1)",
            "0 10px 30px rgba(59, 130, 246, 0.3)",
            "0 10px 25px rgba(0, 0, 0, 0.1)"
          ]
        }}
        transition={{ 
          delay: 0.2, 
          duration: 0.5,
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      >
        <MessageCircle className="w-6 h-6" />
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.button>

      {/* Chat Bot Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Learning Assistant</h3>
                    <p className="text-sm opacity-90">Ask me anything about programming!</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 px-4 py-2 font-medium text-sm transition-colors ${
                    activeTab === 'chat'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 px-4 py-2 font-medium text-sm transition-colors ${
                    activeTab === 'faq'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 inline mr-2" />
                  FAQ
                </button>
              </div>

              {activeTab === 'chat' ? (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.type === 'bot' && (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {message.type === 'user' && (
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 justify-start"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me about React, JavaScript, Java, Python, MongoDB, Docker, AWS, or any programming topic..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isTyping}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isTyping}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Press Enter to send • Ask about React, JavaScript, Java, Python, MongoDB, Docker, AWS, testing, career advice, and more!
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* FAQ Search */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search FAQs..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* FAQ Categories */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {faqCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSearchQuery(category)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* FAQ List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {filteredFAQs.map((faq) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                      >
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {faq.question}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                    
                    {filteredFAQs.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No FAQs found matching your search.</p>
                        <p className="text-sm mt-2">Try the chat tab to ask your question directly!</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FAQChatBot
