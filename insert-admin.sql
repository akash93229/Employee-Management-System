-- Insert admin user
USE EmployeeManagementDB;

-- Check if admin exists
SELECT * FROM Users WHERE Username = 'admin';

-- Insert admin if not exists
INSERT IGNORE INTO Users (Username, Password, Role, CreatedDate) 
VALUES ('admin', 'admin123', 'Admin', NOW());

-- Verify
SELECT * FROM Users;
