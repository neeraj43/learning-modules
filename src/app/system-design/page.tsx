'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Globe, Layers, Network, Zap, Settings, HelpCircle, X, Users, MessageSquare, Search, Infinity } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'
import BeginnerGuide from '@/components/beginner/BeginnerGuide'
import HelpCenter from '@/components/beginner/HelpCenter'

const SystemDesignPage = () => {
    const [activeSection, setActiveSection] = useState('fundamentals')
    const [showBeginnerGuide, setShowBeginnerGuide] = useState(true)
    const [showHelpCenter, setShowHelpCenter] = useState(false)

    // Beginner guide steps for System Design
    const beginnerSteps = [
        {
            title: "What is System Design?",
            description: "System Design is the process of defining architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. It's like being an architect for software - you plan how everything fits together before building!",
            tip: "Think of system design like designing a city - you need roads (networks), buildings (services), utilities (databases), and traffic management (load balancing)!",
            tryIt: "Start by understanding what the system needs to do, then break it down into smaller, manageable pieces."
        },
        {
            title: "High Level vs Low Level Design",
            description: "High Level Design (HLD) focuses on the overall architecture - like drawing a city map. Low Level Design (LLD) focuses on specific components - like designing individual buildings with detailed blueprints.",
            code: `// High Level Design - Overview
System Architecture:
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Frontend   │ ──▶│  Load        │ ──▶│  Backend    │
│  (React)    │    │  Balancer    │    │  Services   │
└─────────────┘    └──────────────┘    └─────────────┘
                                              │
                                              ▼
                                       ┌─────────────┐
                                       │  Database   │
                                       │  (MongoDB)  │
                                       └─────────────┘

// Low Level Design - Specific Component
class UserService {
    async createUser(userData) {
        // Input validation
        // Business logic
        // Database operations
        // Return response
    }
}`,
            tip: "HLD is for stakeholders and architects. LLD is for developers who will implement the code.",
            tryIt: "Always start with HLD to see the big picture, then dive into LLD for implementation details."
        },
        {
            title: "Scalability - Handling Growth",
            description: "Scalability is about handling increased load gracefully. Horizontal scaling (adding more servers) vs Vertical scaling (making servers more powerful). Like the difference between hiring more workers vs training existing workers to be super-efficient!",
            code: `// Horizontal Scaling Example
const servers = [
    { id: 1, capacity: 1000 },
    { id: 2, capacity: 1000 },
    { id: 3, capacity: 1000 }
];
// Total capacity: 3000 users

// Vertical Scaling Example  
const server = {
    id: 1, 
    capacity: 3000  // Upgraded single server
};`,
            tip: "Horizontal scaling is usually more cost-effective and provides better fault tolerance.",
            tryIt: "Think about how popular apps like Instagram handle millions of users - they use thousands of servers working together!"
        },
        {
            title: "Real-World Examples",
            description: "We'll design systems you use every day: WhatsApp for messaging, Google for search, Instagram for infinite scrolling, and YouTube for video streaming. Understanding these helps you design any system!",
            tip: "Every big tech company uses the same fundamental principles - just at different scales.",
            tryIt: "As you learn each concept, think about how your favorite apps might be implementing them behind the scenes."
        },
        {
            title: "Why Learn System Design?",
            description: "System Design is crucial for senior developer roles and system architect positions. It's asked in interviews at top tech companies because it shows you can think about building large-scale, reliable systems that millions of people can use.",
            tip: "System design knowledge makes you a better developer even for small projects - you'll make better architectural decisions.",
            tryIt: "Practice by explaining how your favorite apps work to friends - it's great practice for interviews!"
        }
    ]

    const sections = [
        { id: 'fundamentals', name: 'Fundamentals', icon: '📚' },
        { id: 'whatsapp', name: 'WhatsApp Design', icon: '💬' },
        { id: 'search', name: 'Search Engine', icon: '🔍' },
        { id: 'social-feed', name: 'Social Media Feed', icon: '📱' },
        { id: 'video-streaming', name: 'Video Streaming', icon: '📺' },
        { id: 'microservices', name: 'Microservices', icon: '🔧' },
        { id: 'databases', name: 'Database Design', icon: '🗄️' },
        { id: 'case-studies', name: 'Case Studies', icon: '📊' }
    ]

    const codeExamples = {
        fundamentals: [
            {
                title: 'System Design Fundamentals',
                description: '🏗️ Core concepts and principles for designing scalable systems',
                code: `/*
System Design Fundamentals - Core Concepts

1. SCALABILITY PRINCIPLES
=======================
*/

// Horizontal Scaling (Scale Out)
class LoadBalancer {
    constructor() {
        this.servers = [
            { id: 'server1', endpoint: 'https://api1.example.com', load: 0 },
            { id: 'server2', endpoint: 'https://api2.example.com', load: 0 },
            { id: 'server3', endpoint: 'https://api3.example.com', load: 0 }
        ];
    }
    
    // Round Robin Load Balancing
    getNextServer() {
        const server = this.servers.find(s => s.load === Math.min(...this.servers.map(s => s.load)));
        server.load++;
        return server;
    }
    
    // Health Check
    async checkServerHealth() {
        for (const server of this.servers) {
            try {
                const response = await fetch(\`\${server.endpoint}/health\`);
                server.healthy = response.ok;
            } catch (error) {
                server.healthy = false;
            }
        }
    }
}

/*
2. CACHING STRATEGIES
====================
*/

class CacheManager {
    constructor(maxSize = 1000, ttl = 3600) {
        this.cache = new Map();
        this.maxSize = maxSize;
        this.ttl = ttl; // Time to live in seconds
    }
    
    // Cache with TTL (Time To Live)
    set(key, value) {
        if (this.cache.size >= this.maxSize) {
            // LRU eviction - remove oldest entry
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, {
            value,
            timestamp: Date.now(),
            hits: 0
        });
    }
    
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return null;
        
        // Check if expired
        if (Date.now() - entry.timestamp > this.ttl * 1000) {
            this.cache.delete(key);
            return null;
        }
        
        entry.hits++;
        return entry.value;
    }
    
    // Cache hit ratio for monitoring
    getHitRatio() {
        const totalHits = Array.from(this.cache.values()).reduce((sum, entry) => sum + entry.hits, 0);
        const totalRequests = this.cache.size;
        return totalRequests > 0 ? totalHits / totalRequests : 0;
    }
}

/*
3. DATABASE DESIGN PATTERNS
===========================
*/

// Database Sharding Strategy
class DatabaseShardManager {
    constructor() {
        this.shards = [
            { id: 'shard1', connection: 'db1.example.com', userRange: [1, 1000000] },
            { id: 'shard2', connection: 'db2.example.com', userRange: [1000001, 2000000] },
            { id: 'shard3', connection: 'db3.example.com', userRange: [2000001, 3000000] }
        ];
    }
    
    // Hash-based sharding
    getShardForUser(userId) {
        const shardIndex = userId % this.shards.length;
        return this.shards[shardIndex];
    }
    
    // Range-based sharding
    getShardByRange(userId) {
        return this.shards.find(shard => 
            userId >= shard.userRange[0] && userId <= shard.userRange[1]
        );
    }
}

/*
4. MESSAGE QUEUE PATTERNS
=========================
*/

class MessageQueue {
    constructor() {
        this.queues = new Map();
        this.subscribers = new Map();
    }
    
    // Publisher
    publish(topic, message) {
        if (!this.queues.has(topic)) {
            this.queues.set(topic, []);
        }
        
        const messageWithTimestamp = {
            id: Date.now() + Math.random(),
            data: message,
            timestamp: new Date(),
            attempts: 0
        };
        
        this.queues.get(topic).push(messageWithTimestamp);
        this.notifySubscribers(topic, messageWithTimestamp);
    }
    
    // Subscriber
    subscribe(topic, callback) {
        if (!this.subscribers.has(topic)) {
            this.subscribers.set(topic, []);
        }
        this.subscribers.get(topic).push(callback);
    }
    
    notifySubscribers(topic, message) {
        const topicSubscribers = this.subscribers.get(topic) || [];
        topicSubscribers.forEach(callback => {
            try {
                callback(message);
            } catch (error) {
                console.error('Subscriber error:', error);
                // Implement retry logic here
            }
        });
    }
}

/*
5. CONSISTENCY PATTERNS
=======================
*/

class EventualConsistencyManager {
    constructor() {
        this.eventLog = [];
        this.replicas = new Map();
    }
    
    // Write to master, propagate to replicas
    async writeToMaster(data) {
        const event = {
            id: Date.now(),
            type: 'WRITE',
            data,
            timestamp: new Date()
        };
        
        this.eventLog.push(event);
        
        // Asynchronously propagate to replicas
        setTimeout(() => this.propagateToReplicas(event), 0);
        
        return event.id;
    }
    
    async propagateToReplicas(event) {
        for (const [replicaId, replica] of this.replicas) {
            try {
                await replica.applyEvent(event);
            } catch (error) {
                console.error(\`Failed to propagate to replica \${replicaId}\`, error);
                // Implement retry and conflict resolution
            }
        }
    }
}

/*
6. MONITORING AND OBSERVABILITY
===============================
*/

class SystemMetrics {
    constructor() {
        this.metrics = {
            requests: 0,
            errors: 0,
            responseTime: [],
            activeUsers: 0
        };
    }
    
    recordRequest(responseTime, isError = false) {
        this.metrics.requests++;
        this.metrics.responseTime.push(responseTime);
        
        if (isError) {
            this.metrics.errors++;
        }
        
        // Keep only last 1000 response times for memory efficiency
        if (this.metrics.responseTime.length > 1000) {
            this.metrics.responseTime.shift();
        }
    }
    
    getMetrics() {
        const avgResponseTime = this.metrics.responseTime.length > 0
            ? this.metrics.responseTime.reduce((a, b) => a + b) / this.metrics.responseTime.length
            : 0;
            
        const errorRate = this.metrics.requests > 0
            ? (this.metrics.errors / this.metrics.requests) * 100
            : 0;
            
        return {
            totalRequests: this.metrics.requests,
            errorRate: errorRate.toFixed(2) + '%',
            averageResponseTime: avgResponseTime.toFixed(2) + 'ms',
            activeUsers: this.metrics.activeUsers
        };
    }
}

// Example Usage
console.log("=== SYSTEM DESIGN FUNDAMENTALS DEMO ===");

// Load Balancer Demo
const loadBalancer = new LoadBalancer();
console.log("Next server:", loadBalancer.getNextServer());

// Cache Demo
const cache = new CacheManager();
cache.set('user:123', { name: 'Alice', email: 'alice@example.com' });
console.log("Cached user:", cache.get('user:123'));

// Message Queue Demo
const messageQueue = new MessageQueue();
messageQueue.subscribe('user.created', (message) => {
    console.log('New user created:', message.data);
});
messageQueue.publish('user.created', { userId: 123, name: 'Bob' });

// Metrics Demo
const metrics = new SystemMetrics();
metrics.recordRequest(150); // 150ms response time
metrics.recordRequest(200, true); // 200ms with error
console.log("System metrics:", metrics.getMetrics());

console.log("\\n🎯 These are the building blocks of large-scale systems!");`
            },
            {
                title: 'Microservices Architecture Patterns',
                description: '🔧 Learn how to design and implement microservices architecture with practical patterns',
                code: `/*
Microservices Architecture Patterns
==================================
*/

// 1. SERVICE DISCOVERY PATTERN
class ServiceRegistry {
    constructor() {
        this.services = new Map();
        this.healthCheckInterval = 30000; // 30 seconds
        this.startHealthChecks();
    }
    
    // Register a service
    register(serviceName, serviceInstance) {
        if (!this.services.has(serviceName)) {
            this.services.set(serviceName, []);
        }
        
        const instance = {
            ...serviceInstance,
            id: \`\${serviceName}-\${Date.now()}\`,
            registeredAt: new Date(),
            lastHealthCheck: new Date(),
            healthy: true
        };
        
        this.services.get(serviceName).push(instance);
        console.log(\`✅ Registered \${serviceName} instance: \${instance.id}\`);
        return instance.id;
    }
    
    // Discover available instances of a service
    discover(serviceName) {
        const instances = this.services.get(serviceName) || [];
        return instances.filter(instance => instance.healthy);
    }
    
    // Health check mechanism
    async startHealthChecks() {
        setInterval(async () => {
            for (const [serviceName, instances] of this.services) {
                for (const instance of instances) {
                    try {
                        // Simulate health check
                        const isHealthy = Math.random() > 0.1; // 90% uptime
                        instance.healthy = isHealthy;
                        instance.lastHealthCheck = new Date();
                        
                        if (!isHealthy) {
                            console.log(\`⚠️ Health check failed for \${instance.id}\`);
                        }
                    } catch (error) {
                        instance.healthy = false;
                        console.log(\`❌ Health check error for \${instance.id}\`);
                    }
                }
            }
        }, this.healthCheckInterval);
    }
}

// 2. API GATEWAY PATTERN
class APIGateway {
    constructor(serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
        this.rateLimiter = new Map();
        this.routes = new Map();
        this.setupRoutes();
    }
    
    setupRoutes() {
        // Define service routes
        this.routes.set('/api/users', 'user-service');
        this.routes.set('/api/orders', 'order-service');
        this.routes.set('/api/products', 'product-service');
        this.routes.set('/api/notifications', 'notification-service');
    }
    
    async handleRequest(path, method, headers, body) {
        // 1. Rate limiting
        if (!this.checkRateLimit(headers['user-id'])) {
            return { status: 429, message: 'Rate limit exceeded' };
        }
        
        // 2. Authentication
        if (!this.authenticate(headers.authorization)) {
            return { status: 401, message: 'Unauthorized' };
        }
        
        // 3. Route to appropriate service
        const serviceName = this.findService(path);
        if (!serviceName) {
            return { status: 404, message: 'Service not found' };
        }
        
        // 4. Load balance and forward request
        const serviceInstance = this.loadBalance(serviceName);
        if (!serviceInstance) {
            return { status: 503, message: 'Service unavailable' };
        }
        
        // 5. Forward request with circuit breaker
        return await this.forwardRequest(serviceInstance, path, method, body);
    }
    
    findService(path) {
        for (const [route, service] of this.routes) {
            if (path.startsWith(route)) {
                return service;
            }
        }
        return null;
    }
    
    loadBalance(serviceName) {
        const instances = this.serviceRegistry.discover(serviceName);
        if (instances.length === 0) return null;
        
        // Round-robin load balancing
        const randomIndex = Math.floor(Math.random() * instances.length);
        return instances[randomIndex];
    }
    
    checkRateLimit(userId) {
        const now = Date.now();
        const windowSize = 60000; // 1 minute
        const limit = 100; // 100 requests per minute
        
        if (!this.rateLimiter.has(userId)) {
            this.rateLimiter.set(userId, []);
        }
        
        const requests = this.rateLimiter.get(userId);
        // Remove old requests outside the window
        const validRequests = requests.filter(time => now - time < windowSize);
        
        if (validRequests.length >= limit) {
            return false;
        }
        
        validRequests.push(now);
        this.rateLimiter.set(userId, validRequests);
        return true;
    }
    
    authenticate(authHeader) {
        // Simplified authentication
        return authHeader && authHeader.startsWith('Bearer ');
    }
    
    async forwardRequest(serviceInstance, path, method, body) {
        try {
            // Simulate service call
            console.log(\`Forwarding \${method} \${path} to \${serviceInstance.id}\`);
            
            // Simulate response
            return {
                status: 200,
                data: {
                    message: 'Request processed successfully',
                    serviceInstance: serviceInstance.id,
                    timestamp: new Date()
                }
            };
        } catch (error) {
            console.error('Service call failed:', error);
            return { status: 500, message: 'Internal server error' };
        }
    }
}

// 3. CIRCUIT BREAKER PATTERN
class CircuitBreaker {
    constructor(serviceName, options = {}) {
        this.serviceName = serviceName;
        this.failureThreshold = options.failureThreshold || 5;
        this.recoveryTimeout = options.recoveryTimeout || 30000;
        this.monitoringWindow = options.monitoringWindow || 60000;
        
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.failures = [];
        this.lastFailureTime = null;
        this.successCount = 0;
    }
    
    async call(serviceFunction) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime >= this.recoveryTimeout) {
                this.state = 'HALF_OPEN';
                this.successCount = 0;
                console.log(\`🔄 Circuit breaker for \${this.serviceName} is HALF_OPEN\`);
            } else {
                throw new Error(\`Circuit breaker is OPEN for \${this.serviceName}\`);
            }
        }
        
        try {
            const result = await serviceFunction();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failures = [];
        
        if (this.state === 'HALF_OPEN') {
            this.successCount++;
            if (this.successCount >= 3) { // Require 3 successes to close
                this.state = 'CLOSED';
                console.log(\`✅ Circuit breaker for \${this.serviceName} is CLOSED\`);
            }
        }
    }
    
    onFailure() {
        const now = Date.now();
        this.failures.push(now);
        this.lastFailureTime = now;
        
        // Remove old failures outside monitoring window
        this.failures = this.failures.filter(time => now - time < this.monitoringWindow);
        
        if (this.failures.length >= this.failureThreshold) {
            this.state = 'OPEN';
            console.log(\`🚨 Circuit breaker for \${this.serviceName} is OPEN\`);
        }
    }
    
    getState() {
        return {
            state: this.state,
            failures: this.failures.length,
            lastFailureTime: this.lastFailureTime
        };
    }
}

// 4. EVENT-DRIVEN COMMUNICATION
class EventBus {
    constructor() {
        this.subscribers = new Map();
        this.eventHistory = [];
    }
    
    subscribe(eventType, handler, serviceName) {
        if (!this.subscribers.has(eventType)) {
            this.subscribers.set(eventType, []);
        }
        
        this.subscribers.get(eventType).push({
            handler,
            serviceName,
            subscribedAt: new Date()
        });
        
        console.log(\`📡 \${serviceName} subscribed to \${eventType}\`);
    }
    
    async publish(eventType, eventData, sourceService) {
        const event = {
            id: \`evt_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`,
            type: eventType,
            data: eventData,
            source: sourceService,
            timestamp: new Date(),
            version: '1.0'
        };
        
        this.eventHistory.push(event);
        console.log(\`📤 Event published: \${eventType} from \${sourceService}\`);
        
        const subscribers = this.subscribers.get(eventType) || [];
        
        // Publish to all subscribers asynchronously
        const promises = subscribers.map(subscriber => 
            this.deliverEvent(event, subscriber)
        );
        
        await Promise.allSettled(promises);
        return event.id;
    }
    
    async deliverEvent(event, subscriber) {
        try {
            await subscriber.handler(event);
            console.log(\`✅ Event delivered to \${subscriber.serviceName}\`);
        } catch (error) {
            console.error(\`❌ Failed to deliver event to \${subscriber.serviceName}:\`, error);
            // Implement retry logic or dead letter queue here
        }
    }
}

// Demo Usage
console.log("=== MICROSERVICES PATTERNS DEMO ===");

// 1. Service Registry Demo
const registry = new ServiceRegistry();
registry.register('user-service', {
    host: 'localhost',
    port: 3001,
    health: '/health'
});
registry.register('order-service', {
    host: 'localhost',
    port: 3002,
    health: '/health'
});

// 2. API Gateway Demo
const gateway = new APIGateway(registry);
gateway.handleRequest('/api/users/123', 'GET', {
    'authorization': 'Bearer token123',
    'user-id': 'user456'
}, null).then(response => {
    console.log('Gateway response:', response);
});

// 3. Circuit Breaker Demo
const userServiceBreaker = new CircuitBreaker('user-service');
const simulateServiceCall = () => {
    return new Promise((resolve, reject) => {
        // Simulate 70% success rate
        if (Math.random() > 0.3) {
            resolve({ data: 'User data' });
        } else {
            reject(new Error('Service unavailable'));
        }
    });
};

// 4. Event Bus Demo
const eventBus = new EventBus();

// User service subscribes to order events
eventBus.subscribe('order.created', async (event) => {
    console.log('User service processing order created:', event.data.orderId);
}, 'user-service');

// Notification service subscribes to order events
eventBus.subscribe('order.created', async (event) => {
    console.log('Sending notification for order:', event.data.orderId);
}, 'notification-service');

// Order service publishes event
eventBus.publish('order.created', {
    orderId: 'order_123',
    userId: 'user_456',
    amount: 99.99
}, 'order-service');

console.log("\\n🏗️ Microservices architecture enables scalable, maintainable systems!");`
            }
        ],
        whatsapp: [
            {
                title: 'WhatsApp System Design - Complete Architecture',
                description: '💬 Design a real-time messaging system like WhatsApp with billions of users',
                code: `/*
WhatsApp System Design - Complete Architecture
============================================

Requirements:
- 2 billion users worldwide
- 100 billion messages per day
- Real-time messaging
- Group chats (up to 256 members)
- Media sharing (images, videos, documents)
- Message delivery status (sent, delivered, read)
- End-to-end encryption
- 99.9% uptime
*/

// 1. HIGH-LEVEL ARCHITECTURE
class WhatsAppArchitecture {
    constructor() {
        this.components = {
            loadBalancer: new LoadBalancer(),
            apiGateway: new APIGateway(),
            userService: new UserService(),
            messageService: new MessageService(),
            notificationService: new NotificationService(),
            presenceService: new PresenceService(),
            mediaService: new MediaService(),
            webSocketManager: new WebSocketManager(),
            databaseCluster: new DatabaseCluster(),
            cacheCluster: new CacheCluster(),
            messageQueue: new MessageQueue()
        };
    }
}

// 2. REAL-TIME MESSAGING WITH WEBSOCKETS
class WebSocketManager {
    constructor() {
        this.connections = new Map(); // userId -> websocket connection
        this.userSessions = new Map(); // userId -> session info
        this.heartbeatInterval = 30000; // 30 seconds
    }
    
    onConnection(websocket, userId) {
        // Store connection
        this.connections.set(userId, websocket);
        this.userSessions.set(userId, {
            connectedAt: new Date(),
            lastActivity: new Date(),
            deviceInfo: websocket.deviceInfo
        });
        
        // Set user as online
        this.updateUserPresence(userId, 'online');
        
        // Setup heartbeat
        this.setupHeartbeat(websocket, userId);
        
        // Handle incoming messages
        websocket.on('message', (data) => {
            this.handleIncomingMessage(userId, JSON.parse(data));
        });
        
        websocket.on('close', () => {
            this.onDisconnection(userId);
        });
        
        console.log(\`User \${userId} connected via WebSocket\`);
    }
    
    handleIncomingMessage(senderId, messageData) {
        const message = {
            messageId: this.generateMessageId(),
            senderId,
            recipientId: messageData.recipientId,
            content: messageData.content,
            messageType: messageData.type || 'text',
            timestamp: new Date(),
            groupId: messageData.groupId || null
        };
        
        // Validate and sanitize message
        if (!this.validateMessage(message)) {
            this.sendError(senderId, 'Invalid message format');
            return;
        }
        
        // Process message
        this.processMessage(message);
    }
    
    processMessage(message) {
        // 1. Save to database
        this.saveMessage(message);
        
        // 2. Deliver to recipient(s)
        if (message.groupId) {
            this.deliverGroupMessage(message);
        } else {
            this.deliverDirectMessage(message);
        }
        
        // 3. Send delivery confirmation to sender
        this.sendDeliveryStatus(message.senderId, message.messageId, 'sent');
    }
    
    deliverDirectMessage(message) {
        const recipientConnection = this.connections.get(message.recipientId);
        
        if (recipientConnection && recipientConnection.readyState === WebSocket.OPEN) {
            // Recipient is online - deliver immediately
            recipientConnection.send(JSON.stringify({
                type: 'new_message',
                message: message
            }));
            
            // Update delivery status
            this.sendDeliveryStatus(message.senderId, message.messageId, 'delivered');
        } else {
            // Recipient is offline - queue for push notification
            this.queuePushNotification(message);
        }
    }
    
    deliverGroupMessage(message) {
        // Get group members
        this.getGroupMembers(message.groupId).then(members => {
            members.forEach(memberId => {
                if (memberId !== message.senderId) {
                    const memberConnection = this.connections.get(memberId);
                    
                    if (memberConnection && memberConnection.readyState === WebSocket.OPEN) {
                        memberConnection.send(JSON.stringify({
                            type: 'new_group_message',
                            message: message
                        }));
                    } else {
                        this.queuePushNotification({ ...message, recipientId: memberId });
                    }
                }
            });
        });
    }
    
    generateMessageId() {
        return \`msg_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
    }
    
    validateMessage(message) {
        return message.senderId && 
               (message.recipientId || message.groupId) && 
               message.content && 
               message.content.length <= 4096; // 4KB limit
    }
    
    setupHeartbeat(websocket, userId) {
        const heartbeat = setInterval(() => {
            if (websocket.readyState === WebSocket.OPEN) {
                websocket.ping();
                this.userSessions.get(userId).lastActivity = new Date();
            } else {
                clearInterval(heartbeat);
            }
        }, this.heartbeatInterval);
    }
    
    onDisconnection(userId) {
        this.connections.delete(userId);
        this.userSessions.delete(userId);
        this.updateUserPresence(userId, 'offline');
        console.log(\`User \${userId} disconnected\`);
    }
}

// 3. MESSAGE STORAGE AND RETRIEVAL
class MessageService {
    constructor() {
        this.database = new MessageDatabase();
        this.cache = new MessageCache();
    }
    
    async saveMessage(message) {
        // 1. Encrypt message content
        const encryptedMessage = this.encryptMessage(message);
        
        // 2. Save to database with sharding
        const shard = this.getShardForUser(message.senderId);
        await shard.save(encryptedMessage);
        
        // 3. Cache recent messages for quick retrieval
        await this.cache.cacheMessage(message);
        
        return message.messageId;
    }
    
    async getMessageHistory(userId, chatId, limit = 50, offset = 0) {
        // 1. Try cache first for recent messages
        if (offset === 0) {
            const cachedMessages = await this.cache.getRecentMessages(chatId, limit);
            if (cachedMessages.length > 0) {
                return cachedMessages;
            }
        }
        
        // 2. Fetch from database
        const shard = this.getShardForUser(userId);
        const messages = await shard.getMessages(chatId, limit, offset);
        
        // 3. Decrypt messages
        return messages.map(msg => this.decryptMessage(msg));
    }
    
    getShardForUser(userId) {
        // Hash-based sharding
        const hash = this.hashUserId(userId);
        const shardIndex = hash % this.database.shardCount;
        return this.database.shards[shardIndex];
    }
    
    encryptMessage(message) {
        // Simplified encryption (in reality, use proper E2E encryption)
        return {
            ...message,
            content: Buffer.from(message.content).toString('base64')
        };
    }
    
    decryptMessage(message) {
        return {
            ...message,
            content: Buffer.from(message.content, 'base64').toString()
        };
    }
}

// 4. USER PRESENCE AND STATUS
class PresenceService {
    constructor() {
        this.userPresence = new Map(); // userId -> presence info
        this.presenceSubscriptions = new Map(); // userId -> subscribers
    }
    
    updatePresence(userId, status, lastSeen = new Date()) {
        const presence = {
            status, // online, offline, away
            lastSeen,
            updatedAt: new Date()
        };
        
        this.userPresence.set(userId, presence);
        
        // Notify subscribers
        this.notifyPresenceSubscribers(userId, presence);
        
        // Update database for persistence
        this.persistPresence(userId, presence);
    }
    
    subscribeToPresence(subscriberId, targetUserId) {
        if (!this.presenceSubscriptions.has(targetUserId)) {
            this.presenceSubscriptions.set(targetUserId, new Set());
        }
        
        this.presenceSubscriptions.get(targetUserId).add(subscriberId);
    }
    
    notifyPresenceSubscribers(userId, presence) {
        const subscribers = this.presenceSubscriptions.get(userId);
        if (subscribers) {
            subscribers.forEach(subscriberId => {
                this.sendPresenceUpdate(subscriberId, userId, presence);
            });
        }
    }
    
    sendPresenceUpdate(subscriberId, targetUserId, presence) {
        const connection = this.getWebSocketConnection(subscriberId);
        if (connection) {
            connection.send(JSON.stringify({
                type: 'presence_update',
                userId: targetUserId,
                presence
            }));
        }
    }
}

// 5. GROUP CHAT MANAGEMENT
class GroupService {
    constructor() {
        this.groups = new Map();
        this.groupMembers = new Map();
    }
    
    async createGroup(creatorId, groupName, memberIds) {
        const groupId = this.generateGroupId();
        const group = {
            groupId,
            name: groupName,
            createdBy: creatorId,
            createdAt: new Date(),
            memberCount: memberIds.length + 1,
            settings: {
                maxMembers: 256,
                allowMemberInvites: true,
                messageRetention: '1year'
            }
        };
        
        // Add creator to members
        const allMembers = [creatorId, ...memberIds];
        
        // Save group and members
        await this.saveGroup(group);
        await this.saveGroupMembers(groupId, allMembers);
        
        // Notify all members
        this.notifyGroupCreation(group, allMembers);
        
        return groupId;
    }
    
    async addMemberToGroup(groupId, newMemberId, addedBy) {
        const group = await this.getGroup(groupId);
        const members = await this.getGroupMembers(groupId);
        
        // Check permissions and limits
        if (members.length >= group.settings.maxMembers) {
            throw new Error('Group is full');
        }
        
        // Add member
        members.push(newMemberId);
        await this.saveGroupMembers(groupId, members);
        
        // Notify group
        this.notifyMemberAdded(groupId, newMemberId, addedBy, members);
        
        return true;
    }
    
    generateGroupId() {
        return \`grp_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
    }
}

// 6. MEDIA HANDLING
class MediaService {
    constructor() {
        this.storageProviders = {
            images: new S3Storage('whatsapp-images'),
            videos: new S3Storage('whatsapp-videos'),
            documents: new S3Storage('whatsapp-docs')
        };
        this.cdn = new CDN();
    }
    
    async uploadMedia(file, userId, messageId) {
        // 1. Validate file
        if (!this.validateFile(file)) {
            throw new Error('Invalid file');
        }
        
        // 2. Compress if needed
        const processedFile = await this.processFile(file);
        
        // 3. Generate unique filename
        const filename = this.generateFilename(file, messageId);
        
        // 4. Upload to appropriate storage
        const storage = this.getStorageProvider(file.type);
        const uploadResult = await storage.upload(filename, processedFile);
        
        // 5. Generate CDN URL for fast access
        const cdnUrl = this.cdn.generateUrl(uploadResult.key);
        
        return {
            mediaId: uploadResult.key,
            originalName: file.name,
            size: processedFile.size,
            mimeType: file.type,
            cdnUrl,
            uploadedAt: new Date()
        };
    }
    
    validateFile(file) {
        const maxSizes = {
            image: 16 * 1024 * 1024,  // 16MB
            video: 64 * 1024 * 1024,  // 64MB
            document: 100 * 1024 * 1024 // 100MB
        };
        
        const fileType = file.type.split('/')[0];
        const maxSize = maxSizes[fileType] || maxSizes.document;
        
        return file.size <= maxSize;
    }
}

// Demo Usage
console.log("=== WHATSAPP SYSTEM DESIGN DEMO ===");

const whatsapp = new WhatsAppArchitecture();

// Simulate user sending message
const messageData = {
    senderId: 'user123',
    recipientId: 'user456',
    content: 'Hello! How are you?',
    type: 'text'
};

console.log("Message sent:", messageData);
console.log("\\n🏗️ WhatsApp handles billions of messages with this architecture!");
console.log("Key features:");
console.log("- Real-time delivery via WebSockets");
console.log("- Sharded databases for scalability");
console.log("- End-to-end encryption");
console.log("- Media handling with CDN");
console.log("- Group chat support");
console.log("- Presence and typing indicators");`
            }
        ],
        search: [
            {
                title: 'Search Engine Design - Google-like System',
                description: '🔍 Design a search engine that can index billions of web pages and return results in milliseconds',
                code: `/*
Search Engine Design - Google-like System
=======================================

Requirements:
- Index 50+ billion web pages
- Handle 8+ billion searches per day
- Return results in < 100ms
- Support complex queries, autocomplete, personalization
- Handle 40,000+ queries per second
- 99.9% uptime
*/

// 1. WEB CRAWLER SYSTEM
class WebCrawler {
    constructor() {
        this.crawlQueue = new PriorityQueue();
        this.visited = new Set();
        this.robotsParser = new RobotsParser();
        this.rateLimiter = new Map(); // domain -> rate limit info
        this.crawlerInstances = 1000; // Distributed crawlers
    }
    
    async crawlWeb() {
        // Seed URLs from known domains
        const seedUrls = [
            { url: 'https://wikipedia.org', priority: 10 },
            { url: 'https://stackoverflow.com', priority: 9 },
            { url: 'https://github.com', priority: 8 }
            // ... millions more
        ];
        
        seedUrls.forEach(item => this.crawlQueue.enqueue(item));
        
        // Start distributed crawling
        for (let i = 0; i < this.crawlerInstances; i++) {
            this.startCrawlerInstance(i);
        }
    }
    
    async startCrawlerInstance(instanceId) {
        while (!this.crawlQueue.isEmpty()) {
            const urlItem = this.crawlQueue.dequeue();
            
            if (this.visited.has(urlItem.url)) continue;
            
            try {
                // Respect robots.txt and rate limits
                if (!await this.canCrawl(urlItem.url)) {
                    continue;
                }
                
                // Fetch page content
                const pageContent = await this.fetchPage(urlItem.url);
                
                // Parse and extract information
                const pageData = await this.parsePage(urlItem.url, pageContent);
                
                // Send to indexer
                await this.sendToIndexer(pageData);
                
                // Extract and queue new URLs
                const newUrls = this.extractUrls(pageContent, urlItem.url);
                newUrls.forEach(newUrl => {
                    if (!this.visited.has(newUrl)) {
                        this.crawlQueue.enqueue({
                            url: newUrl,
                            priority: this.calculatePriority(newUrl, urlItem.url)
                        });
                    }
                });
                
                this.visited.add(urlItem.url);
                
            } catch (error) {
                console.error(\`Crawl failed for \${urlItem.url}:\`, error);
                // Implement retry logic with exponential backoff
            }
        }
    }
    
    async parsePage(url, content) {
        const cheerio = require('cheerio'); // HTML parser
        const $ = cheerio.load(content);
        
        return {
            url,
            title: $('title').text().trim(),
            metaDescription: $('meta[name="description"]').attr('content') || '',
            headings: this.extractHeadings($),
            text: this.extractText($),
            links: this.extractLinks($, url),
            images: this.extractImages($),
            lastModified: new Date(),
            contentHash: this.hashContent(content),
            pageRank: await this.calculatePageRank(url),
            language: this.detectLanguage(content),
            keywords: this.extractKeywords(content)
        };
    }
    
    calculatePriority(url, sourceUrl) {
        // Priority based on:
        // - Domain authority
        // - Page depth
        // - Source page importance
        // - Content freshness indicators
        
        const domain = new URL(url).hostname;
        const domainAuthority = this.getDomainAuthority(domain);
        const depth = url.split('/').length - 3;
        const sourceAuthority = this.getDomainAuthority(new URL(sourceUrl).hostname);
        
        return Math.max(1, domainAuthority - depth + sourceAuthority * 0.1);
    }
}

// 2. SEARCH INDEX SYSTEM
class SearchIndexer {
    constructor() {
        this.invertedIndex = new Map(); // term -> document list
        this.documentStore = new Map(); // docId -> document metadata
        this.shards = 1000; // Distributed across many machines
        this.indexQueue = new MessageQueue();
    }
    
    async indexDocument(pageData) {
        const docId = this.generateDocumentId(pageData.url);
        
        // Store document metadata
        this.documentStore.set(docId, {
            url: pageData.url,
            title: pageData.title,
            description: pageData.metaDescription,
            lastIndexed: new Date(),
            pageRank: pageData.pageRank,
            contentLength: pageData.text.length
        });
        
        // Tokenize and process text
        const tokens = this.tokenize(pageData.text + ' ' + pageData.title);
        const termFrequencies = this.calculateTermFrequencies(tokens);
        
        // Update inverted index
        for (const [term, frequency] of termFrequencies) {
            await this.addToInvertedIndex(term, docId, frequency, pageData);
        }
        
        console.log(\`Indexed document: \${pageData.url}\`);
    }
    
    tokenize(text) {
        // Advanced tokenization:
        // - Remove HTML tags
        // - Convert to lowercase
        // - Remove punctuation
        // - Stem words (running -> run)
        // - Remove stop words (the, and, or, etc.)
        
        return text
            .toLowerCase()
            .replace(/<[^>]*>/g, '') // Remove HTML
            .replace(/[^\\w\\s]/g, ' ') // Remove punctuation
            .split(/\\s+/)
            .filter(word => word.length > 2)
            .filter(word => !this.isStopWord(word))
            .map(word => this.stemWord(word));
    }
    
    calculateTermFrequencies(tokens) {
        const frequencies = new Map();
        
        tokens.forEach(token => {
            frequencies.set(token, (frequencies.get(token) || 0) + 1);
        });
        
        // Normalize frequencies
        const maxFreq = Math.max(...frequencies.values());
        for (const [term, freq] of frequencies) {
            frequencies.set(term, freq / maxFreq);
        }
        
        return frequencies;
    }
    
    async addToInvertedIndex(term, docId, termFrequency, pageData) {
        if (!this.invertedIndex.has(term)) {
            this.invertedIndex.set(term, []);
        }
        
        const documentEntry = {
            docId,
            termFrequency,
            positions: this.findTermPositions(term, pageData.text),
            inTitle: pageData.title.toLowerCase().includes(term),
            inHeading: pageData.headings.some(h => h.toLowerCase().includes(term)),
            pageRank: pageData.pageRank
        };
        
        this.invertedIndex.get(term).push(documentEntry);
        
        // Sort by relevance score for faster retrieval
        this.invertedIndex.get(term).sort((a, b) => 
            this.calculateRelevanceScore(b, term) - this.calculateRelevanceScore(a, term)
        );
    }
    
    calculateRelevanceScore(docEntry, term) {
        let score = 0;
        
        // Term frequency
        score += docEntry.termFrequency * 10;
        
        // Position bonuses
        if (docEntry.inTitle) score += 50;
        if (docEntry.inHeading) score += 20;
        
        // PageRank influence
        score += docEntry.pageRank * 5;
        
        // Early position bonus
        if (docEntry.positions.length > 0 && docEntry.positions[0] < 100) {
            score += 10;
        }
        
        return score;
    }
}

// 3. QUERY PROCESSING SYSTEM
class QueryProcessor {
    constructor(searchIndexer) {
        this.indexer = searchIndexer;
        this.queryCache = new LRUCache(10000);
        this.autocompleteTree = new TrieTree();
        this.spellChecker = new SpellChecker();
    }
    
    async processQuery(queryString, userId = null, limit = 10) {
        const startTime = Date.now();
        
        // 1. Query preprocessing
        const processedQuery = this.preprocessQuery(queryString);
        
        // 2. Check cache first
        const cacheKey = this.generateCacheKey(processedQuery, userId);
        const cachedResults = this.queryCache.get(cacheKey);
        if (cachedResults) {
            console.log(\`Cache hit for query: \${queryString}\`);
            return { ...cachedResults, cached: true };
        }
        
        // 3. Spell correction
        const correctedQuery = await this.spellChecker.correct(processedQuery);
        
        // 4. Query expansion (synonyms, related terms)
        const expandedTerms = this.expandQuery(correctedQuery);
        
        // 5. Search execution
        const searchResults = await this.executeSearch(expandedTerms, limit);
        
        // 6. Ranking and personalization
        const rankedResults = await this.rankResults(searchResults, userId, expandedTerms);
        
        // 7. Cache results
        const results = {
            query: queryString,
            correctedQuery: correctedQuery.join(' '),
            results: rankedResults,
            totalResults: searchResults.length,
            executionTime: Date.now() - startTime,
            cached: false
        };
        
        this.queryCache.set(cacheKey, results);
        
        return results;
    }
    
    preprocessQuery(queryString) {
        // Parse query for special operators:
        // - Quotes for exact phrases: "machine learning"
        // - Site operator: site:stackoverflow.com
        // - Filetype: filetype:pdf
        // - Date ranges, etc.
        
        const query = {
            terms: [],
            phrases: [],
            siteFilter: null,
            fileTypeFilter: null,
            dateFilter: null
        };
        
        // Extract quoted phrases
        const phraseMatches = queryString.match(/"([^"]+)"/g);
        if (phraseMatches) {
            query.phrases = phraseMatches.map(phrase => phrase.replace(/"/g, ''));
            queryString = queryString.replace(/"[^"]+"/g, '');
        }
        
        // Extract site filter
        const siteMatch = queryString.match(/site:(\\S+)/);
        if (siteMatch) {
            query.siteFilter = siteMatch[1];
            queryString = queryString.replace(/site:\\S+/g, '');
        }
        
        // Extract remaining terms
        query.terms = queryString
            .trim()
            .toLowerCase()
            .split(/\\s+/)
            .filter(term => term.length > 0);
        
        return query;
    }
    
    async executeSearch(query, limit) {
        const results = new Map(); // docId -> score
        
        // Search for individual terms
        for (const term of query.terms) {
            const termResults = this.indexer.invertedIndex.get(term) || [];
            
            termResults.forEach(docEntry => {
                const currentScore = results.get(docEntry.docId) || 0;
                const termScore = this.calculateRelevanceScore(docEntry, term);
                results.set(docEntry.docId, currentScore + termScore);
            });
        }
        
        // Boost scores for phrase matches
        for (const phrase of query.phrases) {
            const phraseResults = await this.searchPhrase(phrase);
            phraseResults.forEach(docEntry => {
                const currentScore = results.get(docEntry.docId) || 0;
                results.set(docEntry.docId, currentScore + 100); // Strong boost for phrases
            });
        }
        
        // Convert to array and sort by score
        const sortedResults = Array.from(results.entries())
            .map(([docId, score]) => ({
                docId,
                score,
                document: this.indexer.documentStore.get(docId)
            }))
            .filter(result => result.document) // Ensure document exists
            .sort((a, b) => b.score - a.score)
            .slice(0, limit * 2); // Get more results for ranking
        
        return sortedResults;
    }
    
    async rankResults(searchResults, userId, query) {
        // Advanced ranking algorithm combining:
        // - Relevance score (TF-IDF)
        // - PageRank
        // - User personalization
        // - Click-through rates
        // - Freshness
        // - Domain authority
        
        const rankedResults = searchResults.map(result => {
            let finalScore = result.score;
            
            // PageRank influence (0-10 scale)
            finalScore += result.document.pageRank * 10;
            
            // Freshness boost (newer content gets slight boost)
            const daysSinceIndexed = (Date.now() - result.document.lastIndexed) / (1000 * 60 * 60 * 24);
            if (daysSinceIndexed < 30) {
                finalScore += (30 - daysSinceIndexed) * 0.5;
            }
            
            // Personalization (if user data available)
            if (userId) {
                const personalScore = this.getPersonalizationScore(userId, result.document);
                finalScore += personalScore;
            }
            
            return {
                ...result,
                finalScore
            };
        });
        
        return rankedResults
            .sort((a, b) => b.finalScore - a.finalScore)
            .slice(0, 10) // Return top 10 results
            .map(result => ({
                title: result.document.title,
                url: result.document.url,
                description: result.document.description,
                score: result.finalScore
            }));
    }
    
    getPersonalizationScore(userId, document) {
        // Personalization based on:
        // - User's previous searches
        // - Clicked results
        // - Geographic location
        // - Language preference
        // - Device type
        // - Time of day patterns
        
        // Simplified personalization
        return Math.random() * 5; // 0-5 boost
    }
}

// 4. AUTOCOMPLETE AND SUGGESTIONS
class AutocompleteService {
    constructor() {
        this.trie = new TrieTree();
        this.popularQueries = new Map(); // query -> frequency
        this.userQueries = new Map(); // userId -> recent queries
    }
    
    addQuery(query, userId = null) {
        // Add to global popularity
        const currentCount = this.popularQueries.get(query) || 0;
        this.popularQueries.set(query, currentCount + 1);
        
        // Add to trie for prefix matching
        this.trie.insert(query);
        
        // Track user-specific queries
        if (userId) {
            if (!this.userQueries.has(userId)) {
                this.userQueries.set(userId, []);
            }
            const userQueryList = this.userQueries.get(userId);
            userQueryList.unshift(query);
            
            // Keep only recent 100 queries per user
            if (userQueryList.length > 100) {
                userQueryList.splice(100);
            }
        }
    }
    
    getSuggestions(prefix, userId = null, limit = 8) {
        // Get prefix matches from trie
        const trieMatches = this.trie.search(prefix);
        
        // Score suggestions based on popularity and personalization
        const scoredSuggestions = trieMatches.map(suggestion => {
            let score = this.popularQueries.get(suggestion) || 0;
            
            // Personalization boost
            if (userId && this.userQueries.has(userId)) {
                const userQueryList = this.userQueries.get(userId);
                if (userQueryList.includes(suggestion)) {
                    score += 1000; // Strong boost for user's own queries
                }
            }
            
            return { suggestion, score };
        });
        
        // Sort by score and return top suggestions
        return scoredSuggestions
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.suggestion);
    }
}

// Demo Usage
console.log("=== SEARCH ENGINE SYSTEM DESIGN DEMO ===");

// Initialize search engine components
const crawler = new WebCrawler();
const indexer = new SearchIndexer();
const queryProcessor = new QueryProcessor(indexer);
const autocomplete = new AutocompleteService();

// Simulate indexing a document
const samplePage = {
    url: "https://example.com/machine-learning",
    title: "Introduction to Machine Learning",
    metaDescription: "Learn the basics of machine learning algorithms",
    text: "Machine learning is a subset of artificial intelligence that focuses on algorithms that can learn from data...",
    headings: ["What is Machine Learning?", "Types of ML Algorithms"],
    pageRank: 8.5
};

indexer.indexDocument(samplePage);

// Simulate search query
queryProcessor.processQuery("machine learning basics", "user123").then(results => {
    console.log("Search Results:", results);
});

// Simulate autocomplete
autocomplete.addQuery("machine learning basics");
autocomplete.addQuery("machine learning algorithms");
const suggestions = autocomplete.getSuggestions("machine");
console.log("Autocomplete suggestions:", suggestions);

console.log("\\n🔍 Search Engine handles billions of queries with this architecture!");
console.log("Key components:");
console.log("- Distributed web crawling");
console.log("- Inverted index for fast lookups");
console.log("- Advanced ranking algorithms");
console.log("- Real-time autocomplete");
console.log("- Personalized results");`
            }
        ],
        'social-feed': [
            {
                title: 'Social Media Feed & Infinite Scrolling',
                description: '📱 Design a scalable social media feed system with infinite scrolling like Instagram/Facebook',
                code: `/*
Social Media Feed System with Infinite Scrolling
==============================================

Requirements:
- 2 billion users
- 500 million daily active users
- 95 million posts per day
- Real-time feed updates
- Infinite scrolling
- Personalized content ranking
- Support for text, images, videos
- Like, comment, share functionality
*/

// 1. FEED GENERATION SYSTEM
class FeedGenerationService {
    constructor() {
        this.followGraphService = new FollowGraphService();
        this.postService = new PostService();
        this.rankingService = new RankingService();
        this.cacheService = new FeedCacheService();
        this.fanoutService = new FanoutService();
    }
    
    // Two main approaches: Pull Model vs Push Model
    // We'll use hybrid approach for scalability
    
    async generateFeedForUser(userId, cursor = null, limit = 20) {
        const startTime = Date.now();
        
        // 1. Check cache first
        const cachedFeed = await this.cacheService.getCachedFeed(userId, cursor, limit);
        if (cachedFeed) {
            console.log(\`Cache hit for user \${userId} feed\`);
            return cachedFeed;
        }
        
        // 2. Get user's social graph
        const followedUsers = await this.followGraphService.getFollowedUsers(userId);
        
        // 3. Fetch recent posts from followed users
        const recentPosts = await this.fetchRecentPosts(followedUsers, cursor, limit * 3);
        
        // 4. Add trending/suggested content
        const suggestedPosts = await this.getSuggestedContent(userId, limit / 4);
        
        // 5. Combine and rank all posts
        const allPosts = [...recentPosts, ...suggestedPosts];
        const rankedFeed = await this.rankingService.rankPosts(allPosts, userId);
        
        // 6. Paginate results
        const paginatedFeed = this.paginateFeed(rankedFeed, cursor, limit);
        
        // 7. Cache the results
        await this.cacheService.cacheFeed(userId, paginatedFeed);
        
        console.log(\`Generated feed for user \${userId} in \${Date.now() - startTime}ms\`);
        return paginatedFeed;
    }
    
    async fetchRecentPosts(userIds, cursor, limit) {
        // Fetch posts from multiple users efficiently
        const timeBasedCursor = cursor ? new Date(cursor) : new Date();
        
        const posts = await Promise.all(
            userIds.map(async (userId) => {
                return await this.postService.getUserPosts(
                    userId, 
                    timeBasedCursor, 
                    Math.ceil(limit / userIds.length)
                );
            })
        );
        
        // Flatten and sort by timestamp
        return posts
            .flat()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);
    }
    
    paginateFeed(posts, cursor, limit) {
        let startIndex = 0;
        
        if (cursor) {
            // Find starting position based on cursor
            startIndex = posts.findIndex(post => post.id === cursor);
            if (startIndex === -1) startIndex = 0;
            else startIndex += 1; // Start after the cursor post
        }
        
        const endIndex = Math.min(startIndex + limit, posts.length);
        const paginatedPosts = posts.slice(startIndex, endIndex);
        
        return {
            posts: paginatedPosts,
            nextCursor: endIndex < posts.length ? posts[endIndex - 1].id : null,
            hasMore: endIndex < posts.length,
            totalCount: posts.length
        };
    }
}

// 2. INFINITE SCROLLING IMPLEMENTATION
class InfiniteScrollFeedClient {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.posts = [];
        this.loading = false;
        this.hasMore = true;
        this.nextCursor = null;
        this.batchSize = 20;
        
        this.setupScrollListener();
        this.setupIntersectionObserver();
    }
    
    async loadInitialFeed() {
        this.loading = true;
        
        try {
            const response = await this.apiClient.getFeed({
                limit: this.batchSize
            });
            
            this.posts = response.posts;
            this.nextCursor = response.nextCursor;
            this.hasMore = response.hasMore;
            
            this.renderPosts(response.posts);
            
        } catch (error) {
            console.error('Failed to load initial feed:', error);
            this.showErrorMessage();
        } finally {
            this.loading = false;
        }
    }
    
    async loadMorePosts() {
        if (this.loading || !this.hasMore) return;
        
        this.loading = true;
        this.showLoadingIndicator();
        
        try {
            const response = await this.apiClient.getFeed({
                cursor: this.nextCursor,
                limit: this.batchSize
            });
            
            // Append new posts
            this.posts.push(...response.posts);
            this.nextCursor = response.nextCursor;
            this.hasMore = response.hasMore;
            
            // Render new posts with animation
            this.renderPosts(response.posts, true);
            
            // Preload images for smooth scrolling
            this.preloadImages(response.posts);
            
        } catch (error) {
            console.error('Failed to load more posts:', error);
            this.showRetryOption();
        } finally {
            this.loading = false;
            this.hideLoadingIndicator();
        }
    }
    
    setupScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    setupIntersectionObserver() {
        // Modern approach using Intersection Observer API
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadMorePosts();
                    }
                });
            },
            {
                rootMargin: '100px' // Trigger 100px before reaching the element
            }
        );
        
        // Observe the loading trigger element
        const loadingTrigger = document.getElementById('loading-trigger');
        if (loadingTrigger) {
            this.observer.observe(loadingTrigger);
        }
    }
    
    handleScroll() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Load more when user is 200px from bottom
        if (scrollPosition >= documentHeight - 200) {
            this.loadMorePosts();
        }
        
        // Update viewport posts for performance
        this.updateViewportPosts();
    }
    
    updateViewportPosts() {
        // Virtualization: Only render posts visible in viewport + buffer
        const viewportHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const buffer = viewportHeight; // Buffer above and below viewport
        
        const visibleStart = scrollTop - buffer;
        const visibleEnd = scrollTop + viewportHeight + buffer;
        
        this.posts.forEach((post, index) => {
            const postElement = document.getElementById(\`post-\${post.id}\`);
            if (postElement) {
                const postTop = postElement.offsetTop;
                const postBottom = postTop + postElement.offsetHeight;
                
                const shouldBeVisible = postBottom >= visibleStart && postTop <= visibleEnd;
                
                if (shouldBeVisible && !postElement.classList.contains('rendered')) {
                    this.renderFullPost(postElement, post);
                    postElement.classList.add('rendered');
                } else if (!shouldBeVisible && postElement.classList.contains('rendered')) {
                    this.renderPlaceholder(postElement, post);
                    postElement.classList.remove('rendered');
                }
            }
        });
    }
    
    renderPosts(posts, append = false) {
        const feedContainer = document.getElementById('feed-container');
        
        posts.forEach(post => {
            const postElement = this.createPostElement(post);
            
            if (append) {
                feedContainer.appendChild(postElement);
                // Add entrance animation
                postElement.classList.add('post-enter');
                setTimeout(() => postElement.classList.add('post-enter-active'), 10);
            } else {
                feedContainer.appendChild(postElement);
            }
        });
    }
    
    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.id = \`post-\${post.id}\`;
        postDiv.className = 'post-container';
        
        // Start with placeholder, actual content loaded when in viewport
        postDiv.innerHTML = \`
            <div class="post-placeholder">
                <div class="skeleton-header"></div>
                <div class="skeleton-content"></div>
                <div class="skeleton-actions"></div>
            </div>
        \`;
        
        return postDiv;
    }
    
    renderFullPost(element, post) {
        element.innerHTML = \`
            <div class="post-header">
                <img src="\${post.author.avatar}" alt="\${post.author.name}" class="avatar">
                <div class="post-meta">
                    <span class="author-name">\${post.author.name}</span>
                    <span class="post-time">\${this.formatTime(post.createdAt)}</span>
                </div>
            </div>
            <div class="post-content">
                \${post.content}
                \${post.media ? this.renderMedia(post.media) : ''}
            </div>
            <div class="post-actions">
                <button class="like-btn \${post.liked ? 'liked' : ''}" data-post-id="\${post.id}">
                    ❤️ \${post.likesCount}
                </button>
                <button class="comment-btn" data-post-id="\${post.id}">
                    💬 \${post.commentsCount}
                </button>
                <button class="share-btn" data-post-id="\${post.id}">
                    🔄 Share
                </button>
            </div>
        \`;
        
        this.attachPostEventListeners(element, post);
    }
    
    preloadImages(posts) {
        posts.forEach(post => {
            if (post.media && post.media.type === 'image') {
                const img = new Image();
                img.src = post.media.url;
            }
        });
    }
}

// 3. REAL-TIME FEED UPDATES
class RealTimeFeedUpdates {
    constructor(userId) {
        this.userId = userId;
        this.websocket = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.pendingUpdates = [];
        
        this.connect();
    }
    
    connect() {
        const wsUrl = \`wss://api.socialapp.com/feed/\${this.userId}\`;
        this.websocket = new WebSocket(wsUrl);
        
        this.websocket.onopen = () => {
            console.log('Feed WebSocket connected');
            this.reconnectAttempts = 0;
            
            // Send pending updates
            this.processPendingUpdates();
        };
        
        this.websocket.onmessage = (event) => {
            const update = JSON.parse(event.data);
            this.handleFeedUpdate(update);
        };
        
        this.websocket.onclose = () => {
            console.log('Feed WebSocket disconnected');
            this.attemptReconnect();
        };
        
        this.websocket.onerror = (error) => {
            console.error('Feed WebSocket error:', error);
        };
    }
    
    handleFeedUpdate(update) {
        switch (update.type) {
            case 'new_post':
                this.handleNewPost(update.data);
                break;
            case 'post_updated':
                this.handlePostUpdate(update.data);
                break;
            case 'post_deleted':
                this.handlePostDeletion(update.data);
                break;
            case 'like_update':
                this.handleLikeUpdate(update.data);
                break;
            case 'comment_added':
                this.handleNewComment(update.data);
                break;
        }
    }
    
    handleNewPost(postData) {
        // Show notification for new posts from close friends
        if (postData.author.isCloseFriend) {
            this.showNewPostNotification(postData);
        }
        
        // Add to top of feed if user is at the top
        if (window.scrollY < 100) {
            this.prependPostToFeed(postData);
        } else {
            // Show "New posts available" indicator
            this.showNewPostsIndicator();
        }
    }
    
    handleLikeUpdate(updateData) {
        const postElement = document.getElementById(\`post-\${updateData.postId}\`);
        if (postElement) {
            const likeButton = postElement.querySelector('.like-btn');
            likeButton.textContent = \`❤️ \${updateData.newCount}\`;
            
            if (updateData.likedByUser) {
                likeButton.classList.add('liked');
            } else {
                likeButton.classList.remove('liked');
            }
        }
    }
    
    showNewPostsIndicator() {
        const indicator = document.getElementById('new-posts-indicator');
        indicator.style.display = 'block';
        indicator.textContent = 'New posts available';
        indicator.onclick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.refreshFeed();
        };
    }
}

// 4. PERFORMANCE OPTIMIZATIONS
class FeedPerformanceOptimizer {
    constructor() {
        this.imageCache = new Map();
        this.postElementPool = [];
        this.renderQueue = [];
        this.isProcessingQueue = false;
    }
    
    // Lazy loading for images
    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        this.loadImageWithFallback(img, src);
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    async loadImageWithFallback(imgElement, src) {
        try {
            // Check cache first
            if (this.imageCache.has(src)) {
                imgElement.src = this.imageCache.get(src);
                return;
            }
            
            // Load image
            const img = new Image();
            img.onload = () => {
                imgElement.src = src;
                this.imageCache.set(src, src);
            };
            img.onerror = () => {
                imgElement.src = '/images/placeholder.jpg';
            };
            img.src = src;
            
        } catch (error) {
            imgElement.src = '/images/error-placeholder.jpg';
        }
    }
    
    // Virtual scrolling for large feeds
    implementVirtualScrolling() {
        const feedContainer = document.getElementById('feed-container');
        const scrollableHeight = feedContainer.scrollHeight;
        const viewportHeight = window.innerHeight;
        const itemHeight = 400; // Average post height
        
        const totalItems = Math.floor(scrollableHeight / itemHeight);
        const visibleItems = Math.ceil(viewportHeight / itemHeight) + 2; // Buffer
        
        let startIndex = Math.floor(window.scrollY / itemHeight);
        let endIndex = Math.min(startIndex + visibleItems, totalItems);
        
        // Only render visible items
        this.renderVisibleItems(startIndex, endIndex);
    }
    
    // Batch DOM updates
    batchDOMUpdates(callback) {
        this.renderQueue.push(callback);
        
        if (!this.isProcessingQueue) {
            this.isProcessingQueue = true;
            requestAnimationFrame(() => {
                this.processRenderQueue();
            });
        }
    }
    
    processRenderQueue() {
        const fragment = document.createDocumentFragment();
        
        this.renderQueue.forEach(callback => {
            callback(fragment);
        });
        
        // Single DOM update
        document.getElementById('feed-container').appendChild(fragment);
        
        this.renderQueue = [];
        this.isProcessingQueue = false;
    }
}

// Demo Usage
console.log("=== SOCIAL MEDIA FEED SYSTEM DEMO ===");

// Initialize feed system
const feedService = new FeedGenerationService();
const feedClient = new InfiniteScrollFeedClient({
    getFeed: async (params) => {
        return await feedService.generateFeedForUser('user123', params.cursor, params.limit);
    }
});

// Simulate real-time updates
const realTimeUpdates = new RealTimeFeedUpdates('user123');

// Initialize performance optimizations
const optimizer = new FeedPerformanceOptimizer();
optimizer.setupLazyLoading();

console.log("\\n📱 Social Media Feed System Features:");
console.log("- Infinite scrolling with smooth performance");
console.log("- Real-time updates via WebSocket");
console.log("- Personalized content ranking");
console.log("- Efficient caching and pagination");
console.log("- Virtual scrolling for large feeds");
console.log("- Lazy loading for images");
console.log("- Optimistic UI updates");

// Simulate generating a feed
feedService.generateFeedForUser('user123').then(feed => {
    console.log(\`Generated feed with \${feed.posts.length} posts\`);
    console.log("Next cursor:", feed.nextCursor);
    console.log("Has more:", feed.hasMore);
});`
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
                        <CodeEditor
                            initialCode={example.code}
                            title={example.title}
                            height="600px"
                        />
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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        System Design Mastery 🏗️
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Learn to design large-scale systems like WhatsApp, Google, Instagram with real-world examples, scalability patterns, and industry best practices
                    </p>
                </motion.div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {sections.map((section) => (
                        <motion.button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${activeSection === section.id
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-200'
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
                {activeSection === 'fundamentals' && showBeginnerGuide && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">🎯 New to System Design? Start Here!</h3>
                            <button
                                onClick={() => setShowBeginnerGuide(false)}
                                className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                                Hide Guide
                            </button>
                        </div>
                        <BeginnerGuide
                            topic="System Design"
                            steps={beginnerSteps}
                            nextTopics={["WhatsApp Design", "Search Engine", "Social Media Feed"]}
                        />
                    </motion.div>
                )}

                {/* Show beginner guide toggle */}
                {activeSection === 'fundamentals' && !showBeginnerGuide && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-8 text-center"
                    >
                        <button
                            onClick={() => setShowBeginnerGuide(true)}
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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

                {/* Why Learn System Design */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white"
                >
                    <h2 className="text-3xl font-bold mb-6 text-center">Why Master System Design? 🚀</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">💼 Career Growth</h3>
                            <ul className="space-y-2">
                                <li>• Required for senior engineer roles</li>
                                <li>• Essential for system architect positions</li>
                                <li>• Asked in FAANG company interviews</li>
                                <li>• Enables technical leadership opportunities</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3">🧠 Technical Skills</h3>
                            <ul className="space-y-2">
                                <li>• Design systems for millions of users</li>
                                <li>• Understand scalability and reliability</li>
                                <li>• Make informed architectural decisions</li>
                                <li>• Learn from real-world case studies</li>
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

export default SystemDesignPage
