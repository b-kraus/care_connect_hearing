// src/pages/Welcome/Welcome.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Welcome from "./Welcome";

describe("Welcome Page Component", () => {
  it("renders app branding and main title correctly", () => {
    render(<Welcome />);

    expect(screen.getByText("CareConnect Hearing")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /form design system/i })
    ).toBeInTheDocument();
  });

  it("renders all TextField components with appropriate labels and placeholders", () => {
    render(<Welcome />);

    // Email field
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("name@example.com")).toBeInTheDocument();
    expect(
      screen.getByText("We will never share your email.")
    ).toBeInTheDocument();

    // Search field
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search messages")).toBeInTheDocument();

    // Password field
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getByText("Password is required.")).toBeInTheDocument();

    // Disabled field
    const disabledInput = screen.getByLabelText(/disabled field/i);
    expect(disabledInput).toBeInTheDocument();
    expect(disabledInput).toBeDisabled();
  });

  it("renders the primary action button", () => {
    render(<Welcome />);

    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).toBeInTheDocument();
    expect(continueButton).not.toBeDisabled();
  });

  it("allows user interactions on active text fields", async () => {
    const user = userEvent.setup();
    render(<Welcome />);

    const emailInput = screen.getByLabelText(/email address/i);
    const searchInput = screen.getByLabelText(/search/i);

    await user.type(emailInput, "test@example.com");
    await user.type(searchInput, "Doctor appointments");

    expect(emailInput).toHaveValue("test@example.com");
    expect(searchInput).toHaveValue("Doctor appointments");
  });
});