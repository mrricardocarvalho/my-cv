// postcss.config.js
export default {
  plugins: {
    tailwindcss: {}, // Tells PostCSS to use the Tailwind plugin
    autoprefixer: {}, // Tells PostCSS to use the Autoprefixer plugin (adds vendor prefixes like -webkit-, -moz-)
  },
}