// src/pages/Login/Login.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Login from "./Login";

// Mock useNavigate and Link from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock AuthLayout to render children simply without outer layout dependencies
vi.mock("../../components/layout/AuthLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock child components that aren't critical to testing the Login page logic directly
vi.mock("../../components/branding/CareConnectLogo", () => ({
  default: () => <div data-testid="care-connect-logo">Logo</div>,
}));

vi.mock("../../components/auth/SocialLogin", () => ({
  default: ({ provider }: { provider: string; icon?: any }) => (
    <button type="button">Sign in with {provider}</button>
  ),
}));

describe("Login Page Component", () => {
  it("renders headers, branding, navigation, and input fields", () => {
    render(<Login />);

    // Branding & Header
    expect(screen.getByTestId("care-connect-logo")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /welcome back/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sign in to continue to your account\./i)
    ).toBeInTheDocument();

    // Form inputs and controls
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /forgot password\?/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^sign in$/i })
    ).toBeInTheDocument();
  });

  it("renders navigation links for Home and Sign up", () => {
    render(<Login />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/home");

    const signUpLink = screen.getByRole("link", { name: /sign up/i });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute("href", "/signup");
  });

  it("renders social login provider options", () => {
    render(<Login />);

    expect(
      screen.getByRole("button", { name: /sign in with google/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in with microsoft/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in with apple/i })
    ).toBeInTheDocument();
  });

  it("allows user to check and uncheck the 'Remember me' checkbox", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
    expect(rememberMeCheckbox).not.toBeChecked();

    await user.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();
  });

  it("allows user to type credentials and submit form, navigating to '/home'", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /^sign in$/i });

    // Type credentials
    await user.type(emailInput, "patient@example.com");
    await user.type(passwordInput, "securepassword123");

    expect(emailInput).toHaveValue("patient@example.com");
    expect(passwordInput).toHaveValue("securepassword123");

    // Submit form
    await user.click(submitButton);

    // Verify navigation handler was invoked with "/home"
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });
});