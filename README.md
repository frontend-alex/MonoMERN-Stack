# MERN Stack Boilerplate - Complete Guide


## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Development Workflow](#development-workflow)
7. [Available Scripts](#available-scripts)
8. [Configuration](#configuration)
9. [Troubleshooting](#troubleshooting)
10. [License](#license)

## Project Overview

This is a production-ready MERN (MongoDB, Express, React, Node.js) stack boilerplate with:

- **Frontend**: React 18 with Vite
- **Backend**: Express.js with MongoDB
- **Shared Code**: Common TypeScript types and utilities
- **Modern Tooling**: 
  - TypeScript across the stack
  - PNPM for package management
  - Concurrent execution for development
  - Docker support

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PNPM](https://pnpm.io/) (v8 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or connection string)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/mern-stack-boilerplate.git
   cd mern-stack-boilerplate
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   - Create `.env` file in the root directory:
     ```bash
     cp .env.example .env
     ```
   - Update the values in `.env` as needed

## Running the Application

### Development Mode (Recommended)

1. **Start all services in development mode**:
   ```bash
   pnpm dev
   ```
   This will start:
   - Shared code watcher
   - Express server (port 3000)
   - React frontend (port 5173)

2. **Access the applications**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - API Health Check: http://localhost:3000/health

### Production Mode

1. **Build all packages**:
   ```bash
   pnpm build
   ```

2. **Start the production server**:
   ```bash
   pnpm start
   ```

## Project Structure

```
mern-stack-boilerplate/
├── client/               # React Vite frontend
│   ├── public/           # Static assets
│   ├── src/              # Application source
│   ├── index.html        # Main HTML file
│   └── vite.config.ts    # Vite configuration
├── server/               # Express backend
│   ├── src/
│   │   ├── config/       # Environment and DB config
│   │   ├── controllers/  # Route controllers
│   │   ├── middlewares/  # Express middlewares
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── utils/        # Utility functions
│   │   └── index.ts      # Server entry point
│   └── package.json
├── shared/               # Shared code between frontend and backend
│   ├── src/
│   │   ├── types/        # Shared TypeScript types
│   │   └── lib/          # Shared utilities
│   └── package.json
├── .env.example          # Environment variables template
├── package.json          # Root package.json
└── README.md             # This file
```

## Development Workflow

### Running Services Individually

1. **Shared code (watch mode)**:
   ```bash
   pnpm --filter shared run watch
   ```

2. **Backend server**:
   ```bash
   pnpm --filter server run dev
   ```

3. **Frontend client**:
   ```bash
   pnpm --filter client run dev
   ```

### Common Development Tasks

- **Adding new API endpoints**:
  1. Create a new controller in `server/src/controllers/`
  2. Add routes in `server/src/routes/`
  3. Update shared types if needed

- **Adding new React components**:
  1. Create components in `client/src/components/`
  2. Add any new types to shared package
  3. Import from `@shared` when using backend types

## Available Scripts

### Root Scripts
| Script | Description |
|--------|-------------|
| `dev` | Starts all services in development mode |
| `build` | Builds all packages for production |
| `start` | Starts the production server |
| `lint` | Runs linter on all packages |
| `test` | Runs tests on all packages |
| `docker:build` | Builds Docker containers |
| `docker:up` | Starts Docker containers |
| `docker:down` | Stops Docker containers |

### Server Scripts
| Script | Description |
|--------|-------------|
| `dev` | Starts server in development mode |
| `build` | Compiles TypeScript to JS |
| `start` | Runs production server |
| `watch` | Watches for TS file changes |

### Client Scripts
| Script | Description |
|--------|-------------|
| `dev` | Starts Vite development server |
| `build` | Builds production assets |
| `preview` | Previews production build |

## Configuration

### Environment Variables

Configure these in your `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/mern-boilerplate` |
| `PORT` | Server port | `3000` |
| `CLIENT_URL` | Frontend URL | `http://localhost:5173` |
| `NODE_ENV` | Node environment | `development` |

### Customizing the Template

1. **Change the frontend port**:
   - Update `client/vite.config.ts`:
     ```ts
     server: {
       port: 3001 // Your new port
     }
     ```

2. **Add new dependencies**:
   ```bash
   pnpm --filter <package> add <dependency>
   ```
   Example:
   ```bash
   pnpm --filter client add axios
   ```

## Troubleshooting

### Common Issues

1. **MongoDB connection errors**:
   - Ensure MongoDB is running
   - Verify connection string in `.env`

2. **Port conflicts**:
   - Check for other services using ports 3000 or 5173
   - Update ports in `.env` and `vite.config.ts`

3. **Dependency issues**:
   - Try deleting `node_modules` and reinstalling:
     ```bash
     rm -rf node_modules
     pnpm install
     ```

4. **TypeScript errors**:
   - Ensure shared types are properly imported
   - Rebuild shared package after changes:
     ```bash
     pnpm --filter shared run build
     ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.