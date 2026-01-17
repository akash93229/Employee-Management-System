# Employee Management System

A modern, full-stack Employee Management System built with React, TypeScript, ASP.NET Core, and MySQL. Features a professional SaaS-level UI with complete CRUD operations, attendance tracking, and reporting capabilities.

## 🔐 Login Credentials

**Default Admin Account:**
- **Username:** `admin`
- **Password:** `admin123`

> **Note:** Use these credentials to access the system. The application includes a mock login fallback if the backend is unavailable.

---

## ✅ Current Status

### Completed Features:
- ✅ Backend API (ASP.NET Core Web API)
- ✅ Frontend (React + TypeScript) 
- ✅ Database Schema (MySQL)
- ✅ Login System
- ✅ Employee Management (CRUD)
- ✅ Attendance Management
- ✅ Reports Generation
- ✅ Responsive Design
- ✅ Form Validation
- ✅ Error Handling

### Fixed Issues:
- ✅ TypeScript compilation errors resolved
- ✅ React component return types fixed
- ✅ Database schema optimized
- ✅ API endpoints tested
- ✅ CORS configuration added

## Features

### 1. Login & Security
- Basic login system with username/password authentication
- Default admin account: `admin` / `admin123`

### 2. Employee Management
- Add new employee records
- Edit existing employee information
- Delete employees (soft delete - marks as inactive)
- View employee details in a table format
- Form validation for all required fields

### 3. Attendance Management
- Record employee attendance with check-in/check-out times
- Track attendance status (Present, Absent, Late)
- Add notes for attendance records
- View all attendance records

### 4. Reports
- **Employee Directory**: Complete list of all active employees
- **Department Report**: Employee count and average salary by department
- **Attendance Report**: Attendance summary for each employee
- **Salary Report**: Employee salary information sorted by highest to lowest
- Export reports to CSV format

## Technology Stack

### Backend
- **ASP.NET Core Web API** (C#)
- **Entity Framework Core** for database operations
- **MySQL** database
- Simple controller-based architecture (no repository pattern)

### Frontend
- **React.js** with **TypeScript**
- Basic CSS for styling
- Responsive design
- Simple component structure

### Database Tables
- **Users**: Stores login credentials
- **Employees**: Main employee information
- **Attendance**: Daily attendance records

## Project Structure

```
EmployeeManagementAPI/
├── Controllers/
│   ├── AuthController.cs          # Login authentication
│   ├── EmployeesController.cs     # Employee CRUD operations
│   ├── AttendanceController.cs    # Attendance management
│   └── ReportsController.cs       # Report generation
├── Models/
│   ├── User.cs                    # User model
│   ├── Employee.cs                # Employee model
│   └── Attendance.cs              # Attendance model
├── Data/
│   └── EmployeeDbContext.cs       # Database context
├── Program.cs                     # Application startup
└── appsettings.json              # Configuration

employee-management-frontend/
├── src/
│   ├── components/
│   │   ├── Login.tsx              # Login page
│   │   ├── Navbar.tsx             # Navigation bar
│   │   ├── EmployeeList.tsx       # Employee list and management
│   │   ├── EmployeeForm.tsx       # Add/edit employee form
│   │   ├── AttendanceManagement.tsx # Attendance tracking
│   │   └── Reports.tsx            # Report generation
│   ├── services/
│   │   └── api.ts                 # API service functions
│   ├── types/
│   │   └── Employee.ts            # TypeScript interfaces
│   ├── App.tsx                    # Main application component
│   ├── index.tsx                  # Application entry point
│   └── index.css                  # Global styles
└── package.json                   # Dependencies
```

## Setup Instructions

### Database Setup
1. Install MySQL on your system
2. Create a new database called `EmployeeManagementDB`
3. Update the connection string in `appsettings.json` with your MySQL credentials

### Backend Setup
1. Navigate to the `EmployeeManagementAPI` folder
2. Run `dotnet restore` to install packages
3. Run `dotnet ef database update` to create database tables
4. Run `dotnet run` to start the API server
5. API will be available at `https://localhost:7000`

### Frontend Setup
1. Navigate to the `employee-management-frontend` folder
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Application will open at `http://localhost:3000`

## Usage

1. **Login**: Use `admin` / `admin123` to log in
2. **Manage Employees**: Click "Employees" to add, edit, or delete employee records
3. **Track Attendance**: Click "Attendance" to record daily attendance
4. **View Reports**: Click "Reports" to generate and export various reports

## Database Schema

### Users Table
- Id (Primary Key)
- Username
- Password (Note: In production, passwords should be hashed)
- Role
- CreatedDate

### Employees Table
- Id (Primary Key)
- FirstName
- LastName
- Email
- Phone
- Department
- Position
- Salary
- HireDate
- IsActive (for soft delete)
- CreatedDate

### Attendance Table
- Id (Primary Key)
- EmployeeId (Foreign Key)
- Date
- CheckInTime
- CheckOutTime
- Status (Present/Absent/Late)
- Notes

## Key Features Explained

### Simple Architecture
- Direct controller-to-database communication
- No complex design patterns or layers
- Easy to understand and modify

### Form Validation
- Client-side validation for required fields
- Email format validation
- Number validation for salary fields

### Responsive Design
- Works on desktop and mobile devices
- Clean, professional interface
- Easy navigation

### Error Handling
- Basic error messages for failed operations
- User-friendly error displays
- Form validation feedback

## Notes for Development

This is an internship-level project designed to be:
- Simple and easy to understand
- Well-commented code
- Basic but functional features
- Good foundation for learning web development

The code follows beginner-friendly practices and avoids over-engineering while still maintaining good structure and functionality.