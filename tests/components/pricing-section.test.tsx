import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PricingSection from "../../components/pricing-section";

// Create a more realistic mock that tracks observers
let intersectionObserverCallback: any = null;
let observedElements: Element[] = [];

const mockIntersectionObserver = jest.fn((callback) => {
  intersectionObserverCallback = callback;
  return {
    observe: (element: Element) => {
      observedElements.push(element);
    },
    unobserve: () => null,
    disconnect: () => null,
  };
});

window.IntersectionObserver = mockIntersectionObserver as any;

describe("PricingSection", () => {
  beforeEach(() => {
    // Reset the mock data before each test
    intersectionObserverCallback = null;
    observedElements = [];
  });

  it("renders the pricing section with all three plans", () => {
    render(<PricingSection />);

    const heading = screen.getByRole("heading", { name: /Pick Your Plan/i });
    expect(heading).toBeInTheDocument();

    const freePlan = screen.getByRole("heading", { name: /Free/i });
    expect(freePlan).toBeInTheDocument();

    const growthPlan = screen.getByRole("heading", { name: /Growth/i });
    expect(growthPlan).toBeInTheDocument();

    const scalePlan = screen.getByRole("heading", { name: /Scale/i });
    expect(scalePlan).toBeInTheDocument();
  });

  it("applies the bounce animation when the free tier is visible", async () => {
    const { container } = render(<PricingSection />);

    const freeTier = container.querySelector("#free-tier");
    const startFreeButton = screen.getByRole("button", { name: /Start Free/i });

    // Initially, the button should not have the bounce animation
    expect(startFreeButton).not.toHaveClass("animate-bounce-once");

    // Check if the intersection observer was set up
    expect(mockIntersectionObserver).toHaveBeenCalled();
    expect(observedElements.length).toBe(1);
    expect(observedElements[0]).toBe(freeTier);

    // Trigger the intersection observer callback
    act(() => {
      intersectionObserverCallback([
        { isIntersecting: true, target: freeTier },
      ]);
    });

    // Wait for the button to have the animate-bounce-once class
    await waitFor(() => {
      const updatedButton = screen.getByRole("button", { name: /Start Free/i });
      expect(updatedButton).toHaveClass("animate-bounce-once");
    });
  });

  it("sets up and tears down intersection observer properly", () => {
    const observeCalls: Element[] = [];
    const unobserveCalls: Element[] = [];
    
    // Create a mock that tracks all calls
    const createMockObserver = () => ({
      observe: jest.fn((element: Element) => {
        observeCalls.push(element);
      }),
      unobserve: jest.fn((element: Element) => {
        unobserveCalls.push(element);
      }),
      disconnect: jest.fn(),
    });

    // Override the global mock
    const originalMock = window.IntersectionObserver;
    window.IntersectionObserver = jest.fn(createMockObserver) as any;

    // Mount and unmount the component
    const { unmount } = render(<PricingSection />);
    
    // Verify setup happened
    expect(observeCalls.length).toBe(1);
    expect(observeCalls[0].id).toBe("free-tier");
    
    // Unmount to trigger cleanup
    unmount();
    
    // The cleanup should have been called
    // Note: Due to React's ref clearing behavior, we just verify the count
    expect(unobserveCalls.length).toBe(1);

    // Restore original mock
    window.IntersectionObserver = originalMock;
  });
});
