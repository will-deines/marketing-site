import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClosingCTA from "../../components/closing-cta";

describe("ClosingCTA", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the closing CTA with the correct text and links", () => {
    render(<ClosingCTA />);

    const heading = screen.getByRole("heading", {
      name: /Your Customers Are Waiting/i,
    });
    expect(heading).toBeInTheDocument();

    const addToShopifyLink = screen.getByRole("link", {
      name: /Add to Shopify/i,
    });
    expect(addToShopifyLink).toBeInTheDocument();
    expect(addToShopifyLink).toHaveAttribute(
      "href",
      "https://apps.shopify.com/garrio",
    );

    const signInLink = screen.getByRole("link", { name: /Sign in/i });
    expect(signInLink).toBeInTheDocument();
  });

  it("applies the pulsing animation every 8 seconds", () => {
    render(<ClosingCTA />);

    const button = screen.getByRole("link", { name: /Add to Shopify/i });
    expect(button).not.toHaveClass("animate-pulse-once");

    act(() => {
      jest.advanceTimersByTime(8000);
    });

    expect(button).toHaveClass("animate-pulse-once");

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(button).not.toHaveClass("animate-pulse-once");
  });
});
