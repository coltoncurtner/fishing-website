import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          DEFAULT: "#0B3D45",
          50: "#E6F0F1",
          100: "#C2DBDE",
          700: "#0B3D45",
          800: "#082E34",
          900: "#051F23",
        },
        tide: {
          DEFAULT: "#1E6E7A",
          light: "#3A8E9B",
        },
        kelp: {
          DEFAULT: "#3FA34D",
          dark: "#2E7D39",
          light: "#5CC06B",
        },
        sand: "#E9E1D2",
        shell: "#FAF8F3",
        ink: "#16201F",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,32,31,0.04), 0 8px 24px rgba(16,32,31,0.08)",
        lift: "0 12px 40px rgba(11,61,69,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "slide-in": "slide-in 0.3s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
