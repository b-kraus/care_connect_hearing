import { createContext } from "react";

export type SettingsContextType = {
  flashSpeed: number;
  setFlashSpeed: (value: number) => void;
  textSize: number;
  setTextSize: (value: number) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
};

export const SettingsContext =
  createContext<SettingsContextType | undefined>(undefined);