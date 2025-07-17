import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FAQSection from "../../components/faq-section";

describe("FAQSection", () => {
  it("renders the FAQ section with questions", () => {
    render(<FAQSection />);

    const heading = screen.getByRole("heading", {
      name: /Frequently Asked Questions/i,
    });
    expect(heading).toBeInTheDocument();

    const firstQuestion = screen.getByText("Will this slow down my site?");
    expect(firstQuestion).toBeInTheDocument();
  });

  it("toggles the answer when a question is clicked", () => {
    render(<FAQSection />);

    const question = screen.getByText("Will this slow down my site?");
    fireEvent.click(question);

    const answer = screen.getByText(/< 30 kB script/);
    expect(answer).toBeInTheDocument();

    fireEvent.click(question);
    expect(answer).not.toBeInTheDocument();
  });

  it("applies animation styles correctly for open and closed items", () => {
    const { container } = render(<FAQSection />);

    // Get multiple FAQ questions
    const firstQuestion = screen.getByText("Will this slow down my site?");
    const secondQuestion = screen.getByText("Can I turn off the AI at night?");
    
    // Click the first question to open it
    fireEvent.click(firstQuestion);

    // The answer section should appear with animation
    const firstAnswer = container.querySelector("#faq-answer-site-speed");
    expect(firstAnswer).toBeInTheDocument();
    
    // Find the animated div within the answer - it's the one with inline style
    const animatedDiv = firstAnswer?.querySelector('div[style]');
    expect(animatedDiv).toHaveStyle({
      animation: "slideInFromLeft 0.5s ease-out",
    });

    // Now click the second question
    fireEvent.click(secondQuestion);
    
    // The second answer should have animation
    const secondAnswer = container.querySelector("#faq-answer-turn-off-ai");
    expect(secondAnswer).toBeInTheDocument();
    const secondAnimatedDiv = secondAnswer?.querySelector('div[style]');
    expect(secondAnimatedDiv).toHaveStyle({
      animation: "slideInFromLeft 0.5s ease-out",
    });

    // Close the first question
    fireEvent.click(firstQuestion);
    
    // The first answer should no longer be in the document
    expect(container.querySelector("#faq-answer-site-speed")).not.toBeInTheDocument();
    
    // But the second should still be open with animation
    expect(container.querySelector("#faq-answer-turn-off-ai")).toBeInTheDocument();
    
    // Test the branch where animation is "none" - click to close second question then check a new one
    fireEvent.click(secondQuestion);
    
    // Open third question to verify the animation style is correctly applied to new items
    const thirdQuestion = screen.getByText("How is my store data protected?");
    fireEvent.click(thirdQuestion);
    
    const thirdAnswer = container.querySelector("#faq-answer-data-security");
    const thirdAnimatedDiv = thirdAnswer?.querySelector('div[style]');
    expect(thirdAnimatedDiv).toHaveStyle({
      animation: "slideInFromLeft 0.5s ease-out",
    });
  });
});
