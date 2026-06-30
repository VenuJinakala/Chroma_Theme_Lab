import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  mode: 'system',
  setThemeMode: () => {},
  resetToSystem: () => {},
})

const STORAGE_KEY = 'chroma-theme-mode'

const getSystemTheme = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getInitialMode = () => {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return 'system'
  }
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }
  return 'system'
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode)
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener?.('change', handleChange)
    mediaQuery.addListener?.(handleChange)

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange)
      mediaQuery.removeListener?.(handleChange)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return
    }
    window.localStorage.setItem(STORAGE_KEY, mode)
    const appliedTheme = mode === 'system' ? systemTheme : mode
    document.documentElement.dataset.theme = appliedTheme
    document.documentElement.dataset.themeMode = mode
  }, [mode, systemTheme])

  const setThemeMode = useCallback((value) => {
    setMode((prev) => {
      if (prev === value) return prev
      return value
    })
  }, [])

  const resetToSystem = useCallback(() => {
    setMode('system')
  }, [])

  const theme = useMemo(() => (mode === 'system' ? systemTheme : mode), [mode, systemTheme])

  const value = useMemo(
    () => ({
      theme,
      mode,
      setThemeMode,
      resetToSystem,
    }),
    [theme, mode, setThemeMode, resetToSystem],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
