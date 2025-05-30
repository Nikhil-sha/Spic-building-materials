import EmblaCarousel from './libs/embla/embla-carousel.esm.js';
import { addPrevNextBtnsClickHandlers } from './libs/embla/EmblaCarouselArrowButtons.js';
import { addDotBtnsAndClickHandlers } from './libs/embla/EmblaCarouselDotButton.js';


// —————— Utility Selectors —————— //
const $id = id => document.getElementById(id);
const $class = selector => document.querySelector(`.${selector}`);
const $selector = selector => document.querySelector(selector);
const $all = selector => document.querySelectorAll(selector);

// —————— Elements —————— //
const mobileMenuOpen = $id("mobile_menu_open");
const mobileMenuClose = $id("mobile_menu_close");
const contactForm = $id("contact_form");
const slideButton = $all(".slide_button");

// —————— Functions —————— //
window.googleTranslateElementInit = function() {
	new google.translate.TranslateElement({
		pageLanguage: 'en',
		includedLanguages: 'en,hi,bho',
		layout: google.translate.TranslateElement.InlineLayout.VERTICAL
	}, 'google_translate_element');

	// ✅ Set up a one-time MutationObserver
	const observer = new MutationObserver((mutations, obs) => {
		const lang = document.documentElement.lang || 'en';
		console.log("🌐 Language changed to:", lang);

		onLanguageChange(lang);

		obs.disconnect();
	});

	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['lang']
	});
}

function onLanguageChange(lang) {
	const skiptranslate = document.querySelector('.skiptranslate');
	skiptranslate.remove();
}

function showLangPopup() {
	const popup = new Popup({
		title: 'Language preference',
		iconClass: 'ri-earth-line text-accent-yellow text-xl',
		contentHTML: `
		<p class="mb-4">Choose a language.</p>
		<div id="google_translate_element"></div>
	`,
		actions: [
			{
				label: '<i class="ri-check-fill mr-2"></i> Done',
				class: 'flex-1 bg-accent-yellow hover:bg-accent-dark text-primary-black font-medium py-2 px-4 rounded-lg transition',
				value: 'done'
		}
	]
	});

	popup.onClose((returnValue) => {
		console.log('Language changed:', returnValue);
	});

	popup.show();

	if (!document.querySelector('script[data-google-translate]')) {
		const googleTranslateScript = document.createElement("script");
		googleTranslateScript.src = './assets/js/libs/google/google-translate-widget.js';
		document.body.appendChild(googleTranslateScript);
	}
}

// —————— Classes —————— //

class Toggler {
	constructor(selector, { show, hide, states }) {
		this.element = $id(selector);
		this.showClasses = [].concat(show);
		this.hideClasses = [].concat(hide);
		this.states = states;
		this.state = "idle";
	}

	show() {
		if (this.hideClasses.every(cls => this.element.classList.contains(cls))) {
			this.element.classList.replace(...this.hideClasses, ...this.showClasses);
			this.state = this.states.show;
		}
	}

	hide() {
		if (this.showClasses.every(cls => this.element.classList.contains(cls))) {
			this.element.classList.replace(...this.showClasses, ...this.hideClasses);
			this.state = this.states.hide;
		}
	}
}

class Popup {
	constructor({ title, iconClass, contentHTML, actions }) {
		const template = $id('popup-template');
		const clone = template.content.cloneNode(true);
		this.dialog = clone.querySelector('dialog');
		this.form = clone.querySelector('form');
		this.titleEl = clone.querySelector('.popup-title');
		this.iconEl = clone.querySelector('.popup-icon');
		this.contentEl = clone.querySelector('.popup-content');
		this.actionsEl = clone.querySelector('.popup-actions');

		// Set dynamic content
		this.titleEl.textContent = title || 'Popup';
		if (iconClass) this.iconEl.className = `popup-icon ${iconClass}`;
		this.contentEl.innerHTML = contentHTML || '';

		// Create footer buttons
		this.actionsEl.innerHTML = '';
		if (Array.isArray(actions)) {
			actions.forEach(({ label, class: className, value }) => {
				const button = document.createElement('button');
				button.type = 'submit';
				button.value = value;
				button.innerHTML = label;
				button.className = className;
				this.actionsEl.appendChild(button);
			});
		}

		// Append to DOM
		document.body.appendChild(this.dialog);

		// Bind close event
		this.dialog.addEventListener('close', () => {
			document.body.style.overflow = 'auto';
			this._onClose && this._onClose(this.dialog.returnValue);
			this.dialog.remove(); // Clean up
		});
	}

	show() {
		this.dialog.showModal();
		document.body.style.overflow = 'hidden';
	}

	onClose(callback) {
		this._onClose = callback;
	}
}

class CanvasCarousel {
	constructor(canvas, imageUrls) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.imageUrls = imageUrls;
		this.images = [];
		this.currentIndex = 0;
		this.nextIndex = 1;
		this.opacity = 0;
		this.fadeSpeed = 0.06;
		this.interval = 2500;
		this.width = canvas.clientWidth;
		this.height = canvas.clientHeight;

		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.loadImages();

