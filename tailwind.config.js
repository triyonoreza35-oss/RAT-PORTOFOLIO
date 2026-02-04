/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
    screens: {
      xs: "360px",   // Android kecil (360×800)
      sm: "375px",   // iPhone X / XS
      md: "768px",   // Tablet
      lg: "1024px",  // Laptop
      xl: "1280px",  // Desktop besar
    },
      colors: {
        primary: "#A78BFA", // konsisten dengan aksen ungu Anda
      },
    },
  },
  plugins: [],
};
