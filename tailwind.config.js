/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Strict Brand Color System
        crimson: "#EE3E4C",
        ruby: "#A61221",
        aqua: "#4DC6AB",
        teal: "#268574",
        burntOrange: "#F25C38",
        rust: "#A82C15",
        surfaceRose: "#FDF2F2",
        surfaceMint: "#EEFAF7",
        surfaceCanvas: "#F8F9FA",
        
        brand: {
          50: "#EEFAF7",
          100: "#FDF2F2",
          500: "#EE3E4C", // Vibrant Crimson
          600: "#A61221", // Deep Ruby
          700: "#268574", // Deep Teal
          900: "#1E293B", // Deep Charcoal
        },
        slate: {
          850: "#1E293B",
          950: "#0F172A",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(101, 205, 182, 0.08), rgba(240, 66, 81, 0.03))',
        'glow-gradient': 'radial-gradient(circle at 50% 0%, rgba(101, 205, 182, 0.2), transparent 70%)',
        'palette-mesh': 'linear-gradient(135deg, #65cdb6 0%, #2d8b76 35%, #f04251 70%, #f26440 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
