'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Server, Database, Bot, BarChart3, FileCode, Globe, Terminal } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'

const PythonPage = () => {
  const [activeSection, setActiveSection] = useState('basics')

  const sections = [
    { id: 'basics', name: 'Python Basics', icon: '🐍' },
    { id: 'datatypes', name: 'Data Types & Structures', icon: '📊' },
    { id: 'functions', name: 'Functions & Classes', icon: '🏗️' },
    { id: 'modules', name: 'Modules & Packages', icon: '📦' },
    { id: 'flask', name: 'Flask Web Apps', icon: '🌶️' },
    { id: 'django', name: 'Django Framework', icon: '🎸' },
    { id: 'data', name: 'Data Science', icon: '📈' },
    { id: 'automation', name: 'Automation & Scripts', icon: '🤖' },
    { id: 'apis', name: 'REST APIs', icon: '🔗' }
  ]

  const codeExamples = {
    basics: [
      {
        title: 'Python Fundamentals',
        description: 'Core Python syntax, variables, and basic operations',
        code: `# Python Basics - Variables and Data Types
print("Welcome to Python!")

# Variables and basic data types
name = "Python Developer"
age = 25
height = 5.8
is_programmer = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}")
print(f"Is Programmer: {is_programmer}")

# String operations
greeting = "Hello, World!"
print(greeting.upper())
print(greeting.lower())
print(greeting.replace("World", "Python"))
print(len(greeting))

# Numbers and math operations
x = 10
y = 3

print(f"Addition: {x + y}")
print(f"Subtraction: {x - y}")
print(f"Multiplication: {x * y}")
print(f"Division: {x / y}")
print(f"Floor Division: {x // y}")
print(f"Modulo: {x % y}")
print(f"Power: {x ** y}")

# Boolean operations
print(f"x > y: {x > y}")
print(f"x == y: {x == y}")
print(f"x != y: {x != y}")

# Multiple assignment
a, b, c = 1, 2, 3
print(f"a={a}, b={b}, c={c}")

# Type checking
print(f"Type of name: {type(name)}")
print(f"Type of age: {type(age)}")
print(f"Type of height: {type(height)}")
print(f"Type of is_programmer: {type(is_programmer)}")`
      },
      {
        title: 'Control Flow & Loops',
        description: 'Conditional statements, loops, and control structures',
        code: `# Control Flow - If statements
age = 20

if age < 13:
    category = "child"
elif age < 20:
    category = "teenager"
elif age < 60:
    category = "adult"
else:
    category = "senior"

print(f"Age {age} is categorized as: {category}")

# For loops
print("\\nCounting 1 to 5:")
for i in range(1, 6):
    print(f"Count: {i}")

# List iteration
fruits = ["apple", "banana", "orange", "grape"]
print("\\nFruits list:")
for index, fruit in enumerate(fruits):
    print(f"{index + 1}. {fruit}")

# Dictionary iteration
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York",
    "job": "Developer"
}

print("\\nPerson details:")
for key, value in person.items():
    print(f"{key}: {value}")

# While loop
count = 0
print("\\nWhile loop countdown:")
while count < 5:
    print(f"Count: {count}")
    count += 1

# List comprehension
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = [x for x in numbers if x % 2 == 0]
squared_numbers = [x**2 for x in numbers]

print(f"\\nOriginal numbers: {numbers}")
print(f"Even numbers: {even_numbers}")
print(f"Squared numbers: {squared_numbers}")

# Nested loops - multiplication table
print("\\nMultiplication table (3x3):")
for i in range(1, 4):
    for j in range(1, 4):
        result = i * j
        print(f"{i} x {j} = {result}")
    print()  # Empty line between rows`
      }
    ],
    datatypes: [
      {
        title: 'Python Data Structures',
        description: 'Lists, tuples, dictionaries, and sets with practical examples',
        code: `# Lists - Ordered, mutable collection
shopping_list = ["apples", "bananas", "milk", "bread"]
print("Original shopping list:", shopping_list)

# List operations
shopping_list.append("eggs")  # Add item
shopping_list.insert(1, "oranges")  # Insert at position
shopping_list.remove("milk")  # Remove item
shopping_list.sort()  # Sort alphabetically

print("Modified shopping list:", shopping_list)
print("List length:", len(shopping_list))
print("First item:", shopping_list[0])
print("Last item:", shopping_list[-1])

# List slicing
print("First 3 items:", shopping_list[:3])
print("Last 2 items:", shopping_list[-2:])

# Tuples - Ordered, immutable collection
coordinates = (10, 20)
rgb_color = (255, 128, 0)
person_data = ("John", 25, "Engineer")

print(f"\\nCoordinates: {coordinates}")
print(f"RGB Color: {rgb_color}")
print(f"Person: Name={person_data[0]}, Age={person_data[1]}, Job={person_data[2]}")

# Tuple unpacking
x, y = coordinates
name, age, job = person_data
print(f"Unpacked coordinates: x={x}, y={y}")

# Dictionaries - Key-value pairs
user_profile = {
    "username": "python_dev",
    "email": "dev@python.com",
    "age": 28,
    "skills": ["Python", "JavaScript", "SQL"],
    "is_active": True
}

print("\\nUser Profile:")
print(f"Username: {user_profile['username']}")
print(f"Email: {user_profile.get('email', 'Not provided')}")
print(f"Skills: {', '.join(user_profile['skills'])}")

# Dictionary operations
user_profile["location"] = "San Francisco"  # Add new key
user_profile["age"] = 29  # Update existing key
del user_profile["is_active"]  # Remove key

print("\\nUpdated profile keys:", list(user_profile.keys()))
print("Profile values:", list(user_profile.values()))

# Sets - Unique, unordered collection
skills_set1 = {"Python", "JavaScript", "SQL", "React"}
skills_set2 = {"Python", "Java", "SQL", "MongoDB"}

print(f"\\nSkills Set 1: {skills_set1}")
print(f"Skills Set 2: {skills_set2}")
print(f"Common skills: {skills_set1 & skills_set2}")
print(f"All skills: {skills_set1 | skills_set2}")
print(f"Skills only in set 1: {skills_set1 - skills_set2}")

# Nested data structures
company_data = {
    "name": "Tech Corp",
    "employees": [
        {"name": "Alice", "role": "Developer", "salary": 75000},
        {"name": "Bob", "role": "Designer", "salary": 65000},
        {"name": "Carol", "role": "Manager", "salary": 85000}
    ],
    "departments": ["Engineering", "Design", "Marketing"]
}

print("\\nCompany Data:")
print(f"Company: {company_data['name']}")
print("Employees:")
for emp in company_data["employees"]:
    print(f"  {emp['name']} - {emp['role']} ($\{emp['salary']:,})")

# Working with nested data
total_salary = sum(emp["salary"] for emp in company_data["employees"])
avg_salary = total_salary / len(company_data["employees"])
print(f"\\nTotal salary budget: $\{total_salary:,}")
print(f"Average salary: $\{avg_salary:,.2f}")`
      }
    ],
    functions: [
      {
        title: 'Functions and Classes',
        description: 'Function definitions, classes, inheritance, and decorators',
        code: `# Functions - Basic definition and usage
def greet(name, greeting="Hello"):
    """Function to greet a person"""
    return f"{greeting}, {name}!"

# Function calls
print(greet("Alice"))
print(greet("Bob", "Hi"))

# Function with multiple return values
def calculate_stats(numbers):
    """Calculate basic statistics for a list of numbers"""
    if not numbers:
        return 0, 0, 0
    
    total = sum(numbers)
    average = total / len(numbers)
    maximum = max(numbers)
    
    return total, average, maximum

# Using the function
data = [10, 20, 30, 40, 50]
sum_val, avg_val, max_val = calculate_stats(data)
print(f"\\nStats for {data}:")
print(f"Sum: {sum_val}, Average: {avg_val:.2f}, Max: {max_val}")

# Lambda functions (anonymous functions)
square = lambda x: x ** 2
numbers = [1, 2, 3, 4, 5]
squared = list(map(square, numbers))
print(f"\\nSquared numbers: {squared}")

# Filter with lambda
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(f"Even numbers: {even_numbers}")

# Classes - Object-oriented programming
class BankAccount:
    """A simple bank account class"""
    
    def __init__(self, account_number, initial_balance=0):
        self.account_number = account_number
        self.balance = initial_balance
        self.transactions = []
    
    def deposit(self, amount):
        """Deposit money to the account"""
        if amount > 0:
            self.balance += amount
            self.transactions.append(f"Deposited $\{amount}")
            return True
        return False
    
    def withdraw(self, amount):
        """Withdraw money from the account"""
        if 0 < amount <= self.balance:
            self.balance -= amount
            self.transactions.append(f"Withdrew $\{amount}")
            return True
        return False
    
    def get_balance(self):
        """Get current balance"""
        return self.balance
    
    def get_statement(self):
        """Get account statement"""
        return {
            "account": self.account_number,
            "balance": self.balance,
            "transactions": self.transactions
        }
    
    def __str__(self):
        """String representation of the account"""
        return f"Account {self.account_number}: $\{self.balance:.2f}"

# Using the class
account = BankAccount("12345", 1000)
print(f"\\nInitial account: {account}")

account.deposit(500)
account.withdraw(200)
print(f"After transactions: {account}")

statement = account.get_statement()
print("\\nAccount Statement:")
for transaction in statement["transactions"]:
    print(f"  - {transaction}")

# Inheritance
class SavingsAccount(BankAccount):
    """Savings account with interest"""
    
    def __init__(self, account_number, initial_balance=0, interest_rate=0.02):
        super().__init__(account_number, initial_balance)
        self.interest_rate = interest_rate
    
    def apply_interest(self):
        """Apply interest to the account"""
        interest = self.balance * self.interest_rate
        self.deposit(interest)
        return interest

# Using inheritance
savings = SavingsAccount("SAV001", 1000, 0.05)
print(f"\\nSavings account: {savings}")

interest_earned = savings.apply_interest()
print(f"Interest earned: $\{interest_earned:.2f}")
print(f"New balance: {savings}")

# Class method and static method example
class MathUtils:
    """Utility class for math operations"""
    
    PI = 3.14159
    
    @staticmethod
    def add(x, y):
        """Static method - doesn't need instance"""
        return x + y
    
    @classmethod
    def circle_area(cls, radius):
        """Class method - uses class variable"""
        return cls.PI * radius ** 2

# Using static and class methods
print(f"\\nAddition: {MathUtils.add(5, 3)}")
print(f"Circle area: {MathUtils.circle_area(5):.2f}")`
      }
    ],
    flask: [
      {
        title: 'Flask Web Application',
        description: 'Building REST APIs and web applications with Flask',
        code: `# Flask Web Application Example
from flask import Flask, request, jsonify, render_template_string
from datetime import datetime
import json

# Create Flask app
app = Flask(__name__)

# In-memory data store (use database in production)
users = [
    {"id": 1, "name": "Alice", "email": "alice@example.com"},
    {"id": 2, "name": "Bob", "email": "bob@example.com"}
]

tasks = [
    {"id": 1, "title": "Learn Python", "completed": False, "user_id": 1},
    {"id": 2, "title": "Build Flask API", "completed": True, "user_id": 1}
]

# HTML template for simple UI
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
    <title>Flask Todo App</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .task { padding: 10px; border: 1px solid #ddd; margin: 5px 0; }
        .completed { background-color: #e8f5e8; }
        button { padding: 5px 10px; margin: 2px; }
    </style>
</head>
<body>
    <h1>Todo Application</h1>
    <div id="tasks"></div>
    <div>
        <input type="text" id="taskInput" placeholder="Enter new task">
        <button onclick="addTask()">Add Task</button>
    </div>
    
    <script>
        async function loadTasks() {
            const response = await fetch('/api/tasks');
            const tasks = await response.json();
            displayTasks(tasks);
        }
        
        function displayTasks(tasks) {
            const container = document.getElementById('tasks');
            container.innerHTML = tasks.map(task => \`
                <div class="task \${task.completed ? 'completed' : ''}">
                    <strong>\${task.title}</strong>
                    <button onclick="toggleTask(\${task.id})">
                        \${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                    <button onclick="deleteTask(\${task.id})">Delete</button>
                </div>
            \`).join('');
        }
        
        async function addTask() {
            const input = document.getElementById('taskInput');
            const title = input.value.trim();
            if (!title) return;
            
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title, user_id: 1})
            });
            
            if (response.ok) {
                input.value = '';
                loadTasks();
            }
        }
        
        async function toggleTask(taskId) {
            const task = tasks.find(t => t.id === taskId);
            const response = await fetch(\`/api/tasks/\${taskId}\`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({completed: !task.completed})
            });
            
            if (response.ok) loadTasks();
        }
        
        async function deleteTask(taskId) {
            const response = await fetch(\`/api/tasks/\${taskId}\`, {
                method: 'DELETE'
            });
            
            if (response.ok) loadTasks();
        }
        
        // Load tasks on page load
        loadTasks();
    </script>
</body>
</html>
'''

# Routes
@app.route('/')
def home():
    """Serve the main application page"""
    return render_template_string(HTML_TEMPLATE)

@app.route('/api/users', methods=['GET'])
def get_users():
    """Get all users"""
    return jsonify(users)

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get specific user"""
    user = next((u for u in users if u['id'] == user_id), None)
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """Get all tasks"""
    user_id = request.args.get('user_id', type=int)
    if user_id:
        filtered_tasks = [t for t in tasks if t['user_id'] == user_id]
        return jsonify(filtered_tasks)
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def create_task():
    """Create new task"""
    data = request.get_json()
    
    if not data or 'title' not in data:
        return jsonify({"error": "Title is required"}), 400
    
    new_task = {
        "id": max([t['id'] for t in tasks], default=0) + 1,
        "title": data['title'],
        "completed": data.get('completed', False),
        "user_id": data.get('user_id', 1),
        "created_at": datetime.now().isoformat()
    }
    
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """Update existing task"""
    task = next((t for t in tasks if t['id'] == task_id), None)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    data = request.get_json()
    if 'title' in data:
        task['title'] = data['title']
    if 'completed' in data:
        task['completed'] = data['completed']
    
    task['updated_at'] = datetime.now().isoformat()
    return jsonify(task)

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Delete task"""
    global tasks
    task = next((t for t in tasks if t['id'] == task_id), None)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    tasks = [t for t in tasks if t['id'] != task_id]
    return jsonify({"message": "Task deleted successfully"})

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

# Run the application
if __name__ == '__main__':
    print("Starting Flask Todo App...")
    print("Available endpoints:")
    print("- GET / : Main application")
    print("- GET /api/users : Get all users")
    print("- GET /api/tasks : Get all tasks")
    print("- POST /api/tasks : Create new task")
    print("- PUT /api/tasks/<id> : Update task")
    print("- DELETE /api/tasks/<id> : Delete task")
    
    app.run(debug=True, host='0.0.0.0', port=5000)`
      }
    ],
    data: [
      {
        title: 'Data Science with Python',
        description: 'Data analysis, visualization, and machine learning basics',
        code: `# Data Science with Python
# Note: This example shows the code structure
# In a real environment, you'd need to install: pandas, numpy, matplotlib

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

# Simulated data (in real scenario, load from CSV/database)
print("Creating sample dataset...")

# Generate sample sales data
np.random.seed(42)
dates = [datetime.now() - timedelta(days=x) for x in range(365, 0, -1)]
products = ['Laptop', 'Phone', 'Tablet', 'Watch', 'Headphones']
regions = ['North', 'South', 'East', 'West']

# Create dataset
data = []
for i in range(1000):
    data.append({
        'date': np.random.choice(dates),
        'product': np.random.choice(products),
        'region': np.random.choice(regions),
        'quantity': np.random.randint(1, 10),
        'price': np.random.uniform(100, 2000),
        'customer_age': np.random.randint(18, 70),
        'customer_satisfaction': np.random.uniform(1, 5)
    })

# Convert to DataFrame
df = pd.DataFrame(data)
df['revenue'] = df['quantity'] * df['price']
df['month'] = df['date'].dt.strftime('%Y-%m')

print(f"Dataset created with {len(df)} rows")
print("\\nDataset overview:")
print(df.head())

print("\\nDataset info:")
print(df.info())

print("\\nBasic statistics:")
print(df.describe())

# Data Analysis Examples
print("\\n" + "="*50)
print("DATA ANALYSIS EXAMPLES")
print("="*50)

# 1. Sales by product
print("\\n1. Sales by Product:")
sales_by_product = df.groupby('product').agg({
    'revenue': 'sum',
    'quantity': 'sum'
}).round(2)
print(sales_by_product)

# 2. Monthly revenue trend
print("\\n2. Monthly Revenue Trend:")
monthly_revenue = df.groupby('month')['revenue'].sum().round(2)
print(monthly_revenue.head(10))

# 3. Regional performance
print("\\n3. Regional Performance:")
regional_stats = df.groupby('region').agg({
    'revenue': ['sum', 'mean'],
    'customer_satisfaction': 'mean',
    'quantity': 'sum'
}).round(2)
print(regional_stats)

# 4. Customer segmentation by age
print("\\n4. Customer Age Analysis:")
df['age_group'] = pd.cut(df['customer_age'], 
                        bins=[0, 25, 35, 50, 100], 
                        labels=['18-25', '26-35', '36-50', '50+'])

age_analysis = df.groupby('age_group').agg({
    'revenue': 'mean',
    'customer_satisfaction': 'mean',
    'quantity': 'mean'
}).round(2)
print(age_analysis)

# 5. Top performing products by revenue
print("\\n5. Top 3 Products by Revenue:")
top_products = df.groupby('product')['revenue'].sum().sort_values(ascending=False).head(3)
print(top_products)

# 6. Correlation analysis
print("\\n6. Correlation Analysis:")
correlation_matrix = df[['price', 'quantity', 'customer_age', 'customer_satisfaction', 'revenue']].corr().round(3)
print(correlation_matrix)

# Data Visualization Code (conceptual)
print("\\n" + "="*50)
print("VISUALIZATION CODE EXAMPLES")
print("="*50)

visualization_code = '''
# Visualization examples (requires matplotlib)

# 1. Revenue by Product - Bar Chart
plt.figure(figsize=(10, 6))
sales_by_product['revenue'].plot(kind='bar')
plt.title('Revenue by Product')
plt.ylabel('Revenue ($)')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 2. Monthly Revenue Trend - Line Chart
plt.figure(figsize=(12, 6))
monthly_revenue.plot(kind='line', marker='o')
plt.title('Monthly Revenue Trend')
plt.xlabel('Month')
plt.ylabel('Revenue ($)')
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()
plt.show()

# 3. Customer Satisfaction by Region - Box Plot
plt.figure(figsize=(10, 6))
df.boxplot(column='customer_satisfaction', by='region')
plt.title('Customer Satisfaction by Region')
plt.ylabel('Satisfaction Score')
plt.tight_layout()
plt.show()

# 4. Revenue Distribution - Histogram
plt.figure(figsize=(10, 6))
plt.hist(df['revenue'], bins=30, edgecolor='black', alpha=0.7)
plt.title('Revenue Distribution')
plt.xlabel('Revenue ($)')
plt.ylabel('Frequency')
plt.grid(True, alpha=0.3)
plt.show()
'''

print(visualization_code)

# Machine Learning Example (conceptual)
print("\\n" + "="*50)
print("MACHINE LEARNING EXAMPLE")
print("="*50)

ml_code = '''
# Machine Learning Example (requires scikit-learn)
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

# Prepare data for ML
# Feature engineering
df['revenue_per_item'] = df['revenue'] / df['quantity']
df['high_satisfaction'] = (df['customer_satisfaction'] > 4).astype(int)

# Select features and target
features = ['price', 'quantity', 'customer_age', 'high_satisfaction']
target = 'revenue'

X = df[features]
y = df[target]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train models
lr_model = LinearRegression()
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)

lr_model.fit(X_train, y_train)
rf_model.fit(X_train, y_train)

# Make predictions
lr_pred = lr_model.predict(X_test)
rf_pred = rf_model.predict(X_test)

# Evaluate models
print("Linear Regression Performance:")
print(f"R² Score: {r2_score(y_test, lr_pred):.3f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, lr_pred)):.2f}")

print("\\nRandom Forest Performance:")
print(f"R² Score: {r2_score(y_test, rf_pred):.3f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, rf_pred)):.2f}")

# Feature importance
print("\\nFeature Importance (Random Forest):")
for feature, importance in zip(features, rf_model.feature_importances_):
    print(f"{feature}: {importance:.3f}")
'''

print(ml_code)

print("\\n" + "="*50)
print("SUMMARY")
print("="*50)
print("✅ Data loading and exploration")
print("✅ Statistical analysis and aggregations")
print("✅ Customer segmentation")
print("✅ Correlation analysis")
print("✅ Data visualization concepts")
print("✅ Machine learning pipeline")
print("\\nNext steps: Install pandas, numpy, matplotlib, scikit-learn for full functionality!")`
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
                height="400px"
              />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Python Programming
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master Python from basics to advanced applications - web development with Flask/Django, 
              data science, automation, and real-world project building.
            </p>
          </motion.div>

          {/* Interactive Python Playground */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-800">Python Code Playground</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Write and execute Python code instantly! Practice syntax, functions, and data structures.
              </p>
              <CodeEditor
                title="Python Playground"
                initialCode={`# Welcome to Python Programming!
# Try these Python examples:

# 1. Variables and data types
name = "Python Developer"
age = 25
skills = ["Python", "Django", "Data Science"]
is_awesome = True

print(f"Hello, I'm {name}, {age} years old")
print(f"My skills: {', '.join(skills)}")
print(f"Python is awesome: {is_awesome}")

# 2. Functions
def calculate_area(length, width):
    """Calculate area of a rectangle"""
    return length * width

area = calculate_area(10, 5)
print(f"Area: {area}")

# 3. Lists and loops
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(f"Original: {numbers}")
print(f"Squared: {squared}")

# 4. Dictionary operations
person = {
    "name": "Alice",
    "age": 30,
    "city": "San Francisco"
}

for key, value in person.items():
    print(f"{key}: {value}")

# 5. Class example
class Calculator:
    def add(self, a, b):
        return a + b
    
    def multiply(self, a, b):
        return a * b

calc = Calculator()
print(f"Addition: {calc.add(5, 3)}")
print(f"Multiplication: {calc.multiply(4, 7)}")

# Try your own Python code below:
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
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
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

          {/* Python Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🐍 Python Learning Path
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">🚀</div>
                <h3 className="font-semibold mb-2">Core Python</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Variables & data types</li>
                  <li>• Functions & classes</li>
                  <li>• Modules & packages</li>
                  <li>• Exception handling</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">🌐</div>
                <h3 className="font-semibold mb-2">Web Development</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Flask microframework</li>
                  <li>• Django web framework</li>
                  <li>• REST API development</li>
                  <li>• Database integration</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-semibold mb-2">Data & AI</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Data analysis with Pandas</li>
                  <li>• Machine learning</li>
                  <li>• Data visualization</li>
                  <li>• Automation scripts</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Server className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="font-semibold mb-2">Web Frameworks</h3>
              <p className="text-gray-600 text-sm">Build web applications with Flask and Django</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Data Science</h3>
              <p className="text-gray-600 text-sm">Analyze data with Pandas, NumPy, and visualization</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Bot className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Automation</h3>
              <p className="text-gray-600 text-sm">Automate tasks and build powerful scripts</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Globe className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">APIs</h3>
              <p className="text-gray-600 text-sm">Create RESTful APIs and integrate with services</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PythonPage
