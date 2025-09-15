'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Copy, Check, Download, Upload, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface APIResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: unknown
  time: number
}

interface APIRequest {
  method: string
  url: string
  headers: Record<string, string>
  body: string
}

const APITester = () => {
  const [request, setRequest] = useState<APIRequest>({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    headers: {
      'Content-Type': 'application/json'
    },
    body: ''
  })
  
  const [response, setResponse] = useState<APIResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'headers' | 'body'>('headers')

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

  const presetRequests = [
    {
      name: 'Get Posts',
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
      headers: { 'Content-Type': 'application/json' },
      body: ''
    },
    {
      name: 'Create Post',
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'New Post',
        body: 'This is a new post created via API',
        userId: 1
      }, null, 2)
    },
    {
      name: 'Get Users',
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users',
      headers: { 'Content-Type': 'application/json' },
      body: ''
    }
  ]

  const sendRequest = async () => {
    setLoading(true)
    const startTime = performance.now()
    
    try {
      const options: RequestInit = {
        method: request.method,
        headers: request.headers,
      }
      
      if (request.method !== 'GET' && request.body) {
        options.body = request.body
      }
      
      const res = await fetch(request.url, options)
      const endTime = performance.now()
      
      let data
      const contentType = res.headers.get('content-type')
      
      if (contentType?.includes('application/json')) {
        data = await res.json()
      } else {
        data = await res.text()
      }
      
      const responseHeaders: Record<string, string> = {}
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })
      
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        data,
        time: Math.round(endTime - startTime)
      })
    } catch (error) {
      setResponse({
        status: 0,
        statusText: 'Network Error',
        headers: {},
        data: { error: (error as Error).message },
        time: Math.round(performance.now() - startTime)
      })
    } finally {
      setLoading(false)
    }
  }

  const addHeader = () => {
    setRequest(prev => ({
      ...prev,
      headers: {
        ...prev.headers,
        '': ''
      }
    }))
  }

  const updateHeader = (oldKey: string, newKey: string, value: string) => {
    setRequest(prev => {
      const newHeaders = { ...prev.headers }
      if (oldKey !== newKey) {
        delete newHeaders[oldKey]
      }
      newHeaders[newKey] = value
      return {
        ...prev,
        headers: newHeaders
      }
    })
  }

  const removeHeader = (key: string) => {
    setRequest(prev => {
      const newHeaders = { ...prev.headers }
      delete newHeaders[key]
      return {
        ...prev,
        headers: newHeaders
      }
    })
  }

  const copyResponse = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadResponse = () => {
    const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'api-response.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const loadPreset = (preset: typeof presetRequests[0]) => {
    setRequest(preset)
    setResponse(null)
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600 bg-green-100'
    if (status >= 300 && status < 400) return 'text-blue-600 bg-blue-100'
    if (status >= 400 && status < 500) return 'text-orange-600 bg-orange-100'
    if (status >= 500) return 'text-red-600 bg-red-100'
    return 'text-gray-600 bg-gray-100'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">API Tester</h3>
          <div className="flex items-center space-x-2">
            {presetRequests.map((preset, index) => (
              <button
                key={index}
                onClick={() => loadPreset(preset)}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Request Configuration */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <select
              value={request.method}
              onChange={(e) => setRequest(prev => ({ ...prev, method: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {methods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
            <input
              type="text"
              value={request.url}
              onChange={(e) => setRequest(prev => ({ ...prev, url: e.target.value }))}
              placeholder="Enter API URL..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={sendRequest}
              disabled={loading || !request.url}
              className="px-6 py-2"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </div>
              )}
            </Button>
          </div>

          {/* Headers and Body Tabs */}
          <div className="border border-gray-200 rounded-lg">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('headers')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'headers'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Headers
              </button>
              <button
                onClick={() => setActiveTab('body')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'body'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Body
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'headers' && (
                <div className="space-y-2">
                  {Object.entries(request.headers).map(([key, value], index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={key}
                        onChange={(e) => updateHeader(key, e.target.value, value)}
                        placeholder="Header name"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateHeader(key, key, e.target.value)}
                        placeholder="Header value"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeHeader(key)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addHeader}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Header
                  </button>
                </div>
              )}

              {activeTab === 'body' && (
                <textarea
                  value={request.body}
                  onChange={(e) => setRequest(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Request body (JSON, XML, text, etc.)"
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>
        </div>

        {/* Response Section */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 rounded-lg"
          >
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Response</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(response.status)}`}>
                    {response.status} {response.statusText}
                  </span>
                  <span className="text-xs text-gray-500">{response.time}ms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyResponse}
                    className="p-1 text-gray-600 hover:text-gray-900"
                    title="Copy response"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={downloadResponse}
                    className="p-1 text-gray-600 hover:text-gray-900"
                    title="Download response"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {/* Response Headers */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Headers</h4>
                  <div className="bg-gray-50 rounded-md p-3 text-xs font-mono max-h-32 overflow-auto">
                    {Object.entries(response.headers).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="text-blue-600 font-medium w-1/3">{key}:</span>
                        <span className="text-gray-800 ml-2">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response Body */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Body</h4>
                  <div className="bg-gray-900 rounded-md p-4 text-green-400 text-xs font-mono max-h-64 overflow-auto">
                    <pre>{JSON.stringify(response.data, null, 2)}</pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default APITester
