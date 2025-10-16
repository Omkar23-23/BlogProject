import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import BlogDetail from './pages/BlogDetail'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import Search from './pages/Search'
import Categories from './pages/Categories'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes with layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blog/:slug" element={<BlogDetail />} />
              <Route path="user/:username" element={<UserProfile />} />
              <Route path="search" element={<Search />} />
              <Route path="categories" element={<Categories />} />
              
              {/* Protected routes */}
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="create" element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              } />
              <Route path="edit/:id" element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
