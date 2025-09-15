'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Code, Search, BarChart3, Shield, Zap, Terminal, FileJson } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'

const PostgreSQLPage = () => {
  const [activeSection, setActiveSection] = useState('advanced-sql')

  const sections = [
    { id: 'advanced-sql', name: 'Advanced SQL', icon: '🔍' },
    { id: 'json-data', name: 'JSON Operations', icon: '📄' },
    { id: 'window-functions', name: 'Window Functions', icon: '📊' },
    { id: 'stored-procedures', name: 'Functions & Procedures', icon: '⚙️' },
    { id: 'performance', name: 'Performance Tuning', icon: '⚡' },
    { id: 'replication', name: 'Replication & Scaling', icon: '🔄' },
    { id: 'security', name: 'Security & Permissions', icon: '🔒' },
    { id: 'integration', name: 'Node.js Integration', icon: '🔗' }
  ]

  const codeExamples = {
    'advanced-sql': [
      {
        title: 'Complex Queries with CTEs and Subqueries',
        description: 'Advanced PostgreSQL query techniques using Common Table Expressions',
        code: `-- Advanced PostgreSQL Features

-- 1. Common Table Expressions (CTE)
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', order_date) AS month,
        SUM(total_amount) AS monthly_total,
        COUNT(*) AS order_count
    FROM orders
    WHERE order_date >= '2024-01-01'
    GROUP BY DATE_TRUNC('month', order_date)
),
sales_growth AS (
    SELECT 
        month,
        monthly_total,
        order_count,
        LAG(monthly_total) OVER (ORDER BY month) AS prev_month_total,
        (monthly_total - LAG(monthly_total) OVER (ORDER BY month)) / 
        LAG(monthly_total) OVER (ORDER BY month) * 100 AS growth_rate
    FROM monthly_sales
)
SELECT 
    month,
    monthly_total,
    order_count,
    COALESCE(growth_rate, 0) AS growth_percentage
FROM sales_growth
ORDER BY month;

-- 2. Recursive CTE for hierarchical data
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT 
        employee_id,
        name,
        manager_id,
        title,
        1 AS level,
        name AS hierarchy_path
    FROM employees 
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees with managers
    SELECT 
        e.employee_id,
        e.name,
        e.manager_id,
        e.title,
        eh.level + 1,
        eh.hierarchy_path || ' -> ' || e.name
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT 
    employee_id,
    name,
    title,
    level,
    hierarchy_path
FROM employee_hierarchy
ORDER BY level, name;

-- 3. Advanced aggregations with FILTER
SELECT 
    product_category,
    COUNT(*) AS total_orders,
    COUNT(*) FILTER (WHERE status = 'completed') AS completed_orders,
    COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled_orders,
    AVG(total_amount) AS avg_order_value,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_amount) AS median_order_value,
    MODE() WITHIN GROUP (ORDER BY payment_method) AS most_common_payment
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY product_category
HAVING COUNT(*) > 10
ORDER BY total_orders DESC;

-- 4. Complex JOIN with multiple conditions
SELECT 
    c.customer_name,
    c.email,
    COUNT(DISTINCT o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_spent,
    AVG(r.rating) AS avg_rating,
    STRING_AGG(DISTINCT p.category, ', ') AS purchased_categories,
    CASE 
        WHEN SUM(o.total_amount) > 10000 THEN 'VIP'
        WHEN SUM(o.total_amount) > 5000 THEN 'Premium'
        WHEN SUM(o.total_amount) > 1000 THEN 'Standard'
        ELSE 'Basic'
    END AS customer_tier
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.product_id
LEFT JOIN reviews r ON c.customer_id = r.customer_id
WHERE c.created_at >= '2023-01-01'
GROUP BY c.customer_id, c.customer_name, c.email
HAVING COUNT(DISTINCT o.order_id) > 0
ORDER BY total_spent DESC
LIMIT 100;

-- 5. Advanced date/time operations
SELECT 
    customer_id,
    order_date,
    total_amount,
    -- Date extractions
    EXTRACT(DOW FROM order_date) AS day_of_week,
    EXTRACT(WEEK FROM order_date) AS week_number,
    EXTRACT(QUARTER FROM order_date) AS quarter,
    
    -- Date formatting
    TO_CHAR(order_date, 'Day, Month DD, YYYY') AS formatted_date,
    
    -- Date calculations
    AGE(CURRENT_DATE, order_date) AS days_since_order,
    order_date + INTERVAL '30 days' AS estimated_delivery,
    
    -- Generate series for missing dates
    DATE_TRUNC('day', order_date) AS order_day
FROM orders
WHERE order_date >= CURRENT_DATE - INTERVAL '1 year'
ORDER BY order_date DESC;`
      }
    ],
    'json-data': [
      {
        title: 'JSON and JSONB Operations',
        description: 'Working with JSON data types in PostgreSQL for modern applications',
        code: `-- JSON and JSONB Operations in PostgreSQL

-- 1. Creating table with JSON columns
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    profile_data JSONB,
    settings JSON,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Inserting JSON data
INSERT INTO user_profiles (username, profile_data, settings) VALUES
('alice', 
 '{"name": "Alice Johnson", "age": 28, "location": {"city": "San Francisco", "country": "USA"}, "skills": ["Python", "PostgreSQL", "React"], "experience": 5}',
 '{"theme": "dark", "notifications": {"email": true, "push": false}, "privacy": {"profile_visible": true}}'),
 
('bob',
 '{"name": "Bob Smith", "age": 32, "location": {"city": "New York", "country": "USA"}, "skills": ["JavaScript", "Node.js", "MongoDB"], "experience": 7}',
 '{"theme": "light", "notifications": {"email": false, "push": true}, "privacy": {"profile_visible": false}}');

-- 3. Querying JSON data
-- Extract JSON values
SELECT 
    username,
    profile_data->>'name' AS full_name,
    profile_data->>'age' AS age,
    profile_data->'location'->>'city' AS city,
    profile_data->'location'->>'country' AS country
FROM user_profiles;

-- 4. JSON array operations
-- Get all skills
SELECT 
    username,
    profile_data->>'name' AS name,
    jsonb_array_elements_text(profile_data->'skills') AS skill
FROM user_profiles;

-- Count skills per user
SELECT 
    username,
    profile_data->>'name' AS name,
    jsonb_array_length(profile_data->'skills') AS skill_count
FROM user_profiles;

-- 5. Filtering with JSON operators
-- Users with specific skills
SELECT username, profile_data->>'name' AS name
FROM user_profiles
WHERE profile_data->'skills' ? 'Python';

-- Users from specific city
SELECT username, profile_data->>'name' AS name
FROM user_profiles
WHERE profile_data->'location'->>'city' = 'San Francisco';

-- Users with experience > 5 years
SELECT username, profile_data->>'name' AS name
FROM user_profiles
WHERE (profile_data->>'experience')::INTEGER > 5;

-- 6. JSON aggregations
-- Skills popularity
SELECT 
    skill,
    COUNT(*) AS user_count
FROM (
    SELECT jsonb_array_elements_text(profile_data->'skills') AS skill
    FROM user_profiles
) skills_expanded
GROUP BY skill
ORDER BY user_count DESC;

-- 7. Updating JSON data
-- Add a new skill
UPDATE user_profiles 
SET profile_data = profile_data || '{"skills": ["Python", "PostgreSQL", "React", "Docker"]}'::jsonb
WHERE username = 'alice';

-- Update nested JSON
UPDATE user_profiles 
SET profile_data = jsonb_set(
    profile_data, 
    '{location,city}', 
    '"Los Angeles"'
)
WHERE username = 'bob';

-- Remove a key
UPDATE user_profiles 
SET profile_data = profile_data - 'experience'
WHERE username = 'alice';

-- 8. Complex JSON queries
-- Users grouped by country with average experience
SELECT 
    profile_data->'location'->>'country' AS country,
    COUNT(*) AS user_count,
    AVG((profile_data->>'experience')::INTEGER) AS avg_experience,
    ARRAY_AGG(profile_data->>'name') AS users
FROM user_profiles
GROUP BY profile_data->'location'->>'country';

-- 9. JSON path queries (PostgreSQL 12+)
SELECT 
    username,
    jsonb_path_query(profile_data, '$.skills[*]') AS skills,
    jsonb_path_exists(profile_data, '$.skills[*] ? (@ == "Python")') AS has_python
FROM user_profiles;

-- 10. Creating indexes on JSON data
-- GIN index for faster JSON queries
CREATE INDEX idx_user_profiles_skills ON user_profiles USING GIN ((profile_data->'skills'));
CREATE INDEX idx_user_profiles_location ON user_profiles USING GIN ((profile_data->'location'));

-- Expression index for specific JSON path
CREATE INDEX idx_user_profiles_city ON user_profiles ((profile_data->'location'->>'city'));

-- 11. JSON validation with check constraints
-- Add constraint to ensure required fields
ALTER TABLE user_profiles 
ADD CONSTRAINT check_profile_has_name 
CHECK (profile_data ? 'name');

ALTER TABLE user_profiles 
ADD CONSTRAINT check_profile_has_skills 
CHECK (profile_data ? 'skills' AND jsonb_typeof(profile_data->'skills') = 'array');

-- 12. Advanced JSON operations
-- Merge JSON objects
SELECT 
    username,
    profile_data || settings AS combined_data
FROM user_profiles;

-- Deep merge of JSON objects
WITH user_data AS (
    SELECT 
        username,
        profile_data,
        '{"preferences": {"language": "en", "timezone": "UTC"}, "subscription": {"plan": "premium", "expires": "2024-12-31"}}'::jsonb AS additional_data
    FROM user_profiles
)
SELECT 
    username,
    profile_data || additional_data AS enriched_profile
FROM user_data;

-- JSON to relational transformation
SELECT 
    username,
    profile_data->>'name' AS name,
    (profile_data->>'age')::INTEGER AS age,
    profile_data->'location'->>'city' AS city,
    skill,
    ROW_NUMBER() OVER (PARTITION BY username ORDER BY skill) AS skill_rank
FROM user_profiles,
     jsonb_array_elements_text(profile_data->'skills') AS skill
ORDER BY username, skill_rank;`
      }
    ],
    'window-functions': [
      {
        title: 'Advanced Window Functions',
        description: 'Powerful analytical queries using PostgreSQL window functions',
        code: `-- Advanced Window Functions in PostgreSQL

-- Sample data setup
CREATE TEMP TABLE sales_data AS
SELECT 
    generate_series(1, 1000) AS sale_id,
    (ARRAY['Electronics', 'Clothing', 'Books', 'Sports', 'Home'])[FLOOR(RANDOM() * 5 + 1)] AS category,
    (ARRAY['North', 'South', 'East', 'West'])[FLOOR(RANDOM() * 4 + 1)] AS region,
    DATE '2024-01-01' + (RANDOM() * 365)::INTEGER AS sale_date,
    ROUND((RANDOM() * 1000 + 100)::NUMERIC, 2) AS amount,
    (ARRAY['Alice', 'Bob', 'Carol', 'David', 'Eve'])[FLOOR(RANDOM() * 5 + 1)] AS salesperson;

-- 1. Basic Window Functions
-- Running totals and rankings
SELECT 
    sale_id,
    category,
    region,
    amount,
    salesperson,
    
    -- Rankings
    ROW_NUMBER() OVER (ORDER BY amount DESC) AS overall_rank,
    RANK() OVER (ORDER BY amount DESC) AS amount_rank,
    DENSE_RANK() OVER (ORDER BY amount DESC) AS dense_rank,
    
    -- Percentiles
    PERCENT_RANK() OVER (ORDER BY amount) AS percentile_rank,
    CUME_DIST() OVER (ORDER BY amount) AS cumulative_distribution,
    NTILE(4) OVER (ORDER BY amount) AS quartile,
    
    -- Running calculations
    SUM(amount) OVER (ORDER BY sale_date) AS running_total,
    AVG(amount) OVER (ORDER BY sale_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg_7_days
FROM sales_data
ORDER BY sale_date
LIMIT 20;

-- 2. Partition-based Window Functions
-- Analysis by category and region
SELECT 
    category,
    region,
    salesperson,
    amount,
    
    -- Rankings within partitions
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY amount DESC) AS rank_in_category,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY amount DESC) AS rank_in_region,
    ROW_NUMBER() OVER (PARTITION BY salesperson ORDER BY amount DESC) AS rank_for_salesperson,
    
    -- Aggregations within partitions
    SUM(amount) OVER (PARTITION BY category) AS category_total,
    AVG(amount) OVER (PARTITION BY region) AS region_average,
    COUNT(*) OVER (PARTITION BY salesperson) AS salesperson_sale_count,
    
    -- Percentage of total
    ROUND(amount / SUM(amount) OVER (PARTITION BY category) * 100, 2) AS pct_of_category_total,
    ROUND(amount / SUM(amount) OVER () * 100, 2) AS pct_of_grand_total
FROM sales_data
ORDER BY category, amount DESC
LIMIT 30;

-- 3. LAG and LEAD Functions
-- Compare with previous/next values
SELECT 
    sale_date,
    category,
    amount,
    
    -- Previous and next values
    LAG(amount) OVER (PARTITION BY category ORDER BY sale_date) AS prev_sale,
    LEAD(amount) OVER (PARTITION BY category ORDER BY sale_date) AS next_sale,
    
    -- Calculate differences
    amount - LAG(amount) OVER (PARTITION BY category ORDER BY sale_date) AS change_from_prev,
    LEAD(amount) OVER (PARTITION BY category ORDER BY sale_date) - amount AS change_to_next,
    
    -- Percentage changes
    ROUND((amount - LAG(amount) OVER (PARTITION BY category ORDER BY sale_date)) / 
          LAG(amount) OVER (PARTITION BY category ORDER BY sale_date) * 100, 2) AS pct_change,
    
    -- Multi-step LAG/LEAD
    LAG(amount, 3) OVER (PARTITION BY category ORDER BY sale_date) AS amount_3_sales_ago,
    LEAD(amount, 2) OVER (PARTITION BY category ORDER BY sale_date) AS amount_2_sales_ahead
FROM sales_data
WHERE category = 'Electronics'
ORDER BY sale_date
LIMIT 20;

-- 4. FIRST_VALUE and LAST_VALUE
-- Compare with first and last values in groups
SELECT 
    category,
    region,
    sale_date,
    amount,
    
    -- First and last values in partition
    FIRST_VALUE(amount) OVER (
        PARTITION BY category 
        ORDER BY sale_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS first_sale_amount,
    
    LAST_VALUE(amount) OVER (
        PARTITION BY category 
        ORDER BY sale_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS last_sale_amount,
    
    -- Compare with highest and lowest in category
    FIRST_VALUE(amount) OVER (
        PARTITION BY category 
        ORDER BY amount DESC 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS highest_in_category,
    
    FIRST_VALUE(amount) OVER (
        PARTITION BY category 
        ORDER BY amount ASC 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS lowest_in_category
FROM sales_data
ORDER BY category, sale_date
LIMIT 25;

-- 5. Frame Clauses - Different Window Frames
SELECT 
    sale_date,
    amount,
    
    -- Different frame types
    SUM(amount) OVER (
        ORDER BY sale_date 
        ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING
    ) AS sum_5_day_window,
    
    AVG(amount) OVER (
        ORDER BY sale_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_average,
    
    MAX(amount) OVER (
        ORDER BY sale_date 
        ROWS BETWEEN 7 PRECEDING AND CURRENT ROW
    ) AS max_last_7_days,
    
    MIN(amount) OVER (
        ORDER BY sale_date 
        RANGE BETWEEN INTERVAL '7 days' PRECEDING AND CURRENT ROW
    ) AS min_last_week,
    
    COUNT(*) OVER (
        ORDER BY sale_date 
        ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING
    ) AS count_7_day_window
FROM sales_data
ORDER BY sale_date
LIMIT 20;

-- 6. Complex Business Analytics
-- Sales performance analysis
WITH daily_sales AS (
    SELECT 
        sale_date,
        SUM(amount) AS daily_total,
        COUNT(*) AS daily_count,
        AVG(amount) AS daily_avg
    FROM sales_data
    GROUP BY sale_date
),
sales_with_trends AS (
    SELECT 
        sale_date,
        daily_total,
        daily_count,
        daily_avg,
        
        -- Moving averages
        AVG(daily_total) OVER (
            ORDER BY sale_date 
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ) AS ma_7_day,
        
        AVG(daily_total) OVER (
            ORDER BY sale_date 
            ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
        ) AS ma_30_day,
        
        -- Growth rates
        (daily_total - LAG(daily_total, 7) OVER (ORDER BY sale_date)) / 
        LAG(daily_total, 7) OVER (ORDER BY sale_date) * 100 AS week_over_week_growth,
        
        -- Percentile rankings
        PERCENT_RANK() OVER (ORDER BY daily_total) AS daily_total_percentile
    FROM daily_sales
)
SELECT 
    sale_date,
    daily_total,
    ROUND(ma_7_day, 2) AS moving_avg_7d,
    ROUND(ma_30_day, 2) AS moving_avg_30d,
    ROUND(week_over_week_growth, 2) AS wow_growth_pct,
    ROUND(daily_total_percentile * 100, 1) AS percentile_rank,
    CASE 
        WHEN daily_total_percentile > 0.9 THEN 'Top 10%'
        WHEN daily_total_percentile > 0.75 THEN 'Top 25%'
        WHEN daily_total_percentile > 0.5 THEN 'Above Average'
        ELSE 'Below Average'
    END AS performance_tier
FROM sales_with_trends
ORDER BY sale_date
LIMIT 30;

-- 7. Cohort Analysis using Window Functions
WITH customer_cohorts AS (
    SELECT 
        salesperson,
        DATE_TRUNC('month', MIN(sale_date)) AS cohort_month,
        DATE_TRUNC('month', sale_date) AS sale_month,
        SUM(amount) AS monthly_revenue
    FROM sales_data
    GROUP BY salesperson, DATE_TRUNC('month', sale_date)
),
cohort_data AS (
    SELECT 
        cohort_month,
        sale_month,
        (EXTRACT(YEAR FROM sale_month) - EXTRACT(YEAR FROM cohort_month)) * 12 + 
        (EXTRACT(MONTH FROM sale_month) - EXTRACT(MONTH FROM cohort_month)) AS period_number,
        COUNT(DISTINCT salesperson) AS active_salespeople,
        SUM(monthly_revenue) AS cohort_revenue
    FROM customer_cohorts
    GROUP BY cohort_month, sale_month
)
SELECT 
    cohort_month,
    period_number,
    active_salespeople,
    cohort_revenue,
    FIRST_VALUE(active_salespeople) OVER (
        PARTITION BY cohort_month 
        ORDER BY period_number
    ) AS initial_cohort_size,
    
    ROUND(
        active_salespeople::NUMERIC / 
        FIRST_VALUE(active_salespeople) OVER (
            PARTITION BY cohort_month 
            ORDER BY period_number
        ) * 100, 2
    ) AS retention_rate
FROM cohort_data
ORDER BY cohort_month, period_number;`
      }
    ],
    'integration': [
      {
        title: 'Node.js PostgreSQL Integration',
        description: 'Advanced PostgreSQL integration with Node.js using connection pooling and transactions',
        code: `// Advanced PostgreSQL Integration with Node.js
// npm install pg dotenv

import pkg from 'pg';
const { Pool, Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Database configuration with connection pooling
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'learning_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  
  // Connection pool settings
  max: 20,                    // Maximum connections
  idleTimeoutMillis: 30000,   // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Return error if can't connect in 2s
});

// Advanced User Service with PostgreSQL features
class UserService {
  
  // Create user with RETURNING clause
  static async createUser(userData) {
    const { username, email, profile_data, settings } = userData;
    
    const query = \`
      INSERT INTO users (username, email, profile_data, settings, created_at)
      VALUES ($1, $2, $3::jsonb, $4::json, NOW())
      RETURNING id, username, email, profile_data, created_at
    \`;
    
    try {
      const result = await pool.query(query, [username, email, profile_data, settings]);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('Username or email already exists');
      }
      throw error;
    }
  }
  
  // Advanced search with full-text search and JSON queries
  static async searchUsers(searchParams) {
    const { query, skills, location, minAge, maxAge, limit = 10, offset = 0 } = searchParams;
    
    let sqlQuery = \`
      SELECT 
        id, 
        username, 
        email,
        profile_data,
        ts_rank(to_tsvector('english', profile_data->>'name'), to_tsquery('english', $1)) AS rank
      FROM users 
      WHERE 1=1
    \`;
    
    const params = [query || ''];
    let paramCount = 1;
    
    if (query) {
      sqlQuery += \` AND to_tsvector('english', profile_data->>'name') @@ to_tsquery('english', $1)\`;
    }
    
    if (skills && skills.length > 0) {
      paramCount++;
      sqlQuery += \` AND profile_data->'skills' ?| $\${paramCount}\`;
      params.push(skills);
    }
    
    if (location) {
      paramCount++;
      sqlQuery += \` AND profile_data->'location'->>'city' ILIKE $\${paramCount}\`;
      params.push(\`%\${location}%\`);
    }
    
    if (minAge) {
      paramCount++;
      sqlQuery += \` AND (profile_data->>'age')::INTEGER >= $\${paramCount}\`;
      params.push(minAge);
    }
    
    if (maxAge) {
      paramCount++;
      sqlQuery += \` AND (profile_data->>'age')::INTEGER <= $\${paramCount}\`;
      params.push(maxAge);
    }
    
    sqlQuery += \` ORDER BY \${query ? 'rank DESC,' : ''} created_at DESC LIMIT $\${paramCount + 1} OFFSET $\${paramCount + 2}\`;
    params.push(limit, offset);
    
    const result = await pool.query(sqlQuery, params);
    return result.rows;
  }
  
  // Batch operations with transactions
  static async createUsersInBatch(usersData) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      const insertedUsers = [];
      
      for (const userData of usersData) {
        const query = \`
          INSERT INTO users (username, email, profile_data, settings)
          VALUES ($1, $2, $3::jsonb, $4::json)
          RETURNING id, username, email, created_at
        \`;
        
        const result = await client.query(query, [
          userData.username,
          userData.email,
          userData.profile_data,
          userData.settings
        ]);
        
        insertedUsers.push(result.rows[0]);
      }
      
      await client.query('COMMIT');
      return insertedUsers;
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  
  // Complex aggregation queries
  static async getUserAnalytics() {
    const query = \`
      WITH user_stats AS (
        SELECT 
          profile_data->'location'->>'country' AS country,
          profile_data->'location'->>'city' AS city,
          (profile_data->>'age')::INTEGER AS age,
          jsonb_array_length(profile_data->'skills') AS skill_count,
          created_at
        FROM users
        WHERE profile_data ? 'age' AND profile_data ? 'skills'
      ),
      aggregated_stats AS (
        SELECT 
          country,
          COUNT(*) AS user_count,
          AVG(age) AS avg_age,
          AVG(skill_count) AS avg_skills,
          PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY age) AS median_age,
          MODE() WITHIN GROUP (ORDER BY city) AS most_common_city
        FROM user_stats
        GROUP BY country
      )
      SELECT 
        country,
        user_count,
        ROUND(avg_age, 1) AS avg_age,
        ROUND(avg_skills, 1) AS avg_skills,
        median_age,
        most_common_city,
        ROUND(user_count * 100.0 / SUM(user_count) OVER (), 2) AS percentage_of_total
      FROM aggregated_stats
      ORDER BY user_count DESC;
    \`;
    
    const result = await pool.query(query);
    return result.rows;
  }
  
  // Materialized view for performance
  static async refreshUserAnalyticsView() {
    await pool.query('REFRESH MATERIALIZED VIEW CONCURRENTLY user_analytics_mv');
  }
}

// Advanced Product Service with PostgreSQL-specific features
class ProductService {
  
  // Full-text search with ranking
  static async searchProducts(searchTerm, options = {}) {
    const { category, minPrice, maxPrice, limit = 20, offset = 0 } = options;
    
    let query = \`
      SELECT 
        id,
        name,
        description,
        price,
        category,
        metadata,
        ts_rank(
          setweight(to_tsvector('english', name), 'A') ||
          setweight(to_tsvector('english', description), 'B'),
          to_tsquery('english', $1)
        ) AS relevance_score
      FROM products
      WHERE to_tsvector('english', name || ' ' || description) @@ to_tsquery('english', $1)
    \`;
    
    const params = [searchTerm];
    let paramCount = 1;
    
    if (category) {
      paramCount++;
      query += \` AND category = $\${paramCount}\`;
      params.push(category);
    }
    
    if (minPrice) {
      paramCount++;
      query += \` AND price >= $\${paramCount}\`;
      params.push(minPrice);
    }
    
    if (maxPrice) {
      paramCount++;
      query += \` AND price <= $\${paramCount}\`;
      params.push(maxPrice);
    }
    
    query += \` ORDER BY relevance_score DESC, price ASC LIMIT $\${paramCount + 1} OFFSET $\${paramCount + 2}\`;
    params.push(limit, offset);
    
    const result = await pool.query(query, params);
    return result.rows;
  }
  
  // Geographic queries (if using PostGIS)
  static async findNearbyStores(latitude, longitude, radiusKm = 10) {
    const query = \`
      SELECT 
        store_id,
        name,
        address,
        ST_Distance(
          location::geography,
          ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography
        ) / 1000 AS distance_km
      FROM stores
      WHERE ST_DWithin(
        location::geography,
        ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography,
        $3 * 1000
      )
      ORDER BY distance_km
      LIMIT 20;
    \`;
    
    const result = await pool.query(query, [latitude, longitude, radiusKm]);
    return result.rows;
  }
}

// Connection management and monitoring
class DatabaseManager {
  
  static async getConnectionStats() {
    const query = \`
      SELECT 
        count(*) as total_connections,
        count(*) FILTER (WHERE state = 'active') as active_connections,
        count(*) FILTER (WHERE state = 'idle') as idle_connections,
        count(*) FILTER (WHERE state = 'idle in transaction') as idle_in_transaction
      FROM pg_stat_activity
      WHERE datname = current_database();
    \`;
    
    const result = await pool.query(query);
    return result.rows[0];
  }
  
  static async getQueryPerformance() {
    const query = \`
      SELECT 
        query,
        calls,
        total_time,
        mean_time,
        stddev_time,
        rows
      FROM pg_stat_statements
      ORDER BY total_time DESC
      LIMIT 10;
    \`;
    
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      // pg_stat_statements extension might not be enabled
      console.log('pg_stat_statements not available');
      return [];
    }
  }
  
  static async healthCheck() {
    try {
      const result = await pool.query('SELECT NOW() as server_time, version() as version');
      const stats = await this.getConnectionStats();
      
      return {
        status: 'healthy',
        serverTime: result.rows[0].server_time,
        version: result.rows[0].version,
        connections: stats,
        poolStats: {
          totalCount: pool.totalCount,
          idleCount: pool.idleCount,
          waitingCount: pool.waitingCount
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }
}

// Usage examples
async function demonstratePostgreSQLFeatures() {
  try {
    console.log('Testing PostgreSQL advanced features...');
    
    // Health check
    const health = await DatabaseManager.healthCheck();
    console.log('Database health:', health);
    
    // Create a user with JSON data
    const newUser = await UserService.createUser({
      username: 'postgres_user',
      email: 'postgres@example.com',
      profile_data: {
        name: 'PostgreSQL Expert',
        age: 30,
        location: { city: 'San Francisco', country: 'USA' },
        skills: ['PostgreSQL', 'Node.js', 'Python']
      },
      settings: {
        theme: 'dark',
        notifications: { email: true, push: false }
      }
    });
    
    console.log('Created user:', newUser);
    
    // Search users
    const searchResults = await UserService.searchUsers({
      skills: ['PostgreSQL'],
      location: 'San Francisco',
      minAge: 25
    });
    
    console.log('Search results:', searchResults);
    
    // Get analytics
    const analytics = await UserService.getUserAnalytics();
    console.log('User analytics:', analytics);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await pool.end();
  process.exit(0);
});

// Export for use in other modules
export { UserService, ProductService, DatabaseManager, pool };

// Run demonstration
demonstratePostgreSQLFeatures();`
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              PostgreSQL Advanced
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master advanced PostgreSQL features - JSON operations, window functions, 
              full-text search, performance optimization, and modern Node.js integration.
            </p>
          </motion.div>

          {/* Interactive PostgreSQL Playground */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Advanced PostgreSQL Playground</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Explore advanced PostgreSQL features! JSON operations, window functions, and complex queries.
              </p>
              <CodeEditor
                title="PostgreSQL Advanced Playground"
                initialCode={`-- Welcome to Advanced PostgreSQL!
-- Try these advanced features:

-- 1. JSON/JSONB Operations
CREATE TEMP TABLE user_data AS
SELECT 
    'alice' as username,
    '{"name": "Alice", "age": 28, "skills": ["PostgreSQL", "Python"], "location": {"city": "SF", "country": "USA"}}'::jsonb as profile;

-- Query JSON data
SELECT 
    username,
    profile->>'name' AS name,
    profile->'location'->>'city' AS city,
    jsonb_array_length(profile->'skills') AS skill_count
FROM user_data;

-- 2. Window Functions - Running totals and rankings
WITH sales AS (
    SELECT 
        generate_series(1, 10) AS id,
        (random() * 1000)::int AS amount,
        (ARRAY['Electronics', 'Books', 'Clothing'])[floor(random() * 3 + 1)] AS category
)
SELECT 
    id,
    category,
    amount,
    SUM(amount) OVER (ORDER BY id) AS running_total,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY amount DESC) AS rank_in_category,
    AVG(amount) OVER (PARTITION BY category) AS category_avg
FROM sales
ORDER BY id;

-- 3. Common Table Expressions (CTE)
WITH RECURSIVE fibonacci(n, fib_n, fib_n_plus_1) AS (
    -- Base case
    VALUES (1, 0, 1)
    
    UNION ALL
    
    -- Recursive case
    SELECT n + 1, fib_n_plus_1, fib_n + fib_n_plus_1
    FROM fibonacci
    WHERE n < 10
)
SELECT n, fib_n AS fibonacci_number
FROM fibonacci;

-- 4. Advanced aggregations
SELECT 
    generate_series(1, 5) AS id,
    (random() * 100)::int AS value
INTO TEMP TABLE sample_data;

SELECT 
    COUNT(*) AS total_count,
    AVG(value) AS average,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY value) AS median,
    ARRAY_AGG(value ORDER BY value) AS all_values,
    STRING_AGG(value::text, ', ' ORDER BY value) AS concatenated
FROM sample_data;

-- Try your own advanced PostgreSQL queries below:
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
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
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

          {/* PostgreSQL Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🐘 PostgreSQL Advanced Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-semibold mb-2">Advanced Analytics</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Window functions & CTEs</li>
                  <li>• Statistical aggregations</li>
                  <li>• Time series analysis</li>
                  <li>• Cohort analysis</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">📄</div>
                <h3 className="font-semibold mb-2">JSON/NoSQL</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• JSONB operations</li>
                  <li>• JSON path queries</li>
                  <li>• GIN indexing</li>
                  <li>• Schema flexibility</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">⚡</div>
                <h3 className="font-semibold mb-2">Performance</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Query optimization</li>
                  <li>• Materialized views</li>
                  <li>• Partitioning</li>
                  <li>• Connection pooling</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <FileJson className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-semibold mb-2">JSON Support</h3>
              <p className="text-gray-600 text-sm">Native JSON/JSONB with indexing and path operations</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600 text-sm">Powerful window functions and statistical operations</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Search className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Full-Text Search</h3>
              <p className="text-gray-600 text-sm">Advanced text search with ranking and highlighting</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Zap className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Performance</h3>
              <p className="text-gray-600 text-sm">Optimized queries, materialized views, and scaling</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PostgreSQLPage
