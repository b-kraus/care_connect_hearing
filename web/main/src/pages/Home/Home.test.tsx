// src/pages/Home/Home.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Home from "./Home";

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock DashboardLayout to render children cleanly
vi.mock("../../components/layout/DashboardLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock DashboardCard to verify props and simulate click handling
vi.mock("../../components/dashboard/DashboardCard", () => ({
  default: ({
    title,
    description,
    status,
    onClick,
  }: {
    title: string;
    description: string;
    status: string;
    onClick: () => void;
  }) => (
    <div data-testid={`dashboard-card-${title}`} onClick={onClick}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{status}</span>
    </div>
  ),
}));

describe("Home Page Component", () => {
  it("renders welcome header and description", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: /welcome back!/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Quick access to alerts, messages, and settings.")
    ).toBeInTheDocument();
  });

  it("renders all four dashboard cards with their respective information", () => {
    render(<Home />);

    expect(screen.getByText("Active Alerts")).toBeInTheDocument();
    expect(screen.getByText("Monitor real-time alerts")).toBeInTheDocument();

    expect(screen.getByText("Messages")).toBeInTheDocument();
    expect(screen.getByText("Speech-to-text transcription")).toBeInTheDocument();

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Accessibility preferences")).toBeInTheDocument();

    expect(screen.getByText("Emergency SOS")).toBeInTheDocument();
    expect(screen.getByText("Send emergency alert")).toBeInTheDocument();
  });

  it("navigates to /alerts when Active Alerts card is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const alertCard = screen.getByTestId("dashboard-card-Active Alerts");
    await user.click(alertCard);

    expect(mockNavigate).toHaveBeenCalledWith("/alerts");
  });

  it("navigates to /messages when Messages card is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const messagesCard = screen.getByTestId("dashboard-card-Messages");
    await user.click(messagesCard);

    expect(mockNavigate).toHaveBeenCalledWith("/messages");
  });

  it("navigates to /settings when Settings card is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const settingsCard = screen.getByTestId("dashboard-card-Settings");
    await user.click(settingsCard);

    expect(mockNavigate).toHaveBeenCalledWith("/settings");
  });

  it("navigates to /emergency when Emergency SOS card is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const emergencyCard = screen.getByTestId("dashboard-card-Emergency SOS");
    await user.click(emergencyCard);

    expect(mockNavigate).toHaveBeenCalledWith("/emergency");
  });
});