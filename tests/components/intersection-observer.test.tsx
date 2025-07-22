/**
 * Tests for Intersection Observer useEffect cleanup in components
 * Ensures proper ref handling and no infinite rerenders
 */
import React from 'react'
import { render, act } from '@testing-library/react'

// Mock intersection observer
const mockObserve = jest.fn()
const mockUnobserve = jest.fn()
const mockDisconnect = jest.fn()

beforeEach(() => {
  global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
    callback,
  }))
})

afterEach(() => {
  jest.clearAllMocks()
})

// Test component that uses the ref pattern we fixed
const TestIntersectionComponent = ({ deps = [] }: { deps?: unknown[] }) => {
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )

    const currentSection = sectionRef.current
    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, deps)

  return (
    <div ref={sectionRef} data-testid="test-section">
      {isVisible ? 'Visible' : 'Hidden'}
    </div>
  )
}

describe('Intersection Observer useEffect Cleanup', () => {
  it('should observe element on mount', () => {
    render(<TestIntersectionComponent />)
    
    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(mockObserve).toHaveBeenCalledTimes(1)
  })

  it('should properly cleanup on unmount', () => {
    const { unmount } = render(<TestIntersectionComponent />)
    
    // Clear previous calls
    mockUnobserve.mockClear()
    
    unmount()
    
    expect(mockUnobserve).toHaveBeenCalledTimes(1)
  })

  it('should not cause infinite rerenders with empty deps', () => {
    const { rerender } = render(<TestIntersectionComponent />)
    
    // Clear initial setup calls
    jest.clearAllMocks()
    
    // Rerender multiple times
    rerender(<TestIntersectionComponent />)
    rerender(<TestIntersectionComponent />)
    rerender(<TestIntersectionComponent />)
    
    // Should not have created new observers or called observe again
    expect(global.IntersectionObserver).not.toHaveBeenCalled()
    expect(mockObserve).not.toHaveBeenCalled()
    expect(mockUnobserve).not.toHaveBeenCalled()
  })

  it('should recreate observer when deps change', () => {
    const { rerender } = render(<TestIntersectionComponent deps={[1]} />)
    
    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(mockObserve).toHaveBeenCalledTimes(1)
    
    // Clear and change deps
    jest.clearAllMocks()
    rerender(<TestIntersectionComponent deps={[2]} />)
    
    // Should cleanup old and create new
    expect(mockUnobserve).toHaveBeenCalledTimes(1)
    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(mockObserve).toHaveBeenCalledTimes(1)
  })

  it('should handle null refs gracefully', () => {
    // Component that starts with null ref
    const TestNullRefComponent = () => {
      const sectionRef = React.useRef<HTMLDivElement>(null)
      const [mounted, setMounted] = React.useState(false)

      React.useEffect(() => {
        const observer = new IntersectionObserver(() => {})
        
        const currentSection = sectionRef.current
        if (currentSection) {
          observer.observe(currentSection)
        }

        return () => {
          if (currentSection) {
            observer.unobserve(currentSection)
          }
        }
      }, [])

      React.useEffect(() => {
        setMounted(true)
      }, [])

      return mounted ? <div ref={sectionRef}>Content</div> : null
    }

    expect(() => {
      render(<TestNullRefComponent />)
    }).not.toThrow()
  })

  it('should maintain ref stability across rerenders', () => {
    let refCallCount = 0
    
    const TestRefStabilityComponent = () => {
      const sectionRef = React.useRef<HTMLDivElement>(null)
      
      React.useEffect(() => {
        refCallCount++
        const observer = new IntersectionObserver(() => {})
        
        const currentSection = sectionRef.current
        if (currentSection) {
          observer.observe(currentSection)
        }

        return () => {
          if (currentSection) {
            observer.unobserve(currentSection)
          }
        }
      }, [])

      return <div ref={sectionRef}>Content</div>
    }

    const { rerender } = render(<TestRefStabilityComponent />)
    
    expect(refCallCount).toBe(1)
    
    // Multiple rerenders should not trigger useEffect again
    rerender(<TestRefStabilityComponent />)
    rerender(<TestRefStabilityComponent />)
    
    expect(refCallCount).toBe(1)
  })
})

describe('Performance: Ref Array Cleanup', () => {
  it('should handle array refs without infinite loops', () => {
    const TestArrayRefsComponent = ({ itemCount = 3 }: { itemCount?: number }) => {
      const itemRefs = React.useRef<(HTMLDivElement | null)[]>([])
      const [visibleItems, setVisibleItems] = React.useState<number[]>([])

      React.useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            const visible: number[] = []
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const index = itemRefs.current.indexOf(entry.target as HTMLDivElement)
                if (index !== -1) visible.push(index)
              }
            })
            setVisibleItems(visible)
          },
          { threshold: 0.1 }
        )

        const currentRefs = itemRefs.current
        currentRefs.forEach((ref) => {
          if (ref) observer.observe(ref)
        })

        return () => {
          currentRefs.forEach((ref) => {
            if (ref) observer.unobserve(ref)
          })
        }
      }, [])

      return (
        <div>
          {Array.from({ length: itemCount }, (_, i) => (
            <div
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              data-testid={`item-${i}`}
            >
              Item {i} {visibleItems.includes(i) ? '(visible)' : '(hidden)'}
            </div>
          ))}
        </div>
      )
    }

    expect(() => {
      render(<TestArrayRefsComponent />)
    }).not.toThrow()

    expect(mockObserve).toHaveBeenCalledTimes(3)
  })
})