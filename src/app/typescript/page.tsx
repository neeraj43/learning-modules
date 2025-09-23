'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, FileCode, Zap, Settings, BookOpen, Terminal, HelpCircle, X } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'
import BeginnerGuide from '@/components/beginner/BeginnerGuide'
import CodeRunner from '@/components/interactive/CodeRunner'
import HelpCenter from '@/components/beginner/HelpCenter'

const TypeScriptPage = () => {
    const [activeSection, setActiveSection] = useState('basics')
    const [showBeginnerGuide, setShowBeginnerGuide] = useState(true)
    const [showHelpCenter, setShowHelpCenter] = useState(false)

    // Beginner guide steps for TypeScript
    const beginnerSteps = [
        {
            title: "What is TypeScript?",
            description: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. Think of it as JavaScript with superpowers - it adds static type definitions to help catch errors early!",
            tip: "TypeScript compiles to plain JavaScript, so it runs anywhere JavaScript runs - browsers, Node.js, mobile apps!",
            tryIt: "Don't worry about complex syntax yet - focus on understanding how types make your code more reliable!"
        },
        {
            title: "Why Use TypeScript?",
            description: "TypeScript helps you catch bugs before they reach production! It provides autocomplete, refactoring support, and makes your code self-documenting. Large companies like Microsoft, Google, and Airbnb use TypeScript for better developer experience.",
            code: `// JavaScript (prone to runtime errors)
function greet(name) {
    return "Hello " + name.toUppercase(); // typo! 
}

// TypeScript (catches errors at compile time)
function greet(name: string): string {
    return "Hello " + name.toUpperCase(); // ✅ autocomplete works!
}`,
            tip: "TypeScript = JavaScript + Types. You get all JavaScript features plus type safety!",
            tryIt: "Try our interactive examples below - they're designed to show you TypeScript in action!"
        },
        {
            title: "Types - Your Safety Net",
            description: "Types tell TypeScript what kind of data you're working with. It's like having a smart assistant that prevents you from passing a number where you need a string, or calling a method that doesn't exist.",
            code: `// Basic types
let message: string = "Hello TypeScript!";
let count: number = 42;
let isActive: boolean = true;
let numbers: number[] = [1, 2, 3, 4, 5];

// TypeScript prevents mistakes
// message = 123; // ❌ Error: Type 'number' is not assignable to type 'string'`,
            tip: "Types are optional but recommended. Start simple and add more types as you learn!",
            tryIt: "Practice with basic types first - they're the foundation of everything else!"
        },
        {
            title: "Interfaces - Blueprints for Objects",
            description: "Interfaces define the shape of objects - what properties they have and what types those properties should be. Think of them as contracts that your objects must follow.",
            code: `// Interface defines the structure
interface User {
    name: string;
    age: number;
    email?: string; // ? makes it optional
}

// Objects must match the interface
const user: User = {
    name: "Alice",
    age: 30,
    email: "alice@example.com"
};`,
            tip: "Interfaces are like blueprints - they describe what an object should look like without creating the actual object.",
            tryIt: "Interfaces make your code predictable and self-documenting. Try creating your own!"
        },
        {
            title: "From JavaScript to TypeScript",
            description: "You can gradually adopt TypeScript! Start by renaming .js files to .ts, then slowly add types. TypeScript is designed to work with existing JavaScript codebases without major rewrites.",
            code: `// JavaScript function
function calculateArea(width, height) {
    return width * height;
}

// Add TypeScript types gradually
function calculateArea(width: number, height: number): number {
    return width * height;
}`,
            tip: "Migration strategy: Start with any types, then gradually make them more specific as you learn.",
            tryIt: "Remember: Any valid JavaScript is valid TypeScript! You can start learning today."
        }
    ]

    const sections = [
        { id: 'basics', name: 'TypeScript Basics', icon: '📚' },
        { id: 'intermediate', name: 'Intermediate Types', icon: '🔧' },
        { id: 'expert', name: 'Expert Patterns', icon: '🚀' },
        { id: 'react-ts', name: 'React + TypeScript', icon: '⚛️' },
        { id: 'node-ts', name: 'Node.js + TypeScript', icon: '🌐' },
        { id: 'tooling', name: 'Tooling & Config', icon: '⚙️' },
        { id: 'projects', name: 'Real Projects', icon: '💼' }
    ]

    const codeExamples = {
        basics: [
            {
                title: 'TypeScript Fundamentals - Interactive Demo',
                description: '📚 Learn TypeScript basics through hands-on examples that run in your browser!',
                code: `// 📚 TypeScript Fundamentals - Interactive Demo
console.log("=== 🚀 TYPESCRIPT BASICS DEMO ===");
console.log("");

// 1. BASIC TYPES
console.log("1️⃣ BASIC TYPES");
let message = "Hello TypeScript!";  // string
let count = 42;                     // number  
let isActive = true;                // boolean
let numbers = [1, 2, 3, 4, 5];      // number[]

console.log("Message:", message);
console.log("Count:", count);
console.log("Is Active:", isActive);
console.log("Numbers:", numbers);
console.log("");

// 2. FUNCTIONS WITH TYPES
console.log("2️⃣ FUNCTIONS WITH TYPES");
function greet(name, age) {
    return \`Hello \${name}, you are \${age} years old!\`;
}

function calculateArea(width, height) {
    return width * height;
}

console.log(greet("Alice", 25));
console.log("Area of 5x3 rectangle:", calculateArea(5, 3));
console.log("");

// 3. OBJECTS AND INTERFACES (simulated)
console.log("3️⃣ OBJECTS AND INTERFACES");
// In TypeScript, we'd define: interface User { name: string; age: number; email?: string; }
const user = {
    name: "Bob",
    age: 30,
    email: "bob@example.com"
};

const product = {
    id: 1,
    title: "TypeScript Book",
    price: 29.99,
    inStock: true
};

console.log("User:", user);
console.log("Product:", product);
console.log("");

// 4. ARRAYS AND COLLECTIONS
console.log("4️⃣ ARRAYS AND COLLECTIONS");
const fruits = ["apple", "banana", "orange"];
const scores = [95, 87, 92, 78, 96];
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

console.log("Fruits:", fruits);
console.log("Average score:", scores.reduce((a, b) => a + b) / scores.length);
console.log("Users:", users.map(u => u.name).join(", "));
console.log("");

// 5. TYPE SAFETY EXAMPLES
console.log("5️⃣ TYPE SAFETY BENEFITS");
console.log("✅ TypeScript would catch these errors at compile time:");
console.log("- Typos in method names");
console.log("- Wrong parameter types"); 
console.log("- Missing object properties");
console.log("- Null/undefined access");
console.log("");

console.log("🎉 TypeScript makes JavaScript development safer and more productive!");
console.log("💡 Try the code editor examples below to see TypeScript in action!");`
            },
            {
                title: 'Basic Types and Variables',
                description: 'Understanding TypeScript\'s fundamental types and how to use them effectively.',
                code: `// Basic Types in TypeScript
// Primitive types
let message: string = "Hello, TypeScript!";
let count: number = 42;
let isComplete: boolean = true;
let value: null = null;
let data: undefined = undefined;

// Array types
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let flags: boolean[] = [true, false, true];

// Alternative array syntax
let scores: Array<number> = [95, 87, 92];
let colors: Array<string> = ["red", "green", "blue"];

// Tuple types (fixed length arrays with specific types)
let coordinates: [number, number] = [10, 20];
let person: [string, number, boolean] = ["Alice", 25, true];

// Any type (avoid when possible)
let anything: any = "could be anything";
anything = 42;
anything = true;

// Unknown type (safer than any)
let userInput: unknown = "some input";
// Must check type before using
if (typeof userInput === "string") {
    console.log(userInput.toUpperCase());
}

// Void type (for functions that don't return anything)
function logMessage(msg: string): void {
    console.log(msg);
}

// Never type (for functions that never return)
function throwError(message: string): never {
    throw new Error(message);
}

// Union types (multiple possible types)
let id: string | number = "abc123";
id = 12345; // Also valid

// Type aliases
type Status = "pending" | "approved" | "rejected";
let currentStatus: Status = "pending";

// Examples
console.log("=== BASIC TYPES EXAMPLES ===");
console.log("Message:", message);
console.log("Count:", count);
console.log("Numbers:", numbers);
console.log("Coordinates:", coordinates);
console.log("Current status:", currentStatus);`
            },
            {
                title: 'Functions and Parameters',
                description: 'Learn how to type functions, parameters, and return values in TypeScript.',
                code: `// Function Types in TypeScript

// Basic function with typed parameters and return type
function add(a: number, b: number): number {
    return a + b;
}

// Function with optional parameters
function greet(name: string, title?: string): string {
    if (title) {
        return \`Hello, \${title} \${name}!\`;
    }
    return \`Hello, \${name}!\`;
}

// Function with default parameters
function createUser(name: string, age: number = 18): object {
    return { name, age };
}

// Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

// Function overloads
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;
function format(value: string | number | boolean): string {
    return String(value);
}

// Arrow functions
const multiply = (x: number, y: number): number => x * y;
const isEven = (num: number): boolean => num % 2 === 0;

// Function type annotations
type MathOperation = (x: number, y: number) => number;
const divide: MathOperation = (x, y) => x / y;

// Callback functions
function processArray(
    items: number[], 
    callback: (item: number) => number
): number[] {
    return items.map(callback);
}

// Generic functions
function identity<T>(arg: T): T {
    return arg;
}

// Higher-order functions
function createMultiplier(factor: number): (num: number) => number {
    return (num: number) => num * factor;
}

// Examples
console.log("=== FUNCTION EXAMPLES ===");
console.log("Add 5 + 3 =", add(5, 3));
console.log(greet("Alice"));
console.log(greet("Bob", "Dr."));
console.log("Sum of 1,2,3,4,5 =", sum(1, 2, 3, 4, 5));
console.log("Multiply 6 * 7 =", multiply(6, 7));

const doubleNumber = createMultiplier(2);
console.log("Double 5 =", doubleNumber(5));

const doubled = processArray([1, 2, 3, 4, 5], x => x * 2);
console.log("Doubled array:", doubled);`
            }
        ],
        intermediate: [
            {
                title: 'Interfaces and Object Types',
                description: 'Master interfaces, object types, and advanced type definitions for complex data structures.',
                code: `// Interfaces and Object Types in TypeScript

// Basic interface
interface User {
    readonly id: number;        // readonly property
    name: string;
    email: string;
    age?: number;              // optional property
}

// Interface with methods
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

// Interface inheritance
interface AdminUser extends User {
    permissions: string[];
    lastLogin: Date;
}

// Interface with index signatures
interface StringDictionary {
    [key: string]: string;
}

// Interface with call signatures
interface Greeter {
    (name: string): string;
}

// Interface with construct signatures
interface ClockConstructor {
    new (hour: number, minute: number): Clock;
}

interface Clock {
    currentTime: Date;
    setTime(d: Date): void;
}

// Implementing interfaces
class BasicCalculator implements Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
    
    subtract(a: number, b: number): number {
        return a - b;
    }
}

// Object type literals
type Point = {
    x: number;
    y: number;
};

type Rectangle = {
    topLeft: Point;
    bottomRight: Point;
};

// Intersection types
type Timestamped = {
    timestamp: Date;
};

type TaggedUser = User & Timestamped & {
    tags: string[];
};

// Union types with objects
type Shape = 
    | { kind: "circle"; radius: number }
    | { kind: "rectangle"; width: number; height: number }
    | { kind: "triangle"; base: number; height: number };

// Type guards
function isCircle(shape: Shape): shape is { kind: "circle"; radius: number } {
    return shape.kind === "circle";
}

// Mapped types
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Required<T> = {
    [P in keyof T]-?: T[P];
};

// Examples
console.log("=== INTERFACE EXAMPLES ===");

const user: User = {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28
};

const admin: AdminUser = {
    id: 2,
    name: "Bob Admin",
    email: "bob@admin.com",
    permissions: ["read", "write", "delete"],
    lastLogin: new Date()
};

const calc = new BasicCalculator();
console.log("User:", user);
console.log("Admin permissions:", admin.permissions);
console.log("5 + 3 =", calc.add(5, 3));

// Shape discrimination
function calculateArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "triangle":
            return (shape.base * shape.height) / 2;
    }
}

const circle: Shape = { kind: "circle", radius: 5 };
console.log("Circle area:", calculateArea(circle));`
            },
            {
                title: 'Generics and Advanced Types',
                description: 'Understand generics, utility types, and advanced type manipulation techniques.',
                code: `// Generics and Advanced Types in TypeScript

// Basic Generic Function
function identity<T>(arg: T): T {
    return arg;
}

// Generic with constraints
interface Lengthwise {
    length: number;
}

function logAndReturn<T extends Lengthwise>(arg: T): T {
    console.log(\`Length: \${arg.length}\`);
    return arg;
}

// Generic Classes
class GenericStorage<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    get(index: number): T | undefined {
        return this.items[index];
    }
    
    getAll(): T[] {
        return [...this.items];
    }
}

// Generic Interfaces
interface Repository<T> {
    findById(id: string): Promise<T | null>;
    save(entity: T): Promise<T>;
    delete(id: string): Promise<boolean>;
}

// Multiple Type Parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

// Conditional Types
type IsArray<T> = T extends any[] ? true : false;
type StringArray = IsArray<string[]>;  // true
type NumberType = IsArray<number>;     // false

// Mapped Types
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Optional<T> = {
    [P in keyof T]?: T[P];
};

// Utility Types
interface Todo {
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}

// Partial - makes all properties optional
type PartialTodo = Partial<Todo>;

// Pick - selects specific properties
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit - excludes specific properties
type TodoCreation = Omit<Todo, "createdAt">;

// Record - creates object type with specific keys and values
type StatusRecord = Record<"pending" | "approved" | "rejected", number>;

// Keyof operator
type TodoKeys = keyof Todo;  // "title" | "description" | "completed" | "createdAt"

// Template Literal Types
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = \`/api/\${string}\`;
type APICall = \`\${HTTPMethod} \${Endpoint}\`;

// Infer keyword
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type GetArrayType<T> = T extends (infer U)[] ? U : never;

// Examples
console.log("=== GENERICS EXAMPLES ===");

// Using generic functions
const numberResult = identity<number>(42);
const stringResult = identity<string>("Hello");
console.log("Number result:", numberResult);
console.log("String result:", stringResult);

// Using generic storage
const numberStorage = new GenericStorage<number>();
const stringStorage = new GenericStorage<string>();

numberStorage.add(1);
numberStorage.add(2);
numberStorage.add(3);

stringStorage.add("hello");
stringStorage.add("world");

console.log("Number storage:", numberStorage.getAll());
console.log("String storage:", stringStorage.getAll());

// Using merge function
const person = { name: "Alice", age: 30 };
const job = { title: "Developer", company: "TechCorp" };
const employee = merge(person, job);
console.log("Merged employee:", employee);

// Using utility types
const todoUpdate: PartialTodo = {
    completed: true
    // other properties are optional
};

const todoPreview: TodoPreview = {
    title: "Learn TypeScript",
    completed: false
};

console.log("Todo update:", todoUpdate);
console.log("Todo preview:", todoPreview);`
            }
        ],
        expert: [
            {
                title: 'Advanced Type Patterns and Conditional Types',
                description: 'Master complex type patterns, conditional types, and advanced TypeScript techniques.',
                code: `// Advanced Type Patterns in TypeScript

// Conditional Types with Distribution
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;

type NumberOrString = string | number | boolean;
type OnlyStringOrNumber = Exclude<NumberOrString, boolean>; // string | number

// Template Literal Types
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ButtonEvents = EventName<"click" | "hover" | "focus">; // "onClick" | "onHover" | "onFocus"

// Recursive Types
type JSONValue = 
    | string 
    | number 
    | boolean 
    | null 
    | JSONObject 
    | JSONArray;

interface JSONObject {
    [key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

// Advanced Mapped Types
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Key Remapping in Mapped Types
type Getters<T> = {
    [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

// Variadic Tuple Types
type Head<T extends readonly any[]> = T extends readonly [any, ...any[]] ? T[0] : never;
type Tail<T extends readonly any[]> = T extends readonly [any, ...infer U] ? U : [];

// Function Overloading with Conditional Types
type OverloadedFunction = {
    (value: string): string;
    (value: number): number;
    (value: boolean): boolean;
};

// Brand Types (Nominal Typing)
type Brand<T, B> = T & { __brand: B };
type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

function getUserById(id: UserId): void {
    console.log(\`Getting user: \${id}\`);
}

// Type-level Programming
type Length<T extends readonly any[]> = T['length'];
type Push<T extends readonly any[], U> = [...T, U];
type Pop<T extends readonly any[]> = T extends readonly [...infer Rest, any] ? Rest : [];

// Parser Combinator Types
type ParseInt<T extends string> = 
    T extends \`\${infer N extends number}\` ? N : never;

type Add<A extends number, B extends number> = 
    [...Array<A>, ...Array<B>]['length'] extends number ? 
    [...Array<A>, ...Array<B>]['length'] : never;

// Higher-Kinded Types Simulation
interface Functor<F> {
    map<A, B>(fa: F, f: (a: A) => B): F;
}

interface Monad<M> extends Functor<M> {
    of<A>(value: A): M;
    flatMap<A, B>(ma: M, f: (a: A) => M): M;
}

// Type-safe Event System
type EventMap = {
    'user:created': { userId: string; name: string };
    'user:updated': { userId: string; changes: Partial<{ name: string; email: string }> };
    'user:deleted': { userId: string };
};

class TypedEventEmitter {
    private listeners: {
        [K in keyof EventMap]?: Array<(data: EventMap[K]) => void>;
    } = {};
    
    on<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(listener);
    }
    
    emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            eventListeners.forEach(listener => listener(data));
        }
    }
}

// Examples
console.log("=== ADVANCED TYPE PATTERNS EXAMPLES ===");

// Using recursive types
const jsonData: JSONValue = {
    name: "Alice",
    age: 30,
    hobbies: ["reading", "coding"],
    address: {
        street: "123 Main St",
        city: "Boston",
        coordinates: [42.3601, -71.0589]
    }
};

console.log("JSON data:", jsonData);

// Using branded types
const userId = "user_123" as UserId;
const productId = "prod_456" as ProductId;

getUserById(userId);
// getUserById(productId); // ❌ Type error - ProductId is not assignable to UserId

// Using typed event emitter
const emitter = new TypedEventEmitter();

emitter.on('user:created', (data) => {
    console.log(\`User created: \${data.name} with ID \${data.userId}\`);
});

emitter.emit('user:created', {
    userId: 'user_789',
    name: 'Bob Johnson'
});

// Demonstrating type-level computation
type Example1 = Length<[1, 2, 3, 4]>; // 4
type Example2 = Push<[1, 2, 3], 4>;   // [1, 2, 3, 4]
type Example3 = Pop<[1, 2, 3, 4]>;    // [1, 2, 3]

console.log("Type-level computation examples completed!");`
            }
        ],
        'react-ts': [
            {
                title: 'React with TypeScript - Components and Props',
                description: 'Learn how to build type-safe React components with TypeScript.',
                code: `// React with TypeScript - Components and Props

import React, { useState, useEffect, ReactNode, ComponentProps } from 'react';

// Basic Functional Component with Props
interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    disabled = false,
    size = 'medium'
}) => {
    const baseClasses = 'px-4 py-2 rounded font-medium';
    const variantClasses = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600'
    };
    const sizeClasses = {
        small: 'text-sm px-2 py-1',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-6 py-3'
    };
    
    return (
        <button
            className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

// Component with Generic Props
interface ListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    keyExtractor: (item: T) => string | number;
    emptyMessage?: string;
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage = "No items" }: ListProps<T>) {
    if (items.length === 0) {
        return <div className="text-gray-500">{emptyMessage}</div>;
    }
    
    return (
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={keyExtractor(item)}>
                    {renderItem(item, index)}
                </li>
            ))}
        </ul>
    );
}

// Component with State and Effects
interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

interface UserProfileProps {
    userId: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Simulated API call
                const response = await new Promise<User>((resolve, reject) => {
                    setTimeout(() => {
                        if (Math.random() > 0.1) {
                            resolve({
                                id: userId,
                                name: \`User \${userId}\`,
                                email: \`user\${userId}@example.com\`,
                                avatar: \`https://avatar.placeholder.com/\${userId}\`
                            });
                        } else {
                            reject(new Error('Failed to fetch user'));
                        }
                    }, 1000);
                });
                
                setUser(response);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, [userId]);
    
    if (loading) return <div>Loading user...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!user) return <div>User not found</div>;
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
                <img 
                    src={user.avatar} 
                    alt={\`\${user.name}'s avatar\`}
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>
        </div>
    );
};

// Form Component with Controlled Inputs
interface FormData {
    name: string;
    email: string;
    age: number;
    subscribe: boolean;
}

interface ContactFormProps {
    onSubmit: (data: FormData) => void;
    initialData?: Partial<FormData>;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState<FormData>({
        name: initialData.name || '',
        email: initialData.email || '',
        age: initialData.age || 0,
        subscribe: initialData.subscribe || false
    });
    
    const handleInputChange = (field: keyof FormData) => 
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.type === 'checkbox' 
                ? event.target.checked 
                : event.target.type === 'number'
                ? parseInt(event.target.value) || 0
                : event.target.value;
            
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange('age')}
                    className="w-full border rounded px-3 py-2"
                    min="0"
                    max="120"
                />
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={formData.subscribe}
                    onChange={handleInputChange('subscribe')}
                    className="mr-2"
                />
                <label className="text-sm">Subscribe to newsletter</label>
            </div>
            <Button type="submit" variant="primary">
                Submit
            </Button>
        </form>
    );
};

// Higher-Order Component (HOC) with TypeScript
function withLoading<P extends object>(Component: React.ComponentType<P>) {
    return function WithLoadingComponent(props: P & { isLoading: boolean }) {
        const { isLoading, ...restProps } = props;
        
        if (isLoading) {
            return <div className="animate-spin">Loading...</div>;
        }
        
        return <Component {...(restProps as P)} />;
    };
}

// Usage Examples
const App: React.FC = () => {
    const [users] = useState<User[]>([
        { id: 1, name: "Alice Johnson", email: "alice@example.com", avatar: "avatar1.jpg" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", avatar: "avatar2.jpg" }
    ]);
    
    const handleFormSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
    };
    
    const handleButtonClick = () => {
        console.log('Button clicked!');
    };
    
    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl font-bold">React TypeScript Examples</h1>
            
            <section>
                <h2 className="text-xl font-semibold mb-4">Buttons</h2>
                <div className="space-x-2">
                    <Button onClick={handleButtonClick} variant="primary">
                        Primary Button
                    </Button>
                    <Button onClick={handleButtonClick} variant="secondary" size="large">
                        Large Secondary
                    </Button>
                    <Button onClick={handleButtonClick} variant="danger" disabled>
                        Disabled Danger
                    </Button>
                </div>
            </section>
            
            <section>
                <h2 className="text-xl font-semibold mb-4">User List</h2>
                <List
                    items={users}
                    renderItem={(user) => (
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-gray-600">({user.email})</span>
                        </div>
                    )}
                    keyExtractor={(user) => user.id}
                />
            </section>
            
            <section>
                <h2 className="text-xl font-semibold mb-4">User Profile</h2>
                <UserProfile userId={1} />
            </section>
            
            <section>
                <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
                <ContactForm onSubmit={handleFormSubmit} />
            </section>
        </div>
    );
};

export default App;`
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
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{example.title}</h3>
                            <p className="text-gray-600">{example.description}</p>
                        </div>
                        {index === 0 && activeSection === 'basics' ? (
                            <CodeRunner
                                code={example.code}
                                language="javascript"
                                title={example.title}
                                description="🚀 Learn TypeScript fundamentals through interactive examples!"
                                expectedOutput={[
                                    "=== 🚀 TYPESCRIPT BASICS DEMO ===",
                                    "1️⃣ BASIC TYPES",
                                    "Message: Hello TypeScript!",
                                    "Count: 42"
                                ]}
                                hints={[
                                    "TypeScript adds types to JavaScript for better error catching",
                                    "Try changing the values and see how types provide safety",
                                    "Notice how TypeScript prevents runtime errors at compile time",
                                    "Start with basic types and gradually add more complex ones!"
                                ]}
                            />
                        ) : (
                            <CodeEditor
                                initialCode={example.code}
                                title={example.title}
                                height="500px"
                            />
                        )}
                    </motion.div>
                )) || (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Content for this section is being prepared...</p>
                        </div>
                    )}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        TypeScript Mastery 📘
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Learn TypeScript from basics to expert level with hands-on examples, real-world projects, and best practices for type-safe development
                    </p>
                </motion.div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {sections.map((section) => (
                        <motion.button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeSection === section.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-blue-200'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="mr-2">{section.icon}</span>
                            {section.name}
                        </motion.button>
                    ))}
                </div>

                {/* Beginner Guide */}
                {activeSection === 'basics' && showBeginnerGuide && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">🎯 New to TypeScript? Start Here!</h3>
                            <button
                                onClick={() => setShowBeginnerGuide(false)}
                                className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                                Hide Guide
                            </button>
                        </div>
                        <BeginnerGuide
                            topic="TypeScript Fundamentals"
                            steps={beginnerSteps}
                            nextTopics={["Intermediate Types", "React + TypeScript", "Node.js + TypeScript"]}
                        />
                    </motion.div>
                )}

                {/* Show beginner guide toggle */}
                {activeSection === 'basics' && !showBeginnerGuide && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-8 text-center"
                    >
                        <button
                            onClick={() => setShowBeginnerGuide(true)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            📚 Show Beginner Guide
                        </button>
                    </motion.div>
                )}

                {/* Content */}
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {renderSection()}
                </motion.div>

                {/* Why Learn TypeScript */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white"
                >
                    <h2 className="text-3xl font-bold mb-6 text-center">Why Learn TypeScript? 🚀</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">🔒 Type Safety Benefits</h3>
                            <ul className="space-y-2">
                                <li>• Catch errors before runtime</li>
                                <li>• Better IntelliSense and autocomplete</li>
                                <li>• Safer refactoring</li>
                                <li>• Self-documenting code</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3">💼 Industry Adoption</h3>
                            <ul className="space-y-2">
                                <li>• Used by Microsoft, Google, Airbnb</li>
                                <li>• Default for Angular, optional for React</li>
                                <li>• Growing job market demand</li>
                                <li>• Large ecosystem support</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Help Center */}
                {showHelpCenter && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowHelpCenter(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-4xl max-h-[90vh] overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <button
                                    onClick={() => setShowHelpCenter(false)}
                                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <HelpCenter />
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Floating Help Button */}
                <motion.button
                    onClick={() => setShowHelpCenter(true)}
                    className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                >
                    <HelpCircle className="w-6 h-6" />
                </motion.button>
            </div>
        </div>
    )
}

export default TypeScriptPage
