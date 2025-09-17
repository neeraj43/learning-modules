'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Code, Book, Globe, ChevronDown, Database, Server, Cloud, TestTube, Container, Coffee } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home', icon: Globe },
    {
      label: 'JavaScript',
      icon: Code,
      dropdown: [
        { href: '/javascript', label: 'JavaScript Fundamentals' },
        { href: '/examples', label: 'Interactive Examples' }
      ]
    },
    {
      label: 'React',
      icon: Book,
      dropdown: [
        { href: '/react', label: 'React Concepts' },
        { href: '/advanced-react', label: 'Advanced React' },
        { href: '/patterns', label: 'Design Patterns' },
        { href: '/state', label: 'State Management' },
        { href: '/forms', label: 'Forms & Validation' }
      ]
    },
    {
      label: 'Next.js',
      icon: Code,
      dropdown: [
        { href: '/nextjs', label: 'Next.js Features' },
        { href: '/blog', label: 'React Deep Dive Blog' }
      ]
    },
    {
      label: 'Node.js',
      icon: Server,
      dropdown: [
        { href: '/nodejs', label: 'Node.js Comprehensive Guide' }
      ]
    },
    {
      label: 'Python',
      icon: Code,
      dropdown: [
        { href: '/python', label: 'Python Complete Guide' }
      ]
    },
    {
      label: 'Java',
      icon: Coffee,
      dropdown: [
        { href: '/java', label: 'Java Programming Complete Guide' }
      ]
    },
    {
      label: 'Databases',
      icon: Database,
      dropdown: [
        { href: '/mysql', label: 'MySQL Basics' },
        { href: '/postgresql', label: 'PostgreSQL Advanced' },
        { href: '/mongodb', label: 'MongoDB NoSQL' }
      ]
    },
    {
      label: 'DevOps',
      icon: Cloud,
      dropdown: [
        { href: '/docker', label: 'Docker & Containers' },
        { href: '/aws', label: 'AWS Cloud Services' }
      ]
    },
    {
      label: 'Testing',
      icon: TestTube,
      dropdown: [
        { href: '/testing', label: 'Testing & QA Complete Guide' }
      ]
    }
  ]

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  const isActiveLink = (href: string) => {
    return pathname === href
  }

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo - Pushed to far left corner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 mr-8"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-md">
              <Code className="w-5 h-5 text-white" />
            </div>
            <Link href="/" className="text-lg font-bold text-gray-900 whitespace-nowrap">
              Learning Modules
            </Link>
          </motion.div>

          {/* Desktop Navigation - Flexible layout */}
          <nav className="hidden lg:flex space-x-1 flex-1">
            {navItems.map((item) => (
              <div
                key={item.href || item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Single item without dropdown */}
                {!item.dropdown && item.href && (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-lg transition-colors duration-200 font-medium text-sm ${
                      isActiveLink(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )}

                {/* Dropdown item */}
                {item.dropdown && (
                  <>
                    <button
                      className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-lg transition-colors duration-200 font-medium text-sm ${
                        activeDropdown === item.label
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Dropdown menu */}
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                isActiveLink(dropdownItem.href)
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                              }`}
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button - Positioned on the right */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 ml-auto"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-gray-200"
            >
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <div key={item.href || item.label}>
                    {/* Single item without dropdown */}
                    {!item.dropdown && item.href && (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 py-2 px-3 rounded-lg transition-colors duration-200 font-medium ${
                          isActiveLink(item.href)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    )}

                    {/* Dropdown item */}
                    {item.dropdown && (
                      <>
                        <button
                          onClick={() => handleDropdownToggle(item.label)}
                          className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-colors duration-200 font-medium ${
                            activeDropdown === item.label
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {/* Mobile dropdown content */}
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-6 mt-1 space-y-1"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className={`block py-2 px-3 rounded-lg text-sm transition-colors duration-200 ${
                                    isActiveLink(dropdownItem.href)
                                      ? 'text-blue-600 bg-blue-50'
                                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                  }`}
                                >
                                  {dropdownItem.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header