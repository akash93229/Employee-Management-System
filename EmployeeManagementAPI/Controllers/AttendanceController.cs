using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public AttendanceController(EmployeeDbContext context)
        {
            _context = context;
        }

        // Get all attendance records
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attendance>>> GetAttendance()
        {
            return await _context.Attendances
                .Include(a => a.Employee)
                .OrderByDescending(a => a.Date)
                .ToListAsync();
        }

        // Get attendance by employee ID
        [HttpGet("employee/{employeeId}")]
        public async Task<ActionResult<IEnumerable<Attendance>>> GetEmployeeAttendance(int employeeId)
        {
            return await _context.Attendances
                .Where(a => a.EmployeeId == employeeId)
                .Include(a => a.Employee)
                .OrderByDescending(a => a.Date)
                .ToListAsync();
        }

        // Add attendance record
        [HttpPost]
        public async Task<ActionResult<Attendance>> CreateAttendance(AttendanceRequest request)
        {
            var attendance = new Attendance
            {
                EmployeeId = request.EmployeeId,
                Date = request.Date,
                CheckInTime = TimeSpan.Parse(request.CheckInTime),
                CheckOutTime = !string.IsNullOrEmpty(request.CheckOutTime) ? TimeSpan.Parse(request.CheckOutTime) : null,
                Status = request.Status,
                Notes = request.Notes
            };

            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAttendance), new { id = attendance.Id }, attendance);
        }

        // Update attendance record
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAttendance(int id, Attendance attendance)
        {
            if (id != attendance.Id)
            {
                return BadRequest();
            }

            _context.Entry(attendance).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class AttendanceRequest
    {
        public int EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public string CheckInTime { get; set; } = string.Empty;
        public string? CheckOutTime { get; set; }
        public string Status { get; set; } = "Present";
        public string Notes { get; set; } = string.Empty;
    }
}