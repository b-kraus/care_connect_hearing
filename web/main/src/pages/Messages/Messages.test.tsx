// src/pages/Messages/Messages.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Messages from "./Messages";

// Mock DashboardLayout to render children cleanly
vi.mock("../../components/layout/DashboardLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("Messages Page Component", () => {
  it("renders page title and subtitle", () => {
    render(<Messages />);

    expect(
      screen.getByRole("heading", { level: 1, name: /messages/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/speech-to-text conversations for hearing-loss users/i)
    ).toBeInTheDocument();
  });

  it("renders conversation list items with explicit aria-labels", () => {
    render(<Messages />);

    expect(
      screen.getByRole("button", { name: /message from dr. martinez/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /message from care support line/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /message from mom/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /message from audiology clinic/i })
    ).toBeInTheDocument();
  });

  it("displays default prompt state when no conversation is selected and not listening", () => {
    render(<Messages />);

    expect(
      screen.getByText("Select a conversation to view.")
    ).toBeInTheDocument();
    expect(screen.getByText("Idle")).toBeInTheDocument();
  });

  it("updates prompt state when a conversation is selected", async () => {
    const user = userEvent.setup();
    render(<Messages />);

    const drMartinezConv = screen.getByRole("button", {
      name: /message from dr. martinez/i,
    });
    await user.click(drMartinezConv);

    expect(
      screen.getByText("Select a conversation and press Start Listening.")
    ).toBeInTheDocument();
  });

  it("toggles listening state on and off via microphone control buttons", async () => {
    const user = userEvent.setup();
    render(<Messages />);

    const startBtn = screen.getByRole("button", { name: /start listening/i });
    const stopBtn = screen.getByRole("button", { name: /stop listening/i });

    // Start Listening
    await user.click(startBtn);

    expect(
      screen.getByText("Listening... transcribed text will appear here.")
    ).toBeInTheDocument();
    expect(screen.getByText("Listening...")).toBeInTheDocument();

    // Stop Listening
    await user.click(stopBtn);

    expect(screen.getByText("Idle")).toBeInTheDocument();
  });
});