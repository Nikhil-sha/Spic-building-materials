import {
	Popup,
	Toast,
	Toggler,
	HashRouter
} from './classes.js';


class MobileMenu extends Toggler {
	constructor(selector) {
		super(selector, {
			show: "translate-x-0",
			hide: "translate-x-full",
			states: { show: "open", hide: "close" }
		});
	}
}


const router = new HashRouter({ offset: 12, callback: () => { mobileMenu.hide() } });
const toast = new Toast();
const languageDialogOpen = document.getElementById("language_dialog");
const mobileMenuOpen = document.getElementById("mobile_menu_open");
const mobileMenuClose = document.getElementById("mobile_menu_close");
const contactForm = document.getElementById("contact_form");
const goToTop = document.getElementById("go_to_top");
const mobileMenu = new MobileMenu("mobile_menu");


function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}


toast.success('Added to cart', 'Premium oak flooring added to your cart');
toast.error('Payment failed', 'Could not process your credit card');
toast.info('New feature', 'Save products to your favorites');
toast.warning('Low stock', 'Only 3 units remaining');


function handleOutsideMenuClick(e) {
	if (!mobileMenu.element.contains(e.target)) {
		mobileMenuClose.click();
	}
};


languageDialogOpen?.addEventListener("click", showLangPopup);

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


goToTop.addEventListener('click', scrollToTop);


window.googleTranslateElementInit = function() {
	new google.translate.TranslateElement({
		pageLanguage: 'en',
		includedLanguages: 'en,hi,bho',
		layout: google.translate.TranslateElement.InlineLayout.VERTICAL
	}, 'google_translate_element');
	
	const observer = new MutationObserver((mutations, obs) => {
		const lang = document.documentElement.lang || 'en';
		console.log("Language changed to:", lang);
		
		onLanguageChange(lang);
		
		obs.disconnect();
	});
	
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['lang']
	});
}


// function generateBreadcrumbs(options = {}) {
// 	const {
// 		customLabels = {},
// 			usePageTitle = true,
// 			titleSeparator = '|',
// 			includeHome = true
// 	} = options;

// 	const path = window.location.pathname;
// 	const segments = path.split('/').filter(segment => segment !== '');
// 	const breadcrumbContainer = document.querySelector('.breadcrumb-nav ol');
// 	const homeItem = breadcrumbContainer.querySelector('li:first-child');

// 	breadcrumbContainer.innerHTML = '';
// 	if (includeHome && homeItem) {
// 		breadcrumbContainer.appendChild(homeItem);
// 	}

// 	let accumulatedPath = '';

// 	segments.forEach((segment, index) => {
// 		accumulatedPath += `/${segment}`;
// 		const isLast = index === segments.length - 1;
// 		const li = document.createElement('li');

// 		let label;
// 		if (customLabels[segment] || customLabels[accumulatedPath]) {
// 			label = customLabels[segment] || customLabels[accumulatedPath];
// 		} else if (isLast && usePageTitle) {
// 			label = extractTitleFromPage(titleSeparator);
// 		} else {
// 			label = formatSegment(segment);
// 		}

// 		if (isLast) {
// 			li.setAttribute('aria-current', 'page');
// 			li.innerHTML = `
//         <div class="flex items-center">
//           <i class="ri-arrow-right-s-line text-gray-500 mx-1 md:mx-2"></i>
//           <span class="ml-1 text-sm font-medium text-accent-yellow md:ml-2">${label}</span>
//         </div>
//       `;
// 		} else {
// 			li.innerHTML = `
//         <div class="flex items-center">
//           <i class="ri-arrow-right-s-line text-gray-500 mx-1 md:mx-2"></i>
//           <a href="${accumulatedPath}" class="ml-1 text-sm font-medium text-gray-400 hover:text-accent-yellow transition md:ml-2">${label}</a>
//         </div>
//       `;
// 		}

// 		breadcrumbContainer.appendChild(li);
// 	});

// 	if (segments.length === 0 && includeHome) {
// 		const homeLi = breadcrumbContainer.querySelector('li:first-child');
// 		homeLi.setAttribute('aria-current', 'page');
// 		homeLi.querySelector('a').classList.remove('text-gray-400', 'hover:text-accent-yellow');
// 		homeLi.querySelector('a').classList.add('text-accent-yellow');
// 	}
// }

// function extractTitleFromPage(separator = '|') {
// 	const title = document.title.split(separator)[0].trim();
// 	return title || formatSegment(window.location.pathname.split('/').pop());
// }

// document.addEventListener('DOMContentLoaded', () => {
// 	generateBreadcrumbs({
// 		customLabels: {
// 			'/products': 'Our Products',
// 			'flooring': 'Flooring Solutions'
// 		},
// 		titleSeparator: '|'
// 	});
// });


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
		<div class="h-20 relative">
			<div aria-label="loading language options" class="w-full flex justify-center items-center absolute inset-0">
				<i class="inline-block ri-loader-line text-lg text-accent-yellow animate-spin"></i>
			</div>
			<div id="google_translate_element" class="w-full min-h-0 absolute z-10 bg-primary-black"></div>
		</div>
	`,
		actions: [
		{
			label: '<i class="ri-check-fill mr-2"></i> Done',
			class: 'flex-1 bg-accent-yellow hover:bg-accent-dark text-primary-black font-medium py-2 px-4 rounded-lg transition',
			value: 'done'
		}]
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

// showLangPopup();