/**
 * Typography tokens for the design system.
 * Uses Poppins font family as provided in assets/fonts/.
 */

export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

/**
 * Font size scale (in points / dp).
 * Matches the typography hierarchy from the design reference.
 */
export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
  "5xl": 40,
  "6xl": 48,
} as const;

/**
 * Line height multipliers relative to font size.
 */
export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;
