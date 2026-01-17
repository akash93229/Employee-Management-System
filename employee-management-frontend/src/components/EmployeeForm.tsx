import React, { useState, useEffect } from 'react';
import { Employee } from '../types/Employee';

interface EmployeeFormProps {
  employee: Employee | null;
  onSubmit: (employeeData: any) => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSubmit, onCancel }): JSX.Element => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    hireDate: '',
  });

  const [errors, setErrors] = useState<any>({});

  // Fill form with employee data if editing, otherwise keep blank
  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        salary: employee.salary.toString(),
        hireDate: employee.hireDate.split('T')[0], // Format date for input
      });
    } else {
      // Reset form for new employee
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        salary: '',
        hireDate: '',
      });
    }
    // Clear any previous errors
    setErrors({});
  }, [employee]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary is required';
    if (!formData.hireDate.trim()) newErrors.hireDate = 'Hire date is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Salary validation
    if (formData.salary && isNaN(Number(formData.salary))) {
      newErrors.salary = 'Salary must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const employeeData = {
        ...formData,
        salary: parseFloat(formData.salary),
        hireDate: formData.hireDate,
        isActive: true,
      };
      
      try {
        await onSubmit(employeeData);
      } catch (error) {
        console.error('Error submitting form:', error);
        // The error will be handled by the parent component
      }
    }
  };

  return (
    <div className="form-container">
      <h3>{employee ? 'Edit Employee' : 'Add New Employee'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
            />
            {errors.firstName && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
            />
            {errors.lastName && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
          />
          {errors.email && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />
          {errors.phone && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.phone}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
            </select>
            {errors.department && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.department}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Enter position"
            />
            {errors.position && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.position}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Enter salary"
            />
            {errors.salary && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.salary}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="hireDate">Hire Date:</label>
            <input
              type="date"
              id="hireDate"
              name="hireDate"
              value={formData.hireDate}
              onChange={handleInputChange}
            />
            {errors.hireDate && <span style={{ color: 'red', fontSize: '0.9rem' }}>{errors.hireDate}</span>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-success">
            {employee ? 'Update Employee' : 'Add Employee'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;