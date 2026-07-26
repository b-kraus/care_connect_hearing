// src/pages/Emergency/Emergency.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Emergency from "./Emergency";

// Mock DashboardLayout to render children cleanly
vi.mock("../../components/layout/DashboardLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("Emergency Page Component", () => {
  it("renders page header and warning descriptions", () => {
    render(<Emergency />);

    expect(
      screen.getByRole("heading", { level: 1, name: /emergency sos/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/send an emergency alert to your configured contacts/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: /emergency alert ready/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/only use this feature when immediate assistance is needed/i)
    ).toBeInTheDocument();
  });

  it("renders the primary emergency action button", () => {
    render(<Emergency />);

    const alertButton = screen.getByRole("button", {
      name: /send emergency alert/i,
    });

    expect(alertButton).toBeInTheDocument();
    expect(alertButton).toBeEnabled();
  });

  it("allows clicking the Send Emergency Alert button", async () => {
    const user = userEvent.setup();
    render(<Emergency />);

    const alertButton = screen.getByRole("button", {
      name: /send emergency alert/i,
    });

    // Simulates user clicking the emergency alert button
    await user.click(alertButton);
    expect(alertButton).toBeInTheDocument();
  });
});