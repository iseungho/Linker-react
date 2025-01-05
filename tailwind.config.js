/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'logo-image':"url('./asset/images/logo.png')",
        'loading-image':"url('./asset/images/loading.gif')"
      }

    },
  },
  plugins: [],
}

