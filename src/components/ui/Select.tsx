import { forwardRef, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  description?: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = '',
      label,
      error,
      helperText,
      options,
      placeholder = 'Select an option',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full px-3 py-2 pr-10 rounded-lg border transition-colors appearance-none
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              ${
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500'
              }
              focus:outline-none focus:ring-2 focus:ring-opacity-50
              disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-gray-700
              ${className}
            `}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
