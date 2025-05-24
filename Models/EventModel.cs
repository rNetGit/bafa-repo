using System;

namespace BafaMobile.Models
{
    public class EventModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime EventDate { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public string StatusColor => Status switch
        {
            "Upcoming" => "info",
            "Ongoing" => "success",
            "Completed" => "secondary",
            "Cancelled" => "danger",
            _ => "warning"
        };
    }
} 