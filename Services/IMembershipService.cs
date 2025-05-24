using BafaMobile.Models;

namespace BafaMobile.Services
{
    public interface IMembershipService
    {
        Task<bool> HasActiveMembership(string email);
        Task AddMembershipAsync(MembershipModel membership);
    }

}
