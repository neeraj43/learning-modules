'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Table, Search, Settings, Link as LinkIcon, Shield, BarChart3, Terminal } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'

const MySQLPage = () => {
  const [activeSection, setActiveSection] = useState('basics')

  const sections = [
    { id: 'basics', name: 'SQL Basics', icon: '📚' },
    { id: 'tables', name: 'Tables & Schema', icon: '🗂️' },
    { id: 'queries', name: 'Queries & Joins', icon: '🔍' },
    { id: 'functions', name: 'Functions & Aggregation', icon: '🧮' },
    { id: 'indexes', name: 'Indexes & Performance', icon: '⚡' },
    { id: 'transactions', name: 'Transactions & ACID', icon: '🔒' },
    { id: 'design', name: 'Database Design', icon: '🏗️' },
    { id: 'integration', name: 'Node.js Integration', icon: '🔗' },
    { id: 'optimization', name: 'Optimization', icon: '🚀' }
  ]

  const codeExamples = {
    basics: [
      {
        title: 'Database and Table Creation',
        description: 'Basic SQL commands for creating databases and tables',
        code: `-- Create a database
CREATE DATABASE ecommerce_db;

-- Use the database
USE ecommerce_db;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Create products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2),
    sku VARCHAR(50) UNIQUE,
    category_id INT,
    stock_quantity INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Show table structure
DESCRIBE users;
SHOW TABLES;`
      },
      {
        title: 'Basic CRUD Operations',
        description: 'Create, Read, Update, Delete operations',
        code: `-- INSERT data
INSERT INTO users (username, email, password_hash, first_name, last_name, date_of_birth)
VALUES 
    ('john_doe', 'john@example.com', 'hashed_password_1', 'John', 'Doe', '1990-05-15'),
    ('jane_smith', 'jane@example.com', 'hashed_password_2', 'Jane', 'Smith', '1985-08-22'),
    ('bob_wilson', 'bob@example.com', 'hashed_password_3', 'Bob', 'Wilson', '1992-12-03');

-- INSERT categories
INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Electronic devices and gadgets'),
    ('Computers', 'Computers and computer accessories'),
    ('Smartphones', 'Mobile phones and accessories');

-- INSERT products
INSERT INTO products (name, description, price, cost, sku, category_id, stock_quantity)
VALUES
    ('iPhone 15 Pro', 'Latest iPhone with advanced features', 999.99, 600.00, 'IPH15PRO', 3, 50),
    ('MacBook Air M2', 'Lightweight laptop with M2 chip', 1199.99, 800.00, 'MBA_M2', 2, 25),
    ('Samsung Galaxy S24', 'Android smartphone with AI features', 849.99, 500.00, 'SGS24', 3, 75);

-- SELECT data (READ)
SELECT * FROM users;
SELECT id, username, email, first_name, last_name FROM users WHERE is_active = TRUE;
SELECT * FROM products WHERE price > 800.00;
SELECT name, price FROM products ORDER BY price DESC;
SELECT * FROM products LIMIT 5;

-- UPDATE data
UPDATE users 
SET first_name = 'Johnny', updated_at = CURRENT_TIMESTAMP 
WHERE username = 'john_doe';

UPDATE products 
SET price = 899.99, stock_quantity = stock_quantity - 1 
WHERE sku = 'SGS24';

-- DELETE data
DELETE FROM products WHERE stock_quantity = 0;
DELETE FROM users WHERE is_active = FALSE AND created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);`
      }
    ],
    tables: [
      {
        title: 'Advanced Table Operations',
        description: 'Creating complex table structures with constraints and relationships',
        code: `-- Create orders table with foreign keys
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Create order_items table (many-to-many relationship)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_order_product (order_id, product_id)
);

-- Create product reviews table
CREATE TABLE product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating TINYINT CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    helpful_votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product_review (user_id, product_id)
);

-- Add constraints to existing table
ALTER TABLE products 
ADD CONSTRAINT chk_price CHECK (price >= 0),
ADD CONSTRAINT chk_stock CHECK (stock_quantity >= 0);

-- Add new column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Modify column
ALTER TABLE users MODIFY COLUMN phone VARCHAR(25);

-- Drop column
ALTER TABLE users DROP COLUMN date_of_birth;

-- Create index
CREATE INDEX idx_products_category_price ON products (category_id, price);
CREATE FULLTEXT INDEX idx_products_search ON products (name, description);`
      }
    ],
    queries: [
      {
        title: 'Advanced Queries and Joins',
        description: 'Complex SELECT statements with JOIN operations',
        code: `-- INNER JOIN - Get products with their categories
SELECT 
    p.name AS product_name,
    p.price,
    p.stock_quantity,
    c.name AS category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.id
WHERE p.is_active = TRUE
ORDER BY c.name, p.name;

-- LEFT JOIN - Get all users and their order count (including users with no orders)
SELECT 
    u.username,
    u.email,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.username, u.email
ORDER BY total_spent DESC;

-- Complex JOIN with multiple tables
SELECT 
    o.order_number,
    u.username,
    u.email,
    o.status,
    o.total_amount,
    COUNT(oi.id) AS item_count,
    GROUP_CONCAT(p.name SEPARATOR ', ') AS products
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY o.id, o.order_number, u.username, u.email, o.status, o.total_amount
HAVING item_count > 1
ORDER BY o.created_at DESC;

-- Subqueries
-- Find products that have never been ordered
SELECT name, price 
FROM products 
WHERE id NOT IN (
    SELECT DISTINCT product_id 
    FROM order_items 
    WHERE product_id IS NOT NULL
);

-- Find users who spent more than average
SELECT 
    username, 
    email,
    total_spent
FROM (
    SELECT 
        u.username,
        u.email,
        COALESCE(SUM(o.total_amount), 0) AS total_spent
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    GROUP BY u.id
) user_spending
WHERE total_spent > (
    SELECT AVG(total_spent) 
    FROM (
        SELECT COALESCE(SUM(o.total_amount), 0) AS total_spent
        FROM users u
        LEFT JOIN orders o ON u.id = o.user_id
        GROUP BY u.id
    ) avg_calc
);

-- Window functions (MySQL 8.0+)
SELECT 
    name,
    price,
    category_id,
    ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) AS price_rank,
    AVG(price) OVER (PARTITION BY category_id) AS avg_category_price,
    LAG(price) OVER (ORDER BY price) AS previous_price
FROM products;`
      }
    ],
    functions: [
      {
        title: 'Built-in Functions and Aggregation',
        description: 'Using MySQL functions for data manipulation and analysis',
        code: `-- String functions
SELECT 
    CONCAT(first_name, ' ', last_name) AS full_name,
    UPPER(username) AS username_upper,
    LENGTH(email) AS email_length,
    SUBSTRING(email, 1, LOCATE('@', email) - 1) AS email_username,
    LEFT(username, 3) AS username_prefix
FROM users;

-- Date and time functions
SELECT 
    created_at,
    DATE(created_at) AS date_only,
    TIME(created_at) AS time_only,
    YEAR(created_at) AS year,
    MONTH(created_at) AS month,
    DAYNAME(created_at) AS day_name,
    DATEDIFF(NOW(), created_at) AS days_ago,
    DATE_ADD(created_at, INTERVAL 1 YEAR) AS one_year_later
FROM orders;

-- Numeric functions
SELECT 
    price,
    ROUND(price, 0) AS rounded_price,
    CEIL(price) AS ceiling_price,
    FLOOR(price) AS floor_price,
    ABS(price - cost) AS profit,
    GREATEST(price, cost) AS max_value,
    LEAST(price, cost) AS min_value
FROM products;

-- Conditional functions
SELECT 
    name,
    price,
    stock_quantity,
    CASE 
        WHEN stock_quantity = 0 THEN 'Out of Stock'
        WHEN stock_quantity < 10 THEN 'Low Stock'
        WHEN stock_quantity < 50 THEN 'Medium Stock'
        ELSE 'High Stock'
    END AS stock_status,
    IF(price > 500, 'Premium', 'Standard') AS price_category,
    COALESCE(description, 'No description available') AS product_description
FROM products;

-- Aggregation functions
SELECT 
    category_id,
    COUNT(*) AS product_count,
    AVG(price) AS average_price,
    MIN(price) AS min_price,
    MAX(price) AS max_price,
    SUM(stock_quantity) AS total_stock,
    GROUP_CONCAT(name ORDER BY price DESC SEPARATOR ' | ') AS product_list
FROM products
WHERE is_active = TRUE
GROUP BY category_id
HAVING product_count > 1;

-- Advanced aggregation with ROLLUP
SELECT 
    COALESCE(c.name, 'ALL CATEGORIES') AS category,
    COUNT(p.id) AS product_count,
    AVG(p.price) AS avg_price,
    SUM(p.stock_quantity) AS total_stock
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
GROUP BY c.name WITH ROLLUP;`
      }
    ],
    integration: [
      {
        title: 'Node.js MySQL Integration',
        description: 'Connecting and interacting with MySQL from Node.js applications',
        code: `// Install required packages
// npm install mysql2 dotenv

import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'ecommerce_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

// Create connection pool
const pool = mysql.createPool(dbConfig)

// User service class
class UserService {
  // Create user
  static async createUser(userData) {
    const { username, email, password_hash, first_name, last_name } = userData
    
    const query = \`
      INSERT INTO users (username, email, password_hash, first_name, last_name)
      VALUES (?, ?, ?, ?, ?)
    \`
    
    try {
      const [result] = await pool.execute(query, [
        username, email, password_hash, first_name, last_name
      ])
      
      return {
        id: result.insertId,
        username,
        email,
        first_name,
        last_name,
        created_at: new Date()
      }
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Username or email already exists')
      }
      throw error
    }
  }
  
  // Get user by ID
  static async getUserById(id) {
    const query = \`
      SELECT id, username, email, first_name, last_name, created_at, is_active
      FROM users 
      WHERE id = ? AND is_active = TRUE
    \`
    
    const [rows] = await pool.execute(query, [id])
    return rows[0] || null
  }
  
  // Get users with pagination
  static async getUsers(page = 1, limit = 10) {
    const offset = (page - 1) * limit
    
    const countQuery = 'SELECT COUNT(*) as total FROM users WHERE is_active = TRUE'
    const dataQuery = \`
      SELECT id, username, email, first_name, last_name, created_at
      FROM users 
      WHERE is_active = TRUE
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    \`
    
    const [countResult] = await pool.execute(countQuery)
    const [users] = await pool.execute(dataQuery, [limit, offset])
    
    return {
      users,
      pagination: {
        page,
        limit,
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    }
  }
  
  // Update user
  static async updateUser(id, updateData) {
    const fields = []
    const values = []
    
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        fields.push(\`\${key} = ?\`)
        values.push(updateData[key])
      }
    })
    
    if (fields.length === 0) {
      throw new Error('No fields to update')
    }
    
    values.push(id)
    
    const query = \`
      UPDATE users 
      SET \${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    \`
    
    const [result] = await pool.execute(query, values)
    return result.affectedRows > 0
  }
  
  // Delete user (soft delete)
  static async deleteUser(id) {
    const query = 'UPDATE users SET is_active = FALSE WHERE id = ?'
    const [result] = await pool.execute(query, [id])
    return result.affectedRows > 0
  }
}

// Product service with complex queries
class ProductService {
  // Get products with categories and reviews
  static async getProductsWithDetails(filters = {}) {
    let query = \`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.stock_quantity,
        c.name AS category_name,
        AVG(r.rating) AS average_rating,
        COUNT(r.id) AS review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_reviews r ON p.id = r.product_id
      WHERE p.is_active = TRUE
    \`
    
    const params = []
    
    if (filters.category_id) {
      query += ' AND p.category_id = ?'
      params.push(filters.category_id)
    }
    
    if (filters.min_price) {
      query += ' AND p.price >= ?'
      params.push(filters.min_price)
    }
    
    if (filters.max_price) {
      query += ' AND p.price <= ?'
      params.push(filters.max_price)
    }
    
    query += \`
      GROUP BY p.id, p.name, p.description, p.price, p.stock_quantity, c.name
      ORDER BY p.created_at DESC
    \`
    
    const [products] = await pool.execute(query, params)
    return products
  }
}

// Usage example
async function example() {
  try {
    // Create a new user
    const newUser = await UserService.createUser({
      username: 'test_user',
      email: 'test@example.com',
      password_hash: 'hashed_password',
      first_name: 'Test',
      last_name: 'User'
    })
    
    console.log('Created user:', newUser)
    
    // Get products
    const products = await ProductService.getProductsWithDetails({
      min_price: 100,
      max_price: 1000
    })
    
    console.log('Products:', products)
    
  } catch (error) {
    console.error('Database error:', error)
  }
}

// Connection testing
pool.getConnection()
  .then(connection => {
    console.log('Database connected successfully')
    connection.release()
  })
  .catch(error => {
    console.error('Database connection failed:', error)
  })

export { UserService, ProductService, pool }`
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              MySQL Database Mastery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master MySQL from fundamentals to advanced optimization - SQL queries, 
              database design, performance tuning, and Node.js integration.
            </p>
          </motion.div>

          {/* Interactive SQL Playground */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">SQL Query Playground</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Practice SQL queries and database operations. Try different commands and see examples!
              </p>
              <CodeEditor
                title="SQL Playground"
                initialCode={`-- Welcome to MySQL!
-- Try these SQL examples:

-- 1. Create a simple table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Insert some data
INSERT INTO users (name, email) VALUES
    ('John Doe', 'john@example.com'),
    ('Jane Smith', 'jane@example.com'),
    ('Bob Wilson', 'bob@example.com');

-- 3. Query the data
SELECT * FROM users;
SELECT name, email FROM users WHERE name LIKE 'J%';

-- 4. Update data
UPDATE users SET name = 'Johnny Doe' WHERE email = 'john@example.com';

-- 5. Join example (assuming we have an orders table)
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- 6. Advanced query with aggregation
SELECT 
    DATE(created_at) as date,
    COUNT(*) as user_count,
    AVG(LENGTH(name)) as avg_name_length
FROM users
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Try your own SQL queries below:
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
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
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

          {/* Database Concepts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🗄️ Database Learning Path
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">📚</div>
                <h3 className="font-semibold mb-2">Foundation</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• SQL basics & syntax</li>
                  <li>• Table creation & relationships</li>
                  <li>• CRUD operations</li>
                  <li>• Data types & constraints</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">🔍</div>
                <h3 className="font-semibold mb-2">Advanced Queries</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Complex JOINs & subqueries</li>
                  <li>• Window functions</li>
                  <li>• Stored procedures</li>
                  <li>• Triggers & views</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">⚡</div>
                <h3 className="font-semibold mb-2">Performance & Production</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Indexing strategies</li>
                  <li>• Query optimization</li>
                  <li>• Backup & recovery</li>
                  <li>• Scaling & replication</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Database className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">ACID Compliance</h3>
              <p className="text-gray-600 text-sm">Ensure data integrity with Atomicity, Consistency, Isolation, and Durability</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <BarChart3 className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Performance</h3>
              <p className="text-gray-600 text-sm">Optimize queries with indexes, partitioning, and caching strategies</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Shield className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-gray-600 text-sm">Implement proper authentication, authorization, and data protection</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <LinkIcon className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="font-semibold mb-2">Integration</h3>
              <p className="text-gray-600 text-sm">Connect with Node.js, Python, PHP and other programming languages</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MySQLPage
