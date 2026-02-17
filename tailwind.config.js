const { heroui } = require("@heroui/theme");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: "#0ea5e9",
            foreground: "#0f172a",
            background: "#ffffff",
          },
        },
        dark: {
          colors: {
            primary: "#38bdf8",
            foreground: "#f8fafc",
            background: "#0f172a",
          },
        },
      },
    }),
  ],
};
