'use client'

import { useState, useEffect } from 'react'

export function usePersistedForm<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(defaultValue)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(key)
    if (saved) {
      try {
        setState(JSON.parse(saved))
      } catch {
        setState(defaultValue)
      }
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(key, JSON.stringify(state))
    }
  }, [state, hydrated])

  return [state, setState, hydrated] as const
}