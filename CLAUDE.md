# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Development Environment
```bash
pnpm dev        # Start Next.js development server on http://localhost:3000
```

### Building for Production
```bash
pnpm build      # Build the production-ready application
pnpm start      # Start the production server
```

### Testing and Quality
```bash
pnpm lint       # Run ESLint to check code style
pnpm test       # Run Jest unit tests with coverage
pnpm test:e2e   # Run Playwright end-to-end tests
```

### Running Single Tests
```bash
# Run a specific Jest test file
pnpm test path/to/test.test.ts

# Run Playwright tests for a specific file
pnpm test:e2e tests/e2e/specific-test.spec.ts

# Run tests in watch mode (Jest)
pnpm test -- --watch
```

## High-Level Architecture

### Application Overview
This is a Next.js 15.2.4 marketing website for Garrio, a Shopify-focused customer service and sales platform. The site uses the App Router architecture with server components.

### Key Technical Decisions
- **Framework**: Next.js 15 with App Router for optimal performance and SEO
- **Styling**: Tailwind CSS with a custom design system built on shadcn/ui and Radix UI primitives
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Testing**: Jest for unit tests, Playwright for E2E tests
- **Package Manager**: pnpm for efficient dependency management

### Directory Architecture
The codebase follows a feature-based organization pattern:

1. **Route Structure** (`/app`): Pages are organized by feature with colocated components. Key routes include pricing, blog, features, alternatives, and interactive tools like ROI calculator.

2. **Component Library** (`/components`): 
   - Feature-specific components are grouped by domain (e.g., `/components/pricing`, `/components/blog`)
   - Shared UI primitives in `/components/ui` provide a consistent design system
   - Common patterns like CTAs and testimonials are abstracted for reuse

3. **Business Logic** (`/lib`): 
   - Utility functions are organized by domain (analytics, blog, pricing)
   - Shared types and configurations centralize business rules

4. **Data Layer** (`/data`): Static JSON files store structured content like competitor comparisons, feature matrices, and blog posts. This approach enables content updates without code changes.

### API Architecture
The application includes API routes for:
- Contact form submissions (`/app/api/contact`)
- Status monitoring (`/app/api/status`)

These endpoints handle form processing and external service integration.

### Testing Strategy
- Unit tests focus on component behavior and utility functions
- E2E tests validate critical user journeys
- Test coverage is tracked and reported via Jest

### Component Patterns
The codebase uses modern React patterns:
- Server Components for static content
- Client Components for interactive features
- Consistent use of TypeScript for type safety
- Zod schemas for runtime validation