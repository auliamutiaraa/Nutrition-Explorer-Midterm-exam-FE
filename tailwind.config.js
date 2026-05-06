/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        leaf: {
          50: "#effaf2",
          100: "#d9f2df",
          500: "#41a867",
          600: "#2f8b52",
          700: "#256f43",
        },
        mist: {
          50: "#f4fbff",
          100: "#dceff8",
          500: "#4d9fc4",
          700: "#236987",
        },
        berry: "#d95772",
        citrus: "#f5b84c",
        ink: "#173042",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(31, 82, 69, 0.13)",
        lift: "0 24px 60px rgba(23, 48, 66, 0.18)",
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
