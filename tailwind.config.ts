// tailwind.config.js
import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        padding: "18px",
        center: true,
        screens: {
          lg: "1024px",
          xl: "1024px",
        }
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({}),
  ],
} satisfies Config;
