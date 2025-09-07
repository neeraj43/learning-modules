'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Code, BookOpen, Globe, Zap, Database, Palette, Settings, Users } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: Code,
      title: "JavaScript Fundamentals",
      description: "Variables, functions, ES6+, async/await, closures, and more",
      href: "/javascript",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: BookOpen,
      title: "React Concepts",
      description: "Hooks, components, state management, context, and advanced patterns",
      href: "/react",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Next.js Features",
      description: "SSR, SSG, API routes, routing, and performance optimizations",
      href: "/nextjs",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Interactive Examples",
      description: "Live demos of concepts with real-world applications",
      href: "/examples",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Database,
      title: "State Management",
      description: "Local state, global state, Zustand, and data persistence",
      href: "/state",
      color: "from-red-400 to-rose-500"
    },
    {
      icon: Palette,
      title: "UI Components",
      description: "Reusable components, animations, and modern design patterns",
      href: "/ui",
      color: "from-indigo-400 to-blue-500"
    },
    {
      icon: Settings,
      title: "Advanced Patterns",
      description: "HOCs, render props, compound components, and more",
      href: "/patterns",
      color: "from-teal-400 to-green-500"
    },
    {
      icon: Users,
      title: "Forms & Validation",
      description: "React Hook Form, Zod validation, and form best practices",
      href: "/forms",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: Settings,
      title: "Architecture Patterns",
      description: "Micro-frontends, component architecture, and design patterns",
      href: "/patterns",
      color: "from-indigo-400 to-purple-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Comprehensive Web App
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master JavaScript, React, and Next.js with interactive examples and real-world applications. 
              From basics to advanced concepts, everything you need in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/javascript"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Learning
            </Link>
            <Link
              href="/examples"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              View Examples
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore All Concepts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive deep into modern web development with hands-on examples and comprehensive explanations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link href={feature.href}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                      {[
            { number: "50+", label: "JavaScript Concepts" },
            { number: "40+", label: "React Examples" },
            { number: "25+", label: "Next.js Features" },
            { number: "15+", label: "Architecture Patterns" },
            { number: "4", label: "Languages (i18n)" },
            { number: "150+", label: "Code Samples" }
          ].slice(0, 4).map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
