import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Emergency from "./Emergency";

// Mock react-router-dom's useNavigate hook
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Emergency Page Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders pre-confirmation header, warnings, and slider control", () => {
    render(<Emergency />);

    // Check header heading
    expect(
      screen.getByRole("heading", { level: 1, name: /send emergency alert\?/i })
    ).toBeInTheDocument();

    // Check warning text
    expect(
      screen.getByText(
        /emergency contacts and local services will be notified immediately/i
      )
    ).toBeInTheDocument();

    // Check status badge
    expect(screen.getByText(/awaiting confirmation/i)).toBeInTheDocument();

    // Check slider accessibility element
    const slider = screen.getByRole("slider", {
      name: /slide right to send emergency alert/i,
    });
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuenow", "0");
  });

  it("triggers SOS activation state when slider is moved to >= 95%", () => {
    render(<Emergency />);

    const slider = screen.getByRole("slider", {
      name: /slide right to send emergency alert/i,
    });

    // Mock clientWidth on the track wrapper to enable offset calculations
    const sliderTrack = slider.parentElement as HTMLElement;
    vi.spyOn(sliderTrack, "clientWidth", "get").mockReturnValue(300);
    vi.spyOn(sliderTrack, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      right: 300,
      bottom: 76,
      width: 300,
      height: 76,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Start drag interaction
    fireEvent.mouseDown(slider);

    // Simulate drag event across track reaching past the threshold
    fireEvent.mouseMove(window, { clientX: 290 });

    // Verify post-transmission state displays
    expect(
      screen.getByRole("heading", { level: 1, name: /sos alert sent/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/confirmed — alert transmitted/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/help is on the way/i)
    ).toBeInTheDocument();
  });

  it("navigates to /home when Cancel or Close buttons are clicked", () => {
    render(<Emergency />);

    const cancelButton = screen.getByRole("button", { name: /cancel action/i });
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith("/home");

    const closeButton = screen.getByRole("button", {
      name: /close emergency panel/i,
    });
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  it("invokes custom onClose callback instead of default navigation when provided", () => {
    const handleClose = vi.fn();
    render(<Emergency onClose={handleClose} />);

    const cancelButton = screen.getByRole("button", { name: /cancel action/i });
    fireEvent.click(cancelButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});