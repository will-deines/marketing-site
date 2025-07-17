export default function HeroIntro() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 lg:p-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

      <div className="relative">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Talk to the Garrio team</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          We reply within 24h (often sooner). Choose the fastest path below.
        </p>
      </div>
    </div>
  )
}
