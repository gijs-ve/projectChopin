/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            height: {
                128: '32rem',
            },
        },
    },
    plugins: [
        // ...
        require('@tailwindcss/forms'),
    ],
};
