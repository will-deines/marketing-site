import { MessageSquare, Sparkles } from "lucide-react"

export default function HeroIntro() {
  return (
    <div className="text-center mb-16 animate-fade-in-up">
      {/* Animated badge */}
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-6 py-3 rounded-full text-sm font-medium mb-8 animate-fade-in">
        <MessageSquare className="w-4 h-4" />
        Get in touch
      </div>
      
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
        Let's build something
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          amazing together
        </span>
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Whether you need support, have a partnership idea, or just want to say hi—we're here and typically respond in under 2 hours.
      </p>
      
      {/* Trust indicators */}
      <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Team online now</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span>2 hour response time</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span>500+ happy founders</span>
        </div>
      </div>
    </div>
  )
}
