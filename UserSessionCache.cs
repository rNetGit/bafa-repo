using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace BafaMobile.Services
{
    public class UserSessionCache
    {
        private readonly IDistributedCache _cache;

        public UserSessionCache(IDistributedCache cache)
        {
            _cache = cache;
        }

        public async Task SaveSessionAsync(string sessionId, UserSession session)
        {
            var json = JsonSerializer.Serialize(session);
            await _cache.SetStringAsync(sessionId, json);
        }

        public async Task<UserSession> GetSessionAsync(string sessionId)
        {
            var json = await _cache.GetStringAsync(sessionId);
            return json == null ? null : JsonSerializer.Deserialize<UserSession>(json);
        }
    }

}