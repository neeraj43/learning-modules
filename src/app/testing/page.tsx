'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TestTube, CheckCircle, Bug, Target, Zap, Shield, Terminal } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'

const TestingPage = () => {
  const [activeSection, setActiveSection] = useState('fundamentals')

  const sections = [
    { id: 'fundamentals', name: 'Testing Fundamentals', icon: '🧪' },
    { id: 'unit', name: 'Unit Testing', icon: '🔬' },
    { id: 'integration', name: 'Integration Testing', icon: '🔗' },
    { id: 'e2e', name: 'End-to-End Testing', icon: '🌐' },
    { id: 'react', name: 'React Testing', icon: '⚛️' },
    { id: 'api', name: 'API Testing', icon: '🚀' },
    { id: 'performance', name: 'Performance Testing', icon: '⚡' },
    { id: 'security', name: 'Security Testing', icon: '🛡️' }
  ]

  const codeExamples = {
    fundamentals: [
      {
        title: 'Testing Fundamentals & Strategy',
        description: 'Core testing concepts, strategies, and the testing pyramid',
        code: `// Testing Fundamentals - Concepts and Strategy

/**
 * TESTING PYRAMID OVERVIEW
 * 
 * 1. Unit Tests (Base - Most tests)
 *    - Test individual functions/components in isolation
 *    - Fast, reliable, easy to maintain
 *    - 70% of your test suite
 * 
 * 2. Integration Tests (Middle)
 *    - Test how different parts work together
 *    - Test API endpoints, database interactions
 *    - 20% of your test suite
 * 
 * 3. End-to-End Tests (Top - Fewest tests)
 *    - Test complete user workflows
 *    - Slow, brittle, expensive to maintain
 *    - 10% of your test suite
 */

// 1. BASIC TEST STRUCTURE (AAA Pattern)
describe('Calculator', () => {
  test('should add two numbers correctly', () => {
    // Arrange - Set up test data
    const calculator = new Calculator();
    const num1 = 5;
    const num2 = 3;
    
    // Act - Execute the function
    const result = calculator.add(num1, num2);
    
    // Assert - Verify the result
    expect(result).toBe(8);
  });
});

// 2. TEST DOUBLES (Mocks, Stubs, Spies)
class UserService {
  constructor(database, emailService) {
    this.database = database;
    this.emailService = emailService;
  }
  
  async createUser(userData) {
    // Validate user data
    if (!userData.email) {
      throw new Error('Email is required');
    }
    
    // Save to database
    const user = await this.database.save(userData);
    
    // Send welcome email
    await this.emailService.sendWelcomeEmail(user.email);
    
    return user;
  }
}

// Testing with mocks
describe('UserService', () => {
  let userService;
  let mockDatabase;
  let mockEmailService;
  
  beforeEach(() => {
    // Create mock dependencies
    mockDatabase = {
      save: jest.fn()
    };
    
    mockEmailService = {
      sendWelcomeEmail: jest.fn()
    };
    
    userService = new UserService(mockDatabase, mockEmailService);
  });
  
  test('should create user and send welcome email', async () => {
    // Arrange
    const userData = { name: 'John', email: 'john@example.com' };
    const savedUser = { id: 1, ...userData };
    
    mockDatabase.save.mockResolvedValue(savedUser);
    mockEmailService.sendWelcomeEmail.mockResolvedValue(true);
    
    // Act
    const result = await userService.createUser(userData);
    
    // Assert
    expect(mockDatabase.save).toHaveBeenCalledWith(userData);
    expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith('john@example.com');
    expect(result).toEqual(savedUser);
  });
  
  test('should throw error for missing email', async () => {
    // Arrange
    const userData = { name: 'John' }; // Missing email
    
    // Act & Assert
    await expect(userService.createUser(userData))
      .rejects.toThrow('Email is required');
    
    // Verify dependencies were not called
    expect(mockDatabase.save).not.toHaveBeenCalled();
    expect(mockEmailService.sendWelcomeEmail).not.toHaveBeenCalled();
  });
});

// 3. TEST CATEGORIES AND EXAMPLES

// Unit Test Example
function validateEmail(email) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

describe('validateEmail', () => {
  test.each([
    ['valid@email.com', true],
    ['user@domain.co.uk', true],
    ['invalid-email', false],
    ['@domain.com', false],
    ['user@', false],
    ['', false]
  ])('validateEmail("%s") should return %s', (email, expected) => {
    expect(validateEmail(email)).toBe(expected);
  });
});

// Integration Test Example (Express API)
const request = require('supertest');
const app = require('../app');

describe('POST /api/users', () => {
  test('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);
    
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      name: userData.name,
      email: userData.email,
      createdAt: expect.any(String)
    });
  });
  
  test('should return 400 for invalid data', async () => {
    const invalidData = { name: 'John' }; // Missing email
    
    await request(app)
      .post('/api/users')
      .send(invalidData)
      .expect(400);
  });
});

// 4. TESTING BEST PRACTICES

// ✅ Good: Descriptive test names
test('should return user profile when valid ID is provided', () => {
  // Test implementation
});

// ❌ Bad: Vague test names
test('user test', () => {
  // Test implementation
});

// ✅ Good: Test one thing at a time
test('should validate email format', () => {
  expect(validateEmail('test@example.com')).toBe(true);
});

test('should reject invalid email format', () => {
  expect(validateEmail('invalid-email')).toBe(false);
});

// ❌ Bad: Testing multiple things
test('should handle email validation', () => {
  expect(validateEmail('test@example.com')).toBe(true);
  expect(validateEmail('invalid-email')).toBe(false);
  expect(validateEmail('')).toBe(false);
});

// ✅ Good: Use setup and teardown
describe('Database tests', () => {
  beforeEach(async () => {
    await database.connect();
    await database.seed();
  });
  
  afterEach(async () => {
    await database.cleanup();
    await database.disconnect();
  });
  
  test('should save user to database', async () => {
    // Test implementation
  });
});

// 5. CUSTOM MATCHERS AND UTILITIES

// Custom Jest matchers
expect.extend({
  toBeValidEmail(received) {
    const pass = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(received);
    
    if (pass) {
      return {
        message: () => \`expected \${received} not to be a valid email\`,
        pass: true,
      };
    } else {
      return {
        message: () => \`expected \${received} to be a valid email\`,
        pass: false,
      };
    }
  },
});

// Usage
test('should have valid email format', () => {
  expect('user@example.com').toBeValidEmail();
});

// Test utilities
const TestUtils = {
  createMockUser: (overrides = {}) => ({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date().toISOString(),
    ...overrides
  }),
  
  createMockRequest: (overrides = {}) => ({
    body: {},
    params: {},
    query: {},
    headers: {},
    ...overrides
  }),
  
  createMockResponse: () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  }
};

// 6. TESTING PATTERNS

// Factory Pattern for Test Data
class UserFactory {
  static create(overrides = {}) {
    return {
      id: Math.floor(Math.random() * 1000),
      name: 'Test User',
      email: 'test@example.com',
      isActive: true,
      createdAt: new Date(),
      ...overrides
    };
  }
  
  static createMany(count, overrides = {}) {
    return Array.from({ length: count }, (_, index) => 
      this.create({ id: index + 1, ...overrides })
    );
  }
}

// Usage
test('should process multiple users', () => {
  const users = UserFactory.createMany(5, { isActive: true });
  expect(users).toHaveLength(5);
  users.forEach(user => {
    expect(user.isActive).toBe(true);
  });
});

// Page Object Model (for E2E tests)
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = '[data-testid="email-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.submitButton = '[data-testid="submit-button"]';
  }
  
  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }
  
  async getErrorMessage() {
    return await this.page.textContent('[data-testid="error-message"]');
  }
}

// 7. TESTING CONFIGURATION

// Jest configuration (jest.config.js)
const jestConfig = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/**/*.config.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,ts}',
    '<rootDir>/src/**/*.{test,spec}.{js,ts}'
  ]
};

console.log("Testing fundamentals covered:");
console.log("✅ Testing pyramid and strategy");
console.log("✅ AAA pattern and test structure");
console.log("✅ Mocks, stubs, and test doubles");
console.log("✅ Best practices and patterns");
console.log("✅ Custom matchers and utilities");
console.log("✅ Configuration and setup");

console.log("\\nNext: Dive into specific testing frameworks and tools!");`
      }
    ],
    unit: [
      {
        title: 'Unit Testing with Jest',
        description: 'Comprehensive unit testing strategies using Jest framework',
        code: `// Unit Testing with Jest - Complete Guide

// 1. JEST SETUP AND CONFIGURATION
// package.json scripts
const packageScripts = {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:ci": "jest --ci --coverage --watchAll=false"
};

// jest.config.js
const jestConfig = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(test|spec).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts']
};

// 2. BASIC FUNCTION TESTING
// math.js
function add(a, b) {
  return a + b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// math.test.js
describe('Math utilities', () => {
  describe('add function', () => {
    test('should add positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    
    test('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });
    
    test('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
    });
    
    test('should handle decimal numbers', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });
  
  describe('divide function', () => {
    test('should divide numbers correctly', () => {
      expect(divide(10, 2)).toBe(5);
      expect(divide(7, 2)).toBe(3.5);
    });
    
    test('should throw error for division by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });
  });
});

// 3. TESTING CLASSES AND OBJECTS
class Calculator {
  constructor() {
    this.history = [];
    this.memory = 0;
  }
  
  add(a, b) {
    const result = a + b;
    this.history.push(\`\${a} + \${b} = \${result}\`);
    return result;
  }
  
  subtract(a, b) {
    const result = a - b;
    this.history.push(\`\${a} - \${b} = \${result}\`);
    return result;
  }
  
  memorize(value) {
    this.memory = value;
  }
  
  recall() {
    return this.memory;
  }
  
  getHistory() {
    return [...this.history];
  }
  
  clear() {
    this.history = [];
    this.memory = 0;
  }
}

describe('Calculator', () => {
  let calculator;
  
  beforeEach(() => {
    calculator = new Calculator();
  });
  
  test('should perform basic arithmetic', () => {
    expect(calculator.add(5, 3)).toBe(8);
    expect(calculator.subtract(10, 4)).toBe(6);
  });
  
  test('should track calculation history', () => {
    calculator.add(2, 3);
    calculator.subtract(10, 5);
    
    const history = calculator.getHistory();
    expect(history).toHaveLength(2);
    expect(history[0]).toBe('2 + 3 = 5');
    expect(history[1]).toBe('10 - 5 = 5');
  });
  
  test('should handle memory operations', () => {
    calculator.memorize(42);
    expect(calculator.recall()).toBe(42);
    
    calculator.clear();
    expect(calculator.recall()).toBe(0);
  });
});

// 4. TESTING ASYNC FUNCTIONS
class UserRepository {
  constructor(database) {
    this.database = database;
  }
  
  async findById(id) {
    if (!id) {
      throw new Error('ID is required');
    }
    
    const user = await this.database.findOne({ id });
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }
  
  async create(userData) {
    if (!userData.email) {
      throw new Error('Email is required');
    }
    
    const existingUser = await this.database.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const user = {
      id: Date.now(),
      ...userData,
      createdAt: new Date()
    };
    
    await this.database.save(user);
    return user;
  }
}

describe('UserRepository', () => {
  let userRepository;
  let mockDatabase;
  
  beforeEach(() => {
    mockDatabase = {
      findOne: jest.fn(),
      save: jest.fn()
    };
    userRepository = new UserRepository(mockDatabase);
  });
  
  describe('findById', () => {
    test('should return user when found', async () => {
      const mockUser = { id: 1, name: 'John', email: 'john@example.com' };
      mockDatabase.findOne.mockResolvedValue(mockUser);
      
      const result = await userRepository.findById(1);
      
      expect(mockDatabase.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockUser);
    });
    
    test('should throw error when user not found', async () => {
      mockDatabase.findOne.mockResolvedValue(null);
      
      await expect(userRepository.findById(999))
        .rejects.toThrow('User not found');
    });
    
    test('should throw error when ID is not provided', async () => {
      await expect(userRepository.findById())
        .rejects.toThrow('ID is required');
    });
  });
  
  describe('create', () => {
    test('should create user successfully', async () => {
      const userData = { name: 'Jane', email: 'jane@example.com' };
      mockDatabase.findOne.mockResolvedValue(null); // User doesn't exist
      mockDatabase.save.mockResolvedValue();
      
      const result = await userRepository.create(userData);
      
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: userData.name,
        email: userData.email,
        createdAt: expect.any(Date)
      });
      expect(mockDatabase.save).toHaveBeenCalledWith(result);
    });
    
    test('should throw error for duplicate email', async () => {
      const userData = { name: 'Jane', email: 'jane@example.com' };
      const existingUser = { id: 1, email: 'jane@example.com' };
      mockDatabase.findOne.mockResolvedValue(existingUser);
      
      await expect(userRepository.create(userData))
        .rejects.toThrow('User already exists');
    });
  });
});

// 5. TESTING WITH TIMERS AND DATES
class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }
  
  isAllowed(clientId) {
    const now = Date.now();
    const clientRequests = this.requests.get(clientId) || [];
    
    // Remove old requests outside the window
    const validRequests = clientRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(clientId, validRequests);
    return true;
  }
}

describe('RateLimiter', () => {
  let rateLimiter;
  
  beforeEach(() => {
    rateLimiter = new RateLimiter(3, 1000); // 3 requests per second
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.useRealTimers();
  });
  
  test('should allow requests within limit', () => {
    expect(rateLimiter.isAllowed('client1')).toBe(true);
    expect(rateLimiter.isAllowed('client1')).toBe(true);
    expect(rateLimiter.isAllowed('client1')).toBe(true);
  });
  
  test('should block requests exceeding limit', () => {
    // Make 3 requests (limit)
    rateLimiter.isAllowed('client1');
    rateLimiter.isAllowed('client1');
    rateLimiter.isAllowed('client1');
    
    // 4th request should be blocked
    expect(rateLimiter.isAllowed('client1')).toBe(false);
  });
  
  test('should reset after time window', () => {
    // Make 3 requests
    rateLimiter.isAllowed('client1');
    rateLimiter.isAllowed('client1');
    rateLimiter.isAllowed('client1');
    
    // Should be blocked
    expect(rateLimiter.isAllowed('client1')).toBe(false);
    
    // Advance time by 1 second
    jest.advanceTimersByTime(1000);
    
    // Should be allowed again
    expect(rateLimiter.isAllowed('client1')).toBe(true);
  });
});

// 6. TESTING ERROR SCENARIOS
class FileProcessor {
  constructor(fileSystem) {
    this.fileSystem = fileSystem;
  }
  
  async processFile(filePath) {
    try {
      const content = await this.fileSystem.readFile(filePath);
      
      if (!content) {
        throw new Error('File is empty');
      }
      
      const lines = content.split('\\n');
      const processedLines = lines
        .filter(line => line.trim() !== '')
        .map(line => line.toUpperCase());
      
      return processedLines;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(\`File not found: \${filePath}\`);
      }
      throw error;
    }
  }
}

describe('FileProcessor', () => {
  let fileProcessor;
  let mockFileSystem;
  
  beforeEach(() => {
    mockFileSystem = {
      readFile: jest.fn()
    };
    fileProcessor = new FileProcessor(mockFileSystem);
  });
  
  test('should process file content correctly', async () => {
    const content = 'hello\\nworld\\n\\ngoodbye';
    mockFileSystem.readFile.mockResolvedValue(content);
    
    const result = await fileProcessor.processFile('test.txt');
    
    expect(result).toEqual(['HELLO', 'WORLD', 'GOODBYE']);
  });
  
  test('should handle file not found error', async () => {
    const error = new Error('File not found');
    error.code = 'ENOENT';
    mockFileSystem.readFile.mockRejectedValue(error);
    
    await expect(fileProcessor.processFile('nonexistent.txt'))
      .rejects.toThrow('File not found: nonexistent.txt');
  });
  
  test('should handle empty file', async () => {
    mockFileSystem.readFile.mockResolvedValue('');
    
    await expect(fileProcessor.processFile('empty.txt'))
      .rejects.toThrow('File is empty');
  });
});

// 7. TESTING UTILITIES AND HELPERS
const TestHelpers = {
  // Mock factory functions
  createMockUser: (overrides = {}) => ({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    isActive: true,
    ...overrides
  }),
  
  // Async test helpers
  waitFor: (condition, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      
      const check = () => {
        if (condition()) {
          resolve();
        } else if (Date.now() - start > timeout) {
          reject(new Error('Timeout waiting for condition'));
        } else {
          setTimeout(check, 10);
        }
      };
      
      check();
    });
  },
  
  // Promise helpers
  flushPromises: () => new Promise(resolve => setImmediate(resolve))
};

// Usage example
test('should update user status asynchronously', async () => {
  const user = TestHelpers.createMockUser({ isActive: false });
  
  userService.activateUser(user.id);
  
  await TestHelpers.waitFor(() => user.isActive === true);
  
  expect(user.isActive).toBe(true);
});

console.log("Unit testing with Jest completed!");
console.log("✅ Basic function testing");
console.log("✅ Class and object testing");
console.log("✅ Async function testing");
console.log("✅ Timer and date testing");
console.log("✅ Error scenario testing");
console.log("✅ Test utilities and helpers");`
      }
    ],
    react: [
      {
        title: 'React Testing with Jest & Testing Library',
        description: 'Complete React component testing with React Testing Library',
        code: `// React Testing with Jest & React Testing Library

// 1. SETUP AND CONFIGURATION
// Install dependencies:
// npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

// src/test/setup.js
import '@testing-library/jest-dom';

// Custom render function with providers
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

const customRender = (ui, options = {}) => {
  const {
    initialState = {},
    store = createStore(rootReducer, initialState),
    theme = defaultTheme,
    ...renderOptions
  } = options;

  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// 2. BASIC COMPONENT TESTING
// Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  size = 'medium'
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={handleClick}
      disabled={disabled}
      data-testid="button"
    >
      {children}
    </button>
  );
};

export default Button;

// Button.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <Button onClick={handleClick} disabled>
        Disabled button
      </Button>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
  
  test('applies correct CSS classes', () => {
    render(
      <Button variant="secondary" size="large">
        Styled button
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-secondary', 'btn-large');
  });
});

// 3. TESTING COMPONENTS WITH STATE
// Counter.jsx
import React, { useState } from 'react';

const Counter = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);
  
  return (
    <div>
      <h2 data-testid="count-display">Count: {count}</h2>
      <button onClick={increment} data-testid="increment-btn">
        +{step}
      </button>
      <button onClick={decrement} data-testid="decrement-btn">
        -{step}
      </button>
      <button onClick={reset} data-testid="reset-btn">
        Reset
      </button>
    </div>
  );
};

export default Counter;

// Counter.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter Component', () => {
  test('renders with initial value', () => {
    render(<Counter initialValue={5} />);
    
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 5');
  });
  
  test('increments count when + button clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const incrementBtn = screen.getByTestId('increment-btn');
    await user.click(incrementBtn);
    
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 1');
  });
  
  test('decrements count when - button clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} />);
    
    const decrementBtn = screen.getByTestId('decrement-btn');
    await user.click(decrementBtn);
    
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 4');
  });
  
  test('resets count to initial value', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={10} />);
    
    // Change the count
    await user.click(screen.getByTestId('increment-btn'));
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 11');
    
    // Reset
    await user.click(screen.getByTestId('reset-btn'));
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 10');
  });
  
  test('uses custom step value', async () => {
    const user = userEvent.setup();
    render(<Counter step={5} />);
    
    await user.click(screen.getByTestId('increment-btn'));
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 5');
  });
});

// 4. TESTING FORMS AND USER INPUT
// LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({ email, password });
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <div id="email-error" role="alert">
            {errors.email}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        {errors.password && (
          <div id="password-error" role="alert">
            {errors.password}
          </div>
        )}
      </div>
      
      {errors.submit && (
        <div role="alert" style={{ color: 'red' }}>
          {errors.submit}
        </div>
      )}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;

// LoginForm.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {
  test('renders form fields', () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
  
  test('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);
    
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });
  
  test('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);
    
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
  });
  
  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn().mockResolvedValue();
    
    render(<LoginForm onSubmit={mockSubmit} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
  
  test('shows loading state during submission', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<LoginForm onSubmit={mockSubmit} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    expect(screen.getByText('Logging in...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
    });
  });
  
  test('handles submission error', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    
    render(<LoginForm onSubmit={mockSubmit} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});

// 5. TESTING HOOKS
// useCounter.js (Custom Hook)
import { useState, useCallback } from 'react';

const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - step);
  }, [step]);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
};

export default useCounter;

// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

describe('useCounter Hook', () => {
  test('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
  });
  
  test('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    expect(result.current.count).toBe(10);
  });
  
  test('increments count', () => {
    const { result } = renderHook(() => useCounter(0, 2));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(2);
  });
  
  test('decrements count', () => {
    const { result } = renderHook(() => useCounter(5, 2));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(3);
  });
  
  test('resets to initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(12);
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});

console.log("React Testing completed!");
console.log("✅ Basic component testing");
console.log("✅ State and interaction testing");
console.log("✅ Form validation testing");
console.log("✅ Custom hooks testing");
console.log("✅ Async behavior testing");
console.log("✅ Error handling testing");`
      }
    ]
  }

  const renderSection = () => {
    const examples = codeExamples[activeSection as keyof typeof codeExamples] || []
    
    return (
      <div className="space-y-8">
        {examples.map((example, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {example.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {example.description}
              </p>
              
              <CodeEditor
                title={example.title}
                initialCode={example.code}
                height="450px"
              />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
              Testing & Quality Assurance
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master comprehensive testing strategies - unit, integration, E2E testing, 
              React Testing Library, performance testing, and quality assurance practices.
            </p>
          </motion.div>

          {/* Interactive Testing Playground */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Testing Code Playground</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Practice writing tests! Jest, React Testing Library, and testing patterns.
              </p>
              <CodeEditor
                title="Testing Playground"
                initialCode={`// Welcome to Testing!
// This demonstrates various testing patterns and frameworks

// 1. Simple unit test with Jest
function add(a, b) {
  return a + b;
}

// Test for the add function
describe('Math functions', () => {
  test('should add two numbers correctly', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });
  
  test('should handle negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
  
  test('should handle zero', () => {
    expect(add(0, 5)).toBe(5);
  });
});

// 2. Testing with mocks
class UserService {
  constructor(database) {
    this.database = database;
  }
  
  async getUser(id) {
    const user = await this.database.findById(id);
    return user;
  }
}

// Mock testing example
describe('UserService', () => {
  test('should fetch user from database', async () => {
    // Create a mock database
    const mockDatabase = {
      findById: jest.fn().mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      })
    };
    
    const userService = new UserService(mockDatabase);
    const user = await userService.getUser(1);
    
    expect(mockDatabase.findById).toHaveBeenCalledWith(1);
    expect(user.name).toBe('John Doe');
  });
});

// 3. Testing async functions
async function fetchUserData(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

describe('fetchUserData', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  
  test('should fetch user data successfully', async () => {
    const mockUser = { id: 1, name: 'Alice' };
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser)
    });
    
    const user = await fetchUserData(1);
    expect(user).toEqual(mockUser);
  });
  
  test('should throw error for failed request', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404
    });
    
    await expect(fetchUserData(999))
      .rejects.toThrow('User not found');
  });
});

// 4. React component testing example
/* 
// This would be in a .jsx file
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
*/

console.log('Testing examples completed!');
console.log('✅ Unit tests with Jest');
console.log('✅ Mocking dependencies');
console.log('✅ Async function testing');
console.log('✅ React component testing patterns');

// Try writing your own tests below:
`}
                height="350px"
              />
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderSection()}
          </motion.div>

          {/* Testing Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🧪 Why Testing Matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">🔒</div>
                <h3 className="font-semibold mb-2">Reliability</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Catch bugs early</li>
                  <li>• Prevent regressions</li>
                  <li>• Ensure consistent behavior</li>
                  <li>• Build confidence in changes</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">📋</div>
                <h3 className="font-semibold mb-2">Documentation</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Living code examples</li>
                  <li>• Behavioral specifications</li>
                  <li>• Usage patterns</li>
                  <li>• API contracts</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">🚀</div>
                <h3 className="font-semibold mb-2">Development</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Faster debugging</li>
                  <li>• Safe refactoring</li>
                  <li>• Better design</li>
                  <li>• Team collaboration</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <TestTube className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Unit Testing</h3>
              <p className="text-gray-600 text-sm">Test individual components and functions in isolation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <CheckCircle className="w-8 h-8 text-pink-600 mb-3" />
              <h3 className="font-semibold mb-2">Integration</h3>
              <p className="text-gray-600 text-sm">Test how different parts work together</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Target className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-semibold mb-2">End-to-End</h3>
              <p className="text-gray-600 text-sm">Test complete user workflows and scenarios</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Shield className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600 text-sm">Performance, security, and accessibility testing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TestingPage
