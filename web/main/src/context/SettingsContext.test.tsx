import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { useSettings } from "../hooks/useSettings";
import { SettingsProvider } from "./SettingsContext";

function SettingsConsumer() {
  const {
    flashSpeed,
    setFlashSpeed,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
  } = useSettings();

  return (
    <div>
      <p>Flash Speed: {flashSpeed}</p>
      <p>Text Size: {textSize}</p>
      <p>High Contrast: {highContrast ? "Enabled" : "Disabled"}</p>

      <button onClick={() => setFlashSpeed(5)}>
        Set Flash Speed
      </button>

      <button onClick={() => setTextSize(5)}>
        Set Text Size
      </button>

      <button onClick={() => setHighContrast(false)}>
        Disable High Contrast
      </button>
    </div>
  );
}

function renderProvider() {
  return render(
    <SettingsProvider>
      <SettingsConsumer />
    </SettingsProvider>
  );
}

describe("SettingsProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.fontSize = "";
    document.documentElement.classList.remove("high-contrast");
  });

  it("loads saved settings from localStorage", () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        flashSpeed: 4,
        textSize: 2,
        highContrast: false,
      })
    );

    renderProvider();

    expect(screen.getByText("Flash Speed: 4")).toBeInTheDocument();
    expect(screen.getByText("Text Size: 2")).toBeInTheDocument();
    expect(
      screen.getByText("High Contrast: Disabled")
    ).toBeInTheDocument();

    expect(document.documentElement.style.fontSize).toBe("16px");
    expect(document.documentElement).not.toHaveClass("high-contrast");
  });

  it("automatically saves setting changes to localStorage", async () => {
    const user = userEvent.setup();

    renderProvider();

    await user.click(
      screen.getByRole("button", {
        name: "Set Flash Speed",
      })
    );

    await user.click(
      screen.getByRole("button", {
        name: "Set Text Size",
      })
    );

    await user.click(
      screen.getByRole("button", {
        name: "Disable High Contrast",
      })
    );

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("settings") ?? "{}")).toEqual({
        flashSpeed: 5,
        textSize: 5,
        highContrast: false,
      });
    });

    expect(document.documentElement.style.fontSize).toBe("22px");
    expect(document.documentElement).not.toHaveClass("high-contrast");
  });

  it("uses default settings when stored data is invalid", () => {
    localStorage.setItem("settings", "invalid-json");

    renderProvider();

    expect(screen.getByText("Flash Speed: 3")).toBeInTheDocument();
    expect(screen.getByText("Text Size: 3")).toBeInTheDocument();
    expect(
      screen.getByText("High Contrast: Enabled")
    ).toBeInTheDocument();

    expect(document.documentElement.style.fontSize).toBe("18px");
    expect(document.documentElement).toHaveClass("high-contrast");
  });
});