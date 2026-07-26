// src/pages/Settings/Settings.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Settings from "./Settings";

// Mock DashboardLayout to render children cleanly
vi.mock("../../components/layout/DashboardLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock DashboardHeader to verify title/description passing
vi.mock("../../components/dashboard/DashboardHeader", () => ({
  default: ({ title, description }: { title: string; description: string }) => (
    <header>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  ),
}));

describe("Settings Page Component", () => {
  it("renders headers and initial state settings", () => {
    render(<Settings />);

    expect(
      screen.getByRole("heading", { level: 1, name: /settings/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Customize accessibility preferences.")
    ).toBeInTheDocument();

    // Check sliders initial display values
    expect(screen.getByText("Current Speed: 3")).toBeInTheDocument();
    expect(screen.getByText("Current Size: 3")).toBeInTheDocument();
    expect(screen.getByText("Current Setting: Enabled")).toBeInTheDocument();
  });

  it("updates root font size in DOM when text size slider changes", () => {
    render(<Settings />);

    const textSizeSlider = screen.getByRole("slider", { name: /text size/i });

    // Change text size to 5 (20px according to textSizePixels map)
    fireEvent.change(textSizeSlider, { target: { value: "5" } });

    expect(screen.getByText("Current Size: 5")).toBeInTheDocument();
    expect(document.documentElement.style.fontSize).toBe("20px");
  });

  it("updates flash speed when range slider changes", () => {
    render(<Settings />);

    const flashSpeedSlider = screen.getByRole("slider", { name: /flash speed/i });

    fireEvent.change(flashSpeedSlider, { target: { value: "1" } });

    expect(screen.getByText("Current Speed: 1")).toBeInTheDocument();
  });

  it("toggles high contrast mode on and off", async () => {
    const user = userEvent.setup();
    render(<Settings />);

    const highContrastCheckbox = screen.getByRole("checkbox", {
      name: /toggle high contrast/i,
    });

    expect(highContrastCheckbox).toBeChecked();
    expect(screen.getByText("Current Setting: Enabled")).toBeInTheDocument();

    // Toggle off
    await user.click(highContrastCheckbox);

    expect(highContrastCheckbox).not.toBeChecked();
    expect(screen.getByText("Current Setting: Disabled")).toBeInTheDocument();
  });

  it("renders Save Changes action button", () => {
    render(<Settings />);

    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument();
  });
});