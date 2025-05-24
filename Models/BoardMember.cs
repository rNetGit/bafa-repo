using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BafaMobile.Models;

public class BoardMember
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Role { get; set; } = string.Empty;

    [Required]
    public string Year { get; set; } = string.Empty;

    public bool IsAdvisor { get; set; }

    public int? Order { get; set; }

    [Column(TypeName = "text")]
    public string? Description { get; set; }

    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedOn { get; set; }
} 