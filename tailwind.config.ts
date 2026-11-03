import type { Config } from "tailwindcss"
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
}
export default config
