@echo off
echo Resetting database...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -pAkash@123 EmployeeManagementDB < fresh-start.sql
if %errorlevel% equ 0 (
    echo Database reset successfully!
) else (
    echo Error resetting database. Please run fresh-start.sql manually in MySQL Workbench.
)
pause
