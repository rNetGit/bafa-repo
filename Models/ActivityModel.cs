using System;

namespace BafaMobile.Models
{
    public class ActivityModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string UserName { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public string StatusColor => Status switch
        {
            "Completed" => "success",
            "In Progress" => "warning",
            "Pending" => "info",
            "Failed" => "danger",
            _ => "secondary"
        };
    }
} 