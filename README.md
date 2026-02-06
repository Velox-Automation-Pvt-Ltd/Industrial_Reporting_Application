# AerialView Modern - Industrial Reporting Solution

## Overview
AerialView Modern is a complete rewrite of the AerialView industrial reporting system using modern technologies:
- **Backend**: ASP.NET Core 8.0 Web API with Clean Architecture
- **Frontend**: React 18 with TypeScript and Tailwind CSS
- **Database**: SQL Server with Entity Framework Core 8.0
- **Authentication**: JWT Bearer Token
- **Real-time**: SignalR for live charts and updates

## Features
✅ Complete user authentication and authorization system
✅ Database connection management with multiple database support
✅ Report creation and configuration
✅ Tabular, graphical, and live chart reports
✅ Color conditions and text list transformations
✅ Auto-export with scheduling (hourly, daily, weekly, monthly)
✅ Email settings and automated report distribution
✅ Excel/CSV import functionality
✅ Tag management and SQL table creation
✅ Menu settings with hierarchical structure
✅ Batch preview with custom Excel templates
✅ Project settings and licensing management

## Architecture

### Backend Structure
```
Backend/
├── src/
│   ├── AerialView.API/              # Web API Layer
│   │   ├── Controllers/             # REST API Controllers
│   │   ├── Middleware/             # Custom middleware
│   │   └── Configuration/          # App configuration
│   │
│   ├── AerialView.Application/     # Business Logic Layer
│   │   ├── DTOs/                   # Data Transfer Objects
│   │   ├── Commands/              # CQRS Commands
│   │   ├── Queries/               # CQRS Queries
│   │   ├── Mappings/              # AutoMapper profiles
│   │   └── Validators/            # FluentValidation
│   │
│   ├── AerialView.Domain/          # Domain Layer
│   │   ├── Entities/              # Domain entities
│   │   ├── Common/                # Base classes
│   │   └── Enums/                 # Enumerations
│   │
│   └── AerialView.Infrastructure/  # Data Access Layer
│       ├── Persistence/           # DbContext & migrations
│       ├── Repositories/          # Repository pattern
│       └── Services/              # External services
```

### Frontend Structure
```
Frontend/
├── src/
│   ├── components/                # React components
│   │   ├── common/               # Reusable components
│   │   ├── reports/              # Report components
│   │   ├── charts/               # Chart components
│   │   └── forms/                # Form components
│   │
│   ├── pages/                    # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Reports/
│   │   ├── Settings/
│   │   └── Users/
│   │
│   ├── services/                 # API services
│   │   ├── api.ts               # Axios configuration
│   │   ├── authService.ts
│   │   └── reportService.ts
│   │
│   ├── store/                    # State management (Redux/Zustand)
│   ├── hooks/                    # Custom React hooks
│   ├── utils/                    # Utility functions
│   └── types/                    # TypeScript types
```

## Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+ and npm
- SQL Server 2019+
- Visual Studio 2022 or VS Code

### Backend Setup

1. **Update Database Connection**
   Edit `appsettings.json` in AerialView.API:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER;Database=AerialViewDB;User Id=YOUR_USER;Password=YOUR_PASSWORD;TrustServerCertificate=True"
     }
   }
   ```

2. **Run Database Migrations**
   ```bash
   cd Backend/src/AerialView.API
   dotnet ef database update --project ../AerialView.Infrastructure
   ```

3. **Run the API**
   ```bash
   dotnet run
   ```
   API will be available at `https://localhost:5001`
   Swagger UI at `https://localhost:5001`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

2. **Configure API Endpoint**
   Edit `.env`:
   ```
   VITE_API_URL=https://localhost:5001/api
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   App will be available at `http://localhost:3000`

## Default Credentials
- **Username**: admin
- **Password**: admin@321

⚠️ **Change the default password immediately after first login!**

## API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (Admin only)
- `POST /api/auth/change-password` - Change password

### Report Endpoints
- `GET /api/reports` - Get all reports
- `GET /api/reports/{id}` - Get report by ID
- `POST /api/reports` - Create new report
- `PUT /api/reports/{id}` - Update report
- `DELETE /api/reports/{id}` - Delete report
- `GET /api/reports/{id}/data` - Get report data with pagination

### Database Connection Endpoints
- `GET /api/database-connections` - Get all connections
- `POST /api/database-connections` - Create connection
- `POST /api/database-connections/test` - Test connection
- `PUT /api/database-connections/{id}` - Update connection
- `DELETE /api/database-connections/{id}` - Delete connection

### Color Condition Endpoints
- `GET /api/color-conditions` - Get all color conditions
- `POST /api/color-conditions` - Create color condition
- `PUT /api/color-conditions/{id}` - Update color condition
- `DELETE /api/color-conditions/{id}` - Delete color condition

