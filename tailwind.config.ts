import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Brand Colors
        'jet-black': '#0A0A0B',
        'onyx': '#111214',
        'blood-red': '#E7352C',
        'toxic-green': '#39FF14',
        'glitch-purple': '#7A3BFF',
        'ash-white': '#EDEEF0',
        'dim-gray': '#2A2B31',
        
        // Shadcn Theme Colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
        brand: ['Anton', 'Bebas Neue', 'Impact', 'Arial Black', 'sans-serif'],
        tech: ['Orbitron', 'Exo 2', 'monospace'],
        body: ['Inter', 'Montserrat', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' }
        },
        fog: {
          '0%, 100%': { transform: 'translateX(-100px)', opacity: '0.05' },
          '50%': { transform: 'translateX(100px)', opacity: '0.1' }
        },
        flicker: {
          '0%': { color: '#39FF14' },
          '100%': { color: '#7A3BFF' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'glitch': 'glitch 0.2s ease-in-out',
        'fog': 'fog 20s ease-in-out infinite',
        'flicker': 'flicker 2s ease-in-out infinite alternate'
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(231, 53, 44, 0.4), 0 0 40px rgba(231, 53, 44, 0.2)',
        'green-glow': '0 0 20px rgba(57, 255, 20, 0.4), 0 0 40px rgba(57, 255, 20, 0.2)',
        'purple-glow': '0 0 20px rgba(122, 59, 255, 0.4), 0 0 40px rgba(122, 59, 255, 0.2)',
        'inner-glow': 'inset 0 1px 0 rgba(237, 238, 240, 0.1)'
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
