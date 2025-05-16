/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4f46e5', // Indigo-600 as base
        'accent': '#8b5cf6',  // Purple-500
        'dark': '#111827',    // Gray-900
        'light': '#f9fafb',   // Gray-50
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(to right, #6366f1, #8b5cf6, #ec4899)',
      },
      animation: {
        pulseFast: 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
