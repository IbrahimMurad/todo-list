import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        checkBackground: "var(--check-background)",
        brightBlue: "var(--bright-blue)",
        headerColor: "var(--header-color)",
        bodyBackground: "var(--body-background)",
        primaryBackground: "var(--primary-background)",
        secondaryBackground: "var(--secondary-background)",
        backgroundHover: "var(--background-hover)",
        primaryText: "var(--primary-text)",
        secondaryText: "var(--secondary-text)",
        tertiaryText: "var(--tertiary-text)",
        outlinePrimary: "var(--outline-primary)",
        outlineSecondary: "var(--outline-secondary)",
        divider: "var(--divider)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
