import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export default function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  const baseStyles = 'w-full px-4 py-2.5 bg-dark-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 transition-all duration-200'
  
  const stateStyles = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
    : 'border-dark-700 focus:border-primary-500 focus:ring-primary-500/20 text-white placeholder-dark-400'

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-dark-300 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${baseStyles} ${stateStyles}`}
        {...props}
      />
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-400' : 'text-dark-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
}
