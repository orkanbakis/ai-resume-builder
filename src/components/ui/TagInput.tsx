import { useState, type KeyboardEvent, forwardRef } from 'react'
import { X } from 'lucide-react'

export interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  label?: string
  error?: string
  helperText?: string
  placeholder?: string
  maxTags?: number
  disabled?: boolean
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value = [],
      onChange,
      label,
      error,
      helperText,
      placeholder = 'Type and press Enter to add',
      maxTags,
      disabled = false,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState('')

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault()
        addTag()
      } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
        removeTag(value.length - 1)
      }
    }

    const addTag = () => {
      const newTag = inputValue.trim()
      if (
        newTag &&
        !value.includes(newTag) &&
        (!maxTags || value.length < maxTags)
      ) {
        onChange([...value, newTag])
        setInputValue('')
      }
    }

    const removeTag = (index: number) => {
      const newTags = value.filter((_, i) => i !== index)
      onChange(newTags)
    }

    const canAddMore = !maxTags || value.length < maxTags

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {label}
          </label>
        )}
        <div
          className={`
            flex flex-wrap gap-2 p-2 rounded-lg border transition-colors min-h-[42px]
            bg-white dark:bg-gray-800
            ${
              error
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-opacity-50'
            }
            ${disabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : ''}
          `}
        >
          {value.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm
                bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}
          {canAddMore && !disabled && (
            <input
              ref={ref}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={addTag}
              placeholder={value.length === 0 ? placeholder : ''}
              disabled={disabled}
              className="flex-1 min-w-[120px] outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
        {maxTags && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {value.length}/{maxTags} tags
          </p>
        )}
      </div>
    )
  }
)

TagInput.displayName = 'TagInput'
