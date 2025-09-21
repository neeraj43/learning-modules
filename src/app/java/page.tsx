'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coffee, Code, Database, Server, Shield, Zap, Terminal, Settings, HelpCircle, X } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'
import BeginnerGuide from '@/components/beginner/BeginnerGuide'
import CodeRunner from '@/components/interactive/CodeRunner'
import HelpCenter from '@/components/beginner/HelpCenter'

const JavaPage = () => {
  const [activeSection, setActiveSection] = useState('fundamentals')
  const [showBeginnerGuide, setShowBeginnerGuide] = useState(true)
  const [showHelpCenter, setShowHelpCenter] = useState(false)

  // Beginner guide steps for Java fundamentals
  const beginnerSteps = [
    {
      title: "What is Java?",
      description: "Java is a popular programming language used for building everything from mobile apps to enterprise systems. It's known for being 'write once, run anywhere' - meaning code written in Java can run on any device that has Java installed.",
      tip: "Think of Java like a universal language that computers can understand, no matter what type of computer they are!",
      tryIt: "Don't worry about installing anything yet - we'll use interactive examples in your browser first!"
    },
    {
      title: "Your First Java Program",
      description: "Every Java program starts with a 'main' method - this is where your code begins running. Think of it like the front door of your program.",
      code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      tip: "Don't worry about memorizing this syntax yet - focus on understanding that this is the basic structure every Java program needs.",
      tryIt: "Try running the interactive example below to see this in action!"
    },
    {
      title: "Variables - Storing Information",
      description: "Variables are like boxes where you can store different types of information. In Java, you need to tell the computer what type of information you're storing (numbers, text, true/false, etc.).",
      code: `int age = 25;           // Stores whole numbers
double price = 99.99;      // Stores decimal numbers  
String name = "John";      // Stores text
boolean isStudent = true;  // Stores true or false`,
      tip: "Java is 'strongly typed' - this means you must declare what type of data each variable will hold. This helps prevent errors!",
      tryIt: "Try changing the values in the example and see what happens!"
    },
    {
      title: "Making Decisions with If Statements",
      description: "Programs need to make decisions. 'If statements' let your program choose different actions based on conditions - just like how you decide to bring an umbrella IF it's raining.",
      code: `int score = 85;
if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else {
    System.out.println("Grade: C or below");
}`,
      tip: "Think of if statements like a flowchart - your program follows different paths based on the conditions you set.",
      tryIt: "Try changing the score value and see how the output changes!"
    },
    {
      title: "Loops - Repeating Actions",
      description: "Instead of writing the same code over and over, loops let you repeat actions. It's like telling someone 'keep doing this until I say stop'.",
      code: `// Count from 1 to 5
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}`,
      tip: "Loops are incredibly powerful - they can save you from writing thousands of lines of repetitive code!",
      tryIt: "Try changing the numbers in the loop to count to 10 instead of 5!"
    }
  ]

  const sections = [
    { id: 'fundamentals', name: 'Java Fundamentals', icon: '☕' },
    { id: 'oop', name: 'Object-Oriented Programming', icon: '🏗️' },
    { id: 'collections', name: 'Collections & Data Structures', icon: '📊' },
    { id: 'spring', name: 'Spring Framework', icon: '🌱' },
    { id: 'database', name: 'Database Integration', icon: '🗄️' },
    { id: 'rest', name: 'REST APIs', icon: '🚀' },
    { id: 'testing', name: 'Testing', icon: '🧪' },
    { id: 'projects', name: 'Real-Life Projects', icon: '💼' }
  ]

  const codeExamples = {
    fundamentals: [
      {
        title: 'Java Basics - Your First Program (Interactive JavaScript Demo)',
        description: '🔥 Experience Java concepts through executable JavaScript! This demo shows Java programming patterns that work in your browser.',
        code: `// ☕ Java Programming Concepts - Interactive Browser Demo
// Note: This is JavaScript simulating Java concepts for learning!

// 🎯 TRY IT: Click "Run" to see Java concepts in action!

console.log("=== 🚀 JAVA FUNDAMENTALS DEMO ===");
console.log("");

// 1. HELLO WORLD - Your First Java Program
console.log("1. 📋 HELLO WORLD");
console.log("Hello, World!");
console.log("Welcome to Java Programming! ☕");
console.log("");

// 2. VARIABLES AND DATA TYPES (Java-style)
console.log("2. 📊 VARIABLES AND DATA TYPES");
let age = 25;                    // int in Java
let price = 99.99;               // double in Java  
let grade = 'A';                 // char in Java
let isStudent = true;            // boolean in Java
let name = "John Doe";           // String in Java

console.log("Name: " + name);
console.log("Age: " + age);
console.log("Price: $" + price);
console.log("Grade: " + grade);
console.log("Is Student: " + isStudent);
console.log("");

// 3. BASIC CALCULATIONS
console.log("3. 🧮 BASIC CALCULATIONS");
let a = 10;
let b = 5;

console.log("Addition: " + a + " + " + b + " = " + (a + b));
console.log("Subtraction: " + a + " - " + b + " = " + (a - b));
console.log("Multiplication: " + a + " * " + b + " = " + (a * b));
console.log("Division: " + a + " / " + b + " = " + Math.floor(a / b)); // Java integer division
console.log("Remainder: " + a + " % " + b + " = " + (a % b));
console.log("");

// 4. CONDITIONAL STATEMENTS
console.log("4. 🎯 CONDITIONAL STATEMENTS");
let score = 85;

if (score >= 90) {
    console.log("Grade: A (Excellent!)");
} else if (score >= 80) {
    console.log("Grade: B (Good job!)");
} else if (score >= 70) {
    console.log("Grade: C (Fair)");
} else if (score >= 60) {
    console.log("Grade: D (Needs improvement)");
} else {
    console.log("Grade: F (Failed)");
}
console.log("");

// 5. LOOPS - Repetition
console.log("5. 🔄 LOOPS - Repetition");

// For loop - when you know how many times to repeat
console.log("Counting from 1 to 5:");
for (let i = 1; i <= 5; i++) {
    console.log("Count: " + i);
}

// While loop - repeat while condition is true  
console.log("");
console.log("Countdown:");
let countdown = 5;
while (countdown > 0) {
    console.log(countdown + "...");
    countdown--;
}
console.log("🚀 Blast off!");

console.log("");
console.log("🎉 Congratulations! You've learned Java fundamentals!");
console.log("💡 TIP: Try changing the values above and run again!");`
      },
      {
        title: 'Methods and Functions',
        description: 'Learn to create reusable code with methods and understand parameters',
        code: `// Methods and Functions - Building Reusable Code

public class MethodExamples {
    
    // 1. SIMPLE METHOD - No parameters, no return value
    public static void greetUser() {
        System.out.println("Welcome to our application!");
        System.out.println("Have a great day! 😊");
    }
    
    // 2. METHOD WITH PARAMETERS
    public static void greetUserByName(String name) {
        System.out.println("Hello, " + name + "!");
        System.out.println("Nice to meet you!");
    }
    
    // 3. METHOD WITH RETURN VALUE
    public static double calculateTip(double billAmount, double tipPercentage) {
        double tip = billAmount * (tipPercentage / 100);
        return tip;
    }
    
    // 4. METHOD FOR AREA CALCULATION
    public static double calculateRectangleArea(double length, double width) {
        return length * width;
    }
    
    // 5. METHOD TO CHECK IF NUMBER IS EVEN
    public static boolean isEven(int number) {
        return number % 2 == 0;
    }
    
    // 6. PRACTICAL EXAMPLE - Temperature Converter
    public static double celsiusToFahrenheit(double celsius) {
        return (celsius * 9/5) + 32;
    }
    
    public static double fahrenheitToCelsius(double fahrenheit) {
        return (fahrenheit - 32) * 5/9;
    }
    
    // Main method to test all functions
    public static void main(String[] args) {
        // Using simple method
        greetUser();
        
        // Using method with parameters
        greetUserByName("Alice");
        greetUserByName("Bob");
        
        // Using method with return value
        double bill = 50.0;
        double tipPercent = 15.0;
        double tip = calculateTip(bill, tipPercent);
        System.out.println("Bill: $" + bill);
        System.out.println("Tip (" + tipPercent + "%): $" + tip);
        System.out.println("Total: $" + (bill + tip));
        
        // Area calculation
        double area = calculateRectangleArea(10.5, 8.2);
        System.out.println("Rectangle area: " + area + " square units");
        
        // Even number check
        int testNumber = 7;
        if (isEven(testNumber)) {
            System.out.println(testNumber + " is even");
        } else {
            System.out.println(testNumber + " is odd");
        }
        
        // Temperature conversion
        double tempC = 25.0;
        double tempF = celsiusToFahrenheit(tempC);
        System.out.println(tempC + "°C = " + tempF + "°F");
        
        double temp2F = 77.0;
        double temp2C = fahrenheitToCelsius(temp2F);
        System.out.println(temp2F + "°F = " + temp2C + "°C");
    }
}`
      }
    ],
    oop: [
      {
        title: 'Classes and Objects - Real World Examples',
        description: 'Understanding OOP with practical examples like Student, Car, and BankAccount',
        code: `// Object-Oriented Programming - Real World Examples

// 1. STUDENT CLASS - Managing student information
class Student {
    // Properties (attributes)
    private String name;
    private int age;
    private String studentId;
    private double gpa;
    
    // Constructor - creates a new student
    public Student(String name, int age, String studentId) {
        this.name = name;
        this.age = age;
        this.studentId = studentId;
        this.gpa = 0.0; // Starting GPA
    }
    
    // Methods (behaviors)
    public void study(String subject) {
        System.out.println(name + " is studying " + subject);
    }
    
    public void takeExam(String subject, double score) {
        System.out.println(name + " took " + subject + " exam and scored " + score);
        updateGPA(score);
    }
    
    private void updateGPA(double score) {
        // Simplified GPA calculation
        this.gpa = (this.gpa + (score / 25.0)) / 2; // Convert to 4.0 scale
    }
    
    // Getters and Setters
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getStudentId() { return studentId; }
    public double getGPA() { return gpa; }
    
    public void displayInfo() {
        System.out.println("=== Student Information ===");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Student ID: " + studentId);
        System.out.println("GPA: " + String.format("%.2f", gpa));
    }
}

// 2. CAR CLASS - Vehicle management
class Car {
    private String brand;
    private String model;
    private int year;
    private double fuelLevel;
    private boolean isRunning;
    
    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.fuelLevel = 100.0; // Start with full tank
        this.isRunning = false;
    }
    
    public void startEngine() {
        if (fuelLevel > 0) {
            isRunning = true;
            System.out.println("🚗 " + brand + " " + model + " engine started!");
        } else {
            System.out.println("❌ Cannot start - no fuel!");
        }
    }
    
    public void stopEngine() {
        isRunning = false;
        System.out.println("🛑 " + brand + " " + model + " engine stopped.");
    }
    
    public void drive(double miles) {
        if (isRunning && fuelLevel > 0) {
            double fuelUsed = miles * 0.04; // 25 MPG approximation
            fuelLevel = Math.max(0, fuelLevel - fuelUsed);
            System.out.println("🛣️ Drove " + miles + " miles. Fuel remaining: " + 
                             String.format("%.1f", fuelLevel) + "%");
        } else {
            System.out.println("❌ Cannot drive - engine not running or no fuel!");
        }
    }
    
    public void refuel() {
        fuelLevel = 100.0;
        System.out.println("⛽ " + brand + " " + model + " refueled to 100%");
    }
    
    public void displayInfo() {
        System.out.println("=== Car Information ===");
        System.out.println("Vehicle: " + year + " " + brand + " " + model);
        System.out.println("Fuel Level: " + String.format("%.1f", fuelLevel) + "%");
        System.out.println("Engine Status: " + (isRunning ? "Running" : "Stopped"));
    }
}

// Main class to test our objects
public class OOPExample {
    public static void main(String[] args) {
        // Creating and using Student objects
        System.out.println("=== STUDENT MANAGEMENT SYSTEM ===");
        Student alice = new Student("Alice Johnson", 20, "ST001");
        Student bob = new Student("Bob Smith", 19, "ST002");
        
        // Students activities
        alice.study("Mathematics");
        alice.takeExam("Mathematics", 95);
        alice.study("Physics");
        alice.takeExam("Physics", 88);
        alice.displayInfo();
        
        System.out.println();
        
        bob.study("Computer Science");
        bob.takeExam("Computer Science", 92);
        bob.displayInfo();
        
        System.out.println("\\n=== CAR MANAGEMENT SYSTEM ===");
        // Creating and using Car objects
        Car myCar = new Car("Toyota", "Camry", 2022);
        Car friendCar = new Car("Honda", "Civic", 2021);
        
        // Car operations
        myCar.displayInfo();
        myCar.startEngine();
        myCar.drive(50);
        myCar.drive(30);
        myCar.stopEngine();
        myCar.displayInfo();
        
        System.out.println();
        
        friendCar.displayInfo();
        friendCar.startEngine();
        friendCar.drive(200); // Long trip
        friendCar.refuel();
        friendCar.displayInfo();
    }
}`
      }
    ],
    collections: [
      {
        title: 'Java Collections - Lists, Maps, and Sets',
        description: 'Working with ArrayList, HashMap, and HashSet for real-world data management',
        code: `// Java Collections - Managing Data Efficiently

import java.util.*;

public class CollectionsExample {
    public static void main(String[] args) {
        
        // 1. ARRAYLIST - Dynamic list of items
        System.out.println("=== SHOPPING CART EXAMPLE (ArrayList) ===");
        ArrayList<String> shoppingCart = new ArrayList<>();
        
        // Adding items
        shoppingCart.add("Laptop");
        shoppingCart.add("Mouse");
        shoppingCart.add("Keyboard");
        shoppingCart.add("Monitor");
        
        System.out.println("Items in cart: " + shoppingCart.size());
        System.out.println("Cart contents: " + shoppingCart);
        
        // Checking if item exists
        if (shoppingCart.contains("Laptop")) {
            System.out.println("✅ Laptop is in your cart");
        }
        
        // Removing item
        shoppingCart.remove("Mouse");
        System.out.println("After removing mouse: " + shoppingCart);
        
        // Iterating through items
        System.out.println("\\nYour shopping list:");
        for (int i = 0; i < shoppingCart.size(); i++) {
            System.out.println((i + 1) + ". " + shoppingCart.get(i));
        }
        
        // 2. HASHMAP - Key-value pairs
        System.out.println("\\n=== STUDENT GRADES SYSTEM (HashMap) ===");
        HashMap<String, Integer> studentGrades = new HashMap<>();
        
        // Adding student grades
        studentGrades.put("Alice", 95);
        studentGrades.put("Bob", 87);
        studentGrades.put("Charlie", 92);
        studentGrades.put("Diana", 88);
        
        // Getting individual grade
        String student = "Alice";
        int grade = studentGrades.get(student);
        System.out.println(student + "'s grade: " + grade);
        
        // Checking if student exists
        if (studentGrades.containsKey("Bob")) {
            System.out.println("Bob's grade: " + studentGrades.get("Bob"));
        }
        
        // Updating grade
        studentGrades.put("Bob", 90); // Bob retook the exam
        System.out.println("Bob's updated grade: " + studentGrades.get("Bob"));
        
        // Displaying all grades
        System.out.println("\\nAll student grades:");
        for (String name : studentGrades.keySet()) {
            System.out.println(name + ": " + studentGrades.get(name));
        }
        
        // Calculate average grade
        int total = 0;
        for (int gradeValue : studentGrades.values()) {
            total += gradeValue;
        }
        double average = (double) total / studentGrades.size();
        System.out.println("Class average: " + String.format("%.1f", average));
        
        // 3. HASHSET - Unique items only
        System.out.println("\\n=== UNIQUE VISITORS TRACKING (HashSet) ===");
        HashSet<String> uniqueVisitors = new HashSet<>();
        
        // Simulating website visitors
        String[] visitors = {"John", "Mary", "John", "Peter", "Mary", "Alice", "John"};
        
        for (String visitor : visitors) {
            uniqueVisitors.add(visitor);
            System.out.println(visitor + " visited the website");
        }
        
        System.out.println("\\nTotal visits: " + visitors.length);
        System.out.println("Unique visitors: " + uniqueVisitors.size());
        System.out.println("Unique visitor list: " + uniqueVisitors);
    }
}`
      }
    ],
    spring: [
      {
        title: 'Spring Framework Basics - Dependency Injection',
        description: 'Learn Spring Framework fundamentals with dependency injection and configuration',
        code: `// Spring Framework - Dependency Injection Example

// 1. SIMPLE SERVICE CLASS
@Service
public class EmailService {
    public void sendEmail(String to, String subject, String body) {
        System.out.println("📧 Sending email to: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body: " + body);
        System.out.println("✅ Email sent successfully!");
    }
}

// 2. NOTIFICATION SERVICE WITH DEPENDENCY
@Service
public class NotificationService {
    
    @Autowired
    private EmailService emailService;
    
    public void sendWelcomeNotification(String userEmail, String userName) {
        String subject = "Welcome to Our Platform!";
        String body = "Hi " + userName + ",\\n\\n" +
                     "Welcome to our platform! We're excited to have you.\\n\\n" +
                     "Best regards,\\nThe Team";
        
        emailService.sendEmail(userEmail, subject, body);
    }
    
    public void sendOrderConfirmation(String userEmail, String orderId) {
        String subject = "Order Confirmation - " + orderId;
        String body = "Your order " + orderId + " has been confirmed!\\n\\n" +
                     "Thank you for your purchase!";
        
        emailService.sendEmail(userEmail, subject, body);
    }
}

// 3. USER SERVICE - Business Logic
@Service
public class UserService {
    
    @Autowired
    private NotificationService notificationService;
    
    private List<User> users = new ArrayList<>();
    
    public void registerUser(String name, String email) {
        User newUser = new User(name, email);
        users.add(newUser);
        
        System.out.println("👤 User registered: " + name);
        
        // Send welcome notification
        notificationService.sendWelcomeNotification(email, name);
    }
    
    public void processOrder(String userEmail, String orderId) {
        System.out.println("🛒 Processing order: " + orderId);
        
        // Process order logic here...
        System.out.println("✅ Order processed successfully");
        
        // Send confirmation
        notificationService.sendOrderConfirmation(userEmail, orderId);
    }
    
    public List<User> getAllUsers() {
        return users;
    }
}

// 4. USER MODEL CLASS
public class User {
    private String name;
    private String email;
    private Date registrationDate;
    
    public User(String name, String email) {
        this.name = name;
        this.email = email;
        this.registrationDate = new Date();
    }
    
    // Getters and setters
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Date getRegistrationDate() { return registrationDate; }
}

// 5. SPRING CONFIGURATION
@Configuration
@ComponentScan(basePackages = "com.example")
public class AppConfig {
    
    @Bean
    public EmailService emailService() {
        return new EmailService();
    }
}

// 6. MAIN APPLICATION
@SpringBootApplication
public class SpringExampleApp {
    
    @Autowired
    private UserService userService;
    
    public static void main(String[] args) {
        SpringApplication.run(SpringExampleApp.class, args);
    }
    
    @PostConstruct
    public void demo() {
        System.out.println("🌱 Spring Framework Demo");
        System.out.println("========================");
        
        // Register users
        userService.registerUser("Alice Johnson", "alice@email.com");
        userService.processOrder("alice@email.com", "ORDER-001");
        
        System.out.println();
        
        userService.registerUser("Bob Smith", "bob@email.com");
        userService.processOrder("bob@email.com", "ORDER-002");
        
        System.out.println();
        System.out.println("Total users registered: " + userService.getAllUsers().size());
    }
}`
      },
      {
        title: 'Spring Boot Web Application',
        description: 'Building a REST API with Spring Boot for a simple blog application',
        code: `// Spring Boot Web Application - Blog API

// 1. BLOG POST MODEL
@Entity
@Table(name = "blog_posts")
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Column(nullable = false)
    private String author;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // Constructors
    public BlogPost() {}
    
    public BlogPost(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}

// 2. BLOG REPOSITORY
@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByAuthor(String author);
    List<BlogPost> findByTitleContainingIgnoreCase(String title);
    
    @Query("SELECT b FROM BlogPost b WHERE b.createdAt >= :date")
    List<BlogPost> findRecentPosts(@Param("date") LocalDateTime date);
}

// 3. BLOG SERVICE
@Service
@Transactional
public class BlogService {
    
    @Autowired
    private BlogPostRepository blogRepository;
    
    public List<BlogPost> getAllPosts() {
        return blogRepository.findAll();
    }
    
    public BlogPost getPostById(Long id) {
        return blogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }
    
    public BlogPost createPost(BlogPost post) {
        System.out.println("📝 Creating new blog post: " + post.getTitle());
        return blogRepository.save(post);
    }
    
    public BlogPost updatePost(Long id, BlogPost updatedPost) {
        BlogPost existingPost = getPostById(id);
        existingPost.setTitle(updatedPost.getTitle());
        existingPost.setContent(updatedPost.getContent());
        
        System.out.println("✏️ Updated blog post: " + existingPost.getTitle());
        return blogRepository.save(existingPost);
    }
    
    public void deletePost(Long id) {
        BlogPost post = getPostById(id);
        blogRepository.delete(post);
        System.out.println("🗑️ Deleted blog post: " + post.getTitle());
    }
    
    public List<BlogPost> searchPosts(String keyword) {
        return blogRepository.findByTitleContainingIgnoreCase(keyword);
    }
    
    public List<BlogPost> getPostsByAuthor(String author) {
        return blogRepository.findByAuthor(author);
    }
    
    public List<BlogPost> getRecentPosts(int days) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(days);
        return blogRepository.findRecentPosts(cutoffDate);
    }
}

// 4. REST CONTROLLER
@RestController
@RequestMapping("/api/blog")
@CrossOrigin(origins = "*")
public class BlogController {
    
    @Autowired
    private BlogService blogService;
    
    @GetMapping("/posts")
    public ResponseEntity<List<BlogPost>> getAllPosts() {
        List<BlogPost> posts = blogService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/posts/{id}")
    public ResponseEntity<BlogPost> getPost(@PathVariable Long id) {
        try {
            BlogPost post = blogService.getPostById(id);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/posts")
    public ResponseEntity<BlogPost> createPost(@RequestBody BlogPost post) {
        BlogPost createdPost = blogService.createPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }
    
    @PutMapping("/posts/{id}")
    public ResponseEntity<BlogPost> updatePost(@PathVariable Long id, @RequestBody BlogPost post) {
        try {
            BlogPost updatedPost = blogService.updatePost(id, post);
            return ResponseEntity.ok(updatedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        try {
            blogService.deletePost(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/posts/search")
    public ResponseEntity<List<BlogPost>> searchPosts(@RequestParam String keyword) {
        List<BlogPost> posts = blogService.searchPosts(keyword);
        return ResponseEntity.ok(posts);
    }
    
    @GetMapping("/posts/author/{author}")
    public ResponseEntity<List<BlogPost>> getPostsByAuthor(@PathVariable String author) {
        List<BlogPost> posts = blogService.getPostsByAuthor(author);
        return ResponseEntity.ok(posts);
    }
}

// 5. MAIN APPLICATION CLASS
@SpringBootApplication
public class BlogApplication {
    public static void main(String[] args) {
        SpringApplication.run(BlogApplication.class, args);
        System.out.println("🌱 Blog API is running!");
        System.out.println("📖 Access API at: http://localhost:8080/api/blog");
    }
}`
      }
    ],
    database: [
      {
        title: 'JDBC Database Connection',
        description: 'Learn to connect to databases using JDBC with practical examples',
        code: `// JDBC Database Connection - Student Management System

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

// 1. STUDENT MODEL CLASS
public class Student {
    private int id;
    private String name;
    private String email;
    private int age;
    private String major;
    
    // Constructors
    public Student() {}
    
    public Student(String name, String email, int age, String major) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.major = major;
    }
    
    public Student(int id, String name, String email, int age, String major) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.major = major;
    }
    
    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    
    public String getMajor() { return major; }
    public void setMajor(String major) { this.major = major; }
    
    @Override
    public String toString() {
        return "Student{id=" + id + ", name='" + name + "', email='" + email + 
               "', age=" + age + ", major='" + major + "'}";
    }
}

// 2. DATABASE CONNECTION UTILITY
public class DatabaseConnection {
    private static final String URL = "jdbc:sqlite:students.db";
    private static final String DRIVER = "org.sqlite.JDBC";
    
    public static Connection getConnection() throws SQLException {
        try {
            Class.forName(DRIVER);
            return DriverManager.getConnection(URL);
        } catch (ClassNotFoundException e) {
            throw new SQLException("SQLite JDBC driver not found", e);
        }
    }
    
    public static void createTable() {
        String createTableSQL = """
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                age INTEGER NOT NULL,
                major TEXT NOT NULL
            )
        """;
        
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
            
            stmt.execute(createTableSQL);
            System.out.println("📊 Students table created/verified successfully");
            
        } catch (SQLException e) {
            System.err.println("❌ Error creating table: " + e.getMessage());
        }
    }
}

// 3. STUDENT DATA ACCESS OBJECT (DAO)
public class StudentDAO {
    
    // CREATE - Add new student
    public boolean addStudent(Student student) {
        String insertSQL = "INSERT INTO students (name, email, age, major) VALUES (?, ?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {
            
            pstmt.setString(1, student.getName());
            pstmt.setString(2, student.getEmail());
            pstmt.setInt(3, student.getAge());
            pstmt.setString(4, student.getMajor());
            
            int rowsAffected = pstmt.executeUpdate();
            
            if (rowsAffected > 0) {
                System.out.println("✅ Student added successfully: " + student.getName());
                return true;
            }
            
        } catch (SQLException e) {
            System.err.println("❌ Error adding student: " + e.getMessage());
        }
        
        return false;
    }
    
    // READ - Get all students
    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        String selectSQL = "SELECT * FROM students ORDER BY name";
        
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(selectSQL)) {
            
            while (rs.next()) {
                Student student = new Student(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("email"),
                    rs.getInt("age"),
                    rs.getString("major")
                );
                students.add(student);
            }
            
            System.out.println("📚 Retrieved " + students.size() + " students from database");
            
        } catch (SQLException e) {
            System.err.println("❌ Error retrieving students: " + e.getMessage());
        }
        
        return students;
    }
    
    // READ - Get student by ID
    public Student getStudentById(int id) {
        String selectSQL = "SELECT * FROM students WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(selectSQL)) {
            
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                return new Student(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("email"),
                    rs.getInt("age"),
                    rs.getString("major")
                );
            }
            
        } catch (SQLException e) {
            System.err.println("❌ Error finding student: " + e.getMessage());
        }
        
        return null;
    }
    
    // UPDATE - Update student information
    public boolean updateStudent(Student student) {
        String updateSQL = "UPDATE students SET name = ?, email = ?, age = ?, major = ? WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(updateSQL)) {
            
            pstmt.setString(1, student.getName());
            pstmt.setString(2, student.getEmail());
            pstmt.setInt(3, student.getAge());
            pstmt.setString(4, student.getMajor());
            pstmt.setInt(5, student.getId());
            
            int rowsAffected = pstmt.executeUpdate();
            
            if (rowsAffected > 0) {
                System.out.println("✏️ Student updated successfully: " + student.getName());
                return true;
            }
            
        } catch (SQLException e) {
            System.err.println("❌ Error updating student: " + e.getMessage());
        }
        
        return false;
    }
    
    // DELETE - Remove student
    public boolean deleteStudent(int id) {
        String deleteSQL = "DELETE FROM students WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(deleteSQL)) {
            
            pstmt.setInt(1, id);
            int rowsAffected = pstmt.executeUpdate();
            
            if (rowsAffected > 0) {
                System.out.println("🗑️ Student deleted successfully (ID: " + id + ")");
                return true;
            }
            
        } catch (SQLException e) {
            System.err.println("❌ Error deleting student: " + e.getMessage());
        }
        
        return false;
    }
    
    // SEARCH - Find students by major
    public List<Student> getStudentsByMajor(String major) {
        List<Student> students = new ArrayList<>();
        String selectSQL = "SELECT * FROM students WHERE major = ? ORDER BY name";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(selectSQL)) {
            
            pstmt.setString(1, major);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                Student student = new Student(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("email"),
                    rs.getInt("age"),
                    rs.getString("major")
                );
                students.add(student);
            }
            
            System.out.println("🔍 Found " + students.size() + " students in " + major);
            
        } catch (SQLException e) {
            System.err.println("❌ Error searching students: " + e.getMessage());
        }
        
        return students;
    }
}

// 4. MAIN APPLICATION - TESTING THE DATABASE
public class StudentManagementSystem {
    public static void main(String[] args) {
        System.out.println("🎓 Student Management System");
        System.out.println("============================");
        
        // Initialize database
        DatabaseConnection.createTable();
        
        StudentDAO studentDAO = new StudentDAO();
        
        // CREATE - Add sample students
        System.out.println("\\n📝 Adding students...");
        studentDAO.addStudent(new Student("Alice Johnson", "alice@email.com", 20, "Computer Science"));
        studentDAO.addStudent(new Student("Bob Smith", "bob@email.com", 19, "Mathematics"));
        studentDAO.addStudent(new Student("Carol Davis", "carol@email.com", 21, "Computer Science"));
        studentDAO.addStudent(new Student("David Wilson", "david@email.com", 20, "Physics"));
        
        // READ - Display all students
        System.out.println("\\n📚 All students:");
        List<Student> allStudents = studentDAO.getAllStudents();
        for (Student student : allStudents) {
            System.out.println("  " + student);
        }
        
        // SEARCH - Find Computer Science students
        System.out.println("\\n🔍 Computer Science students:");
        List<Student> csStudents = studentDAO.getStudentsByMajor("Computer Science");
        for (Student student : csStudents) {
            System.out.println("  " + student);
        }
        
        // UPDATE - Update a student's information
        System.out.println("\\n✏️ Updating student information...");
        Student studentToUpdate = studentDAO.getStudentById(1);
        if (studentToUpdate != null) {
            studentToUpdate.setAge(21);
            studentToUpdate.setMajor("Software Engineering");
            studentDAO.updateStudent(studentToUpdate);
        }
        
        // READ - Display updated student
        System.out.println("\\n📖 Updated student info:");
        Student updatedStudent = studentDAO.getStudentById(1);
        if (updatedStudent != null) {
            System.out.println("  " + updatedStudent);
        }
        
        // Final count
        System.out.println("\\n📊 Total students in database: " + studentDAO.getAllStudents().size());
    }
}`
      }
    ],
    rest: [
      {
        title: 'REST API with Spring Boot',
        description: 'Building a complete REST API for a book library management system',
        code: `// REST API - Library Management System

// 1. BOOK MODEL
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String author;
    
    @Column(unique = true, nullable = false)
    private String isbn;
    
    @Column(nullable = false)
    private String genre;
    
    @Column(nullable = false)
    private Integer publishYear;
    
    @Column(nullable = false)
    private Boolean available = true;
    
    @Column
    private String borrowedBy;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    // Constructors
    public Book() {}
    
    public Book(String title, String author, String isbn, String genre, Integer publishYear) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.genre = genre;
        this.publishYear = publishYear;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    
    public Integer getPublishYear() { return publishYear; }
    public void setPublishYear(Integer publishYear) { this.publishYear = publishYear; }
    
    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }
    
    public String getBorrowedBy() { return borrowedBy; }
    public void setBorrowedBy(String borrowedBy) { this.borrowedBy = borrowedBy; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
}

// 2. BOOK REPOSITORY
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByAuthorContainingIgnoreCase(String author);
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByGenre(String genre);
    List<Book> findByAvailable(Boolean available);
    List<Book> findByBorrowedBy(String borrowedBy);
    Optional<Book> findByIsbn(String isbn);
    
    @Query("SELECT DISTINCT b.genre FROM Book b ORDER BY b.genre")
    List<String> findAllGenres();
    
    @Query("SELECT COUNT(b) FROM Book b WHERE b.available = false")
    Long countBorrowedBooks();
}

// 3. CUSTOM EXCEPTION CLASSES
@ResponseStatus(HttpStatus.NOT_FOUND)
public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(String message) {
        super(message);
    }
}

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BookNotAvailableException extends RuntimeException {
    public BookNotAvailableException(String message) {
        super(message);
    }
}

// 4. BOOK SERVICE
@Service
@Transactional
public class BookService {
    
    @Autowired
    private BookRepository bookRepository;
    
    // Get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    // Get book by ID
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
            .orElseThrow(() -> new BookNotFoundException("Book not found with id: " + id));
    }
    
    // Add new book
    public Book addBook(Book book) {
        // Check if ISBN already exists
        if (bookRepository.findByIsbn(book.getIsbn()).isPresent()) {
            throw new RuntimeException("Book with ISBN " + book.getIsbn() + " already exists");
        }
        
        Book savedBook = bookRepository.save(book);
        System.out.println("📚 Added new book: " + savedBook.getTitle());
        return savedBook;
    }
    
    // Update book
    public Book updateBook(Long id, Book updatedBook) {
        Book existingBook = getBookById(id);
        
        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setGenre(updatedBook.getGenre());
        existingBook.setPublishYear(updatedBook.getPublishYear());
        
        Book savedBook = bookRepository.save(existingBook);
        System.out.println("✏️ Updated book: " + savedBook.getTitle());
        return savedBook;
    }
    
    // Delete book
    public void deleteBook(Long id) {
        Book book = getBookById(id);
        bookRepository.delete(book);
        System.out.println("🗑️ Deleted book: " + book.getTitle());
    }
    
    // Search books by title
    public List<Book> searchByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }
    
    // Search books by author
    public List<Book> searchByAuthor(String author) {
        return bookRepository.findByAuthorContainingIgnoreCase(author);
    }
    
    // Get books by genre
    public List<Book> getBooksByGenre(String genre) {
        return bookRepository.findByGenre(genre);
    }
    
    // Get available books
    public List<Book> getAvailableBooks() {
        return bookRepository.findByAvailable(true);
    }
    
    // Get borrowed books
    public List<Book> getBorrowedBooks() {
        return bookRepository.findByAvailable(false);
    }
    
    // Borrow a book
    public Book borrowBook(Long bookId, String borrowerName) {
        Book book = getBookById(bookId);
        
        if (!book.getAvailable()) {
            throw new BookNotAvailableException("Book is not available for borrowing");
        }
        
        book.setAvailable(false);
        book.setBorrowedBy(borrowerName);
        
        Book borrowedBook = bookRepository.save(book);
        System.out.println("📖 Book borrowed: " + borrowedBook.getTitle() + " by " + borrowerName);
        return borrowedBook;
    }
    
    // Return a book
    public Book returnBook(Long bookId) {
        Book book = getBookById(bookId);
        
        if (book.getAvailable()) {
            throw new RuntimeException("Book is not currently borrowed");
        }
        
        String previousBorrower = book.getBorrowedBy();
        book.setAvailable(true);
        book.setBorrowedBy(null);
        
        Book returnedBook = bookRepository.save(book);
        System.out.println("📚 Book returned: " + returnedBook.getTitle() + " (was borrowed by " + previousBorrower + ")");
        return returnedBook;
    }
    
    // Get library statistics
    public Map<String, Object> getLibraryStats() {
        Map<String, Object> stats = new HashMap<>();
        
        Long totalBooks = bookRepository.count();
        Long borrowedBooks = bookRepository.countBorrowedBooks();
        Long availableBooks = totalBooks - borrowedBooks;
        List<String> genres = bookRepository.findAllGenres();
        
        stats.put("totalBooks", totalBooks);
        stats.put("availableBooks", availableBooks);
        stats.put("borrowedBooks", borrowedBooks);
        stats.put("totalGenres", genres.size());
        stats.put("genres", genres);
        
        return stats;
    }
}

// 5. REST CONTROLLER
@RestController
@RequestMapping("/api/library")
@CrossOrigin(origins = "*")
public class BookController {
    
    @Autowired
    private BookService bookService;
    
    // GET /api/library/books - Get all books
    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }
    
    // GET /api/library/books/{id} - Get book by ID
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }
    
    // POST /api/library/books - Add new book
    @PostMapping("/books")
    public ResponseEntity<Book> addBook(@RequestBody @Valid Book book) {
        Book createdBook = bookService.addBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }
    
    // PUT /api/library/books/{id} - Update book
    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody @Valid Book book) {
        Book updatedBook = bookService.updateBook(id, book);
        return ResponseEntity.ok(updatedBook);
    }
    
    // DELETE /api/library/books/{id} - Delete book
    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
    
    // GET /api/library/books/search/title?q=... - Search by title
    @GetMapping("/books/search/title")
    public ResponseEntity<List<Book>> searchByTitle(@RequestParam String q) {
        List<Book> books = bookService.searchByTitle(q);
        return ResponseEntity.ok(books);
    }
    
    // GET /api/library/books/search/author?q=... - Search by author
    @GetMapping("/books/search/author")
    public ResponseEntity<List<Book>> searchByAuthor(@RequestParam String q) {
        List<Book> books = bookService.searchByAuthor(q);
        return ResponseEntity.ok(books);
    }
    
    // GET /api/library/books/genre/{genre} - Get books by genre
    @GetMapping("/books/genre/{genre}")
    public ResponseEntity<List<Book>> getBooksByGenre(@PathVariable String genre) {
        List<Book> books = bookService.getBooksByGenre(genre);
        return ResponseEntity.ok(books);
    }
    
    // GET /api/library/books/available - Get available books
    @GetMapping("/books/available")
    public ResponseEntity<List<Book>> getAvailableBooks() {
        List<Book> books = bookService.getAvailableBooks();
        return ResponseEntity.ok(books);
    }
    
    // GET /api/library/books/borrowed - Get borrowed books
    @GetMapping("/books/borrowed")
    public ResponseEntity<List<Book>> getBorrowedBooks() {
        List<Book> books = bookService.getBorrowedBooks();
        return ResponseEntity.ok(books);
    }
    
    // POST /api/library/books/{id}/borrow - Borrow a book
    @PostMapping("/books/{id}/borrow")
    public ResponseEntity<Book> borrowBook(@PathVariable Long id, @RequestParam String borrower) {
        Book borrowedBook = bookService.borrowBook(id, borrower);
        return ResponseEntity.ok(borrowedBook);
    }
    
    // POST /api/library/books/{id}/return - Return a book
    @PostMapping("/books/{id}/return")
    public ResponseEntity<Book> returnBook(@PathVariable Long id) {
        Book returnedBook = bookService.returnBook(id);
        return ResponseEntity.ok(returnedBook);
    }
    
    // GET /api/library/stats - Get library statistics
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getLibraryStats() {
        Map<String, Object> stats = bookService.getLibraryStats();
        return ResponseEntity.ok(stats);
    }
}

// 6. GLOBAL EXCEPTION HANDLER
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleBookNotFound(BookNotFoundException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Book Not Found");
        error.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(BookNotAvailableException.class)
    public ResponseEntity<Map<String, String>> handleBookNotAvailable(BookNotAvailableException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Book Not Available");
        error.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Internal Server Error");
        error.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

// 7. MAIN APPLICATION
@SpringBootApplication
public class LibraryManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementApplication.class, args);
        System.out.println("📚 Library Management API is running!");
        System.out.println("🌐 API Base URL: http://localhost:8080/api/library");
        System.out.println("📖 Available endpoints:");
        System.out.println("  GET    /books           - Get all books");
        System.out.println("  POST   /books           - Add new book");
        System.out.println("  GET    /books/{id}      - Get book by ID");
        System.out.println("  PUT    /books/{id}      - Update book");
        System.out.println("  DELETE /books/{id}      - Delete book");
        System.out.println("  GET    /books/available - Get available books");
        System.out.println("  POST   /books/{id}/borrow - Borrow book");
        System.out.println("  POST   /books/{id}/return - Return book");
        System.out.println("  GET    /stats           - Get library statistics");
    }
}`
      }
    ],
    testing: [
      {
        title: 'JUnit Testing Fundamentals',
        description: 'Learn unit testing with JUnit for Java applications',
        code: `// JUnit Testing - Testing a Calculator Class

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

// 1. CALCULATOR CLASS TO TEST
public class Calculator {
    
    public int add(int a, int b) {
        return a + b;
    }
    
    public int subtract(int a, int b) {
        return a - b;
    }
    
    public int multiply(int a, int b) {
        return a * b;
    }
    
    public double divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
        return (double) a / b;
    }
    
    public boolean isEven(int number) {
        return number % 2 == 0;
    }
    
    public int factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Factorial not defined for negative numbers");
        }
        if (n == 0 || n == 1) {
            return 1;
        }
        int result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    public double squareRoot(double number) {
        if (number < 0) {
            throw new IllegalArgumentException("Cannot calculate square root of negative number");
        }
        return Math.sqrt(number);
    }
}

// 2. JUNIT TEST CLASS
@DisplayName("Calculator Tests")
public class CalculatorTest {
    
    private Calculator calculator;
    
    @BeforeEach
    @DisplayName("Setup before each test")
    void setUp() {
        calculator = new Calculator();
        System.out.println("🧪 Setting up calculator for test");
    }
    
    @AfterEach
    @DisplayName("Cleanup after each test")
    void tearDown() {
        System.out.println("✅ Test completed\\n");
    }
    
    @BeforeAll
    static void setUpClass() {
        System.out.println("🚀 Starting Calculator Tests");
        System.out.println("===========================");
    }
    
    @AfterAll
    static void tearDownClass() {
        System.out.println("🏁 All Calculator Tests Completed");
    }
    
    // 3. ADDITION TESTS
    @Nested
    @DisplayName("Addition Tests")
    class AdditionTests {
        
        @Test
        @DisplayName("Adding positive numbers")
        void testAddPositiveNumbers() {
            // Arrange
            int a = 5;
            int b = 3;
            int expected = 8;
            
            // Act
            int result = calculator.add(a, b);
            
            // Assert
            assertEquals(expected, result, "5 + 3 should equal 8");
            System.out.println("✅ Positive addition test passed: " + a + " + " + b + " = " + result);
        }
        
        @Test
        @DisplayName("Adding negative numbers")
        void testAddNegativeNumbers() {
            int result = calculator.add(-5, -3);
            assertEquals(-8, result, "-5 + (-3) should equal -8");
            System.out.println("✅ Negative addition test passed: -5 + (-3) = " + result);
        }
        
        @Test
        @DisplayName("Adding zero")
        void testAddWithZero() {
            assertEquals(5, calculator.add(5, 0), "5 + 0 should equal 5");
            assertEquals(0, calculator.add(0, 0), "0 + 0 should equal 0");
            System.out.println("✅ Zero addition tests passed");
        }
    }
    
    // 4. SUBTRACTION TESTS
    @Nested
    @DisplayName("Subtraction Tests")
    class SubtractionTests {
        
        @Test
        @DisplayName("Subtracting positive numbers")
        void testSubtractPositiveNumbers() {
            int result = calculator.subtract(10, 3);
            assertEquals(7, result, "10 - 3 should equal 7");
            System.out.println("✅ Subtraction test passed: 10 - 3 = " + result);
        }
        
        @Test
        @DisplayName("Subtracting larger from smaller")
        void testSubtractLargerFromSmaller() {
            int result = calculator.subtract(3, 10);
            assertEquals(-7, result, "3 - 10 should equal -7");
            System.out.println("✅ Negative result test passed: 3 - 10 = " + result);
        }
    }
    
    // 5. MULTIPLICATION TESTS
    @Test
    @DisplayName("Multiplication tests")
    void testMultiplication() {
        assertAll("Multiplication tests",
            () -> assertEquals(15, calculator.multiply(3, 5), "3 * 5 should equal 15"),
            () -> assertEquals(0, calculator.multiply(0, 5), "0 * 5 should equal 0"),
            () -> assertEquals(-15, calculator.multiply(-3, 5), "-3 * 5 should equal -15"),
            () -> assertEquals(15, calculator.multiply(-3, -5), "-3 * -5 should equal 15")
        );
        System.out.println("✅ All multiplication tests passed");
    }
    
    // 6. DIVISION TESTS
    @Nested
    @DisplayName("Division Tests")
    class DivisionTests {
        
        @Test
        @DisplayName("Normal division")
        void testDivision() {
            double result = calculator.divide(10, 2);
            assertEquals(5.0, result, 0.001, "10 / 2 should equal 5.0");
            System.out.println("✅ Division test passed: 10 / 2 = " + result);
        }
        
        @Test
        @DisplayName("Division with decimal result")
        void testDivisionWithDecimal() {
            double result = calculator.divide(10, 3);
            assertEquals(3.333, result, 0.001, "10 / 3 should be approximately 3.333");
            System.out.println("✅ Decimal division test passed: 10 / 3 = " + result);
        }
        
        @Test
        @DisplayName("Division by zero throws exception")
        void testDivisionByZero() {
            Exception exception = assertThrows(IllegalArgumentException.class, () -> {
                calculator.divide(10, 0);
            });
            
            String expectedMessage = "Cannot divide by zero";
            String actualMessage = exception.getMessage();
            
            assertTrue(actualMessage.contains(expectedMessage));
            System.out.println("✅ Division by zero exception test passed: " + actualMessage);
        }
    }
    
    // 7. BOOLEAN TESTS
    @Test
    @DisplayName("Even number checker")
    void testIsEven() {
        assertAll("Even number tests",
            () -> assertTrue(calculator.isEven(4), "4 should be even"),
            () -> assertFalse(calculator.isEven(5), "5 should be odd"),
            () -> assertTrue(calculator.isEven(0), "0 should be even"),
            () -> assertFalse(calculator.isEven(-3), "-3 should be odd"),
            () -> assertTrue(calculator.isEven(-4), "-4 should be even")
        );
        System.out.println("✅ Even number tests passed");
    }
    
    // 8. PARAMETERIZED TESTS
    @ParameterizedTest
    @DisplayName("Factorial calculation")
    @CsvSource({
        "0, 1",
        "1, 1", 
        "2, 2",
        "3, 6",
        "4, 24",
        "5, 120"
    })
    void testFactorial(int input, int expected) {
        int result = calculator.factorial(input);
        assertEquals(expected, result, "Factorial of " + input + " should be " + expected);
        System.out.println("✅ Factorial test passed: " + input + "! = " + result);
    }
    
    @Test
    @DisplayName("Factorial with negative number throws exception")
    void testFactorialNegative() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            calculator.factorial(-1);
        });
        
        assertTrue(exception.getMessage().contains("Factorial not defined for negative numbers"));
        System.out.println("✅ Negative factorial exception test passed");
    }
    
    // 9. SQUARE ROOT TESTS
    @Test
    @DisplayName("Square root calculation")
    void testSquareRoot() {
        assertAll("Square root tests",
            () -> assertEquals(3.0, calculator.squareRoot(9), 0.001, "√9 should equal 3"),
            () -> assertEquals(4.0, calculator.squareRoot(16), 0.001, "√16 should equal 4"),
            () -> assertEquals(0.0, calculator.squareRoot(0), 0.001, "√0 should equal 0"),
            () -> assertEquals(5.0, calculator.squareRoot(25), 0.001, "√25 should equal 5")
        );
        System.out.println("✅ Square root tests passed");
    }
    
    @Test
    @DisplayName("Square root of negative number throws exception")
    void testSquareRootNegative() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            calculator.squareRoot(-1);
        });
        
        assertTrue(exception.getMessage().contains("Cannot calculate square root of negative number"));
        System.out.println("✅ Negative square root exception test passed");
    }
    
    // 10. PERFORMANCE TEST
    @Test
    @DisplayName("Performance test - multiple calculations")
    @Timeout(value = 1, unit = TimeUnit.SECONDS)
    void testPerformance() {
        long startTime = System.currentTimeMillis();
        
        for (int i = 0; i < 100000; i++) {
            calculator.add(i, i + 1);
            calculator.multiply(i, 2);
        }
        
        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        
        System.out.println("✅ Performance test completed in " + duration + "ms");
        assertTrue(duration < 1000, "100,000 calculations should complete in under 1 second");
    }
}

// 11. TEST RUNNER
public class TestRunner {
    public static void main(String[] args) {
        System.out.println("🧪 Running JUnit Tests for Calculator");
        System.out.println("=====================================");
        
        // This would typically be run by a test runner like Maven or Gradle
        // Here's a demonstration of test results:
        
        System.out.println("Test Results:");
        System.out.println("✅ testAddPositiveNumbers - PASSED");
        System.out.println("✅ testAddNegativeNumbers - PASSED");
        System.out.println("✅ testAddWithZero - PASSED");
        System.out.println("✅ testSubtractPositiveNumbers - PASSED");
        System.out.println("✅ testMultiplication - PASSED");
        System.out.println("✅ testDivision - PASSED");
        System.out.println("✅ testDivisionByZero - PASSED");
        System.out.println("✅ testIsEven - PASSED");
        System.out.println("✅ testFactorial - PASSED");
        System.out.println("✅ testSquareRoot - PASSED");
        System.out.println("✅ testPerformance - PASSED");
        
        System.out.println("\\n📊 Test Summary:");
        System.out.println("Tests run: 11");
        System.out.println("Passed: 11");
        System.out.println("Failed: 0");
        System.out.println("Success rate: 100%");
        
        System.out.println("\\n🎉 All tests passed! Calculator is working correctly.");
    }
}`
      }
    ],
    projects: [
      {
        title: 'Todo Application - Complete Project',
        description: 'A full-featured Todo application demonstrating Java concepts in a real project',
        code: `// Complete Todo Application - Real-Life Java Project

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

// 1. TODO ITEM MODEL
public class TodoItem {
    private static int nextId = 1;
    
    private int id;
    private String title;
    private String description;
    private Priority priority;
    private Status status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime dueDate;
    private String category;
    
    // Enums for better type safety
    public enum Priority {
        LOW("🟢 Low"),
        MEDIUM("🟡 Medium"), 
        HIGH("🔴 High"),
        URGENT("🚨 Urgent");
        
        private final String displayName;
        
        Priority(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    public enum Status {
        PENDING("📋 Pending"),
        IN_PROGRESS("⏳ In Progress"),
        COMPLETED("✅ Completed"),
        CANCELLED("❌ Cancelled");
        
        private final String displayName;
        
        Status(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    // Constructors
    public TodoItem(String title, String description) {
        this.id = nextId++;
        this.title = title;
        this.description = description;
        this.priority = Priority.MEDIUM;
        this.status = Status.PENDING;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.category = "General";
    }
    
    public TodoItem(String title, String description, Priority priority, String category) {
        this(title, description);
        this.priority = priority;
        this.category = category;
    }
    
    // Getters and setters with validation
    public int getId() { return id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be empty");
        }
        this.title = title.trim();
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getDescription() { return description; }
    public void setDescription(String description) {
        this.description = description != null ? description.trim() : "";
        this.updatedAt = LocalDateTime.now();
    }
    
    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) {
        this.priority = priority != null ? priority : Priority.MEDIUM;
        this.updatedAt = LocalDateTime.now();
    }
    
    public Status getStatus() { return status; }
    public void setStatus(Status status) {
        this.status = status != null ? status : Status.PENDING;
        this.updatedAt = LocalDateTime.now();
    }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    
    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getCategory() { return category; }
    public void setCategory(String category) {
        this.category = category != null ? category.trim() : "General";
        this.updatedAt = LocalDateTime.now();
    }
    
    // Helper methods
    public boolean isOverdue() {
        return dueDate != null && LocalDateTime.now().isAfter(dueDate) && status != Status.COMPLETED;
    }
    
    public boolean isCompleted() {
        return status == Status.COMPLETED;
    }
    
    public void markCompleted() {
        setStatus(Status.COMPLETED);
    }
    
    public void markInProgress() {
        setStatus(Status.IN_PROGRESS);
    }
    
    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy HH:mm");
        StringBuilder sb = new StringBuilder();
        
        sb.append("📋 #").append(id).append(" - ").append(title);
        sb.append("\\n   Status: ").append(status.getDisplayName());
        sb.append("\\n   Priority: ").append(priority.getDisplayName());
        sb.append("\\n   Category: ").append(category);
        
        if (description != null && !description.isEmpty()) {
            sb.append("\\n   Description: ").append(description);
        }
        
        if (dueDate != null) {
            sb.append("\\n   Due: ").append(dueDate.format(formatter));
            if (isOverdue()) {
                sb.append(" ⚠️ OVERDUE");
            }
        }
        
        sb.append("\\n   Created: ").append(createdAt.format(formatter));
        
        return sb.toString();
    }
}

// 2. TODO MANAGER - Business Logic
public class TodoManager {
    private List<TodoItem> todos;
    private Map<String, List<TodoItem>> categorizedTodos;
    
    public TodoManager() {
        this.todos = new ArrayList<>();
        this.categorizedTodos = new HashMap<>();
    }
    
    // Add todo
    public TodoItem addTodo(String title, String description) {
        TodoItem todo = new TodoItem(title, description);
        todos.add(todo);
        categorizeItem(todo);
        System.out.println("✅ Added: " + title);
        return todo;
    }
    
    public TodoItem addTodo(String title, String description, TodoItem.Priority priority, String category) {
        TodoItem todo = new TodoItem(title, description, priority, category);
        todos.add(todo);
        categorizeItem(todo);
        System.out.println("✅ Added: " + title + " (" + priority.getDisplayName() + ")");
        return todo;
    }
    
    // Helper method to categorize items
    private void categorizeItem(TodoItem todo) {
        categorizedTodos.computeIfAbsent(todo.getCategory(), k -> new ArrayList<>()).add(todo);
    }
    
    // Get all todos
    public List<TodoItem> getAllTodos() {
        return new ArrayList<>(todos);
    }
    
    // Get todo by ID
    public TodoItem getTodoById(int id) {
        return todos.stream()
            .filter(todo -> todo.getId() == id)
            .findFirst()
            .orElse(null);
    }
    
    // Update todo
    public boolean updateTodo(int id, String title, String description, TodoItem.Priority priority) {
        TodoItem todo = getTodoById(id);
        if (todo != null) {
            todo.setTitle(title);
            todo.setDescription(description);
            todo.setPriority(priority);
            System.out.println("📝 Updated: " + title);
            return true;
        }
        return false;
    }
    
    // Delete todo
    public boolean deleteTodo(int id) {
        TodoItem todo = getTodoById(id);
        if (todo != null) {
            todos.remove(todo);
            categorizedTodos.get(todo.getCategory()).remove(todo);
            System.out.println("🗑️ Deleted: " + todo.getTitle());
            return true;
        }
        return false;
    }
    
    // Mark todo as completed
    public boolean completeTodo(int id) {
        TodoItem todo = getTodoById(id);
        if (todo != null) {
            todo.markCompleted();
            System.out.println("🎉 Completed: " + todo.getTitle());
            return true;
        }
        return false;
    }
    
    // Get todos by status
    public List<TodoItem> getTodosByStatus(TodoItem.Status status) {
        return todos.stream()
            .filter(todo -> todo.getStatus() == status)
            .collect(Collectors.toList());
    }
    
    // Get todos by priority
    public List<TodoItem> getTodosByPriority(TodoItem.Priority priority) {
        return todos.stream()
            .filter(todo -> todo.getPriority() == priority)
            .collect(Collectors.toList());
    }
    
    // Get todos by category
    public List<TodoItem> getTodosByCategory(String category) {
        return categorizedTodos.getOrDefault(category, new ArrayList<>());
    }
    
    // Get overdue todos
    public List<TodoItem> getOverdueTodos() {
        return todos.stream()
            .filter(TodoItem::isOverdue)
            .collect(Collectors.toList());
    }
    
    // Search todos
    public List<TodoItem> searchTodos(String keyword) {
        String searchTerm = keyword.toLowerCase();
        return todos.stream()
            .filter(todo -> 
                todo.getTitle().toLowerCase().contains(searchTerm) ||
                todo.getDescription().toLowerCase().contains(searchTerm) ||
                todo.getCategory().toLowerCase().contains(searchTerm)
            )
            .collect(Collectors.toList());
    }
    
    // Get statistics
    public Map<String, Integer> getStatistics() {
        Map<String, Integer> stats = new HashMap<>();
        
        stats.put("Total", todos.size());
        stats.put("Pending", getTodosByStatus(TodoItem.Status.PENDING).size());
        stats.put("In Progress", getTodosByStatus(TodoItem.Status.IN_PROGRESS).size());
        stats.put("Completed", getTodosByStatus(TodoItem.Status.COMPLETED).size());
        stats.put("Overdue", getOverdueTodos().size());
        
        return stats;
    }
    
    // Get all categories
    public Set<String> getAllCategories() {
        return new HashSet<>(categorizedTodos.keySet());
    }
    
    // Sort todos by priority (Urgent -> High -> Medium -> Low)
    public List<TodoItem> getTodosSortedByPriority() {
        return todos.stream()
            .sorted((t1, t2) -> {
                // Custom priority order
                Map<TodoItem.Priority, Integer> priorityOrder = Map.of(
                    TodoItem.Priority.URGENT, 1,
                    TodoItem.Priority.HIGH, 2,
                    TodoItem.Priority.MEDIUM, 3,
                    TodoItem.Priority.LOW, 4
                );
                return priorityOrder.get(t1.getPriority()) - priorityOrder.get(t2.getPriority());
            })
            .collect(Collectors.toList());
    }
    
    // Sort todos by due date
    public List<TodoItem> getTodosSortedByDueDate() {
        return todos.stream()
            .filter(todo -> todo.getDueDate() != null)
            .sorted(Comparator.comparing(TodoItem::getDueDate))
            .collect(Collectors.toList());
    }
}

// 3. CONSOLE USER INTERFACE
public class TodoConsoleApp {
    private TodoManager todoManager;
    private Scanner scanner;
    
    public TodoConsoleApp() {
        this.todoManager = new TodoManager();
        this.scanner = new Scanner(System.in);
    }
    
    public void run() {
        System.out.println("📋 Welcome to Todo Manager!");
        System.out.println("==========================");
        
        // Add some sample data
        addSampleData();
        
        while (true) {
            displayMenu();
            int choice = getChoice();
            
            switch (choice) {
                case 1 -> addNewTodo();
                case 2 -> viewAllTodos();
                case 3 -> viewTodosByCategory();
                case 4 -> markTodoCompleted();
                case 5 -> searchTodos();
                case 6 -> viewStatistics();
                case 7 -> viewOverdueTodos();
                case 8 -> deleteTodo();
                case 0 -> {
                    System.out.println("👋 Goodbye! Thanks for using Todo Manager.");
                    return;
                }
                default -> System.out.println("❌ Invalid choice. Please try again.");
            }
            
            System.out.println("\\nPress Enter to continue...");
            scanner.nextLine();
        }
    }
    
    private void addSampleData() {
        System.out.println("📝 Adding sample todos...");
        
        TodoItem todo1 = todoManager.addTodo("Complete Java project", "Finish the todo application implementation", TodoItem.Priority.HIGH, "Work");
        todo1.setDueDate(LocalDateTime.now().plusDays(3));
        
        todoManager.addTodo("Buy groceries", "Milk, bread, eggs, vegetables", TodoItem.Priority.MEDIUM, "Personal");
        
        TodoItem todo2 = todoManager.addTodo("Study for exam", "Review chapters 1-5 for midterm", TodoItem.Priority.URGENT, "Education");
        todo2.setDueDate(LocalDateTime.now().plusDays(1));
        
        todoManager.addTodo("Exercise", "30 minutes of jogging", TodoItem.Priority.LOW, "Health");
        
        TodoItem todo3 = todoManager.addTodo("Call dentist", "Schedule annual checkup", TodoItem.Priority.MEDIUM, "Health");
        todo3.setDueDate(LocalDateTime.now().minusDays(1)); // Overdue
        
        System.out.println("✅ Sample data added!\\n");
    }
    
    private void displayMenu() {
        System.out.println("\\n📋 Todo Manager - Main Menu");
        System.out.println("=============================");
        System.out.println("1. ➕ Add new todo");
        System.out.println("2. 📋 View all todos");
        System.out.println("3. 📂 View todos by category");
        System.out.println("4. ✅ Mark todo as completed");
        System.out.println("5. 🔍 Search todos");
        System.out.println("6. 📊 View statistics");
        System.out.println("7. ⚠️ View overdue todos");
        System.out.println("8. 🗑️ Delete todo");
        System.out.println("0. 👋 Exit");
        System.out.print("\\nEnter your choice: ");
    }
    
    private int getChoice() {
        try {
            int choice = Integer.parseInt(scanner.nextLine());
            return choice;
        } catch (NumberFormatException e) {
            return -1;
        }
    }
    
    private void addNewTodo() {
        System.out.println("\\n➕ Add New Todo");
        System.out.println("================");
        
        System.out.print("Title: ");
        String title = scanner.nextLine();
        
        System.out.print("Description: ");
        String description = scanner.nextLine();
        
        System.out.print("Category: ");
        String category = scanner.nextLine();
        
        System.out.println("Priority: 1-Low, 2-Medium, 3-High, 4-Urgent");
        System.out.print("Enter priority (1-4): ");
        int priorityChoice = getChoice();
        
        TodoItem.Priority priority = switch (priorityChoice) {
            case 1 -> TodoItem.Priority.LOW;
            case 3 -> TodoItem.Priority.HIGH;
            case 4 -> TodoItem.Priority.URGENT;
            default -> TodoItem.Priority.MEDIUM;
        };
        
        todoManager.addTodo(title, description, priority, category);
    }
    
    private void viewAllTodos() {
        System.out.println("\\n📋 All Todos");
        System.out.println("=============");
        
        List<TodoItem> todos = todoManager.getTodosSortedByPriority();
        
        if (todos.isEmpty()) {
            System.out.println("No todos found. Add some todos first!");
            return;
        }
        
        for (TodoItem todo : todos) {
            System.out.println(todo);
            System.out.println("---");
        }
    }
    
    private void viewTodosByCategory() {
        System.out.println("\\n📂 Todos by Category");
        System.out.println("====================");
        
        Set<String> categories = todoManager.getAllCategories();
        
        for (String category : categories) {
            System.out.println("\\n📁 " + category + ":");
            List<TodoItem> categoryTodos = todoManager.getTodosByCategory(category);
            
            for (TodoItem todo : categoryTodos) {
                System.out.println("  #" + todo.getId() + " - " + todo.getTitle() + " (" + todo.getStatus().getDisplayName() + ")");
            }
        }
    }
    
    private void markTodoCompleted() {
        System.out.println("\\n✅ Mark Todo as Completed");
        System.out.println("=========================");
        
        System.out.print("Enter todo ID: ");
        int id = getChoice();
        
        if (todoManager.completeTodo(id)) {
            System.out.println("🎉 Todo marked as completed!");
        } else {
            System.out.println("❌ Todo not found.");
        }
    }
    
    private void searchTodos() {
        System.out.println("\\n🔍 Search Todos");
        System.out.println("===============");
        
        System.out.print("Enter search keyword: ");
        String keyword = scanner.nextLine();
        
        List<TodoItem> results = todoManager.searchTodos(keyword);
        
        if (results.isEmpty()) {
            System.out.println("No todos found matching '" + keyword + "'");
            return;
        }
        
        System.out.println("\\nSearch results for '" + keyword + "':");
        for (TodoItem todo : results) {
            System.out.println("  #" + todo.getId() + " - " + todo.getTitle() + " (" + todo.getCategory() + ")");
        }
    }
    
    private void viewStatistics() {
        System.out.println("\\n📊 Todo Statistics");
        System.out.println("==================");
        
        Map<String, Integer> stats = todoManager.getStatistics();
        
        System.out.println("📋 Total todos: " + stats.get("Total"));
        System.out.println("⏳ Pending: " + stats.get("Pending"));
        System.out.println("🔄 In Progress: " + stats.get("In Progress"));
        System.out.println("✅ Completed: " + stats.get("Completed"));
        System.out.println("⚠️ Overdue: " + stats.get("Overdue"));
        
        if (stats.get("Total") > 0) {
            double completionRate = (double) stats.get("Completed") / stats.get("Total") * 100;
            System.out.println("\\n📈 Completion rate: " + String.format("%.1f", completionRate) + "%");
        }
        
        System.out.println("\\n📂 Categories: " + String.join(", ", todoManager.getAllCategories()));
    }
    
    private void viewOverdueTodos() {
        System.out.println("\\n⚠️ Overdue Todos");
        System.out.println("=================");
        
        List<TodoItem> overdueTodos = todoManager.getOverdueTodos();
        
        if (overdueTodos.isEmpty()) {
            System.out.println("🎉 No overdue todos! Great job!");
            return;
        }
        
        for (TodoItem todo : overdueTodos) {
            System.out.println(todo);
            System.out.println("---");
        }
    }
    
    private void deleteTodo() {
        System.out.println("\\n🗑️ Delete Todo");
        System.out.println("===============");
        
        System.out.print("Enter todo ID to delete: ");
        int id = getChoice();
        
        if (todoManager.deleteTodo(id)) {
            System.out.println("✅ Todo deleted successfully!");
        } else {
            System.out.println("❌ Todo not found.");
        }
    }
}

// 4. MAIN APPLICATION
public class TodoApp {
    public static void main(String[] args) {
        TodoConsoleApp app = new TodoConsoleApp();
        app.run();
    }
}`
      },
      {
        title: 'Library Management System',
        description: 'A comprehensive library management system showcasing advanced Java concepts',
        code: `// Library Management System - Advanced Java Project

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

// 1. PERSON BASE CLASS
abstract public class Person {
    protected String id;
    protected String name;
    protected String email;
    protected String phone;
    protected LocalDate registrationDate;
    
    public Person(String id, String name, String email, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.registrationDate = LocalDate.now();
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public LocalDate getRegistrationDate() { return registrationDate; }
    
    public abstract void displayInfo();
}

// 2. MEMBER CLASS
public class Member extends Person {
    private String membershipType;
    private int borrowedBooks;
    private double fines;
    private boolean isActive;
    
    public enum MembershipType {
        STUDENT("Student", 5, 14),
        FACULTY("Faculty", 10, 30),
        PUBLIC("Public", 3, 7);
        
        private final String name;
        private final int maxBooks;
        private final int maxDays;
        
        MembershipType(String name, int maxBooks, int maxDays) {
            this.name = name;
            this.maxBooks = maxBooks;
            this.maxDays = maxDays;
        }
        
        public String getName() { return name; }
        public int getMaxBooks() { return maxBooks; }
        public int getMaxDays() { return maxDays; }
    }
    
    public Member(String id, String name, String email, String phone, MembershipType membershipType) {
        super(id, name, email, phone);
        this.membershipType = membershipType.getName();
        this.borrowedBooks = 0;
        this.fines = 0.0;
        this.isActive = true;
    }
    
    public String getMembershipType() { return membershipType; }
    public int getBorrowedBooks() { return borrowedBooks; }
    public void setBorrowedBooks(int borrowedBooks) { this.borrowedBooks = borrowedBooks; }
    public double getFines() { return fines; }
    public void addFine(double amount) { this.fines += amount; }
    public void payFine(double amount) { this.fines = Math.max(0, this.fines - amount); }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { this.isActive = active; }
    
    @Override
    public void displayInfo() {
        System.out.println("👤 Member: " + name + " (ID: " + id + ")");
        System.out.println("   Type: " + membershipType);
        System.out.println("   Email: " + email);
        System.out.println("   Books borrowed: " + borrowedBooks);
        System.out.println("   Fines: $" + String.format("%.2f", fines));
        System.out.println("   Status: " + (isActive ? "Active" : "Inactive"));
        System.out.println("   Member since: " + registrationDate);
    }
}

// 3. LIBRARIAN CLASS
public class Librarian extends Person {
    private String department;
    private double salary;
    private Set<String> permissions;
    
    public Librarian(String id, String name, String email, String phone, String department, double salary) {
        super(id, name, email, phone);
        this.department = department;
        this.salary = salary;
        this.permissions = new HashSet<>(Arrays.asList("CHECKOUT", "RETURN", "ADD_BOOK", "MANAGE_MEMBER"));
    }
    
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
    public Set<String> getPermissions() { return permissions; }
    
    public boolean hasPermission(String permission) {
        return permissions.contains(permission);
    }
    
    @Override
    public void displayInfo() {
        System.out.println("👨‍💼 Librarian: " + name + " (ID: " + id + ")");
        System.out.println("   Department: " + department);
        System.out.println("   Email: " + email);
        System.out.println("   Salary: $" + String.format("%.2f", salary));
        System.out.println("   Permissions: " + String.join(", ", permissions));
    }
}

// 4. BOOK CLASS
public class Book {
    private String isbn;
    private String title;
    private String author;
    private String genre;
    private int publicationYear;
    private boolean isAvailable;
    private LocalDate addedDate;
    
    public Book(String isbn, String title, String author, String genre, int publicationYear) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.publicationYear = publicationYear;
        this.isAvailable = true;
        this.addedDate = LocalDate.now();
    }
    
    // Getters and setters
    public String getIsbn() { return isbn; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public int getPublicationYear() { return publicationYear; }
    public void setPublicationYear(int publicationYear) { this.publicationYear = publicationYear; }
    public boolean isAvailable() { return isAvailable; }
    public void setAvailable(boolean available) { this.isAvailable = available; }
    public LocalDate getAddedDate() { return addedDate; }
    
    public void displayInfo() {
        System.out.println("📚 " + title + " by " + author);
        System.out.println("   ISBN: " + isbn);
        System.out.println("   Genre: " + genre);
        System.out.println("   Year: " + publicationYear);
        System.out.println("   Status: " + (isAvailable ? "Available" : "Borrowed"));
        System.out.println("   Added: " + addedDate);
    }
    
    @Override
    public String toString() {
        return title + " by " + author + " (" + isbn + ")";
    }
}

// 5. TRANSACTION CLASS
public class Transaction {
    private static int nextTransactionId = 1000;
    
    private int transactionId;
    private String memberId;
    private String isbn;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private double fine;
    private TransactionType type;
    
    public enum TransactionType {
        BORROW("📖 Borrowed"),
        RETURN("📚 Returned"),
        RENEW("🔄 Renewed"),
        FINE_PAID("💰 Fine Paid");
        
        private final String description;
        
        TransactionType(String description) {
            this.description = description;
        }
        
        public String getDescription() { return description; }
    }
    
    public Transaction(String memberId, String isbn, TransactionType type) {
        this.transactionId = nextTransactionId++;
        this.memberId = memberId;
        this.isbn = isbn;
        this.type = type;
        this.borrowDate = LocalDate.now();
        this.dueDate = LocalDate.now().plusDays(14); // Default 14 days
        this.fine = 0.0;
    }
    
    // Getters and setters
    public int getTransactionId() { return transactionId; }
    public String getMemberId() { return memberId; }
    public String getIsbn() { return isbn; }
    public LocalDate getBorrowDate() { return borrowDate; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public LocalDate getReturnDate() { return returnDate; }
    public void setReturnDate(LocalDate returnDate) { this.returnDate = returnDate; }
    public double getFine() { return fine; }
    public void setFine(double fine) { this.fine = fine; }
    public TransactionType getType() { return type; }
    
    public boolean isOverdue() {
        return returnDate == null && LocalDate.now().isAfter(dueDate);
    }
    
    public long getDaysOverdue() {
        if (!isOverdue()) return 0;
        return ChronoUnit.DAYS.between(dueDate, LocalDate.now());
    }
    
    public void displayInfo() {
        System.out.println("📋 Transaction #" + transactionId);
        System.out.println("   Member ID: " + memberId);
        System.out.println("   Book ISBN: " + isbn);
        System.out.println("   Type: " + type.getDescription());
        System.out.println("   Borrow Date: " + borrowDate);
        System.out.println("   Due Date: " + dueDate);
        if (returnDate != null) {
            System.out.println("   Return Date: " + returnDate);
        }
        if (fine > 0) {
            System.out.println("   Fine: $" + String.format("%.2f", fine));
        }
        if (isOverdue()) {
            System.out.println("   ⚠️ OVERDUE by " + getDaysOverdue() + " days");
        }
    }
}

// 6. LIBRARY MANAGEMENT SYSTEM
public class LibraryManager {
    private Map<String, Book> books;
    private Map<String, Member> members;
    private Map<String, Librarian> librarians;
    private List<Transaction> transactions;
    private final double FINE_PER_DAY = 0.50;
    
    public LibraryManager() {
        this.books = new HashMap<>();
        this.members = new HashMap<>();
        this.librarians = new HashMap<>();
        this.transactions = new ArrayList<>();
    }
    
    // Book Management
    public void addBook(Book book) {
        books.put(book.getIsbn(), book);
        System.out.println("✅ Added book: " + book.getTitle());
    }
    
    public Book findBook(String isbn) {
        return books.get(isbn);
    }
    
    public List<Book> searchBooks(String keyword) {
        return books.values().stream()
            .filter(book -> 
                book.getTitle().toLowerCase().contains(keyword.toLowerCase()) ||
                book.getAuthor().toLowerCase().contains(keyword.toLowerCase()) ||
                book.getGenre().toLowerCase().contains(keyword.toLowerCase())
            )
            .collect(Collectors.toList());
    }
    
    public List<Book> getAvailableBooks() {
        return books.values().stream()
            .filter(Book::isAvailable)
            .collect(Collectors.toList());
    }
    
    // Member Management
    public void addMember(Member member) {
        members.put(member.getId(), member);
        System.out.println("✅ Added member: " + member.getName());
    }
    
    public Member findMember(String memberId) {
        return members.get(memberId);
    }
    
    // Librarian Management
    public void addLibrarian(Librarian librarian) {
        librarians.put(librarian.getId(), librarian);
        System.out.println("✅ Added librarian: " + librarian.getName());
    }
    
    // Book Operations
    public boolean borrowBook(String memberId, String isbn) {
        Member member = findMember(memberId);
        Book book = findBook(isbn);
        
        if (member == null) {
            System.out.println("❌ Member not found: " + memberId);
            return false;
        }
        
        if (book == null) {
            System.out.println("❌ Book not found: " + isbn);
            return false;
        }
        
        if (!book.isAvailable()) {
            System.out.println("❌ Book is not available: " + book.getTitle());
            return false;
        }
        
        if (!member.isActive()) {
            System.out.println("❌ Member account is inactive: " + member.getName());
            return false;
        }
        
        if (member.getFines() > 10.0) {
            System.out.println("❌ Member has outstanding fines: $" + String.format("%.2f", member.getFines()));
            return false;
        }
        
        // Process borrowing
        book.setAvailable(false);
        member.setBorrowedBooks(member.getBorrowedBooks() + 1);
        
        Transaction transaction = new Transaction(memberId, isbn, Transaction.TransactionType.BORROW);
        transactions.add(transaction);
        
        System.out.println("📖 Book borrowed successfully!");
        System.out.println("   Member: " + member.getName());
        System.out.println("   Book: " + book.getTitle());
        System.out.println("   Due Date: " + transaction.getDueDate());
        
        return true;
    }
    
    public boolean returnBook(String memberId, String isbn) {
        Member member = findMember(memberId);
        Book book = findBook(isbn);
        
        if (member == null || book == null) {
            System.out.println("❌ Member or book not found");
            return false;
        }
        
        // Find the borrow transaction
        Transaction borrowTransaction = transactions.stream()
            .filter(t -> t.getMemberId().equals(memberId) && 
                        t.getIsbn().equals(isbn) && 
                        t.getType() == Transaction.TransactionType.BORROW &&
                        t.getReturnDate() == null)
            .findFirst()
            .orElse(null);
        
        if (borrowTransaction == null) {
            System.out.println("❌ No active borrow record found");
            return false;
        }
        
        // Process return
        book.setAvailable(true);
        member.setBorrowedBooks(member.getBorrowedBooks() - 1);
        borrowTransaction.setReturnDate(LocalDate.now());
        
        // Calculate fine if overdue
        if (borrowTransaction.isOverdue()) {
            double fine = borrowTransaction.getDaysOverdue() * FINE_PER_DAY;
            borrowTransaction.setFine(fine);
            member.addFine(fine);
            
            System.out.println("⚠️ Book returned late! Fine: $" + String.format("%.2f", fine));
        }
        
        Transaction returnTransaction = new Transaction(memberId, isbn, Transaction.TransactionType.RETURN);
        transactions.add(returnTransaction);
        
        System.out.println("📚 Book returned successfully!");
        System.out.println("   Member: " + member.getName());
        System.out.println("   Book: " + book.getTitle());
        
        return true;
    }
    
    // Get member's borrowed books
    public List<Transaction> getMemberBorrowedBooks(String memberId) {
        return transactions.stream()
            .filter(t -> t.getMemberId().equals(memberId) && 
                        t.getType() == Transaction.TransactionType.BORROW &&
                        t.getReturnDate() == null)
            .collect(Collectors.toList());
    }
    
    // Get overdue books
    public List<Transaction> getOverdueBooks() {
        return transactions.stream()
            .filter(Transaction::isOverdue)
            .collect(Collectors.toList());
    }
    
    // Generate reports
    public void generateLibraryReport() {
        System.out.println("\\n📊 LIBRARY MANAGEMENT REPORT");
        System.out.println("==============================");
        
        System.out.println("📚 Books:");
        System.out.println("   Total books: " + books.size());
        System.out.println("   Available: " + getAvailableBooks().size());
        System.out.println("   Borrowed: " + (books.size() - getAvailableBooks().size()));
        
        System.out.println("\\n👥 Members:");
        System.out.println("   Total members: " + members.size());
        long activeMembers = members.values().stream().filter(Member::isActive).count();
        System.out.println("   Active members: " + activeMembers);
        
        System.out.println("\\n📋 Transactions:");
        System.out.println("   Total transactions: " + transactions.size());
        
        List<Transaction> overdueBooks = getOverdueBooks();
        System.out.println("\\n⚠️ Overdue Books: " + overdueBooks.size());
        if (!overdueBooks.isEmpty()) {
            for (Transaction transaction : overdueBooks) {
                Member member = findMember(transaction.getMemberId());
                Book book = findBook(transaction.getIsbn());
                System.out.println("   " + member.getName() + " - " + book.getTitle() + 
                                 " (Overdue: " + transaction.getDaysOverdue() + " days)");
            }
        }
        
        double totalFines = members.values().stream().mapToDouble(Member::getFines).sum();
        System.out.println("\\n💰 Total Outstanding Fines: $" + String.format("%.2f", totalFines));
    }
}

// 7. MAIN APPLICATION
public class LibraryManagementApp {
    public static void main(String[] args) {
        System.out.println("📚 Library Management System");
        System.out.println("============================");
        
        LibraryManager library = new LibraryManager();
        
        // Add sample books
        System.out.println("\\n📝 Adding sample books...");
        library.addBook(new Book("978-0134685991", "Effective Java", "Joshua Bloch", "Programming", 2017));
        library.addBook(new Book("978-0596009205", "Head First Design Patterns", "Eric Freeman", "Programming", 2004));
        library.addBook(new Book("978-0132350884", "Clean Code", "Robert Martin", "Programming", 2008));
        library.addBook(new Book("978-1617294945", "Spring in Action", "Craig Walls", "Programming", 2018));
        library.addBook(new Book("978-0345404473", "The Foundation Trilogy", "Isaac Asimov", "Science Fiction", 1951));
        
        // Add sample members
        System.out.println("\\n👥 Adding sample members...");
        library.addMember(new Member("M001", "Alice Johnson", "alice@email.com", "555-0101", Member.MembershipType.STUDENT));
        library.addMember(new Member("M002", "Bob Smith", "bob@email.com", "555-0102", Member.MembershipType.FACULTY));
        library.addMember(new Member("M003", "Carol Davis", "carol@email.com", "555-0103", Member.MembershipType.PUBLIC));
        
        // Add sample librarians
        System.out.println("\\n👨‍💼 Adding sample librarians...");
        library.addLibrarian(new Librarian("L001", "Dr. Sarah Wilson", "sarah@library.edu", "555-0201", "Main Library", 55000));
        library.addLibrarian(new Librarian("L002", "Mike Rodriguez", "mike@library.edu", "555-0202", "Technical Services", 48000));
        
        // Simulate library operations
        System.out.println("\\n📖 Simulating library operations...");
        
        // Member borrowing books
        library.borrowBook("M001", "978-0134685991"); // Alice borrows Effective Java
        library.borrowBook("M001", "978-0596009205"); // Alice borrows Head First Design Patterns
        library.borrowBook("M002", "978-0132350884"); // Bob borrows Clean Code
        library.borrowBook("M003", "978-1617294945"); // Carol borrows Spring in Action
        
        // Try to borrow unavailable book
        library.borrowBook("M002", "978-0134685991"); // Bob tries to borrow already borrowed book
        
        // Return a book
        library.returnBook("M001", "978-0596009205"); // Alice returns Head First Design Patterns
        
        // Display member information
        System.out.println("\\n👤 Member Information:");
        System.out.println("======================");
        Member alice = library.findMember("M001");
        alice.displayInfo();
        
        System.out.println("\\n📖 Alice's borrowed books:");
        List<Transaction> aliceBorrowedBooks = library.getMemberBorrowedBooks("M001");
        for (Transaction transaction : aliceBorrowedBooks) {
            Book book = library.findBook(transaction.getIsbn());
            System.out.println("   " + book.getTitle() + " (Due: " + transaction.getDueDate() + ")");
        }
        
        // Search for books
        System.out.println("\\n🔍 Searching for 'Java' books:");
        List<Book> javaBooks = library.searchBooks("Java");
        for (Book book : javaBooks) {
            System.out.println("   " + book.getTitle() + " by " + book.getAuthor() + 
                             " (" + (book.isAvailable() ? "Available" : "Borrowed") + ")");
        }
        
        // Generate comprehensive report
        library.generateLibraryReport();
        
        System.out.println("\\n✅ Library Management System Demo Completed!");
    }
}`
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coffee className="w-12 h-12 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-800">Java Programming</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master Java programming from basics to advanced concepts with real-world examples and beginner-friendly explanations
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-orange-200'
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
              <h3 className="text-xl font-semibold text-gray-800">🎯 New to Java? Start Here!</h3>
              <button
                onClick={() => setShowBeginnerGuide(false)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Hide Guide
              </button>
            </div>
            <BeginnerGuide
              topic="Java Programming Fundamentals"
              steps={beginnerSteps}
              nextTopics={["Object-Oriented Programming", "Collections & Data Structures", "Spring Framework"]}
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
          transition={{ duration: 0.3 }}
        >
          {codeExamples[activeSection as keyof typeof codeExamples]?.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden"
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
                  description="🚀 This interactive demo lets you run Java-style code in your browser!"
                  expectedOutput={[
                    "=== 🚀 JAVA FUNDAMENTALS DEMO ===",
                    "1. 📋 HELLO WORLD",
                    "Hello, World!",
                    "Welcome to Java Programming! ☕"
                  ]}
                  hints={[
                    "Try changing the 'name' variable to your own name",
                    "Modify the 'age' or 'score' values and see how the output changes",
                    "Change the loop range to count to a different number",
                    "This is JavaScript simulating Java concepts - perfect for learning!"
                  ]}
                />
              ) : (
                <CodeEditor
                  initialCode={example.code}
                  title={example.title}
                  height="400px"
                />
              )}
            </motion.div>
          )) || (
            <div className="text-center py-12">
              <p className="text-gray-500">Content for this section is being prepared...</p>
            </div>
          )}
        </motion.div>

        {/* Why Learn Java Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Why Learn Java? ☕</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">🌟 Industry Standard</h3>
              <ul className="space-y-2">
                <li>• Used by 90% of Fortune 500 companies</li>
                <li>• Powers Android mobile applications</li>
                <li>• Enterprise-level web applications</li>
                <li>• Big data processing (Hadoop, Spark)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">💼 Career Opportunities</h3>
              <ul className="space-y-2">
                <li>• High-paying software developer jobs</li>
                <li>• Backend development positions</li>
                <li>• Android app development</li>
                <li>• Enterprise software engineering</li>
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

export default JavaPage
