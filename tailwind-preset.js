/**
 * Shared Tailwind preset for all SJ Hamill internal frontends.
 *
 * Consumers extend this in their own tailwind.config.js so the brand palette,
 * border radius, and animation plugin stay identical across apps. App-specific
 * additions (e.g. extra content paths, custom plugins) layer on top.
 *
 *   // tailwind.config.js in a consumer app
 *   import sjhamillPreset from "@sjhamill/ui/tailwind-preset";
 *
 *   export default {
 *     presets: [sjhamillPreset],
 *     content: [
 *       "./index.html",
 *       "./src/**\/*.{ts,tsx}",
 *       // Include the shared package so its component classes get scanned:
 *       "./node_modules/@sjhamill/ui/src/**\/*.{ts,tsx}",
 *     ],
 *   };
 *
 * CSS variables live in src/styles/globals.css — import that file once
 * (typically from src/main.tsx) to load the brand palette.
 */

/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
