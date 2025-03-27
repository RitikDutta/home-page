// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {
       // Add custom theme extensions here if needed later
       // For the radial gradients used in your code:
       backgroundImage: {
         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
       }
    },
  },
  plugins: [],
}