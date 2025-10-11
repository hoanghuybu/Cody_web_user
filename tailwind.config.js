import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ['"MuseoModerno"', ...defaultTheme.fontFamily.sans],
      museo: ['"MuseoModerno"', ...defaultTheme.fontFamily.sans],
      tektur: ['"Tektur"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        // CODY brand palette
        'primary-green': '#387944', // Pantone 7731 C
        'accent-green': '#8DC057', // Pantone 7488 C
        'light-green': '#4DA76B', // Pantone 7479 C
        'olive-green': '#787C3D', // Pantone 105 C
        'warm-brown': '#4F351F', // Pantone 4625 C
        cream: '#FFF5CE', // Pantone Yellow 0131 C
        white: '#FEFEFE', // Pantone 663 C
        'brand-black': '#000000', // Pantone Black 6 C
        'forest-green': '#004702', // Xanh rừng dừa
        'sand-cream': '#f7f4e1', // Kem cát
        'sea-mint': '#cee5e1', // Xanh mint biển
        'sky-blue': '#9abfe5', // Xanh trời
        'ocean-blue': '#0068a5', // Xanh đại dương
      },
      lineClamp: {
        2: '2',
        3: '3',
      },
    },
  },
  plugins: [],
};
