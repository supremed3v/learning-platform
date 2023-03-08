/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#483285",
        secondary: "#1b262c",
        tertiary: "#0f4c75",
        quaternary: "#3282b8",
      },
      boxShadow: {
        card: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      },
      screens: {
        xs: "480px",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      display: ["Oswald", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
  },
  plugins: [],
};

// #483285
