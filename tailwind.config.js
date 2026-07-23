/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F4F4F0",
          foreground: "#1A1A1A",
        },
        accent: {
          DEFAULT: "#A0937D",
          foreground: "#FFFFFF",
        },
        text: {
          DEFAULT: "#1A1A1A",
          muted: "#737373",
        },
        offwhite: {
          DEFAULT: "#FAF9F6",
          dark: "#F4F4F0"
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'luxury': '1600px',
        'content': '1400px',
      },
      spacing: {
        'gutter': 'clamp(1rem, 4vw, 3rem)',
      },
      fontSize: {
        'hero': ['clamp(40px, 6vw, 84px)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1': ['clamp(32px, 5vw, 64px)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'h2': ['clamp(24px, 3.5vw, 48px)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h3': ['clamp(20px, 2.5vw, 32px)', { lineHeight: '1.2' }],
        'body': ['clamp(14px, 1.2vw, 16px)', { lineHeight: '1.6' }],
        'small': ['13px', { lineHeight: '1.5' }],
        'tiny': ['11px', { lineHeight: '1.5', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        xl: "1rem",
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
        none: "0px"
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.03)",
        lift: "0 20px 60px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
