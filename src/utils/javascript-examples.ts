// ===== JAVASCRIPT FUNDAMENTALS EXAMPLES =====

// 1. VARIABLES AND DATA TYPES
export const variableExamples = {
  // Primitive types
  stringExample: "Hello, World!",
  numberExample: 42,
  booleanExample: true,
  nullExample: null,
  undefinedExample: undefined,
  symbolExample: Symbol('unique'),
  bigintExample: BigInt(9007199254740991),

  // Variable declarations
  varExample: function() {
    var x = 1;
    if (true) {
      var x = 2; // Same variable
      console.log(x); // 2
    }
    console.log(x); // 2
  },

  letExample: function() {
    let y = 1;
    if (true) {
      let y = 2; // Different variable
      console.log(y); // 2
    }
    console.log(y); // 1
  },

  constExample: function() {
    const z = 1;
    // z = 2; // This would throw an error
    return z;
  }
};

// 2. FUNCTIONS - Different ways to declare
export const functionExamples = {
  // Function declaration (hoisted)
  functionDeclaration: function namedFunction(a: number, b: number): number {
    return a + b;
  },

  // Function expression
  functionExpression: function(a: number, b: number): number {
    return a * b;
  },

  // Arrow function
  arrowFunction: (a: number, b: number): number => a - b,

  // Arrow function with block body
  arrowFunctionBlock: (a: number, b: number): number => {
    const result = a / b;
    return result;
  },

  // Higher-order function
  higherOrderFunction: (fn: (x: number) => number) => (x: number) => fn(x * 2),

  // Function with default parameters
  defaultParameters: (name: string = "World", greeting: string = "Hello") => 
    `${greeting}, ${name}!`,

  // Rest parameters
  restParameters: (...numbers: number[]): number => 
    numbers.reduce((sum, num) => sum + num, 0),

  // Function with destructured parameters
  destructuredParams: ({ name, age }: { name: string; age: number }) => 
    `${name} is ${age} years old`
};

// 3. ES6+ FEATURES
export const es6Examples = {
  // Template literals
  templateLiterals: (name: string, age: number) => 
    `My name is ${name} and I am ${age} years old`,

  // Destructuring assignment
  arrayDestructuring: () => {
    const [first, second, ...rest] = [1, 2, 3, 4, 5];
    return { first, second, rest };
  },

  objectDestructuring: () => {
    const person = { name: "John", age: 30, city: "New York" };
    const { name, age, city } = person;
    return { name, age, city };
  },

  // Spread operator
  spreadArray: () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    return [...arr1, ...arr2];
  },

  spreadObject: () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    return { ...obj1, ...obj2 };
  },

  // For...of loop
  forOfLoop: () => {
    const result = [];
    for (const value of [1, 2, 3, 4, 5]) {
      result.push(value * 2);
    }
    return result;
  },

  // Map and Set
  mapExample: () => {
    const map = new Map();
    map.set('key1', 'value1');
    map.set('key2', 'value2');
    return Array.from(map.entries());
  },

  setExample: () => {
    const set = new Set([1, 2, 2, 3, 3, 4]);
    return Array.from(set);
  }
};

