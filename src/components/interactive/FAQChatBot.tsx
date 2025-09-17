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
      return 'React is a powerful library for building user interfaces! Check out our React section for components, hooks, state management, and real-world examples. What specific React topic would you like to explore?'
    }
    
    if (message.includes('javascript') || message.includes('js')) {
      return 'JavaScript is the foundation of modern web development! Our JavaScript section covers variables, functions, objects, async programming, and ES6+ features. What JavaScript concept can I help you with?'
    }
    
    if (message.includes('mongodb') || message.includes('database')) {
      return 'MongoDB is a fantastic NoSQL database! I can help you with queries, schema design, aggregation pipelines, and real-world examples. Check our MongoDB section for hands-on tutorials!'
    }
    
    if (message.includes('next') || message.includes('nextjs')) {
      return 'Next.js is an amazing React framework! It offers SSR, SSG, API routes, and excellent performance. Our Next.js section has deployment guides and best practices. What Next.js feature interests you?'
    }
    
    if (message.includes('java')) {
      return 'Java is a robust, object-oriented language! Our Java section covers OOP concepts, Spring Framework, collections, and enterprise development. Perfect for backend development and Android apps!'
    }
    
    if (message.includes('python')) {
      return 'Python is versatile and beginner-friendly! Great for web development, data science, automation, and AI. Our Python section includes frameworks like Django/Flask and practical projects.'
    }
    
    if (message.includes('help') || message.includes('start') || message.includes('begin')) {
      return 'I\'m here to help you learn! 🚀 You can ask me about:\n\n• Programming languages (JavaScript, Python, Java)\n• Frameworks (React, Next.js, Spring)\n• Databases (MongoDB, MySQL, PostgreSQL)\n• Best practices and career advice\n\nWhat would you like to learn about?'
    }
    
    if (message.includes('career') || message.includes('job')) {
      return 'Great question about tech careers! Focus on: 1) Master fundamentals, 2) Build a portfolio, 3) Contribute to open source, 4) Network with developers, 5) Keep learning new technologies. What specific career path interests you?'
    }
    
    if (message.includes('project') || message.includes('build')) {
      return 'Building projects is the best way to learn! 💡 Start with:\n\n• To-do app (state management)\n• Blog system (CRUD operations)\n• E-commerce site (full-stack)\n• Social media app (real-time features)\n\nOur examples section has complete project tutorials!'
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
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
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
                        placeholder="Ask me about programming, frameworks, or any topic..."
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
                      Press Enter to send • Ask about React, JavaScript, MongoDB, Java, Python, and more!
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
