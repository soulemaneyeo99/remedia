// src/components/LoadingSpinner.jsx
const LoadingSpinner = ({ message = "Chargement..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-green-200 rounded-full animate-spin border-t-forest-green"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-pulse border-t-african-gold"></div>
      </div>
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  )
}

export default LoadingSpinner
