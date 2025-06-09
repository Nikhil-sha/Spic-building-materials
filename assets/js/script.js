import {
	CanvasCarousel,
	EmblaCarouselComponent,
	DeckCarousel
} from './classes.js';
import './template.js';


const heroBgCarousel = new CanvasCarousel(document.getElementById("_canvas_carousel"), [
	"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80&format=webp",
	"https://picsum.photos/id/1018/1600/900",
	"https://picsum.photos/id/1021/1600/900",
	"https://picsum.photos/id/1035/1600/900",
	"https://picsum.photos/id/1043/1600/900",
	"https://picsum.photos/id/1069/1600/900"
]);

const productCarousel = new EmblaCarouselComponent(document.querySelector("._carousel"), {
	autoplay: true,
	autoplayInterval: 2000
});

const testimonialNodes = Array.from(document.getElementById("_testimonial_carousel").children);
const testimonialCarousel = new DeckCarousel(document.getElementById("_testimonial_carousel"), testimonialNodes, 4000);


// const fonts = ['Poppins', 'Nunito', 'Ubuntu', 'Rubik', 'Inter'];
// let currentFontIndex = 0;

// function switchFont() {
// 	document.body.style.fontFamily = fonts[currentFontIndex];
// 	console.log("current: ", fonts[currentFontIndex]);
// 	currentFontIndex = (currentFontIndex + 1) % fonts.length;
// }

// setInterval(switchFont, 2000);