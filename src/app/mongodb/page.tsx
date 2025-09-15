'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Search, BarChart3, Lock, Zap, Globe, Terminal } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'

const MongoDBPage = () => {
  const [activeSection, setActiveSection] = useState('basics')

  const sections = [
    { id: 'basics', name: 'MongoDB Basics', icon: '🍃' },
    { id: 'queries', name: 'Advanced Queries', icon: '🔍' },
    { id: 'aggregation', name: 'Aggregation Pipeline', icon: '📊' },
    { id: 'indexing', name: 'Indexing & Performance', icon: '⚡' },
    { id: 'modeling', name: 'Data Modeling', icon: '🏗️' },
    { id: 'transactions', name: 'Transactions', icon: '🔒' },
    { id: 'nodejs', name: 'Node.js Integration', icon: '🟢' },
    { id: 'scaling', name: 'Scaling & Sharding', icon: '📈' }
  ]

  const codeExamples = {
    basics: [
      {
        title: 'MongoDB CRUD Operations',
        description: 'Essential MongoDB operations for creating, reading, updating, and deleting documents',
        code: `// MongoDB Basics - CRUD Operations
// This represents MongoDB shell commands and queries

// 1. DATABASE AND COLLECTION OPERATIONS
// Create/switch to database
use learning_platform;

// Show current database
db.getName();

// List all databases
show dbs;

// Create collection and insert documents
db.users.insertOne({
  username: "alice_dev",
  email: "alice@example.com",
  profile: {
    name: "Alice Johnson",
    age: 28,
    location: {
      city: "San Francisco",
      country: "USA",
      coordinates: [-122.4194, 37.7749]
    },
    skills: ["JavaScript", "MongoDB", "React"],
    experience: 5,
    isActive: true
  },
  preferences: {
    theme: "dark",
    notifications: {
      email: true,
      push: false,
      sms: true
    }
  },
  createdAt: new Date(),
  lastLogin: new Date()
});

// 2. INSERT OPERATIONS
// Insert multiple documents
db.users.insertMany([
  {
    username: "bob_backend",
    email: "bob@example.com",
    profile: {
      name: "Bob Smith",
      age: 32,
      location: { city: "New York", country: "USA" },
      skills: ["Node.js", "MongoDB", "Python"],
      experience: 7,
      isActive: true
    },
    preferences: { theme: "light" },
    createdAt: new Date()
  },
  {
    username: "carol_data",
    email: "carol@example.com",
    profile: {
      name: "Carol Wilson",
      age: 29,
      location: { city: "Austin", country: "USA" },
      skills: ["MongoDB", "Python", "Machine Learning"],
      experience: 6,
      isActive: false
    },
    preferences: { theme: "auto" },
    createdAt: new Date()
  }
]);

// 3. READ OPERATIONS (QUERIES)
// Find all documents
db.users.find();

// Find with pretty formatting
db.users.find().pretty();

// Find specific documents
db.users.find({ "profile.isActive": true });

// Find with specific fields
db.users.find(
  { "profile.experience": { $gte: 5 } },
  { username: 1, "profile.name": 1, "profile.experience": 1, _id: 0 }
);

// Find one document
db.users.findOne({ username: "alice_dev" });

// Complex queries with multiple conditions
db.users.find({
  $and: [
    { "profile.age": { $gte: 25, $lte: 35 } },
    { "profile.isActive": true },
    { "profile.skills": { $in: ["MongoDB", "JavaScript"] } }
  ]
});

// 4. UPDATE OPERATIONS
// Update one document
db.users.updateOne(
  { username: "alice_dev" },
  {
    $set: { 
      "profile.experience": 6,
      "lastLogin": new Date()
    },
    $push: { 
      "profile.skills": "TypeScript" 
    }
  }
);

// Update multiple documents
db.users.updateMany(
  { "profile.isActive": true },
  {
    $set: { "lastUpdated": new Date() },
    $inc: { "profile.loginCount": 1 }
  }
);

// Upsert operation (insert if not exists)
db.users.updateOne(
  { username: "david_new" },
  {
    $set: {
      email: "david@example.com",
      profile: {
        name: "David Chen",
        age: 26,
        skills: ["MongoDB", "Express"],
        isActive: true
      },
      createdAt: new Date()
    }
  },
  { upsert: true }
);

// 5. DELETE OPERATIONS
// Delete one document
db.users.deleteOne({ username: "david_new" });

// Delete multiple documents
db.users.deleteMany({ "profile.isActive": false });

// 6. COUNTING AND STATISTICS
// Count documents
db.users.countDocuments();
db.users.countDocuments({ "profile.isActive": true });

// Distinct values
db.users.distinct("profile.location.city");
db.users.distinct("profile.skills");

// 7. SORTING AND LIMITING
// Sort by experience (descending)
db.users.find().sort({ "profile.experience": -1 });

// Limit results
db.users.find().limit(2);

// Skip and limit (pagination)
db.users.find().skip(1).limit(2);

// Combined operations
db.users.find(
  { "profile.isActive": true },
  { username: 1, "profile.name": 1, "profile.experience": 1 }
).sort({ "profile.experience": -1 }).limit(3);

// 8. ARRAY OPERATIONS
// Find documents with specific array elements
db.users.find({ "profile.skills": "MongoDB" });

// Find documents with array size
db.users.find({ "profile.skills": { $size: 3 } });

// Find with array element matching multiple conditions
db.users.find({
  "profile.skills": {
    $all: ["MongoDB", "JavaScript"]
  }
});

// 9. NESTED DOCUMENT QUERIES
// Query nested fields
db.users.find({ "profile.location.city": "San Francisco" });

// Exists operator
db.users.find({ "profile.location.coordinates": { $exists: true } });

// Type checking
db.users.find({ "profile.age": { $type: "number" } });

// 10. REGULAR EXPRESSIONS
// Case-insensitive search
db.users.find({ 
  "profile.name": { $regex: /alice/i } 
});

// Pattern matching
db.users.find({
  email: { $regex: /.*@example\.com$/ }
});

console.log("MongoDB CRUD operations completed!");
console.log("Documents in users collection:", db.users.countDocuments());`
      }
    ],
    aggregation: [
      {
        title: 'Advanced Aggregation Pipeline',
        description: 'Complex data processing using MongoDB aggregation framework',
        code: `// MongoDB Aggregation Pipeline - Advanced Examples

// Sample data setup for aggregation examples
db.orders.insertMany([
  {
    orderId: "ORD001",
    customerId: "CUST001",
    customerName: "Alice Johnson",
    products: [
      { productId: "PROD001", name: "Laptop", price: 1200, quantity: 1, category: "Electronics" },
      { productId: "PROD002", name: "Mouse", price: 25, quantity: 2, category: "Electronics" }
    ],
    orderDate: new Date("2024-01-15"),
    status: "completed",
    shippingAddress: {
      city: "San Francisco",
      state: "CA",
      country: "USA"
    },
    paymentMethod: "credit_card"
  },
  {
    orderId: "ORD002",
    customerId: "CUST002",
    customerName: "Bob Smith",
    products: [
      { productId: "PROD003", name: "Book", price: 15, quantity: 3, category: "Books" },
      { productId: "PROD004", name: "Pen", price: 2, quantity: 10, category: "Stationery" }
    ],
    orderDate: new Date("2024-01-20"),
    status: "pending",
    shippingAddress: {
      city: "New York",
      state: "NY",
      country: "USA"
    },
    paymentMethod: "paypal"
  },
  {
    orderId: "ORD003",
    customerId: "CUST001",
    customerName: "Alice Johnson",
    products: [
      { productId: "PROD005", name: "Headphones", price: 150, quantity: 1, category: "Electronics" }
    ],
    orderDate: new Date("2024-02-01"),
    status: "completed",
    shippingAddress: {
      city: "San Francisco",
      state: "CA",
      country: "USA"
    },
    paymentMethod: "credit_card"
  }
]);

// 1. BASIC AGGREGATION PIPELINE
// Calculate total order value for each order
db.orders.aggregate([
  {
    $addFields: {
      totalValue: {
        $sum: {
          $map: {
            input: "$products",
            as: "product",
            in: { $multiply: ["$$product.price", "$$product.quantity"] }
          }
        }
      }
    }
  },
  {
    $project: {
      orderId: 1,
      customerName: 1,
      totalValue: 1,
      status: 1,
      orderDate: 1
    }
  },
  {
    $sort: { totalValue: -1 }
  }
]);

// 2. GROUPING AND AGGREGATION
// Sales summary by customer
db.orders.aggregate([
  {
    $unwind: "$products"
  },
  {
    $group: {
      _id: "$customerId",
      customerName: { $first: "$customerName" },
      totalOrders: { $addToSet: "$orderId" },
      totalSpent: {
        $sum: { $multiply: ["$products.price", "$products.quantity"] }
      },
      avgOrderValue: {
        $avg: { $multiply: ["$products.price", "$products.quantity"] }
      },
      favoriteCategory: { $push: "$products.category" },
      lastOrderDate: { $max: "$orderDate" }
    }
  },
  {
    $addFields: {
      totalOrderCount: { $size: "$totalOrders" },
      favoriteCategory: {
        $arrayElemAt: [
          {
            $map: {
              input: {
                $setUnion: ["$favoriteCategory"]
              },
              as: "category",
              in: {
                category: "$$category",
                count: {
                  $size: {
                    $filter: {
                      input: "$favoriteCategory",
                      cond: { $eq: ["$$this", "$$category"] }
                    }
                  }
                }
              }
            }
          },
          0
        ]
      }
    }
  },
  {
    $sort: { totalSpent: -1 }
  }
]);

// 3. DATE AGGREGATION
// Monthly sales report
db.orders.aggregate([
  {
    $match: {
      orderDate: {
        $gte: new Date("2024-01-01"),
        $lt: new Date("2024-12-31")
      }
    }
  },
  {
    $addFields: {
      orderValue: {
        $sum: {
          $map: {
            input: "$products",
            as: "product",
            in: { $multiply: ["$$product.price", "$$product.quantity"] }
          }
        }
      }
    }
  },
  {
    $group: {
      _id: {
        year: { $year: "$orderDate" },
        month: { $month: "$orderDate" }
      },
      totalSales: { $sum: "$orderValue" },
      orderCount: { $sum: 1 },
      avgOrderValue: { $avg: "$orderValue" },
      completedOrders: {
        $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
      },
      uniqueCustomers: { $addToSet: "$customerId" }
    }
  },
  {
    $addFields: {
      uniqueCustomerCount: { $size: "$uniqueCustomers" },
      completionRate: { $divide: ["$completedOrders", "$orderCount"] }
    }
  },
  {
    $project: {
      uniqueCustomers: 0
    }
  },
  {
    $sort: { "_id.year": 1, "_id.month": 1 }
  }
]);

// 4. COMPLEX FILTERING AND LOOKUP
// Product performance analysis
db.orders.aggregate([
  {
    $unwind: "$products"
  },
  {
    $group: {
      _id: "$products.productId",
      productName: { $first: "$products.name" },
      category: { $first: "$products.category" },
      totalQuantitySold: { $sum: "$products.quantity" },
      totalRevenue: {
        $sum: { $multiply: ["$products.price", "$products.quantity"] }
      },
      avgPrice: { $avg: "$products.price" },
      orderCount: { $sum: 1 },
      uniqueCustomers: { $addToSet: "$customerId" }
    }
  },
  {
    $addFields: {
      uniqueCustomerCount: { $size: "$uniqueCustomers" },
      revenuePerOrder: { $divide: ["$totalRevenue", "$orderCount"] }
    }
  },
  {
    $match: {
      totalQuantitySold: { $gte: 1 }
    }
  },
  {
    $sort: { totalRevenue: -1 }
  },
  {
    $project: {
      uniqueCustomers: 0
    }
  }
]);

// 5. GEOGRAPHIC AGGREGATION
// Sales by location
db.orders.aggregate([
  {
    $addFields: {
      orderValue: {
        $sum: {
          $map: {
            input: "$products",
            as: "product",
            in: { $multiply: ["$$product.price", "$$product.quantity"] }
          }
        }
      }
    }
  },
  {
    $group: {
      _id: {
        state: "$shippingAddress.state",
        city: "$shippingAddress.city"
      },
      totalSales: { $sum: "$orderValue" },
      orderCount: { $sum: 1 },
      uniqueCustomers: { $addToSet: "$customerId" },
      avgOrderValue: { $avg: "$orderValue" }
    }
  },
  {
    $addFields: {
      uniqueCustomerCount: { $size: "$uniqueCustomers" }
    }
  },
  {
    $sort: { totalSales: -1 }
  },
  {
    $project: {
      uniqueCustomers: 0
    }
  }
]);

// 6. ADVANCED PIPELINE WITH FACETS
// Multi-dimensional analysis
db.orders.aggregate([
  {
    $addFields: {
      orderValue: {
        $sum: {
          $map: {
            input: "$products",
            as: "product",
            in: { $multiply: ["$$product.price", "$$product.quantity"] }
          }
        }
      }
    }
  },
  {
    $facet: {
      // Sales by status
      "salesByStatus": [
        {
          $group: {
            _id: "$status",
            totalSales: { $sum: "$orderValue" },
            count: { $sum: 1 }
          }
        }
      ],
      
      // Sales by payment method
      "salesByPayment": [
        {
          $group: {
            _id: "$paymentMethod",
            totalSales: { $sum: "$orderValue" },
            count: { $sum: 1 }
          }
        }
      ],
      
      // Top customers
      "topCustomers": [
        {
          $group: {
            _id: "$customerId",
            customerName: { $first: "$customerName" },
            totalSpent: { $sum: "$orderValue" },
            orderCount: { $sum: 1 }
          }
        },
        { $sort: { totalSpent: -1 } },
        { $limit: 5 }
      ],
      
      // Order value distribution
      "orderValueStats": [
        {
          $group: {
            _id: null,
            avgOrderValue: { $avg: "$orderValue" },
            minOrderValue: { $min: "$orderValue" },
            maxOrderValue: { $max: "$orderValue" },
            totalOrders: { $sum: 1 }
          }
        }
      ]
    }
  }
]);

// 7. TIME-SERIES ANALYSIS
// Daily sales trend
db.orders.aggregate([
  {
    $addFields: {
      orderValue: {
        $sum: {
          $map: {
            input: "$products",
            as: "product",
            in: { $multiply: ["$$product.price", "$$product.quantity"] }
          }
        }
      },
      orderDay: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$orderDate"
        }
      }
    }
  },
  {
    $group: {
      _id: "$orderDay",
      dailySales: { $sum: "$orderValue" },
      orderCount: { $sum: 1 },
      avgOrderValue: { $avg: "$orderValue" }
    }
  },
  {
    $sort: { "_id": 1 }
  },
  {
    $setWindowFields: {
      sortBy: { "_id": 1 },
      output: {
        cumulativeSales: {
          $sum: "$dailySales",
          window: {
            documents: ["unbounded", "current"]
          }
        },
        movingAvg: {
          $avg: "$dailySales",
          window: {
            documents: [-2, 2]  // 5-day moving average
          }
        }
      }
    }
  }
]);

// 8. COMPLEX TEXT SEARCH AND ANALYSIS
// Search and analyze product names
db.orders.aggregate([
  {
    $unwind: "$products"
  },
  {
    $match: {
      "products.name": { $regex: /laptop|computer|mouse/i }
    }
  },
  {
    $group: {
      _id: "$products.name",
      totalSold: { $sum: "$products.quantity" },
      totalRevenue: {
        $sum: { $multiply: ["$products.price", "$products.quantity"] }
      },
      avgPrice: { $avg: "$products.price" }
    }
  },
  {
    $sort: { totalRevenue: -1 }
  }
]);

console.log("Advanced MongoDB aggregation examples completed!");`
      }
    ],
    nodejs: [
      {
        title: 'MongoDB with Node.js Integration',
        description: 'Advanced MongoDB integration with Node.js using official driver and Mongoose',
        code: `// MongoDB Node.js Integration - Advanced Examples
// npm install mongodb mongoose dotenv

import { MongoClient, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learning_platform';

// 1. NATIVE MONGODB DRIVER APPROACH
class MongoDBService {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(MONGODB_URI, {
        maxPoolSize: 10,           // Maximum connection pool size
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000,    // Close sockets after 45 seconds of inactivity
        bufferMaxEntries: 0,       // Disable mongoose buffering
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      await this.client.connect();
      this.db = this.client.db();
      console.log('Connected to MongoDB using native driver');
      
      return this.db;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    }
  }

  // Advanced aggregation with native driver
  async getUserAnalytics() {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          newUsers: { $sum: 1 },
          activeUsers: {
            $sum: { $cond: [{ $eq: ["$profile.isActive", true] }, 1, 0] }
          },
          avgAge: { $avg: "$profile.age" },
          skillDistribution: { $push: "$profile.skills" }
        }
      },
      {
        $addFields: {
          allSkills: {
            $reduce: {
              input: "$skillDistribution",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] }
            }
          }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ];

    const result = await this.db.collection('users').aggregate(pipeline).toArray();
    return result;
  }

  // Bulk operations for performance
  async bulkUpdateUsers(updates) {
    const bulkOps = updates.map(update => ({
      updateOne: {
        filter: { _id: new ObjectId(update.userId) },
        update: { $set: update.data },
        upsert: false
      }
    }));

    const result = await this.db.collection('users').bulkWrite(bulkOps);
    return result;
  }

  // Text search with scoring
  async searchUsers(searchTerm, options = {}) {
    const { limit = 10, skip = 0 } = options;
    
    const pipeline = [
      {
        $match: {
          $text: { $search: searchTerm }
        }
      },
      {
        $addFields: {
          score: { $meta: "textScore" }
        }
      },
      {
        $sort: { score: { $meta: "textScore" } }
      },
      { $skip: skip },
      { $limit: limit }
    ];

    return await this.db.collection('users').aggregate(pipeline).toArray();
  }

  // Geospatial queries
  async findNearbyUsers(longitude, latitude, maxDistance = 10000) {
    const query = {
      "profile.location.coordinates": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: maxDistance
        }
      }
    };

    return await this.db.collection('users').find(query).toArray();
  }
}

// 2. MONGOOSE ODM APPROACH
// Define Mongoose schemas
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email address"
    }
  },
  profile: {
    name: { type: String, required: true },
    age: { 
      type: Number, 
      min: [18, 'Age must be at least 18'],
      max: [100, 'Age must be less than 100']
    },
    location: {
      city: String,
      country: String,
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere' // Geospatial index
      }
    },
    skills: [{ 
      type: String,
      enum: ['JavaScript', 'Python', 'MongoDB', 'React', 'Node.js', 'TypeScript']
    }],
    experience: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    bio: { type: String, maxlength: 500 }
  },
  preferences: {
    theme: { 
      type: String, 
      enum: ['light', 'dark', 'auto'], 
      default: 'light' 
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: false },
      sms: { type: Boolean, default: false }
    }
  },
  metadata: {
    loginCount: { type: Number, default: 0 },
    lastLogin: Date,
    ipAddress: String,
    userAgent: String
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add text index for search
userSchema.index({ 
  "profile.name": "text", 
  "profile.bio": "text",
  "profile.skills": "text" 
});

// Virtual properties
userSchema.virtual('profile.experienceLevel').get(function() {
  if (this.profile.experience < 2) return 'Junior';
  if (this.profile.experience < 5) return 'Mid-level';
  return 'Senior';
});

// Middleware
userSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

userSchema.post('save', function(doc) {
  console.log(\`User \${doc.username} has been saved\`);
});

// Instance methods
userSchema.methods.updateLastLogin = function() {
  this.metadata.lastLogin = new Date();
  this.metadata.loginCount += 1;
  return this.save();
};

// Static methods
userSchema.statics.findBySkill = function(skill) {
  return this.find({ 'profile.skills': skill });
};

userSchema.statics.getActiveUsers = function() {
  return this.find({ 'profile.isActive': true });
};

const User = mongoose.model('User', userSchema);

// 3. ADVANCED MONGOOSE OPERATIONS
class UserService {
  
  static async connectMongoose() {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB using Mongoose');
    } catch (error) {
      console.error('Mongoose connection error:', error);
      throw error;
    }
  }

  // Create user with validation
  static async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Username or email already exists');
      }
      throw error;
    }
  }

  // Advanced queries with population and aggregation
  static async getUsersWithAnalytics(filters = {}) {
    const pipeline = [
      { $match: filters },
      {
        $addFields: {
          skillCount: { $size: "$profile.skills" },
          accountAge: {
            $divide: [
              { $subtract: [new Date(), "$createdAt"] },
              1000 * 60 * 60 * 24 // Convert to days
            ]
          }
        }
      },
      {
        $lookup: {
          from: 'activities',
          localField: '_id',
          foreignField: 'userId',
          as: 'recentActivities'
        }
      },
      {
        $addFields: {
          activityCount: { $size: "$recentActivities" },
          lastActivityDate: { $max: "$recentActivities.createdAt" }
        }
      },
      { $sort: { "metadata.loginCount": -1 } }
    ];

    return await User.aggregate(pipeline);
  }

  // Batch operations with transactions
  static async bulkCreateUsers(usersData) {
    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();
      
      const users = await User.insertMany(usersData, { session });
      
      // Log activity
      const activities = users.map(user => ({
        userId: user._id,
        action: 'user_created',
        timestamp: new Date()
      }));
      
      await mongoose.model('Activity').insertMany(activities, { session });
      
      await session.commitTransaction();
      return users;
      
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  // Complex search with full-text and filters
  static async searchUsers(searchParams) {
    const { 
      query, 
      skills, 
      location, 
      experienceMin, 
      experienceMax,
      isActive,
      page = 1, 
      limit = 10 
    } = searchParams;

    let mongoQuery = {};

    // Text search
    if (query) {
      mongoQuery.$text = { $search: query };
    }

    // Filter by skills
    if (skills && skills.length > 0) {
      mongoQuery['profile.skills'] = { $in: skills };
    }

    // Filter by location
    if (location) {
      mongoQuery.$or = [
        { 'profile.location.city': { $regex: location, $options: 'i' } },
        { 'profile.location.country': { $regex: location, $options: 'i' } }
      ];
    }

    // Filter by experience
    if (experienceMin || experienceMax) {
      mongoQuery['profile.experience'] = {};
      if (experienceMin) mongoQuery['profile.experience'].$gte = experienceMin;
      if (experienceMax) mongoQuery['profile.experience'].$lte = experienceMax;
    }

    // Filter by active status
    if (typeof isActive === 'boolean') {
      mongoQuery['profile.isActive'] = isActive;
    }

    const options = {
      page,
      limit,
      sort: query ? { score: { $meta: 'textScore' } } : { createdAt: -1 },
      select: 'username email profile.name profile.skills profile.experience profile.location createdAt'
    };

    // Using mongoose-paginate-v2 plugin (if installed)
    // return await User.paginate(mongoQuery, options);
    
    // Manual pagination
    const skip = (page - 1) * limit;
    const users = await User.find(mongoQuery)
      .select(options.select)
      .sort(options.sort)
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(mongoQuery);

    return {
      docs: users,
      totalDocs: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    };
  }

  // Geospatial queries
  static async findUsersNearLocation(longitude, latitude, maxDistance = 10000) {
    return await User.find({
      'profile.location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: maxDistance
        }
      }
    });
  }

  // Analytics and reporting
  static async generateUserReport() {
    const report = await User.aggregate([
      {
        $facet: {
          totalUsers: [{ $count: "count" }],
          activeUsers: [
            { $match: { "profile.isActive": true } },
            { $count: "count" }
          ],
          skillDistribution: [
            { $unwind: "$profile.skills" },
            { $group: { _id: "$profile.skills", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          experienceDistribution: [
            {
              $bucket: {
                groupBy: "$profile.experience",
                boundaries: [0, 2, 5, 10, 20],
                default: "20+",
                output: { count: { $sum: 1 } }
              }
            }
          ],
          locationDistribution: [
            { $group: { _id: "$profile.location.country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
          ]
        }
      }
    ]);

    return report[0];
  }
}

// 4. PERFORMANCE OPTIMIZATION EXAMPLES

// Index creation for optimal performance
async function createOptimalIndexes() {
  const db = mongoose.connection.db;
  
  // Compound indexes for common queries
  await db.collection('users').createIndex({ 
    "profile.isActive": 1, 
    "profile.experience": -1 
  });
  
  // Partial index for active users only
  await db.collection('users').createIndex(
    { "metadata.lastLogin": -1 },
    { partialFilterExpression: { "profile.isActive": true } }
  );
  
  // TTL index for temporary data
  await db.collection('sessions').createIndex(
    { "createdAt": 1 },
    { expireAfterSeconds: 3600 } // 1 hour
  );
  
  console.log('Optimal indexes created');
}

// Connection pooling and monitoring
function setupConnectionMonitoring() {
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });
}

// 5. USAGE EXAMPLES
async function demonstrateMongoDBFeatures() {
  try {
    // Connect using Mongoose
    await UserService.connectMongoose();
    setupConnectionMonitoring();
    await createOptimalIndexes();

    // Create sample users
    const sampleUsers = [
      {
        username: 'mongodb_expert',
        email: 'mongo@example.com',
        profile: {
          name: 'MongoDB Expert',
          age: 30,
          location: {
            city: 'San Francisco',
            country: 'USA',
            coordinates: [-122.4194, 37.7749]
          },
          skills: ['MongoDB', 'Node.js', 'JavaScript'],
          experience: 8,
          bio: 'Passionate about NoSQL databases and scalable systems'
        }
      }
    ];

    // Create users
    const createdUsers = await UserService.bulkCreateUsers(sampleUsers);
    console.log('Created users:', createdUsers.length);

    // Perform search
    const searchResults = await UserService.searchUsers({
      skills: ['MongoDB'],
      experienceMin: 5
    });
    console.log('Search results:', searchResults.docs.length);

    // Generate analytics
    const report = await UserService.generateUserReport();
    console.log('User report:', report);

  } catch (error) {
    console.error('Error demonstrating MongoDB features:', error);
  }
}

// Export for use in other modules
export { 
  MongoDBService, 
  UserService, 
  User, 
  demonstrateMongoDBFeatures 
};

// Run demonstration
demonstrateMongoDBFeatures();`
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              MongoDB NoSQL
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master MongoDB NoSQL database - document modeling, aggregation pipelines, 
              indexing strategies, and advanced Node.js integration patterns.
            </p>
          </motion.div>

          {/* Interactive MongoDB Playground */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">MongoDB Interactive Playground</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Practice MongoDB queries and operations! CRUD operations, aggregation, and advanced features.
              </p>
              <CodeEditor
                title="MongoDB Playground"
                initialCode={`// Welcome to MongoDB!
// This simulates MongoDB shell commands

// 1. Create and insert documents
db.users.insertOne({
  username: "mongodb_dev",
  email: "dev@mongodb.com",
  profile: {
    name: "MongoDB Developer",
    age: 28,
    skills: ["MongoDB", "JavaScript", "Node.js"],
    location: {
      city: "San Francisco",
      country: "USA"
    },
    isActive: true
  },
  createdAt: new Date()
});

console.log("User inserted successfully!");

// 2. Query documents
const user = db.users.findOne({ username: "mongodb_dev" });
console.log("Found user:", user?.profile?.name);

// 3. Update documents
db.users.updateOne(
  { username: "mongodb_dev" },
  { 
    $set: { "profile.lastLogin": new Date() },
    $push: { "profile.skills": "Express.js" }
  }
);

console.log("User updated!");

// 4. Advanced queries
const activeUsers = db.users.find({ 
  "profile.isActive": true,
  "profile.age": { $gte: 25 }
}).toArray();

console.log("Active users found:", activeUsers.length);

// 5. Aggregation pipeline
const skillStats = db.users.aggregate([
  { $unwind: "$profile.skills" },
  { $group: { 
      _id: "$profile.skills", 
      count: { $sum: 1 } 
    }
  },
  { $sort: { count: -1 } }
]).toArray();

console.log("Skill distribution:", skillStats);

// 6. Array operations
const mongoUsers = db.users.find({
  "profile.skills": "MongoDB"
}).toArray();

console.log("MongoDB experts:", mongoUsers.length);

// Try your own MongoDB queries below:
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
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
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

          {/* MongoDB Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🍃 MongoDB NoSQL Advantages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">📄</div>
                <h3 className="font-semibold mb-2">Document Model</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Flexible schema design</li>
                  <li>• Nested data structures</li>
                  <li>• Rich data types</li>
                  <li>• No complex JOINs</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-semibold mb-2">Aggregation</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Powerful pipeline framework</li>
                  <li>• Real-time analytics</li>
                  <li>• Map-reduce operations</li>
                  <li>• Complex transformations</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">📈</div>
                <h3 className="font-semibold mb-2">Scalability</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Horizontal scaling</li>
                  <li>• Automatic sharding</li>
                  <li>• Replica sets</li>
                  <li>• High availability</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Database className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Document Store</h3>
              <p className="text-gray-600 text-sm">Flexible document-based data model with BSON</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Search className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-semibold mb-2">Rich Queries</h3>
              <p className="text-gray-600 text-sm">Powerful query language with indexing support</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <BarChart3 className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-semibold mb-2">Aggregation</h3>
              <p className="text-gray-600 text-sm">Advanced data processing and analytics pipeline</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Globe className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Geospatial</h3>
              <p className="text-gray-600 text-sm">Built-in geospatial queries and indexing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MongoDBPage
