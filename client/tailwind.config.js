/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // SECTION 1
        primary: ["Poppins", "sans-serif"],
        secondary: ["Montserrat", "sans-serif"],
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        mxl: "820px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
        xxl: "1440px",
        xxxl: "1535px",
      },
      colors: {
        // SECTION 1
        primary: "#3DB54A",
        secondary: "#094028",
        ternary: "#27323F",
        lblack: "#222222",
        quadra: "#808080",
      },
    },
  },
  plugins: [],
};
