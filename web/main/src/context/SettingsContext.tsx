import { useEffect, useState, type ReactNode } from "react";

import { SettingsContext } from "./settings-context";

type SettingsProviderProps = {
  children: ReactNode;
};

type StoredSettings = {
  flashSpeed: number;
  textSize: number;
  highContrast: boolean;
};

const defaultSettings: StoredSettings = {
  flashSpeed: 3,
  textSize: 3,
  highContrast: true,
};

function loadStoredSettings(): StoredSettings {
  try {
    const storedSettings = localStorage.getItem("settings");

    if (!storedSettings) {
      return defaultSettings;
    }

    const parsedSettings = JSON.parse(
      storedSettings
    ) as Partial<StoredSettings>;

    return {
      flashSpeed:
        typeof parsedSettings.flashSpeed === "number"
          ? parsedSettings.flashSpeed
          : defaultSettings.flashSpeed,

      textSize:
        typeof parsedSettings.textSize === "number"
          ? parsedSettings.textSize
          : defaultSettings.textSize,

      highContrast:
        typeof parsedSettings.highContrast === "boolean"
          ? parsedSettings.highContrast
          : defaultSettings.highContrast,
    };
  } catch {
    return defaultSettings;
  }
}

export function SettingsProvider({
  children,
}: SettingsProviderProps) {
  const [initialSettings] = useState(loadStoredSettings);

  const [flashSpeed, setFlashSpeed] = useState(
    initialSettings.flashSpeed
  );

  const [textSize, setTextSize] = useState(
    initialSettings.textSize
  );

  const [highContrast, setHighContrast] = useState(
    initialSettings.highContrast
  );

  useEffect(() => {
  localStorage.setItem(
    "settings",
    JSON.stringify({
      flashSpeed,
      textSize,
      highContrast,
    })
  );
  }, [flashSpeed, textSize, highContrast]);

  useEffect(() => {
  const rootFontSizes: Record<number, string> = {
    1: "14px",
    2: "16px",
    3: "18px",
    4: "20px",
    5: "22px",
  };

  document.documentElement.style.fontSize =
    rootFontSizes[textSize] ?? rootFontSizes[3];
  }, [textSize]);

  useEffect(() => {
  document.documentElement.classList.toggle(
    "high-contrast",
    highContrast
  );
}, [highContrast]);

  return (
    <SettingsContext.Provider
      value={{
        flashSpeed,
        setFlashSpeed,
        textSize,
        setTextSize,
        highContrast,
        setHighContrast,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}