		window.addEventListener("resize", () => {
			this.width = canvas.clientWidth;
			this.height = canvas.clientHeight;
			canvas.width = this.width;
			canvas.height = this.height;
		});
	}

	loadImages() {
		let loaded = 0;
		this.imageUrls.forEach((src, i) => {
			const img = new Image();
			img.src = src;
			img.onload = () => {
				this.images[i] = img;
				loaded++;
				if (loaded === this.imageUrls.length) {
					this.start();
				}
			};
		});
	}

	start() {
		this.loop();
		setInterval(() => this.prepareNextImage(), this.interval);
	}

	prepareNextImage() {
		this.currentIndex = this.nextIndex;
		this.nextIndex = (this.nextIndex + 1) % this.images.length;
		this.opacity = 0;
	}

	drawCoverImage(img) {
		const imgRatio = img.width / img.height;
		const canvasRatio = this.width / this.height;

		let drawWidth, drawHeight;

		if (imgRatio > canvasRatio) {
			drawHeight = this.height;
			drawWidth = img.width * (this.height / img.height);
		} else {
			drawWidth = this.width;
			drawHeight = img.height * (this.width / img.width);
		}

		const offsetX = (this.width - drawWidth) / 2;
		const offsetY = (this.height - drawHeight) / 2;

		this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
	}

	loop() {
		requestAnimationFrame(() => this.loop());

		this.ctx.clearRect(0, 0, this.width, this.height);

		if (this.opacity < 1) {
			this.ctx.globalAlpha = 1;
			this.drawCoverImage(this.images[this.currentIndex]);

			this.ctx.globalAlpha = this.opacity;
			this.drawCoverImage(this.images[this.nextIndex]);

			this.opacity += this.fadeSpeed;
		} else {
			this.ctx.globalAlpha = 1;
			this.drawCoverImage(this.images[this.nextIndex]);
		}
	}
}

class EmblaCarouselComponent {
	constructor(node, options = {}) {
		this.node = node;
		this.options = {
			loop: true,
			speed: 15,
			autoplayInterval: 2000,
			...options
		};

		this.emblaApi = null;
		this.cleanupFunctions = [];

		this.init();
	}

	init() {
		const viewportNode = this.node.querySelector('._carousel_viewport');
		const prevBtnNode = this.node.querySelector('._carousel_btn_prev');
		const nextBtnNode = this.node.querySelector('._carousel_btn_next');
		const dotsNode = this.node.querySelector('._carousel_dots');

		if (!viewportNode) return;

		this.emblaApi = EmblaCarousel(viewportNode, {
			loop: this.options.loop,
			speed: this.options.speed
		});

		if (prevBtnNode && nextBtnNode) {
			const removePrevNextHandlers = addPrevNextBtnsClickHandlers(
				this.emblaApi, prevBtnNode, nextBtnNode
			);
			this.cleanupFunctions.push(removePrevNextHandlers);
		}

		if (dotsNode) {
			const removeDotHandlers = addDotBtnsAndClickHandlers(
				this.emblaApi, dotsNode
			);
			this.cleanupFunctions.push(removeDotHandlers);
		}

		if (this.options.autoplay) {
			const cleanupAutoplay = this.setupAutoplay(this.options.autoplayInterval);
			this.cleanupFunctions.push(cleanupAutoplay);
		}

		this.emblaApi.on('destroy', () => {
			this.cleanupFunctions.forEach(cleanup => cleanup());
			this.cleanupFunctions = [];
		});
	}

	setupAutoplay(interval = 3000) {
		if (!this.emblaApi) return () => {};

		let timer = 0;

		const play = () => {
			this.emblaApi.canScrollNext() ?
				this.emblaApi.scrollNext() :
				this.emblaApi.scrollTo(0);
		};

		const start = () => {
			if (!timer) timer = setInterval(play, interval);
		};

		const stop = () => {
			clearInterval(timer);
			timer = 0;
		};

		start();

		const eventListeners = [
			{ event: 'mouseenter', handler: stop },
			{ event: 'mouseleave', handler: start },
			{ event: 'focusin', handler: stop },
			{ event: 'focusout', handler: start }
    ];

		eventListeners.forEach(({ event, handler }) => {
			this.node.addEventListener(event, handler);
		});

		return () => {
			stop();
			eventListeners.forEach(({ event, handler }) => {
				this.node.removeEventListener(event, handler);
			});
		};
	}

	destroy() {
		if (this.emblaApi) {
			this.emblaApi.destroy();
		}
	}
}

class DeckCarousel {
	constructor(container, nodes, interval = 4000) {
		this.container = container;
		this.nodes = nodes;
		this.interval = interval;
		this.timer = null;
		this.currentIndex = 0;
		this.slides = [];

		this.init();
	}

