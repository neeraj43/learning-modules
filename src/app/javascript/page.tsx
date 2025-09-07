'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Code, Copy, Check } from 'lucide-react'
import { allJavaScriptExamples } from '@/utils/javascript-examples'

interface CodeExample {
  title: string
  description: string
  code: string
  demo: () => string | number | boolean | object
}

const JavaScriptPage = () => {
  const [activeSection, setActiveSection] = useState('variables')
  const [executionResults, setExecutionResults] = useState<Record<string, string | number | boolean | object>>({})
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const sections = [
    { id: 'variables', name: 'Variables & Types', icon: '🔤' },
    { id: 'functions', name: 'Functions', icon: '⚡' },
    { id: 'es6', name: 'ES6+ Features', icon: '🚀' },
    { id: 'async', name: 'Async/Await', icon: '⏰' },
    { id: 'arrays', name: 'Array Methods', icon: '📋' },
    { id: 'objects', name: 'Objects', icon: '🎯' },
    { id: 'errors', name: 'Error Handling', icon: '🛡️' },
    { id: 'closures', name: 'Closures', icon: '🔒' },
    { id: 'prototypes', name: 'Classes', icon: '🏗️' },
    { id: 'regex', name: 'Regex', icon: '🔍' }
  ]

  const codeExamples: Record<string, CodeExample[]> = {
    variables: [
      {
        title: 'Variable Declarations',
        description: 'Different ways to declare variables: var, let, const',
        code: `// var - function scoped, can be redeclared
var x = 1;
if (true) {
  var x = 2; // Same variable
}
console.log(x); // 2

// let - block scoped, cannot be redeclared
let y = 1;
if (true) {
  let y = 2; // Different variable
}
console.log(y); // 1

// const - block scoped, cannot be reassigned
const z = 1;
// z = 2; // Error!`,
        demo: () => {
          let result = '';
          // eslint-disable-next-line no-var
          var x = 1;
          if (true) {
            // eslint-disable-next-line no-var
            var x = 2;
          }
          result += `var x: ${x}\n`;
          
          // eslint-disable-next-line prefer-const
          let y = 1;
          if (true) {
            // eslint-disable-next-line prefer-const
            let y = 2;
          }
          result += `let y: ${y}\n`;
          
          const z = 1;
          result += `const z: ${z}`;
          return result;
        }
      },
      {
        title: 'Data Types',
        description: 'JavaScript primitive and reference types',
        code: `// Primitive types
const str = "Hello World";
const num = 42;
const bool = true;
const nothing = null;
const undef = undefined;
const sym = Symbol('unique');
const bigNum = BigInt(9007199254740991);

console.log(typeof str);   // "string"
console.log(typeof num);   // "number"
console.log(typeof bool);  // "boolean"
console.log(typeof nothing); // "object" (quirk!)
console.log(typeof undef); // "undefined"
console.log(typeof sym);   // "symbol"
console.log(typeof bigNum); // "bigint"`,
        demo: () => ({
          string: { value: "Hello World", type: typeof "Hello World" },
          number: { value: 42, type: typeof 42 },
          boolean: { value: true, type: typeof true },
          null: { value: null, type: typeof null },
          undefined: { value: undefined, type: typeof undefined },
          symbol: { value: 'Symbol(unique)', type: typeof Symbol('unique') },
          bigint: { value: '9007199254740991n', type: typeof BigInt(9007199254740991) }
        })
      }
    ],
    functions: [
      {
        title: 'Function Declarations vs Expressions',
        description: 'Different ways to create functions in JavaScript',
        code: `// Function Declaration (hoisted)
function add(a, b) {
  return a + b;
}

// Function Expression
const multiply = function(a, b) {
  return a * b;
};

// Arrow Function
const subtract = (a, b) => a - b;

// Arrow Function with block
const divide = (a, b) => {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
};`,
        demo: () => {
          const add = (a: number, b: number) => a + b;
          const multiply = function(a: number, b: number) { return a * b; };
          const subtract = (a: number, b: number) => a - b;
          
          return {
            'add(5, 3)': add(5, 3),
            'multiply(4, 7)': multiply(4, 7),
            'subtract(10, 6)': subtract(10, 6)
          };
        }
      },
      {
        title: 'Higher-Order Functions',
        description: 'Functions that take other functions as parameters',
        code: `// Higher-order function
function createOperation(operation) {
  return function(a, b) {
    return operation(a, b);
  };
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const adder = createOperation(add);
const multiplier = createOperation(multiply);

console.log(adder(5, 3));      // 8
console.log(multiplier(4, 6)); // 24`,
        demo: () => {
          const createOperation = (operation: (a: number, b: number) => number) => 
            (a: number, b: number) => operation(a, b);
          
          const add = (a: number, b: number) => a + b;
          const multiply = (a: number, b: number) => a * b;
          
          const adder = createOperation(add);
          const multiplier = createOperation(multiply);
          
          return {
            'adder(5, 3)': adder(5, 3),
            'multiplier(4, 6)': multiplier(4, 6)
          };
        }
      }
    ],
    es6: [
      {
        title: 'Template Literals',
        description: 'String interpolation and multi-line strings',
        code: `const name = "John";
const age = 30;

// Old way
const oldMessage = "Hello, " + name + "! You are " + age + " years old.";

// Template literals
const newMessage = \`Hello, \${name}! You are \${age} years old.\`;

// Multi-line strings
const multiLine = \`
  This is a multi-line string.
  It can span multiple lines
  without concatenation.
\`;`,
        demo: () => {
          const name = "John";
          const age = 30;
          
          return {
            name,
            age,
            templateLiteral: `Hello, ${name}! You are ${age} years old.`,
            multiLine: `Line 1\nLine 2\nLine 3`
          };
        }
      },
      {
        title: 'Destructuring Assignment',
        description: 'Extract values from arrays and objects',
        code: `// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const person = { name: "Alice", age: 25, city: "New York" };
const { name, age, city } = person;

// Destructuring with renaming
const { name: fullName, age: yearsOld } = person;

// Nested destructuring
const user = {
  id: 1,
  profile: {
    name: "Bob",
    email: "bob@example.com"
  }
};
const { profile: { name: userName, email } } = user;`,
        demo: () => {
          const [first, second, ...rest] = [1, 2, 3, 4, 5];
          const person = { name: "Alice", age: 25, city: "New York" };
          const { name, age, city } = person;
          
          return {
            arrayDestructuring: { first, second, rest },
            objectDestructuring: { name, age, city },
            originalArray: [1, 2, 3, 4, 5],
            originalObject: person
          };
        }
      }
    ],
    async: [
      {
        title: 'Promises',
        description: 'Handle asynchronous operations with promises',
        code: `// Creating a promise
const fetchData = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(\`Data fetched after \${delay}ms\`);
    }, delay);
  });
};

// Using promises
fetchData(1000)
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Promise chaining
Promise.resolve(5)
  .then(x => x * 2)
  .then(x => x + 3)
  .then(result => console.log(result)); // 13`,
        demo: async () => {
          const fetchData = (delay: number) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(`Data fetched after ${delay}ms`);
              }, delay);
            });
          };

          const chainResult = await Promise.resolve(5)
            .then(x => x * 2)
            .then(x => x + 3);

          return {
            promiseChaining: chainResult,
            promiseExample: 'Promise created successfully'
          };
        }
      },
      {
        title: 'Async/Await',
        description: 'Modern syntax for handling asynchronous code',
        code: `// Async function
async function fetchUserData(userId) {
  try {
    const user = await fetch(\`/api/users/\${userId}\`);
    const userData = await user.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Multiple async operations
async function fetchMultipleData() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
  ]);
  
  return {
    users: await users.json(),
    posts: await posts.json(),
    comments: await comments.json()
  };
}`,
        demo: async () => {
          const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
          
          const asyncFunction = async () => {
            await delay(100);
            return 'Async operation completed';
          };

          const result = await asyncFunction();
          
          return {
            asyncResult: result,
            timestamp: new Date().toISOString()
          };
        }
      }
    ],
    arrays: [
      {
        title: 'Array Transformation Methods',
        description: 'map, filter, reduce, and other array methods',
        code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Map - transform each element
const doubled = numbers.map(x => x * 2);

// Filter - select elements
const evens = numbers.filter(x => x % 2 === 0);

// Reduce - accumulate to single value
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// Chaining methods
const result = numbers
  .filter(x => x % 2 === 0)
  .map(x => x * 3)
  .reduce((sum, curr) => sum + curr, 0);`,
        demo: () => {
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          
          return {
            original: numbers,
            doubled: numbers.map(x => x * 2),
            evens: numbers.filter(x => x % 2 === 0),
            sum: numbers.reduce((acc, curr) => acc + curr, 0),
            chainResult: numbers
              .filter(x => x % 2 === 0)
              .map(x => x * 3)
              .reduce((sum, curr) => sum + curr, 0)
          };
        }
      },
      {
        title: 'Array Search and Test Methods',
        description: 'find, some, every, includes, and indexOf',
        code: `const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
const numbers = [1, 2, 3, 4, 5];

// Find first element that matches
const longFruit = fruits.find(fruit => fruit.length > 5);

// Check if any element matches
const hasLongFruit = fruits.some(fruit => fruit.length > 5);

// Check if all elements match
const allShort = fruits.every(fruit => fruit.length < 10);

// Check if array includes value
const hasApple = fruits.includes('apple');

// Find index of element
const bananaIndex = fruits.indexOf('banana');`,
        demo: () => {
          const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];
          
          return {
            fruits,
            longFruit: fruits.find(fruit => fruit.length > 5),
            hasLongFruit: fruits.some(fruit => fruit.length > 5),
            allShort: fruits.every(fruit => fruit.length < 10),
            hasApple: fruits.includes('apple'),
            bananaIndex: fruits.indexOf('banana')
          };
        }
      }
    ],
    objects: [
      {
        title: 'Object Methods',
        description: 'Working with object keys, values, and entries',
        code: `const person = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
  hobbies: ['reading', 'coding']
};

// Get object keys
const keys = Object.keys(person);

// Get object values
const values = Object.values(person);

// Get key-value pairs
const entries = Object.entries(person);

// Create object from entries
const newObj = Object.fromEntries(entries);

// Merge objects
const additional = { city: 'New York', country: 'USA' };
const merged = Object.assign({}, person, additional);`,
        demo: () => {
          const person = {
            name: 'John Doe',
            age: 30,
            email: 'john@example.com',
            hobbies: ['reading', 'coding']
          };
          
          const additional = { city: 'New York', country: 'USA' };
          
          return {
            original: person,
            keys: Object.keys(person),
            values: Object.values(person),
            entries: Object.entries(person),
            merged: { ...person, ...additional }
          };
        }
      }
    ],
    errors: [
      {
        title: 'Error Handling',
        description: 'Try-catch blocks and custom errors',
        code: `// Basic try-catch
function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  } finally {
    console.log('Operation completed');
  }
}

