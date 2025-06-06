import {
	Popup,
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


const router = new HashRouter({ offset: 12 });
const mobileMenuOpen = document.getElementById("mobile_menu_open");
const mobileMenuClose = document.getElementById("mobile_menu_close");
const contactForm = document.getElementById("contact_form");
const slideButton = document.querySelectorAll(".slide_button");
const mobileMenu = new MobileMenu("mobile_menu");


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


window.googleTranslateElementInit = function() {
	new google.translate.TranslateElement({
		pageLanguage: 'en',
		includedLanguages: 'en,hi,bho',
		layout: google.translate.TranslateElement.InlineLayout.VERTICAL
	}, 'google_translate_element');

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

showLangPopup();