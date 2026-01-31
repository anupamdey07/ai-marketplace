/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // AI Marketplace color palette from PRD v2
                background: {
                    DEFAULT: '#E8F0E6', // Light Sage (v3)
                    light: '#F2F7F1',   // Very Light Sage (v3)
                    surface: '#FAFCFA', // Near-white Surface (v3)
                },
                primary: {
                    DEFAULT: '#2D4A3E', // Deep Forest
                    dark: '#1B2C25',
                    light: '#3E6655',
                },
                secondary: {
                    DEFAULT: '#F5F0E8', // Warm Cream
                    dark: '#E8E1D5',
                },
                accent: {
                    DEFAULT: '#E8734A', // Coral Orange
                    dark: '#D15F38',
                    light: '#F09272',
                },
                trust: {
                    DEFAULT: '#7FB99B', // Mint
                    dark: '#66A084',
                },
                charcoal: '#2C3E2D',
                sage: {
                    dark: '#5A7A5C',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Lexend', 'Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                playful: ['Lexend', 'Nunito', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
            boxShadow: {
                'soft': '0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