// Custom error class
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

// Async error handling
async function asyncOperation() {
  try {
    const result = await riskyOperation();
    return result;
  } catch (error) {
    throw new CustomError(\`Async error: \${error.message}\`);
  }
}`,
        demo: () => {
          const divide = (a: number, b: number) => {
            try {
              if (b === 0) {
                throw new Error('Division by zero');
              }
              return a / b;
            } catch (error) {
              return `Error: ${error instanceof Error ? error.message : error}`;
            }
          };
          
          return {
            'divide(10, 2)': divide(10, 2),
            'divide(10, 0)': divide(10, 0),
            errorType: 'Error caught and handled'
          };
        }
      }
    ],
    closures: [
      {
        title: 'Closures and Scope',
        description: 'Functions that remember their environment',
        code: `// Basic closure
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (separate closure)

// Module pattern
function createModule() {
  let privateVar = 0;
  
  return {
    increment: () => ++privateVar,
    decrement: () => --privateVar,
    getValue: () => privateVar
  };
}`,
        demo: () => {
          const createCounter = () => {
            let count = 0;
            return () => ++count;
          };
          
          const counter1 = createCounter();
          const counter2 = createCounter();
          
          return {
            'counter1 (1st call)': counter1(),
            'counter1 (2nd call)': counter1(),
            'counter2 (1st call)': counter2(),
            note: 'Each counter maintains its own closure'
          };
        }
      }
    ],
    prototypes: [
      {
        title: 'ES6 Classes',
        description: 'Modern class syntax and inheritance',
        code: `// ES6 Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    return \`Hi, I'm \${this.name} and I'm \${this.age} years old\`;
  }
  
  static createAdult(name) {
    return new Person(name, 18);
  }
}

// Inheritance
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  introduce() {
    return \`\${super.introduce()} I'm in grade \${this.grade}\`;
  }
}`,
        demo: () => {
          class Person {
            constructor(public name: string, public age: number) {}
            
            introduce() {
              return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
            }
          }
          
          class Student extends Person {
            constructor(name: string, age: number, public grade: string) {
              super(name, age);
            }
            
            introduce() {
              return `${super.introduce()} I'm in grade ${this.grade}`;
            }
          }
          
          const person = new Person('John', 25);
          const student = new Student('Alice', 16, '10th');
          
          return {
            person: person.introduce(),
            student: student.introduce(),
            personData: { name: person.name, age: person.age },
            studentData: { name: student.name, age: student.age, grade: student.grade }
          };
        }
      }
    ],
    regex: [
      {
        title: 'Regular Expressions',
        description: 'Pattern matching and text processing',
        code: `// Email validation
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
const isValidEmail = emailRegex.test('user@example.com');

// Extract numbers
const text = 'I have 5 apples and 3 oranges';
const numbers = text.match(/\\d+/g);

// Replace patterns
const sentence = 'Hello World! How are you?';
const cleaned = sentence.replace(/[^a-zA-Z0-9\\s]/g, '');

// Named capture groups
const dateRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const dateMatch = dateRegex.exec('2023-12-25');`,
        demo: () => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const text = 'I have 5 apples and 3 oranges';
          const sentence = 'Hello World! How are you?';
          
          return {
            'Valid email test': emailRegex.test('user@example.com'),
            'Invalid email test': emailRegex.test('invalid-email'),
            'Extract numbers': text.match(/\d+/g),
            'Clean text': sentence.replace(/[^a-zA-Z0-9\s]/g, ''),
            'Original text': text,
            'Original sentence': sentence
          };
        }
      }
    ]
  };

  const executeCode = async (sectionId: string, exampleIndex: number) => {
    try {
      const example = codeExamples[sectionId][exampleIndex];
      const result = await example.demo();
      setExecutionResults(prev => ({
        ...prev,
        [`${sectionId}-${exampleIndex}`]: result
      }));
    } catch (error) {
      setExecutionResults(prev => ({
        ...prev,
        [`${sectionId}-${exampleIndex}`]: `Error: ${error}`
      }));
    }
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent mb-4">
            JavaScript Fundamentals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master JavaScript from variables to advanced concepts with interactive examples and live demonstrations
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 lg:sticky lg:top-24 lg:h-fit">
            <nav className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Concepts</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-8">
              {codeExamples[activeSection]?.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {example.title}
                    </h3>
                    <p className="text-gray-600">{example.description}</p>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
                    {/* Code Section */}
                    <div className="relative">
                      <div className="flex items-center justify-between bg-gray-900 px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <Code className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300 text-sm font-medium">JavaScript</span>
                        </div>
                        <button
                          onClick={() => copyCode(example.code, `${activeSection}-${index}`)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === `${activeSection}-${index}` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                        <code>{example.code}</code>
                      </pre>
                    </div>

                    {/* Demo Section */}
                    <div className="border-l border-gray-200">
                      <div className="flex items-center justify-between bg-green-50 px-4 py-2 border-b border-green-200">
                        <div className="flex items-center space-x-2">
                          <Play className="w-4 h-4 text-green-600" />
                          <span className="text-green-800 text-sm font-medium">Live Demo</span>
                        </div>
                        <button
                          onClick={() => executeCode(activeSection, index)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          Run Code
                        </button>
                      </div>
                      <div className="p-4 bg-green-50 min-h-[200px]">
                        {executionResults[`${activeSection}-${index}`] ? (
                          <div className="bg-white rounded border p-3">
                            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                              {typeof executionResults[`${activeSection}-${index}`] === 'object'
                                ? JSON.stringify(executionResults[`${activeSection}-${index}`], null, 2)
                                : String(executionResults[`${activeSection}-${index}`])
                              }
                            </pre>
                          </div>
                        ) : (
                          <div className="text-gray-500 text-center py-8">
                            Click &quot;Run Code&quot; to see the output
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaScriptPage;
