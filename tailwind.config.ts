import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#070d1b",
        card: "#0c1428",
        border: "#1a2742",
        accent: "#4f7cff",
      },
    },
  },
  plugins: [],
};

export default config;
