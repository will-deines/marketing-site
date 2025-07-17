export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto py-12">
      <div className="flex space-x-2 mb-4">
        <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
      <p className="text-gray-500">Analyzing page content and preparing demo...</p>
    </div>
  )
}
