<!-- cSpell:disable -->

# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a modern Next.js 14 e-commerce application built with TypeScript, featuring a complete shopping experience with product catalog, shopping cart, user authentication, and order management.

## Architecture Guidelines

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict typing
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase with Row Level Security (RLS)
- **State Management**: Redux Toolkit for complex state, React Context for auth
- **UI Components**: Radix UI primitives with custom styling
- **Forms**: React Hook Form with Zod validation

## Code Style Preferences

1. **Components**: Use functional components with TypeScript interfaces
2. **File Organization**: Group related files in feature-based folders
3. **API Routes**: Use Next.js API routes for server-side operations
4. **Error Handling**: Implement proper error boundaries and try-catch blocks
5. **Performance**: Utilize Next.js optimization features (Image, Link, dynamic imports)

## Database Schema

- Products with categories, brands, images, and reviews
- User profiles with authentication via Supabase Auth
- Shopping cart and wishlist functionality
- Order management with status tracking
- Row Level Security (RLS) policies for data protection

## Security Considerations

- Environment variables for sensitive data (API keys, database URLs)
- Server-side API routes for secure operations
- Proper authentication middleware
- Input validation with Zod schemas
- CSRF protection and secure headers

## Performance Optimization

- Server-side rendering (SSR) for product pages
- Static generation (SSG) for category pages
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Caching strategies for API responses

## Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Touch-friendly interfaces for mobile users
- Progressive web app (PWA) capabilities
- Accessibility compliance (WCAG guidelines)

## Testing Strategy

- Unit tests for utility functions
- Integration tests for API routes
- Component testing with React Testing Library
- E2E tests for critical user flows
