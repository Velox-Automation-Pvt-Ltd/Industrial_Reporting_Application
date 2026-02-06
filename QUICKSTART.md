# AerialView Modern - Quick Start Guide

## Prerequisites Installation

### 1. Install .NET 8.0 SDK
Download and install from: https://dotnet.microsoft.com/download/dotnet/8.0

### 2. Install Node.js 18+
Download and install from: https://nodejs.org/

### 3. Install SQL Server
Download SQL Server 2019+ or use SQL Server Express

## Backend Setup (5 minutes)

### Step 1: Configure Database Connection
1. Navigate to `Backend/src/AerialView.API/`
2. Open `appsettings.json`
3. Update the connection string:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=AerialViewDB;User Id=YOUR_USER;Password=YOUR_PASSWORD;TrustServerCertificate=True"
}
```

### Step 2: Run Database Migrations
```bash
cd Backend/src/AerialView.API
dotnet ef migrations add InitialCreate --project ../AerialView.Infrastructure
dotnet ef database update --project ../AerialView.Infrastructure
```

If Entity Framework tools are not installed:
```bash
dotnet tool install --global dotnet-ef
```

### Step 3: Run the Backend
```bash
cd Backend/src/AerialView.API
dotnet run
```

The API will start at: `https://localhost:5001`
Swagger UI will be available at: `https://localhost:5001`

## Frontend Setup (3 minutes)

### Step 1: Install Dependencies
```bash
cd Frontend
npm install
```

### Step 2: Configure API Endpoint (Already Done)
The `.env` file is already configured with:
```
VITE_API_URL=https://localhost:5001/api
```

### Step 3: Run the Frontend
```bash
npm run dev
```

The application will start at: `http://localhost:3000`

## Login to the Application

### Default Credentials
- **Username**: admin
- **Password**: admin@321

⚠️ **IMPORTANT**: Change the default password immediately after first login!

## Troubleshooting

### Backend Issues

**Migration Error: "A network-related or instance-specific error"**
- Solution: Check if SQL Server is running and connection string is correct

**Port 5001 Already in Use**
- Solution: Change port in `Properties/launchSettings.json`

**Missing Package Error**
- Solution: Run `dotnet restore` in the AerialView.API directory

### Frontend Issues

**Module Not Found Errors**
- Solution: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

**API Connection Failed**
- Solution: Ensure backend is running at `https://localhost:5001`

**CORS Error**
- Solution: Check CORS settings in `Program.cs` match your frontend URL

## Project Structure

```
AerialViewModern/
├── Backend/
│   └── src/
│       ├── AerialView.API/          # Web API Layer
│       ├── AerialView.Application/  # Business Logic
│       ├── AerialView.Domain/       # Domain Entities
│       └── AerialView.Infrastructure/ # Data Access
│
├── Frontend/
│   └── src/
│       ├── components/              # React Components
│       ├── pages/                   # Page Components
│       ├── services/                # API Services
│       └── types/                   # TypeScript Types
│
└── README.md
```

## Next Steps

1. ✅ Log in with default credentials
2. ✅ Change admin password
3. ✅ Create a database connection
4. ✅ Create your first report
5. ✅ Explore the dashboard

## Additional Resources

- **Full Documentation**: See `README.md` in the root directory
- **API Documentation**: Visit `https://localhost:5001` when backend is running
- **Support**: support@himak.com
- **Website**: www.himak.com

## Common Commands

### Backend
```bash
# Build the solution
dotnet build

# Run tests
dotnet test

# Create a new migration
dotnet ef migrations add MigrationName --project AerialView.Infrastructure --startup-project AerialView.API

# Update database
dotnet ef database update --project AerialView.Infrastructure --startup-project AerialView.API

# Publish for production
dotnet publish -c Release -o publish
```

### Frontend
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Development Tips

1. **Hot Reload**: Both backend and frontend support hot reload during development
2. **Debugging**: Use VS Code or Visual Studio for backend debugging
3. **Browser DevTools**: Use React DevTools extension for frontend debugging
4. **API Testing**: Use Swagger UI for testing API endpoints

## Production Deployment

### Backend (IIS/Azure)
```bash
cd Backend/src/AerialView.API
dotnet publish -c Release -o publish
```
Deploy the `publish` folder to your web server.

### Frontend
```bash
cd Frontend
npm run build
```
Deploy the `dist` folder to your web server (nginx, Apache, or static hosting).

---

**Congratulations!** 🎉 You now have AerialView Modern up and running!
