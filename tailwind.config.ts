
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'monument': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
			},
			colors: {
				obsidian: 'hsl(var(--obsidian))',
				spotlight: 'hsl(var(--spotlight))',
				'liquid-gold': 'hsl(var(--liquid-gold))',
				'ethereal-turquoise': 'hsl(var(--ethereal-turquoise))',
				'crystal-glow': 'hsl(var(--crystal-glow))',
				'facet-highlight': 'hsl(var(--facet-highlight))',
				
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				shimmer: {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				crystallize: {
					'0%': { 
						opacity: '0', 
						transform: 'scale(0.8) rotateY(-30deg)',
						filter: 'blur(10px)'
					},
					'100%': { 
						opacity: '1', 
						transform: 'scale(1) rotateY(0deg)',
						filter: 'blur(0px)'
					}
				},
				'facet-illuminate': {
					'0%': { boxShadow: 'none' },
					'100%': { boxShadow: '0 0 20px hsl(var(--liquid-gold) / 0.6)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				shimmer: 'shimmer 3s ease-in-out infinite',
				crystallize: 'crystallize 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
				'facet-illuminate': 'facet-illuminate 0.3s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
