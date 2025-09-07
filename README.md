# Comprehensive Web App 🚀

A complete demonstration of JavaScript, React, and Next.js concepts from A to Z. This project showcases modern web development practices, patterns, and best practices through interactive examples and real-world applications.

## 🌟 Features

### JavaScript Fundamentals

- **Variables & Data Types**: `var`, `let`, `const`, primitive and reference types
- **Functions**: Declarations, expressions, arrow functions, higher-order functions
- **ES6+ Features**: Template literals, destructuring, spread operator, modules
- **Async Programming**: Promises, async/await, error handling
- **Array Methods**: `map`, `filter`, `reduce`, `find`, `some`, `every`
- **Object Manipulation**: Keys, values, entries, destructuring
- **Error Handling**: Try-catch, custom errors, async error handling
- **Closures & Scope**: Function scope, closure patterns, module pattern
- **Classes & Prototypes**: ES6 classes, inheritance, static methods
- **Regular Expressions**: Pattern matching, validation, text processing

### React Concepts

- **Components & Props**: Functional components, prop types, TypeScript interfaces
- **State Management**: `useState`, state updates, immutability
- **Event Handling**: SyntheticEvents, form handling, keyboard/mouse events
- **Conditional Rendering**: Logical operators, ternary operator, early returns
- **Lists & Keys**: Array mapping, unique keys, dynamic lists
- **Forms**: Controlled components, validation, form submission
- **Hooks**: `useState`, `useEffect`, `useContext`, `useReducer`, `useCallback`, `useMemo`, `useRef`
- **Custom Hooks**: Reusable logic, local storage hook
- **Context API**: Global state, theme management, user authentication
- **Performance**: Memoization, optimization techniques

### Next.js Features

- **File-based Routing**: Pages, dynamic routes, catch-all routes
- **API Routes**: RESTful endpoints, HTTP methods, error handling
- **Rendering Methods**: SSR, SSG, CSR, hybrid rendering
- **Performance Optimizations**: Image optimization, code splitting, caching
- **Middleware**: Authentication, redirects, headers
- **Built-in Features**: TypeScript, CSS support, environment variables

### Real-World Examples

- **Todo Application**: CRUD operations, filtering, persistence
- **Shopping Cart**: Product catalog, cart management, checkout flow
- **Authentication System**: Login/logout, user sessions, protected routes
- **Notification System**: Toast notifications, real-time updates

### Architecture Patterns

- **Micro-frontend Architecture**: Module Federation for component sharing
- **Component-based Architecture**: Modular, reusable components
- **Provider Pattern**: Context-based state sharing
- **Container/Presentational Pattern**: Separation of concerns
- **Custom Hooks**: Reusable business logic

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Routing**: React Router 7.5.3
- **Styling**: CSS Modules with custom naming + Tailwind CSS
- **Internationalization**: i18next 24.2.3 with browser language detection
- **State Management**: Zustand with persistence
- **Form Handling**: React Hook Form 7.54.2 with Zod validation
- **Module Federation**: @module-federation/nextjs-mf 8.1.10 (temporarily disabled due to Next.js 15 compatibility)
- **Testing**: Jest 29.7.0 with Testing Library
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Development**: ESLint, Prettier, Cross-env, TypeScript strict mode

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── users/         # User management endpoints
│   │   └── posts/         # Post management endpoints
│   ├── javascript/        # JavaScript concepts page
│   ├── react/            # React concepts page
│   ├── nextjs/           # Next.js features page
│   ├── examples/         # Real-world examples
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── examples/         # Example components
│   │   ├── ReactBasicExamples.tsx
│   │   └── ReactHooksExamples.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/               # Reusable UI components
├── store/
│   └── useAppStore.ts    # Zustand store with persistence
├── utils/
│   └── javascript-examples.ts  # JavaScript utility functions
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd comprehensive-web-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
# Development
npm run dev                 # Start development server
npm run dev:turbo          # Start with Turbopack (faster)
npm run build              # Build for production
npm run start              # Start production server

# Code Quality
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint errors
npm run type-check         # TypeScript type checking
npm run format             # Format code with Prettier
npm run format:check       # Check if code is formatted

# Testing
npm run test               # Run tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage

