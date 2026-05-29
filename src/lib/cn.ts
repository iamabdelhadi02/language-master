/**
 * Utility for merging Tailwind/NativeWind class names.
 * Combines clsx for conditional classes and tailwind-merge
 * to resolve conflicting Tailwind utilities.
 *
 * Note: NativeWind v5 applies class names at compile time,
 * so tailwind-merge is mainly useful for dynamic class
 * strings passed to className props.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
