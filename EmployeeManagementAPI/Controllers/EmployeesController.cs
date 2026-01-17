using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public EmployeesController(EmployeeDbContext context)
        {
            _context = context;
        }

        // Get all employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.Where(e => e.IsActive).ToListAsync();
        }

        // Get single employee by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null || !employee.IsActive)
            {
                return NotFound();
            }

            return employee;
        }

        // Add new employee
        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            try
            {
                // Set default values
                employee.IsActive = true;
                employee.CreatedDate = DateTime.Now;

                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, new { 
                    message = "Employee created successfully", 
                    employee = employee 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating employee", error = ex.Message });
            }
        }

        // Update employee
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest(new { message = "Employee ID mismatch" });
            }

            var existingEmployee = await _context.Employees.FindAsync(id);
            if (existingEmployee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }

            // Update properties
            existingEmployee.FirstName = employee.FirstName;
            existingEmployee.LastName = employee.LastName;
            existingEmployee.Email = employee.Email;
            existingEmployee.Phone = employee.Phone;
            existingEmployee.Department = employee.Department;
            existingEmployee.Position = employee.Position;
            existingEmployee.Salary = employee.Salary;
            existingEmployee.HireDate = employee.HireDate;
            existingEmployee.IsActive = employee.IsActive;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Employee updated successfully", employee = existingEmployee });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound(new { message = "Employee not found" });
                }
                return StatusCode(500, new { message = "Error updating employee" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating employee", error = ex.Message });
            }
        }

        // Delete employee (soft delete)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            // Soft delete - just mark as inactive
            employee.IsActive = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Clear all employees and their attendance records
        [HttpDelete("clear-all")]
        public async Task<IActionResult> ClearAllEmployees()
        {
            try
            {
                // Delete all attendance records first (foreign key constraint)
                var attendances = await _context.Attendances.ToListAsync();
                _context.Attendances.RemoveRange(attendances);
                
                // Delete all employees
                var employees = await _context.Employees.ToListAsync();
                _context.Employees.RemoveRange(employees);
                
                await _context.SaveChangesAsync();
                
                return Ok(new { message = "All employees and attendance records cleared successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error clearing employees", error = ex.Message });
            }
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}