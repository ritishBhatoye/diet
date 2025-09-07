/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Diet app brand colors
        primary: {
          DEFAULT: '#22C55E', // green-500
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        secondary: {
          DEFAULT: '#34D399', // teal/green accent
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        tertiary: {
          DEFAULT: '#84CC16', // lime accent
          50: '#F7FEE7',
          100: '#ECFCCB',
          200: '#D9F99D',
          300: '#BEF264',
          400: '#A3E635',
          500: '#84CC16',
          600: '#65A30D',
          700: '#4D7C0F',
          800: '#3F6212',
          900: '#365314',
        },
        accent: {
          DEFAULT: '#3B82F6', // blue accent
          600: '#2563EB',
        },
        white: {
          DEFAULT: '#ffffff',
          100: '#fafafa',
          200: '#FE8C00',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        dark: {
          100: '#181C2E',
        },
        success: '#16A34A',
        error: '#F14141',
        warning: '#F59E0B',
        info: '#0EA5E9',
      },
      fontFamily: {
        // Quicksand fonts
        quicksand: ['Quicksand-Regular', 'sans-serif'],
        'quicksand-bold': ['Quicksand-Bold', 'sans-serif'],
        'quicksand-semibold': ['Quicksand-SemiBold', 'sans-serif'],
        'quicksand-light': ['Quicksand-Light', 'sans-serif'],
        'quicksand-medium': ['Quicksand-Medium', 'sans-serif'],

        // Barlow fonts
        barlow: ['Barlow-Regular', 'sans-serif'],
        'barlow-black': ['Barlow-Black', 'sans-serif'],
        'barlow-black-italic': ['Barlow-BlackItalic', 'sans-serif'],
        'barlow-bold': ['Barlow-Bold', 'sans-serif'],
        'barlow-bold-italic': ['Barlow-BoldItalic', 'sans-serif'],
        'barlow-extrabold': ['Barlow-ExtraBold', 'sans-serif'],
        'barlow-extrabold-italic': ['Barlow-ExtraBoldItalic', 'sans-serif'],
        'barlow-extralight': ['Barlow-ExtraLight', 'sans-serif'],
        'barlow-extralight-italic': ['Barlow-ExtraLightItalic', 'sans-serif'],
        'barlow-italic': ['Barlow-Italic', 'sans-serif'],
        'barlow-light': ['Barlow-Light', 'sans-serif'],
        'barlow-light-italic': ['Barlow-LightItalic', 'sans-serif'],
        'barlow-medium': ['Barlow-Medium', 'sans-serif'],
        'barlow-medium-italic': ['Barlow-MediumItalic', 'sans-serif'],
        'barlow-semibold': ['Barlow-SemiBold', 'sans-serif'],
        'barlow-semibold-italic': ['Barlow-SemiBoldItalic', 'sans-serif'],
        'barlow-thin': ['Barlow-Thin', 'sans-serif'],
        'barlow-thin-italic': ['Barlow-ThinItalic', 'sans-serif'],

        // Dancing Script fonts
        'dancing-script': ['DancingScript-Regular', 'cursive'],
        'dancing-script-bold': ['DancingScript-Bold', 'cursive'],
        'dancing-script-medium': ['DancingScript-Medium', 'cursive'],
        'dancing-script-semibold': ['DancingScript-SemiBold', 'cursive'],
        'dancing-script-variable': [
          'DancingScript-VariableFont_wght',
          'cursive',
        ],

        // Montserrat fonts
        montserrat: ['Montserrat-Regular', 'sans-serif'],
        'montserrat-black': ['Montserrat-Black', 'sans-serif'],
        'montserrat-black-italic': ['Montserrat-BlackItalic', 'sans-serif'],
        'montserrat-bold': ['Montserrat-Bold', 'sans-serif'],
        'montserrat-bold-italic': ['Montserrat-BoldItalic', 'sans-serif'],
        'montserrat-extrabold': ['Montserrat-ExtraBold', 'sans-serif'],
        'montserrat-extrabold-italic': [
          'Montserrat-ExtraBoldItalic',
          'sans-serif',
        ],
        'montserrat-extralight': ['Montserrat-ExtraLight', 'sans-serif'],
        'montserrat-extralight-italic': [
          'Montserrat-ExtraLightItalic',
          'sans-serif',
        ],
        'montserrat-italic': ['Montserrat-Italic', 'sans-serif'],
        'montserrat-light': ['Montserrat-Light', 'sans-serif'],
        'montserrat-light-italic': ['Montserrat-LightItalic', 'sans-serif'],
        'montserrat-medium': ['Montserrat-Medium', 'sans-serif'],
        'montserrat-medium-italic': ['Montserrat-MediumItalic', 'sans-serif'],
        'montserrat-semibold': ['Montserrat-SemiBold', 'sans-serif'],
        'montserrat-semibold-italic': [
          'Montserrat-SemiBoldItalic',
          'sans-serif',
        ],
        'montserrat-thin': ['Montserrat-Thin', 'sans-serif'],
        'montserrat-thin-italic': ['Montserrat-ThinItalic', 'sans-serif'],
        'montserrat-variable': ['Montserrat-VariableFont_wght', 'sans-serif'],
        'montserrat-italic-variable': [
          'Montserrat-Italic-VariableFont_wght',
          'sans-serif',
        ],

        // Plus Jakarta Sans fonts
        'plus-jakarta-sans': ['PlusJakartaSans-Regular', 'sans-serif'],
        'plus-jakarta-sans-bold': ['PlusJakartaSans-Bold', 'sans-serif'],
        'plus-jakarta-sans-bold-italic': [
          'PlusJakartaSans-BoldItalic',
          'sans-serif',
        ],
        'plus-jakarta-sans-extrabold': [
          'PlusJakartaSans-ExtraBold',
          'sans-serif',
        ],
        'plus-jakarta-sans-extrabold-italic': [
          'PlusJakartaSans-ExtraBoldItalic',
          'sans-serif',
        ],
        'plus-jakarta-sans-extralight': [
          'PlusJakartaSans-ExtraLight',
          'sans-serif',
        ],
        'plus-jakarta-sans-extralight-italic': [
          'PlusJakartaSans-ExtraLightItalic',
          'sans-serif',
        ],
        'plus-jakarta-sans-italic': ['PlusJakartaSans-Italic', 'sans-serif'],
        'plus-jakarta-sans-light': ['PlusJakartaSans-Light', 'sans-serif'],
        'plus-jakarta-sans-light-italic': [
          'PlusJakartaSans-LightItalic',
          'sans-serif',
        ],
        'plus-jakarta-sans-medium': ['PlusJakartaSans-Medium', 'sans-serif'],
        'plus-jakarta-sans-medium-italic': [
          'PlusJakartaSans-MediumItalic',
          'sans-serif',
        ],
        'plus-jakarta-sans-semibold': [
          'PlusJakartaSans-SemiBold',
          'sans-serif',
        ],
        'plus-jakarta-sans-semibold-italic': [
          'PlusJakartaSans-SemiBoldItalic',
          'sans-serif',
        ],
        'plus-jakarta-sans-variable': [
          'PlusJakartaSans-VariableFont_wght',
          'sans-serif',
        ],
        'plus-jakarta-sans-italic-variable': [
          'PlusJakartaSans-Italic-VariableFont_wght',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
