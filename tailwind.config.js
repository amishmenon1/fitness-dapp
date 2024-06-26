import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-20": "#EDEDED",
        "gray-50": "#EFE6E6",
        "primary-100": "#A9A9A9",
        "primary-500": "#5E0000",
        "secondary-400": "#FFCD58",
        "secondary-500": "#FFC132",
        "footer-100": "#B5946F",
      },
      backgroundImage: () => ({
        "gradient-yellowred":
          "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
        servicesBg: "url('./assets/services-bg-2.jpg')",
        dumbbellBg: "url('./src/assets/bg-1.jpeg')",
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        cursive: ["Cursive", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        imFell: ["IM Fell Double Pica SC", "serif"],
        ebGaramond: ["EB Garamond", "serif"],
      },
      content: {
        dumbbellPic: "url('./src/assets/bg-1.jpeg')",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
});
