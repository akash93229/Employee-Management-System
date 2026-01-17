import React, { useState, useEffect } from 'react';
import { reportsAPI } from '../services/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const Reports: React.FC = (): JSX.Element => {
  const [activeReport, setActiveReport] = useState('employee-directory');
  const [reportData, setReportData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReport(activeReport);
  }, [activeReport]);

  const loadReport = async (reportType: string) => {
    setLoading(true);
    setError('');
    
    try {
      let data;
      switch (reportType) {
        case 'employee-directory':
          data = await reportsAPI.getEmployeeDirectory();
          break;
        case 'departments':
          data = await reportsAPI.getDepartments();
          break;
        case 'attendance':
          data = await reportsAPI.getAttendance();
          break;
        case 'salary':
          data = await reportsAPI.getSalary();
          break;
        default:
          data = [];
      }
      setReportData(data);
    } catch (err) {
      setError('Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    if (reportData.length === 0) return;

    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Employee Management System', 14, 20);
    
    doc.setFontSize(14);
    const reportTitle = getReportTitle();
    doc.text(reportTitle, 14, 30);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 38);
    
    // Prepare table data based on report type
    let headers: string[] = [];
    let rows: any[][] = [];
    
    switch (activeReport) {
      case 'employee-directory':
        headers = ['ID', 'Name', 'Email', 'Phone', 'Department', 'Position', 'Hire Date'];
        rows = reportData.map(emp => [
          emp.id,
          emp.name,
          emp.email,
          emp.phone,
          emp.department,
          emp.position,
          new Date(emp.hireDate).toLocaleDateString()
        ]);
        break;
      case 'departments':
        headers = ['Department', 'Employee Count', 'Average Salary'];
        rows = reportData.map(dept => [
          dept.department,
          dept.employeeCount,
          `₹${dept.averageSalary?.toLocaleString()}`
        ]);
        break;
      case 'attendance':
        headers = ['Employee ID', 'Employee Name', 'Total Days', 'Present', 'Absent', 'Late'];
        rows = reportData.map(att => [
          att.employeeId,
          att.employeeName,
          att.totalDays,
          att.presentDays,
          att.absentDays,
          att.lateDays
        ]);
        break;
      case 'salary':
        headers = ['ID', 'Name', 'Department', 'Position', 'Salary'];
        rows = reportData.map(emp => [
          emp.id,
          emp.name,
          emp.department,
          emp.position,
          `₹${emp.salary?.toLocaleString()}`
        ]);
        break;
    }
    
    // Add table
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 45,
      theme: 'grid',
      headStyles: {
        fillColor: [102, 126, 234],
        textColor: 255,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250]
      }
    });
    
    // Save PDF
    doc.save(`${activeReport}-report.pdf`);
  };

  const exportToExcel = () => {
    if (reportData.length === 0) return;

    // Prepare data based on report type
    let excelData: any[] = [];
    
    switch (activeReport) {
      case 'employee-directory':
        excelData = reportData.map(emp => ({
          'ID': emp.id,
          'Name': emp.name,
          'Email': emp.email,
          'Phone': emp.phone,
          'Department': emp.department,
          'Position': emp.position,
          'Hire Date': new Date(emp.hireDate).toLocaleDateString()
        }));
        break;
      case 'departments':
        excelData = reportData.map(dept => ({
          'Department': dept.department,
          'Employee Count': dept.employeeCount,
          'Average Salary': `₹${dept.averageSalary?.toLocaleString()}`
        }));
        break;
      case 'attendance':
        excelData = reportData.map(att => ({
          'Employee ID': att.employeeId,
          'Employee Name': att.employeeName,
          'Total Days': att.totalDays,
          'Present Days': att.presentDays,
          'Absent Days': att.absentDays,
          'Late Days': att.lateDays
        }));
        break;
      case 'salary':
        excelData = reportData.map(emp => ({
          'ID': emp.id,
          'Name': emp.name,
          'Department': emp.department,
          'Position': emp.position,
          'Salary': `₹${emp.salary?.toLocaleString()}`
        }));
        break;
    }
    
    // Create workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, getReportTitle());
    
    // Save Excel file
    XLSX.writeFile(wb, `${activeReport}-report.xlsx`);
  };

  const exportToCSV = () => {
    if (reportData.length === 0) return;

    const headers = Object.keys(reportData[0]);
    const csvContent = [
      headers.join(','),
      ...reportData.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle values that might contain commas
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeReport}-report.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getReportTitle = () => {
    switch (activeReport) {
      case 'employee-directory': return 'Employee Directory Report';
      case 'departments': return 'Department Report';
      case 'attendance': return 'Attendance Report';
      case 'salary': return 'Salary Report';
      default: return 'Report';
    }
  };

  const renderEmployeeDirectory = () => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Position</th>
          <th>Hire Date</th>
        </tr>
      </thead>
      <tbody>
        {reportData.map((employee: any) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.department}</td>
            <td>{employee.position}</td>
            <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderDepartmentReport = () => (
    <table>
      <thead>
        <tr>
          <th>Department</th>
          <th>Employee Count</th>
          <th>Average Salary</th>
        </tr>
      </thead>
      <tbody>
        {reportData.map((dept: any, index) => (
          <tr key={index}>
            <td>{dept.department}</td>
            <td>{dept.employeeCount}</td>
            <td>₹{dept.averageSalary?.toLocaleString()} Annually</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderAttendanceReport = () => (
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Total Days</th>
          <th>Present Days</th>
          <th>Absent Days</th>
          <th>Late Days</th>
        </tr>
      </thead>
      <tbody>
        {reportData.map((attendance: any) => (
          <tr key={attendance.employeeId}>
            <td>{attendance.employeeId}</td>
            <td>{attendance.employeeName}</td>
            <td>{attendance.totalDays}</td>
            <td>{attendance.presentDays}</td>
            <td>{attendance.absentDays}</td>
            <td>{attendance.lateDays}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderSalaryReport = () => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Position</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {reportData.map((employee: any) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.department}</td>
            <td>{employee.position}</td>
            <td>₹{employee.salary?.toLocaleString()} Annually</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderReportContent = () => {
    switch (activeReport) {
      case 'employee-directory':
        return renderEmployeeDirectory();
      case 'departments':
        return renderDepartmentReport();
      case 'attendance':
        return renderAttendanceReport();
      case 'salary':
        return renderSalaryReport();
      default:
        return <div>Select a report to view</div>;
    }
  };

  return (
    <div className="container">
      <h2>Reports</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activeReport === 'employee-directory' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveReport('employee-directory')}
        >
          Employee Directory
        </button>
        <button
          className={`btn ${activeReport === 'departments' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveReport('departments')}
        >
          Departments
        </button>
        <button
          className={`btn ${activeReport === 'attendance' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveReport('attendance')}
        >
          Attendance
        </button>
        <button
          className={`btn ${activeReport === 'salary' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveReport('salary')}
        >
          Salary
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>
          {getReportTitle()}
        </h3>
        
        {reportData.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-danger" onClick={exportToPDF} title="Export to PDF">
              📄 PDF
            </button>
            <button className="btn btn-success" onClick={exportToExcel} title="Export to Excel">
              📊 Excel
            </button>
            <button className="btn btn-secondary" onClick={exportToCSV} title="Export to CSV">
              📋 CSV
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div>Loading report data...</div>
      ) : (
        <div className="table-container">
          {reportData.length > 0 ? (
            renderReportContent()
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              No data available for this report
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;