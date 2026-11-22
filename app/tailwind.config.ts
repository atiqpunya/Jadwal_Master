import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'Arial', 'sans-serif'],
        display: [
          'var(--font-jakarta)',
          'var(--font-inter)',
          'system-ui',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        ink: '#111214',
        body: '#565A62',
        muted: '#8A8F98',
        charcoal: '#3A3D44',
        surface: '#F5F6F8',
        line: '#E4E6EA',
        'line-strong': '#DDE0E5',
        'line-input': '#D5D9DF',
        brand: {
          DEFAULT: '#4F46E5',
          hover: '#4338CA',
          deep: '#1E1B4B',
          soft: '#7C74F0',
        },
      },
    },
  },
  plugins: [],
};

export default config;
