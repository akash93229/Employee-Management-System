using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagementAPI.Data;

namespace EmployeeManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public ReportsController(EmployeeDbContext context)
        {
            _context = context;
        }

        // Employee directory report
        [HttpGet("employee-directory")]
        public async Task<IActionResult> GetEmployeeDirectory()
        {
            var employees = await _context.Employees
                .Where(e => e.IsActive)
                .Select(e => new {
                    e.Id,
                    Name = e.FirstName + " " + e.LastName,
                    e.Email,
                    e.Phone,
                    e.Department,
                    e.Position,
                    e.HireDate
                })
                .ToListAsync();

            return Ok(employees);
        }

        // Department report
        [HttpGet("departments")]
        public async Task<IActionResult> GetDepartmentReport()
        {
            var departments = await _context.Employees
                .Where(e => e.IsActive)
                .GroupBy(e => e.Department)
                .Select(g => new {
                    Department = g.Key,
                    EmployeeCount = g.Count(),
                    AverageSalary = g.Average(e => e.Salary)
                })
                .ToListAsync();

            return Ok(departments);
        }

        // Attendance report
        [HttpGet("attendance")]
        public async Task<IActionResult> GetAttendanceReport()
        {
            var attendanceData = await _context.Attendances
                .Include(a => a.Employee)
                .Where(a => a.Employee!.IsActive)
                .GroupBy(a => new { a.EmployeeId, EmployeeName = a.Employee!.FirstName + " " + a.Employee.LastName })
                .Select(g => new {
                    g.Key.EmployeeId,
                    g.Key.EmployeeName,
                    TotalDays = g.Count(),
                    PresentDays = g.Count(a => a.Status == "Present"),
                    AbsentDays = g.Count(a => a.Status == "Absent"),
                    LateDays = g.Count(a => a.Status == "Late")
                })
                .ToListAsync();

            return Ok(attendanceData);
        }

        // Salary report
        [HttpGet("salary")]
        public async Task<IActionResult> GetSalaryReport()
        {
            var salaryData = await _context.Employees
                .Where(e => e.IsActive)
                .Select(e => new {
                    e.Id,
                    Name = e.FirstName + " " + e.LastName,
                    e.Department,
                    e.Position,
                    e.Salary
                })
                .OrderByDescending(e => e.Salary)
                .ToListAsync();

            return Ok(salaryData);
        }
    }
}