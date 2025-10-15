# MonoMERN Stack Boilerplate

A production-ready MERN stack boilerplate with TypeScript, authentication, and modern development tools.

<div align="center">
  <h3>Frontend Technologies</h3>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white" alt="React Hook Form" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
</div>

<div align="center">
  <h3>Backend Technologies</h3>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=white" alt="Passport.js" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Bcrypt-00A8CC?style=for-the-badge&logo=bcrypt&logoColor=white" alt="Bcrypt" />
  <img src="https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white" alt="Nodemailer" />
  <img src="https://img.shields.io/badge/Winston-FF6B6B?style=for-the-badge&logo=winston&logoColor=white" alt="Winston" />
</div>

<div align="center">
  <h3>Development Tools</h3>
  <img src="https://img.shields.io/badge/PNPM-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="PNPM" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
</div>

## Overview

This boilerplate provides a complete foundation for building modern web applications using MongoDB, Express.js, React, and Node.js with TypeScript for type safety and comprehensive authentication.

## Features

- Complete authentication system with JWT and OAuth providers
- Modern React frontend with TypeScript and Tailwind CSS
- Express.js backend with RESTful API and comprehensive middleware
- MongoDB integration with Mongoose ODM
- Monorepo structure with shared packages
- Docker support for development and production
- Security-first approach with proper middleware
- Email system for notifications and verification

## Future Database Support

**Coming Soon:** Multi-database support to give developers flexibility in choosing their preferred database solution.

### Planned Database Support
- **PostgreSQL** - Full relational database support with Prisma ORM
- **MySQL** - Alternative relational database option
- **MongoDB** - Current NoSQL database (already supported)
- **SQLite** - Lightweight option for development and small applications

### Benefits
- **Database Agnostic** - Choose the database that best fits your project requirements
- **Easy Migration** - Switch between databases with minimal code changes
- **Flexible Architecture** - Support both relational and non-relational data models
- **Production Ready** - Each database option will include optimized configurations and best practices

This enhancement will maintain backward compatibility while providing developers with the freedom to use PostgreSQL for complex relational data, MySQL for traditional web applications, or continue using MongoDB for document-based architectures.

## Showcase: Easy Template Customization

**See it in action!** Watch how simple it is to customize authentication templates and toggle between different OTP configurations.

### Video Demo
<video width="100%" controls autoplay muted loop>
  <source src="docs/assets/toggle-design.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

### Template Customization Features
- **One-Click Switching** - Change between register, login, and OTP templates instantly
- **Number-Based Configuration** - Simply modify the template number to switch functionality
- **Real-Time Preview** - See changes immediately without server restarts
- **Consistent Styling** - All templates maintain your brand's visual identity
- **Mobile Responsive** - Templates automatically adapt to different screen sizes

*Watch the video above to see this powerful feature in action!*

## Prerequisites

- Node.js (v18 or higher)
- PNPM (v8 or higher)
- MongoDB (v6 or higher)
- Docker (optional)

## Quick Start

1. Clone the repository
```bash
git clone <repository-url>
cd MonoMERN-Stack
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
pnpm run cp:env
```

4. Configure environment files
Edit `.env.development` and `.env.production` with your configuration.

5. Start development servers
```bash
pnpm run dev
```

**Important:** For OTP functionality to work, email templates must be copied to the build directory. This happens automatically during development, but if you encounter OTP email issues, run inside the app/server:
```bash
pnpm run copy-templates --filter server
```

Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Environment Variables

### Required
- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret (min 32 characters)
- `JWT_REFRESH_SECRET` - JWT refresh token secret

### OAuth Providers (Optional)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret
- `FACEBOOK_CLIENT_ID` - Facebook OAuth app ID
- `FACEBOOK_CLIENT_SECRET` - Facebook OAuth app secret

### Email Configuration (Optional)
- `OTP_EMAIL_SERVICE` - Email service provider (e.g., 'gmail', 'outlook')
- `OTP_EMAIL` - Email address for sending OTP emails
- `OTP_EMAIL_PASSWORD` - Email password or app-specific password
- `CORS_ORIGINS` - Frontend URL for password reset links

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `POST /api/v1/auth/verify-email` - Verify email address

