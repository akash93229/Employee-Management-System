# 🏢 Employee Management System

<div align="center">

![Employee Management System](Screenshot%20(453).png)

**A modern, full-stack Employee Management System built with React, TypeScript, ASP.NET Core, and MySQL**

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Usage Guide](#-usage-guide)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

The **Employee Management System** is a comprehensive web application designed to streamline HR operations and employee data management. Built with modern technologies, it offers a professional SaaS-level user interface with complete CRUD operations, attendance tracking, and advanced reporting capabilities.

### 🔐 Default Login Credentials

```
Username: admin
Password: admin123
```

> **Note:** The application includes a mock login fallback if the backend is unavailable during development.

---

## ✨ Features

### 🔑 Authentication & Security
- Secure login system with username/password authentication
- Role-based access control
- Session management
- Protected routes and API endpoints

### 👥 Employee Management
- ➕ **Add** new employee records with comprehensive details
- ✏️ **Edit** existing employee information
- 🗑️ **Delete** employees (soft delete - marks as inactive)
- 📊 **View** employee details in a sortable, searchable table
- ✅ **Form validation** for all required fields
- 📧 Email format validation
- 📱 Phone number validation

### 📅 Attendance Management
- ⏰ Record employee attendance with check-in/check-out times
- 📍 Track attendance status (Present, Absent, Late)
- 📝 Add notes for attendance records
- 📈 View attendance history and patterns
- 🔍 Filter attendance by date range and employee

### 📊 Advanced Reporting
- **Employee Directory**: Complete list of all active employees
- **Department Report**: Employee count and average salary by department
- **Attendance Report**: Comprehensive attendance summary for each employee
- **Salary Report**: Employee salary information sorted by highest to lowest
- **Export Functionality**: Download reports in CSV and Excel formats
- **PDF Generation**: Create professional PDF reports

### 🎨 User Interface
- 🌐 Fully responsive design (mobile, tablet, desktop)
- 🎯 Clean and intuitive navigation
- 🎨 Modern, professional styling
- ⚡ Fast and smooth user experience
- 🔔 Real-time notifications and feedback

---

## 📸 Screenshots

### Login Page
![Login Screen](Screenshot%20(453).png)
*Secure authentication with username and password*

### Employee Management Dashboard
![Employee Dashboard](Screenshot%20(454).png)
*Comprehensive employee list with search, filter, and CRUD operations*

### Reports & Analytics
![Reports](Screenshot%20(455).png)
*Advanced reporting with export capabilities (CSV, Excel, PDF)*

---

## 🛠 Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **ASP.NET Core** | 8.0 | Web API framework |
| **Entity Framework Core** | 8.0 | ORM for database operations |
| **MySQL** | 8.0+ | Relational database |
| **C#** | 12.0 | Programming language |
| **JWT** | - | Authentication tokens |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | UI library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **CSS3** | - | Styling |
| **Axios** | Latest | HTTP client |
| **React Router** | 6.x | Client-side routing |

### Development Tools
- **Visual Studio Code** - Code editor
- **Postman** - API testing
- **Git** - Version control
- **npm** - Package manager

---

## 📁 Project Structure

```
Employee-Management-System/
│
├── EmployeeManagementAPI/              # Backend API
│   ├── Controllers/
│   │   ├── AuthController.cs           # Authentication endpoints
│   │   ├── EmployeesController.cs      # Employee CRUD operations
│   │   ├── AttendanceController.cs     # Attendance management
│   │   └── ReportsController.cs        # Report generation & export
│   ├── Models/
│   │   ├── User.cs                     # User entity model
│   │   ├── Employee.cs                 # Employee entity model
│   │   └── Attendance.cs               # Attendance entity model
│   ├── Data/
│   │   └── EmployeeDbContext.cs        # EF Core database context
│   ├── Program.cs                      # Application entry point
│   ├── appsettings.json                # Configuration settings
│   └── EmployeeManagementAPI.csproj    # Project file
│
├── employee-management-frontend/       # Frontend Application
│   ├── public/
│   │   └── index.html                  # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.tsx               # Login component
│   │   │   ├── Navbar.tsx              # Navigation bar
│   │   │   ├── EmployeeList.tsx        # Employee list view
│   │   │   ├── EmployeeForm.tsx        # Add/Edit employee form
│   │   │   ├── AttendanceManagement.tsx # Attendance tracking
│   │   │   └── Reports.tsx             # Reports & analytics
│   │   ├── services/
│   │   │   └── api.ts                  # API service layer
│   │   ├── types/
│   │   │   └── Employee.ts             # TypeScript interfaces
│   │   ├── App.tsx                     # Main app component
│   │   ├── index.tsx                   # React entry point
│   │   └── index.css                   # Global styles
│   ├── package.json                    # Dependencies
│   └── tsconfig.json                   # TypeScript config
│
├── database-setup.sql                  # Database initialization script
├── setup-database.sql                  # Additional setup queries
├── insert-admin.sql                    # Admin user creation
├── start-backend.bat                   # Backend startup script
├── start-frontend.bat                  # Frontend startup script
├── reset-database.bat                  # Database reset utility
└── README.md                           # This file
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **.NET SDK** (8.0 or higher) - [Download](https://dotnet.microsoft.com/download)
- **MySQL Server** (8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)
- **Visual Studio Code** (recommended) - [Download](https://code.visualstudio.com/)

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/akash93229/Employee-Management-System.git
cd Employee-Management-System
```

### 2️⃣ Database Setup

#### Option A: Using MySQL Workbench
1. Open MySQL Workbench
2. Create a new connection to your MySQL server
3. Open and execute `setup-database.sql`
4. Execute `insert-admin.sql` to create the admin user

#### Option B: Using Command Line
```bash
mysql -u root -p < setup-database.sql
mysql -u root -p < insert-admin.sql
```

#### Option C: Using Batch Script (Windows)
```bash
reset-database.bat
```

### 3️⃣ Backend Setup

```bash
# Navigate to backend directory
cd EmployeeManagementAPI

# Restore NuGet packages
dotnet restore

# Update connection string in appsettings.json
# Edit the file and replace with your MySQL credentials:
# "Server=localhost;Database=EmployeeManagementDB;User=root;Password=yourpassword;"

# Run the application
dotnet run
```

The API will start at: `https://localhost:7000`

**Or use the batch script:**
```bash
start-backend.bat
```

### 4️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd employee-management-frontend

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at: `http://localhost:3000`

**Or use the batch script:**
```bash
start-frontend.bat
```

---

## 📖 Usage Guide

### Getting Started

1. **Launch the Application**
   - Start the backend API (port 7000)
   - Start the frontend application (port 3000)
   - Navigate to `http://localhost:3000`

2. **Login**
   - Enter username: `admin`
   - Enter password: `admin123`
   - Click "Login"

### Managing Employees

#### Adding a New Employee
1. Click on **"Employees"** in the navigation bar
2. Click the **"Add Employee"** button
3. Fill in the required information:
   - First Name
   - Last Name
   - Email
   - Phone
   - Department
   - Position
   - Salary
   - Hire Date
4. Click **"Save"**

#### Editing an Employee
1. Navigate to the employee list
2. Click the **"Edit"** button next to the employee
3. Modify the information
4. Click **"Update"**

#### Deleting an Employee
1. Navigate to the employee list
2. Click the **"Delete"** button next to the employee
3. Confirm the deletion
   - *Note: This is a soft delete; the employee is marked as inactive*

### Recording Attendance

1. Click on **"Attendance"** in the navigation bar
2. Select an employee from the dropdown
3. Choose the date
4. Enter check-in and check-out times
5. Select status (Present/Absent/Late)
6. Add optional notes
7. Click **"Record Attendance"**

### Generating Reports

1. Click on **"Reports"** in the navigation bar
2. Choose the report type:
   - **Employee Directory**: All active employees
   - **Department Report**: Statistics by department
   - **Attendance Report**: Attendance summary
   - **Salary Report**: Salary breakdown
3. Click **"Generate Report"**
4. Export options:
   - **CSV**: Click "Export to CSV"
   - **Excel**: Click "Export to Excel"
   - **PDF**: Click "Export to PDF"

---

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE Users (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(20) DEFAULT 'Admin',
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Employees Table
```sql
CREATE TABLE Employees (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Phone VARCHAR(20),
    Department VARCHAR(50),
    Position VARCHAR(50),
    Salary DECIMAL(10,2),
    HireDate DATE,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Attendance Table
```sql
CREATE TABLE Attendance (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeId INT NOT NULL,
    Date DATE NOT NULL,
    CheckInTime TIME,
    CheckOutTime TIME,
    Status VARCHAR(20),
    Notes TEXT,
    FOREIGN KEY (EmployeeId) REFERENCES Employees(Id)
);
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |

### Employees
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee (soft) |

### Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attendance` | Get all attendance records |
| GET | `/api/attendance/{id}` | Get attendance by ID |
| POST | `/api/attendance` | Record attendance |
| PUT | `/api/attendance/{id}` | Update attendance |
| DELETE | `/api/attendance/{id}` | Delete attendance |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/employees` | Employee directory |
| GET | `/api/reports/departments` | Department statistics |
| GET | `/api/reports/attendance` | Attendance summary |
| GET | `/api/reports/salary` | Salary report |
| GET | `/api/reports/export/csv` | Export to CSV |
| GET | `/api/reports/export/excel` | Export to Excel |
| GET | `/api/reports/export/pdf` | Export to PDF |

---

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ Full-stack web development with modern technologies
- ✅ RESTful API design and implementation
- ✅ Database design and Entity Framework Core
- ✅ React component architecture and state management
- ✅ TypeScript for type-safe frontend development
- ✅ CRUD operations and data validation
- ✅ Authentication and authorization
- ✅ Report generation and data export
- ✅ Responsive web design principles
- ✅ Git version control and collaboration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Akash**
- GitHub: [@akash93229](https://github.com/akash93229)

---

## 🙏 Acknowledgments

- Built as an internship project to demonstrate full-stack development skills
- Designed with simplicity and learning in mind
- Special thanks to the open-source community

---

<div align="center">

**⭐ If you find this project helpful, please consider giving it a star!**

Made with ❤️ by Akash

</div>
