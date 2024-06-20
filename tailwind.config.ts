import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kavoon: ["Kavoon", "serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      backgroundImage: {
        'hero-pattern': "url('/hero.svg')",
        'properties-texture': "url('/stacked-steps-haikei.svg')",
      },
      colors: {
        ebonyClay: '#222831',
        tuna: '#31363F',
        gulfStream: '#76ABAE',
        gallery: '#EEEEEE'
      }
    },
  },
  plugins: [],
};
export default config;
