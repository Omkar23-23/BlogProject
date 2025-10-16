# BlogNest Frontend

A modern React frontend for the BlogNest social blogging platform, built with Vite, React, and Tailwind CSS.

## Features

- 🚀 **Modern React 18** with Vite for fast development
- 🎨 **Tailwind CSS** for beautiful, responsive design
- 🔐 **Authentication** with JWT tokens
- 📱 **Responsive Design** that works on all devices
- 🎯 **TypeScript Support** for better development experience
- 🔄 **React Query** for efficient data fetching and caching
- 📝 **Rich Text Editor** for blog creation
- 🔍 **Advanced Search** with filters and sorting
- 👥 **User Profiles** and social features
- 📊 **Analytics Dashboard** for content creators

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- BlogNest backend running on port 8080

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── common/         # Common UI components
│   └── layout/         # Layout components
├── contexts/           # React contexts
├── pages/              # Page components
├── config/             # Configuration files
└── utils/              # Utility functions
```

## API Integration

The frontend integrates with the BlogNest Spring Boot backend through REST APIs:

- **Authentication**: `/api/auth/*`
- **Blogs**: `/api/blogs/*`
- **Users**: `/api/users/*`
- **Categories**: `/api/categories/*`
- **Search**: `/api/search/*`
- **Analytics**: `/api/analytics/*`

## Features Overview

### Authentication
- User registration and login
- JWT token management
- Protected routes
- Password reset functionality

### Blog Management
- Create, edit, and delete blogs
- Rich text editor with Markdown support
- Image uploads
- SEO optimization
- Draft and publish workflow

### Social Features
- User profiles
- Follow/unfollow users
- Like and comment on blogs
- Notifications

### Search & Discovery
- Full-text search
- Category filtering
- Tag-based organization
- Trending content

### Analytics
- Dashboard with key metrics
- Blog performance tracking
- User engagement stats

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety
- Implement proper error handling

### Component Structure
- Keep components small and focused
- Use custom hooks for reusable logic
- Implement proper loading and error states

### Styling
- Use Tailwind CSS utility classes
- Create reusable component classes
- Follow mobile-first responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
