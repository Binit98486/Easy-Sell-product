import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   extend:{
    colors:{
      gray:{
        951:"#f4ee5",
        952:"#222",
        953:"#E9E4DB"

      },
      green:{
        951:"#9CAE96"
      }
    }
   }
  },
  plugins: [],
};
export default config;