# Utilities
npm run analyze            # Analyze bundle size
npm run clean              # Clean build directories
```

## 📚 Learning Path

### 1. JavaScript Fundamentals (`/javascript`)

Start here to understand core JavaScript concepts with interactive examples:

- Variable declarations and scoping
- Function types and patterns
- Modern ES6+ syntax
- Asynchronous programming
- Data manipulation techniques

### 2. React Concepts (`/react`)

Learn React fundamentals and advanced patterns:

- Component architecture
- State management strategies
- Event handling patterns
- Form management
- Performance optimization

### 3. Next.js Features (`/nextjs`)

Explore Next.js capabilities:

- Routing and navigation
- API development
- Rendering strategies
- Performance optimizations
- Built-in features

### 4. Architecture Patterns (`/patterns`)

Learn modern architecture patterns:

- Micro-frontend with Module Federation
- Component-based architecture
- Provider pattern for state sharing
- Container/Presentational separation
- Custom hooks for reusable logic

### 5. Real-World Examples (`/examples`)

See everything in action:

- Complete todo application
- E-commerce shopping cart
- User authentication flow
- Notification system

## 🔧 Key Features Demonstrated

### State Management

- **Local State**: `useState`, `useReducer`
- **Global State**: Zustand store with persistence
- **Context API**: Theme and user management
- **Form State**: Controlled components, validation

### Performance Optimization

- **React**: `useMemo`, `useCallback`, component memoization
- **Next.js**: Automatic code splitting, image optimization
- **Caching**: Request deduplication, data caching

### Data Persistence

- **Local Storage**: Custom hooks for persistence
- **Zustand Persistence**: Automatic state synchronization
- **API Integration**: RESTful endpoints, error handling

### UI/UX

- **Responsive Design**: Mobile-first approach
- **Animations**: Framer Motion for smooth transitions
- **Accessibility**: Semantic HTML, keyboard navigation
- **Modern Design**: Tailwind CSS utility classes

### Testing & Development

- **Unit Testing**: Jest with Testing Library for component testing
- **Code Quality**: ESLint with Next.js configuration
- **Code Formatting**: Prettier with custom rules
- **Type Safety**: TypeScript with strict mode
- **Internationalization**: Multi-language support (EN, ES, FR, DE)
- **Module Federation**: Micro-frontend architecture setup
- **Development Tools**: Hot reload, type checking, linting scripts

## 📖 Code Examples

### Custom Hook for Local Storage

```typescript
const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: string | ((val: string) => string)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error setting localStorage:', error)
    }
  }

  return [storedValue, setValue] as const
}
```

### API Route Example

```typescript
// app/api/users/route.ts
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const role = searchParams.get('role')

  let filteredUsers = users
  if (role) {
    filteredUsers = users.filter(user => user.role === role)
  }

  return NextResponse.json({
    success: true,
    data: filteredUsers,
    total: filteredUsers.length,
  })
}
```

### Zustand Store

```typescript
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      todos: [],

      addTodo: (text, category, priority) => {
        const newTodo = {
          id: Date.now().toString(),
          text,
          completed: false,
          priority,
          category,
          createdAt: new Date(),
        }
        set(state => ({ todos: [...state.todos, newTodo] }))
      },

      toggleTodo: id =>
        set(state => ({
          todos: state.todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
        })),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

## 🧪 Testing the Application

### Manual Testing

1. **JavaScript Examples**: Run code snippets and see outputs
2. **React Components**: Interact with forms, buttons, and state changes
3. **API Endpoints**: Test CRUD operations with the user interface
4. **State Persistence**: Refresh the page to see data persistence

### Features to Test

- [ ] Todo CRUD operations
- [ ] Shopping cart functionality
- [ ] User authentication flow
- [ ] Theme switching
- [ ] Local storage persistence
- [ ] API endpoint responses
- [ ] Form validation
- [ ] Responsive design

## 🤝 Contributing

This is an educational project demonstrating web development concepts. Feel free to:

- Fork the repository
- Add new examples or concepts
- Improve existing implementations
- Fix bugs or typos
- Enhance documentation

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## ⚠️ Known Issues

### Module Federation Compatibility

- **Issue**: Module Federation is temporarily disabled due to compatibility issues with Next.js 15.5.2
- **Status**: The configuration is ready but commented out in `next.config.ts`
- **Solution**: Will be re-enabled when a compatible version is available
- **Impact**: The Micro-frontend pattern example shows configuration and concepts but doesn't demonstrate live module loading

### Workarounds Applied

- All other architecture patterns work perfectly
- Module Federation educational content is still available
- The example shows proper configuration for future use

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **React Team** for the powerful library
- **Tailwind CSS** for the utility-first CSS framework
- **Zustand** for simple state management
- **Framer Motion** for smooth animations

## 📞 Support

If you have questions or need help understanding any concepts:

1. Check the interactive examples in the application
2. Review the code comments and documentation
3. Experiment with the live demos
4. Create issues for bugs or improvements

---

**Happy Learning! 🎉**

This project demonstrates the power of modern web development with JavaScript, React, and Next.js. Each concept is explained with working code examples that you can interact with and learn from.
