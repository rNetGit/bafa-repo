using BafaMobile.Models;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;


namespace BafaMobile.Services
{

    public class UserSessionService : IUserSessionService
    {
        public bool IsAuthenticated { get; set; }
        public string Username { get; set; }
        private readonly ProtectedSessionStorage _sessionStorage;
        private const string SessionKey = "CurrentUser";

        public UserSessionService(ProtectedSessionStorage sessionStorage)
        {
            _sessionStorage = sessionStorage;
        }

        public async Task<UserModel?> GetCurrentUserAsync()
        {
            var result = await _sessionStorage.GetAsync<UserModel>(SessionKey);
            return result.Success ? result.Value : null;
        }

        public async Task SetCurrentUserAsync(UserModel user)
        {
            await _sessionStorage.SetAsync(SessionKey, user);
        }

        public async Task ClearUserSessionAsync()
        {
            await _sessionStorage.DeleteAsync(SessionKey);
        }
        //public async Task ClearCurrentUserAsync()
        //{
        //    await _sessionStorage.RemoveAsync(SessionKey);
        //}

    }

}
