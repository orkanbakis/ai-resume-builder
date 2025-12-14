import { Sun, Moon, Monitor } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun className="h-4 w-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="h-4 w-4" />, label: 'Dark' },
    { value: 'system', icon: <Monitor className="h-4 w-4" />, label: 'System' },
  ]

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
      {themes.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${
              theme === value
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }
          `}
          title={label}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}

export function ThemeToggleSimple() {
  const { resolvedTheme, setTheme, theme } = useThemeStore()

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
