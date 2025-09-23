'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { Code, BookOpen, Globe, Zap, Database, Palette, Settings, Users, Container, Cloud, TestTube, Coffee, Code2, FileText, Network, Brain, Layers, Terminal, Sparkles, ArrowRight, Star, TrendingUp, Users2, Rocket } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: Code,
      title: "JavaScript Fundamentals",
      description: "Master variables, functions, ES6+, async/await, closures, and modern JavaScript concepts",
      href: "/javascript",
      color: "from-yellow-400 to-orange-500",
      category: "Frontend",
      difficulty: "Beginner",
      isNew: false
    },
    {
      icon: FileText,
      title: "TypeScript Mastery",
      description: "Type-safe JavaScript development with interfaces, generics, advanced types & React integration",
      href: "/typescript",
      color: "from-blue-500 to-indigo-600",
      category: "Frontend",
      difficulty: "Intermediate",
      isNew: true
    },
    {
      icon: BookOpen,
      title: "React Concepts",
      description: "Hooks, components, state management, context, and modern React patterns",
      href: "/react",
      color: "from-cyan-400 to-blue-500",
      category: "Frontend",
      difficulty: "Intermediate",
      isNew: false
    },
    {
      icon: Zap,
      title: "Advanced React",
      description: "Performance optimization, useRef, useMemo, useCallback, CSS-in-JS with live editor",
      href: "/advanced-react",
      color: "from-purple-600 to-blue-600",
      category: "Frontend",
      difficulty: "Advanced",
      isNew: false
    },
    {
      icon: Network,
      title: "System Design",
      description: "Design scalable systems like WhatsApp, Google Search, Instagram with real examples",
      href: "/system-design",
      color: "from-purple-500 to-pink-600",
      category: "Architecture",
      difficulty: "Expert",
      isNew: true
    },
    {
      icon: Settings,
      title: "Node.js Development",
      description: "Server-side JavaScript, REST APIs, Express.js, file system & package management",
      href: "/nodejs",
      color: "from-green-500 to-emerald-600",
      category: "Backend",
      difficulty: "Intermediate",
      isNew: false
    },
    {
      icon: Coffee,
      title: "Java Programming",
      description: "Object-oriented programming, Spring Framework, collections & enterprise development",
      href: "/java",
      color: "from-orange-500 to-red-600",
      category: "Backend",
      difficulty: "Intermediate",
      isNew: false
    },
    {
      icon: Code2,
      title: "C++ & Data Structures",
      description: "Memory management, STL containers, algorithms, trees, graphs & competitive programming",
      href: "/cpp",
      color: "from-blue-600 to-indigo-700",
      category: "Systems",
      difficulty: "Advanced",
      isNew: false
    },
    {
      icon: Database,
      title: "MySQL Database",
      description: "SQL fundamentals, database design, complex queries & Node.js integration",
      href: "/mysql",
      color: "from-blue-500 to-indigo-600",
      category: "Database",
      difficulty: "Intermediate",
      isNew: false
    },
    {
      icon: Database,
      title: "PostgreSQL Advanced",
      description: "Advanced SQL features, JSON operations, window functions & performance tuning",
      href: "/postgresql",
      color: "from-indigo-500 to-purple-600",
      category: "Database",
      difficulty: "Advanced",
      isNew: false
    },
    {
      icon: Database,
      title: "MongoDB NoSQL",
      description: "Document databases, aggregation pipelines, indexing & modern app integration",
      href: "/mongodb",
      color: "from-green-500 to-emerald-600",
      category: "Database",
      difficulty: "Intermediate",
      isNew: false
    },
    {
      icon: Container,
      title: "Docker & Containers",
      description: "Containerization, Dockerfile, Docker Compose & production deployment strategies",
      href: "/docker",
      color: "from-blue-500 to-cyan-600",
      category: "DevOps",
      difficulty: "Intermediate",
      isNew: false
    },
    {
      icon: Cloud,
      title: "AWS Cloud Services",
      description: "EC2, S3, Lambda, RDS, serverless architecture & scalable cloud deployment",
      href: "/aws",
      color: "from-orange-500 to-yellow-600",
      category: "Cloud",
      difficulty: "Advanced",
      isNew: false
    },
    {
      icon: TestTube,
      title: "Testing & QA",
      description: "Unit, integration, E2E testing, Jest, React Testing Library & TDD practices",
      href: "/testing",
      color: "from-purple-500 to-pink-600",
      category: "Quality",
      difficulty: "Intermediate",
      isNew: false
    },
    {
      icon: Globe,
      title: "Next.js Framework",
      description: "SSR, SSG, API routes, app router, and modern full-stack development",
      href: "/nextjs",
      color: "from-gray-700 to-gray-900",
      category: "Frontend",
      difficulty: "Advanced",
      isNew: false
    },
    {
      icon: BookOpen,
      title: "React Deep Dive Blog",
      description: "Application lifecycle, performance optimization, build strategies & video resources",
      href: "/blog",
      color: "from-emerald-500 to-teal-600",
      category: "Resources",
      difficulty: "All Levels",
      isNew: false
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 border-green-200"
      case "Intermediate": return "bg-blue-100 text-blue-800 border-blue-200"
      case "Advanced": return "bg-purple-100 text-purple-800 border-purple-200"
      case "Expert": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const categories = ["All", "Frontend", "Backend", "Database", "DevOps", "Cloud", "Systems", "Architecture", "Quality", "Resources"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredFeatures = selectedCategory === "All" 
    ? features 
    : features.filter(feature => feature.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* New Content Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">NEW: TypeScript & System Design Added!</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
              Master
              <span className="block">Modern Development</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
              From <span className="font-semibold text-blue-600">JavaScript fundamentals</span> to <span className="font-semibold text-purple-600">System Design</span>, 
              from <span className="font-semibold text-green-600">backend APIs</span> to <span className="font-semibold text-orange-600">cloud deployment</span>. 
              Your complete coding journey with <span className="font-semibold">interactive examples</span> and <span className="font-semibold">real-world projects</span>.
            </p>
          </motion.div>

          {/* Key Learning Areas - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              <motion.div 
                className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-6 text-center border-2 border-yellow-200 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">🌐</div>
                <div className="font-bold text-orange-800">Frontend</div>
                <div className="text-sm text-orange-600">JS, TS, React</div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6 text-center border-2 border-green-200 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">🔧</div>
                <div className="font-bold text-emerald-800">Backend</div>
                <div className="text-sm text-emerald-600">Node.js, Java</div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 text-center border-2 border-blue-200 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">💾</div>
                <div className="font-bold text-indigo-800">Data & Systems</div>
                <div className="text-sm text-indigo-600">C++, DBs, STL</div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 text-center border-2 border-purple-200 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">🏗️</div>
                <div className="font-bold text-purple-800">Architecture</div>
                <div className="text-sm text-purple-600">System Design</div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl p-6 text-center border-2 border-gray-200 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">☁️</div>
                <div className="font-bold text-slate-800">DevOps</div>
                <div className="text-sm text-slate-600">Docker, AWS</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/typescript"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
            >
              <span>Start with TypeScript</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/system-design"
              className="group border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-purple-600 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
            >
              <Brain className="w-5 h-5" />
              <span>Explore System Design</span>
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8"
          >
            <div className="text-center">
              <div className="text-3xl font-black text-blue-600 mb-1">16+</div>
              <div className="text-sm text-gray-600 font-medium">Learning Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-600 mb-1">200+</div>
              <div className="text-sm text-gray-600 font-medium">Code Examples</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-600 mb-1">∞</div>
              <div className="text-sm text-gray-600 font-medium">Learning Path</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive tutorials, real-world projects, and hands-on examples for every skill level
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group"
              >
                <Link href={feature.href}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 h-full border border-gray-100 relative overflow-hidden">
                    {/* New Badge */}
                    {feature.isNew && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </div>
                    )}
                    
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                      {feature.description}
                    </p>
                    
                    {/* Badges */}
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(feature.difficulty)}`}>
                        {feature.difficulty}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {feature.category}
                      </span>
                    </div>
                    
                    {/* Hover Arrow */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">Learning by the Numbers</h2>
            <p className="text-xl opacity-90">Join thousands of developers mastering modern technologies</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                      {[
              { number: "16+", label: "Learning Modules", icon: "📚" },
              { number: "200+", label: "Code Examples", icon: "💻" },
              { number: "50+", label: "Interactive Demos", icon: "⚡" },
              { number: "∞", label: "Practice Projects", icon: "🚀" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="group"
              >
                <div className="bg-white bg-opacity-95 rounded-2xl p-6 backdrop-blur-sm group-hover:bg-opacity-100 transition-all duration-300 shadow-lg">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-4xl font-black mb-2 text-gray-800">
                  {stat.number}
                </div>
                  <div className="text-sm font-medium text-gray-600">
                  {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Ready to Level Up Your Skills?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a beginner starting with JavaScript or an expert diving into System Design, 
              we have the perfect learning path for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/javascript"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <Users2 className="w-5 h-5" />
                Start as Beginner
              </Link>
              <Link
                href="/system-design"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <Brain className="w-5 h-5" />
                Jump to Advanced
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}