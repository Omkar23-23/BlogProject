# BlogNest Frontend Setup Guide

This guide will help you set up and run the BlogNest React frontend application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **BlogNest Backend** running on port 8080

## Quick Start

### 1. Install Dependencies

Navigate to the frontend directory and install dependencies:

```bash
cd blogNest-frontend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `blogNest-frontend` directory:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8080

# App Configuration
VITE_APP_NAME=BlogNest
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Project Structure

```
blogNest-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── auth/         # Authentication components
│   │   ├── common/       # Common UI components
│   │   └── layout/       # Layout components
│   ├── contexts/         # React contexts
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   ├── config/          # Configuration files
│   └── utils/           # Utility functions
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Backend Integration

The frontend integrates with the BlogNest Spring Boot backend through REST APIs:

### API Endpoints

- **Authentication**: `/api/auth/*`
- **Blogs**: `/api/blogs/*`
- **Users**: `/api/users/*`
- **Categories**: `/api/categories/*`
- **Comments**: `/api/comments/*`
- **Search**: `/api/search/*`
- **Analytics**: `/api/analytics/*`
- **Notifications**: `/api/notifications/*`

### Authentication Flow

1. User logs in through `/api/auth/login`
2. JWT token is stored in localStorage
3. Token is automatically included in API requests
4. Token refresh is handled automatically

## Features Overview

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Dark/light theme support
- Beautiful animations and transitions
- Accessible components

### 🔐 Authentication
- User registration and login
- JWT token management
- Protected routes
- Password reset functionality

### 📝 Blog Management
- Create, edit, and delete blogs
- Rich text editor with Markdown support
- Image uploads
- SEO optimization
- Draft and publish workflow

### 👥 Social Features
- User profiles
- Follow/unfollow users
- Like and comment on blogs
- Real-time notifications

### 🔍 Search & Discovery
- Full-text search
- Category filtering
- Tag-based organization
- Trending content

### 📊 Analytics
- Dashboard with key metrics
- Blog performance tracking
- User engagement stats

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8080` |
| `VITE_APP_NAME` | Application name | `BlogNest` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | `true` |
| `VITE_ENABLE_NOTIFICATIONS` | Enable notifications | `true` |

### Tailwind Configuration

The project uses Tailwind CSS with custom configuration:

- Custom color palette
- Custom animations
- Responsive design utilities
- Component-specific styles

### Vite Configuration

- React plugin for JSX support
- Path aliases for cleaner imports
- Proxy configuration for API calls
- Source maps for debugging

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Implement proper error handling
- Use TypeScript for type safety (optional)

### Component Structure
- Keep components small and focused
- Use custom hooks for reusable logic
- Implement proper loading and error states

### Styling
- Use Tailwind CSS utility classes
- Create reusable component classes
- Follow mobile-first responsive design

## Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Ensure the backend is running on port 8080
   - Check CORS configuration in backend
   - Verify API_BASE_URL in .env file

2. **Build Issues**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS

### Debug Mode

Enable debug mode by setting:
```env
VITE_DEBUG=true
```

## Production Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://api.blognest.com
VITE_APP_NAME=BlogNest
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
```

### Deployment Options

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload the `dist` folder to S3 bucket
- **Docker**: Use the provided Dockerfile

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Join our community Discord

## License

This project is licensed under the MIT License.
