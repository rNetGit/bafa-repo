using BafaMobile.Components;
using BafaMobile.Data;
using BafaMobile.Models;
using BafaMobile.Services;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

//// ➤ Register DbContext with SQLite
//builder.Services.AddDbContext<BafaDbContext>(options =>
//    options.UseSqlite("Data Source=bafa.db"));
//builder.Services.AddDbContext<BafaDbContext>(options =>
//    options.UseSqlite($"Data Source={Path.Combine(AppContext.BaseDirectory, "App_Data", "bafa.db")}"));

//var dbFilePath = Path.Combine(AppContext.BaseDirectory, "App_Data", "bafa.db");
//Console.WriteLine(dbFilePath);
//builder.Services.AddDbContext<BafaDbContext>(options =>
//    options.UseSqlite($"Data Source={dbFilePath}"));


// Get the root directory
var contentRoot = builder.Environment.ContentRootPath;

var dbPath = Path.Combine(contentRoot, "App_Data", "bafa.db");

builder.Services.AddDbContext<BafaDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));


builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<BafaDbContext>()
    .AddDefaultTokenProviders();

//// ➤ Configure Identity with default UI and store
//builder.Services.AddDefaultIdentity<AppUser>(options =>
//{
//    options.SignIn.RequireConfirmedAccount = false;
//})
//.AddEntityFrameworkStores<BafaDbContext>();

// ➤ Register Razor Pages for Identity UI and Blazor Server rendering
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

// ➤ Register Razor Components (for .NET 8)
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddScoped<UserSessionService>();

builder.Services.AddDistributedMemoryCache(); // Required for session state
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(20);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddScoped<IUserSessionService, UserSessionService>();
builder.Services.AddScoped<IMembershipService, MembershipService>();
builder.Services.AddScoped<ProtectedSessionStorage>();
builder.Services.AddScoped<EventService>();


builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>(); // Allows injecting HttpContext in services 

builder.Services.AddHttpContextAccessor(); // Allows injecting HttpContext

var app = builder.Build();

// ➤ Middleware order matters
app.UseStaticFiles();
app.UseRouting();


app.UseSession();
app.UseAuthentication();
app.UseAuthorization();
app.UseAntiforgery();
app.UseHttpsRedirection();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

// ➤ Map Identity UI & Blazor Components
app.MapRazorPages();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

// ➤ Optional: Seed default admin user
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var db = services.GetRequiredService<BafaDbContext>();
    db.Database.EnsureCreated();

    if (await userManager.FindByEmailAsync("admin@bafa.org") == null)
    {
        var user = new AppUser
        {
            UserName = "admin@bafa.org",
            Email = "admin@bafa.org",
            FullName = "Admin User"
        };
        await userManager.CreateAsync(user, "Admin123!");
    }
}

app.Run();
