/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",       // Primary Blue
        accent: "#DBEAFE",        // Light Accent
        navy: "#1E3A5F",          // Dark Text / Primary Navy
        card: "#F8FAFC",          // Card BG
        neutralBorder: "#E2E8F0", // Tonal Layering Outline
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Geist", "monospace"],
      },
      borderRadius: {
        'four': '0.25rem', // ROUND_FOUR
      }
    },
  },
  plugins: [],
}
