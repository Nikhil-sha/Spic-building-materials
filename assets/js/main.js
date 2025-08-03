// import './template.js';
import {
	DeckCarousel,
	CanvasCarousel,
	ContactForm,
	EmblaCarouselComponent
} from './classes.js';
import {
	productCategories,
	featuredProducts
} from './product-list.js';


function mapCategories() {
	const nodeContainer = document.querySelector("._category_carousel>._carousel_viewport").firstElementChild;
	nodeContainer.innerHTML = productCategories.map(category => `
		<div class="flex-[0_0_100%] md:flex-[0_0_70%] min-w-0 h-94 ml-6 group relative overflow-hidden rounded-xl">
			<div class="absolute inset-0 bg-gradient-to-b from-transparent to-primary-black/80 z-10"></div>
			<img src="${category.image}" alt="${category.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
			<div class="absolute bottom-0 left-0 p-6 z-20 w-full">
				<h3 class="text-xl font-bold mb-1 group-hover:text-accent-yellow transition">${category.title}</h3>
				<p class="text-gray-300 mb-4">${category.description}</p>
				<a href="${category.url}" class="inline-flex items-center text-accent-yellow font-medium group">
					Explore
				</a>
			</div>
			<div class="absolute top-4 right-4 bg-accent-yellow text-primary-black px-3 py-1 rounded-full text-xs font-bold z-20">
				24 Products
			</div>
		</div>
	`).join('');
	
	setTimeout(() => {
		return new EmblaCarouselComponent(document.querySelector("._category_carousel"), {
			autoplay: true,
			autoplayInterval: 3000
		});
	}, 1000);
}
const categoryCarousel = mapCategories();


const heroBgCarousel = new CanvasCarousel(document.getElementById("_canvas_carousel"), [
	"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80&format=webp",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvtMrqxKxmT_xFRtX_s6betZNd9osjjaf-OW4IoaH1fFjt24w-cwEIs915",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSipSI0qpWSM7QNtyMtTnXM2uigehSLp25QCx5_-5Pkm0qc1mIdzwkAjo0",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfO9khriI5KOlDp8cdZH2pyANA2oCcV87DrvBGSRgupKDxnF4fbMw920Q",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSRGK3LcV-mtb34CIh4i3JFXJEzq8vbMHTOcbOS2GWm5G_k4j5iBjbSUM"
]);


const testimonialNodes = Array.from(document.getElementById("_testimonial_carousel").children);
const testimonialCarousel = new DeckCarousel(document.getElementById("_testimonial_carousel"), testimonialNodes, 4000);

const contactForm = new ContactForm(
	'contact_form',
	{
		access_key: 'a29ab12c-b21d-41a1-a8e6-424c7a9b28ed',
		from_name: 'Contact form submission from SPIC Building Materials',
	}
);