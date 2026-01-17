# Employee Management System - Setup Guide

## Prerequisites

1. **MySQL Server** - Install MySQL 8.0 or later
2. **Node.js** - Install Node.js 16 or later
3. **.NET 8 SDK** - Install .NET 8 SDK

## Database Setup

### Step 1: Create Database
1. Open MySQL Command Line or MySQL Workbench
2. Run the SQL script from `EmployeeManagementAPI/database-setup.sql`
3. Or manually create database:
   ```sql
   CREATE DATABASE EmployeeManagementDB;
   ```

### Step 2: Update Connection String
1. Open `EmployeeManagementAPI/appsettings.json`
2. Update the connection string with your MySQL credentials:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=EmployeeManagementDB;User=root;Password=YOUR_PASSWORD;"
     }
   }
   ```

## Backend Setup (ASP.NET Web API)

### Step 1: Install Dependencies
```bash
cd EmployeeManagementAPI
dotnet restore
```

### Step 2: Create Database Tables
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Step 3: Run the API
```bash
dotnet run
```
- API will be available at: `https://localhost:5001`
- Swagger UI: `https://localhost:5001/swagger`

## Frontend Setup (React + TypeScript)

### Step 1: Install Dependencies
```bash
cd employee-management-frontend
npm install
```

### Step 2: Start Development Server
```bash
npm start
```
- Frontend will be available at: `http://localhost:3000`

## Quick Start (Windows)

1. Double-click `start-backend.bat` to start the API
2. Double-click `start-frontend.bat` to start the frontend
3. Open browser to `http://localhost:3000`
4. Login with: `admin` / `admin123`

## Testing the Application

### Login
- Username: `admin`
- Password: `admin123`

### Features to Test
1. **Employee Management**
   - Add new employee
   - Edit employee details
   - Delete employee (soft delete)
   - View employee list

2. **Attendance Management**
   - Add attendance record
   - View attendance history
   - Different status types (Present, Absent, Late)

3. **Reports**
   - Employee Directory
   - Department Report
   - Attendance Report
   - Salary Report
   - Export to CSV

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MySQL is running
   - Verify connection string in `appsettings.json`
   - Ensure database exists

2. **CORS Error**
   - Ensure backend is running on port 5001
   - Check CORS configuration in `Program.cs`

3. **Frontend Build Errors**
   - Delete `node_modules` and run `npm install` again
   - Check Node.js version (should be 16+)

4. **API Not Found (404)**
   - Verify backend is running
   - Check API base URL in `services/api.ts`

### Port Configuration
- Backend API: `https://localhost:5001`
- Frontend: `http://localhost:3000`
- MySQL: `localhost:3306` (default)

## Sample Data

The database setup includes sample data:
- 5 sample employees
- Sample attendance records
- Default admin user

## Security Notes

⚠️ **Important**: This is a demo application for learning purposes:
- Passwords are stored in plain text (should be hashed in production)
- No JWT authentication (should implement proper auth in production)
- Basic validation only (should add comprehensive validation in production)

## File Structure

```
Employee-Management-System/
├── EmployeeManagementAPI/          # Backend API
│   ├── Controllers/                # API Controllers
│   ├── Models/                     # Data Models
│   ├── Data/                       # Database Context
│   └── database-setup.sql          # Database Setup Script
├── employee-management-frontend/   # Frontend React App
│   ├── src/
│   │   ├── components/             # React Components
│   │   ├── services/               # API Services
│   │   └── types/                  # TypeScript Types
├── start-backend.bat               # Backend Startup Script
├── start-frontend.bat              # Frontend Startup Script
└── README.md                       # Main Documentation
```