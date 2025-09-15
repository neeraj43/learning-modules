'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Server, Globe, Package, Settings, Terminal } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'

const DockerPage = () => {
  const [activeSection, setActiveSection] = useState('basics')

  const sections = [
    { id: 'basics', name: 'Docker Basics', icon: '🐳' },
    { id: 'dockerfile', name: 'Dockerfile', icon: '📄' },
    { id: 'compose', name: 'Docker Compose', icon: '🎼' },
    { id: 'networking', name: 'Networking', icon: '🌐' },
    { id: 'volumes', name: 'Volumes & Storage', icon: '💾' },
    { id: 'production', name: 'Production Deploy', icon: '🚀' },
    { id: 'best-practices', name: 'Best Practices', icon: '⭐' },
    { id: 'kubernetes', name: 'Kubernetes Intro', icon: '☸️' }
  ]

  const codeExamples = {
    basics: [
      {
        title: 'Docker Fundamentals',
        description: 'Essential Docker commands and concepts for containerization',
        code: `# Docker Fundamentals - Essential Commands

# 1. BASIC DOCKER COMMANDS
# Check Docker version and info
docker --version
docker info

# List all containers (running and stopped)
docker ps -a

# List all images
docker images

# 2. RUNNING CONTAINERS
# Run a simple container
docker run hello-world

# Run interactive Ubuntu container
docker run -it ubuntu:20.04 /bin/bash

# Run container in background (detached mode)
docker run -d nginx:latest

# Run with port mapping
docker run -d -p 8080:80 nginx:latest

# Run with environment variables
docker run -d -e NODE_ENV=production -e PORT=3000 node:16-alpine

# Run with volume mounting
docker run -d -v /host/path:/container/path nginx:latest

# Run with custom name
docker run -d --name my-nginx nginx:latest

# 3. CONTAINER MANAGEMENT
# Stop a running container
docker stop container_name_or_id

# Start a stopped container
docker start container_name_or_id

# Restart a container
docker restart container_name_or_id

# Remove a container
docker rm container_name_or_id

# Remove all stopped containers
docker container prune

# Force remove a running container
docker rm -f container_name_or_id

# 4. IMAGE MANAGEMENT
# Pull an image from Docker Hub
docker pull ubuntu:20.04
docker pull node:16-alpine
docker pull postgres:13

# Remove an image
docker rmi image_name_or_id

# Remove all unused images
docker image prune

# Remove all images
docker rmi $(docker images -q)

# 5. INSPECTING CONTAINERS AND IMAGES
# Get detailed information about a container
docker inspect container_name_or_id

# View container logs
docker logs container_name_or_id

# Follow logs in real-time
docker logs -f container_name_or_id

# Execute commands in running container
docker exec -it container_name_or_id /bin/bash

# Copy files between host and container
docker cp file.txt container_name:/path/to/destination
docker cp container_name:/path/to/file ./local_file

# 6. BUILDING IMAGES
# Build image from Dockerfile in current directory
docker build -t my-app:latest .

# Build with custom Dockerfile name
docker build -f custom.Dockerfile -t my-app:latest .

# Build with build arguments
docker build --build-arg NODE_VERSION=16 -t my-app:latest .

# 7. DOCKER REGISTRY OPERATIONS
# Tag an image for registry
docker tag my-app:latest username/my-app:latest

# Push image to registry
docker push username/my-app:latest

# Login to Docker Hub
docker login

# Login to private registry
docker login registry.example.com

# 8. NETWORK MANAGEMENT
# List networks
docker network ls

# Create custom network
docker network create my-network

# Run container with specific network
docker run -d --network my-network nginx:latest

# Connect container to network
docker network connect my-network container_name

# 9. VOLUME MANAGEMENT
# List volumes
docker volume ls

# Create volume
docker volume create my-volume

# Remove volume
docker volume rm my-volume

# Remove all unused volumes
docker volume prune

# 10. SYSTEM CLEANUP
# Remove all stopped containers, unused networks, images, and build cache
docker system prune

# Remove everything including unused images
docker system prune -a

# Show disk usage
docker system df

# 11. MONITORING AND STATS
# Show real-time container resource usage
docker stats

# Show resource usage for specific container
docker stats container_name

# Show running processes in container
docker top container_name

# 12. DOCKER COMPOSE QUICK START
# Start services defined in docker-compose.yml
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Build and start services
docker-compose up --build

# View service logs
docker-compose logs service_name

# Scale a service
docker-compose up --scale web=3

echo "Docker fundamentals covered!"
echo "Next: Create your first Dockerfile"`
      }
    ],
    dockerfile: [
      {
        title: 'Dockerfile Best Practices',
        description: 'Creating efficient and secure Docker images with multi-stage builds',
        code: `# Dockerfile Examples - From Basic to Advanced

# 1. BASIC NODE.JS APPLICATION DOCKERFILE
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Start command
CMD ["npm", "start"]

# 2. MULTI-STAGE BUILD FOR PRODUCTION
# Build stage
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:16-alpine AS runner

WORKDIR /app

# Create user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]

# 3. PYTHON APPLICATION WITH VIRTUAL ENVIRONMENT
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install system dependencies
RUN apt-get update \\
    && apt-get install -y --no-install-recommends \\
        build-essential \\
        curl \\
    && rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python -m venv $VIRTUAL_ENV

# Set working directory
WORKDIR /app

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app
RUN chown -R app:app /app
USER app

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:8000/health || exit 1

# Start command
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]

# 4. NGINX WITH CUSTOM CONFIGURATION
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificates (if needed)
COPY certs/ /etc/nginx/certs/

# Copy static files
COPY --from=builder /app/build /usr/share/nginx/html

# Create nginx user (if not exists)
RUN adduser -D -S -h /var/cache/nginx -s /sbin/nologin -G nginx nginx

# Set proper permissions
RUN chown -R nginx:nginx /var/cache/nginx
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

# Expose ports
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# 5. DATABASE DOCKERFILE (PostgreSQL with Custom Config)
FROM postgres:13-alpine

# Set environment variables
ENV POSTGRES_DB=myapp
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword

# Copy initialization scripts
COPY init-scripts/ /docker-entrypoint-initdb.d/

# Copy custom PostgreSQL configuration
COPY postgresql.conf /etc/postgresql/postgresql.conf
COPY pg_hba.conf /etc/postgresql/pg_hba.conf

# Install additional extensions
RUN apk add --no-cache postgresql-contrib

# Create data directory
RUN mkdir -p /var/lib/postgresql/data
RUN chown -R postgres:postgres /var/lib/postgresql

# Expose port
EXPOSE 5432

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \\
  CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB || exit 1

# Start PostgreSQL
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]

# 6. ADVANCED DOCKERFILE WITH BUILD ARGS AND LABELS
ARG NODE_VERSION=16
ARG APP_ENV=production

FROM node:$NODE_VERSION-alpine

# Metadata labels
LABEL maintainer="devops@company.com"
LABEL version="1.0.0"
LABEL description="Company Web Application"
LABEL org.opencontainers.image.source="https://github.com/company/webapp"

# Build arguments
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION

# Environment variables
ENV NODE_ENV=$APP_ENV
ENV APP_VERSION=$VERSION
ENV BUILD_DATE=$BUILD_DATE
ENV VCS_REF=$VCS_REF

# Install global dependencies
RUN npm install -g pm2

# Install system dependencies
RUN apk add --no-cache \\
    curl \\
    dumb-init \\
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies based on environment
RUN if [ "$APP_ENV" = "production" ] ; then \\
        npm ci --only=production ; \\
    else \\
        npm ci ; \\
    fi

# Copy application code
COPY . .

# Build application if needed
RUN if [ "$APP_ENV" = "production" ] ; then \\
        npm run build ; \\
    fi

# Create user and set permissions
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start with PM2 for production, direct node for development
CMD if [ "$APP_ENV" = "production" ] ; then \\
        pm2-runtime start ecosystem.config.js ; \\
    else \\
        npm run dev ; \\
    fi

# 7. DOCKERFILE OPTIMIZATION TIPS

# ✅ DO: Use specific version tags
FROM node:16.14.2-alpine

# ❌ DON'T: Use latest tag
# FROM node:latest

# ✅ DO: Combine RUN commands to reduce layers
RUN apt-get update && \\
    apt-get install -y curl git && \\
    apt-get clean && \\
    rm -rf /var/lib/apt/lists/*

# ❌ DON'T: Use multiple RUN commands
# RUN apt-get update
# RUN apt-get install -y curl git
# RUN apt-get clean

# ✅ DO: Copy package files first for better caching
COPY package*.json ./
RUN npm ci
COPY . .

# ❌ DON'T: Copy everything first
# COPY . .
# RUN npm ci

# ✅ DO: Use .dockerignore file
# .dockerignore contents:
# node_modules
# npm-debug.log
# .git
# .gitignore
# README.md
# .env
# coverage
# .nyc_output

echo "Dockerfile best practices covered!"
echo "Next: Docker Compose for multi-container applications"`
      }
    ],
    compose: [
      {
        title: 'Docker Compose for Multi-Container Apps',
        description: 'Orchestrate complex applications with Docker Compose',
        code: `# Docker Compose Examples - Complete Application Stacks

# 1. BASIC WEB APPLICATION STACK
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
    depends_on:
      - db
      - redis
    volumes:
      - .:/app
      - /app/node_modules
    networks:
      - app-network

  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - app-network

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge

# 2. PRODUCTION-READY STACK WITH NGINX
# docker-compose.prod.yml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
      - static_files:/var/www/static
    depends_on:
      - web
    restart: unless-stopped
    networks:
      - frontend
      - backend

  web:
    build:
      context: .
      dockerfile: Dockerfile.prod
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:\${DB_PASSWORD}@db:5432/\${DB_NAME}
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=\${JWT_SECRET}
    depends_on:
      - db
      - redis
    restart: unless-stopped
    volumes:
      - static_files:/app/static
    networks:
      - backend

  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: \${DB_NAME}
      POSTGRES_USER: \${DB_USER}
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    restart: unless-stopped
    networks:
      - backend

  redis:
    image: redis:6-alpine
    command: redis-server --appendonly yes --requirepass \${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - backend

  # Background job worker
  worker:
    build:
      context: .
      dockerfile: Dockerfile.prod
    command: npm run worker
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:\${DB_PASSWORD}@db:5432/\${DB_NAME}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    restart: unless-stopped
    networks:
      - backend

volumes:
  postgres_data:
  redis_data:
  static_files:

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge

# 3. MICROSERVICES ARCHITECTURE
# docker-compose.microservices.yml
version: '3.8'

services:
  # API Gateway
  gateway:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./gateway.conf:/etc/nginx/nginx.conf
    depends_on:
      - user-service
      - product-service
      - order-service
    networks:
      - frontend

  # User Service
  user-service:
    build: ./services/user
    environment:
      - SERVICE_NAME=user-service
      - DATABASE_URL=postgresql://postgres:password@user-db:5432/users
      - REDIS_URL=redis://redis:6379
    depends_on:
      - user-db
      - redis
    networks:
      - backend
      - user-network

  user-db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: users
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - user_db_data:/var/lib/postgresql/data
    networks:
      - user-network

  # Product Service
  product-service:
    build: ./services/product
    environment:
      - SERVICE_NAME=product-service
      - DATABASE_URL=postgresql://postgres:password@product-db:5432/products
    depends_on:
      - product-db
    networks:
      - backend
      - product-network

  product-db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: products
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - product_db_data:/var/lib/postgresql/data
    networks:
      - product-network

  # Order Service
  order-service:
    build: ./services/order
    environment:
      - SERVICE_NAME=order-service
      - DATABASE_URL=postgresql://postgres:password@order-db:5432/orders
      - USER_SERVICE_URL=http://user-service:3000
      - PRODUCT_SERVICE_URL=http://product-service:3000
    depends_on:
      - order-db
      - user-service
      - product-service
    networks:
      - backend
      - order-network

  order-db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: orders
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - order_db_data:/var/lib/postgresql/data
    networks:
      - order-network

  # Shared Redis
  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data
    networks:
      - backend

  # Message Queue
  rabbitmq:
    image: rabbitmq:3-management-alpine
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: password
    ports:
      - "15672:15672"  # Management UI
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    networks:
      - backend

volumes:
  user_db_data:
  product_db_data:
  order_db_data:
  redis_data:
  rabbitmq_data:

networks:
  frontend:
  backend:
  user-network:
  product-network:
  order-network:

# 4. DEVELOPMENT ENVIRONMENT WITH HOT RELOAD
# docker-compose.dev.yml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
      - "9229:9229"  # Node.js debugger
    environment:
      - NODE_ENV=development
      - DEBUG=app:*
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp_dev
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    depends_on:
      - db
      - redis
    command: npm run dev

  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: myapp_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data
      - ./sql/dev-seed.sql:/docker-entrypoint-initdb.d/seed.sql

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

  # Mail service for testing
  mailhog:
    image: mailhog/mailhog
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI

  # Database admin tool
  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: password
    ports:
      - "5050:80"
    depends_on:
      - db

volumes:
  postgres_dev_data:

# 5. MONITORING AND LOGGING STACK
# docker-compose.monitoring.yml
version: '3.8'

services:
  # Application services (from main compose file)
  web:
    extends:
      file: docker-compose.yml
      service: web
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.web.rule=Host(\`localhost\`)"

  # Reverse proxy and load balancer
  traefik:
    image: traefik:v2.8
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"  # Traefik dashboard
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

  # Metrics collection
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus

  # Metrics visualization
  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning

  # Log aggregation
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.14.0
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"

  kibana:
    image: docker.elastic.co/kibana/kibana:7.14.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

volumes:
  prometheus_data:
  grafana_data:
  elasticsearch_data:

# 6. COMMON DOCKER COMPOSE COMMANDS

# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Start specific service
docker-compose up web

# Build and start
docker-compose up --build

# Use different compose file
docker-compose -f docker-compose.prod.yml up

# Scale a service
docker-compose up --scale web=3

# View logs
docker-compose logs
docker-compose logs -f web

# Execute commands in service
docker-compose exec web bash
docker-compose exec db psql -U postgres

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Remove everything including images
docker-compose down --rmi all

echo "Docker Compose examples completed!"
echo "Next: Docker networking and volume management"`
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Docker & Containers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master containerization with Docker - from basics to production deployments, 
              multi-stage builds, Docker Compose, and Kubernetes fundamentals.
            </p>
          </motion.div>

          {/* Interactive Docker Playground */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Docker Command Playground</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Practice Docker commands and learn containerization! Build, run, and manage containers.
              </p>
              <CodeEditor
                title="Docker Commands"
                initialCode={`# Welcome to Docker!
# These are Docker CLI commands and examples

# 1. Basic container operations
echo "Starting with Docker basics..."

# Pull and run a simple container
docker run hello-world

# Run an interactive Ubuntu container
docker run -it ubuntu:20.04 /bin/bash
# Inside container: apt update && apt install -y curl

# 2. Web server example
echo "Running NGINX web server..."
docker run -d -p 8080:80 --name my-nginx nginx:latest

# Check running containers
docker ps

# View container logs
docker logs my-nginx

# 3. Node.js application
echo "Building a Node.js app..."

# Create a simple Dockerfile content:
cat << 'EOF' > Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
EOF

# Build the image
docker build -t my-node-app .

# Run with environment variables
docker run -d -p 3000:3000 -e NODE_ENV=production my-node-app

# 4. Volume mounting
echo "Working with volumes..."
docker run -d -v $(pwd)/data:/app/data my-node-app

# 5. Docker Compose example
echo "Multi-container setup with Docker Compose..."

cat << 'EOF' > docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: password
    volumes:
      - db_data:/var/lib/postgresql/data
volumes:
  db_data:
EOF

# Start the stack
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs web

# 6. Cleanup
echo "Cleaning up..."
docker-compose down
docker stop my-nginx
docker rm my-nginx
docker system prune -f

echo "Docker basics completed!"
echo "Try building your own containerized application!"
`}
                height="400px"
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
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
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

          {/* Docker Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🐳 Docker Containerization Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">📦</div>
                <h3 className="font-semibold mb-2">Portability</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Run anywhere consistently</li>
                  <li>• Eliminate &quot;works on my machine&quot;</li>
                  <li>• Platform independence</li>
                  <li>• Easy migration</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">⚡</div>
                <h3 className="font-semibold mb-2">Efficiency</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Lightweight containers</li>
                  <li>• Fast startup times</li>
                  <li>• Resource optimization</li>
                  <li>• Horizontal scaling</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">🚀</div>
                <h3 className="font-semibold mb-2">DevOps</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• CI/CD integration</li>
                  <li>• Microservices architecture</li>
                  <li>• Infrastructure as code</li>
                  <li>• Easy rollbacks</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Container className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Containerization</h3>
              <p className="text-gray-600 text-sm">Package applications with all dependencies</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Package className="w-8 h-8 text-cyan-600 mb-3" />
              <h3 className="font-semibold mb-2">Image Management</h3>
              <p className="text-gray-600 text-sm">Build, tag, and distribute container images</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Server className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-semibold mb-2">Orchestration</h3>
              <p className="text-gray-600 text-sm">Manage multi-container applications</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Settings className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-semibold mb-2">Production Ready</h3>
              <p className="text-gray-600 text-sm">Security, monitoring, and scaling</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DockerPage
