/**
 * Spacing and sizing tokens for the design system.
 * Follows a 4-point grid system used throughout the app.
 */

export const spacing = {
  /** 2px */
  xxs: 2,
  /** 4px */
  xs: 4,
  /** 8px */
  sm: 8,
  /** 12px */
  md: 12,
  /** 16px */
  lg: 16,
  /** 20px */
  xl: 20,
  /** 24px */
  "2xl": 24,
  /** 32px */
  "3xl": 32,
  /** 40px */
  "4xl": 40,
  /** 48px */
  "5xl": 48,
  /** 56px */
  "6xl": 56,
  /** 64px */
  "7xl": 64,
  /** 80px */
  "8xl": 80,
  /** 96px */
  "9xl": 96,
} as const;

/**
 * Border radius tokens matching the design system.
 */
export const borderRadius = {
  /** 4px */
  sm: 4,
  /** 8px */
  md: 8,
  /** 12px */
  lg: 12,
  /** 16px */
  xl: 16,
  /** 20px */
  "2xl": 20,
  /** 24px */
  "3xl": 24,
  /** Full (circular) */
  full: 9999,
} as const;
