/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#a855f7',
					secondary: '#7c3aed',
					accent: '#6366f1',
					neutral: '#1f2937',
					'base-100': '#0f172a',
					info: '#3abff8',
					success: '#36d399',
					warning: '#fbbd23',
					error: '#f87272'
				},
				extend: {
					fontFamily: {
						inter: ['Inter', 'sans-serif']
					},
					boxShadow: {
						'01': '-4px -4px 12px -2px rgba(249,115,22,0.6), 4px 4px 12px -2px rgba(253,198,11,0.6)',
						'02': '4px 4px 12px -2px rgba(117,139,222,0.6), -4px -4px 12px -2px rgba(91,109,174,0.6)'
					},
					keyframes: {
						slideinout: {
							'0%, 100%': { transform: 'translate(0px)' },
							'50%': { transform: 'translate(40px)' }
						}
					},
					animation: {
						spin: 'spin 1s linear infinite',
						slideinout: 'slideinout 3s ease-in-out infinite'
					}
				}
			}
		]
	},
	theme: {
		colors: {
			purple: {
				50: '#FAF5FF', // Lightest lavender
				100: '#F3E8FF', // Soft lilac
				200: '#E9D5FF', // Pale violet
				300: '#D8B4FE', // Light orchid
				400: '#C084FC', // Vibrant purple 💜 (Use for gradients)
				500: '#A855F7', // Standard purple
				600: '#9333EA', // Deep amethyst
				700: '#7E22CE', // Royal purple
				800: '#6B21A8', // Dark violet
				900: '#581C87', // Rich purple
				950: '#3B0764' // Deepest indigo
			},

			// yellow: {
			// 	100: '#FEF9C3', // Light background for alerts
			// 	200: '#FDE68A', // Slightly stronger yellow for notices
			// 	300: '#FCD34D', // Strong yellow for highlighted components
			// 	600: '#D97706', // Vibrant yellow for links and emphasis
			// 	700: '#B45309', // Stronger dark yellow for text emphasis
			// 	800: '#92400E' // Dark yellow for warnings
			// },
			green: {
				100: '#DCFCE7', // Light green background
				600: '#16A34A', // Strong green for success text
				700: '#15803D' // Vibrant green for buttons
			},
			// blue: {
			// 	100: '#DBEAFE', // Light blue background for DAO notices
			// 	600: '#2563EB', // Vibrant blue for voting actions
			// 	700: '#1D4ED8' // Darker blue for hover effects
			// },
			red: {
				600: '#DC2626', // Strong red for disputes
				700: '#B91C1C' // Darker red for hover effects
			},
			transparent: 'transparent',
			white: '#ffffff',
			black: '#000000',
			sand: {
				'100': '#F3F2F0',
				'200': '#E6E4E2',
				'300': '#D8D6D3',
				'400': '#B7B4B0',
				'500': '#95918C',
				'600': '#7B7775',
				'700': '#605D5D',
				'800': '#484747',
				'900': '#303030'
			},
			stackspurple: '#765BFF',
			midpurple: '#9985FF',
			lightpurple: '#BBADFF',
			bloodorange: '#FC6432',
			lightgray: '#F4F3F0',
			bitcoinorange: '#FD9D41',
			// Status
			gray: {
				'50': '##E4EDFF',
				'100': '#E4EDFF',
				'200': '#e9e9e9',
				'300': '#cdcdcd',
				'400': '#a5a5a5',
				'500': '#737373',
				'600': '#6a6a6a',
				'700': '#616161',
				'800': '#535353',
				'900': '#404040',
				'1000': '#0E121A'
			},
			primary: {
				'100': '#fef9f7',
				'200': '#fce7e0',
				'300': '#f9c9b9',
				'400': '#f39f82',
				'500': '#ed693c',
				'600': '#da6137',
				'700': '#c75832',
				'800': '#ab4c2b',
				'900': '#853b22',
				'1000': '#5f2a18'
			},
			yellow: {
				'100': '#fffdf5',
				'200': '#fff6d8',
				'300': '#feeaa7',
				'400': '#fedb63',
				'500': '#fdc60b',
				'600': '#e9b60a',
				'700': '#d5a609',
				'800': '#b68f08',
				'900': '#8e6f06',
				'1000': '#654f04'
			},
			blue: {
				'100': '#fafbfe',
				'200': '#ebeefd',
				'300': '#d1dafa',
				'400': '#adbcf6',
				'500': '#71A1FF',
				'600': '#758bde',
				'700': '#6b7fca',
				'800': '#5b6dae',
				'900': '#4A00F8',
				'1000': '#0E121A'
			},
			success: {
				'100': '#f5fcfa',
				'200': '#d9f4eb',
				'300': '#a9e6d2',
				'400': '#66d2ae',
				'500': '#10b981',
				'600': '#0faa77',
				'700': '#0d9b6c',
				'800': '#0c855d',
				'900': '#096848',
				'1000': '#064a34'
			},
			warning: {
				'100': '#fff9f6',
				'200': '#fee9da',
				'300': '#fdcdab',
				'400': '#fba56a',
				'500': '#f97316',
				'600': '#e56a14',
				'700': '#d16112',
				'800': '#b35310',
				'900': '#8b400c',
				'1000': '#642e09'
			},
			error: {
				'100': '#fef8f8',
				'200': '#fce1e1',
				'300': '#f9bcbc',
				'400': '#f58787',
				'500': '#ef4444',
				'600': '#dc3f3f',
				'700': '#c93939',
				'800': '#ac3131',
				'900': '#862626',
				'1000': '#601b1b'
			}
		},
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '3.75rem'
		},
		backgroundImage: {
			'hero-gradient': 'linear-gradient(to right, #3b82f6, #9333ea)',
			'progress-gradient': 'linear-gradient(to right, #F3E8FF, #6B21A8)',
			'primary-01': 'linear-gradient(306.12deg, #ED693C 21.1%, #FDC60B 84.08%)',
			'primary-02': 'linear-gradient(126.12deg, #ED693C 11.8%, #FEDB63 72.43%)',
			'primary-03': 'linear-gradient(126.12deg, #D1DAFA 11.8%, #7F97F1 72.43%)',
			'primary-04': 'linear-gradient(126.12deg, #333C60 11.8%, #7F97F1 72.43%)',
			'gray-01': 'linear-gradient(126.12deg, #121212 44.07%, #404040 89.82%)',
			'black-01': 'linear-gradient(126.12deg, #000000 21.1%, #121212 53.58%)'
		},
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif']
			},
			boxShadow: {
				'01': '-4px -4px 12px -2px rgba(249,115,22,0.6), 4px 4px 12px -2px rgba(253,198,11,0.6)',
				'02': '4px 4px 12px -2px rgba(117,139,222,0.6), -4px -4px 12px -2px rgba(91,109,174,0.6)'
			},
			keyframes: {
				slideinout: {
					'0%, 100%': { transform: 'translate(0px)' },
					'50%': { transform: 'translate(40px)' }
				}
			},
			animation: {
				spin: 'spin 1s linear infinite',
				slideinout: 'slideinout 3s ease-in-out infinite'
			}
		}
	}
};
