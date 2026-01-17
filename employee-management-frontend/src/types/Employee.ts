// Employee data types
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  isActive: boolean;
  createdDate: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  status: string;
  notes: string;
  employee?: Employee;
}