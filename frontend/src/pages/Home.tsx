import { useStore } from '../store/useStore'

export default function Home() {
  const { isLoading } = useStore()

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96 flex flex-col items-center justify-center space-y-4">
        {isLoading ? (
          <p className="text-gray-500 dark:text-gray-400 text-xl">Loading...</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-xl">
            Welcome to your homepage!
          </p>
        )}
      </div>
    </div>
  )
} 