import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Alerts from "./Alerts";

// Mock DashboardLayout to render children simply without outer layout overhead
vi.mock("../../components/layout/DashboardLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("Alerts Page Component", () => {
  it("renders page header and subtitle correctly", () => {
    render(<Alerts />);

    expect(screen.getByRole("heading", { level: 1, name: /alert history/i })).toBeInTheDocument();
    expect(screen.getByText(/view and manage your care alerts/i)).toBeInTheDocument();
  });

  it("renders all initial alert cards by default when filter is 'All'", () => {
    render(<Alerts />);

    expect(screen.getByText("Take blue pill")).toBeInTheDocument();
    expect(screen.getByText("Physical therapy session")).toBeInTheDocument();
    expect(screen.getByText("Blood pressure check")).toBeInTheDocument();
    expect(screen.getByText("Hearing aid battery change")).toBeInTheDocument();
  });

  it("renders all filter buttons with appropriate aria-labels", () => {
    render(<Alerts />);

    const filterButtons = ["All", "Active Now", "Missed", "Awaiting", "Confirmed"];
    filterButtons.forEach((filterName) => {
      expect(
        screen.getByRole("button", { name: new RegExp(`Filter by ${filterName}`, "i") })
      ).toBeInTheDocument();
    });
  });

  it("filters alert list down to only 'Missed' alerts when clicking 'Missed' filter", async () => {
    const user = userEvent.setup();
    render(<Alerts />);

    // Click on the 'Missed' filter button
    const missedFilterBtn = screen.getByRole("button", { name: /filter by missed/i });
    await user.click(missedFilterBtn);

    // Should display 'Physical therapy session'
    expect(screen.getByText("Physical therapy session")).toBeInTheDocument();

    // Should NOT display alerts with other statuses
    expect(screen.queryByText("Take blue pill")).not.toBeInTheDocument();
    expect(screen.queryByText("Blood pressure check")).not.toBeInTheDocument();
    expect(screen.queryByText("Hearing aid battery change")).not.toBeInTheDocument();
  });

  it("resets filter back to 'All' when clicking 'All' filter button", async () => {
    const user = userEvent.setup();
    render(<Alerts />);

    // Filter by 'Confirmed' first
    await user.click(screen.getByRole("button", { name: /filter by confirmed/i }));
    expect(screen.queryByText("Take blue pill")).not.toBeInTheDocument();

    // Click 'All'
    await user.click(screen.getByRole("button", { name: /filter by all/i }));

    // All items should be back in the DOM
    expect(screen.getByText("Take blue pill")).toBeInTheDocument();
    expect(screen.getByText("Physical therapy session")).toBeInTheDocument();
    expect(screen.getByText("Blood pressure check")).toBeInTheDocument();
    expect(screen.getByText("Hearing aid battery change")).toBeInTheDocument();
  });
});