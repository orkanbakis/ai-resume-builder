import { Loader2 } from 'lucide-react'

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <Loader2
      className={`animate-spin text-primary-600 dark:text-primary-400 ${sizes[size]} ${className}`}
    />
  )
}

export interface LoadingOverlayProps {
  message?: string
}

export function LoadingOverlay({ message = 'Loading...' }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <LoadingSpinner size="lg" />
        <p className="text-gray-700 dark:text-gray-200">{message}</p>
      </div>
    </div>
  )
}
