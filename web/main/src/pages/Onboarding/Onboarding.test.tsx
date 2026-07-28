import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import OnboardingScreen from "./Onboarding";

// Mock react-router-dom's useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("OnboardingScreen Component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <OnboardingScreen />
      </MemoryRouter>
    );

  it("renders the initial slide correctly", () => {
    renderComponent();

    // Verify brand logo text
    expect(screen.getByText("CareConnect")).toBeInTheDocument();

    // Verify slide 1 content
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your all-in-one companion for personalized hearing care/i
      )
    ).toBeInTheDocument();

    // Verify button text on first slide
    expect(
      screen.getByRole("button", { name: /Continue/i })
    ).toBeInTheDocument();
  });

  it("navigates to the next slide when 'Continue' is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    const continueButton = screen.getByRole("button", { name: /Continue/i });
    await user.click(continueButton);

    // Verify slide 2 content
    expect(screen.getByText(/Real-time/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Get instant access to tools and emergency support/i
      )
    ).toBeInTheDocument();

    // Button should now say "Get Started" on the last slide
    expect(
      screen.getByRole("button", { name: /Get Started/i })
    ).toBeInTheDocument();
  });

  it("navigates to /login when clicking 'Get Started' on the last slide", async () => {
    const user = userEvent.setup();
    renderComponent();

    // Go to second slide
    const continueButton = screen.getByRole("button", { name: /Continue/i });
    await user.click(continueButton);

    // Click "Get Started"
    const getStartedButton = screen.getByRole("button", {
      name: /Get Started/i,
    });
    await user.click(getStartedButton);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("switches slides directly when progress dots are clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    // Click the second progress indicator dot
    const secondDot = screen.getByRole("button", { name: /Go to slide 2/i });
    await user.click(secondDot);

    // Check that slide 2 title is displayed
    expect(screen.getByText(/Real-time/i)).toBeInTheDocument();
  });

  it("has functional header navigation links for Home and Sign In", () => {
    renderComponent();

    const homeLink = screen.getByRole("link", { name: /Go to home screen/i });
    const signInLink = screen.getByRole("link", { name: /Sign in/i });

    expect(homeLink).toHaveAttribute("href", "/home");
    expect(signInLink).toHaveAttribute("href", "/login");
  });
});