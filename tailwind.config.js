/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        leaf: {
          50: "#fff1f7",
          100: "#fce1ee",
          500: "#e01f78",
          600: "#db2777",
          700: "#be185d",
        },
        mist: {
          50: "#fff7fb",
          100: "#f8c9df",
          500: "#f472b6",
          700: "#ec4899",
        },
        herb: {
          50: "#ecfdf3",
          100: "#d1fadf",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        berry: "#db2777",
        citrus: "#f9a8d4",
        ink: "#111827",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(190, 24, 93, 0.11)",
        lift: "0 24px 60px rgba(17, 24, 39, 0.18)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 4s ease-in-out infinite",
        fadeUp: "fadeUp 0.45s ease-out both",
      },
    },
  },
  plugins: [],
};
