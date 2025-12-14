import { FileText } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              AI Resume Builder
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
