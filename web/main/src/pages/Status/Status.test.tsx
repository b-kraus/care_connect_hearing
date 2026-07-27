import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Status from "./Status";

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

describe("Status Page Component", () => {
  it("renders heading and branding", () => {
    render(<Status />);
    expect(screen.getByTestId("care-connect-logo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders all status items", () => {
    render(<Status />);
    expect(screen.getByText("Network Connection")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
    expect(screen.getByText("Alert System")).toBeInTheDocument();
    expect(screen.getByText("Speech-to-Text")).toBeInTheDocument();
  });

  it("renders status values", () => {
    render(<Status />);
    expect(screen.getByText("Connected")).toBeInTheDocument();
    expect(screen.getByText("Encrypted")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Ready")).toBeInTheDocument();
  });

  it("renders continue button", () => {
    render(<Status />);
    expect(screen.getByRole("button", { name: /continue to dashboard/i })).toBeInTheDocument();
  });

  it("navigates to home on continue click", async () => {
    const user = userEvent.setup();
    render(<Status />);

    await user.click(screen.getByRole("button", { name: /continue to dashboard/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });
});