### OAuth Providers
- `GET /api/v1/auth/google` - Google OAuth login
- `GET /api/v1/auth/github` - GitHub OAuth login
- `GET /api/v1/auth/facebook` - Facebook OAuth login

### User Management
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `PUT /api/v1/users/password` - Change password
- `DELETE /api/v1/users/account` - Delete user account

## Development Commands

### Package Management
```bash
pnpm install                    # Install dependencies
pnpm add <package> --filter <workspace>  # Add dependency to workspace
```

### Development
```bash
pnpm run dev                    # Start all development servers
pnpm run dev --filter client    # Start client only
pnpm run dev --filter server    # Start server only
pnpm run build                  # Build all packages
pnpm run lint                   # Lint all packages
pnpm run test                   # Run tests
```

### Email Templates
```bash
# Copy email templates to build directory (required for OTP functionality)
pnpm run copy-templates --filter server

# Email templates are located at:
# app/server/src/infrastructure/email/templates/
# ├── auth/
# │   ├── otp.html
# │   └── reset-password.html
# └── notifications/
```

### Docker
```bash
pnpm run docker:dev             # Start development with Docker
pnpm run docker:dev:down        # Stop development environment
pnpm run docker:build           # Build Docker images
pnpm run docker:up              # Start production containers
pnpm run docker:down            # Stop all containers
pnpm run docker:logs            # View container logs
pnpm run docker:cleanup         # Clean up Docker resources
```

### Production
```bash
pnpm run deploy:prod            # Deploy production environment
pnpm run deploy:dev             # Deploy development environment
pnpm run start                  # Start production server
```


## Project Structure

```
MonoMERN-Stack/
├── app/
│   ├── client/          # React frontend
│   └── server/          # Express.js backend
├── packages/
│   └── shared/          # Shared types and utilities
├── deployment/          # Docker configurations
├── scripts/             # Development scripts
└── package.json         # Root package configuration
```

## Authentication Flow

The application uses JWT-based authentication with optional OAuth providers:

1. User registers/logs in with credentials
2. Server validates credentials and generates JWT tokens
3. Access token (15min) and refresh token (7days) returned to client
4. Client sends access token with API requests
5. When access token expires, client uses refresh token to get new access token

OAuth providers follow standard OAuth 2.0 flow with account linking capabilities.

## Database Schema

### User Model
- `_id` - Unique identifier
- `username` - Unique username
- `email` - Unique email address
- `password` - Hashed password
- `emailVerified` - Email verification status
- `providers` - OAuth provider IDs
- `profile` - User profile information
- `createdAt` - Account creation date
- `updatedAt` - Last update date

### OTP Model
- `_id` - Unique identifier
- `email` - User email
- `code` - Hashed verification code
- `type` - OTP type (email_verification/password_reset)
- `expiresAt` - Expiration timestamp
- `used` - Usage status
- `createdAt` - Creation timestamp

## Troubleshooting

### Common Issues

**MongoDB Connection Issues**
- Ensure MongoDB is running: `mongosh --eval "db.adminCommand('ismaster')"`
- Check MongoDB logs: `sudo journalctl -u mongod`

**Port Already in Use**
- Find process using port: `lsof -i :3000`
- Kill process: `kill -9 <PID>`
- Use different port: `PORT=3001 pnpm run dev`

**Docker Issues**
- Clean up resources: `docker system prune -a`
- Rebuild containers: `pnpm run docker:build --no-cache`
- Check logs: `docker logs <container-name>`

**Environment Variables**
- Verify .env files exist: `ls -la .env*`
- Check variables: `node -e "console.log(process.env.NODE_ENV)"`

**Email Template Issues**
- OTP emails not sending: Ensure templates are copied to build directory
- Run: `pnpm run copy-templates --filter server`
- Check template path: `app/server/build/infrastructure/email/templates/`
- Verify template files exist in both src and build directories
- For production: Templates are automatically copied during build process

## License

This project is licensed under the MIT License.
