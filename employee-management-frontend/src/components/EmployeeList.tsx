import React, { useState, useEffect } from 'react';
import { Employee } from '../types/Employee';
import { employeeAPI } from '../services/api';
import EmployeeForm from './EmployeeForm';

const EmployeeList: React.FC = (): JSX.Element => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Load employees when component mounts
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeAPI.getAll();
      setEmployees(data);
    } catch (err) {
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setError(''); // Clear any errors
    setShowForm(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setError(''); // Clear any errors
    setShowForm(true);
  };

  const handleDeleteEmployee = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(id);
        loadEmployees(); // Reload the list
      } catch (err) {
        setError('Failed to delete employee');
      }
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('⚠️ WARNING: This will delete ALL employees and their attendance records. Are you sure?')) {
      if (window.confirm('This action cannot be undone. Click OK to confirm.')) {
        try {
          setLoading(true);
          await employeeAPI.clearAll();
          await loadEmployees(); // Reload the list
          alert('All employees cleared successfully!');
        } catch (err) {
          setError('Failed to clear all employees');
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleFormSubmit = async (employeeData: any) => {
    try {
      setError(''); // Clear any previous errors
      
      if (editingEmployee) {
        // Update existing employee
        console.log('Updating employee:', editingEmployee.id, employeeData);
        const response = await employeeAPI.update(editingEmployee.id, { ...employeeData, id: editingEmployee.id });
        console.log('Update response:', response);
      } else {
        // Create new employee
        console.log('Creating employee:', employeeData);
        const response = await employeeAPI.create(employeeData);
        console.log('Create response:', response);
      }
      
      setShowForm(false);
      setEditingEmployee(null);
      await loadEmployees(); // Reload the list
    } catch (err: any) {
      console.error('Error saving employee:', err);
      let errorMessage = 'Failed to save employee. Please try again.';
      
      if (err.message) {
        if (err.message.includes('fetch')) {
          errorMessage = 'Cannot connect to server. Please check if the backend is running.';
        } else if (err.message.includes('JSON')) {
          errorMessage = 'Server response error. Please try again.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
    setError(''); // Clear any errors
  };

  if (loading) {
    return <div className="container">Loading employees...</div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Employee Management</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={handleAddEmployee}>
            Add New Employee
          </button>
          {employees.length > 0 && (
            <button className="btn btn-danger" onClick={handleClearAll}>
              Clear All Employees
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Hire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>₹{employee.salary.toLocaleString()} Annually</td>
                <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => handleEditEmployee(employee)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            No employees found. Click "Add New Employee" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;