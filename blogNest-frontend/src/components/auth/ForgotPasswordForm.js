import { useForm } from 'react-hook-form'
import { Mail } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'

function ForgotPasswordForm({ onSubmit, isLoading = false }) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

      <button type="submit" disabled={isLoading} className="btn-primary w-full flex justify-center items-center">
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Sending reset link...
          </>
        ) : (
          'Send reset link'
        )}
      </button>
    </form>
  )
}

export default ForgotPasswordForm


