-- Employee Management System Database Setup
-- Run this script in MySQL Command Line or MySQL Workbench

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

-- Verify setup
SELECT 'Database setup completed successfully!' as Status;
SELECT COUNT(*) as UserCount FROM Users;
SELECT COUNT(*) as EmployeeCount FROM Employees;
SELECT COUNT(*) as AttendanceCount FROM Attendances;