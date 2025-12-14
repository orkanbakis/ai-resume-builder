import type { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  selectable?: boolean
  selected?: boolean
}

export function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  selectable = false,
  selected = false,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-white dark:bg-gray-800',
    bordered: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg',
  }

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  }

  const selectableStyles = selectable
    ? `cursor-pointer transition-all hover:shadow-md ${
        selected
          ? 'ring-2 ring-primary-500 shadow-md'
          : 'hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600'
      }`
    : ''

  return (
    <div
      className={`
        rounded-xl ${variants[variant]} ${paddings[padding]} ${selectableStyles} ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: ReactNode
}

export function CardHeader({
  title,
  description,
  action,
  className = '',
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={`flex items-start justify-between gap-4 ${className}`}
      {...props}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export function CardContent({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mt-6 flex items-center justify-end gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
