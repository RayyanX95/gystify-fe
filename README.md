# Email Summarizer Frontend

A modern Next.js 15 frontend application for the Email Summarizer SaaS platform, built with TypeScript, TailwindCSS, and shadcn/ui components.

## 🚀 Features

- **Modern UI/UX**: Built with shadcn/ui and TailwindCSS for a clean, professional interface
- **Authentication**: Complete auth flow with login/register pages and JWT token management
- **Type Safety**: Full TypeScript implementation with strict type checking
- **State Management**: Zustand for client-side state with persistence
- **API Integration**: React Query for server state management and caching
- **Responsive Design**: Mobile-first responsive design with modern gradients and animations
- **Route Protection**: Middleware-based authentication guards
- **Toast Notifications**: User feedback with toast notifications
- **Form Validation**: Client-side form validation with proper error handling

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: React Query (TanStack) + Zustand
- **Icons**: Lucide React
- **Authentication**: JWT tokens
- **Package Manager**: Yarn

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth-related pages (login, register)
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── globals.css        # Global styles with design system
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx          # Homepage
├── components/            # Reusable React components
│   └── ui/               # shadcn/ui components (Button, Card, etc.)
├── hooks/                 # Custom React hooks
│   └── useToast.ts       # Toast notification hook
├── lib/                   # Utility functions and configurations
│   ├── api.ts            # API client and auth endpoints
│   ├── authStore.ts      # Zustand auth store
│   └── utils.ts          # Utility functions (cn helper)
└── providers/             # React context providers
    └── QueryProvider.tsx  # React Query provider
```

## 🎨 Design System

The application follows a modern, minimalistic design approach with:

- **Primary Color**: #4F46E5 (Indigo)
- **Secondary Color**: #6366F1 (Indigo variant)
- **Accent Color**: #FBBF24 (Amber)
- **Background**: #F9FAFB (Light gray)
- **Surface**: #FFFFFF (White)
- **Success**: #10B981 (Emerald)
- **Error**: #EF4444 (Red)

## 🚦 Getting Started

1. **Install dependencies**:

   ```bash
   yarn install
   ```

2. **Environment setup**:

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend API URL
   ```

3. **Start development server**:

   ```bash
   yarn dev
   ```

4. **Build for production**:
   ```bash
   yarn build
   yarn start
   ```

## 🔗 API Integration

The frontend connects to a NestJS backend API. Configure the API URL in your environment variables:

```env
NEXT_PUBLIC_API_URL
=http://localhost:8000/api/v1
```

### Available API Endpoints

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user profile

## 🛡 Authentication

The app implements JWT-based authentication with:

- Protected routes using Next.js middleware
- Persistent auth state with Zustand
- Automatic token management
- Redirect handling for auth flows

### Protected Routes

- `/dashboard` - Main dashboard (requires auth)
- `/profile` - User profile (requires auth)
- `/settings` - App settings (requires auth)

### Public Routes

- `/` - Homepage
- `/login` - Sign in page
- `/register` - Sign up page

## 📱 Pages Overview

### Homepage (`/`)

- Hero section with compelling copy
- Feature showcase with icons and descriptions
- Call-to-action sections
- Professional footer

### Authentication Pages

- **Login** (`/login`): Email/password login with form validation
- **Register** (`/register`): Account creation with password confirmation

### Dashboard (`/dashboard`)

- Statistics cards showing email metrics
- Recent activity feed
- Quick action buttons
- User profile display

## 🎯 Components

### UI Components (shadcn/ui)

- `Button` - Various button variants and sizes
- `Card` - Content containers with headers and descriptions
- `Input` - Form input fields with validation styles
- `Label` - Form labels with consistent styling
- `Toast` - Notification system with success/error variants

### Custom Components

- Toast notification system with multiple variants
- Protected route middleware
- API client with error handling
- Auth store with persistence

## 🎨 Styling Guidelines

- Use utility-first approach with TailwindCSS
- Implement consistent spacing and typography
- Follow mobile-first responsive design
- Use subtle animations and transitions
- Maintain accessibility standards

## 🔧 Development Guidelines

1. **TypeScript**: All components and functions must be properly typed
2. **Component Structure**: Use functional components with hooks
3. **Error Handling**: Implement proper error boundaries and user feedback
4. **Performance**: Use React Query for caching and Zustand for state
5. **Accessibility**: Follow WCAG guidelines for inclusive design

## 📦 Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## 🤝 Contributing

1. Follow the established code style and patterns
2. Ensure TypeScript compliance
3. Test components thoroughly
4. Update documentation as needed

## 📄 License

This project is part of the Email Summarizer SaaS platform.
