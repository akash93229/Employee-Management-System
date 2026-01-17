import React from 'react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  user: any;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange, user, onLogout }): JSX.Element => {
  return (
    <nav className="navbar">
      <h1>Employee Management System</h1>
      
      <ul className="nav-links">
        <li>
          <button 
            className="nav-link-button"
            onClick={() => onPageChange('employees')}
            style={{ 
              backgroundColor: currentPage === 'employees' ? '#34495e' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Employees
          </button>
        </li>
        <li>
          <button 
            className="nav-link-button"
            onClick={() => onPageChange('attendance')}
            style={{ 
              backgroundColor: currentPage === 'attendance' ? '#34495e' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Attendance
          </button>
        </li>
        <li>
          <button 
            className="nav-link-button"
            onClick={() => onPageChange('reports')}
            style={{ 
              backgroundColor: currentPage === 'reports' ? '#34495e' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Reports
          </button>
        </li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Welcome, {user.username}</span>
        <button className="btn btn-secondary" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;