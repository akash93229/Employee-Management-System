import React, { useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import AttendanceManagement from './components/AttendanceManagement';
import Reports from './components/Reports';

function App() {
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('employees');

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('employees');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  // Show login page if user is not logged in
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Show main application after login
  return (
    <div className="App">
      <Navbar 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        user={user}
        onLogout={handleLogout}
      />
      
      <main>
        {currentPage === 'employees' && <EmployeeList />}
        {currentPage === 'attendance' && <AttendanceManagement />}
        {currentPage === 'reports' && <Reports />}
      </main>
    </div>
  );
}

export default App;