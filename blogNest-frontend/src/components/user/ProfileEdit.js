import { useForm } from 'react-hook-form'
import LoadingSpinner from '../common/LoadingSpinner'

function ProfileEdit({ defaultValues = {}, onSubmit, isLoading = false }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label">First Name</label>
        <input {...register('firstName', { required: 'First name is required' })} type="text" className="input" />
        {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
      </div>
      <div>
        <label className="label">Last Name</label>
        <input {...register('lastName', { required: 'Last name is required' })} type="text" className="input" />
        {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
      </div>
      <div>
        <label className="label">Bio</label>
        <textarea {...register('bio')} className="input min-h-[80px]" />
      </div>
      <button type="submit" disabled={isLoading} className="btn-primary w-full flex justify-center items-center">
        {isLoading ? (<><LoadingSpinner size="sm" className="mr-2" /> Saving...</>) : 'Save profile'}
      </button>
    </form>
  )
}

export default ProfileEdit


