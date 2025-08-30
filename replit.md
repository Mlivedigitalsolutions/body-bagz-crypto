# Body Bagz ($BAGZ) - Cyberpunk Crypto Website

## Overview

Body Bagz ($BAGZ) is a dark, cyberpunk-themed cryptocurrency website that embodies a "villain era" aesthetic. The application presents a single-page marketing site for a meme token with an underground, post-apocalyptic vibe. The site features interactive tools for community engagement, real-time trading data, and a comprehensive brand experience built around chaos-driven tokenomics and streetwear culture.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses **React with TypeScript** as the primary frontend framework, built with **Vite** for fast development and optimized production builds. The component architecture follows a modular design pattern with:

- **Component Library**: Utilizes shadcn/ui components built on Radix UI primitives for accessible, customizable UI elements
- **Styling**: Tailwind CSS with custom cyberpunk color palette (jet black, blood red, toxic green, glitch purple) and custom CSS animations for glitch effects
- **State Management**: React hooks for local state with TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Typography**: Custom font stack including Anton, Bebas Neue, Inter, and Orbitron for the cyberpunk aesthetic

### Backend Architecture
The backend is built with **Express.js** and follows a RESTful API design:

- **Server Framework**: Express.js with TypeScript for type safety
- **API Routes**: Modular route organization with endpoints for tweet generation, PFP generation, and trading data
- **Development Setup**: Vite middleware integration for hot module replacement in development
- **Data Storage**: In-memory storage implementation with extensible interface for future database integration

### Key Features Implementation
- **Interactive Tools**: Tweet generator, meme creator, and PFP generator with randomized content
- **Real-time Data**: Mock trading data with simulated price fluctuations
- **Responsive Design**: Mobile-first approach with cyberpunk-themed components
- **Scroll Animations**: Intersection Observer API for reveal animations
- **Visual Effects**: CSS-based glitch effects, neon glows, and hover interactions

### Database Schema
Uses Drizzle ORM with PostgreSQL for future database operations:

- **Users Table**: Basic user authentication schema with id, username, and password fields
- **Schema Validation**: Zod integration for runtime type checking and validation
- **Migration Support**: Drizzle Kit for database migrations and schema management

### Design System
Custom design system based on cyberpunk aesthetics:

- **Color Palette**: Semantic color tokens (jet-black, onyx, blood-red, toxic-green, glitch-purple, ash-white, dim-gray)
- **Component Variants**: Custom button styles (cyber-button), card designs (neon-card), and interactive states
- **Animation Library**: Custom CSS animations for glitch effects, flicker, and pulse animations
- **Icon System**: Custom SVG icon components (GrimReaper, UrbanGrit, FireSkull, etc.)

## External Dependencies

### UI and Styling
- **Radix UI**: Complete set of accessible UI primitives (@radix-ui/*)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Class Variance Authority**: Type-safe component variants
- **Lucide React**: Icon library for standard UI icons

### Development and Build Tools
- **Vite**: Fast build tool with React plugin and TypeScript support
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

### Database and Validation
- **Drizzle ORM**: Type-safe ORM for PostgreSQL with schema management
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **Zod**: Runtime type validation and schema parsing

### State Management and Data Fetching
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **Wouter**: Lightweight routing for React applications

### Fonts and Typography
- **Google Fonts**: Anton, Bebas Neue, Inter, Orbitron, Exo 2, and Montserrat for cyberpunk typography hierarchy

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling integration

### Utility Libraries
- **Date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **nanoid**: Unique ID generation for components and data