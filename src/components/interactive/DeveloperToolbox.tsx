'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Code, Palette, Globe, Hash, Eye, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const DeveloperToolbox = () => {
  const [activeTab, setActiveTab] = useState('json')
  const [jsonInput, setJsonInput] = useState('{"name": "John", "age": 30, "city": "New York"}')
  const [colorInput, setColorInput] = useState('#3B82F6')
  const [hashInput, setHashInput] = useState('Hello World!')
  const [urlInput, setUrlInput] = useState('https://example.com/path?param=value&other=123')
  const [base64Input, setBase64Input] = useState('Hello World!')

  const tabs = [
    { id: 'json', name: 'JSON Formatter', icon: Code },
    { id: 'color', name: 'Color Tools', icon: Palette },
    { id: 'url', name: 'URL Parser', icon: Globe },
    { id: 'hash', name: 'Hash Generator', icon: Hash },
    { id: 'base64', name: 'Base64 Encoder', icon: Eye },
  ]

  // JSON Formatter
  const formatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      return JSON.stringify(parsed, null, 2)
    } catch (error) {
      return `Invalid JSON: ${(error as Error).message}`
    }
  }

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      return JSON.stringify(parsed)
    } catch (error) {
      return `Invalid JSON: ${(error as Error).message}`
    }
  }

  // Color Tools
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null
    
    const { r, g, b } = rgb
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        default: h = 0
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  // URL Parser
  const parseURL = (url: string) => {
    try {
      const parsed = new URL(url)
      const params: Record<string, string> = {}
      parsed.searchParams.forEach((value, key) => {
        params[key] = value
      })
      
      return {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port,
        pathname: parsed.pathname,
        search: parsed.search,
        hash: parsed.hash,
        params
      }
    } catch (error) {
      return { error: 'Invalid URL' }
    }
  }

  // Hash Generator
  const generateHash = async (text: string, algorithm: string = 'SHA-256') => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hash = await crypto.subtle.digest(algorithm, data)
    const hashArray = Array.from(new Uint8Array(hash))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  // Base64 Encoder/Decoder
  const encodeBase64 = (text: string) => {
    try {
      return btoa(text)
    } catch (error) {
      return 'Error encoding to Base64'
    }
  }

  const decodeBase64 = (encoded: string) => {
    try {
      return atob(encoded)
    } catch (error) {
      return 'Error decoding from Base64'
    }
  }

  const downloadAsFile = (content: string, filename: string, contentType: string = 'text/plain') => {
    const blob = new Blob([content], { type: contentType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Developer Toolbox</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* JSON Formatter */}
        {activeTab === 'json' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                JSON Input
              </label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter JSON here..."
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={() => copyToClipboard(formatJSON())}
                variant="ghost"
                size="sm"
              >
                Copy Formatted
              </Button>
              <Button
                onClick={() => copyToClipboard(minifyJSON())}
                variant="ghost"
                size="sm"
              >
                Copy Minified
              </Button>
              <Button
                onClick={() => downloadAsFile(formatJSON(), 'formatted.json', 'application/json')}
                variant="ghost"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formatted Output
              </label>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto max-h-64">
                {formatJSON()}
              </pre>
            </div>
          </div>
        )}

        {/* Color Tools */}
        {activeTab === 'color' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Input
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  className="w-16 h-10 border border-gray-300 rounded-md cursor-pointer"
                />
                <input
                  type="text"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#3B82F6"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">HEX</h4>
                <p className="font-mono text-sm">{colorInput}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">RGB</h4>
                {(() => {
                  const rgb = hexToRgb(colorInput)
                  return rgb ? (
                    <p className="font-mono text-sm">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
                  ) : (
                    <p className="text-red-500 text-sm">Invalid color</p>
                  )
                })()}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">HSL</h4>
                {(() => {
                  const hsl = hexToHsl(colorInput)
                  return hsl ? (
                    <p className="font-mono text-sm">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</p>
                  ) : (
                    <p className="text-red-500 text-sm">Invalid color</p>
                  )
                })()}
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className="w-32 h-32 rounded-lg border border-gray-300 shadow-sm"
                style={{ backgroundColor: colorInput }}
              />
            </div>
          </div>
        )}

        {/* URL Parser */}
        {activeTab === 'url' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Input
              </label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/path?param=value"
              />
            </div>

            {(() => {
              const parsed = parseURL(urlInput)
              return (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Parsed URL</h4>
                  {parsed.error ? (
                    <p className="text-red-500">{parsed.error}</p>
                  ) : (
                    <div className="space-y-2 font-mono text-sm">
                      <div><span className="text-blue-600">Protocol:</span> {parsed.protocol}</div>
                      <div><span className="text-blue-600">Hostname:</span> {parsed.hostname}</div>
                      {parsed.port && <div><span className="text-blue-600">Port:</span> {parsed.port}</div>}
                      <div><span className="text-blue-600">Pathname:</span> {parsed.pathname}</div>
                      {parsed.search && <div><span className="text-blue-600">Search:</span> {parsed.search}</div>}
                      {parsed.hash && <div><span className="text-blue-600">Hash:</span> {parsed.hash}</div>}
                      
                      {parsed.params && Object.keys(parsed.params).length > 0 && (
                        <div>
                          <span className="text-blue-600">Parameters:</span>
                          <div className="ml-4 mt-1">
                            {Object.entries(parsed.params).map(([key, value]) => (
                              <div key={key}>{key}: {value}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )}

        {/* Hash Generator */}
        {activeTab === 'hash' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text to Hash
              </label>
              <textarea
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text to hash..."
              />
            </div>

            <div className="space-y-3">
              {['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'].map((algorithm) => (
                <div key={algorithm} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{algorithm}</h4>
                    <Button
                      onClick={async () => {
                        const hash = await generateHash(hashInput, algorithm)
                        copyToClipboard(hash)
                      }}
                      variant="ghost"
                      size="sm"
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="font-mono text-xs break-all text-gray-700">
                    {hashInput ? '...' : 'Enter text to generate hash'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Base64 Encoder */}
        {activeTab === 'base64' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text to Encode/Decode
              </label>
              <textarea
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Base64 Encoded</h4>
                  <Button
                    onClick={() => copyToClipboard(encodeBase64(base64Input))}
                    variant="ghost"
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
                <p className="font-mono text-xs break-all text-gray-700">
                  {encodeBase64(base64Input)}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Base64 Decoded</h4>
                  <Button
                    onClick={() => copyToClipboard(decodeBase64(base64Input))}
                    variant="ghost"
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
                <p className="font-mono text-xs break-all text-gray-700">
                  {decodeBase64(base64Input)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeveloperToolbox

