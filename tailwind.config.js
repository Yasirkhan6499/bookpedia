/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'custom-sm2': '350px',
        'custom-sm': '334px',
        'custom-sm3': '355px',
        'custom-sm4': '440px',
        'custom-md': '513px',
        'custom-md2': '768px',
        'custom-lg': '830px',
        
      },
    },
  },
  plugins: [],
  important: true,
}