### TextList Endpoints
- `GET /api/textlists` - Get all text lists
- `POST /api/textlists` - Create text list
- `PUT /api/textlists/{id}` - Update text list
- `DELETE /api/textlists/{id}` - Delete text list

## Key Technologies

### Backend
- **ASP.NET Core 8.0**: Latest framework for building web APIs
- **Entity Framework Core 8.0**: ORM for database access
- **JWT Authentication**: Secure token-based authentication
- **Serilog**: Structured logging
- **FluentValidation**: Input validation
- **AutoMapper**: Object-object mapping
- **EPPlus**: Excel file generation
- **iTextSharp**: PDF generation
- **BCrypt.NET**: Password hashing

### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool
- **React Query**: Data fetching and caching
- **React Router**: Client-side routing
- **Zustand**: Lightweight state management
- **Axios**: HTTP client
- **Chart.js**: Charting library
- **React Table**: Table component

## Project Features

### 1. User Management
- Role-based access control (Admin, User, Viewer)
- User permissions management
- Password change functionality
- User activity tracking

### 2. Report Management
- Create reports from SQL tables
- Configure report columns (visibility, order, decimal places)
- Apply color conditions for visual alerts
- Apply text transformations
- Support for tabular, bar chart, and live chart types

### 3. Data Visualization
- **Tabular Reports**: Paginated data tables with sorting and filtering
- **Graphical Reports**: Multiple chart types (Column, Bar, Line, Pie, Area, etc.)
- **Live Charts**: Real-time data visualization from PLC/SCADA systems

### 4. Auto Export
- Schedule report exports (hourly, daily, weekly, monthly)
- Multiple output formats (PDF, Excel, Custom Excel template)
- Email distribution with attachments
- Export logging and history

### 5. Excel/CSV Import
- Import data from Excel/CSV files
- Auto-create tables from imported data
- Schedule automatic imports
- Column mapping configuration

### 6. Email Integration
- Configure SMTP settings
- Manage contact lists
- Send reports via email
- Support for attachments

## Database Schema

The application uses a comprehensive database schema with the following main entities:
- Users and UserPermissions
- DatabaseConnections
- Reports, ReportColumns
- BatchPreviews, GraphicalPreviews, LiveCharts
- ColorConditions, TextLists
- Tags, SqlTables
- AutoExportConfigs, AutoExportLogs
- EmailSettings, EmailContacts
- MenuSettings, ProjectSettings

## Security

### Authentication & Authorization
- JWT-based authentication with refresh tokens
- Role-based authorization (Admin, User, Viewer)
- Password hashing using BCrypt
- Secure API endpoints with [Authorize] attribute

### Data Security
- SQL injection prevention via parameterized queries
- Input validation using FluentValidation
- CORS configuration
- HTTPS enforcement in production

## Performance Optimization

### Backend
- Asynchronous programming throughout
- Database query optimization
- Response caching where appropriate
- Efficient pagination for large datasets

### Frontend
- Code splitting and lazy loading
- Memoization of expensive computations
- Virtual scrolling for large lists
- Optimized re-renders

## Testing

### Backend Tests
```bash
cd Backend
dotnet test
```

### Frontend Tests
```bash
cd Frontend
npm run test
```

## Deployment

### Backend Deployment (IIS/Azure/Docker)
1. Publish the application:
   ```bash
   dotnet publish -c Release -o publish
   ```

2. Configure IIS/Azure/Docker with the published files

### Frontend Deployment
1. Build for production:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your web server

## Development Guidelines

### Adding New Entities
1. Create entity in `AerialView.Domain/Entities/`
2. Add DbSet in `ApplicationDbContext`
3. Create migration: `dotnet ef migrations add AddNewEntity`
4. Update database: `dotnet ef database update`

### Adding New API Endpoints
1. Create DTOs in `AerialView.Application/DTOs/`
2. Create Command/Query handlers
3. Create Controller in `AerialView.API/Controllers/`
4. Add Swagger documentation attributes

### Adding New Frontend Features
1. Create components in `src/components/`
2. Create service functions in `src/services/`
3. Add routes in `src/App.tsx`
4. Update navigation menu

## Troubleshooting

### Backend Issues
- **Database connection fails**: Check connection string in appsettings.json
- **Migration errors**: Delete Migrations folder and recreate
- **JWT errors**: Verify JWT secret in appsettings.json

### Frontend Issues
- **API calls fail**: Check VITE_API_URL in .env file
- **Build errors**: Clear node_modules and reinstall
- **CORS errors**: Verify CORS policy in backend

## Support & Contact
For support, please contact:
- Email: support@himak.com
- Website: www.himak.com

## License
© 2024 Hi-Mak Pvt. Ltd. All rights reserved.

## Version History
- **v2.0.0** (2024-02-05): Complete rewrite with modern tech stack
- **v1.0.0** (2018): Initial Windows Forms application
