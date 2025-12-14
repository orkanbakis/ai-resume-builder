import { forwardRef, type TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  showCharCount?: boolean
  maxLength?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = '',
      label,
      error,
      helperText,
      showCharCount = false,
      maxLength,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const charCount = typeof value === 'string' ? value.length : 0

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={`
            w-full px-3 py-2 rounded-lg border transition-colors resize-y min-h-[100px]
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
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
        />
        <div className="flex justify-between mt-1">
          <div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {helperText && !error && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
            )}
          </div>
          {showCharCount && maxLength && (
            <p
              className={`text-sm ${
                charCount >= maxLength
                  ? 'text-red-500'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
