using System.ComponentModel.DataAnnotations;

namespace BafaMobile.Models
{
    public class MembershipModel
    {
        public int Id { get; set; }
        public string? UserId { get; set; } // FK to AspNetUsers(Id)
        [Required] public string? FirstName { get; set; }
        [Required] public string? LastName { get; set; }
        [Required] public string? Email { get; set; }
        [Required] public string? Phone { get; set; }
        [Required] public string? Address { get; set; }
        [Required] public string? City { get; set; }
        [Required] public string? State { get; set; }
        [Required] public string? ZipCode { get; set; }
        [Required] public string? Year { get; set; }
        [Required] public string MembershipType { get; set; } = "Individual";
        public DateTime JoinDate { get; set; } = DateTime.UtcNow;
        public DateTime ExpireDate { get; set; } = DateTime.UtcNow.AddYears(1);
        [Required] public bool AgreedToTerms { get; set; }
        public DateTime SubmittedOn { get; set; }
        public string? MembershipStatus { get; set; }
        public string? MembershipFee { get; set; }
        public string? PayMode { get; set; }
        public bool IsPaid { get; set; }
        public string? PaymentStatus { get; set; }

    }

}


//     [Required] public string FirstName { get; set; } = string.Empty;
//     [Required] public string LastName { get; set; } = string.Empty;
//     // [Required][EmailAddress] public string Email { get; set; } = string.Empty;
//     [Required] public string Phone { get; set; } = string.Empty;
//     [Required] public string Address { get; set; } = string.Empty;
//     [Required] public string City { get; set; } = string.Empty;
//     [Required] public string State { get; set; } = string.Empty;
//     [Required] public string ZipCode { get; set; } = string.Empty;
//     [Required] public string MembershipType { get; set; } = "Individual";
//     public bool AgreeToTerms { get; set; }