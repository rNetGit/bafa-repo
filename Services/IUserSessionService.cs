using BafaMobile.Models;

namespace BafaMobile.Services
{
    public interface IUserSessionService
    {
        Task<UserModel?> GetCurrentUserAsync();
        Task SetCurrentUserAsync(UserModel user);
        Task ClearUserSessionAsync();
    }

}
