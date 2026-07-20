import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names and intelligently merges conflicting Tailwind classes.
 *
 * Example:
 * cn("p-4", isActive && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}