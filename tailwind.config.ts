import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#E8EDF6",
          100: "#C5D0EA",
          200: "#9EAFDB",
          300: "#778ECC",
          400: "#5A75C1",
          500: "#3D5CB6",
          600: "#3751A7",
          700: "#2D4393",
          800: "#1E3A8A",
          900: "#142C6B",
          950: "#0B1F4D",
        },
        forest: {
          50:  "#EEF6F0",
          100: "#D5EBD9",
          200: "#A9D4B1",
          300: "#7ABD87",
          400: "#4EA362",
          500: "#2E8B45",
          600: "#237238",
          700: "#1A5A2C",
          800: "#124020",
          900: "#0C2D16",
          950: "#071A0D",
        },
        brand: "#F98C0F",
        "brand-light": "#FDBA74",
        "brand-dark": "#D97706",
      },
      fontFamily: {
        head: ["var(--font-head)"],
        body: ["var(--font-body)"],
      },
      animation: {
        "ken-burns": "kenBurns 12s ease-in-out infinite alternate",
        "float-chip": "floatChip 6s ease-in-out infinite",
        "float-chip-delay": "floatChip 6s ease-in-out 2s infinite",
        "float-chip-delay2": "floatChip 6s ease-in-out 4s infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
      },
      keyframes: {
        kenBurns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" },
        },
        floatChip: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(249,140,15,0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(249,140,15,0.3)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
