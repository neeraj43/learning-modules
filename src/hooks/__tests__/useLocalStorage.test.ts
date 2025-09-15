import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

// Replace the global localStorage with our mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('returns initial value when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    expect(result.current[0]).toBe('default-value')
  })

  it('returns value from localStorage when available', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('stored-value'))
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))
    
    expect(result.current[0]).toBe('stored-value')
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key')
  })

  it('stores value in localStorage when setValue is called', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    act(() => {
      result.current[1]('new-value')
    })
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'))
    expect(result.current[0]).toBe('new-value')
  })

  it('handles function updates correctly', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(5))
    
    const { result } = renderHook(() => useLocalStorage('counter', 0))
    
    act(() => {
      result.current[1]((prev: number) => prev + 1)
    })
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('counter', JSON.stringify(6))
    expect(result.current[0]).toBe(6)
  })

  it('handles complex objects', () => {
    const complexObject = { name: 'John', age: 30, hobbies: ['reading', 'coding'] }
    localStorageMock.getItem.mockReturnValue(JSON.stringify(complexObject))
    
    const { result } = renderHook(() => useLocalStorage('user', {}))
    
    expect(result.current[0]).toEqual(complexObject)
  })

  it('stores complex objects correctly', () => {
    localStorageMock.getItem.mockReturnValue(null)
    const newUser = { name: 'Jane', email: 'jane@example.com' }
    
    const { result } = renderHook(() => useLocalStorage('user', {}))
    
    act(() => {
      result.current[1](newUser)
    })
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(newUser))
    expect(result.current[0]).toEqual(newUser)
  })

  it('handles localStorage errors gracefully', () => {
    // Mock localStorage.getItem to throw an error
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage not available')
    })
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'))
    
    // Should fall back to initial value
    expect(result.current[0]).toBe('fallback')
  })

  it('handles localStorage setItem errors gracefully', () => {
    localStorageMock.getItem.mockReturnValue(null)
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('localStorage quota exceeded')
    })
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    
    // Should not throw error when setting value
    act(() => {
      result.current[1]('new-value')
    })
    
    // Value should still be updated in state even if localStorage fails
    expect(result.current[0]).toBe('new-value')
  })

  it('handles invalid JSON in localStorage gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json{')
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    
    // Should fall back to initial value when JSON parsing fails
    expect(result.current[0]).toBe('default')
  })

  it('works with different data types', () => {
    // Test with boolean
    localStorageMock.getItem.mockReturnValue(JSON.stringify(true))
    const { result: boolResult } = renderHook(() => useLocalStorage('bool-key', false))
    expect(boolResult.current[0]).toBe(true)
    
    // Test with number
    localStorageMock.getItem.mockReturnValue(JSON.stringify(42))
    const { result: numberResult } = renderHook(() => useLocalStorage('number-key', 0))
    expect(numberResult.current[0]).toBe(42)
    
    // Test with array
    localStorageMock.getItem.mockReturnValue(JSON.stringify([1, 2, 3]))
    const { result: arrayResult } = renderHook(() => useLocalStorage('array-key', []))
    expect(arrayResult.current[0]).toEqual([1, 2, 3])
  })

  it('uses different keys independently', () => {
    localStorageMock.getItem
      .mockReturnValueOnce(JSON.stringify('value1'))
      .mockReturnValueOnce(JSON.stringify('value2'))
    
    const { result: result1 } = renderHook(() => useLocalStorage('key1', 'default1'))
    const { result: result2 } = renderHook(() => useLocalStorage('key2', 'default2'))
    
    expect(result1.current[0]).toBe('value1')
    expect(result2.current[0]).toBe('value2')
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('key1')
    expect(localStorageMock.getItem).toHaveBeenCalledWith('key2')
  })

  it('updates state when localStorage value changes externally', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('initial'))
    
    const { result, rerender } = renderHook(() => useLocalStorage('test-key', 'default'))
    
    expect(result.current[0]).toBe('initial')
    
    // Simulate external change to localStorage
    localStorageMock.getItem.mockReturnValue(JSON.stringify('external-change'))
    
    // Force re-render (in real app, this might happen due to window storage event)
    rerender()
    
    // Note: The hook as implemented doesn't automatically sync with external changes
    // This test documents current behavior
    expect(result.current[0]).toBe('initial') // Still the old value
  })
})
