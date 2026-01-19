# Employee Management System

A full-stack web application for managing employee records, tracking attendance, and generating reports. Built with React, TypeScript, ASP.NET Core, and MySQL.

![Login Screen](screenshots/Screenshot%20(453).png)

## Features

- **Employee Management**: Add, edit, delete, and view employee records
- **Attendance Tracking**: Record daily attendance with check-in/check-out times
- **Reports**: Generate employee directory, department stats, attendance summaries, and salary reports
- **Export**: Download reports as CSV, Excel, or PDF
- **Authentication**: Simple login system with admin access

## Tech Stack

**Backend:**
- ASP.NET Core 8.0 Web API
- Entity Framework Core
- MySQL Database

**Frontend:**
- React 18 with TypeScript
- CSS3 for styling
- Axios for API calls

## Screenshots

### Employee Management
![Employee Dashboard](screenshots/Screenshot%20(454).png)

### Reports & Analytics
![Reports](screenshots/Screenshot%20(455).png)

## Getting Started

### Prerequisites

- [.NET SDK 8.0+](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [MySQL 8.0+](https://dev.mysql.com/downloads/)

### Database Setup

1. Open MySQL and run the setup script:
```bash
mysql -u root -p < setup-database.sql
```

Or use the batch file (Windows):
```bash
reset-database.bat
```

This creates the database, tables, and adds sample data including an admin user.

### Backend Setup

1. Navigate to the API folder:
```bash
cd EmployeeManagementAPI
```

2. Update `appsettings.json` with your MySQL credentials:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=EmployeeManagementDB;User=root;Password=yourpassword;"
}
```

3. Run the API:
```bash
dotnet run
```

Or use the batch file:
```bash
start-backend.bat
```

API runs at: `https://localhost:7000`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd employee-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Or use the batch file:
```bash
start-frontend.bat
```

App opens at: `http://localhost:3000`

## Usage

**Login Credentials:**
- Username: `admin`
- Password: `admin123`

Once logged in, you can:
- View and manage employees from the Employees page
- Record attendance from the Attendance page
- Generate and export reports from the Reports page

## Project Structure

```
├── EmployeeManagementAPI/          # Backend API
│   ├── Controllers/                # API endpoints
│   ├── Models/                     # Data models
│   ├── Data/                       # Database context
│   └── Program.cs                  # App configuration
│
├── employee-management-frontend/   # Frontend app
│   └── src/
│       ├── components/             # React components
│       ├── services/               # API service
│       └── types/                  # TypeScript types
│
├── setup-database.sql              # Database setup script
├── insert-admin.sql                # Admin user creation
├── start-backend.bat               # Quick start for API
└── start-frontend.bat              # Quick start for frontend
```

## Database Schema

**Users** - Login credentials
- Id, Username, Password, Role, CreatedDate

**Employees** - Employee information
- Id, FirstName, LastName, Email, Phone, Department, Position, Salary, HireDate, IsActive, CreatedDate

**Attendances** - Daily attendance records
- Id, EmployeeId, Date, CheckInTime, CheckOutTime, Status, Notes

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Attendance
- `GET /api/attendance` - Get all attendance records
- `POST /api/attendance` - Record attendance
- `PUT /api/attendance/{id}` - Update attendance
- `DELETE /api/attendance/{id}` - Delete attendance

### Reports
- `GET /api/reports/employees` - Employee directory
- `GET /api/reports/departments` - Department statistics
- `GET /api/reports/attendance` - Attendance summary
- `GET /api/reports/salary` - Salary report

## Notes

This project was built as a learning exercise to practice full-stack development. It uses a simple architecture without complex patterns to keep things straightforward and easy to understand.

**Security Note:** In a production environment, passwords should be hashed and stored securely. This implementation uses plain text passwords for simplicity.

## License

MIT License - feel free to use this project for learning purposes.

---

Built by Akash | [GitHub](https://github.com/akash93229)
