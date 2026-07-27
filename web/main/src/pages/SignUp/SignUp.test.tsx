import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import SignUp from "./SignUp";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../components/layout/AuthLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("../../components/branding/CareConnectLogo", () => ({
  default: () => <div data-testid="care-connect-logo">Logo</div>,
}));

describe("SignUp Page Component", () => {
  it("renders heading and branding", () => {
    render(<SignUp />);
    expect(screen.getByTestId("care-connect-logo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: /create account/i })).toBeInTheDocument();
  });

  it("renders all input fields", () => {
    render(<SignUp />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it("renders create account button", () => {
    render(<SignUp />);
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("renders sign in link", () => {
    render(<SignUp />);
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });

  it("navigates to login when sign in clicked", async () => {
    const user = userEvent.setup();
    render(<SignUp />);
    await user.click(screen.getByRole("button", { name: /sign in/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
