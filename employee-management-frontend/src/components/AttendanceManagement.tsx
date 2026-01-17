import React, { useState, useEffect } from 'react';
import { Attendance, Employee } from '../types/Employee';
import { attendanceAPI, employeeAPI } from '../services/api';

const AttendanceManagement: React.FC = (): JSX.Element => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    checkInTime: '09:00',
    checkOutTime: '17:00',
    status: 'Present',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [attendanceData, employeeData] = await Promise.all([
        attendanceAPI.getAll(),
        employeeAPI.getAll()
      ]);
      setAttendances(attendanceData);
      setEmployees(employeeData);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.employeeId) {
      setError('Please select an employee');
      return;
    }

    try {
      const attendanceData = {
        employeeId: parseInt(formData.employeeId),
        date: formData.date,
        checkInTime: formData.checkInTime,
        checkOutTime: formData.checkOutTime || null,
        status: formData.status,
        notes: formData.notes
      };

      await attendanceAPI.create(attendanceData);
      setShowForm(false);
      setFormData({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        checkInTime: '09:00',
        checkOutTime: '17:00',
        status: 'Present',
        notes: ''
      });
      loadData();
    } catch (err) {
      setError('Failed to add attendance record');
    }
  };

  if (loading) {
    return <div className="container">Loading attendance data...</div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Attendance Management</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Attendance'}
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <h3>Add Attendance Record</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="employeeId">Employee:</label>
                <select
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkInTime">Check In Time:</label>
                <input
                  type="time"
                  id="checkInTime"
                  name="checkInTime"
                  value={formData.checkInTime}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkOutTime">Check Out Time:</label>
                <input
                  type="time"
                  id="checkOutTime"
                  name="checkOutTime"
                  value={formData.checkOutTime}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes:</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Optional notes"
              />
            </div>

            <button type="submit" className="btn btn-success">
              Add Attendance
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance) => (
              <tr key={attendance.id}>
                <td>
                  {attendance.employee 
                    ? `${attendance.employee.firstName} ${attendance.employee.lastName}`
                    : 'Unknown Employee'
                  }
                </td>
                <td>{new Date(attendance.date).toLocaleDateString()}</td>
                <td>{attendance.checkInTime}</td>
                <td>{attendance.checkOutTime || 'Not checked out'}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    backgroundColor: 
                      attendance.status === 'Present' ? '#d4edda' :
                      attendance.status === 'Late' ? '#fff3cd' : '#f8d7da',
                    color:
                      attendance.status === 'Present' ? '#155724' :
                      attendance.status === 'Late' ? '#856404' : '#721c24'
                  }}>
                    {attendance.status}
                  </span>
                </td>
                <td>{attendance.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {attendances.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            No attendance records found. Click "Add Attendance" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;