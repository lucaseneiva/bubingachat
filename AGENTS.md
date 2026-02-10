# AGENTS.md

This file provides guidelines for agentic coding agents working in the Concord Discord-like application repository.

## Project Overview

Concord is a full-stack Discord-like application with:
- **Server**: Node.js/Express with MongoDB
- **Client**: React + TypeScript with Vite
- **Database**: MongoDB
- **Architecture**: REST API + planned WebSocket support

## Development Commands

### Server (Node.js/Express)
```bash
cd server
npm run dev          # Development with hot reload (tsx watch)
npm run build        # TypeScript compilation
npm test             # Currently not implemented
```

### Client (React/Vite)
```bash
cd client
npm run dev          # Development server (Vite)
npm run build        # TypeScript check + build
npm run lint         # ESLint checking
npm run preview      # Production preview
```

### Database
```bash
# Start MongoDB (when docker-compose is available)
docker-compose up mongodb
```

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode enabled** in both server and client
- **ES2024+ syntax** preferred
- **Modern React 19** patterns with functional components
- **Type assertions** only when necessary (`process.env.MONGO_URI as string`)

### Import Patterns
- **ES6 modules only** (`import/export`)
- **Explicit file extensions** for local imports (`.js`, `.ts`, `.tsx`)
- **Import order**: Third-party → Local modules
- **Default imports** for main exports, **named imports** for specific functions

```typescript
// ✅ Good
import express from 'express';
import connectDB from './config/db.js';
import { useState, useEffect } from 'react';

// ❌ Bad
const express = require('express');
```

### Naming Conventions
- **Files**: `kebab-case` for directories, `PascalCase` for React components
- **Variables/Functions**: `camelCase` (`connectDB`, `app.listen`)
- **Constants**: `UPPER_SNAKE_CASE` for environment variables
- **Database fields**: `snake_case` (`created_at`, `password_hash`)
- **Components**: `PascalCase` (`UserProfile`, `MessageList`)

### Error Handling
```typescript
// ✅ Async operations with try-catch
try {
  const result = await someAsyncOperation();
  return result;
} catch (error) {
  console.error('Operation failed:', error);
  // Handle error appropriately (return error response, throw, etc.)
}
```

### Code Formatting
- **Semicolons**: Required at end of statements
- **String quotes**: Double quotes preferred
- **Indentation**: 2 spaces (client), 4 spaces (server - be consistent within files)
- **Line endings**: Unix-style (`\n`)
- **Max line length**: 100 characters (recommended)

## Architecture Patterns

### Server Structure
```
server/src/
├── index.ts          # Express app entry point
├── config/
│   └── db.ts         # Database connection
├── models/           # Mongoose schemas (to be created)
├── routes/           # Express route handlers (to be created)
├── middleware/       # Custom middleware (to be created)
└── utils/            # Utility functions (to be created)
```

### Client Structure
```
client/src/
├── main.tsx          # React app entry point
├── App.tsx           # Main App component
├── components/       # Reusable React components
├── pages/            # Page-level components
├── hooks/            # Custom React hooks
├── services/         # API calls and data fetching
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

### Database Schema (Planned)
- **users**: id, username, email, password_hash, created_at
- **servers**: id, name, owner_id, invite_code, created_at
- **server_members**: server_id, user_id, joined_at
- **channels**: id, server_id, name, created_at
- **messages**: id, channel_id, author_id, content, created_at

## Testing
- **No test framework currently configured**
- **Recommended**: Jest for server, Vitest for client
- **Add testing setup** before implementing business logic

## Linting and Code Quality

### Client (Already Configured)
- **ESLint** with modern flat config
- **TypeScript rules** enforced
- **React hooks** rules enabled
- **Run with**: `npm run lint`

### Server (Missing Configuration)
- **Add ESLint** configuration for TypeScript
- **Consider Prettier** for consistent formatting
- **Set up pre-commit hooks** for code quality

## Environment Variables
- **Server**: Use `.env` file in server directory
- **Required**: `MONGO_URI`, `PORT` (defaults to 3000)
- **Never commit** `.env` files or sensitive data

## API Design Patterns
- **RESTful endpoints**: `/api/v1/users`, `/api/v1/servers`, etc.
- **Consistent responses**: `{ success: boolean, data?: any, error?: string }`
- **HTTP status codes**: Use appropriate status codes (200, 201, 400, 404, 500)
- **Error middleware**: Implement centralized error handling

## Security Best Practices
- **Input validation**: Validate all incoming data
- **CORS configuration**: Already configured with cors middleware
- **Environment variables**: Store secrets in `.env`
- **Authentication**: Plan JWT-based auth system
- **Password hashing**: Use bcrypt for user passwords

## Development Workflow
1. **Start server**: `cd server && npm run dev`
2. **Start client**: `cd client && npm run dev`
3. **Database**: Ensure MongoDB is running
4. **Linting**: Run `npm run lint` in client before committing
5. **Building**: Test builds with `npm run build` in both directories

## Language and Localization
- **Current state**: Mixed Portuguese/English in error messages
- **Standardize on English** for all code, comments, and error messages
- **Plan for i18n** if multiple languages needed

## Immediate Priorities for Agents
1. **Add server linting** configuration
2. **Set up testing framework** for both server and client
3. **Implement proper Express routing** structure
4. **Create Mongoose models** based on database schema
5. **Add centralized error handling** middleware
6. **Implement authentication** system
7. **Replace template React code** with actual application

## Notes for AI Agents
- This is an **early-stage project** with basic scaffolding
- **Template code** still present in client - replace with actual features
- **No tests** currently implemented - add testing infrastructure
- **Database schema** designed but not yet implemented
- **Real-time features** (WebSocket) planned but not implemented
- **Focus on TypeScript safety** and error handling
- **Keep code modular** and follow established patterns

## Git Conventions
- **Branch naming**: `feature/feature-name`, `fix/bug-description`
- **Commit messages**: Use conventional commits (`feat:`, `fix:`, `refactor:`, etc.)
- **No commits** without proper testing and linting when available  