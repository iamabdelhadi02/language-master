/**
 * Design system colors extracted from the design theme.
 * All hex values match the provided design reference exactly.
 */

export const colors = {
  // Brand primary
  brand: {
    purple: "#5238FC",
    purpleDark: "#5C3FF5",
    purpleLight: "#7B63FC",
  },

  // Accent colors
  blue: "#4087FE",
  blueDark: "#3E85FD",

  green: "#1DBB64",
  greenDark: "#20BC67",

  orange: "#FD8502",
  orangeDark: "#FD7901",

  yellow: "#FEC104",

  red: "#FD474A",

  // Neutrals - Text
  text: {
    primary: "#0A1334",
    secondary: "#4A536B",
    tertiary: "#6B7383",
    muted: "#9599A9",
  },

  // Neutrals - Surfaces
  surface: {
    primary: "#FEFEFE",
    secondary: "#F4F4F8",
    tertiary: "#ECEDF2",
  },

  // Neutrals - Borders & dividers
  border: {
    DEFAULT: "#E6E7EB",
    light: "#D9DBE3",
  },

  white: "#FFFFFF",
  black: "#000000",
} as const;
