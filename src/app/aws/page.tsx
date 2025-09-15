'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Server, Database, Shield, Zap, Globe, Terminal, Settings } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'

const AWSPage = () => {
  const [activeSection, setActiveSection] = useState('fundamentals')

  const sections = [
    { id: 'fundamentals', name: 'AWS Fundamentals', icon: '☁️' },
    { id: 'ec2', name: 'EC2 & Compute', icon: '🖥️' },
    { id: 'storage', name: 'Storage (S3)', icon: '📦' },
    { id: 'databases', name: 'Databases (RDS)', icon: '🗄️' },
    { id: 'serverless', name: 'Serverless (Lambda)', icon: '⚡' },
    { id: 'deployment', name: 'Deployment', icon: '🚀' },
    { id: 'monitoring', name: 'Monitoring', icon: '📊' },
    { id: 'security', name: 'Security & IAM', icon: '🔐' }
  ]

  const codeExamples = {
    fundamentals: [
      {
        title: 'AWS CLI & SDK Fundamentals',
        description: 'Essential AWS concepts, CLI commands, and SDK integration',
        code: `# AWS Fundamentals - CLI Commands and Concepts

# 1. AWS CLI INSTALLATION AND CONFIGURATION
# Install AWS CLI (macOS/Linux)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS credentials
aws configure
# AWS Access Key ID: YOUR_ACCESS_KEY
# AWS Secret Access Key: YOUR_SECRET_KEY
# Default region name: us-east-1
# Default output format: json

# List configured profiles
aws configure list-profiles

# Use specific profile
aws configure --profile production

# 2. BASIC AWS CLI COMMANDS
# Get caller identity (verify credentials)
aws sts get-caller-identity

# List all regions
aws ec2 describe-regions --output table

# List availability zones
aws ec2 describe-availability-zones --region us-east-1

# Get account information
aws organizations describe-account

# 3. AWS REGIONS AND AVAILABILITY ZONES
echo "AWS Global Infrastructure:"
echo "• Regions: Geographic areas (us-east-1, eu-west-1, ap-southeast-1)"
echo "• Availability Zones: Data centers within regions (us-east-1a, us-east-1b)"
echo "• Edge Locations: CDN endpoints for CloudFront"

# List services available in a region
aws --region us-east-1 service-quotas list-services --output table

# 4. AWS RESOURCE MANAGEMENT
# Tag resources for organization
aws ec2 create-tags --resources i-1234567890abcdef0 --tags Key=Environment,Value=Production

# List resources by tags
aws resourcegroupstaggingapi get-resources --tag-filters Key=Environment,Values=Production

# 5. AWS COSTS AND BILLING
# Get cost and usage (requires appropriate permissions)
aws ce get-cost-and-usage \\
  --time-period Start=2024-01-01,End=2024-01-31 \\
  --granularity MONTHLY \\
  --metrics BlendedCost

# Get daily costs
aws ce get-cost-and-usage \\
  --time-period Start=2024-01-01,End=2024-01-07 \\
  --granularity DAILY \\
  --metrics UnblendedCost \\
  --group-by Type=DIMENSION,Key=SERVICE

# 6. AWS CORE SERVICES OVERVIEW
echo "AWS Core Services Categories:"
echo ""
echo "COMPUTE:"
echo "• EC2: Virtual servers"
echo "• Lambda: Serverless functions"
echo "• ECS/EKS: Container orchestration"
echo "• Elastic Beanstalk: Platform as a Service"
echo ""
echo "STORAGE:"
echo "• S3: Object storage"
echo "• EBS: Block storage for EC2"
echo "• EFS: Elastic File System"
echo "• Glacier: Archive storage"
echo ""
echo "DATABASE:"
echo "• RDS: Relational databases"
echo "• DynamoDB: NoSQL database"
echo "• ElastiCache: In-memory caching"
echo "• Redshift: Data warehouse"
echo ""
echo "NETWORKING:"
echo "• VPC: Virtual Private Cloud"
echo "• CloudFront: CDN"
echo "• Route 53: DNS service"
echo "• API Gateway: API management"
echo ""
echo "SECURITY:"
echo "• IAM: Identity and Access Management"
echo "• KMS: Key Management Service"
echo "• Secrets Manager: Secret storage"
echo "• WAF: Web Application Firewall"

# 7. AWS PRICING MODELS
echo "AWS Pricing Models:"
echo "• On-Demand: Pay for what you use"
echo "• Reserved Instances: 1-3 year commitments for discounts"
echo "• Spot Instances: Bid for unused capacity"
echo "• Savings Plans: Flexible pricing for compute"

# 8. AWS WELL-ARCHITECTED FRAMEWORK
echo "AWS Well-Architected Framework Pillars:"
echo "1. Operational Excellence"
echo "2. Security"
echo "3. Reliability"
echo "4. Performance Efficiency"
echo "5. Cost Optimization"
echo "6. Sustainability"

# 9. COMMON AWS CLI PATTERNS
# Using JMESPath queries for filtering
aws ec2 describe-instances \\
  --query 'Reservations[*].Instances[*].[InstanceId,State.Name,InstanceType]' \\
  --output table

# Using filters
aws ec2 describe-instances \\
  --filters "Name=instance-state-name,Values=running" \\
  --query 'Reservations[*].Instances[*].[InstanceId,PublicIpAddress]'

# Pagination for large result sets
aws s3api list-objects-v2 \\
  --bucket my-bucket \\
  --max-items 100 \\
  --page-size 10

# 10. AWS CLOUDFORMATION BASICS
# CloudFormation template example (YAML)
cat << 'EOF' > simple-stack.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Simple S3 bucket stack'

Parameters:
  BucketName:
    Type: String
    Default: my-app-bucket
    Description: Name for the S3 bucket

Resources:
  MyS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref BucketName
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true

Outputs:
  BucketName:
    Description: 'Name of the created S3 bucket'
    Value: !Ref MyS3Bucket
    Export:
      Name: !Sub '\${AWS::StackName}-BucketName'
EOF

# Deploy stack
aws cloudformation create-stack \\
  --stack-name my-simple-stack \\
  --template-body file://simple-stack.yaml \\
  --parameters ParameterKey=BucketName,ParameterValue=my-unique-bucket-name

# Check stack status
aws cloudformation describe-stacks --stack-name my-simple-stack

# Delete stack
aws cloudformation delete-stack --stack-name my-simple-stack

echo "AWS Fundamentals completed!"
echo "Next: Explore specific AWS services like EC2, S3, RDS, and Lambda"`
      }
    ],
    ec2: [
      {
        title: 'EC2 Instance Management',
        description: 'Complete EC2 instance lifecycle management and automation',
        code: `# AWS EC2 - Complete Instance Management

# 1. EC2 INSTANCE LIFECYCLE
# Launch an EC2 instance
aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --count 1 \\
  --instance-type t3.micro \\
  --key-name my-key-pair \\
  --security-group-ids sg-903004f8 \\
  --subnet-id subnet-6e7f829e \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyWebServer},{Key=Environment,Value=Production}]'

# List instances
aws ec2 describe-instances \\
  --query 'Reservations[*].Instances[*].[InstanceId,State.Name,InstanceType,PublicIpAddress,Tags[?Key==\`Name\`].Value|[0]]' \\
  --output table

# Start/Stop instances
aws ec2 start-instances --instance-ids i-1234567890abcdef0
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Terminate instances
aws ec2 terminate-instances --instance-ids i-1234567890abcdef0

# 2. SECURITY GROUPS MANAGEMENT
# Create security group
aws ec2 create-security-group \\
  --group-name web-server-sg \\
  --description "Security group for web servers" \\
  --vpc-id vpc-12345678

# Add inbound rules
aws ec2 authorize-security-group-ingress \\
  --group-id sg-903004f8 \\
  --protocol tcp \\
  --port 80 \\
  --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \\
  --group-id sg-903004f8 \\
  --protocol tcp \\
  --port 443 \\
  --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \\
  --group-id sg-903004f8 \\
  --protocol tcp \\
  --port 22 \\
  --cidr 10.0.0.0/8

# List security group rules
aws ec2 describe-security-groups --group-ids sg-903004f8

# 3. KEY PAIRS MANAGEMENT
# Create key pair
aws ec2 create-key-pair \\
  --key-name my-key-pair \\
  --key-type rsa \\
  --key-format pem \\
  --query 'KeyMaterial' \\
  --output text > my-key-pair.pem

# Set proper permissions
chmod 400 my-key-pair.pem

# List key pairs
aws ec2 describe-key-pairs

# 4. AMI (AMAZON MACHINE IMAGES) MANAGEMENT
# List public AMIs (Amazon Linux 2)
aws ec2 describe-images \\
  --owners amazon \\
  --filters "Name=name,Values=amzn2-ami-hvm-*" "Name=state,Values=available" \\
  --query 'Images | sort_by(@, &CreationDate) | [-1].[ImageId,Name,Description]' \\
  --output table

# Create custom AMI from instance
aws ec2 create-image \\
  --instance-id i-1234567890abcdef0 \\
  --name "MyCustomWebServer-$(date +%Y%m%d)" \\
  --description "Custom web server with my application" \\
  --no-reboot

# 5. ELASTIC BLOCK STORE (EBS) VOLUMES
# Create EBS volume
aws ec2 create-volume \\
  --size 10 \\
  --volume-type gp3 \\
  --availability-zone us-east-1a \\
  --tag-specifications 'ResourceType=volume,Tags=[{Key=Name,Value=MyDataVolume}]'

# Attach volume to instance
aws ec2 attach-volume \\
  --volume-id vol-1234567890abcdef0 \\
  --instance-id i-1234567890abcdef0 \\
  --device /dev/sdf

# Create snapshot
aws ec2 create-snapshot \\
  --volume-id vol-1234567890abcdef0 \\
  --description "Backup of MyDataVolume $(date)"

# 6. ELASTIC IPs
# Allocate Elastic IP
aws ec2 allocate-address --domain vpc

# Associate with instance
aws ec2 associate-address \\
  --instance-id i-1234567890abcdef0 \\
  --allocation-id eipalloc-12345678

# 7. USER DATA SCRIPTS
# Create user data script for instance initialization
cat << 'EOF' > user-data-script.sh
#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd

# Create simple web page
cat << 'HTML' > /var/www/html/index.html
<!DOCTYPE html>
<html>
<head>
    <title>My AWS Web Server</title>
</head>
<body>
    <h1>Hello from AWS EC2!</h1>
    <p>Instance ID: <span id="instance-id">Loading...</span></p>
    <p>Availability Zone: <span id="az">Loading...</span></p>
    
    <script>
        // Fetch instance metadata
        fetch('http://169.254.169.254/latest/meta-data/instance-id')
            .then(response => response.text())
            .then(data => document.getElementById('instance-id').textContent = data);
            
        fetch('http://169.254.169.254/latest/meta-data/placement/availability-zone')
            .then(response => response.text())
            .then(data => document.getElementById('az').textContent = data);
    </script>
</body>
</html>
HTML

# Install Node.js and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install node

# Install Docker
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

echo "EC2 instance setup completed!" > /var/log/user-data.log
EOF

# Launch instance with user data
aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --count 1 \\
  --instance-type t3.micro \\
  --key-name my-key-pair \\
  --security-group-ids sg-903004f8 \\
  --user-data file://user-data-script.sh \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=AutoConfiguredWebServer}]'

# 8. INSTANCE METADATA AND MONITORING
# Connect to instance and check metadata
# ssh -i my-key-pair.pem ec2-user@<public-ip>

# Common metadata endpoints (run from within EC2 instance)
echo "Instance metadata endpoints:"
echo "Instance ID: curl http://169.254.169.254/latest/meta-data/instance-id"
echo "Instance Type: curl http://169.254.169.254/latest/meta-data/instance-type"
echo "Public IP: curl http://169.254.169.254/latest/meta-data/public-ipv4"
echo "IAM Role: curl http://169.254.169.254/latest/meta-data/iam/security-credentials/"

# Enable detailed monitoring
aws ec2 monitor-instances --instance-ids i-1234567890abcdef0

# Get instance metrics
aws cloudwatch get-metric-statistics \\
  --namespace AWS/EC2 \\
  --metric-name CPUUtilization \\
  --dimensions Name=InstanceId,Value=i-1234567890abcdef0 \\
  --statistics Average \\
  --start-time "$(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S)" \\
  --end-time "$(date -u +%Y-%m-%dT%H:%M:%S)" \\
  --period 300

# 9. AUTO SCALING GROUPS
# Create launch template
aws ec2 create-launch-template \\
  --launch-template-name web-server-template \\
  --launch-template-data '{
    "ImageId": "ami-0abcdef1234567890",
    "InstanceType": "t3.micro",
    "KeyName": "my-key-pair",
    "SecurityGroupIds": ["sg-903004f8"],
    "UserData": "'$(base64 -w 0 user-data-script.sh)'",
    "TagSpecifications": [{
      "ResourceType": "instance",
      "Tags": [
        {"Key": "Name", "Value": "AutoScaled-WebServer"},
        {"Key": "Environment", "Value": "Production"}
      ]
    }]
  }'

# Create Auto Scaling Group
aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name web-server-asg \\
  --launch-template LaunchTemplateName=web-server-template,Version=1 \\
  --min-size 1 \\
  --max-size 5 \\
  --desired-capacity 2 \\
  --availability-zones us-east-1a us-east-1b

# 10. LOAD BALANCER INTEGRATION
# Create Application Load Balancer
aws elbv2 create-load-balancer \\
  --name web-server-alb \\
  --subnets subnet-12345678 subnet-87654321 \\
  --security-groups sg-903004f8

# Create target group
aws elbv2 create-target-group \\
  --name web-server-targets \\
  --protocol HTTP \\
  --port 80 \\
  --vpc-id vpc-12345678 \\
  --health-check-path /

# Attach Auto Scaling Group to target group
aws autoscaling attach-load-balancer-target-groups \\
  --auto-scaling-group-name web-server-asg \\
  --target-group-arns arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/web-server-targets/1234567890123456

echo "EC2 management completed!"
echo "✅ Instance lifecycle management"
echo "✅ Security groups and networking"
echo "✅ Storage (EBS) management"
echo "✅ Auto scaling configuration"
echo "✅ Load balancer integration"
echo "✅ Monitoring and metadata"`
      }
    ],
    serverless: [
      {
        title: 'AWS Lambda Serverless Functions',
        description: 'Building and deploying serverless applications with AWS Lambda',
        code: `// AWS Lambda Serverless Development

// 1. BASIC LAMBDA FUNCTION STRUCTURE
// index.js - Simple Lambda function
exports.handler = async (event, context) => {
    console.log('Event:', JSON.stringify(event, null, 2));
    console.log('Context:', JSON.stringify(context, null, 2));
    
    try {
        // Your business logic here
        const result = await processEvent(event);
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            body: JSON.stringify({
                message: 'Function executed successfully',
                data: result,
                timestamp: new Date().toISOString()
            })
        };
    } catch (error) {
        console.error('Error:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message,
                timestamp: new Date().toISOString()
            })
        };
    }
};

async function processEvent(event) {
    // Simulate some processing
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
        processedAt: new Date().toISOString(),
        inputSize: JSON.stringify(event).length,
        randomValue: Math.random()
    };
}

// 2. HTTP API WITH LAMBDA
// api-handler.js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { httpMethod, path, pathParameters, queryStringParameters, body } = event;
    
    console.log(\`HTTP \${httpMethod} \${path}\`);
    
    try {
        switch (httpMethod) {
            case 'GET':
                if (pathParameters && pathParameters.id) {
                    return await getItem(pathParameters.id);
                } else {
                    return await getItems(queryStringParameters);
                }
            
            case 'POST':
                return await createItem(JSON.parse(body));
            
            case 'PUT':
                return await updateItem(pathParameters.id, JSON.parse(body));
            
            case 'DELETE':
                return await deleteItem(pathParameters.id);
            
            default:
                return createResponse(405, { error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        return createResponse(500, { error: 'Internal server error' });
    }
};

async function getItems(queryParams) {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Limit: queryParams?.limit ? parseInt(queryParams.limit) : 10
    };
    
    if (queryParams?.lastKey) {
        params.ExclusiveStartKey = JSON.parse(
            Buffer.from(queryParams.lastKey, 'base64').toString()
        );
    }
    
    const result = await dynamodb.scan(params).promise();
    
    const response = {
        items: result.Items,
        count: result.Count
    };
    
    if (result.LastEvaluatedKey) {
        response.nextKey = Buffer.from(
            JSON.stringify(result.LastEvaluatedKey)
        ).toString('base64');
    }
    
    return createResponse(200, response);
}

async function getItem(id) {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: { id }
    };
    
    const result = await dynamodb.get(params).promise();
    
    if (!result.Item) {
        return createResponse(404, { error: 'Item not found' });
    }
    
    return createResponse(200, result.Item);
}

async function createItem(data) {
    const item = {
        id: AWS.util.uuid.v4(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: item,
        ConditionExpression: 'attribute_not_exists(id)'
    };
    
    await dynamodb.put(params).promise();
    
    return createResponse(201, item);
}

async function updateItem(id, data) {
    const updateExpression = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};
    
    Object.keys(data).forEach(key => {
        updateExpression.push(\`#\${key} = :\${key}\`);
        expressionAttributeNames[\`#\${key}\`] = key;
        expressionAttributeValues[\`:\${key}\`] = data[key];
    });
    
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();
    updateExpression.push('#updatedAt = :updatedAt');
    
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: { id },
        UpdateExpression: \`SET \${updateExpression.join(', ')}\`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW'
    };
    
    const result = await dynamodb.update(params).promise();
    
    return createResponse(200, result.Attributes);
}

async function deleteItem(id) {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: { id },
        ReturnValues: 'ALL_OLD'
    };
    
    const result = await dynamodb.delete(params).promise();
    
    if (!result.Attributes) {
        return createResponse(404, { error: 'Item not found' });
    }
    
    return createResponse(200, { message: 'Item deleted successfully' });
}

function createResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
        },
        body: JSON.stringify(body)
    };
}

// 3. EVENT-DRIVEN LAMBDA (S3 TRIGGER)
// s3-processor.js
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const sns = new AWS.SNS();

exports.handler = async (event) => {
    console.log('S3 Event:', JSON.stringify(event, null, 2));
    
    const results = [];
    
    for (const record of event.Records) {
        if (record.eventSource === 'aws:s3') {
            try {
                const result = await processS3Object(record);
                results.push(result);
            } catch (error) {
                console.error('Error processing S3 object:', error);
                results.push({ error: error.message, record: record.s3 });
            }
        }
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'S3 objects processed',
            results,
            processedCount: results.length
        })
    };
};

async function processS3Object(record) {
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\\+/g, ' '));
    const eventName = record.eventName;
    
    console.log(\`Processing \${eventName} for \${bucket}/\${key}\`);
    
    // Get object metadata
    const headParams = {
        Bucket: bucket,
        Key: key
    };
    
    const metadata = await s3.headObject(headParams).promise();
    
    // Process based on file type
    let processingResult;
    
    if (key.toLowerCase().endsWith('.jpg') || key.toLowerCase().endsWith('.png')) {
        processingResult = await processImage(bucket, key, metadata);
    } else if (key.toLowerCase().endsWith('.json')) {
        processingResult = await processJsonFile(bucket, key, metadata);
    } else if (key.toLowerCase().endsWith('.csv')) {
        processingResult = await processCsvFile(bucket, key, metadata);
    } else {
        processingResult = await processGenericFile(bucket, key, metadata);
    }
    
    // Send notification
    await sendNotification({
        bucket,
        key,
        eventName,
        size: metadata.ContentLength,
        lastModified: metadata.LastModified,
        processingResult
    });
    
    return {
        bucket,
        key,
        eventName,
        processed: true,
        size: metadata.ContentLength,
        result: processingResult
    };
}

async function processImage(bucket, key, metadata) {
    // Simulate image processing (could integrate with AWS Rekognition)
    console.log(\`Processing image: \${key}\`);
    
    return {
        type: 'image',
        dimensions: 'unknown', // Would use image processing library
        format: key.split('.').pop().toLowerCase(),
        processed: true
    };
}

async function processJsonFile(bucket, key, metadata) {
    console.log(\`Processing JSON file: \${key}\`);
    
    const params = {
        Bucket: bucket,
        Key: key
    };
    
    const object = await s3.getObject(params).promise();
    const jsonData = JSON.parse(object.Body.toString());
    
    return {
        type: 'json',
        recordCount: Array.isArray(jsonData) ? jsonData.length : 1,
        keys: typeof jsonData === 'object' ? Object.keys(jsonData) : [],
        processed: true
    };
}

async function processCsvFile(bucket, key, metadata) {
    console.log(\`Processing CSV file: \${key}\`);
    
    const params = {
        Bucket: bucket,
        Key: key
    };
    
    const object = await s3.getObject(params).promise();
    const csvData = object.Body.toString();
    const lines = csvData.split('\\n').filter(line => line.trim());
    
    return {
        type: 'csv',
        rowCount: lines.length - 1, // Excluding header
        columns: lines[0] ? lines[0].split(',').length : 0,
        processed: true
    };
}

async function processGenericFile(bucket, key, metadata) {
    console.log(\`Processing generic file: \${key}\`);
    
    return {
        type: 'generic',
        extension: key.split('.').pop().toLowerCase(),
        processed: true
    };
}

async function sendNotification(data) {
    const message = {
        event: 'S3 Object Processed',
        timestamp: new Date().toISOString(),
        details: data
    };
    
    const params = {
        TopicArn: process.env.SNS_TOPIC_ARN,
        Message: JSON.stringify(message),
        Subject: \`S3 Processing: \${data.key}\`
    };
    
    if (process.env.SNS_TOPIC_ARN) {
        await sns.publish(params).promise();
        console.log('Notification sent');
    } else {
        console.log('SNS Topic ARN not configured, skipping notification');
    }
}

// 4. LAMBDA DEPLOYMENT PACKAGE
// package.json
const packageJson = {
    "name": "aws-lambda-functions",
    "version": "1.0.0",
    "description": "AWS Lambda functions for serverless application",
    "main": "index.js",
    "scripts": {
        "test": "jest",
        "deploy": "npm run build && npm run zip && aws lambda update-function-code --function-name my-lambda --zip-file fileb://function.zip",
        "build": "npm ci --production",
        "zip": "zip -r function.zip . -x '*.git*' 'node_modules/.cache/*' 'test/*' '*.test.js'"
    },
    "dependencies": {
        "aws-sdk": "^2.1000.0",
        "uuid": "^9.0.0"
    },
    "devDependencies": {
        "jest": "^29.0.0",
        "@types/aws-lambda": "^8.10.0"
    }
};

// 5. SERVERLESS FRAMEWORK CONFIGURATION
// serverless.yml
const serverlessConfig = \`
service: my-serverless-app

frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  stage: \${opt:stage, 'dev'}
  environment:
    DYNAMODB_TABLE: \${self:service}-\${self:provider.stage}-items
    SNS_TOPIC_ARN: !Ref ProcessingTopic
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource:
        - !GetAtt ItemsTable.Arn
    - Effect: Allow
      Action:
        - sns:Publish
      Resource:
        - !Ref ProcessingTopic

functions:
  api:
    handler: api-handler.handler
    events:
      - httpApi:
          path: /items
          method: get
      - httpApi:
          path: /items
          method: post
      - httpApi:
          path: /items/{id}
          method: get
      - httpApi:
          path: /items/{id}
          method: put
      - httpApi:
          path: /items/{id}
          method: delete

  s3Processor:
    handler: s3-processor.handler
    events:
      - s3:
          bucket: my-upload-bucket
          event: s3:ObjectCreated:*
          rules:
            - prefix: uploads/
            - suffix: .jpg

resources:
  Resources:
    ItemsTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: \${self:provider.environment.DYNAMODB_TABLE}
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        BillingMode: PAY_PER_REQUEST

    ProcessingTopic:
      Type: AWS::SNS::Topic
      Properties:
        TopicName: \${self:service}-\${self:provider.stage}-processing

  Outputs:
    ApiUrl:
      Description: "HTTP API Gateway endpoint URL"
      Value: !Sub "https://\${HttpApi}.execute-api.\${AWS::Region}.amazonaws.com"
\`;

console.log("AWS Lambda Serverless Development completed!");
console.log("✅ Basic Lambda function structure");
console.log("✅ HTTP API with Lambda");
console.log("✅ Event-driven processing (S3)");
console.log("✅ DynamoDB integration");
console.log("✅ SNS notifications");
console.log("✅ Serverless Framework configuration");
console.log("✅ Deployment automation");`
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-red-600 bg-clip-text text-transparent mb-4">
              AWS Cloud Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master Amazon Web Services - from fundamentals to advanced deployments, 
              EC2, S3, Lambda, RDS, and cloud architecture patterns.
            </p>
          </motion.div>

          {/* Interactive AWS Playground */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-800">AWS CLI Playground</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Practice AWS CLI commands and cloud services! EC2, S3, Lambda, and infrastructure management.
              </p>
              <CodeEditor
                title="AWS CLI Commands"
                initialCode={`# Welcome to AWS Cloud Services!
# These are AWS CLI commands and configurations

# 1. AWS Configuration and Authentication
echo "Setting up AWS CLI..."
aws configure list
aws sts get-caller-identity

# 2. EC2 Instance Management
echo "Managing EC2 instances..."

# List all instances
aws ec2 describe-instances --output table

# Launch a new instance
aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --count 1 \\
  --instance-type t3.micro \\
  --key-name my-key-pair \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyWebServer}]'

# 3. S3 Bucket Operations
echo "Working with S3 storage..."

# Create bucket
aws s3 mb s3://my-unique-bucket-name-12345

# Upload file
echo "Hello from AWS!" > hello.txt
aws s3 cp hello.txt s3://my-unique-bucket-name-12345/

# List bucket contents
aws s3 ls s3://my-unique-bucket-name-12345/

# Sync directory
aws s3 sync ./my-website s3://my-unique-bucket-name-12345/ --delete

# 4. Lambda Function Management
echo "Deploying serverless functions..."

# Create a simple Lambda function
cat << 'EOF' > index.js
exports.handler = async (event) => {
    console.log('Event:', JSON.stringify(event, null, 2));
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from Lambda!',
            timestamp: new Date().toISOString(),
            input: event
        })
    };
};
EOF

# Package and deploy
zip function.zip index.js

aws lambda create-function \\
  --function-name my-hello-function \\
  --runtime nodejs18.x \\
  --role arn:aws:iam::123456789012:role/lambda-execution-role \\
  --handler index.handler \\
  --zip-file fileb://function.zip

# 5. DynamoDB Table Operations
echo "Setting up NoSQL database..."

# Create table
aws dynamodb create-table \\
  --table-name Users \\
  --attribute-definitions AttributeName=id,AttributeType=S \\
  --key-schema AttributeName=id,KeyType=HASH \\
  --billing-mode PAY_PER_REQUEST

# Put item
aws dynamodb put-item \\
  --table-name Users \\
  --item '{"id": {"S": "user1"}, "name": {"S": "John Doe"}, "email": {"S": "john@example.com"}}'

# Query item
aws dynamodb get-item \\
  --table-name Users \\
  --key '{"id": {"S": "user1"}}'

# 6. CloudFormation Infrastructure as Code
echo "Deploying infrastructure..."

cat << 'EOF' > infrastructure.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Basic web application infrastructure'

Resources:
  WebServerInstance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-0abcdef1234567890
      InstanceType: t3.micro
      KeyName: my-key-pair
      SecurityGroups:
        - !Ref WebServerSecurityGroup
      Tags:
        - Key: Name
          Value: CloudFormation Web Server

  WebServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for web server
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0

Outputs:
  InstanceId:
    Description: 'Instance ID of the web server'
    Value: !Ref WebServerInstance
EOF

# Deploy stack
aws cloudformation create-stack \\
  --stack-name my-web-infrastructure \\
  --template-body file://infrastructure.yaml

# Check stack status
aws cloudformation describe-stacks --stack-name my-web-infrastructure

# 7. Monitoring and Logging
echo "Setting up monitoring..."

# Get CloudWatch metrics
aws cloudwatch get-metric-statistics \\
  --namespace AWS/EC2 \\
  --metric-name CPUUtilization \\
  --dimensions Name=InstanceId,Value=i-1234567890abcdef0 \\
  --statistics Average \\
  --start-time "$(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S)" \\
  --end-time "$(date -u +%Y-%m-%dT%H:%M:%S)" \\
  --period 300

echo "AWS services setup completed!"
echo "✅ EC2 instances configured"
echo "✅ S3 storage buckets created"
echo "✅ Lambda functions deployed"
echo "✅ DynamoDB tables ready"
echo "✅ Infrastructure as Code deployed"
echo "✅ Monitoring configured"

# Try your own AWS commands below:
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
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
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

          {/* AWS Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              ☁️ AWS Cloud Advantages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">🌍</div>
                <h3 className="font-semibold mb-2">Global Scale</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 30+ regions worldwide</li>
                  <li>• 99+ availability zones</li>
                  <li>• Edge locations for CDN</li>
                  <li>• Low latency globally</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">💰</div>
                <h3 className="font-semibold mb-2">Cost Effective</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pay-as-you-use pricing</li>
                  <li>• No upfront costs</li>
                  <li>• Reserved instance savings</li>
                  <li>• Auto scaling efficiency</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-3">🔐</div>
                <h3 className="font-semibold mb-2">Security & Reliability</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 99.99% uptime SLA</li>
                  <li>• Enterprise-grade security</li>
                  <li>• Compliance certifications</li>
                  <li>• Data backup & recovery</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Cloud className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="font-semibold mb-2">Cloud Computing</h3>
              <p className="text-gray-600 text-sm">On-demand computing resources and services</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Server className="w-8 h-8 text-yellow-600 mb-3" />
              <h3 className="font-semibold mb-2">Infrastructure</h3>
              <p className="text-gray-600 text-sm">Virtual servers, storage, and networking</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Zap className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-semibold mb-2">Serverless</h3>
              <p className="text-gray-600 text-sm">Event-driven computing without server management</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Shield className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-gray-600 text-sm">Identity management and data protection</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AWSPage
