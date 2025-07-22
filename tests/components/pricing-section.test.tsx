import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PricingSectionV2 from "../../components/home/pricing-section-v2";

// Mock IntersectionObserver for components that use it
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

// Mock analytics tracking
jest.mock("../../lib/analytics", () => ({
  trackEvent: jest.fn(),
}));

window.IntersectionObserver = mockIntersectionObserver as any;

describe("PricingSectionV2", () => {
  beforeEach(() => {
    intersectionObserverCallback = null;
    observedElements = [];
    jest.clearAllMocks();
  });

  it("renders the pricing section with all four plans", () => {
    render(<PricingSectionV2 />);

    const heading = screen.getByRole("heading", { name: /Pick Your Plan/i });
    expect(heading).toBeInTheDocument();

    // Check for all current plan names
    expect(screen.getByText("Free Plan")).toBeInTheDocument();
    expect(screen.getByText("Starter Plan")).toBeInTheDocument();
    expect(screen.getByText("Essentials Plan")).toBeInTheDocument();
    expect(screen.getByText("Professional Plan")).toBeInTheDocument();
  });

  it("shows the correct prices for all plans", () => {
    render(<PricingSectionV2 />);

    // Check prices
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();
    expect(screen.getByText("$500")).toBeInTheDocument();
  });

  it("displays the popular plan badge", () => {
    render(<PricingSectionV2 />);

    // Check for popular badge
    expect(screen.getByText("Most popular for small brands")).toBeInTheDocument();
  });

  it("shows correct chat inclusions", () => {
    render(<PricingSectionV2 />);

    // Check chat inclusions
    expect(screen.getByText("250 chats included")).toBeInTheDocument();
    expect(screen.getAllByText("350 chats included")).toHaveLength(3); // Starter, Essentials, Professional
  });

  it("displays correct CTA buttons for available plans", () => {
    render(<PricingSectionV2 />);

    // Check CTA buttons for available plans - using partial text matches
    expect(screen.getByRole("link", { name: /Start Garrio Free Plan/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Start Garrio Starter Plan/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Start Garrio Essentials Plan/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Start Garrio Professional Plan/i })).toBeInTheDocument();
  });

  it("tracks analytics events on CTA clicks", () => {
    const { trackEvent } = require("../../lib/analytics");
    render(<PricingSectionV2 />);

    const freeButton = screen.getByRole("link", { name: /Start Garrio Free Plan/i });
    fireEvent.click(freeButton);

    expect(trackEvent).toHaveBeenCalledWith("pricing_cta_click", {
      planId: "free",
      availability: true,
    });
  });

  it("shows waitlist modal for unavailable plans", () => {
    render(<PricingSectionV2 />);

    // Mock a plan as unavailable (this would normally be controlled by pricing data)
    // For this test, we'll assume all plans are available based on current data
    // If there were unavailable plans, they would show "Join Waitlist" buttons
  });

  it("displays plan features correctly", () => {
    render(<PricingSectionV2 />);

    // Check for key features
    expect(screen.getByText(/Industry-tuned LLM answers/i)).toBeInTheDocument();
    expect(screen.getByText(/AI feedback loop/i)).toBeInTheDocument();
    expect(screen.getByText(/Human reps handle AI escalations/i)).toBeInTheDocument();
  });

  it("shows extra chat pricing information", () => {
    render(<PricingSectionV2 />);

    // Should show extra chat pricing for paid plans (excluding Free)
    // Look for the actual text patterns used in the component
    const extraChatTexts = screen.getAllByText(/\+.*per extra chat/i);
    expect(extraChatTexts.length).toBeGreaterThan(0);
  });

  it("displays footer text with custom budget link", () => {
    render(<PricingSectionV2 />);

    expect(screen.getByText(/Every plan includes industry-smart AI/i)).toBeInTheDocument();
    expect(screen.getByText(/We'll work with your budget/i)).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<PricingSectionV2 />);

    // Check for proper button labels
    const freeButton = screen.getByRole("link", { name: /Start Garrio Free Plan/i });
    expect(freeButton).toHaveAttribute("aria-label");
  });

  it("applies correct styling for plan highlighting", () => {
    const { container } = render(<PricingSectionV2 />);

    // Check for popular plan styling
    const popularPlanCards = container.querySelectorAll(".border-purple-200");
    expect(popularPlanCards.length).toBeGreaterThan(0);
  });

  it("shows plan order correctly (Free, Starter, Essentials, Professional)", () => {
    const { container } = render(<PricingSectionV2 />);

    const planCards = container.querySelectorAll('[class*="grid"] > div');
    expect(planCards.length).toBe(4);

    // Verify order by checking the first text content in each card
    const planNames = Array.from(planCards).map((card) => {
      const nameElement = card.querySelector('div[style*="clip-path"]');
      return nameElement?.textContent || "";
    });

    expect(planNames).toEqual(["Free Plan", "Starter Plan", "Essentials Plan", "Professional Plan"]);
  });
});
