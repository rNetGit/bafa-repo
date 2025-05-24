using BafaMobile.Data;
using BafaMobile.Models;
using Microsoft.EntityFrameworkCore;

namespace BafaMobile.Services
{
    public class EventService
    {
        private readonly BafaDbContext _db;

        public EventService(BafaDbContext db)
        {
            _db = db;
        }

        public async Task<List<EventRecord>> GetUpcomingEventsAsync(int limit = 0)
        {
            var query = _db.Events
                .Where(e => e.EventDate >= DateTime.Today)
                .OrderBy(e => e.EventDate);

            return limit > 0 ? await query.Take(limit).ToListAsync() : await query.ToListAsync();
        }
    }
}
