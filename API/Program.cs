using API.AppLogic;
using API.AppLogic.Services;
using API.Models;
using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200",
                              "http://localhost:8080",
                               "http://localhost:8081",
                               "http://localhost:8082",
                               "http://localhost:8083");
                          policy.AllowAnyHeader();
                          policy.AllowAnyMethod();
                      });
});


//builder.Services.AddCors(c => c.AddPolicy(name: "dev",
// policy =>
// {
//     policy.WithOrigins("http://localhost:4200");
//     policy.AllowAnyHeader();
//     policy.AllowAnyMethod();
// })
//);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



// Configure the HTTP request pipeline.

ConfigurationManager configuration = builder.Configuration;
builder.Services.AddDbContext<PlannerDbContext>(options =>
{
    string connectionstring = configuration["DefaultConnection"];
    options.UseSqlServer(connectionstring, sqloptions =>
    {
        sqloptions.EnableRetryOnFailure(
            maxRetryCount: 15,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null);
    });
//#if debug
//    options.useloggerfactory(loggerfactory.create(loggingbuilder => loggingbuilder.adddebug()));
//    options.enablesensitivedatalogging();
//#endif
});

builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IPractitionerRepository, PractitionerRepository>();
builder.Services.AddScoped<IAgendaRepository, AgendaRepository>();

builder.Services.AddScoped<ClientService>();
builder.Services.AddScoped<PractitionerService>();
builder.Services.AddScoped<AgendaService>();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();



app.Run();
