namespace EmployeeManagementAPI.Models
{
    public class Attendance
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan CheckInTime { get; set; }
        public TimeSpan? CheckOutTime { get; set; }
        public string Status { get; set; } = "Present"; // Present, Absent, Late
        public string Notes { get; set; } = string.Empty;
        
        // Navigation property
        public Employee? Employee { get; set; }
    }
}