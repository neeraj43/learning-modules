'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coffee, Code, Database, Server, Shield, Zap, Terminal, Settings } from 'lucide-react'
import { CodeEditor } from '@/components/interactive/CodeEditor'

const JavaPage = () => {
  const [activeSection, setActiveSection] = useState('fundamentals')

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
        title: 'Java Basics - Your First Program',
        description: 'Learn Java fundamentals with a simple "Hello World" and basic concepts',
        code: `// Java Fundamentals - Getting Started

// 1. HELLO WORLD - Your First Java Program
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Programming! ☕");
    }
}

// 2. VARIABLES AND DATA TYPES
public class BasicTypes {
    public static void main(String[] args) {
        // Primitive data types
        int age = 25;                    // Integer
        double price = 99.99;            // Decimal number
        char grade = 'A';                // Single character
        boolean isStudent = true;        // True or false
        String name = "John Doe";        // Text (String is a class)
        
        // Printing variables
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Price: $" + price);
        System.out.println("Grade: " + grade);
        System.out.println("Is Student: " + isStudent);
    }
}

// 3. BASIC CALCULATIONS
public class Calculator {
    public static void main(String[] args) {
        int a = 10;
        int b = 5;
        
        System.out.println("Addition: " + a + " + " + b + " = " + (a + b));
        System.out.println("Subtraction: " + a + " - " + b + " = " + (a - b));
        System.out.println("Multiplication: " + a + " * " + b + " = " + (a * b));
        System.out.println("Division: " + a + " / " + b + " = " + (a / b));
        System.out.println("Remainder: " + a + " % " + b + " = " + (a % b));
    }
}

// 4. CONDITIONAL STATEMENTS
public class GradeChecker {
    public static void main(String[] args) {
        int score = 85;
        
        if (score >= 90) {
            System.out.println("Grade: A (Excellent!)");
        } else if (score >= 80) {
            System.out.println("Grade: B (Good job!)");
        } else if (score >= 70) {
            System.out.println("Grade: C (Fair)");
        } else if (score >= 60) {
            System.out.println("Grade: D (Needs improvement)");
        } else {
            System.out.println("Grade: F (Failed)");
        }
    }
}

// 5. LOOPS - Repetition
public class LoopExamples {
    public static void main(String[] args) {
        // For loop - when you know how many times to repeat
        System.out.println("Counting from 1 to 5:");
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
        
        // While loop - repeat while condition is true
        System.out.println("\\nCountdown:");
        int countdown = 5;
        while (countdown > 0) {
            System.out.println(countdown + "...");
            countdown--;
        }
        System.out.println("🚀 Blast off!");
    }
}`
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
              <CodeEditor
                initialCode={example.code}
                title={example.title}
                height="400px"
              />
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
      </div>
    </div>
  )
}

export default JavaPage
