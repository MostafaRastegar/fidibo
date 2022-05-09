const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class',
  important: true,
  theme: {
    colors: {
      ...colors,
      blue: {
        gray: '#e5eff6',
        text: '#8eaec2',
        light: '#28acff',
        DEFAULT: '#0068a9',
        dark: '#101532',
      },
    },
    fontSize: {
      ...defaultTheme.fontSize,
      xxs: '.65rem',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
