import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center space-x-2" href="/">
        <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
          <svg 
            className="w-5 h-5 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        </div>
        <span className="font-bold text-xl text-white tracking-tight">Garrio</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          href="/features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          href="/pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium text-white hover:underline underline-offset-4"
          href="/contact"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}