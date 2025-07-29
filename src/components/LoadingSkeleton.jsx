/**
 * Composant LoadingSkeleton
 * Affiche un squelette de chargement pendant le lazy loading des pages
 * Améliore l'expérience utilisateur avec une transition fluide
 */
export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
            <div className="flex space-x-4">
              <div className="h-8 w-20 bg-gray-300 rounded"></div>
              <div className="h-8 w-20 bg-gray-300 rounded"></div>
              <div className="h-8 w-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section skeleton */}
        <div className="mb-12">
          <div className="h-8 w-96 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-300 rounded mb-8"></div>
          <div className="h-12 w-40 bg-gray-300 rounded"></div>
        </div>

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded mb-4"></div>
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating loading indicator */}
      <div className="fixed bottom-8 right-8">
        <div className="bg-green-600 rounded-full p-3 shadow-lg">
          <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}