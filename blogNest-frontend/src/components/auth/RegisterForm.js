import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, User, Lock, Eye, EyeOff } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'

function RegisterForm({ onSubmit, isLoading = false }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password')

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="label">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('firstName', { required: 'First name is required' })}
                type="text"
                className="input pl-10"
                placeholder="Enter your first name"
              />
            </div>
            {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="label">Last Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                {...register('lastName', { required: 'Last name is required' })}
                type="text"
                className="input pl-10"
                placeholder="Enter your last name"
              />
            </div>
            {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="username" className="label">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'At least 3 characters' },
                maxLength: { value: 20, message: 'Less than 20 characters' },
                pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Letters, numbers, underscores only' },
              })}
              type="text"
              className="input pl-10"
              placeholder="Choose a username"
            />
          </div>
          {errors.username && <p className="error-text">{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="label">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              className="input pl-10"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="label">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
            {...register('password', {
            required: 'Password is required',
              minLength: { value: 8, message: 'At least 8 characters' },
              pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
              message: 'Must contain uppercase, lowercase, and a number',
                  },
                  })}              type={showPassword ? 'text' : 'password'}
              className="input pl-10 pr-10"
              placeholder="Create a password"
            />
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="label">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              type={showConfirmPassword ? 'text' : 'password'}
              className="input pl-10 pr-10"
              placeholder="Confirm your password"
            />
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="btn-primary w-full flex justify-center items-center">
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Creating account...
          </>
        ) : (
          'Create account'
        )}
      </button>
    </form>
  )
}

export default RegisterForm


