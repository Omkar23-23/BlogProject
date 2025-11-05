import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Lock, Eye, EyeOff } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'

function ResetPasswordForm({ onSubmit, isLoading = false }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const password = watch('password')

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label htmlFor="password" className="label">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
              type={showPassword ? 'text' : 'password'}
              className="input pl-10 pr-10"
              placeholder="Enter new password"
            />
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="label">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('confirmPassword', { required: 'Please confirm your password', validate: (value) => value === password || 'Passwords do not match' })}
              type={showConfirmPassword ? 'text' : 'password'}
              className="input pl-10 pr-10"
              placeholder="Confirm new password"
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
            Resetting password...
          </>
        ) : (
          'Reset password'
        )}
      </button>
    </form>
  )
}

export default ResetPasswordForm


