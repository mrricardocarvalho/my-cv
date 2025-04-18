/** @type {import('tailwindcss').Config} */
export default {
  // Configure paths to all of your template files
  content: [
    "./index.html", // Include the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include ALL JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {
      // You can add custom theme extensions here later if needed
    },
  },
  // Add the daisyUI plugin
  plugins: [
    require('daisyui'), 
    require('@tailwindcss/typography')
  ],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      "light", // Default light theme
      "dark",  // Default dark theme
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave", // Retro theme you mentioned liking potentially
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",  // A nice dark theme
      "coffee",
      "winter",
    ], // Add or remove themes as desired
    darkTheme: "night", // Sets the default dark theme preference if OS prefers dark
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You probably want false.
    prefix: "", // prefix for daisyUI classnames (adds prefix to components like btn -> daisy-btn). Usually empty.
    logs: true, // Shows info about daisyUI version and used config in the console when building.
  },
}