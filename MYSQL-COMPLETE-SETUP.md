# 🗄️ MySQL Installation & Complete System Setup Guide

## 📥 **Step 1: Download MySQL Server**

### **1.1 Go to MySQL Download Page**
1. **Open your web browser**
2. **Navigate to**: https://dev.mysql.com/downloads/installer/
3. **You'll see two options**:
   - `mysql-installer-web-community-8.x.x.x.msi` (smaller, downloads during install)
   - `mysql-installer-community-8.x.x.x.msi` (larger, offline installer)

### **1.2 Download MySQL Installer**
1. **Click**: `mysql-installer-community-8.x.x.x.msi` (the larger file ~400MB)
2. **Click**: "No thanks, just start my download" (you don't need to sign up)
3. **Wait** for download to complete
4. **Save** the file to your Downloads folder

---

## 🔧 **Step 2: Install MySQL Server**

### **2.1 Run the Installer**
1. **Navigate** to your Downloads folder
2. **Double-click**: `mysql-installer-community-8.x.x.x.msi`
3. **Click**: "Yes" if Windows asks for permission

### **2.2 Choose Setup Type**
1. **Select**: "Developer Default" (recommended)
2. **Click**: "Next"
3. **Click**: "Execute" to download and install components
4. **Wait** for installation to complete (may take 5-10 minutes)

### **2.3 Product Configuration**
1. **MySQL Server Configuration**:
   - **Config Type**: "Development Computer"
   - **Connectivity**: Keep default (Port 3306)
   - **Authentication Method**: "Use Strong Password Encryption"
   - **Click**: "Next"

2. **Accounts and Roles**:
   - **Root Password**: Enter `admin123` (or choose your own)
   - **Confirm Password**: Enter `admin123` again
   - **Click**: "Next"

3. **Windows Service**:
   - **Service Name**: Keep default "MySQL80"
   - **Start at System Startup**: ✅ Checked
   - **Run Windows Service as**: Keep default
   - **Click**: "Next"

4. **Server File Permissions**:
   - Keep default settings
   - **Click**: "Next"

5. **Apply Configuration**:
   - **Click**: "Execute"
   - **Wait** for configuration to complete
   - **Click**: "Finish"

### **2.4 Complete Installation**
1. **MySQL Workbench** and other tools will also be configured
2. **Click**: "Next" through the remaining screens
3. **Click**: "Finish" to complete installation

---

## ✅ **Step 3: Verify MySQL Installation**

### **3.1 Test MySQL Command Line**
1. **Open**: Command Prompt or PowerShell **as Administrator**
2. **Run**: `mysql --version`
3. **Expected output**: `mysql Ver 8.x.x for Win64 on x86_64`

### **3.2 Test MySQL Connection**
1. **Run**: `mysql -u root -p`
2. **Enter password**: `admin123` (or your chosen password)
3. **Expected**: MySQL command prompt `mysql>`
4. **Type**: `exit` to quit

---

## 🗄️ **Step 4: Create Database and Tables**

### **4.1 Connect to MySQL**
```bash
mysql -u root -p
# Enter your password when prompted
```

### **4.2 Run Database Setup Script**
Copy and paste the following SQL commands one by one:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS EmployeeManagementDB;
USE EmployeeManagementDB;

-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(20) NOT NULL DEFAULT 'Admin',
    CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Employees table
CREATE TABLE IF NOT EXISTS Employees (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Phone VARCHAR(20) NOT NULL,
    Department VARCHAR(50) NOT NULL,
    Position VARCHAR(50) NOT NULL,
    Salary DECIMAL(18,2) NOT NULL,
    HireDate DATE NOT NULL,
    IsActive BOOLEAN NOT NULL DEFAULT TRUE,
    CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Attendance table
CREATE TABLE IF NOT EXISTS Attendances (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeId INT NOT NULL,
    Date DATE NOT NULL,
    CheckInTime TIME NOT NULL,
    CheckOutTime TIME NULL,
    Status VARCHAR(20) NOT NULL DEFAULT 'Present',
    Notes TEXT,
    FOREIGN KEY (EmployeeId) REFERENCES Employees(Id)
);

-- Insert default admin user
INSERT IGNORE INTO Users (Id, Username, Password, Role, CreatedDate) 
VALUES (1, 'admin', 'admin123', 'Admin', '2024-01-01 00:00:00');

-- Insert sample employees
INSERT IGNORE INTO Employees (FirstName, LastName, Email, Phone, Department, Position, Salary, HireDate) VALUES
('John', 'Doe', 'john.doe@company.com', '555-0101', 'IT', 'Software Developer', 75000.00, '2023-01-15'),
('Jane', 'Smith', 'jane.smith@company.com', '555-0102', 'HR', 'HR Manager', 65000.00, '2023-02-01'),
('Mike', 'Johnson', 'mike.johnson@company.com', '555-0103', 'Finance', 'Accountant', 55000.00, '2023-03-10'),
('Sarah', 'Wilson', 'sarah.wilson@company.com', '555-0104', 'Marketing', 'Marketing Specialist', 50000.00, '2023-04-05'),
('David', 'Brown', 'david.brown@company.com', '555-0105', 'IT', 'System Administrator', 70000.00, '2023-05-20');

-- Insert sample attendance records
INSERT IGNORE INTO Attendances (EmployeeId, Date, CheckInTime, CheckOutTime, Status, Notes) VALUES
(1, '2024-01-15', '09:00:00', '17:00:00', 'Present', 'Regular day'),
(2, '2024-01-15', '08:30:00', '16:30:00', 'Present', 'Early arrival'),
(3, '2024-01-15', '09:15:00', '17:15:00', 'Late', 'Traffic delay'),
(4, '2024-01-15', '09:00:00', '17:00:00', 'Present', 'Regular day'),
(5, '2024-01-15', '09:00:00', '17:00:00', 'Present', 'Regular day');

-- Verify data
SELECT 'Database setup completed successfully!' as Status;
SELECT COUNT(*) as UserCount FROM Users;
SELECT COUNT(*) as EmployeeCount FROM Employees;
SELECT COUNT(*) as AttendanceCount FROM Attendances;
```

### **4.3 Exit MySQL**
```sql
exit
```

---

## 🔧 **Step 5: Update Backend Configuration**

### **5.1 Update Connection String**
1. **Open**: `EmployeeManagementAPI/appsettings.json`
2. **Update** the connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=EmployeeManagementDB;User=root;Password=admin123;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```
3. **Replace** `admin123` with your actual MySQL password if different

---

## 🚀 **Step 6: Start All Services**

### **6.1 Start Backend API**
1. **Open PowerShell** in project directory
2. **Navigate**: `cd EmployeeManagementAPI`
3. **Run**: `& "C:\Program Files\dotnet\dotnet.exe" run`
4. **Expected output**:
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
```

### **6.2 Start Frontend (if not running)**
1. **Open another PowerShell** window
2. **Navigate**: `cd employee-management-frontend`
3. **Run**: `npm start`
4. **Expected**: Browser opens to http://localhost:3000

---

## 🧪 **Step 7: Test Complete System**

### **7.1 Test Login**
1. **Open browser**: http://localhost:3000
2. **Login with**:
   - **Username**: `admin`
   - **Password**: `admin123`
3. **Should**: Successfully log in and show dashboard

### **7.2 Test Employee Management**
1. **Click**: "Employees" tab
2. **Should see**: List of 5 sample employees
3. **Try**: Adding a new employee
4. **Try**: Editing an existing employee
5. **Try**: Deleting an employee

### **7.3 Test Attendance**
1. **Click**: "Attendance" tab
2. **Should see**: Sample attendance records
3. **Try**: Adding new attendance record

### **7.4 Test Reports**
1. **Click**: "Reports" tab
2. **Test each report**:
   - Employee Directory
   - Departments
   - Attendance Report
   - Salary Report
3. **Try**: CSV export functionality

---

## 🎯 **Expected Final Result**

### **✅ All Services Running**
- **Frontend**: http://localhost:3000 ✅
- **Backend API**: http://localhost:5000 ✅
- **Database**: MySQL on localhost:3306 ✅

### **✅ Full Functionality**
- **Authentication**: Real login with database ✅
- **Employee CRUD**: Add, edit, delete, view ✅
- **Attendance**: Track and manage attendance ✅
- **Reports**: Generate and export reports ✅
- **Responsive Design**: Works on mobile/desktop ✅

---

## 🔧 **Troubleshooting**

### **If MySQL commands don't work:**
1. **Add to PATH**: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
2. **Restart** PowerShell
3. **Use full path**: `"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p`

### **If backend can't connect to database:**
1. **Check MySQL service**: Services.msc → MySQL80 should be running
2. **Verify password**: Try connecting with `mysql -u root -p`
3. **Check connection string**: Ensure password matches in appsettings.json

### **If frontend shows API errors:**
1. **Verify backend is running**: http://localhost:5000 should respond
2. **Check browser console**: F12 → Console for error details
3. **Verify API URL**: Should be `http://localhost:5000/api`

---

## 🎉 **Success Indicators**

**You'll know everything is working when:**
- ✅ Login works without "mock mode" message
- ✅ Employee list shows real data from database
- ✅ You can add/edit/delete employees successfully
- ✅ Attendance records are saved to database
- ✅ Reports show real data with correct counts
- ✅ No API connection errors in browser console

**Congratulations! You'll have a fully functional Employee Management System!**