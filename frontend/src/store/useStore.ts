import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  // Theme
  isDarkMode: boolean
  toggleTheme: () => void
  
  // Loading State
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // Error Handling
  error: string | null
  setError: (error: string | null) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      // Loading State
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      
      // Error Handling
      error: null,
      setError: (error) => set({ error }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ 
        isDarkMode: state.isDarkMode,
      }),
    }
  )
) 