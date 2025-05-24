using BafaMobile.Models;
using Microsoft.Data.Sqlite;
using System.Data;
using Dapper;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BafaMobile.Services
{
    public class MembershipService : IMembershipService
    {
        private readonly IDbConnection _connection;

        public MembershipService(IConfiguration config)
        {
            _connection = new SqliteConnection(config.GetConnectionString("Default"));
        }

        public async Task<bool> HasActiveMembership(string email)
        {
            // Ensure Dapper's QuerySingleOrDefaultAsync is available by adding the Dapper namespace
            var result = await _connection.QuerySingleOrDefaultAsync<MembershipModel>(
                "SELECT * FROM Memberships WHERE Email = @Email AND ExpireDate >= date('now')",
                new { Email = email });
            return result != null;
        }

        public async Task AddMembershipAsync(MembershipModel membership)
        {
            string sql = @"INSERT INTO Memberships
            (FirstName, LastName, Email, Phone, Address, City, State, ZipCode, MembershipType, JoinDate, ExpireDate)
            VALUES (@FirstName, @LastName, @Email, @Phone, @Address, @City, @State, @ZipCode, @MembershipType, @JoinDate, @ExpireDate)";
            await _connection.ExecuteAsync(sql, membership);
        }
    }

}
