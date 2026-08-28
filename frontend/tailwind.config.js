/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F8F6FC', 100: '#EDE7FA', 200: '#E4DCF4', 300: '#B9A3F8',
          400: '#8F73FF', 500: '#6D4AFF', 600: '#6D4AFF', 700: '#4B2FBF',
          800: '#4330F5', 900: '#4B2FBF', 950: '#221F30',
        },
        navy: {
          50: '#F8F6FC', 100: '#EDE7FA', 200: '#E4DCF4', 300: '#B9A3F8',
          400: '#8E879B', 500: '#666173', 600: '#666173', 700: '#3F3A4D',
          800: '#2D293A', 900: '#221F30', 950: '#221F30',
        },
        accent: {
          50: '#FFF7FC', 100: '#FBE8F6', 200: '#F5C8E7', 300: '#EA67C4',
          400: '#EA67C4', 500: '#EA67C4', 600: '#C846A5', 700: '#9C3382',
          800: '#7A2867', 900: '#5D1D4E',
        },
        success: {
          50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
          400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
          800: '#166534', 900: '#14532d',
        },
        warning: {
          50: '#FFF8E7', 100: '#FEF0C7', 200: '#FAD58A', 300: '#F59E0B',
          400: '#F59E0B', 500: '#F59E0B', 600: '#C47D08', 700: '#9A6107',
          800: '#754A06', 900: '#573604',
        },
        error: {
          50: '#FFF1F2', 100: '#FDE1E4', 200: '#F6B9C0', 300: '#DC3F4D',
          400: '#DC3F4D', 500: '#DC3F4D', 600: '#B9303D', 700: '#922530',
          800: '#701D25', 900: '#52151B',
        },
        gray: {
          50: '#F8F6FC', 100: '#F1EEF8', 200: '#E4DCF4', 300: '#D4CBE8',
          400: '#A9A1B6', 500: '#8E879B', 600: '#666173', 700: '#4F4A5D',
          800: '#383344', 900: '#221F30',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 24px -14px rgb(75 47 191 / 0.28)',
        'card-hover': '0 12px 32px -14px rgb(75 47 191 / 0.38)',
        soft: '0 4px 16px 0 rgb(75 47 191 / 0.10)',
      },
      borderRadius: { xl: '0.875rem', '2xl': '1.25rem' },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
