export const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
	let dotNodes = []
	
	const addDotBtnsWithClickHandlers = () => {
		dotsNode.innerHTML = emblaApi
			.scrollSnapList()
			.map(() => '<button class="embla__dot w-3 h-3 rounded-full bg-gray-700 hover:bg-accent-yellow transition-all duration-[1s]" type="button"></button>')
			.join('')
		
		const scrollTo = (index) => {
			emblaApi.scrollTo(index)
		}
		
		dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
		dotNodes.forEach((dotNode, index) => {
			dotNode.addEventListener('click', () => scrollTo(index), false)
		})
	}
	
	const toggleDotBtnsActive = () => {
		const previous = emblaApi.previousScrollSnap()
		const selected = emblaApi.selectedScrollSnap()
		dotNodes[previous].classList.replace('bg-accent-yellow', 'bg-gray-700')
		dotNodes[selected].classList.replace('bg-gray-700', 'bg-accent-yellow')
	}
	
	emblaApi
		.on('init', addDotBtnsWithClickHandlers)
		.on('reInit', addDotBtnsWithClickHandlers)
		.on('init', toggleDotBtnsActive)
		.on('reInit', toggleDotBtnsActive)
		.on('select', toggleDotBtnsActive)
	
	return () => {
		dotsNode.innerHTML = ''
	}
}