tailwind.config = {
	theme: {
		extend: {
			colors: {
				primary: {
					black: '#111113',
					light: '#1E1E20',
				},
				accent: {
					yellow: '#FFD700',
					dark: '#FFC000',
				},
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'float': 'float 6s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0px)' },
				}
			},
		}
	},
	plugins: [
		function({ addUtilities }) {
			const newUtilities = {
				'.hero-pattern': {
					backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.08) 0%, rgba(17, 17, 19, 0.95) 70%)',
				},
				'.card-hover': {
					transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				},
				'.card-hover:hover': {
					transform: 'translateY(-5px)',
					boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				},
				'.text-gradient': {
					background: 'linear-gradient(90deg, #FFD700 0%, #FFC000 100%)',
					WebkitBackgroundClip: 'text',
					backgroundClip: 'text',
					color: 'transparent',
					fontFamily: 'Fredericka the Great',
					fontWeight: '700',
					fontSize: 'inherit',
				},
			}
			
			addUtilities(newUtilities)
		}
	]
}