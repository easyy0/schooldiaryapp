/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      colors: {
        // Definiowanie niestandardowych kolorów dla trybu ciemnego
        primary: {
          light: '#d3dce6',
          DEFAULT: '#1c3d5a',
          dark: '#0a192f',
        },
        background: {
          light: '#f8fafc',
          DEFAULT: '#1c3d5a',
          dark: '#0a192f',
        },
        text: {
          light: '#1c3d5a',
          DEFAULT: '#1c3d5a',
          dark: '#ffffff',
        },
      },
      maxWidth: {
        '420': '420px',
      },
    },
  },
  plugins: [],
}

