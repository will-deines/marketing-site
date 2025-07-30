import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const mdxComponents = {
  h1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("text-4xl md:text-5xl font-bold text-gray-900 mt-12 mb-6", className)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-6", className)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-2xl md:text-3xl font-semibold text-gray-800 mt-8 mb-4", className)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={cn("text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-3", className)} {...props}>
      {children}
    </h4>
  ),
  p: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-gray-700 leading-relaxed mb-6 text-lg", className)} {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#")
    
    if (isInternal) {
      return (
        <Link 
          href={href || "#"} 
          className={cn("text-purple-600 hover:text-purple-700 underline underline-offset-2 transition-colors", className)}
          {...props}
        >
          {children}
        </Link>
      )
    }
    
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={cn("text-purple-600 hover:text-purple-700 underline underline-offset-2 transition-colors", className)}
        {...props}
      >
        {children}
      </a>
    )
  },
  ul: ({ children, className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("list-disc list-inside space-y-3 mb-6 pl-6", className)} {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("list-decimal list-inside space-y-3 mb-6 pl-6", className)} {...props}>
      {children}
    </ol>
  ),
  li: ({ children, className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("text-gray-700 leading-relaxed", className)} {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote 
      className={cn(
        "border-l-4 border-purple-500 pl-6 my-8 italic text-gray-700 bg-purple-50 py-4 pr-4 rounded-r-lg",
        className
      )} 
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code 
      className={cn(
        "bg-gray-100 text-purple-700 px-1.5 py-0.5 rounded text-sm font-mono",
        className
      )} 
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre 
      className={cn(
        "bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm",
        className
      )} 
      {...props}
    >
      {children}
    </pre>
  ),
  table: ({ children, className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table className={cn("min-w-full divide-y divide-gray-200", className)} {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn("bg-gray-50", className)} {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={cn("bg-white divide-y divide-gray-200", className)} {...props}>
      {children}
    </tbody>
  ),
  th: ({ children, className, ...props }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th 
      className={cn(
        "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
        className
      )} 
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, className, ...props }: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td className={cn("px-6 py-4 whitespace-nowrap text-sm text-gray-900", className)} {...props}>
      {children}
    </td>
  ),
  strong: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn("font-semibold text-gray-900", className)} {...props}>
      {children}
    </strong>
  ),
  em: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className={cn("italic text-gray-700", className)} {...props}>
      {children}
    </em>
  ),
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn("border-gray-200 my-12", className)} {...props} />
  ),
  img: ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img 
      src={src} 
      alt={alt || ""} 
      className={cn("rounded-lg shadow-lg my-8 w-full", className)} 
      {...props}
    />
  ),
  // Custom components for special content
  Callout: ({ children, type = "info", className }: { children: React.ReactNode; type?: "info" | "warning" | "success" | "error"; className?: string }) => {
    const styles = {
      info: "bg-blue-50 border-blue-200 text-blue-900",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
      success: "bg-green-50 border-green-200 text-green-900",
      error: "bg-red-50 border-red-200 text-red-900",
    }
    
    return (
      <div className={cn(
        "p-6 rounded-lg border-2 my-8",
        styles[type],
        className
      )}>
        {children}
      </div>
    )
  },
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("bg-white rounded-lg shadow-md p-6 my-6", className)}>
      {children}
    </div>
  ),
  Grid: ({ children, cols = 2, className }: { children: React.ReactNode; cols?: number; className?: string }) => (
    <div className={cn(`grid grid-cols-1 md:grid-cols-${cols} gap-6 my-8`, className)}>
      {children}
    </div>
  ),
}