// 4. ASYNC/AWAIT AND PROMISES
export const asyncExamples = {
  // Promise creation
  createPromise: (delay: number): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Promise resolved after ${delay}ms`);
      }, delay);
    });
  },

  // Promise chaining
  promiseChaining: async () => {
    return Promise.resolve(1)
      .then(x => x + 1)
      .then(x => x * 2)
      .then(x => x.toString());
  },

  // Async/await
  asyncFunction: async (delay: number = 1000): Promise<string> => {
    try {
      const result = await asyncExamples.createPromise(delay);
      return `Async result: ${result}`;
    } catch (error) {
      return `Error: ${error}`;
    }
  },

  // Promise.all
  promiseAll: async (): Promise<string[]> => {
    const promises = [
      asyncExamples.createPromise(100),
      asyncExamples.createPromise(200),
      asyncExamples.createPromise(150)
    ];
    return Promise.all(promises);
  },

  // Promise.race
  promiseRace: async (): Promise<string> => {
    const promises = [
      asyncExamples.createPromise(100),
      asyncExamples.createPromise(200),
      asyncExamples.createPromise(150)
    ];
    return Promise.race(promises);
  }
};

// 5. ARRAY METHODS
export const arrayMethods = {
  sourceArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

  // Map - transform each element
  mapExample: (arr: number[] = arrayMethods.sourceArray) => 
    arr.map(x => x * 2),

  // Filter - select elements that meet condition
  filterExample: (arr: number[] = arrayMethods.sourceArray) => 
    arr.filter(x => x % 2 === 0),

  // Reduce - accumulate to single value
  reduceExample: (arr: number[] = arrayMethods.sourceArray) => 
    arr.reduce((sum, current) => sum + current, 0),

  // Find - first element that meets condition
  findExample: (arr: number[] = arrayMethods.sourceArray) => 
    arr.find(x => x > 5),

  // Some - check if any element meets condition
  someExample: (arr: number[] = arrayMethods.sourceArray) => 
    arr.some(x => x > 8),

  // Every - check if all elements meet condition
  everyExample: (arr: number[] = arrayMethods.sourceArray) => 
    arr.every(x => x > 0),

  // Sort - sort elements
  sortExample: (arr: number[] = [...arrayMethods.sourceArray]) => 
    arr.sort((a, b) => b - a), // Descending order

  // ForEach - execute function for each element
  forEachExample: (arr: number[] = arrayMethods.sourceArray) => {
    const result: string[] = [];
    arr.forEach((value, index) => {
      result.push(`Index ${index}: ${value}`);
    });
    return result;
  },

  // Chaining methods
  chainExample: (arr: number[] = arrayMethods.sourceArray) => 
    arr
      .filter(x => x % 2 === 0)
      .map(x => x * 3)
      .reduce((sum, current) => sum + current, 0)
};

// 6. OBJECT METHODS AND MANIPULATION
export const objectMethods = {
  sampleObject: {
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    hobbies: ["reading", "coding", "gaming"]
  },

  // Object.keys
  getKeys: (obj = objectMethods.sampleObject) => Object.keys(obj),

  // Object.values
  getValues: (obj = objectMethods.sampleObject) => Object.values(obj),

  // Object.entries
  getEntries: (obj = objectMethods.sampleObject) => Object.entries(obj),

  // Object.assign
  objectAssign: () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    return Object.assign(target, source);
  },

  // Object destructuring with renaming
  destructureWithRename: () => {
    const { name: fullName, age: yearsOld } = objectMethods.sampleObject;
    return { fullName, yearsOld };
  },

  // Computed property names
  computedPropertyNames: (key: string, value: any) => ({
    [key]: value,
    [`${key}_computed`]: `computed_${value}`
  })
};

// 7. ERROR HANDLING
export const errorHandling = {
  // Try-catch
  tryCatchExample: (shouldThrow: boolean = false) => {
    try {
      if (shouldThrow) {
        throw new Error("This is a custom error");
      }
      return "Success!";
    } catch (error) {
      return `Caught error: ${error instanceof Error ? error.message : error}`;
    } finally {
      console.log("This always runs");
    }
  },

  // Custom error class
  CustomError: class extends Error {
    constructor(message: string) {
      super(message);
      this.name = "CustomError";
    }
  },

  // Async error handling
  asyncErrorHandling: async (shouldFail: boolean = false): Promise<string> => {
    try {
      if (shouldFail) {
        throw new errorHandling.CustomError("Async operation failed");
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      return "Async success!";
    } catch (error) {
      return `Async error: ${error instanceof Error ? error.message : error}`;
    }
  }
};

// 8. CLOSURES
export const closureExamples = {
  // Basic closure
  createCounter: () => {
    let count = 0;
    return () => ++count;
  },

  // Closure with parameters
  createMultiplier: (multiplier: number) => {
    return (value: number) => value * multiplier;
  },

  // Module pattern using closure
  createModule: () => {
    let privateVariable = 0;
    
    return {
      increment: () => ++privateVariable,
      decrement: () => --privateVariable,
      getValue: () => privateVariable
    };
  },

  // Function factory
  createGreeter: (greeting: string) => {
    return (name: string) => `${greeting}, ${name}!`;
  }
};

// 9. PROTOTYPE AND CLASSES
export const prototypeExamples = {
  // Constructor function
  PersonConstructor: function(this: any, name: string, age: number) {
    this.name = name;
    this.age = age;
  },

  // Adding method to prototype
  addMethodToPrototype: () => {
    (prototypeExamples.PersonConstructor as any).prototype.introduce = function() {
      return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
    };
  },

  // ES6 Class
  PersonClass: class {
    constructor(public name: string, public age: number) {}

    introduce(): string {
      return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
    }

    static createAdult(name: string): InstanceType<typeof prototypeExamples.PersonClass> {
      return new prototypeExamples.PersonClass(name, 18);
    }
  },

  // Class inheritance
  StudentClass: class extends prototypeExamples.PersonClass {
    constructor(name: string, age: number, public grade: string) {
      super(name, age);
    }

    introduce(): string {
      return `${super.introduce()} I'm in grade ${this.grade}`;
    }
  }
};

// 10. REGULAR EXPRESSIONS
export const regexExamples = {
  // Email validation
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  validateEmail: (email: string): boolean => 
    regexExamples.emailRegex.test(email),

  // Phone number extraction
  phoneRegex: /\b\d{3}-\d{3}-\d{4}\b/g,
  
  extractPhoneNumbers: (text: string): string[] => 
    text.match(regexExamples.phoneRegex) || [],

  // Replace with regex
  cleanText: (text: string): string => 
    text.replace(/[^a-zA-Z0-9\s]/g, '').trim(),

  // Named capture groups
  parseDate: (dateString: string) => {
    const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    return regex.exec(dateString)?.groups;
  }
};

// Export all examples grouped
export const allJavaScriptExamples = {
  variables: variableExamples,
  functions: functionExamples,
  es6: es6Examples,
  async: asyncExamples,
  arrays: arrayMethods,
  objects: objectMethods,
  errors: errorHandling,
  closures: closureExamples,
  prototypes: prototypeExamples,
  regex: regexExamples
};