	init() {
		this.container.innerHTML = "";

		this.nodes.forEach((node, i) => {
			node.classList.add("testimonial-card");
			if (i === 0) {
				node.classList.add("z-[2]");
			} else {
				node.classList.add("z-[1]", "transform", "scale-[0.5]", "translate-y-[12px]");
			}
			this.container.appendChild(node);
			this.slides.push(node);
		});

		this.updateContainerHeight();
		this.start();
	}

	start() {
		this.stop();
		this.timer = setInterval(() => this.next(), this.interval);
	}

	stop() {
		if (this.timer) clearInterval(this.timer);
		this.timer = null;
	}

	next() {
		const current = this.slides[this.currentIndex];
		const nextIndex = (this.currentIndex + 1) % this.slides.length;
		const next = this.slides[nextIndex];

		// Animate current out
		current.classList.remove("z-[2]");
		current.classList.add("z-[3]", "opacity-0", "transform", "rotate-45", "translate-x-[120%]", "scale-[1.1]");

		// Promote next
		next.classList.remove("z-[1]", "transform", "scale-[0.5]", "translate-y-[12px]");
		next.classList.add("z-[2]");

		// After transition, reset the exiting card
		setTimeout(() => {
			current.classList.remove("z-[3]", "opacity-0", "transform", "rotate-45", "translate-x-[120%]", "scale-[1.1]");
			current.classList.add("z-[1]", "transform", "scale-[0.5]", "translate-y-[12px]");
		}, 1100);

		this.currentIndex = nextIndex;
		this.updateContainerHeight();
	}

	updateContainerHeight() {
		const active = this.slides[this.currentIndex];
		requestAnimationFrame(() => {
			this.container.style.height = active.offsetHeight + "px";
		});
	}
}

class HashRouter {
	constructor({ offset = 0 } = {}) {
		this.offset = offset;

		// Bind initial route
		this._bindLinks();
		window.addEventListener('hashchange', () => this._scrollToHash());
		window.addEventListener('DOMContentLoaded', () => {
			this._scrollToHash(); // Scroll on load if hash present
		});
	}

	_bindLinks() {
		$all('[data-route]').forEach(anchor => {
			anchor.addEventListener('click', (e) => {
				const hash = anchor.getAttribute('data-route');
				if (hash && hash.startsWith('#')) {
					e.preventDefault();
					history.pushState(null, '', hash);
					this._scrollToElement(hash);
				}
			});
		});
	}

	_scrollToHash() {
		const hash = window.location.hash;
		if (hash && $selector(hash)) {
			this._scrollToElement(hash);
		}
	}

	_scrollToElement(selector) {
		const target = $selector(selector);
		if (!target) return;

		const top = target.getBoundingClientRect().top + window.scrollY - this.offset;

		window.scrollTo({
			top,
			behavior: 'smooth'
		});
	}
}

class MobileMenu extends Toggler {
	constructor(selector) {
		super(selector, {
			show: "translate-x-0",
			hide: "translate-x-full",
			states: { show: "open", hide: "close" }
		});
	}
}

// —————— Instances —————— //
// const router = new HashRouter({ offset: 60 });

const mobileMenu = new MobileMenu("mobile_menu");
mobileMenu.hide();

// —————— Event Handlers —————— //
let handleOutsideMenuClick = function(e) {
	if (!mobileMenu.element.contains(e.target)) {
		mobileMenuClose.click();
	}
};

mobileMenuOpen?.addEventListener("click", () => {
	mobileMenu.show();
	setTimeout(() => {
		window.addEventListener("click", handleOutsideMenuClick);
	}, 0);
});

mobileMenuClose?.addEventListener("click", () => {
	mobileMenu.hide();
	window.removeEventListener("click", handleOutsideMenuClick);
});

slideButton.forEach(button => {
	button.addEventListener('click', () => {
		slide(button.dataset.element, button.dataset.dir);
	});
});

// —————— Carousel Setup —————— //
const heroBgCarousel = new CanvasCarousel($id("_canvas_carousel"), [
		"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80&format=webp",
  "https://picsum.photos/id/1018/1600/900",
  "https://picsum.photos/id/1021/1600/900",
  "https://picsum.photos/id/1035/1600/900",
  "https://picsum.photos/id/1043/1600/900",
  "https://picsum.photos/id/1069/1600/900"
	]);

const productCarousel = new EmblaCarouselComponent($class("_carousel"), {
	autoplay: true,
	autoplayInterval: 2000
});

const testimonialNodes = Array.from($id("_testimonial_carousel").children);
const testimonialCarousel = new DeckCarousel($id("_testimonial_carousel"), testimonialNodes, 4000);

// —————— Scroll to Hash (After Load) —————— //
/* const hash = decodeURI(location.hash.replace('#', ''));
if (hash !== '') {
	const element = $id(hash);
	if (element) {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		const clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
		const offset = element.getBoundingClientRect().top + scrollTop - clientTop;

		setTimeout(() => {
			window.scrollTo({ top: offset, left: 0, behavior: 'smooth' });
		}, 0);
	}
} */

showLangPopup();