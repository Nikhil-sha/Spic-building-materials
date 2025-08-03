import {
  EmblaCarouselComponent
} from './classes.js';
import {
  featuredProducts
} from './product-list.js';


function loadImages() {
  const nodeContainer = document.querySelector("._carousel>._carousel_viewport").firstElementChild;
  nodeContainer.innerHTML = featuredProducts[0].gallery.map(image => `
		<div class="flex-[0_0_100%] md:flex-[0_0_70%] min-w-0 h-64 ml-6 group relative overflow-hidden rounded-xl">
			<img src="${image}" alt="" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
		</div>
	`).join('');
  
  setTimeout(() => {
    return new EmblaCarouselComponent(document.querySelector("._carousel"), {
      autoplay: true,
      autoplayInterval: 3000
    });
  }, 1000);
}
const carousel = loadImages();


const tabs = document.querySelectorAll('[data-tabs-target]');
const tabContents = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabsTarget);
    
    // Hide all tab contents
    tabContents.forEach(content => {
      content.classList.add('hidden');
    });
    
    // Show selected tab content
    target.classList.remove('hidden');
    
    // Update active tab styling
    tabs.forEach(t => {
      t.classList.remove('border-accent-yellow', 'text-accent-yellow');
    });
    tab.classList.add('border-accent-yellow', 'text-accent-yellow');
  });
});

// Set first tab as active by default
if (tabs.length > 0) {
  tabs[0].classList.add('border-accent-yellow', 'text-accent-yellow');
  const firstTabContent = document.querySelector(tabs[0].dataset.tabsTarget);
  if (firstTabContent) firstTabContent.classList.remove('hidden');
}