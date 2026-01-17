@echo off
echo Inserting admin user...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -pAkash@123 EmployeeManagementDB < insert-admin.sql
if %errorlevel% equ 0 (
    echo Admin user inserted successfully!
) else (
    echo Error inserting admin user.
)
pause
