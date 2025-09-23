'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Database, GitBranch, Layers, Zap, Terminal, Settings, HelpCircle, X } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'
import BeginnerGuide from '@/components/beginner/BeginnerGuide'
import CodeRunner from '@/components/interactive/CodeRunner'
import HelpCenter from '@/components/beginner/HelpCenter'

const CppPage = () => {
    const [activeSection, setActiveSection] = useState('fundamentals')
    const [showBeginnerGuide, setShowBeginnerGuide] = useState(true)
    const [showHelpCenter, setShowHelpCenter] = useState(false)

    // Beginner guide steps for C++ data structures
    const beginnerSteps = [
        {
            title: "What are Data Structures?",
            description: "Data structures are ways to organize and store data in a computer so it can be used efficiently. Think of them like different types of containers - each designed for specific purposes. Just like you use a bookshelf for books and a toolbox for tools!",
            tip: "Understanding data structures is like learning how to organize your room efficiently - it makes finding and using things much faster!",
            tryIt: "Don't worry about complex syntax yet - focus on understanding the concepts first!"
        },
        {
            title: "Why C++ for Data Structures?",
            description: "C++ is perfect for learning data structures because it gives you control over memory management and helps you understand how data is actually stored in computer memory. It's like learning to drive with a manual transmission - you understand the mechanics better!",
            code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, Data Structures World!" << endl;
    return 0;
}`,
            tip: "C++ might seem complex at first, but this control makes you a better programmer who understands how computers really work.",
            tryIt: "Try running our interactive examples below - they're designed to work in your browser!"
        },
        {
            title: "Arrays - Your First Data Structure",
            description: "Arrays are like a row of numbered boxes where you can store items. Each box has an address (index) starting from 0. It's the simplest way to store multiple items of the same type together.",
            code: `// Array - like numbered parking spots
int numbers[5] = {10, 20, 30, 40, 50};
cout << "First number: " << numbers[0] << endl;  // 10
cout << "Third number: " << numbers[2] << endl;  // 30`,
            tip: "Arrays are fast for accessing elements if you know the position, but slow for inserting/deleting in the middle.",
            tryIt: "Try changing the array values and accessing different positions!"
        },
        {
            title: "Understanding Memory and Pointers",
            description: "In C++, you need to understand that variables live in computer memory. Pointers are like addresses that tell you where to find data. Think of pointers like your home address - it tells others where to find your house!",
            code: `int age = 25;
int* agePtr = &age;  // Pointer storing address of age
cout << "Age value: " << age << endl;           // 25
cout << "Age address: " << agePtr << endl;      // Memory address  
cout << "Value at address: " << *agePtr << endl; // 25`,
            tip: "Pointers are crucial for dynamic data structures like linked lists and trees. Master this concept!",
            tryIt: "Pointers can be confusing at first - that's completely normal! Practice with simple examples."
        },
        {
            title: "Dynamic vs Static Data Structures",
            description: "Static structures (like arrays) have fixed sizes that can't change. Dynamic structures (like linked lists) can grow and shrink during program execution. It's like the difference between a fixed parking lot vs. a train that can add/remove cars!",
            code: `// Static Array - fixed size
int staticArray[5] = {1, 2, 3, 4, 5};

// Dynamic Array (vector in C++)
vector<int> dynamicArray;
dynamicArray.push_back(1);  // Add element
dynamicArray.push_back(2);  // Size grows automatically!`,
            tip: "Choose static for predictable, fixed-size data. Choose dynamic when size varies during runtime.",
            tryIt: "Think about when you'd use each type - making a grade book (fixed students) vs. a social media feed (growing posts)."
        }
    ]

    const sections = [
        { id: 'fundamentals', name: 'C++ Fundamentals', icon: '🔧' },
        { id: 'arrays', name: 'Arrays & Vectors', icon: '📊' },
        { id: 'linked-lists', name: 'Linked Lists', icon: '🔗' },
        { id: 'stacks-queues', name: 'Stacks & Queues', icon: '📚' },
        { id: 'stl', name: 'STL Data Structures', icon: '🛠️' },
        { id: 'trees', name: 'Trees & BST', icon: '🌳' },
        { id: 'hash-tables', name: 'Hash Tables', icon: '🗂️' },
        { id: 'algorithms', name: 'Algorithms', icon: '⚡' },
        { id: 'problems', name: 'Problem Solving', icon: '🎯' },
        { id: 'projects', name: 'Real-Life Projects', icon: '💼' }
    ]

    const codeExamples = {
        fundamentals: [
            {
                title: 'C++ Basics - Getting Started (Interactive Demo)',
                description: '🔥 Experience C++ concepts through executable JavaScript! Perfect introduction to C++ programming fundamentals.',
                code: `// 🔧 C++ Programming Concepts - Interactive Browser Demo
// Note: This is JavaScript simulating C++ concepts for learning!

// 🎯 TRY IT: Click "Run" to see C++ concepts in action!

console.log("=== 🚀 C++ FUNDAMENTALS DEMO ===");
console.log("");

// 1. HELLO WORLD - Your First C++ Program  
console.log("1. 👋 HELLO WORLD");
console.log("Hello, Data Structures World!");
console.log("Welcome to C++ Programming! 🔧");
console.log("");

// 2. VARIABLES AND DATA TYPES (C++-style)
console.log("2. 📊 VARIABLES AND DATA TYPES");
let age = 25;                    // int in C++
let height = 5.9;                // double in C++  
let grade = 'A';                 // char in C++
let isPassing = true;            // bool in C++
let name = "Alice";              // string in C++

console.log("Name: " + name);
console.log("Age: " + age);
console.log("Height: " + height + "ft");
console.log("Grade: " + grade);
console.log("Is Passing: " + isPassing);
console.log("");

// 3. BASIC ARRAY OPERATIONS
console.log("3. 📋 BASIC ARRAY OPERATIONS");
let numbers = [10, 20, 30, 40, 50];  // C++ array equivalent

console.log("Array contents: [" + numbers.join(", ") + "]");
console.log("First element (index 0): " + numbers[0]);
console.log("Last element: " + numbers[numbers.length - 1]);
console.log("Array size: " + numbers.length);
console.log("");

// 4. LOOPS AND ARRAYS
console.log("4. 🔄 LOOPS AND ARRAYS");
console.log("Printing all elements:");
for (let i = 0; i < numbers.length; i++) {
    console.log("Element at index " + i + ": " + numbers[i]);
}

console.log("");
console.log("🎉 Congratulations! You've learned C++ fundamentals!");
console.log("💡 TIP: Try modifying values and run again!");
console.log("🚀 Ready for data structures? Check out the other sections!");`
            },
            {
                title: 'Pointers and Memory Management',
                description: 'Understanding pointers and memory - the foundation of all data structures in C++',
                code: `// Pointers and Memory Management in C++
#include <iostream>
using namespace std;

int main() {
    // Basic pointer concepts
    int value = 42;
    int* ptr = &value;  // Pointer to value
    
    cout << "=== POINTER BASICS ===" << endl;
    cout << "Value: " << value << endl;
    cout << "Address of value: " << &value << endl;
    cout << "Pointer stores: " << ptr << endl;
    cout << "Value through pointer: " << *ptr << endl;
    
    // Dynamic memory allocation
    cout << "\n=== DYNAMIC MEMORY ===" << endl;
    int* dynamicPtr = new int(100);  // Allocate memory on heap
    cout << "Dynamic value: " << *dynamicPtr << endl;
    
    // Array of pointers
    int* arr = new int[5]{1, 2, 3, 4, 5};
    cout << "\nDynamic array:" << endl;
    for (int i = 0; i < 5; i++) {
        cout << "arr[" << i << "] = " << arr[i] << endl;
    }
    
    // Clean up memory
    delete dynamicPtr;
    delete[] arr;
    cout << "\nMemory cleaned up!" << endl;
    
    return 0;
}`
            }
        ],
        arrays: [
            {
                title: 'Array Operations - Interactive Demo',
                description: '📊 Learn array operations through hands-on examples that run in your browser!',
                code: `// 📊 Array Operations - Interactive Demo
console.log("=== 🎯 ARRAY OPERATIONS DEMO ===");
console.log("");

// 1. CREATING AND INITIALIZING ARRAYS
console.log("1. 📋 CREATING ARRAYS");
let grades = [85, 92, 78, 96, 88];
let names = ["Alice", "Bob", "Charlie", "Diana"];

console.log("Grades array: [" + grades.join(", ") + "]");
console.log("Names array: [" + names.join(", ") + "]");
console.log("Grades array size: " + grades.length);
console.log("");

// 2. ACCESSING ELEMENTS
console.log("2. 🔍 ACCESSING ELEMENTS");
console.log("First grade: " + grades[0]);
console.log("Last grade: " + grades[grades.length - 1]);
console.log("Third student: " + names[2]);
console.log("");

// 3. MODIFYING ELEMENTS  
console.log("3. ✏️ MODIFYING ELEMENTS");
console.log("Before: grades[1] = " + grades[1]);
grades[1] = 95;  // Update Bob's grade
console.log("After: grades[1] = " + grades[1]);
console.log("");

// 4. ARRAY ALGORITHMS
console.log("4. 🧮 ARRAY ALGORITHMS");

// Find maximum
let max = grades[0];
for (let i = 1; i < grades.length; i++) {
    if (grades[i] > max) {
        max = grades[i];
    }
}
console.log("Highest grade: " + max);

// Calculate average
let sum = 0;
for (let i = 0; i < grades.length; i++) {
    sum += grades[i];
}
let average = sum / grades.length;
console.log("Average grade: " + average.toFixed(2));

// Search for element
let searchGrade = 78;
let found = false;
for (let i = 0; i < grades.length; i++) {
    if (grades[i] === searchGrade) {
        console.log("Grade " + searchGrade + " found at index " + i);
        found = true;
        break;
    }
}
if (!found) {
    console.log("Grade " + searchGrade + " not found");
}

console.log("");
console.log("🎉 Array operations completed!");
console.log("💡 Try changing the grades and see different results!");`
            },
            {
                title: 'C++ Vectors - Dynamic Arrays',
                description: 'Understanding C++ vectors - arrays that can grow and shrink dynamically',
                code: `// C++ Vectors - Dynamic Arrays
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    cout << "=== C++ VECTORS DEMO ===" << endl;
    
    // Creating and initializing vectors
    vector<int> numbers;          // Empty vector
    vector<int> scores = {85, 92, 78, 96, 88};  // Initialized vector
    
    cout << "Initial scores: ";
    for (int score : scores) {
        cout << score << " ";
    }
    cout << "\nVector size: " << scores.size() << endl;
    
    // Adding elements
    cout << "\n=== ADDING ELEMENTS ===" << endl;
    numbers.push_back(10);
    numbers.push_back(20);
    numbers.push_back(30);
    
    cout << "Numbers after adding: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Accessing elements
    cout << "\n=== ACCESSING ELEMENTS ===" << endl;
    cout << "First score: " << scores[0] << endl;
    cout << "Last score: " << scores.back() << endl;
    cout << "Score at index 2: " << scores.at(2) << endl;
    
    // Vector operations
    cout << "\n=== VECTOR OPERATIONS ===" << endl;
    scores.insert(scores.begin() + 2, 100);  // Insert at position 2
    cout << "After inserting 100 at index 2: ";
    for (int score : scores) {
        cout << score << " ";
    }
    cout << endl;
    
    scores.erase(scores.begin() + 1);  // Remove element at index 1
    cout << "After removing element at index 1: ";
    for (int score : scores) {
        cout << score << " ";
    }
    cout << endl;
    
    // Sorting
    sort(scores.begin(), scores.end());
    cout << "After sorting: ";
    for (int score : scores) {
        cout << score << " ";
    }
    cout << endl;
    
    return 0;
}`
            }
        ],
        "linked-lists": [
            {
                title: 'Linked List Concepts - Visual Demo',
                description: '🔗 Understand linked lists through interactive visualization and step-by-step examples!',
                code: `// 🔗 Linked List Concepts - Interactive Demo
console.log("=== 🚀 LINKED LISTS DEMO ===");
console.log("");

// 1. WHAT IS A LINKED LIST?
console.log("1. 🤔 WHAT IS A LINKED LIST?");
console.log("A linked list is like a treasure hunt!");
console.log("Each clue (node) contains:");
console.log("  📦 Data: The actual information");
console.log("  🗂️ Next: Pointer to the next clue");
console.log("");

// 2. SIMULATING A SIMPLE LINKED LIST
console.log("2. 🏗️ BUILDING A LINKED LIST");

// Simulate nodes using JavaScript objects
let node1 = { data: 10, next: null };
let node2 = { data: 20, next: null };  
let node3 = { data: 30, next: null };

// Link them together
node1.next = node2;
node2.next = node3;
// node3.next stays null (end of list)

console.log("Created 3 nodes:");
console.log("Node 1: data=" + node1.data + ", next points to node 2");
console.log("Node 2: data=" + node2.data + ", next points to node 3");  
console.log("Node 3: data=" + node3.data + ", next=null (end)");
console.log("");

// 3. TRAVERSING THE LIST
console.log("3. 🚶 WALKING THROUGH THE LIST");
console.log("Starting from head (first node):");

let current = node1;  // Start at head
let position = 1;

while (current !== null) {
    console.log("Position " + position + ": " + current.data);
    current = current.next;  // Move to next node
    position++;
}
console.log("Reached the end (null)");
console.log("");

// 4. LIST OPERATIONS SIMULATION
console.log("4. ⚡ LIST OPERATIONS");

// Insert at beginning (new head)
let newNode = { data: 5, next: node1 };
console.log("Inserted " + newNode.data + " at beginning");

// Display updated list
console.log("Updated list:");
current = newNode;
position = 1;
while (current !== null) {
    console.log("Position " + position + ": " + current.data);
    current = current.next;
    position++;
}

console.log("");
console.log("🔍 KEY INSIGHTS:");
console.log("✅ Elements can be anywhere in memory");
console.log("✅ Easy to insert/delete at beginning");  
console.log("✅ Must traverse from head to access elements");
console.log("✅ Uses memory efficiently (no wasted space)");
console.log("");
console.log("🎯 VS ARRAYS:");
console.log("Arrays: Fast access [O(1)], slow insertion [O(n)]");
console.log("Linked Lists: Slow access [O(n)], fast insertion [O(1)]");`
            },
            {
                title: 'C++ Linked List Implementation',
                description: 'Complete implementation of a singly linked list in C++',
                code: `// Complete C++ Linked List Implementation
#include <iostream>
using namespace std;

// Node structure
struct Node {
    int data;
    Node* next;
    
    Node(int value) : data(value), next(nullptr) {}
};

// LinkedList class
class LinkedList {
private:
    Node* head;
    
public:
    // Constructor
    LinkedList() : head(nullptr) {}
    
    // Destructor
    ~LinkedList() {
        clear();
    }
    
    // Insert at beginning
    void insertAtBeginning(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
    }
    
    // Insert at end
    void insertAtEnd(int data) {
        Node* newNode = new Node(data);
        
        if (head == nullptr) {
            head = newNode;
            return;
        }
        
        Node* current = head;
        while (current->next != nullptr) {
            current = current->next;
        }
        current->next = newNode;
    }
    
    // Delete node with given data
    void deleteNode(int data) {
        if (head == nullptr) return;
        
        if (head->data == data) {
            Node* temp = head;
            head = head->next;
            delete temp;
            return;
        }
        
        Node* current = head;
        while (current->next != nullptr && current->next->data != data) {
            current = current->next;
        }
        
        if (current->next != nullptr) {
            Node* temp = current->next;
            current->next = current->next->next;
            delete temp;
        }
    }
    
    // Search for a value
    bool search(int data) {
        Node* current = head;
        while (current != nullptr) {
            if (current->data == data) {
                return true;
            }
            current = current->next;
        }
        return false;
    }
    
    // Display the list
    void display() {
        if (head == nullptr) {
            cout << "List is empty" << endl;
            return;
        }
        
        Node* current = head;
        cout << "List: ";
        while (current != nullptr) {
            cout << current->data;
            if (current->next != nullptr) {
                cout << " -> ";
            }
            current = current->next;
        }
        cout << " -> NULL" << endl;
    }
    
    // Clear the entire list
    void clear() {
        while (head != nullptr) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
};

// Example usage
int main() {
    LinkedList list;
    
    cout << "=== LINKED LIST OPERATIONS ===" << endl;
    
    // Insert elements
    list.insertAtEnd(10);
    list.insertAtEnd(20);
    list.insertAtEnd(30);
    list.display();  // 10 -> 20 -> 30 -> NULL
    
    list.insertAtBeginning(5);
    list.display();  // 5 -> 10 -> 20 -> 30 -> NULL
    
    // Search operations
    cout << "Search for 20: " << (list.search(20) ? "Found" : "Not found") << endl;
    cout << "Search for 50: " << (list.search(50) ? "Found" : "Not found") << endl;
    
    // Delete operations
    list.deleteNode(20);
    cout << "After deleting 20: ";
    list.display();  // 5 -> 10 -> 30 -> NULL
    
    return 0;
}`
            }
        ],
        "stacks-queues": [
            {
                title: 'Stack Data Structure - Interactive Demo',
                description: '📚 Learn stacks with practical examples - like a stack of plates!',
                code: `// 📚 Stack Data Structure - Interactive Demo
console.log("=== 🥞 STACK DEMO (Last In, First Out) ===");
console.log("");

// 1. WHAT IS A STACK?
console.log("1. 🤔 WHAT IS A STACK?");
console.log("Think of a stack of plates in a cafeteria:");
console.log("  🍽️ You add plates on TOP (push)");
console.log("  🍽️ You take plates from TOP (pop)");
console.log("  🍽️ Last plate added is first plate removed!");
console.log("");

// 2. SIMULATING A STACK
console.log("2. 🏗️ BUILDING A STACK");
let stack = [];  // JavaScript array as stack

// Stack operations
function push(item) {
    stack.push(item);
    console.log("📥 PUSH: Added " + item + " to stack");
    console.log("Stack now: [" + stack.join(", ") + "] (← top)");
}

function pop() {
    if (stack.length === 0) {
        console.log("❌ Cannot pop - stack is empty!");
        return null;
    }
    let removed = stack.pop();
    console.log("📤 POP: Removed " + removed + " from stack");
    console.log("Stack now: [" + stack.join(", ") + "] (← top)");
    return removed;
}

function peek() {
    if (stack.length === 0) {
        console.log("👀 PEEK: Stack is empty!");
        return null;
    }
    console.log("👀 PEEK: Top element is " + stack[stack.length - 1]);
    return stack[stack.length - 1];
}

// 3. STACK OPERATIONS IN ACTION
console.log("3. ⚡ STACK OPERATIONS");
console.log("Starting with empty stack: []");
console.log("");

push("Book 1");
push("Book 2");  
push("Book 3");
console.log("");

peek();
console.log("");

pop();
pop();
console.log("");

push("Book 4");
console.log("");

// 4. REAL WORLD APPLICATIONS
console.log("4. 🌍 REAL WORLD USES");
console.log("✅ Browser back button (page history)");
console.log("✅ Undo operations in text editors");
console.log("✅ Function call management");
console.log("✅ Expression evaluation");
console.log("✅ Balancing parentheses checker");
console.log("");

// 5. BALANCED PARENTHESES EXAMPLE
console.log("5. 🔍 BALANCED PARENTHESES CHECKER");
function checkBalanced(expression) {
    let bracketStack = [];
    let brackets = { '(': ')', '[': ']', '{': '}' };
    
    console.log("Checking: " + expression);
    
    for (let char of expression) {
        if (char === '(' || char === '[' || char === '{') {
            bracketStack.push(char);
            console.log("  Found opening '" + char + "' - pushed to stack");
        } else if (char === ')' || char === ']' || char === '}') {
            if (bracketStack.length === 0) {
                console.log("  ❌ Found closing '" + char + "' but no matching opening");
                return false;
            }
            let opening = bracketStack.pop();
            console.log("  Found closing '" + char + "' - popped '" + opening + "'");
            if (brackets[opening] !== char) {
                console.log("  ❌ Mismatch: '" + opening + "' doesn't match '" + char + "'");
                return false;
            }
        }
    }
    
    if (bracketStack.length === 0) {
        console.log("  ✅ All brackets are balanced!");
        return true;
    } else {
        console.log("  ❌ Unmatched opening brackets remain");
        return false;
    }
}

console.log("");
checkBalanced("(a + b) * [c + d]");
console.log("");
checkBalanced("(a + b * [c + d)");  // Unbalanced
console.log("");
console.log("🎯 Stacks are perfect for LIFO (Last In, First Out) problems!");`
            },
            {
                title: 'Queue Data Structure - Interactive Demo',
                description: '🚶‍♂️ Learn queues with real-world examples - like waiting in line!',
                code: `// 🚶‍♂️ Queue Data Structure - Interactive Demo  
console.log("=== 🎫 QUEUE DEMO (First In, First Out) ===");
console.log("");

// 1. WHAT IS A QUEUE?
console.log("1. 🤔 WHAT IS A QUEUE?");
console.log("Think of a line at a movie theater:");
console.log("  🎬 People join at the BACK (enqueue)");
console.log("  🎬 People leave from the FRONT (dequeue)");
console.log("  🎬 First person in line is first to be served!");
console.log("");

// 2. SIMULATING A QUEUE
console.log("2. 🏗️ BUILDING A QUEUE");
let queue = [];  // JavaScript array as queue

// Queue operations
function enqueue(item) {
    queue.push(item);  // Add to back
    console.log("➡️ ENQUEUE: " + item + " joined the queue");
    console.log("Queue: [" + queue.join(", ") + "] (front → back)");
}

function dequeue() {
    if (queue.length === 0) {
        console.log("❌ Cannot dequeue - queue is empty!");
        return null;
    }
    let removed = queue.shift();  // Remove from front
    console.log("⬅️ DEQUEUE: " + removed + " left the queue");
    console.log("Queue: [" + queue.join(", ") + "] (front → back)");
    return removed;
}

function front() {
    if (queue.length === 0) {
        console.log("👀 FRONT: Queue is empty!");
        return null;
    }
    console.log("👀 FRONT: Next to be served is " + queue[0]);
    return queue[0];
}

function size() {
    console.log("📊 SIZE: Queue has " + queue.length + " people");
    return queue.length;
}

// 3. QUEUE OPERATIONS IN ACTION
console.log("3. ⚡ QUEUE OPERATIONS");
console.log("Starting with empty queue: []");
console.log("");

enqueue("Alice");
enqueue("Bob");
enqueue("Charlie");
console.log("");

front();
size();
console.log("");

dequeue();  // Alice is served first
dequeue();  // Bob is served second
console.log("");

enqueue("Diana");
enqueue("Eve");
console.log("");

// 4. REAL WORLD APPLICATIONS
console.log("4. 🌍 REAL WORLD USES");
console.log("✅ Print job queue (first submitted, first printed)");
console.log("✅ CPU task scheduling");
console.log("✅ Breadth-First Search (BFS) in graphs");
console.log("✅ Call center phone systems");
console.log("✅ Online gaming matchmaking");
console.log("");

// 5. CUSTOMER SERVICE SIMULATION
console.log("5. 🎧 CUSTOMER SERVICE SIMULATION");
let customerQueue = [];
let ticketNumber = 1;

function addCustomer(name) {
    let customer = { name: name, ticket: ticketNumber++ };
    customerQueue.push(customer);
    console.log("🎫 Customer " + name + " got ticket #" + customer.ticket);
    console.log("   Queue: " + customerQueue.length + " customers waiting");
}

function serveNextCustomer() {
    if (customerQueue.length === 0) {
        console.log("☕ No customers waiting - time for a coffee break!");
        return;
    }
    let customer = customerQueue.shift();
    console.log("👨‍💼 Now serving: " + customer.name + " (ticket #" + customer.ticket + ")");
    console.log("   Remaining: " + customerQueue.length + " customers");
}

console.log("");
addCustomer("John");
addCustomer("Sarah");
addCustomer("Mike");
console.log("");

serveNextCustomer();  // John is served first
serveNextCustomer();  // Sarah is served second
console.log("");

addCustomer("Lisa");
console.log("");

serveNextCustomer();  // Mike is served
serveNextCustomer();  // Lisa is served
serveNextCustomer();  // No one left
console.log("");

console.log("🎯 Queues are perfect for FIFO (First In, First Out) problems!");
console.log("💡 Fair processing where order matters!");`
            }
        ],
        trees: [
            {
                title: 'Binary Trees - Visual Understanding',
                description: '🌳 Learn trees through interactive examples - nature\'s perfect data structure!',
                code: `// 🌳 Binary Trees - Interactive Demo
console.log("=== 🌳 BINARY TREE DEMO ===");
console.log("");

// 1. WHAT IS A TREE?
console.log("1. 🤔 WHAT IS A TREE?");
console.log("Think of a family tree or organizational chart:");
console.log("  🌿 ROOT: The top node (CEO, great-grandparent)");
console.log("  🌿 PARENT: Node with children below it");
console.log("  🌿 CHILD: Node connected below a parent");
console.log("  🌿 LEAF: Node with no children (employees, descendants)");
console.log("  🌿 BINARY: Each node has at most 2 children");
console.log("");

// 2. TREE STRUCTURE SIMULATION
console.log("2. 🏗️ BUILDING A TREE");

// Simple tree node structure
function TreeNode(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

// Create a sample binary tree
//       50
//      /  \\
//    30    70
//   /  \\   /  \\
//  20  40 60  80

let root = new TreeNode(50);
root.left = new TreeNode(30);
root.right = new TreeNode(70);
root.left.left = new TreeNode(20);
root.left.right = new TreeNode(40);
root.right.left = new TreeNode(60);
root.right.right = new TreeNode(80);

console.log("Created tree structure:");
console.log("       50 (root)");
console.log("      /  \\\\");
console.log("    30    70");
console.log("   /  \\\\   /  \\\\");
console.log("  20  40 60  80 (leaves)");
console.log("");

// 3. TREE TRAVERSAL METHODS
console.log("3. 🚶 TREE TRAVERSAL METHODS");

// In-order traversal (Left, Root, Right)
function inOrderTraversal(node, result = []) {
    if (node !== null) {
        inOrderTraversal(node.left, result);   // Visit left subtree
        result.push(node.data);                // Visit root
        inOrderTraversal(node.right, result);  // Visit right subtree
    }
    return result;
}

// Pre-order traversal (Root, Left, Right)
function preOrderTraversal(node, result = []) {
    if (node !== null) {
        result.push(node.data);                // Visit root
        preOrderTraversal(node.left, result);  // Visit left subtree  
        preOrderTraversal(node.right, result); // Visit right subtree
    }
    return result;
}

// Post-order traversal (Left, Right, Root)
function postOrderTraversal(node, result = []) {
    if (node !== null) {
        postOrderTraversal(node.left, result);  // Visit left subtree
        postOrderTraversal(node.right, result); // Visit right subtree
        result.push(node.data);                 // Visit root
    }
    return result;
}

console.log("📍 In-Order (Left, Root, Right): " + inOrderTraversal(root).join(" → "));
console.log("📍 Pre-Order (Root, Left, Right): " + preOrderTraversal(root).join(" → "));  
console.log("📍 Post-Order (Left, Right, Root): " + postOrderTraversal(root).join(" → "));
console.log("");

// 4. BINARY SEARCH TREE OPERATIONS
console.log("4. 🔍 BINARY SEARCH TREE (BST)");
console.log("Special property: Left < Root < Right");
console.log("This makes searching super efficient!");
console.log("");

function searchBST(node, target) {
    if (node === null) {
        return false;
    }
    
    console.log("Checking node: " + node.data);
    
    if (node.data === target) {
        console.log("✅ Found " + target + "!");
        return true;
    } else if (target < node.data) {
        console.log("↙️ Target " + target + " < " + node.data + ", go left");
        return searchBST(node.left, target);
    } else {
        console.log("↘️ Target " + target + " > " + node.data + ", go right");
        return searchBST(node.right, target);
    }
}

console.log("🔍 Searching for 40:");
searchBST(root, 40);
console.log("");

console.log("🔍 Searching for 25 (not in tree):");
searchBST(root, 25);
console.log("");

// 5. TREE PROPERTIES
console.log("5. 📊 TREE PROPERTIES");

function getHeight(node) {
    if (node === null) return -1;
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}

function countNodes(node) {
    if (node === null) return 0;
    return countNodes(node.left) + countNodes(node.right) + 1;
}

console.log("Tree height: " + getHeight(root));
console.log("Total nodes: " + countNodes(root));
console.log("");

console.log("🌍 REAL WORLD USES:");
console.log("✅ File systems (folders and files)");
console.log("✅ Decision trees in AI");
console.log("✅ Database indexes");
console.log("✅ Expression parsing");
console.log("✅ Family trees and org charts");
console.log("");
console.log("🎯 Trees organize data hierarchically for fast searching!");`
            }
        ],
        "hash-tables": [
            {
                title: 'Hash Tables - Lightning Fast Lookup',
                description: '🗂️ Master hash tables - the secret behind fast database and cache systems!',
                code: `// 🗂️ Hash Tables - Interactive Demo
console.log("=== ⚡ HASH TABLE DEMO ===");
console.log("");

// 1. WHAT IS A HASH TABLE?
console.log("1. 🤔 WHAT IS A HASH TABLE?");
console.log("Think of a library card catalog:");
console.log("  📚 Books are stored by SUBJECT (key)");
console.log("  📚 You don't search every book - you go to the right section!");
console.log("  📚 HASH FUNCTION: Converts key → storage location");
console.log("  📚 Super fast lookup: O(1) average time!");
console.log("");

// 2. SIMPLE HASH FUNCTION
console.log("2. 🔧 HASH FUNCTION MAGIC");

function simpleHash(key, tableSize = 10) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);  // Add ASCII values
    }
    let index = hash % tableSize;   // Fit into table size
    console.log("Hash('" + key + "') = " + hash + " % " + tableSize + " = " + index);
    return index;
}

// Test the hash function
console.log("🔍 Testing hash function:");
simpleHash("apple");
simpleHash("banana"); 
simpleHash("cherry");
console.log("");

// 3. BUILDING A HASH TABLE
console.log("3. 🏗️ BUILDING A HASH TABLE");

class SimpleHashTable {
    constructor(size = 10) {
        this.size = size;
        this.table = new Array(size).fill(null).map(() => []);  // Array of arrays for chaining
    }
    
    hash(key) {
        let hash = 0;
        for (let char of key) {
            hash += char.charCodeAt(0);
        }
        return hash % this.size;
    }
    
    set(key, value) {
        let index = this.hash(key);
        let bucket = this.table[index];
        
        // Check if key already exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;  // Update existing
                console.log("📝 Updated: " + key + " = " + value + " (index " + index + ")");
                return;
            }
        }
        
        // Add new key-value pair
        bucket.push([key, value]);
        console.log("➕ Added: " + key + " = " + value + " (index " + index + ")");
    }
    
    get(key) {
        let index = this.hash(key);
        let bucket = this.table[index];
        
        for (let pair of bucket) {
            if (pair[0] === key) {
                console.log("🔍 Found: " + key + " = " + pair[1] + " (index " + index + ")");
                return pair[1];
            }
        }
        
        console.log("❌ Not found: " + key);
        return null;
    }
    
    display() {
        console.log("📊 Hash Table Contents:");
        for (let i = 0; i < this.size; i++) {
            if (this.table[i].length > 0) {
                let pairs = this.table[i].map(pair => pair[0] + ":" + pair[1]);
                console.log("  [" + i + "] → " + pairs.join(", "));
            }
        }
    }
}

// 4. HASH TABLE IN ACTION
console.log("4. ⚡ HASH TABLE OPERATIONS");

let phoneBook = new SimpleHashTable(7);  // Small table for demo

// Adding contacts
phoneBook.set("Alice", "555-0101");
phoneBook.set("Bob", "555-0202"); 
phoneBook.set("Charlie", "555-0303");
phoneBook.set("Diana", "555-0404");
console.log("");

phoneBook.display();
console.log("");

// Looking up contacts
phoneBook.get("Alice");
phoneBook.get("Bob");
phoneBook.get("Eve");  // Not in table
console.log("");

// Update existing
phoneBook.set("Alice", "555-9999");  // Update Alice's number
console.log("");

// 5. COLLISION HANDLING DEMO
console.log("5. 💥 COLLISION HANDLING");
console.log("What happens when different keys hash to same index?");

function demonstrateCollision() {
    let collisionTable = new SimpleHashTable(3);  // Very small table
    
    console.log("Adding items to small table (size 3):");
    collisionTable.set("cat", "meow");     // Likely index 0, 1, or 2
    collisionTable.set("dog", "woof");     // Might collide!
    collisionTable.set("cow", "moo");      // Even more likely to collide!
    
    console.log("");
    collisionTable.display();
    console.log("");
    console.log("🔗 Collision Resolution: Chaining (multiple items at same index)");
}

demonstrateCollision();

// 6. REAL WORLD APPLICATIONS
console.log("6. 🌍 REAL WORLD APPLICATIONS");
console.log("✅ Database indexes (super fast queries)");
console.log("✅ Caching systems (Redis, Memcached)");
console.log("✅ Password storage (hashing passwords)");
console.log("✅ Compiler symbol tables");
console.log("✅ Browser history and bookmarks");
console.log("✅ Dictionary and spell checkers");
console.log("");

// 7. PERFORMANCE COMPARISON
console.log("7. 📊 WHY HASH TABLES ARE AMAZING");
console.log("Array search (linear): O(n) - check every element");
console.log("Tree search (BST): O(log n) - divide and conquer");
console.log("Hash table: O(1) - go directly to location!");
console.log("");
console.log("For 1 million items:");
console.log("  Array: up to 1,000,000 comparisons");
console.log("  Tree: up to ~20 comparisons"); 
console.log("  Hash Table: ~1 comparison! ⚡");
console.log("");
console.log("🎯 Hash tables trade space for incredible speed!");`
            }
        ],
        algorithms: [
            {
                title: 'Sorting Algorithms Comparison',
                description: '⚡ Compare different sorting algorithms and see them in action!',
                code: `// ⚡ Sorting Algorithms - Interactive Demo
console.log("=== 📊 SORTING ALGORITHMS DEMO ===");
console.log("");

// Test data
let originalData = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42];
console.log("📋 Original array: [" + originalData.join(", ") + "]");
console.log("🎯 Goal: Sort in ascending order");
console.log("");

// 1. BUBBLE SORT - Simple but slow
console.log("1. 🫧 BUBBLE SORT (Beginner Friendly)");
console.log("💡 Concept: Compare adjacent elements, swap if wrong order");
console.log("Like bubbles rising to surface - largest 'bubbles' to end");

function bubbleSort(arr) {
    let data = [...arr];  // Copy array
    let swaps = 0;
    let comparisons = 0;
    
    console.log("Starting bubble sort...");
    
    for (let i = 0; i < data.length; i++) {
        console.log("\\n--- Pass " + (i + 1) + " ---");
        let swapped = false;
        
        for (let j = 0; j < data.length - i - 1; j++) {
            comparisons++;
            console.log("Compare " + data[j] + " and " + data[j + 1]);
            
            if (data[j] > data[j + 1]) {
                // Swap elements
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
                swaps++;
                swapped = true;
                console.log("  🔄 Swapped! Array: [" + data.join(", ") + "]");
            } else {
                console.log("  ✅ In order, no swap needed");
            }
        }
        
        if (!swapped) {
            console.log("🎉 No swaps needed - array is sorted!");
            break;
        }
    }
    
    console.log("\\n📊 Bubble Sort Results:");
    console.log("  Final: [" + data.join(", ") + "]");
    console.log("  Comparisons: " + comparisons);
    console.log("  Swaps: " + swaps);
    console.log("  Time Complexity: O(n²) - slow for large data");
    
    return data;
}

bubbleSort(originalData.slice(0, 6));  // Use smaller array for demo
console.log("");

// 2. SELECTION SORT - Find minimum and place it
console.log("2. 🎯 SELECTION SORT (Find the Minimum)");
console.log("💡 Concept: Find smallest element, put it first, repeat");

function selectionSort(arr) {
    let data = [...arr];
    let swaps = 0;
    
    console.log("Starting selection sort...");
    
    for (let i = 0; i < data.length - 1; i++) {
        let minIndex = i;
        console.log("\\nStep " + (i + 1) + ": Finding minimum in [" + 
                   data.slice(i).join(", ") + "]");
        
        // Find minimum element in unsorted portion
        for (let j = i + 1; j < data.length; j++) {
            if (data[j] < data[minIndex]) {
                minIndex = j;
                console.log("  New minimum: " + data[j] + " at index " + j);
            }
        }
        
        // Swap minimum with first unsorted element
        if (minIndex !== i) {
            [data[i], data[minIndex]] = [data[minIndex], data[i]];
            swaps++;
            console.log("  🔄 Swapped " + data[minIndex] + " with " + data[i]);
        }
        
        console.log("  After step " + (i + 1) + ": [" + data.join(", ") + "]");
        console.log("  ✅ First " + (i + 1) + " elements are sorted");
    }
    
    console.log("\\n📊 Selection Sort Results:");
    console.log("  Final: [" + data.join(", ") + "]");
    console.log("  Swaps: " + swaps);
    console.log("  Time Complexity: O(n²) - but fewer swaps than bubble sort");
    
    return data;
}

selectionSort([64, 25, 12, 22, 11]);  // Smaller demo
console.log("");

// 3. QUICK SORT - Divide and Conquer
console.log("3. ⚡ QUICK SORT (Divide and Conquer - Advanced)");
console.log("💡 Concept: Pick pivot, partition around it, sort recursively");

function quickSort(arr, low = 0, high = arr.length - 1, depth = 0) {
    if (low < high) {
        let indent = "  ".repeat(depth);
        console.log(indent + "📂 QuickSort array[" + low + ":" + high + "] = [" + 
                   arr.slice(low, high + 1).join(", ") + "]");
        
        // Partition and get pivot index
        let pivotIndex = partition(arr, low, high, depth);
        
        console.log(indent + "🎯 Pivot " + arr[pivotIndex] + " in final position " + pivotIndex);
        
        // Recursively sort left and right parts
        quickSort(arr, low, pivotIndex - 1, depth + 1);
        quickSort(arr, pivotIndex + 1, high, depth + 1);
    }
    
    return arr;
}

function partition(arr, low, high, depth) {
    let pivot = arr[high];  // Choose last element as pivot
    let i = low - 1;        // Index of smaller element
    let indent = "  ".repeat(depth);
    
    console.log(indent + "  🎲 Pivot chosen: " + pivot);
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            console.log(indent + "    " + arr[j] + " < " + pivot + " → move left");
        }
    }
    
    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    return i + 1;
}

let quickData = [64, 34, 25, 12, 22, 11, 90];
console.log("Starting with: [" + quickData.join(", ") + "]");
quickSort([...quickData]);  // Copy to avoid modifying original
console.log("📊 Quick Sort: O(n log n) average - very fast!");
console.log("");

// 4. ALGORITHM COMPARISON
console.log("4. 📊 SORTING ALGORITHM COMPARISON");
console.log("");
console.log("| Algorithm    | Best Case | Average Case | Worst Case | Space | Stability |");
console.log("|--------------|-----------|--------------|------------|-------|-----------|");
console.log("| Bubble Sort  | O(n)      | O(n²)        | O(n²)      | O(1)  | Stable    |");
console.log("| Selection    | O(n²)     | O(n²)        | O(n²)      | O(1)  | Unstable  |");
console.log("| Insertion    | O(n)      | O(n²)        | O(n²)      | O(1)  | Stable    |");
console.log("| Merge Sort   | O(n log n)| O(n log n)   | O(n log n) | O(n)  | Stable    |");
console.log("| Quick Sort   | O(n log n)| O(n log n)   | O(n²)      | O(log n)| Unstable|");
console.log("");
console.log("🎯 WHEN TO USE EACH:");
console.log("✅ Bubble Sort: Learning, very small datasets");
console.log("✅ Selection Sort: Memory is limited, small datasets");
console.log("✅ Quick Sort: General purpose, large datasets");
console.log("✅ Merge Sort: When stability is important");
console.log("");
console.log("🚀 For real applications, use built-in sort() functions!");
console.log("They use optimized hybrid algorithms like TimSort!");`
            }
        ],
        problems: [
            {
                title: 'Problem 1: Array - Find Two Numbers that Sum to Target',
                description: '🎯 Classic coding interview problem: Given an array and target sum, find two numbers that add up to the target.',
                code: `// Problem: Two Sum - Find indices of two numbers that add up to target
// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)

#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Approach 1: Brute Force - O(n²) time, O(1) space
vector<int> twoSumBruteForce(vector<int>& nums, int target) {
    cout << "=== BRUTE FORCE APPROACH ===" << endl;
    cout << "Checking all pairs of numbers..." << endl;
    
    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {
            cout << "Checking: " << nums[i] << " + " << nums[j] << " = " << (nums[i] + nums[j]) << endl;
            
            if (nums[i] + nums[j] == target) {
                cout << "✅ Found solution: indices [" << i << ", " << j << "]" << endl;
                return {i, j};
            }
        }
    }
    return {}; // No solution found
}

// Approach 2: Hash Map - O(n) time, O(n) space
vector<int> twoSumOptimized(vector<int>& nums, int target) {
    cout << "\\n=== OPTIMIZED HASH MAP APPROACH ===" << endl;
    cout << "Using hash map for O(1) lookup..." << endl;
    
    unordered_map<int, int> numMap; // value -> index
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        cout << "Current number: " << nums[i] << ", looking for: " << complement << endl;
        
        // Check if complement exists in hash map
        if (numMap.find(complement) != numMap.end()) {
            cout << "✅ Found complement " << complement << " at index " << numMap[complement] << endl;
            return {numMap[complement], i};
        }
        
        // Add current number to hash map
        numMap[nums[i]] = i;
        cout << "  Added " << nums[i] << " -> index " << i << " to hash map" << endl;
    }
    
    return {}; // No solution found
}

// Demo function
int main() {
    cout << "🎯 TWO SUM PROBLEM SOLVER" << endl;
    cout << "Finding two numbers that add up to target\\n" << endl;
    
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    
    cout << "Input array: [";
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i];
        if (i < nums.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    cout << "Target sum: " << target << endl << endl;
    
    // Test brute force approach
    vector<int> result1 = twoSumBruteForce(nums, target);
    if (!result1.empty()) {
        cout << "Brute Force Result: [" << result1[0] << ", " << result1[1] << "]" << endl;
        cout << "Values: " << nums[result1[0]] << " + " << nums[result1[1]] << " = " << target << endl;
    }
    
    // Test optimized approach
    vector<int> result2 = twoSumOptimized(nums, target);
    if (!result2.empty()) {
        cout << "Optimized Result: [" << result2[0] << ", " << result2[1] << "]" << endl;
        cout << "Values: " << nums[result2[0]] + " + " << nums[result2[1]] << " = " << target << endl;
    }
    
    cout << "\\n📊 COMPLEXITY ANALYSIS:" << endl;
    cout << "Brute Force: O(n²) time, O(1) space" << endl;
    cout << "Hash Map: O(n) time, O(n) space" << endl;
    cout << "🎯 Hash map is much faster for large arrays!" << endl;
    
    return 0;
}`
            },
            {
                title: 'Problem 2: Linked List - Reverse a Linked List',
                description: '🔄 Master pointer manipulation: Reverse a singly linked list iteratively and recursively.',
                code: `// Problem: Reverse Linked List
// Input: 1 -> 2 -> 3 -> 4 -> 5 -> NULL
// Output: 5 -> 4 -> 3 -> 2 -> 1 -> NULL

#include <iostream>
using namespace std;

// Node definition
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Helper function to print list
void printList(ListNode* head, string label) {
    cout << label << ": ";
    ListNode* current = head;
    while (current) {
        cout << current->val;
        if (current->next) cout << " -> ";
        current = current->next;
    }
    cout << " -> NULL" << endl;
}

// Helper function to create test list
ListNode* createList(vector<int> values) {
    if (values.empty()) return nullptr;
    
    ListNode* head = new ListNode(values[0]);
    ListNode* current = head;
    
    for (int i = 1; i < values.size(); i++) {
        current->next = new ListNode(values[i]);
        current = current->next;
    }
    
    return head;
}

// Approach 1: Iterative Reversal
ListNode* reverseIterative(ListNode* head) {
    cout << "=== ITERATIVE APPROACH ===" << endl;
    
    ListNode* prev = nullptr;
    ListNode* current = head;
    ListNode* next = nullptr;
    
    int step = 1;
    while (current != nullptr) {
        cout << "Step " << step << ":" << endl;
        cout << "  Current node: " << current->val << endl;
        
        // Store next node
        next = current->next;
        cout << "  Next node: " << (next ? to_string(next->val) : "NULL") << endl;
        
        // Reverse the link
        current->next = prev;
        cout << "  Reversed link: " << current->val << " now points to " 
             << (prev ? to_string(prev->val) : "NULL") << endl;
        
        // Move pointers forward
        prev = current;
        current = next;
        
        cout << "  Updated pointers for next iteration" << endl << endl;
        step++;
    }
    
    cout << "✅ Iterative reversal complete!" << endl;
    return prev; // prev is now the new head
}

// Approach 2: Recursive Reversal
ListNode* reverseRecursive(ListNode* head) {
    // Base case: empty list or single node
    if (!head || !head->next) {
        if (head) cout << "📍 Base case reached: node " << head->val << " becomes new head" << endl;
        return head;
    }
    
    cout << "🔄 Recursively processing node: " << head->val << endl;
    
    // Recursively reverse the rest of the list
    ListNode* newHead = reverseRecursive(head->next);
    
    cout << "⬅️ Reversing link: " << head->next->val << " -> " << head->val << endl;
    
    // Reverse the current link
    head->next->next = head;
    head->next = nullptr;
    
    return newHead;
}

// Approach 3: Stack-based Reversal (Alternative)
ListNode* reverseUsingStack(ListNode* head) {
    cout << "=== STACK-BASED APPROACH ===" << endl;
    
    if (!head) return nullptr;
    
    vector<ListNode*> stack; // Using vector as stack
    ListNode* current = head;
    
    // Push all nodes onto stack
    cout << "Pushing nodes onto stack: ";
    while (current) {
        stack.push_back(current);
        cout << current->val << " ";
        current = current->next;
    }
    cout << endl;
    
    // Pop from stack to reverse
    cout << "Popping from stack to reverse: ";
    ListNode* newHead = stack.back();
    current = newHead;
    
    for (int i = stack.size() - 2; i >= 0; i--) {
        cout << stack[i]->val << " ";
        current->next = stack[i];
        current = current->next;
    }
    current->next = nullptr;
    cout << endl;
    
    return newHead;
}

// Demo function
int main() {
    cout << "🔄 LINKED LIST REVERSAL PROBLEM" << endl;
    cout << "Demonstrating 3 different approaches\\n" << endl;
    
    // Create test list: 1 -> 2 -> 3 -> 4 -> 5
    vector<int> values = {1, 2, 3, 4, 5};
    
    // Test 1: Iterative approach
    cout << "🔧 TEST 1: ITERATIVE REVERSAL" << endl;
    ListNode* list1 = createList(values);
    printList(list1, "Original");
    ListNode* reversed1 = reverseIterative(list1);
    printList(reversed1, "Reversed");
    cout << endl;
    
    // Test 2: Recursive approach
    cout << "🔧 TEST 2: RECURSIVE REVERSAL" << endl;
    ListNode* list2 = createList(values);
    printList(list2, "Original");
    cout << "=== RECURSIVE APPROACH ===" << endl;
    ListNode* reversed2 = reverseRecursive(list2);
    printList(reversed2, "Reversed");
    cout << endl;
    
    // Test 3: Stack approach
    cout << "🔧 TEST 3: STACK-BASED REVERSAL" << endl;
    ListNode* list3 = createList(values);
    printList(list3, "Original");
    ListNode* reversed3 = reverseUsingStack(list3);
    printList(reversed3, "Reversed");
    cout << endl;
    
    cout << "📊 COMPLEXITY COMPARISON:" << endl;
    cout << "Iterative: O(n) time, O(1) space - BEST" << endl;
    cout << "Recursive: O(n) time, O(n) space (call stack)" << endl;
    cout << "Stack-based: O(n) time, O(n) space (explicit stack)" << endl;
    cout << "🎯 Iterative is most efficient for production code!" << endl;
    
    return 0;
}`
            },
            {
                title: 'Problem 3: Stack - Valid Parentheses Checker',
                description: '📚 Real-world stack application: Check if parentheses, brackets, and braces are properly balanced.',
                code: `// Problem: Valid Parentheses
// Check if string with parentheses (), brackets [], and braces {} is valid
// Input: "({[]})" -> Output: true
// Input: "([)]" -> Output: false

#include <iostream>
#include <stack>
#include <string>
#include <unordered_map>
using namespace std;

class ParenthesesValidator {
private:
    unordered_map<char, char> matchingPairs = {
        {')', '('},
        {']', '['},
        {'}', '{'}
    };
    
public:
    bool isValid(string s) {
        cout << "🔍 Validating: \\"" << s << "\\"" << endl;
        
        stack<char> openStack;
        
        for (int i = 0; i < s.length(); i++) {
            char c = s[i];
            cout << "\\nStep " << (i + 1) << ": Processing '" << c << "'" << endl;
            
            // If it's an opening bracket
            if (c == '(' || c == '[' || c == '{') {
                openStack.push(c);
                cout << "  📥 Opening bracket - pushed to stack" << endl;
                cout << "  Stack size: " << openStack.size() << endl;
            }
            // If it's a closing bracket
            else if (c == ')' || c == ']' || c == '}') {
                // Check if stack is empty
                if (openStack.empty()) {
                    cout << "  ❌ Closing bracket but stack is empty!" << endl;
                    cout << "  💡 This means no matching opening bracket" << endl;
                    return false;
                }
                
                char top = openStack.top();
                openStack.pop();
                cout << "  📤 Closing bracket - popped '" << top << "' from stack" << endl;
                
                // Check if they match
                if (matchingPairs[c] != top) {
                    cout << "  ❌ Mismatch: '" << c << "' doesn't match '" << top << "'" << endl;
                    cout << "  💡 Expected '" << matchingPairs[c] << "' but found '" << top << "'" << endl;
                    return false;
                } else {
                    cout << "  ✅ Perfect match: '" << top << "' and '" << c << "'" << endl;
                }
                cout << "  Stack size: " << openStack.size() << endl;
            }
        }
        
        // Check if all brackets were closed
        bool result = openStack.empty();
        cout << "\\n🏁 Final check:" << endl;
        if (result) {
            cout << "✅ All brackets matched perfectly!" << endl;
        } else {
            cout << "❌ " << openStack.size() << " unmatched opening bracket(s) remain" << endl;
            cout << "💡 Every opening bracket needs a closing bracket" << endl;
        }
        
        return result;
    }
    
    // Enhanced version with detailed analysis
    void analyzeString(string s) {
        cout << "\\n📊 DETAILED ANALYSIS OF: \\"" << s << "\\"" << endl;
        cout << "Length: " << s.length() << " characters" << endl;
        
        int openCount = 0, closeCount = 0;
        int parenCount = 0, bracketCount = 0, braceCount = 0;
        
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') {
                openCount++;
                if (c == '(') parenCount++;
                else if (c == '[') bracketCount++;
                else braceCount++;
            }
            else if (c == ')' || c == ']' || c == '}') {
                closeCount++;
            }
        }
        
        cout << "Total opening brackets: " << openCount << endl;
        cout << "Total closing brackets: " << closeCount << endl;
        cout << "Parentheses pairs: " << parenCount << endl;
        cout << "Square bracket pairs: " << bracketCount << endl;
        cout << "Curly brace pairs: " << braceCount << endl;
        
        if (openCount != closeCount) {
            cout << "⚠️ Unequal opening/closing brackets - definitely invalid!" << endl;
        }
    }
};

// Test different cases
void runTests() {
    ParenthesesValidator validator;
    
    vector<string> testCases = {
        "()",           // Simple valid
        "()[]{}",       // Multiple types valid
        "({[]})",       // Nested valid
        "([)]",         // Invalid - wrong order
        "(((",          // Invalid - only opening
        ")))",          // Invalid - only closing
        "",             // Empty - valid
        "{[()]}",       // Complex nested valid
        "({[}])"        // Invalid - mixed up
    };
    
    cout << "🧪 RUNNING COMPREHENSIVE TESTS\\n" << endl;
    
    for (int i = 0; i < testCases.size(); i++) {
        cout << "═══ TEST CASE " << (i + 1) << " ═══" << endl;
        
        validator.analyzeString(testCases[i]);
        bool result = validator.isValid(testCases[i]);
        
        cout << "\\n🎯 RESULT: " << (result ? "✅ VALID" : "❌ INVALID") << endl;
        cout << "\\n" << string(50, '─') << "\\n" << endl;
    }
}

int main() {
    cout << "📚 VALID PARENTHESES PROBLEM" << endl;
    cout << "Using Stack Data Structure for Bracket Matching\\n" << endl;
    
    cout << "🧠 ALGORITHM EXPLANATION:" << endl;
    cout << "1. Use stack to keep track of opening brackets" << endl;
    cout << "2. When we see opening bracket: push to stack" << endl;
    cout << "3. When we see closing bracket: check if it matches top of stack" << endl;
    cout << "4. If matches: pop from stack, continue" << endl;
    cout << "5. If doesn't match or stack empty: invalid" << endl;
    cout << "6. At end: stack should be empty for valid string\\n" << endl;
    
    runTests();
    
    cout << "💡 REAL-WORLD APPLICATIONS:" << endl;
    cout << "✅ Code editors - syntax highlighting" << endl;
    cout << "✅ Compilers - parsing expressions" << endl;
    cout << "✅ Mathematical calculators" << endl;
    cout << "✅ HTML/XML tag validation" << endl;
    cout << "✅ JSON format validation" << endl;
    
    return 0;
}`
            },
            {
                title: 'Problem 4: Binary Tree - Level Order Traversal (BFS)',
                description: '🌳 Master tree traversal: Visit all nodes level by level using Queue data structure.',
                code: `// Problem: Binary Tree Level Order Traversal
// Visit nodes level by level from left to right
// Input:    3
//          / \\
//         9   20
//            /  \\
//           15   7
// Output: [[3], [9, 20], [15, 7]]

#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Tree node definition
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class BinaryTreeTraversal {
public:
    // Level Order Traversal using Queue (BFS)
    vector<vector<int>> levelOrder(TreeNode* root) {
        cout << "🌳 STARTING LEVEL ORDER TRAVERSAL" << endl;
        
        vector<vector<int>> result;
        if (!root) {
            cout << "Empty tree - nothing to traverse" << endl;
            return result;
        }
        
        queue<TreeNode*> q;
        q.push(root);
        int level = 0;
        
        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> currentLevel;
            
            cout << "\\n📍 Level " << level << " (has " << levelSize << " nodes):" << endl;
            
            // Process all nodes at current level
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                
                currentLevel.push_back(node->val);
                cout << "  Visited node: " << node->val << endl;
                
                // Add children to queue for next level
                if (node->left) {
                    q.push(node->left);
                    cout << "    Added left child: " << node->left->val << " to queue" << endl;
                }
                if (node->right) {
                    q.push(node->right);
                    cout << "    Added right child: " << node->right->val << " to queue" << endl;
                }
            }
            
            result.push_back(currentLevel);
            cout << "  Level " << level << " complete: [";
            for (int i = 0; i < currentLevel.size(); i++) {
                cout << currentLevel[i];
                if (i < currentLevel.size() - 1) cout << ", ";
            }
            cout << "]" << endl;
            
            level++;
        }
        
        cout << "\\n✅ Level order traversal complete!" << endl;
        return result;
    }
    
    // Alternative: Right to Left Level Order
    vector<vector<int>> levelOrderRightToLeft(TreeNode* root) {
        cout << "\\n🔄 RIGHT TO LEFT LEVEL ORDER" << endl;
        
        vector<vector<int>> result;
        if (!root) return result;
        
        queue<TreeNode*> q;
        q.push(root);
        int level = 0;
        
        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> currentLevel;
            
            cout << "Level " << level << ": ";
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                currentLevel.push_back(node->val);
                
                // Add children (right first for right-to-left)
                if (node->right) q.push(node->right);
                if (node->left) q.push(node->left);
            }
            
            result.push_back(currentLevel);
            for (int val : currentLevel) {
                cout << val << " ";
            }
            cout << endl;
            level++;
        }
        
        return result;
    }
    
    // Zigzag Level Order (alternating left-right, right-left)
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        cout << "\\n⚡ ZIGZAG LEVEL ORDER TRAVERSAL" << endl;
        
        vector<vector<int>> result;
        if (!root) return result;
        
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        int level = 0;
        
        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> currentLevel;
            
            cout << "Level " << level << " (" << (leftToRight ? "Left→Right" : "Right←Left") << "): ";
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                
                if (leftToRight) {
                    currentLevel.push_back(node->val);
                } else {
                    currentLevel.insert(currentLevel.begin(), node->val);
                }
                
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            
            for (int val : currentLevel) {
                cout << val << " ";
            }
            cout << endl;
            
            result.push_back(currentLevel);
            leftToRight = !leftToRight;
            level++;
        }
        
        return result;
    }
    
    // Helper: Print tree structure
    void printTree(TreeNode* root, string prefix = "", bool isLast = true) {
        if (!root) return;
        
        cout << prefix;
        cout << (isLast ? "└── " : "├── ");
        cout << root->val << endl;
        
        if (root->left || root->right) {
            if (root->right) {
                printTree(root->right, prefix + (isLast ? "    " : "│   "), !root->left);
            }
            if (root->left) {
                printTree(root->left, prefix + (isLast ? "    " : "│   "), true);
            }
        }
    }
};

// Helper function to create test tree
TreeNode* createSampleTree() {
    //      3
    //     / \\
    //    9   20
    //       /  \\
    //      15   7
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left = new TreeNode(15);
    root->right->right = new TreeNode(7);
    return root;
}

// Create a larger test tree
TreeNode* createComplexTree() {
    //        1
    //      /   \\
    //     2     3
    //   /  \\  /  \\
    //  4    5 6   7
    // /
    //8
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    root->right->left = new TreeNode(6);
    root->right->right = new TreeNode(7);
    root->left->left->left = new TreeNode(8);
    return root;
}

int main() {
    cout << "🌳 BINARY TREE LEVEL ORDER TRAVERSAL" << endl;
    cout << "Using Queue (BFS) for Tree Traversal\\n" << endl;
    
    BinaryTreeTraversal traversal;
    
    // Test 1: Simple tree
    cout << "🔧 TEST 1: SIMPLE TREE" << endl;
    TreeNode* tree1 = createSampleTree();
    cout << "Tree structure:" << endl;
    traversal.printTree(tree1);
    
    vector<vector<int>> result1 = traversal.levelOrder(tree1);
    cout << "\\nFinal result: [";
    for (int i = 0; i < result1.size(); i++) {
        cout << "[";
        for (int j = 0; j < result1[i].size(); j++) {
            cout << result1[i][j];
            if (j < result1[i].size() - 1) cout << ", ";
        }
        cout << "]";
        if (i < result1.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    // Test 2: Complex tree
    cout << "\\n" << string(60, '=') << endl;
    cout << "🔧 TEST 2: COMPLEX TREE" << endl;
    TreeNode* tree2 = createComplexTree();
    cout << "Tree structure:" << endl;
    traversal.printTree(tree2);
    
    vector<vector<int>> result2 = traversal.levelOrder(tree2);
    traversal.zigzagLevelOrder(tree2);
    
    cout << "\\n📊 APPLICATIONS:" << endl;
    cout << "✅ Print tree level by level" << endl;
    cout << "✅ Find tree width (max nodes per level)" << endl;
    cout << "✅ Serialize/deserialize trees" << endl;
    cout << "✅ Find minimum depth" << endl;
    cout << "✅ Connect nodes at same level" << endl;
    
    cout << "\\n🎯 COMPLEXITY ANALYSIS:" << endl;
    cout << "Time: O(n) - visit each node once" << endl;
    cout << "Space: O(w) - where w is max width of tree" << endl;
    cout << "Queue size never exceeds the maximum width!" << endl;
    
    return 0;
}`
            }
        ],
        stl: [
            {
                title: 'STL Overview - Standard Template Library',
                description: '🛠️ Complete guide to C++ STL containers and their built-in functions for efficient data structure operations!',
                code: `// 🛠️ C++ STL (Standard Template Library) Overview
// The STL provides powerful, ready-to-use data structures and algorithms

#include <iostream>
#include <vector>       // Dynamic array
#include <list>         // Doubly linked list  
#include <deque>        // Double-ended queue
#include <stack>        // LIFO container adapter
#include <queue>        // FIFO container adapter
#include <priority_queue>  // Heap-based priority queue
#include <set>          // Sorted unique elements
#include <map>          // Key-value pairs (sorted)
#include <unordered_set>   // Hash-based unique elements
#include <unordered_map>   // Hash-based key-value pairs
#include <array>        // Fixed-size array
#include <string>       // String container
#include <algorithm>    // STL algorithms
using namespace std;

int main() {
    cout << "=== 🛠️ STL DATA STRUCTURES OVERVIEW ===" << endl;
    cout << "The Standard Template Library provides efficient, tested data structures!" << endl << endl;
    
    // 1. SEQUENCE CONTAINERS (Linear data structures)
    cout << "📊 SEQUENCE CONTAINERS:" << endl;
    cout << "  vector    - Dynamic array (most commonly used)" << endl;
    cout << "  list      - Doubly linked list" << endl;
    cout << "  deque     - Double-ended queue" << endl;
    cout << "  array     - Fixed-size array wrapper" << endl;
    cout << "  string    - Specialized character container" << endl << endl;
    
    // 2. ASSOCIATIVE CONTAINERS (Sorted collections)
    cout << "🗂️ ASSOCIATIVE CONTAINERS (Automatically sorted):" << endl;
    cout << "  set       - Unique elements (like mathematical set)" << endl;
    cout << "  multiset  - Allows duplicate elements" << endl;
    cout << "  map       - Key-value pairs (dictionary)" << endl;
    cout << "  multimap  - Allows duplicate keys" << endl << endl;
    
    // 3. UNORDERED CONTAINERS (Hash-based for O(1) operations)
    cout << "⚡ UNORDERED CONTAINERS (Hash tables - super fast!):" << endl;
    cout << "  unordered_set     - Hash set" << endl;
    cout << "  unordered_multiset - Hash set with duplicates" << endl;
    cout << "  unordered_map     - Hash map (dictionary)" << endl;
    cout << "  unordered_multimap - Hash map with duplicate keys" << endl << endl;
    
    // 4. CONTAINER ADAPTERS (Built on top of other containers)
    cout << "🔧 CONTAINER ADAPTERS:" << endl;
    cout << "  stack          - LIFO (Last In, First Out)" << endl;
    cout << "  queue          - FIFO (First In, First Out)" << endl;
    cout << "  priority_queue - Heap-based priority queue" << endl << endl;
    
    // 5. WHY USE STL?
    cout << "🌟 WHY USE STL?" << endl;
    cout << "✅ Pre-tested and optimized implementations" << endl;
    cout << "✅ Consistent interface across containers" << endl;
    cout << "✅ Template-based (works with any data type)" << endl;
    cout << "✅ Powerful algorithms (sort, search, etc.)" << endl;
    cout << "✅ Industry standard - used everywhere!" << endl;
    cout << "✅ Saves development time and reduces bugs" << endl << endl;
    
    // Quick demonstration of common operations
    cout << "🚀 QUICK DEMO - Common Operations:" << endl;
    
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Vector: ";
    for (int n : numbers) cout << n << " ";
    cout << "| Size: " << numbers.size() << endl;
    
    set<string> uniqueWords = {"hello", "world", "STL", "amazing"};
    cout << "Set: ";
    for (const string& word : uniqueWords) cout << word << " ";
    cout << "| Size: " << uniqueWords.size() << endl;
    
    map<string, int> grades = {{"Alice", 95}, {"Bob", 87}, {"Charlie", 92}};
    cout << "Map: ";
    for (const auto& pair : grades) cout << pair.first << ":" << pair.second << " ";
    cout << "| Size: " << grades.size() << endl;
    
    cout << "\\n🎯 Ready to explore each container in detail!" << endl;
    
    return 0;
}`
            },
            {
                title: 'Vector - Dynamic Array Mastery',
                description: '📊 Master std::vector - the most important STL container with all essential operations!',
                code: `// 📊 std::vector - Complete Guide with All Operations
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    cout << "=== 📊 VECTOR COMPLETE GUIDE ===" << endl;
    cout << "Vector = Dynamic array that can grow and shrink automatically\\n" << endl;
    
    // 1. CREATING VECTORS
    cout << "1️⃣ CREATING VECTORS:" << endl;
    vector<int> empty_vec;                     // Empty vector
    vector<int> sized_vec(5);                  // 5 elements, all 0
    vector<int> init_vec(5, 10);              // 5 elements, all 10
    vector<int> list_vec = {1, 2, 3, 4, 5};   // Initializer list
    vector<int> copy_vec(list_vec);            // Copy constructor
    
    cout << "Created vectors with different initialization methods" << endl;
    cout << "list_vec: ";
    for (int x : list_vec) cout << x << " ";
    cout << "\\n" << endl;
    
    // 2. BASIC OPERATIONS
    cout << "2️⃣ BASIC OPERATIONS:" << endl;
    vector<string> fruits = {"apple", "banana"};
    
    // Adding elements
    fruits.push_back("orange");               // Add to end
    fruits.emplace_back("grape");             // Construct in place (more efficient)
    fruits.insert(fruits.begin() + 1, "mango"); // Insert at position
    
    cout << "After adding elements: ";
    for (const string& fruit : fruits) cout << fruit << " ";
    cout << endl;
    
    // Accessing elements
    cout << "First fruit: " << fruits[0] << " (using [])" << endl;
    cout << "Last fruit: " << fruits.at(fruits.size()-1) << " (using at())" << endl;
    cout << "Front: " << fruits.front() << ", Back: " << fruits.back() << endl;
    
    // Size and capacity
    cout << "Size: " << fruits.size() << ", Capacity: " << fruits.capacity() << endl;
    cout << "Empty? " << (fruits.empty() ? "Yes" : "No") << endl << endl;
    
    // 3. MODIFYING OPERATIONS
    cout << "3️⃣ MODIFYING OPERATIONS:" << endl;
    vector<int> numbers = {10, 20, 30, 40, 50};
    
    cout << "Original: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    // Remove elements
    numbers.pop_back();                        // Remove last element
    numbers.erase(numbers.begin() + 1);        // Remove element at index 1
    numbers.erase(numbers.begin(), numbers.begin() + 2); // Remove range
    
    cout << "After removals: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    // Clear and assign
    numbers.clear();                           // Remove all elements
    numbers.assign(4, 100);                    // Assign 4 elements with value 100
    cout << "After assign(4, 100): ";
    for (int n : numbers) cout << n << " ";
    cout << "\\n" << endl;
    
    // 4. ITERATORS AND ALGORITHMS
    cout << "4️⃣ ITERATORS AND ALGORITHMS:" << endl;
    vector<int> data = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "Original data: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    
    // Sorting
    sort(data.begin(), data.end());
    cout << "After sort(): ";
    for (int x : data) cout << x << " ";
    cout << endl;
    
    // Searching
    auto it = find(data.begin(), data.end(), 25);
    if (it != data.end()) {
        cout << "Found 25 at position: " << (it - data.begin()) << endl;
    }
    
    // Binary search (requires sorted data)
    bool found = binary_search(data.begin(), data.end(), 34);
    cout << "Binary search for 34: " << (found ? "Found" : "Not found") << endl;
    
    // Min and max elements
    auto min_it = min_element(data.begin(), data.end());
    auto max_it = max_element(data.begin(), data.end());
    cout << "Min: " << *min_it << ", Max: " << *max_it << endl << endl;
    
    // 5. ADVANCED OPERATIONS
    cout << "5️⃣ ADVANCED OPERATIONS:" << endl;
    vector<int> vec1 = {1, 3, 5, 7, 9};
    vector<int> vec2 = {2, 4, 6, 8, 10};
    
    // Reverse
    reverse(vec1.begin(), vec1.end());
    cout << "Reversed vec1: ";
    for (int x : vec1) cout << x << " ";
    cout << endl;
    
    // Merge sorted vectors
    vector<int> merged;
    merged.reserve(vec1.size() + vec2.size());  // Reserve space for efficiency
    merge(vec1.begin(), vec1.end(), vec2.begin(), vec2.end(), back_inserter(merged));
    cout << "Merged vectors: ";
    for (int x : merged) cout << x << " ";
    cout << endl;
    
    // Remove duplicates
    sort(merged.begin(), merged.end());
    auto unique_end = unique(merged.begin(), merged.end());
    merged.erase(unique_end, merged.end());
    cout << "After removing duplicates: ";
    for (int x : merged) cout << x << " ";
    cout << "\\n" << endl;
    
    // 6. PERFORMANCE TIPS
    cout << "6️⃣ PERFORMANCE TIPS:" << endl;
    cout << "✅ Use reserve() when you know approximate size" << endl;
    cout << "✅ Use emplace_back() instead of push_back() for complex objects" << endl;
    cout << "✅ Use shrink_to_fit() to reduce memory after many deletions" << endl;
    cout << "✅ Prefer range-based for loops for iteration" << endl;
    cout << "✅ Use at() for bounds checking in debug, [] for performance" << endl << endl;
    
    // 7. COMMON METHODS SUMMARY
    cout << "7️⃣ ALL VECTOR METHODS SUMMARY:" << endl;
    cout << "📥 Adding: push_back(), emplace_back(), insert(), assign()" << endl;
    cout << "📤 Removing: pop_back(), erase(), clear()" << endl;
    cout << "🔍 Access: [], at(), front(), back(), data()" << endl;
    cout << "📏 Size: size(), capacity(), empty(), max_size()" << endl;
    cout << "🔧 Modify: resize(), reserve(), shrink_to_fit()" << endl;
    cout << "🔄 Iterators: begin(), end(), rbegin(), rend()" << endl;
    cout << "⚙️ Comparison: ==, !=, <, <=, >, >=" << endl;
    
    return 0;
}`
            },
            {
                title: 'List & Deque - Advanced Sequence Containers',
                description: '🔗 Explore std::list (doubly linked) and std::deque (double-ended queue) with all operations!',
                code: `// 🔗 std::list and std::deque - Advanced Sequence Containers
#include <iostream>
#include <list>
#include <deque>
#include <algorithm>
using namespace std;

int main() {
    cout << "=== 🔗 LIST & DEQUE COMPLETE GUIDE ===" << endl << endl;
    
    // PART 1: std::list (Doubly Linked List)
    cout << "📋 PART 1: std::list (Doubly Linked List)" << endl;
    cout << "✅ Fast insertion/deletion anywhere" << endl;
    cout << "❌ No random access (no [] operator)" << endl;
    cout << "❌ More memory overhead per element\\n" << endl;
    
    // 1. LIST CREATION AND BASIC OPERATIONS
    cout << "1️⃣ LIST BASIC OPERATIONS:" << endl;
    list<int> numbers = {10, 20, 30, 40, 50};
    
    cout << "Original list: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    // Adding elements
    numbers.push_front(5);         // Add to beginning
    numbers.push_back(60);         // Add to end
    numbers.emplace_front(1);      // Construct at beginning
    numbers.emplace_back(70);      // Construct at end
    
    cout << "After push operations: ";
    for (int n : numbers) cout << n << " ";
    cout << endl;
    
    // Insert at specific position
    auto it = numbers.begin();
    advance(it, 3);                // Move iterator 3 positions
    numbers.insert(it, 25);        // Insert 25 at position
    
    cout << "After insert at position 3: ";
    for (int n : numbers) cout << n << " ";
    cout << "\\n" << endl;
    
    // 2. LIST UNIQUE OPERATIONS
    cout << "2️⃣ LIST UNIQUE OPERATIONS:" << endl;
    list<int> list1 = {1, 3, 5, 7, 9};
    list<int> list2 = {2, 4, 6, 8, 10};
    
    cout << "List1: ";
    for (int n : list1) cout << n << " ";
    cout << endl;
    cout << "List2: ";
    for (int n : list2) cout << n << " ";
    cout << endl;
    
    // Merge sorted lists
    list1.merge(list2);            // Merge list2 into list1 (both must be sorted)
    cout << "After merge: ";
    for (int n : list1) cout << n << " ";
    cout << endl;
    
    // Splice (move elements from another list)
    list<int> source = {100, 200, 300};
    auto splice_pos = list1.begin();
    advance(splice_pos, 2);
    list1.splice(splice_pos, source);  // Move all elements from source
    
    cout << "After splice: ";
    for (int n : list1) cout << n << " ";
    cout << endl;
    
    // Remove elements
    list1.remove(100);             // Remove all occurrences of 100
    list1.remove_if([](int x) { return x > 50; }); // Remove using predicate
    
    cout << "After remove operations: ";
    for (int n : list1) cout << n << " ";
    cout << "\\n" << endl;
    
    // 3. LIST SORTING AND UNIQUENESS
    cout << "3️⃣ LIST SORTING AND UNIQUENESS:" << endl;
    list<int> unsorted = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
    
    cout << "Unsorted: ";
    for (int n : unsorted) cout << n << " ";
    cout << endl;
    
    unsorted.sort();               // Sort the list
    cout << "Sorted: ";
    for (int n : unsorted) cout << n << " ";
    cout << endl;
    
    unsorted.unique();             // Remove consecutive duplicates
    cout << "After unique(): ";
    for (int n : unsorted) cout << n << " ";
    cout << "\\n" << endl;
    
    // PART 2: std::deque (Double-Ended Queue)
    cout << "📊 PART 2: std::deque (Double-Ended Queue)" << endl;
    cout << "✅ Fast insertion/deletion at both ends" << endl;
    cout << "✅ Random access with [] operator" << endl;
    cout << "✅ Good compromise between vector and list\\n" << endl;
    
    // 4. DEQUE BASIC OPERATIONS
    cout << "4️⃣ DEQUE BASIC OPERATIONS:" << endl;
    deque<string> words = {"middle", "content"};
    
    cout << "Original deque: ";
    for (const string& word : words) cout << word << " ";
    cout << endl;
    
    // Add to both ends
    words.push_front("first");     // Add to beginning
    words.push_back("last");       // Add to end
    words.emplace_front("very");   // Construct at beginning
    words.emplace_back("word");    // Construct at end
    
    cout << "After push operations: ";
    for (const string& word : words) cout << word << " ";
    cout << endl;
    
    // Random access (like vector)
    cout << "Element at index 2: " << words[2] << endl;
    cout << "Element at index 3: " << words.at(3) << endl;
    cout << "Front: " << words.front() << ", Back: " << words.back() << endl;
    
    // Remove from both ends
    words.pop_front();             // Remove first element
    words.pop_back();              // Remove last element
    
    cout << "After pop operations: ";
    for (const string& word : words) cout << word << " ";
    cout << "\\n" << endl;
    
    // 5. DEQUE VS VECTOR VS LIST COMPARISON
    cout << "5️⃣ PERFORMANCE COMPARISON:" << endl;
    cout << "┌─────────────────┬─────────┬─────────┬──────────┐" << endl;
    cout << "│ Operation       │ vector  │  deque  │   list   │" << endl;
    cout << "├─────────────────┼─────────┼─────────┼──────────┤" << endl;
    cout << "│ Random Access   │  O(1)   │  O(1)   │   O(n)   │" << endl;
    cout << "│ Insert/Del End  │  O(1)   │  O(1)   │   O(1)   │" << endl;
    cout << "│ Insert/Del Begin│  O(n)   │  O(1)   │   O(1)   │" << endl;
    cout << "│ Insert/Del Mid  │  O(n)   │  O(n)   │   O(1)   │" << endl;
    cout << "│ Memory Usage    │  Low    │ Medium  │   High   │" << endl;
    cout << "└─────────────────┴─────────┴─────────┴──────────┘" << endl << endl;
    
    // 6. WHEN TO USE EACH
    cout << "6️⃣ WHEN TO USE EACH CONTAINER:" << endl;
    cout << "🎯 Use vector when:" << endl;
    cout << "   • You need random access" << endl;
    cout << "   • Mostly adding/removing at the end" << endl;
    cout << "   • Memory efficiency is important" << endl << endl;
    
    cout << "🎯 Use deque when:" << endl;
    cout << "   • You need random access" << endl;
    cout << "   • Adding/removing at both ends" << endl;
    cout << "   • Don't care about memory locality" << endl << endl;
    
    cout << "🎯 Use list when:" << endl;
    cout << "   • Frequent insertion/deletion in middle" << endl;
    cout << "   • Don't need random access" << endl;
    cout << "   • Need stable iterators" << endl << endl;
    
    // 7. ALL METHODS SUMMARY
    cout << "7️⃣ METHOD SUMMARY:" << endl;
    cout << "LIST UNIQUE METHODS:" << endl;
    cout << "  merge(), splice(), remove(), remove_if()" << endl;
    cout << "  sort(), unique(), reverse()" << endl << endl;
    
    cout << "DEQUE METHODS (similar to vector + front operations):" << endl;
    cout << "  push_front(), pop_front(), emplace_front()" << endl;
    cout << "  All vector methods except reserve(), capacity()" << endl;
    
    return 0;
}`
            },
            {
                title: 'Sets & Maps - Associative Containers',
                description: '🗂️ Master std::set, std::map and their variants - automatically sorted containers with powerful operations!',
                code: `// 🗂️ std::set, std::map, std::multiset, std::multimap - Complete Guide
#include <iostream>
#include <set>
#include <map>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    cout << "=== 🗂️ ASSOCIATIVE CONTAINERS GUIDE ===" << endl;
    cout << "Automatically sorted containers using balanced binary search trees" << endl << endl;
    
    // PART 1: std::set (Unique sorted elements)
    cout << "📚 PART 1: std::set (Unique Sorted Elements)" << endl;
    cout << "✅ Automatically sorted" << endl;
    cout << "✅ No duplicates allowed" << endl;
    cout << "✅ O(log n) insert, delete, search\\n" << endl;
    
    // 1. SET BASIC OPERATIONS
    cout << "1️⃣ SET BASIC OPERATIONS:" << endl;
    set<int> numbers;
    
    // Insert elements
    numbers.insert(30);
    numbers.insert(10);
    numbers.insert(50);
    numbers.insert(20);
    numbers.insert(30);        // Duplicate - will be ignored
    
    cout << "Set after insertions: ";
    for (int n : numbers) cout << n << " ";
    cout << " (automatically sorted!)" << endl;
    
    // Check if element exists
    if (numbers.find(20) != numbers.end()) {
        cout << "Found 20 in the set" << endl;
    }
    
    // Count occurrences (always 0 or 1 for set)
    cout << "Count of 30: " << numbers.count(30) << endl;
    cout << "Count of 100: " << numbers.count(100) << endl;
    
    // Remove elements
    numbers.erase(20);         // Remove by value
    auto it = numbers.find(30);
    if (it != numbers.end()) {
        numbers.erase(it);     // Remove by iterator
    }
    
    cout << "After removal: ";
    for (int n : numbers) cout << n << " ";
    cout << "\\n" << endl;
    
    // 2. SET ADVANCED OPERATIONS
    cout << "2️⃣ SET ADVANCED OPERATIONS:" << endl;
    set<string> words = {"banana", "apple", "cherry", "date", "elderberry"};
    
    cout << "Words set: ";
    for (const string& word : words) cout << word << " ";
    cout << endl;
    
    // Range operations
    auto lower = words.lower_bound("c");  // First element >= "c"
    auto upper = words.upper_bound("d");  // First element > "d"
    
    cout << "Elements from 'c' to 'd': ";
    for (auto it = lower; it != upper; ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    // Equal range
    auto range = words.equal_range("cherry");
    cout << "Equal range for 'cherry': ";
    for (auto it = range.first; it != range.second; ++it) {
        cout << *it << " ";
    }
    cout << "\\n" << endl;
    
    // PART 2: std::multiset (Allows duplicates)
    cout << "📚 PART 2: std::multiset (Allows Duplicates)" << endl;
    multiset<int> multi_nums = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
    
    cout << "Multiset: ";
    for (int n : multi_nums) cout << n << " ";
    cout << " (sorted with duplicates)" << endl;
    
    cout << "Count of 1: " << multi_nums.count(1) << endl;
    cout << "Count of 5: " << multi_nums.count(5) << endl;
    
    // Remove all occurrences of a value
    multi_nums.erase(1);
    cout << "After erasing all 1s: ";
    for (int n : multi_nums) cout << n << " ";
    cout << "\\n" << endl;
    
    // PART 3: std::map (Key-Value pairs, sorted by key)
    cout << "🗺️ PART 3: std::map (Key-Value Dictionary, Sorted)" << endl;
    cout << "✅ Key-value pairs" << endl;
    cout << "✅ Sorted by key" << endl;
    cout << "✅ Unique keys only\\n" << endl;
    
    // 3. MAP BASIC OPERATIONS
    cout << "3️⃣ MAP BASIC OPERATIONS:" << endl;
    map<string, int> grades;
    
    // Insert key-value pairs
    grades["Alice"] = 95;              // Using [] operator
    grades["Bob"] = 87;
    grades.insert({"Charlie", 92});    // Using insert
    grades.emplace("Diana", 89);       // Using emplace
    
    cout << "Student grades:" << endl;
    for (const auto& pair : grades) {
        cout << "  " << pair.first << ": " << pair.second << endl;
    }
    
    // Access and modify
    cout << "Alice's grade: " << grades["Alice"] << endl;
    cout << "Bob's grade: " << grades.at("Bob") << endl;
    
    grades["Alice"] = 98;              // Update existing
    cout << "Alice's updated grade: " << grades["Alice"] << endl;
    
    // Check if key exists
    if (grades.find("Eve") == grades.end()) {
        cout << "Eve not found in grades" << endl;
    }
    
    // Safe access with find
    auto it_find = grades.find("Charlie");
    if (it_find != grades.end()) {
        cout << "Charlie's grade: " << it_find->second << endl;
    }
    cout << endl;
    
    // 4. MAP ADVANCED OPERATIONS
    cout << "4️⃣ MAP ADVANCED OPERATIONS:" << endl;
    map<int, string> id_to_name = {
        {101, "John"}, {102, "Jane"}, {103, "Jack"}, {104, "Jill"}
    };
    
    cout << "ID to Name mapping:" << endl;
    for (const auto& [id, name] : id_to_name) {  // C++17 structured binding
        cout << "  ID " << id << ": " << name << endl;
    }
    
    // Range operations
    auto lower_map = id_to_name.lower_bound(102);
    auto upper_map = id_to_name.upper_bound(103);
    
    cout << "IDs from 102 to 103:" << endl;
    for (auto it = lower_map; it != upper_map; ++it) {
        cout << "  ID " << it->first << ": " << it->second << endl;
    }
    cout << endl;
    
    // PART 4: std::multimap (Allows duplicate keys)
    cout << "🗺️ PART 4: std::multimap (Allows Duplicate Keys)" << endl;
    multimap<string, string> contacts;
    
    // Multiple phone numbers per person
    contacts.insert({"John", "555-1234"});
    contacts.insert({"John", "555-5678"});
    contacts.insert({"Jane", "555-9012"});
    contacts.insert({"John", "555-3456"});
    
    cout << "Contact list:" << endl;
    for (const auto& [name, phone] : contacts) {
        cout << "  " << name << ": " << phone << endl;
    }
    
    // Find all phone numbers for a person
    cout << "\\nAll numbers for John:" << endl;
    auto range = contacts.equal_range("John");
    for (auto it = range.first; it != range.second; ++it) {
        cout << "  " << it->second << endl;
    }
    cout << endl;
    
    // 5. CUSTOM COMPARATOR EXAMPLE
    cout << "5️⃣ CUSTOM COMPARATOR EXAMPLE:" << endl;
    
    // Set with custom comparator (descending order)
    set<int, greater<int>> desc_set = {3, 1, 4, 1, 5, 9, 2, 6};
    cout << "Descending set: ";
    for (int n : desc_set) cout << n << " ";
    cout << endl;
    
    // Map with custom comparator for string length
    auto length_compare = [](const string& a, const string& b) {
        return a.length() < b.length();
    };
    map<string, int, decltype(length_compare)> length_map(length_compare);
    
    length_map["Hi"] = 1;
    length_map["Hello"] = 2;
    length_map["A"] = 3;
    length_map["World"] = 4;
    
    cout << "Map sorted by string length:" << endl;
    for (const auto& [word, value] : length_map) {
        cout << "  " << word << " (length " << word.length() << "): " << value << endl;
    }
    cout << endl;
    
    // 6. PERFORMANCE AND WHEN TO USE
    cout << "6️⃣ PERFORMANCE & USAGE GUIDE:" << endl;
    cout << "┌─────────────────┬──────────┬──────────┬─────────┐" << endl;
    cout << "│ Operation       │   set    │   map    │  Time   │" << endl;
    cout << "├─────────────────┼──────────┼──────────┼─────────┤" << endl;
    cout << "│ Insert          │ O(log n) │ O(log n) │  Fast   │" << endl;
    cout << "│ Delete          │ O(log n) │ O(log n) │  Fast   │" << endl;
    cout << "│ Search/Find     │ O(log n) │ O(log n) │  Fast   │" << endl;
    cout << "│ Iteration       │  O(n)    │  O(n)    │ Sorted  │" << endl;
    cout << "└─────────────────┴──────────┴──────────┴─────────┘" << endl << endl;
    
    cout << "🎯 USE CASES:" << endl;
    cout << "set/multiset: Unique sorted collections, mathematical sets" << endl;
    cout << "map/multimap: Dictionaries, lookup tables, databases" << endl;
    cout << "All: When you need automatic sorting and O(log n) operations" << endl;
    
    return 0;
}`
            },
            {
                title: 'Unordered Containers - Hash Tables',
                description: '⚡ Master std::unordered_set and std::unordered_map - super-fast hash-based containers with O(1) operations!',
                code: `// ⚡ std::unordered_set, std::unordered_map - Hash-based Containers
#include <iostream>
#include <unordered_set>
#include <unordered_map>
#include <string>
#include <vector>
using namespace std;

int main() {
    cout << "=== ⚡ UNORDERED CONTAINERS (HASH TABLES) ===" << endl;
    cout << "Super-fast containers using hash tables for O(1) operations!" << endl << endl;
    
    // PART 1: std::unordered_set (Hash Set)
    cout << "🔥 PART 1: std::unordered_set (Hash Set)" << endl;
    cout << "✅ Average O(1) insert, delete, search" << endl;
    cout << "✅ No automatic sorting" << endl;
    cout << "✅ Unique elements only\\n" << endl;
    
    // 1. UNORDERED_SET BASIC OPERATIONS
    cout << "1️⃣ UNORDERED_SET OPERATIONS:" << endl;
    unordered_set<string> unique_words;
    
    // Insert elements
    unique_words.insert("hello");
    unique_words.insert("world");
    unique_words.insert("hash");
    unique_words.insert("table");
    unique_words.insert("hello");    // Duplicate ignored
    
    cout << "Unordered set contents: ";
    for (const string& word : unique_words) {
        cout << word << " ";
    }
    cout << " (order not guaranteed)" << endl;
    
    // Fast lookups
    cout << "Contains 'hello': " << (unique_words.count("hello") > 0) << endl;
    cout << "Contains 'cpp': " << (unique_words.count("cpp") > 0) << endl;
    
    // Find element
    auto it = unique_words.find("world");
    if (it != unique_words.end()) {
        cout << "Found: " << *it << endl;
    }
    
    // Remove elements
    unique_words.erase("hash");
    cout << "After erasing 'hash', size: " << unique_words.size() << endl;
    cout << endl;
    
    // 2. HASH PERFORMANCE ANALYSIS
    cout << "2️⃣ HASH PERFORMANCE ANALYSIS:" << endl;
    unordered_set<int> numbers;
    
    // Insert many elements
    for (int i = 1; i <= 1000; ++i) {
        numbers.insert(i);
    }
    
    cout << "Hash set with 1000 elements:" << endl;
    cout << "  Size: " << numbers.size() << endl;
    cout << "  Bucket count: " << numbers.bucket_count() << endl;
    cout << "  Load factor: " << numbers.load_factor() << endl;
    cout << "  Max load factor: " << numbers.max_load_factor() << endl;
    
    // Bucket information
    cout << "  Elements in bucket 0: " << numbers.bucket_size(0) << endl;
    cout << "  Which bucket contains 500: " << numbers.bucket(500) << endl;
    cout << endl;
    
    // PART 2: std::unordered_map (Hash Map/Dictionary)
    cout << "🗺️ PART 2: std::unordered_map (Hash Map)" << endl;
    cout << "✅ Key-value pairs with O(1) access" << endl;
    cout << "✅ Perfect for dictionaries and caches\\n" << endl;
    
    // 3. UNORDERED_MAP BASIC OPERATIONS
    cout << "3️⃣ UNORDERED_MAP OPERATIONS:" << endl;
    unordered_map<string, int> word_count;
    
    // Count word frequencies
    vector<string> text = {"the", "quick", "brown", "fox", "jumps", "over", 
                          "the", "lazy", "dog", "the", "quick", "fox"};
    
    cout << "Counting word frequencies in text..." << endl;
    for (const string& word : text) {
        word_count[word]++;        // Increment count (creates if doesn't exist)
    }
    
    cout << "Word frequencies:" << endl;
    for (const auto& [word, count] : word_count) {
        cout << "  " << word << ": " << count << endl;
    }
    
    // Access methods
    cout << "\\nAccess methods:" << endl;
    cout << "  word_count[\\"the\\"]: " << word_count["the"] << endl;
    cout << "  word_count.at(\\"fox\\"): " << word_count.at("fox") << endl;
    
    // Safe access with find
    auto find_it = word_count.find("elephant");
    if (find_it != word_count.end()) {
        cout << "  Found elephant: " << find_it->second << endl;
    } else {
        cout << "  'elephant' not found" << endl;
    }
    cout << endl;
    
    // 4. ADVANCED HASH MAP OPERATIONS
    cout << "4️⃣ ADVANCED OPERATIONS:" << endl;
    unordered_map<int, string> employee_names = {
        {101, "Alice"}, {102, "Bob"}, {103, "Charlie"}
    };
    
    // Insert with different methods
    employee_names[104] = "Diana";              // Using [] operator
    employee_names.insert({105, "Eve"});        // Using insert
    employee_names.emplace(106, "Frank");       // Using emplace
    
    // Try to insert with hint for efficiency
    auto result = employee_names.insert({107, "Grace"});
    if (result.second) {
        cout << "Successfully inserted Grace" << endl;
    }
    
    // Update existing value
    employee_names[101] = "Alice Smith";        // Update Alice's name
    
    cout << "Employee database:" << endl;
    for (const auto& [id, name] : employee_names) {
        cout << "  ID " << id << ": " << name << endl;
    }
    cout << endl;
    
    // 5. MULTISET AND MULTIMAP VARIANTS
    cout << "5️⃣ MULTI VARIANTS (Allow Duplicates):" << endl;
    
    // unordered_multiset
    unordered_multiset<string> tags = {"cpp", "programming", "hash", "cpp", "fast"};
    cout << "Multiset tags: ";
    for (const string& tag : tags) cout << tag << " ";
    cout << endl;
    cout << "Count of 'cpp': " << tags.count("cpp") << endl;
    
    // unordered_multimap
    unordered_multimap<string, string> phone_book;
    phone_book.insert({"John", "555-1234"});
    phone_book.insert({"John", "555-5678"});
    phone_book.insert({"Jane", "555-9012"});
    
    cout << "\\nPhone book (multimap):" << endl;
    for (const auto& [name, phone] : phone_book) {
        cout << "  " << name << ": " << phone << endl;
    }
    cout << endl;
    
    // 6. CUSTOM HASH FUNCTION EXAMPLE
    cout << "6️⃣ CUSTOM HASH FUNCTION:" << endl;
    
    // Custom hash for pair<int, int>
    struct PairHash {
        size_t operator()(const pair<int, int>& p) const {
            return hash<int>{}(p.first) ^ (hash<int>{}(p.second) << 1);
        }
    };
    
    unordered_set<pair<int, int>, PairHash> coordinates;
    coordinates.insert({1, 2});
    coordinates.insert({3, 4});
    coordinates.insert({1, 2});    // Duplicate ignored
    
    cout << "Coordinate set with custom hash:" << endl;
    for (const auto& [x, y] : coordinates) {
        cout << "  (" << x << ", " << y << ")" << endl;
    }
    cout << endl;
    
    // 7. PERFORMANCE COMPARISON
    cout << "7️⃣ PERFORMANCE COMPARISON:" << endl;
    cout << "┌─────────────────┬───────────┬─────────────┬──────────┐" << endl;
    cout << "│ Operation       │ unordered │   ordered   │ Best For │" << endl;
    cout << "├─────────────────┼───────────┼─────────────┼──────────┤" << endl;
    cout << "│ Insert          │   O(1)    │   O(log n)  │ Speed    │" << endl;
    cout << "│ Delete          │   O(1)    │   O(log n)  │ Speed    │" << endl;
    cout << "│ Search          │   O(1)    │   O(log n)  │ Speed    │" << endl;
    cout << "│ Iteration       │   O(n)    │    O(n)     │ Order    │" << endl;
    cout << "│ Memory Usage    │  Higher   │   Lower     │ Memory   │" << endl;
    cout << "│ Order Preserved │    No     │    Yes      │ Sorted   │" << endl;
    cout << "└─────────────────┴───────────┴─────────────┴──────────┘" << endl << endl;
    
    // 8. WHEN TO USE EACH
    cout << "8️⃣ WHEN TO USE EACH:" << endl;
    cout << "🚀 Use unordered containers when:" << endl;
    cout << "   • Need fastest possible lookup/insertion" << endl;
    cout << "   • Don't need sorted order" << endl;
    cout << "   • Have good hash function" << endl;
    cout << "   • Memory usage not critical" << endl << endl;
    
    cout << "🎯 Use ordered containers when:" << endl;
    cout << "   • Need sorted iteration" << endl;
    cout << "   • Need range queries" << endl;
    cout << "   • Memory efficiency important" << endl;
    cout << "   • Predictable performance required" << endl << endl;
    
    // 9. HASH CONTAINER METHODS SUMMARY
    cout << "9️⃣ HASH CONTAINER METHODS:" << endl;
    cout << "Basic: insert(), erase(), find(), count(), clear()" << endl;
    cout << "Hash info: bucket_count(), load_factor(), rehash()" << endl;
    cout << "Capacity: size(), empty(), max_size()" << endl;
    cout << "Hash policy: max_load_factor(), rehash(), reserve()" << endl;
    
    return 0;
}`
            },
            {
                title: 'Container Adapters - Stack, Queue, Priority Queue',
                description: '🔧 Master container adapters - stack, queue, and priority_queue built on top of other containers!',
                code: `// 🔧 Container Adapters: stack, queue, priority_queue
#include <iostream>
#include <stack>
#include <queue>
#include <priority_queue>
#include <vector>
#include <deque>
#include <string>
using namespace std;

int main() {
    cout << "=== 🔧 CONTAINER ADAPTERS COMPLETE GUIDE ===" << endl;
    cout << "Specialized interfaces built on top of sequence containers" << endl << endl;
    
    // PART 1: std::stack (LIFO - Last In, First Out)
    cout << "📚 PART 1: std::stack (LIFO Container)" << endl;
    cout << "✅ Last In, First Out access" << endl;
    cout << "✅ Built on deque by default" << endl;
    cout << "✅ Perfect for undo operations, expression evaluation\\n" << endl;
    
    // 1. STACK BASIC OPERATIONS
    cout << "1️⃣ STACK BASIC OPERATIONS:" << endl;
    stack<string> book_stack;
    
    // Push elements (add to top)
    book_stack.push("Foundation");
    book_stack.push("Dune");
    book_stack.push("Neuromancer");
    book_stack.push("Hyperion");
    
    cout << "Stack size: " << book_stack.size() << endl;
    cout << "Top book: " << book_stack.top() << endl;
    
    // Pop elements (remove from top)
    cout << "\\nRemoving books from stack:" << endl;
    while (!book_stack.empty()) {
        cout << "Reading: " << book_stack.top() << endl;
        book_stack.pop();
        cout << "Remaining books: " << book_stack.size() << endl;
    }
    cout << endl;
    
    // 2. STACK WITH DIFFERENT UNDERLYING CONTAINERS
    cout << "2️⃣ STACK WITH DIFFERENT CONTAINERS:" << endl;
    
    // Stack using vector as underlying container
    stack<int, vector<int>> vector_stack;
    vector_stack.push(10);
    vector_stack.push(20);
    vector_stack.push(30);
    cout << "Vector-based stack top: " << vector_stack.top() << endl;
    
    // Stack using deque (default)
    stack<int> deque_stack;  // Same as stack<int, deque<int>>
    deque_stack.push(100);
    deque_stack.push(200);
    cout << "Deque-based stack top: " << deque_stack.top() << endl;
    cout << endl;
    
    // 3. STACK PRACTICAL EXAMPLE - BALANCED PARENTHESES
    cout << "3️⃣ PRACTICAL EXAMPLE - BALANCED PARENTHESES:" << endl;
    
    auto check_balanced = [](const string& expr) {
        stack<char> paren_stack;
        
        for (char c : expr) {
            if (c == '(' || c == '[' || c == '{') {
                paren_stack.push(c);
            } else if (c == ')' || c == ']' || c == '}') {
                if (paren_stack.empty()) return false;
                
                char top = paren_stack.top();
                paren_stack.pop();
                
                if ((c == ')' && top != '(') ||
                    (c == ']' && top != '[') ||
                    (c == '}' && top != '{')) {
                    return false;
                }
            }
        }
        return paren_stack.empty();
    };
    
    vector<string> expressions = {"(a+b)", "([{}])", "(()", "([)]"};
    for (const string& expr : expressions) {
        cout << expr << " is " << (check_balanced(expr) ? "balanced" : "unbalanced") << endl;
    }
    cout << endl;
    
    // PART 2: std::queue (FIFO - First In, First Out)
    cout << "🚶 PART 2: std::queue (FIFO Container)" << endl;
    cout << "✅ First In, First Out access" << endl;
    cout << "✅ Built on deque by default" << endl;
    cout << "✅ Perfect for task scheduling, breadth-first search\\n" << endl;
    
    // 4. QUEUE BASIC OPERATIONS
    cout << "4️⃣ QUEUE BASIC OPERATIONS:" << endl;
    queue<string> customer_queue;
    
    // Push elements (add to back)
    customer_queue.push("Alice");
    customer_queue.push("Bob");
    customer_queue.push("Charlie");
    customer_queue.push("Diana");
    
    cout << "Queue size: " << customer_queue.size() << endl;
    cout << "Front customer: " << customer_queue.front() << endl;
    cout << "Back customer: " << customer_queue.back() << endl;
    
    // Pop elements (remove from front)
    cout << "\\nServing customers:" << endl;
    while (!customer_queue.empty()) {
        cout << "Serving: " << customer_queue.front() << endl;
        customer_queue.pop();
        cout << "Customers waiting: " << customer_queue.size() << endl;
    }
    cout << endl;
    
    // 5. QUEUE PRACTICAL EXAMPLE - TASK SCHEDULER
    cout << "5️⃣ PRACTICAL EXAMPLE - TASK SCHEDULER:" << endl;
    
    struct Task {
        string name;
        int priority;
        Task(string n, int p) : name(n), priority(p) {}
    };
    
    queue<Task> task_queue;
    task_queue.push(Task("Send email", 1));
    task_queue.push(Task("Update website", 2));
    task_queue.push(Task("Backup data", 3));
    
    cout << "Processing tasks in FIFO order:" << endl;
    while (!task_queue.empty()) {
        Task current = task_queue.front();
        task_queue.pop();
        cout << "Executing: " << current.name << " (priority " << current.priority << ")" << endl;
    }
    cout << endl;
    
    // PART 3: std::priority_queue (Heap-based Priority Queue)
    cout << "🔥 PART 3: std::priority_queue (Max Heap by Default)" << endl;
    cout << "✅ Highest priority element always at top" << endl;
    cout << "✅ Built on vector by default" << endl;
    cout << "✅ Perfect for scheduling, graph algorithms\\n" << endl;
    
    // 6. PRIORITY_QUEUE BASIC OPERATIONS
    cout << "6️⃣ PRIORITY_QUEUE BASIC OPERATIONS:" << endl;
    priority_queue<int> max_heap;
    
    // Push elements
    max_heap.push(30);
    max_heap.push(10);
    max_heap.push(50);
    max_heap.push(20);
    max_heap.push(40);
    
    cout << "Priority queue (max heap):" << endl;
    cout << "Size: " << max_heap.size() << endl;
    cout << "Top (highest): " << max_heap.top() << endl;
    
    // Pop elements (always removes highest priority)
    cout << "\\nPopping elements in priority order:" << endl;
    while (!max_heap.empty()) {
        cout << max_heap.top() << " ";
        max_heap.pop();
    }
    cout << endl << endl;
    
    // 7. MIN HEAP (REVERSE PRIORITY)
    cout << "7️⃣ MIN HEAP (Lowest First):" << endl;
    priority_queue<int, vector<int>, greater<int>> min_heap;
    
    min_heap.push(30);
    min_heap.push(10);
    min_heap.push(50);
    min_heap.push(20);
    
    cout << "Min heap - popping smallest first:" << endl;
    while (!min_heap.empty()) {
        cout << min_heap.top() << " ";
        min_heap.pop();
    }
    cout << endl << endl;
    
    // 8. PRIORITY_QUEUE WITH CUSTOM COMPARATOR
    cout << "8️⃣ CUSTOM PRIORITY - TASK SCHEDULING:" << endl;
    
    struct PriorityTask {
        string name;
        int urgency;  // Higher number = more urgent
        int id;
        
        PriorityTask(string n, int u, int i) : name(n), urgency(u), id(i) {}
    };
    
    // Custom comparator - higher urgency has higher priority
    auto task_compare = [](const PriorityTask& a, const PriorityTask& b) {
        if (a.urgency != b.urgency) return a.urgency < b.urgency;  // Higher urgency first
        return a.id > b.id;  // Earlier ID first if same urgency
    };
    
    priority_queue<PriorityTask, vector<PriorityTask>, decltype(task_compare)> 
        priority_tasks(task_compare);
    
    priority_tasks.push(PriorityTask("Regular backup", 2, 1));
    priority_tasks.push(PriorityTask("Fix critical bug", 5, 2));
    priority_tasks.push(PriorityTask("Update documentation", 1, 3));
    priority_tasks.push(PriorityTask("Security patch", 5, 4));
    priority_tasks.push(PriorityTask("Code review", 3, 5));
    
    cout << "Tasks by priority (urgency, then ID):" << endl;
    while (!priority_tasks.empty()) {
        PriorityTask task = priority_tasks.top();
        priority_tasks.pop();
        cout << "Execute: " << task.name << " (urgency: " << task.urgency 
             << ", ID: " << task.id << ")" << endl;
    }
    cout << endl;
    
    // 9. PERFORMANCE COMPARISON
    cout << "9️⃣ PERFORMANCE COMPARISON:" << endl;
    cout << "┌─────────────────┬─────────┬─────────┬──────────────┐" << endl;
    cout << "│ Operation       │  stack  │  queue  │ priority_queue│" << endl;
    cout << "├─────────────────┼─────────┼─────────┼──────────────┤" << endl;
    cout << "│ Push/Insert     │  O(1)   │  O(1)   │   O(log n)   │" << endl;
    cout << "│ Pop/Remove      │  O(1)   │  O(1)   │   O(log n)   │" << endl;
    cout << "│ Top/Front       │  O(1)   │  O(1)   │     O(1)     │" << endl;
    cout << "│ Size/Empty      │  O(1)   │  O(1)   │     O(1)     │" << endl;
    cout << "└─────────────────┴─────────┴─────────┴──────────────┘" << endl << endl;
    
    // 10. WHEN TO USE EACH ADAPTER
    cout << "🔟 WHEN TO USE EACH ADAPTER:" << endl;
    cout << "🥞 Use stack when:" << endl;
    cout << "   • Need LIFO behavior" << endl;
    cout << "   • Implementing undo/redo" << endl;
    cout << "   • Expression evaluation" << endl;
    cout << "   • Depth-first search" << endl << endl;
    
    cout << "🚶 Use queue when:" << endl;
    cout << "   • Need FIFO behavior" << endl;
    cout << "   • Task scheduling" << endl;
    cout << "   • Breadth-first search" << endl;
    cout << "   • Producer-consumer problems" << endl << endl;
    
    cout << "🔥 Use priority_queue when:" << endl;
    cout << "   • Need elements by priority" << endl;
    cout << "   • Implementing Dijkstra's algorithm" << endl;
    cout << "   • Task scheduling with priorities" << endl;
    cout << "   • Finding k largest/smallest elements" << endl << endl;
    
    // 11. ALL METHODS SUMMARY
    cout << "1️⃣1️⃣ ADAPTER METHODS SUMMARY:" << endl;
    cout << "STACK: push(), pop(), top(), empty(), size()" << endl;
    cout << "QUEUE: push(), pop(), front(), back(), empty(), size()" << endl;
    cout << "PRIORITY_QUEUE: push(), pop(), top(), empty(), size()" << endl;
    cout << "Note: No iterators available for adapters!" << endl;
    
    return 0;
}`
            },
            {
                title: 'STL Algorithms & Iterators',
                description: '⚡ Master STL algorithms and iterators - powerful tools that work with all containers!',
                code: `// ⚡ STL Algorithms & Iterators - Complete Guide
#include <iostream>
#include <vector>
#include <list>
#include <algorithm>
#include <numeric>
#include <functional>
#include <iterator>
#include <string>
using namespace std;

int main() {
    cout << "=== ⚡ STL ALGORITHMS & ITERATORS GUIDE ===" << endl;
    cout << "Powerful generic algorithms that work with all containers!" << endl << endl;
    
    // PART 1: Iterator Types and Categories
    cout << "🔄 PART 1: ITERATOR TYPES" << endl;
    cout << "✅ Input Iterator: Read-only, forward only" << endl;
    cout << "✅ Output Iterator: Write-only" << endl;
    cout << "✅ Forward Iterator: Read/write, forward only" << endl;
    cout << "✅ Bidirectional Iterator: Forward + backward" << endl;
    cout << "✅ Random Access Iterator: Jump to any position\\n" << endl;
    
    // 1. BASIC ITERATOR USAGE
    cout << "1️⃣ BASIC ITERATOR USAGE:" << endl;
    vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    cout << "Forward iteration: ";
    for (auto it = numbers.begin(); it != numbers.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    cout << "Reverse iteration: ";
    for (auto it = numbers.rbegin(); it != numbers.rend(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    // Random access iterator features
    auto it = numbers.begin();
    cout << "Element at begin(): " << *it << endl;
    cout << "Element at begin() + 3: " << *(it + 3) << endl;
    cout << "Distance from begin() to end(): " << distance(numbers.begin(), numbers.end()) << endl;
    cout << endl;
    
    // PART 2: Searching Algorithms
    cout << "🔍 PART 2: SEARCHING ALGORITHMS" << endl;
    
    // 2. LINEAR SEARCH ALGORITHMS
    cout << "2️⃣ LINEAR SEARCH:" << endl;
    vector<string> words = {"apple", "banana", "cherry", "date", "elderberry"};
    
    // find() - find first occurrence
    auto found = find(words.begin(), words.end(), "cherry");
    if (found != words.end()) {
        cout << "Found 'cherry' at position: " << distance(words.begin(), found) << endl;
    }
    
    // find_if() - find with predicate
    auto long_word = find_if(words.begin(), words.end(), 
                            [](const string& word) { return word.length() > 6; });
    if (long_word != words.end()) {
        cout << "First long word: " << *long_word << endl;
    }
    
    // count() and count_if()
    vector<int> digits = {1, 2, 3, 2, 4, 2, 5, 6, 2, 7};
    cout << "Count of 2: " << count(digits.begin(), digits.end(), 2) << endl;
    cout << "Count of even numbers: " << 
        count_if(digits.begin(), digits.end(), [](int x) { return x % 2 == 0; }) << endl;
    cout << endl;
    
    // 3. BINARY SEARCH ALGORITHMS (require sorted data)
    cout << "3️⃣ BINARY SEARCH (Sorted Data):" << endl;
    vector<int> sorted_nums = {10, 20, 30, 40, 50, 60, 70, 80, 90};
    
    // binary_search()
    bool exists = binary_search(sorted_nums.begin(), sorted_nums.end(), 50);
    cout << "50 exists: " << (exists ? "Yes" : "No") << endl;
    
    // lower_bound() and upper_bound()
    auto lower = lower_bound(sorted_nums.begin(), sorted_nums.end(), 40);
    auto upper = upper_bound(sorted_nums.begin(), sorted_nums.end(), 40);
    cout << "Lower bound of 40 at index: " << distance(sorted_nums.begin(), lower) << endl;
    cout << "Upper bound of 40 at index: " << distance(sorted_nums.begin(), upper) << endl;
    
    // equal_range()
    auto range = equal_range(sorted_nums.begin(), sorted_nums.end(), 50);
    cout << "Equal range for 50: [" << distance(sorted_nums.begin(), range.first) 
         << ", " << distance(sorted_nums.begin(), range.second) << ")" << endl;
    cout << endl;
    
    // PART 3: Sorting Algorithms
    cout << "📊 PART 3: SORTING ALGORITHMS" << endl;
    
    // 4. SORTING VARIATIONS
    cout << "4️⃣ SORTING VARIATIONS:" << endl;
    vector<int> unsorted = {64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42};
    
    // Basic sort
    vector<int> copy1 = unsorted;
    sort(copy1.begin(), copy1.end());
    cout << "Sorted ascending: ";
    for (int x : copy1) cout << x << " ";
    cout << endl;
    
    // Sort with custom comparator
    vector<int> copy2 = unsorted;
    sort(copy2.begin(), copy2.end(), greater<int>());
    cout << "Sorted descending: ";
    for (int x : copy2) cout << x << " ";
    cout << endl;
    
    // Partial sort - only sort first n elements
    vector<int> copy3 = unsorted;
    partial_sort(copy3.begin(), copy3.begin() + 5, copy3.end());
    cout << "Partial sort (first 5): ";
    for (int x : copy3) cout << x << " ";
    cout << endl;
    
    // nth_element - partition around nth element
    vector<int> copy4 = unsorted;
    nth_element(copy4.begin(), copy4.begin() + 5, copy4.end());
    cout << "After nth_element (5th): ";
    for (int x : copy4) cout << x << " ";
    cout << " (5th element: " << copy4[5] << ")" << endl;
    cout << endl;
    
    // PART 4: Modifying Algorithms
    cout << "✏️ PART 4: MODIFYING ALGORITHMS" << endl;
    
    // 5. TRANSFORMATION ALGORITHMS
    cout << "5️⃣ TRANSFORMATION:" << endl;
    vector<int> source = {1, 2, 3, 4, 5};
    vector<int> squared(source.size());
    
    // transform() - apply function to each element
    transform(source.begin(), source.end(), squared.begin(),
              [](int x) { return x * x; });
    cout << "Original: ";
    for (int x : source) cout << x << " ";
    cout << endl;
    cout << "Squared: ";
    for (int x : squared) cout << x << " ";
    cout << endl;
    
    // for_each() - apply function to each element
    cout << "Doubling each element: ";
    for_each(source.begin(), source.end(), [](int& x) { x *= 2; });
    for (int x : source) cout << x << " ";
    cout << endl;
    cout << endl;
    
    // 6. COPY AND MOVE ALGORITHMS
    cout << "6️⃣ COPY AND MOVE:" << endl;
    vector<int> original = {10, 20, 30, 40, 50};
    vector<int> destination(original.size());
    
    // copy()
    copy(original.begin(), original.end(), destination.begin());
    cout << "Copied: ";
    for (int x : destination) cout << x << " ";
    cout << endl;
    
    // copy_if() - conditional copy
    vector<int> evens;
    copy_if(original.begin(), original.end(), back_inserter(evens),
            [](int x) { return x % 2 == 0; });
    cout << "Even numbers: ";
    for (int x : evens) cout << x << " ";
    cout << endl;
    
    // remove() and remove_if()
    vector<int> with_duplicates = {1, 2, 2, 3, 2, 4, 5, 2, 6};
    cout << "Before remove: ";
    for (int x : with_duplicates) cout << x << " ";
    cout << endl;
    
    auto new_end = remove(with_duplicates.begin(), with_duplicates.end(), 2);
    with_duplicates.erase(new_end, with_duplicates.end());
    cout << "After removing 2s: ";
    for (int x : with_duplicates) cout << x << " ";
    cout << endl;
    cout << endl;
    
    // PART 5: Numeric Algorithms
    cout << "🔢 PART 5: NUMERIC ALGORITHMS" << endl;
    
    // 7. MATHEMATICAL OPERATIONS
    cout << "7️⃣ MATHEMATICAL OPERATIONS:" << endl;
    vector<int> values = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // accumulate() - sum all elements
    int sum = accumulate(values.begin(), values.end(), 0);
    cout << "Sum: " << sum << endl;
    
    // accumulate() with custom operation
    int product = accumulate(values.begin(), values.end(), 1, 
                            [](int a, int b) { return a * b; });
    cout << "Product: " << product << endl;
    
    // inner_product() - dot product
    vector<int> weights = {1, 1, 2, 2, 3, 3, 4, 4, 5, 5};
    int dot_product = inner_product(values.begin(), values.end(), 
                                   weights.begin(), 0);
    cout << "Dot product: " << dot_product << endl;
    
    // partial_sum() - running totals
    vector<int> running_sums(values.size());
    partial_sum(values.begin(), values.end(), running_sums.begin());
    cout << "Running sums: ";
    for (int x : running_sums) cout << x << " ";
    cout << endl;
    cout << endl;
    
    // PART 6: Set Operations (on sorted ranges)
    cout << "📊 PART 6: SET OPERATIONS" << endl;
    
    // 8. SET ALGORITHMS
    cout << "8️⃣ SET ALGORITHMS:" << endl;
    vector<int> set1 = {1, 2, 3, 4, 5};
    vector<int> set2 = {3, 4, 5, 6, 7};
    
    cout << "Set 1: ";
    for (int x : set1) cout << x << " ";
    cout << endl;
    cout << "Set 2: ";
    for (int x : set2) cout << x << " ";
    cout << endl;
    
    // set_union()
    vector<int> union_result;
    set_union(set1.begin(), set1.end(), set2.begin(), set2.end(),
              back_inserter(union_result));
    cout << "Union: ";
    for (int x : union_result) cout << x << " ";
    cout << endl;
    
    // set_intersection()
    vector<int> intersection_result;
    set_intersection(set1.begin(), set1.end(), set2.begin(), set2.end(),
                    back_inserter(intersection_result));
    cout << "Intersection: ";
    for (int x : intersection_result) cout << x << " ";
    cout << endl;
    
    // set_difference()
    vector<int> difference_result;
    set_difference(set1.begin(), set1.end(), set2.begin(), set2.end(),
                  back_inserter(difference_result));
    cout << "Difference (1-2): ";
    for (int x : difference_result) cout << x << " ";
    cout << endl;
    cout << endl;
    
    // PART 7: Heap Operations
    cout << "🔥 PART 7: HEAP OPERATIONS" << endl;
    
    // 9. HEAP ALGORITHMS
    cout << "9️⃣ HEAP ALGORITHMS:" << endl;
    vector<int> heap_data = {4, 1, 3, 2, 16, 9, 10, 14, 8, 7};
    
    cout << "Original: ";
    for (int x : heap_data) cout << x << " ";
    cout << endl;
    
    // make_heap() - create max heap
    make_heap(heap_data.begin(), heap_data.end());
    cout << "Max heap: ";
    for (int x : heap_data) cout << x << " ";
    cout << " (top: " << heap_data.front() << ")" << endl;
    
    // push_heap() - add element to heap
    heap_data.push_back(15);
    push_heap(heap_data.begin(), heap_data.end());
    cout << "After push 15: ";
    for (int x : heap_data) cout << x << " ";
    cout << " (top: " << heap_data.front() << ")" << endl;
    
    // pop_heap() - remove top element
    pop_heap(heap_data.begin(), heap_data.end());
    int popped = heap_data.back();
    heap_data.pop_back();
    cout << "Popped: " << popped << ", remaining: ";
    for (int x : heap_data) cout << x << " ";
    cout << endl;
    
    // sort_heap() - sort the heap
    sort_heap(heap_data.begin(), heap_data.end());
    cout << "Sorted heap: ";
    for (int x : heap_data) cout << x << " ";
    cout << endl;
    cout << endl;
    
    // 10. ALGORITHM COMPLEXITY SUMMARY
    cout << "🔟 ALGORITHM COMPLEXITY SUMMARY:" << endl;
    cout << "┌─────────────────────┬─────────────┬──────────────────┐" << endl;
    cout << "│ Algorithm Type      │ Complexity  │ Example          │" << endl;
    cout << "├─────────────────────┼─────────────┼──────────────────┤" << endl;
    cout << "│ Linear Search       │    O(n)     │ find(), count()  │" << endl;
    cout << "│ Binary Search       │  O(log n)   │ binary_search()  │" << endl;
    cout << "│ Sorting             │ O(n log n)  │ sort()           │" << endl;
    cout << "│ Heap Operations     │  O(log n)   │ push_heap()      │" << endl;
    cout << "│ Linear Transform    │    O(n)     │ transform()      │" << endl;
    cout << "│ Set Operations      │   O(n+m)    │ set_union()      │" << endl;
    cout << "└─────────────────────┴─────────────┴──────────────────┘" << endl << endl;
    
    cout << "🎯 KEY TAKEAWAYS:" << endl;
    cout << "✅ STL algorithms work with iterators, not containers directly" << endl;
    cout << "✅ Most algorithms don't modify container size" << endl;
    cout << "✅ Use remove/erase idiom for actual element removal" << endl;
    cout << "✅ Binary search algorithms require sorted data" << endl;
    cout << "✅ Lambda functions make custom predicates easy" << endl;
    cout << "✅ back_inserter() helps when output size is unknown" << endl;
    
    return 0;
}`
            },
            {
                title: 'String & Array - Special STL Containers',
                description: '📝 Master std::string and std::array - specialized containers for text and fixed-size data!',
                code: `// 📝 std::string and std::array - Special STL Containers
#include <iostream>
#include <string>
#include <array>
#include <algorithm>
#include <sstream>
#include <vector>
using namespace std;

int main() {
    cout << "=== 📝 STRING & ARRAY CONTAINERS ===" << endl;
    cout << "Specialized STL containers for text and fixed-size collections" << endl << endl;
    
    // PART 1: std::string (Dynamic Character Container)
    cout << "📚 PART 1: std::string - Dynamic Text Container" << endl;
    cout << "✅ Dynamic size like vector<char>" << endl;
    cout << "✅ Specialized for text operations" << endl;
    cout << "✅ Rich set of string manipulation functions\\n" << endl;
    
    // 1. STRING CREATION AND BASIC OPERATIONS
    cout << "1️⃣ STRING CREATION:" << endl;
    string empty_str;                              // Empty string
    string hello = "Hello";                        // C-string constructor
    string world("World");                         // C-string constructor
    string repeated(5, 'A');                       // 5 A's: "AAAAA"
    string copied(hello);                          // Copy constructor
    string substring(hello, 1, 3);                // Substring: "ell"
    
    cout << "hello: '" << hello << "'" << endl;
    cout << "repeated: '" << repeated << "'" << endl;
    cout << "substring: '" << substring << "'" << endl;
    cout << "Length of hello: " << hello.length() << endl;
    cout << "Size of hello: " << hello.size() << endl;
    cout << "Capacity: " << hello.capacity() << endl;
    cout << endl;
    
    // 2. STRING MODIFICATION OPERATIONS
    cout << "2️⃣ STRING MODIFICATION:" << endl;
    string text = "Programming";
    
    cout << "Original: '" << text << "'" << endl;
    
    // Append operations
    text += " is";                                 // Append string
    text.append(" awesome!");                      // Append method
    text.push_back('!');                          // Add single character
    
    cout << "After appends: '" << text << "'" << endl;
    
    // Insert operations
    text.insert(0, "C++ ");                       // Insert at position
    text.insert(text.end(), ' ');                 // Insert at end using iterator
    
    cout << "After inserts: '" << text << "'" << endl;
    
    // Replace operations
    text.replace(0, 3, "Python");                 // Replace "C++" with "Python"
    cout << "After replace: '" << text << "'" << endl;
    
    // Erase operations
    text.erase(0, 7);                             // Remove "Python "
    text.pop_back();                              // Remove last character
    
    cout << "After erase: '" << text << "'" << endl;
    cout << endl;
    
    // 3. STRING SEARCHING AND FINDING
    cout << "3️⃣ STRING SEARCHING:" << endl;
    string sentence = "The quick brown fox jumps over the lazy dog";
    
    cout << "Sentence: '" << sentence << "'" << endl;
    
    // Find operations
    size_t pos = sentence.find("fox");
    if (pos != string::npos) {
        cout << "Found 'fox' at position: " << pos << endl;
    }
    
    // Find with starting position
    size_t the_pos = sentence.find("the", 20);    // Find "the" after position 20
    if (the_pos != string::npos) {
        cout << "Found 'the' after pos 20 at: " << the_pos << endl;
    }
    
    // Reverse find
    size_t last_o = sentence.rfind('o');
    cout << "Last 'o' at position: " << last_o << endl;
    
    // Find first/last of character set
    size_t vowel = sentence.find_first_of("aeiou");
    cout << "First vowel at position: " << vowel << " ('" << sentence[vowel] << "')" << endl;
    
    size_t consonant = sentence.find_first_not_of("aeiou ");
    cout << "First consonant at position: " << consonant << " ('" << sentence[consonant] << "')" << endl;
    cout << endl;
    
    // 4. STRING COMPARISON AND OPERATIONS
    cout << "4️⃣ STRING COMPARISON:" << endl;
    string str1 = "apple";
    string str2 = "banana";
    string str3 = "apple";
    
    cout << "str1: '" << str1 << "', str2: '" << str2 << "', str3: '" << str3 << "'" << endl;
    
    // Comparison operators
    cout << "str1 == str3: " << (str1 == str3) << endl;
    cout << "str1 < str2: " << (str1 < str2) << endl;
    cout << "str1 > str2: " << (str1 > str2) << endl;
    
    // Compare method (returns negative, 0, or positive)
    int cmp = str1.compare(str2);
    cout << "str1.compare(str2): " << cmp << " (negative = less than)" << endl;
    cout << endl;
    
    // 5. STRING CONVERSION AND PARSING
    cout << "5️⃣ STRING CONVERSION:" << endl;
    
    // Number to string
    int number = 42;
    double pi = 3.14159;
    string num_str = to_string(number);
    string pi_str = to_string(pi);
    
    cout << "Number " << number << " as string: '" << num_str << "'" << endl;
    cout << "Pi " << pi << " as string: '" << pi_str << "'" << endl;
    
    // String to number
    string age_str = "25";
    string price_str = "19.99";
    
    int age = stoi(age_str);                      // String to int
    double price = stod(price_str);               // String to double
    
    cout << "Age string '" << age_str << "' as int: " << age << endl;
    cout << "Price string '" << price_str << "' as double: " << price << endl;
    cout << endl;
    
    // 6. STRING STREAM OPERATIONS
    cout << "6️⃣ STRING STREAM OPERATIONS:" << endl;
    
    // Building strings with stringstream
    stringstream ss;
    ss << "User: " << "Alice" << ", Age: " << 30 << ", Score: " << 95.5;
    string result = ss.str();
    cout << "Built string: '" << result << "'" << endl;
    
    // Parsing with stringstream
    stringstream parser("apple,banana,cherry");
    string item;
    cout << "Parsed items: ";
    while (getline(parser, item, ',')) {
        cout << "'" << item << "' ";
    }
    cout << endl << endl;
    
    // PART 2: std::array (Fixed-Size Container)
    cout << "🔢 PART 2: std::array - Fixed-Size Container" << endl;
    cout << "✅ Fixed size determined at compile time" << endl;
    cout << "✅ Zero overhead compared to C arrays" << endl;
    cout << "✅ STL algorithms and iterators support\\n" << endl;
    
    // 7. ARRAY CREATION AND ACCESS
    cout << "7️⃣ ARRAY CREATION AND ACCESS:" << endl;
    array<int, 5> numbers = {10, 20, 30, 40, 50};
    array<string, 3> colors = {"red", "green", "blue"};
    array<double, 4> grades;                      // Uninitialized
    
    // Fill with default value
    grades.fill(85.5);
    
    cout << "Numbers array: ";
    for (size_t i = 0; i < numbers.size(); ++i) {
        cout << numbers[i] << " ";
    }
    cout << endl;
    
    cout << "Colors array: ";
    for (const auto& color : colors) {
        cout << color << " ";
    }
    cout << endl;
    
    cout << "Grades array: ";
    for (const auto& grade : grades) {
        cout << grade << " ";
    }
    cout << endl;
    
    // Array properties
    cout << "Numbers size: " << numbers.size() << endl;
    cout << "Numbers max_size: " << numbers.max_size() << endl;
    cout << "Empty? " << (numbers.empty() ? "Yes" : "No") << endl;
    cout << endl;
    
    // 8. ARRAY ELEMENT ACCESS
    cout << "8️⃣ ARRAY ELEMENT ACCESS:" << endl;
    
    cout << "First element: " << numbers.front() << endl;
    cout << "Last element: " << numbers.back() << endl;
    cout << "Element at index 2: " << numbers.at(2) << endl;
    cout << "Element using []: " << numbers[3] << endl;
    
    // Get raw pointer to data
    int* raw_ptr = numbers.data();
    cout << "Raw pointer access: " << raw_ptr[1] << endl;
    cout << endl;
    
    // 9. ARRAY WITH STL ALGORITHMS
    cout << "9️⃣ ARRAY WITH STL ALGORITHMS:" << endl;
    array<int, 8> data = {64, 34, 25, 12, 22, 11, 90, 88};
    
    cout << "Original: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    
    // Sort
    sort(data.begin(), data.end());
    cout << "Sorted: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    
    // Find element
    auto it = find(data.begin(), data.end(), 25);
    if (it != data.end()) {
        cout << "Found 25 at index: " << distance(data.begin(), it) << endl;
    }
    
    // Count elements
    int count_even = count_if(data.begin(), data.end(), 
                             [](int x) { return x % 2 == 0; });
    cout << "Even numbers count: " << count_even << endl;
    
    // Min and max
    auto min_it = min_element(data.begin(), data.end());
    auto max_it = max_element(data.begin(), data.end());
    cout << "Min: " << *min_it << ", Max: " << *max_it << endl;
    cout << endl;
    
    // 10. ARRAY COMPARISON AND SWAPPING
    cout << "🔟 ARRAY COMPARISON AND SWAPPING:" << endl;
    array<int, 3> arr1 = {1, 2, 3};
    array<int, 3> arr2 = {1, 2, 3};
    array<int, 3> arr3 = {4, 5, 6};
    
    cout << "arr1: ";
    for (int x : arr1) cout << x << " ";
    cout << endl;
    cout << "arr2: ";
    for (int x : arr2) cout << x << " ";
    cout << endl;
    cout << "arr3: ";
    for (int x : arr3) cout << x << " ";
    cout << endl;
    
    // Comparison
    cout << "arr1 == arr2: " << (arr1 == arr2) << endl;
    cout << "arr1 == arr3: " << (arr1 == arr3) << endl;
    cout << "arr1 < arr3: " << (arr1 < arr3) << endl;
    
    // Swap
    cout << "\\nBefore swap - arr1: ";
    for (int x : arr1) cout << x << " ";
    cout << ", arr3: ";
    for (int x : arr3) cout << x << " ";
    cout << endl;
    
    arr1.swap(arr3);
    
    cout << "After swap - arr1: ";
    for (int x : arr1) cout << x << " ";
    cout << ", arr3: ";
    for (int x : arr3) cout << x << " ";
    cout << endl << endl;
    
    // 11. PERFORMANCE COMPARISON
    cout << "1️⃣1️⃣ PERFORMANCE COMPARISON:" << endl;
    cout << "┌─────────────────┬─────────┬─────────┬─────────┬─────────┐" << endl;
    cout << "│ Feature         │ string  │  array  │ vector  │ C-array │" << endl;
    cout << "├─────────────────┼─────────┼─────────┼─────────┼─────────┤" << endl;
    cout << "│ Size            │ Dynamic │  Fixed  │ Dynamic │  Fixed  │" << endl;
    cout << "│ Memory          │  Heap   │  Stack  │  Heap   │  Stack  │" << endl;
    cout << "│ Bounds Check    │   Yes   │   Yes   │   Yes   │   No    │" << endl;
    cout << "│ STL Compatible  │   Yes   │   Yes   │   Yes   │  Partial│" << endl;
    cout << "│ Overhead        │  Small  │  None   │  Small  │  None   │" << endl;
    cout << "└─────────────────┴─────────┴─────────┴─────────┴─────────┘" << endl << endl;
    
    // 12. WHEN TO USE EACH
    cout << "1️⃣2️⃣ WHEN TO USE:" << endl;
    cout << "🎯 Use string when:" << endl;
    cout << "   • Working with text data" << endl;
    cout << "   • Need dynamic size" << endl;
    cout << "   • Need rich string operations" << endl;
    cout << "   • Text parsing and manipulation" << endl << endl;
    
    cout << "🎯 Use array when:" << endl;
    cout << "   • Know exact size at compile time" << endl;
    cout << "   • Want stack allocation" << endl;
    cout << "   • Need zero overhead" << endl;
    cout << "   • Replacing C-style arrays" << endl << endl;
    
    // 13. ALL METHODS SUMMARY
    cout << "1️⃣3️⃣ METHODS SUMMARY:" << endl;
    cout << "STRING METHODS:" << endl;
    cout << "  Construction: string(), string(const char*), string(size_t, char)" << endl;
    cout << "  Access: [], at(), front(), back(), data(), c_str()" << endl;
    cout << "  Modify: +=, append(), insert(), erase(), replace(), clear()" << endl;
    cout << "  Search: find(), rfind(), find_first_of(), find_last_of()" << endl;
    cout << "  Compare: ==, !=, <, >, compare()" << endl;
    cout << "  Convert: to_string(), stoi(), stod(), stof()" << endl << endl;
    
    cout << "ARRAY METHODS:" << endl;
    cout << "  Access: [], at(), front(), back(), data()" << endl;
    cout << "  Capacity: size(), max_size(), empty()" << endl;
    cout << "  Modify: fill(), swap()" << endl;
    cout << "  Iterators: begin(), end(), rbegin(), rend()" << endl;
    cout << "  Compare: ==, !=, <, <=, >, >=" << endl;
    
    return 0;
}`
            }
        ],
        projects: [
            {
                title: 'Contact Management System',
                description: '📱 Build a complete contact management system using multiple data structures!',
                code: `// 📱 Contact Management System - Real Project
// Uses Hash Tables, Vectors, and Sorting Algorithms

#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <string>
using namespace std;

// Contact structure
struct Contact {
    string name;
    string phone;
    string email;
    string category;  // family, friend, work, etc.
    
    Contact() = default;
    Contact(string n, string p, string e, string c) 
        : name(n), phone(p), email(e), category(c) {}
    
    void display() const {
        cout << "📞 " << name << " | " << phone << " | " << email 
             << " | [" << category << "]" << endl;
    }
};

// Contact Management System
class ContactManager {
private:
    vector<Contact> contacts;                    // Main storage (dynamic array)
    unordered_map<string, int> nameIndex;       // Hash table for fast lookup
    unordered_map<string, vector<int>> categoryIndex;  // Group by category
    
public:
    // Add new contact
    void addContact(const string& name, const string& phone, 
                   const string& email, const string& category) {
        Contact newContact(name, phone, email, category);
        
        // Add to main vector
        contacts.push_back(newContact);
        int index = contacts.size() - 1;
        
        // Update indexes
        nameIndex[name] = index;
        categoryIndex[category].push_back(index);
        
        cout << "✅ Added contact: " << name << endl;
    }
    
    // Find contact by name (O(1) with hash table)
    void findContact(const string& name) {
        auto it = nameIndex.find(name);
        if (it != nameIndex.end()) {
            cout << "🔍 Found: ";
            contacts[it->second].display();
        } else {
            cout << "❌ Contact not found: " << name << endl;
        }
    }
    
    // Display contacts by category
    void displayByCategory(const string& category) {
        auto it = categoryIndex.find(category);
        if (it != categoryIndex.end()) {
            cout << "📂 " << category << " contacts:" << endl;
            for (int index : it->second) {
                cout << "  ";
                contacts[index].display();
            }
        } else {
            cout << "📂 No contacts in category: " << category << endl;
        }
    }
    
    // Display all contacts sorted by name
    void displayAllSorted() {
        if (contacts.empty()) {
            cout << "📭 No contacts available" << endl;
            return;
        }
        
        // Create vector of pointers for sorting without moving contacts
        vector<Contact*> sortedPtrs;
        for (auto& contact : contacts) {
            sortedPtrs.push_back(&contact);
        }
        
        // Sort using lambda function
        sort(sortedPtrs.begin(), sortedPtrs.end(), 
             [](const Contact* a, const Contact* b) {
                 return a->name < b->name;
             });
        
        cout << "📋 All contacts (sorted by name):" << endl;
        for (const auto* contact : sortedPtrs) {
            cout << "  ";
            contact->display();
        }
    }
    
    // Update contact information
    void updateContact(const string& name, const string& newPhone, 
                      const string& newEmail) {
        auto it = nameIndex.find(name);
        if (it != nameIndex.end()) {
            contacts[it->second].phone = newPhone;
            contacts[it->second].email = newEmail;
            cout << "✏️ Updated contact: " << name << endl;
        } else {
            cout << "❌ Cannot update - contact not found: " << name << endl;
        }
    }
    
    // Remove contact
    void removeContact(const string& name) {
        auto it = nameIndex.find(name);
        if (it != nameIndex.end()) {
            int index = it->second;
            string category = contacts[index].category;
            
            // Remove from category index
            auto& categoryVec = categoryIndex[category];
            categoryVec.erase(remove(categoryVec.begin(), categoryVec.end(), index), 
                             categoryVec.end());
            
            // Remove from main vector (move last element to this position)
            contacts[index] = contacts.back();
            contacts.pop_back();
            
            // Update name index
            nameIndex.erase(name);
            if (!contacts.empty() && index < contacts.size()) {
                nameIndex[contacts[index].name] = index;
            }
            
            cout << "🗑️ Removed contact: " << name << endl;
        } else {
            cout << "❌ Cannot remove - contact not found: " << name << endl;
        }
    }
    
    // Get statistics
    void showStatistics() {
        cout << "📊 CONTACT STATISTICS:" << endl;
        cout << "   Total contacts: " << contacts.size() << endl;
        cout << "   Categories: " << categoryIndex.size() << endl;
        
        for (const auto& pair : categoryIndex) {
            if (!pair.second.empty()) {
                cout << "   - " << pair.first << ": " << pair.second.size() 
                     << " contacts" << endl;
            }
        }
    }
};

// Example usage and testing
int main() {
    cout << "=== 📱 CONTACT MANAGEMENT SYSTEM ===" << endl;
    cout << "Demonstrating: Vectors, Hash Tables, Sorting" << endl << endl;
    
    ContactManager manager;
    
    // Add sample contacts
    cout << "➕ Adding contacts..." << endl;
    manager.addContact("Alice Johnson", "555-0101", "alice@email.com", "friend");
    manager.addContact("Bob Smith", "555-0202", "bob@work.com", "work");
    manager.addContact("Charlie Brown", "555-0303", "charlie@email.com", "family");
    manager.addContact("Diana Lee", "555-0404", "diana@work.com", "work");
    manager.addContact("Eve Wilson", "555-0505", "eve@email.com", "friend");
    cout << endl;
    
    // Display all contacts sorted
    manager.displayAllSorted();
    cout << endl;
    
    // Search for specific contact
    cout << "🔍 Searching for contacts..." << endl;
    manager.findContact("Alice Johnson");
    manager.findContact("John Doe");  // Not found
    cout << endl;
    
    // Display by category
    manager.displayByCategory("work");
    cout << endl;
    
    // Update contact
    cout << "✏️ Updating contact..." << endl;
    manager.updateContact("Alice Johnson", "555-9999", "alice.new@email.com");
    manager.findContact("Alice Johnson");
    cout << endl;
    
    // Show statistics
    manager.showStatistics();
    cout << endl;
    
    // Remove contact
    cout << "🗑️ Removing contact..." << endl;
    manager.removeContact("Bob Smith");
    manager.displayByCategory("work");
    cout << endl;
    
    cout << "🎉 Contact Management System Demo Complete!" << endl;
    cout << "📚 Data Structures Used:" << endl;
    cout << "  ✅ Vector: Dynamic storage for contacts" << endl;
    cout << "  ✅ Hash Table: Fast name lookup (O(1))" << endl;
    cout << "  ✅ Sorting: Alphabetical contact listing" << endl;
    cout << "  ✅ Algorithm: Efficient search and update operations" << endl;
    
    return 0;
}`
            },
            {
                title: 'Expression Evaluator using Stack',
                description: '🧮 Build a calculator that evaluates mathematical expressions using stack data structure!',
                code: `// 🧮 Expression Evaluator - Stack-based Calculator
// Demonstrates: Stack ADT, Algorithm Design, Real-world Application

#include <iostream>
#include <stack>
#include <string>
#include <cctype>
using namespace std;

class ExpressionEvaluator {
private:
    // Check if character is an operator
    bool isOperator(char c) {
        return c == '+' || c == '-' || c == '*' || c == '/';
    }
    
    // Get operator precedence
    int precedence(char op) {
        switch (op) {
            case '+':
            case '-': return 1;
            case '*':
            case '/': return 2;
            default: return 0;
        }
    }
    
    // Perform calculation
    double calculate(double a, double b, char op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': 
                if (b != 0) return a / b;
                throw runtime_error("Division by zero!");
            default:
                throw runtime_error("Invalid operator!");
        }
    }
    
public:
    // Convert infix to postfix notation (Shunting Yard Algorithm)
    string infixToPostfix(const string& infix) {
        stack<char> operators;
        string postfix = "";
        
        cout << "🔄 Converting infix to postfix..." << endl;
        cout << "Infix: " << infix << endl;
        
        for (char c : infix) {
            if (c == ' ') continue;  // Skip spaces
            
            if (isdigit(c) || c == '.') {
                // Number - add to output
                postfix += c;
                cout << "  Number '" << c << "' → output" << endl;
            }
            else if (c == '(') {
                // Left parenthesis - push to stack
                operators.push(c);
                cout << "  '(' → pushed to stack" << endl;
            }
            else if (c == ')') {
                // Right parenthesis - pop until left parenthesis
                postfix += ' ';
                while (!operators.empty() && operators.top() != '(') {
                    postfix += operators.top();
                    postfix += ' ';
                    cout << "  ')' → popped '" << operators.top() << "'" << endl;
                    operators.pop();
                }
                if (!operators.empty()) operators.pop();  // Remove '('
            }
            else if (isOperator(c)) {
                // Operator - handle precedence
                postfix += ' ';
                
                while (!operators.empty() && operators.top() != '(' &&
                       precedence(operators.top()) >= precedence(c)) {
                    postfix += operators.top();
                    postfix += ' ';
                    cout << "  Operator '" << c << "' → popped higher precedence '" 
                         << operators.top() << "'" << endl;
                    operators.pop();
                }
                
                operators.push(c);
                cout << "  Operator '" << c << "' → pushed to stack" << endl;
            }
        }
        
        // Pop remaining operators
        while (!operators.empty()) {
            postfix += ' ';
            postfix += operators.top();
            cout << "  End → popped '" << operators.top() << "'" << endl;
            operators.pop();
        }
        
        cout << "Postfix: " << postfix << endl << endl;
        return postfix;
    }
    
    // Evaluate postfix expression
    double evaluatePostfix(const string& postfix) {
        stack<double> values;
        string number = "";
        
        cout << "🧮 Evaluating postfix expression..." << endl;
        
        for (char c : postfix) {
            if (isdigit(c) || c == '.') {
                number += c;
            }
            else if (c == ' ' || c == postfix.back()) {
                if (!number.empty()) {
                    double value = stod(number);
                    values.push(value);
                    cout << "  Pushed number: " << value << endl;
                    number = "";
                }
                
                if (isOperator(c)) {
                    if (values.size() < 2) {
                        throw runtime_error("Invalid expression!");
                    }
                    
                    double b = values.top(); values.pop();
                    double a = values.top(); values.pop();
                    
                    double result = calculate(a, b, c);
                    values.push(result);
                    
                    cout << "  " << a << " " << c << " " << b << " = " << result << endl;
                }
            }
        }
        
        if (values.size() != 1) {
            throw runtime_error("Invalid expression!");
        }
        
        return values.top();
    }
    
    // Main evaluation function
    double evaluate(const string& expression) {
        cout << "📝 Input expression: " << expression << endl;
        
        try {
            string postfix = infixToPostfix(expression);
            double result = evaluatePostfix(postfix);
            
            cout << "✅ Result: " << result << endl;
            return result;
        }
        catch (const exception& e) {
            cout << "❌ Error: " << e.what() << endl;
            return 0;
        }
    }
};

// Demo and testing
int main() {
    cout << "=== 🧮 EXPRESSION EVALUATOR ===" << endl;
    cout << "Stack-based Calculator using Shunting Yard Algorithm" << endl << endl;
    
    ExpressionEvaluator calculator;
    
    // Test cases
    vector<string> testExpressions = {
        "3 + 4 * 2",           // 11 (precedence test)
        "(3 + 4) * 2",         // 14 (parentheses test)
        "10 - 3 + 2",          // 9 (left associativity)
        "2 * (3 + 4) / 2",     // 7 (complex expression)
        "15 / 3 - 2 * 2"       // 1 (multiple operations)
    };
    
    for (const string& expr : testExpressions) {
        cout << "=" << string(50, '=') << endl;
        calculator.evaluate(expr);
        cout << endl;
    }
    
    // Interactive mode
    cout << "🎯 INTERACTIVE MODE" << endl;
    cout << "Enter mathematical expressions (or 'quit' to exit):" << endl;
    
    string input;
    while (true) {
        cout << "📱 Calculator> ";
        getline(cin, input);
        
        if (input == "quit" || input == "exit") {
            cout << "👋 Goodbye!" << endl;
            break;
        }
        
        if (!input.empty()) {
            cout << string(30, '-') << endl;
            calculator.evaluate(input);
            cout << string(30, '-') << endl << endl;
        }
    }
    
    cout << "📚 CONCEPTS DEMONSTRATED:" << endl;
    cout << "  ✅ Stack ADT: LIFO operations" << endl;
    cout << "  ✅ Shunting Yard: Infix to postfix conversion" << endl;
    cout << "  ✅ Postfix Evaluation: Stack-based calculation" << endl;
    cout << "  ✅ Operator Precedence: Mathematical order of operations" << endl;
    cout << "  ✅ Error Handling: Invalid expressions and division by zero" << endl;
    cout << "  ✅ Real Application: How calculators actually work!" << endl;
    
    return 0;
}`
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
                        {index === 0 && activeSection === 'fundamentals' ? (
                            <CodeRunner
                                code={example.code}
                                language="javascript"
                                title={example.title}
                                description="🚀 This interactive demo lets you run C++ concepts in your browser!"
                                expectedOutput={[
                                    "=== 🚀 C++ FUNDAMENTALS DEMO ===",
                                    "1. 👋 HELLO WORLD",
                                    "Hello, Data Structures World!",
                                    "Welcome to C++ Programming! 🔧"
                                ]}
                                hints={[
                                    "Try changing the array 'numbers' values and see how loops work",
                                    "Modify the 'age' or other variables to see different output",
                                    "This is JavaScript simulating C++ concepts - perfect for learning!",
                                    "Focus on understanding the logic rather than syntax differences"
                                ]}
                            />
                        ) : index === 0 && activeSection === 'arrays' ? (
                            <CodeRunner
                                code={example.code}
                                language="javascript"
                                title={example.title}
                                description="📊 Interactive array operations demo!"
                                expectedOutput={[
                                    "=== 🎯 ARRAY OPERATIONS DEMO ===",
                                    "Grades array: [85, 92, 78, 96, 88]",
                                    "Highest grade: 96"
                                ]}
                                hints={[
                                    "Try changing the grades array values",
                                    "Add or remove elements and see how it affects the results",
                                    "Experiment with the search grade value",
                                    "Arrays are the foundation of all other data structures!"
                                ]}
                            />
                        ) : index === 0 && activeSection === 'linked-lists' ? (
                            <CodeRunner
                                code={example.code}
                                language="javascript"
                                title={example.title}
                                description="🔗 Understand how linked lists work!"
                                expectedOutput={[
                                    "=== 🚀 LINKED LISTS DEMO ===",
                                    "Position 1: 10",
                                    "Position 2: 20",
                                    "Position 3: 30"
                                ]}
                                hints={[
                                    "Try adding more nodes by creating node4, node5, etc.",
                                    "Change the data values and see how traversal works",
                                    "Notice how we follow 'next' pointers to walk through the list",
                                    "Compare this with array access - very different!"
                                ]}
                            />
                        ) : index === 0 && activeSection === 'stacks-queues' ? (
                            <CodeRunner
                                code={example.code}
                                language="javascript"
                                title={example.title}
                                description="📚 Experience stacks in action!"
                                expectedOutput={[
                                    "=== 🥞 STACK DEMO (Last In, First Out) ===",
                                    "📥 PUSH: Added Book 1 to stack",
                                    "📤 POP: Removed Book 3 from stack"
                                ]}
                                hints={[
                                    "Try adding different items to the stack",
                                    "Notice how the last item added is first item removed",
                                    "Test the balanced parentheses checker with your own expressions",
                                    "Think about undo operations - they work exactly like this!"
                                ]}
                            />
                        ) : index === 0 && activeSection === 'trees' ? (
                            <CodeRunner
                                code={example.code}
                                language="javascript"
                                title={example.title}
                                description="🌳 Explore tree structures!"
                                expectedOutput={[
                                    "=== 🌳 BINARY TREE DEMO ===",
                                    "In-Order (Left, Root, Right): 20 → 30 → 40 → 50 → 60 → 70 → 80",
                                    "✅ Found 40!"
                                ]}
                                hints={[
                                    "Try changing the tree structure by modifying node values",
                                    "Search for different values and see the path taken",
                                    "Notice how BST property makes searching efficient",
                                    "Trees are everywhere - file systems, decision making, databases!"
                                ]}
                            />
                        ) : index === 0 && activeSection === 'hash-tables' ? (
                            <CodeRunner
                                code={example.code}
                                language="javascript"
                                title={example.title}
                                description="🗂️ See hash tables in action!"
                                expectedOutput={[
                                    "=== ⚡ HASH TABLE DEMO ===",
                                    "Hash('apple') =",
                                    "➕ Added: Alice = 555-0101",
                                    "🔍 Found: Alice = 555-0101"
                                ]}
                                hints={[
                                    "Try adding more contacts and see where they're stored",
                                    "Notice how lookups are instant regardless of table size",
                                    "Experiment with different names and see hash collisions",
                                    "This is how databases achieve lightning-fast searches!"
                                ]}
                            />
                        ) : index === 0 && activeSection === 'algorithms' ? (
                            <CodeRunner
                                code={example.code}
                                language="javascript"
                                title={example.title}
                                description="⚡ Compare sorting algorithms!"
                                expectedOutput={[
                                    "=== 📊 SORTING ALGORITHMS DEMO ===",
                                    "📋 Original array: [64, 34, 25, 12, 22, 11]",
                                    "Starting bubble sort..."
                                ]}
                                hints={[
                                    "Watch how different algorithms solve the same problem",
                                    "Notice the trade-offs between simplicity and efficiency",
                                    "Bubble sort is easy to understand but slow",
                                    "Quick sort is complex but much faster for large data!"
                                ]}
                            />
                        ) : (
                            <CodeEditor
                                initialCode={example.code}
                                title={example.title}
                                height="450px"
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
                        C++ & Data Structures 🔧
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Master C++ programming and data structures from basics to advanced concepts with hands-on examples and beginner-friendly explanations
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

                {/* Beginner Guide - Show for fundamentals section */}
                {activeSection === 'fundamentals' && showBeginnerGuide && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">🎯 New to C++ or Data Structures? Start Here!</h3>
                            <button
                                onClick={() => setShowBeginnerGuide(false)}
                                className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                                Hide Guide
                            </button>
                        </div>
                        <BeginnerGuide
                            topic="C++ and Data Structures Fundamentals"
                            steps={beginnerSteps}
                            nextTopics={["Arrays & Vectors", "Linked Lists", "Stacks & Queues", "Trees"]}
                        />
                    </motion.div>
                )}

                {/* Show beginner guide toggle if hidden */}
                {activeSection === 'fundamentals' && !showBeginnerGuide && (
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

                {/* Why Learn C++ and Data Structures */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white"
                >
                    <h2 className="text-3xl font-bold mb-6 text-center">Why Learn C++ & Data Structures? 🚀</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">🌟 C++ Advantages</h3>
                            <ul className="space-y-2">
                                <li>• High performance and memory control</li>
                                <li>• Foundation for system programming</li>
                                <li>• Game development and embedded systems</li>
                                <li>• Understanding how computers really work</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3">💼 Data Structures Benefits</h3>
                            <ul className="space-y-2">
                                <li>• Essential for coding interviews</li>
                                <li>• Efficient problem-solving skills</li>
                                <li>• Better algorithm design abilities</li>
                                <li>• Understanding of database internals</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

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
                    <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </motion.button>

                {/* Help Center Modal */}
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
            </div>
        </div>
    )
}

export default CppPage
