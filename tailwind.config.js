/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // CODY brand colors
        'primary-green': '#0d7931',      // Xanh lá đậm
        'accent-green': '#7dbc3a',       // Xanh lá tươi  
        'light-green': '#10aa65',        // Xanh lá sáng
        'warm-brown': '#56341b',         // Nâu đất
        'cream': '#fef5c6',              // Vàng kem
        'white': '#fefefe',              // Trắng
        'turmeric-yellow': '#ecc568',    // Vàng nghệ
        'teal-dark': '#35675e',          // Xanh cổ vịt đậm
        // Beach-inspired colors from image
        'forest-green': '#004702',       // Xanh rừng dừa
        'sand-cream': '#f7f4e1',         // Kem cát
        'sea-mint': '#cee5e1',           // Xanh mint biển
        'sky-blue': '#9abfe5',           // Xanh trời
        'ocean-blue': '#0068a5'          // Xanh đại dương
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      lineClamp: {
        2: '2',
        3: '3',
      }
    },
  },
  plugins: [],
};