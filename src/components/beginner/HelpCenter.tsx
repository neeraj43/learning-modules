'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb, 
  Code, 
  Play,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search
} from 'lucide-react'

interface HelpItem {
  id: string
  question: string
  answer: string
  type: 'error' | 'tip' | 'concept' | 'troubleshooting'
  tags: string[]
  code?: string
  links?: { text: string; url: string }[]
}

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const helpItems: HelpItem[] = [
    {
      id: 'code-not-running',
      question: 'Why isn\'t my code running?',
      answer: 'Most code execution issues happen because: 1) The code has syntax errors (missing brackets, semicolons, quotes), 2) Variables are used before being declared, or 3) The code is written for a different environment. Our interactive examples use JavaScript to simulate other languages for learning purposes.',
      type: 'troubleshooting',
      tags: ['execution', 'errors', 'syntax'],
      code: `// ❌ This won't work:
console.log(undeclaredVariable);

// ✅ This will work:
let myVariable = "Hello!";
console.log(myVariable);`
    },
    {
      id: 'java-vs-javascript',
      question: 'What\'s the difference between Java and JavaScript?',
      answer: 'Despite similar names, Java and JavaScript are completely different! Java is a compiled language for building enterprise applications, while JavaScript runs in browsers. Think of them like "car" and "carpet" - similar names, totally different things.',
      type: 'concept',
      tags: ['java', 'javascript', 'differences', 'basics']
    },
    {
      id: 'variables-explanation',
      question: 'What are variables and why do I need them?',
      answer: 'Variables are like labeled boxes where you store information. Just like you might have a box labeled "photos" for your pictures, variables have names and store data. You need them because programs need to remember information and use it later.',
      type: 'concept',
      tags: ['variables', 'basics', 'data'],
      code: `// Think of variables like labeled storage boxes
let userName = "Alice";     // A box labeled "userName" containing "Alice"
let userAge = 25;          // A box labeled "userAge" containing 25
let isLoggedIn = true;     // A box labeled "isLoggedIn" containing true`
    },
    {
      id: 'syntax-errors',
      question: 'I keep getting syntax errors. What am I doing wrong?',
      answer: 'Syntax errors are like grammar mistakes in human language. Common causes: missing semicolons, unmatched brackets, unclosed quotes, or typos in keywords. The computer needs perfect "grammar" to understand your code.',
      type: 'error',
      tags: ['syntax', 'errors', 'debugging'],
      code: `// ❌ Common syntax errors:
console.log("Hello World"    // Missing closing quote and semicolon
if (age > 18 {               // Missing closing parenthesis
let name = Alice;            // Missing quotes around string

// ✅ Correct syntax:
console.log("Hello World");
if (age > 18) {
let name = "Alice";`
    },
    {
      id: 'learning-path',
      question: 'I\'m completely new to programming. Where should I start?',
      answer: 'Start with the fundamentals! 1) Learn what programming is and why it\'s useful, 2) Understand variables and data types, 3) Learn how to make decisions with if statements, 4) Practice with loops, 5) Build small projects. Don\'t rush - programming is like learning a new language.',
      type: 'tip',
      tags: ['beginner', 'learning', 'path', 'start']
    },
    {
      id: 'practice-tips',
      question: 'How can I practice programming effectively?',
      answer: 'Practice by building real things! Start small: calculator, todo list, simple games. Code every day, even if just for 15 minutes. Don\'t just read - type out examples yourself. Join communities, ask questions, and don\'t be afraid to make mistakes.',
      type: 'tip',
      tags: ['practice', 'learning', 'projects', 'advice']
    },
    {
      id: 'debugging-help',
      question: 'My code has bugs. How do I find and fix them?',
      answer: 'Debugging is like being a detective! 1) Read error messages carefully, 2) Check line numbers mentioned in errors, 3) Use console.log to see what values your variables have, 4) Go through your code step by step, 5) Ask "what did I expect vs what actually happened?"',
      type: 'troubleshooting',
      tags: ['debugging', 'errors', 'troubleshooting'],
      code: `// Use console.log to debug:
let score = 85;
console.log("Score is:", score);  // Check if variable has expected value

if (score >= 90) {
    console.log("Grade A path");   // See which path your code takes
} else {
    console.log("Not Grade A path");
}`
    },
    {
      id: 'overwhelmed',
      question: 'I feel overwhelmed. Is programming too hard for me?',
      answer: 'Feeling overwhelmed is completely normal! Every programmer has felt this way. Programming is challenging but not impossible. Take breaks, learn at your own pace, celebrate small wins, and remember that even experienced programmers look things up constantly. You\'ve got this! 🎉',
      type: 'tip',
      tags: ['motivation', 'overwhelmed', 'encouragement', 'mindset']
    },
    {
      id: 'cpp-vs-other-languages',
      question: 'Why is C++ considered difficult? Should beginners start with it?',
      answer: 'C++ is powerful but complex because it gives you direct memory control. It\'s like learning to drive with a manual transmission vs automatic - more control, but more to learn. For data structures and algorithms, C++ is excellent because you understand what\'s happening under the hood. Start with fundamentals, use our interactive examples, and don\'t rush!',
      type: 'concept',
      tags: ['cpp', 'beginner', 'difficulty', 'learning-path']
    },
    {
      id: 'pointers-confusion',
      question: 'Pointers in C++ are confusing! How do I understand them?',
      answer: 'Think of pointers like home addresses! Your house (variable) exists at a specific address (memory location). A pointer is just a piece of paper with that address written on it. When you "dereference" (*ptr), you\'re saying "go to this address and get what\'s there." Practice with simple examples first!',
      type: 'concept',
      tags: ['cpp', 'pointers', 'memory', 'concepts'],
      code: `int age = 25;        // House with value 25
int* ptr = &age;     // Address of the house
cout << *ptr;        // Go to address, get the value (25)`
    },
    {
      id: 'data-structures-why',
      question: 'Why do I need to learn data structures? Can\'t I just use arrays?',
      answer: 'Data structures are like tools in a toolbox! You can hammer a screw with a wrench, but a screwdriver works better. Arrays are great for some tasks, but linked lists excel at insertion/deletion, trees at searching, and hash tables at lightning-fast lookups. Each structure solves specific problems efficiently.',
      type: 'concept',
      tags: ['data-structures', 'arrays', 'efficiency', 'problem-solving']
    },
    {
      id: 'memory-management',
      question: 'Memory management in C++ seems scary. What if I make mistakes?',
      answer: 'Memory leaks and crashes are part of learning C++! Think of it like learning to cook - you might burn a few meals, but that\'s how you learn. Use tools like valgrind to detect leaks, always pair new/delete, and consider smart pointers (unique_ptr, shared_ptr) for automatic management. Our examples show safe patterns!',
      type: 'troubleshooting',
      tags: ['cpp', 'memory', 'debugging', 'best-practices'],
      code: `// Good practice:
unique_ptr<int> ptr = make_unique<int>(42);
// Memory automatically cleaned up!

// Manual management:
int* raw_ptr = new int(42);
delete raw_ptr;  // Don't forget this!`
    },
    {
      id: 'which-data-structure',
      question: 'How do I choose the right data structure for my problem?',
      answer: 'Ask yourself: 1) Do I need fast access by index? (Array/Vector) 2) Do I insert/delete frequently? (Linked List) 3) Do I need to find items quickly? (Hash Table) 4) Do I need sorted data? (Binary Search Tree) 5) Do I need LIFO/FIFO? (Stack/Queue). Start with the simplest that works, optimize later!',
      type: 'tip',
      tags: ['data-structures', 'choice', 'optimization', 'decision-making']
    }
  ]

  const categories = [
    { id: 'all', name: 'All', icon: '📚' },
    { id: 'concept', name: 'Concepts', icon: '💡' },
    { id: 'error', name: 'Errors', icon: '❌' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: '🔧' },
    { id: 'tip', name: 'Tips', icon: '💎' }
  ]

  const filteredItems = helpItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'tip': return <Lightbulb className="w-5 h-5 text-yellow-500" />
      case 'concept': return <Code className="w-5 h-5 text-blue-500" />
      case 'troubleshooting': return <HelpCircle className="w-5 h-5 text-purple-500" />
      default: return <HelpCircle className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Help Center</h2>
            <p className="text-blue-100">Get help with common programming questions</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Help Items */}
      <div className="max-h-96 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No help items found matching your search.</p>
            <p className="text-sm mt-2">Try different keywords or check all categories.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredItems.map(item => (
              <div key={item.id} className="p-4">
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getIcon(item.type)}
                    <span className="font-medium text-gray-900">{item.question}</span>
                  </div>
                  {expandedItems.includes(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedItems.includes(item.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 ml-8"
                    >
                      <p className="text-gray-700 leading-relaxed mb-4">{item.answer}</p>
                      
                      {item.code && (
                        <div className="bg-gray-900 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Code className="w-4 h-4 text-gray-300" />
                            <span className="text-gray-300 text-sm">Example</span>
                          </div>
                          <pre className="text-gray-100 text-sm overflow-x-auto">
                            <code>{item.code}</code>
                          </pre>
                        </div>
                      )}

                      {item.links && item.links.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Helpful links:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.links.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                              >
                                {link.text}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Still need help? Try our{' '}
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            AI Chat Assistant
          </button>{' '}
          for personalized guidance!
        </p>
      </div>
    </div>
  )
}

export default HelpCenter
