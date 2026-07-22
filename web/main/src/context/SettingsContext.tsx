import { useState, type ReactNode } from "react";

import { SettingsContext } from "./settings-context";

type SettingsProviderProps = {
  children: ReactNode;
};

export function SettingsProvider({
  children,
}: SettingsProviderProps) {
  const [flashSpeed, setFlashSpeed] = useState(3);
  const [textSize, setTextSize] = useState(3);
  const [highContrast, setHighContrast] = useState(true);

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