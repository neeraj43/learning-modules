import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useMemo } from 'react'

// Types
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  preferences: {
    theme: 'light' | 'dark'
    language: string
    notifications: boolean
  }
}

interface Todo {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
  createdAt: Date
  dueDate?: Date
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface AppState {
  // User state
  user: User | null
  isAuthenticated: boolean
  
  // Theme state
  theme: 'light' | 'dark'
  
  // Todos state
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  
  // Shopping cart state
  cart: CartItem[]
  
  // UI state
  sidebarOpen: boolean
  loading: boolean
  notifications: string[]
  
  // Actions
  // User actions
  login: (user: User) => void
  logout: () => void
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void
  
  // Theme actions
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
  
  // Todo actions
  addTodo: (text: string, category?: string, priority?: Todo['priority']) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, updates: Partial<Todo>) => void
  setFilter: (filter: 'all' | 'active' | 'completed') => void
  clearCompleted: () => void
  
  // Cart actions
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  
  // UI actions
  toggleSidebar: () => void
  setLoading: (loading: boolean) => void
  addNotification: (message: string) => void
  removeNotification: (index: number) => void
  clearNotifications: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      theme: 'light',
      todos: [],
      filter: 'all',
      cart: [],
      sidebarOpen: false,
      loading: false,
      notifications: [],

      // User actions
      login: (user) => set({ user, isAuthenticated: true }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        todos: [], // Clear user-specific data
        cart: []
      }),
      
      updateUserPreferences: (preferences) => set((state) => ({
        user: state.user ? {
          ...state.user,
          preferences: { ...state.user.preferences, ...preferences }
        } : null
      })),

      // Theme actions
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      
      setTheme: (theme) => set({ theme }),

      // Todo actions
      addTodo: (text, category = 'general', priority = 'medium') => {
        const newTodo: Todo = {
          id: Date.now().toString(),
          text,
          completed: false,
          priority,
          category,
          createdAt: new Date()
        }
        set((state) => ({ todos: [...state.todos, newTodo] }))
      },
      
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })),
      
      deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),
      
      updateTodo: (id, updates) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, ...updates } : todo
        )
      })),
      
      setFilter: (filter) => set({ filter }),
      
      clearCompleted: () => set((state) => ({
        todos: state.todos.filter(todo => !todo.completed)
      })),

      // Cart actions
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
        
        if (existingItem) {
          return {
            cart: state.cart.map(cartItem =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          }
        }
        
        return {
          cart: [...state.cart, { ...item, quantity: 1 }]
        }
      }),
      
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) {
          return { cart: state.cart.filter(item => item.id !== id) }
        }
        
        return {
          cart: state.cart.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }
      }),
      
      clearCart: () => set({ cart: [] }),

      // UI actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setLoading: (loading) => set({ loading }),
      
      addNotification: (message) => set((state) => ({
        notifications: [...state.notifications, message]
      })),
      
      removeNotification: (index) => set((state) => ({
        notifications: state.notifications.filter((_, i) => i !== index)
      })),
      
      clearNotifications: () => set({ notifications: [] })
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist certain parts of the state
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        todos: state.todos,
        cart: state.cart
      })
    }
  )
)

// Selectors for better performance
export const useUser = () => useAppStore((state) => state.user)
export const useAuth = () => useAppStore((state) => state.isAuthenticated)
export const useTheme = () => useAppStore((state) => state.theme)

// Todos selector with filtering logic
const todosSelector = (state: AppState) => {
  const { todos, filter } = state
  
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed)
    case 'completed':
      return todos.filter(todo => todo.completed)
    default:
      return todos
  }
}

export const useTodos = () => useAppStore(todosSelector)

// Individual cart selectors to avoid object creation
export const useCartItems = () => useAppStore((state: AppState) => state.cart)
export const useCartTotal = () => useAppStore((state: AppState) => 
  state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
)
export const useCartItemCount = () => useAppStore((state: AppState) => 
  state.cart.reduce((sum, item) => sum + item.quantity, 0)
)

// Combined cart hook with memoization
export const useCart = () => {
  const items = useCartItems()
  const total = useCartTotal()
  const itemCount = useCartItemCount()
  
  return useMemo(() => ({
    items,
    total,
    itemCount
  }), [items, total, itemCount])
}

export const useNotifications = () => useAppStore((state) => state.notifications)

// Computed values with memoized selectors
export const useTotalTodos = () => useAppStore((state: AppState) => state.todos.length)
export const useCompletedTodos = () => useAppStore((state: AppState) => state.todos.filter(todo => todo.completed).length)
export const useActiveTodos = () => useAppStore((state: AppState) => state.todos.filter(todo => !todo.completed).length)

// Combined stats hook with memoization to prevent unnecessary re-renders
export const useTodoStats = () => {
  const total = useTotalTodos()
  const completed = useCompletedTodos()
  const active = useActiveTodos()
  
  return useMemo(() => {
    const completionRate = total > 0 ? completed / total : 0
    return { total, completed, active, completionRate }
  }, [total, completed, active])
}
