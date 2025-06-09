// export default class DataBase {
// 	constructor() {
// 		this.categories = {
// 			'bricks': [],
// 			'pots': [],
// 			'benches': []
// 		};
// 	}

// 	addCategory(categoryName) {
// 		if (!this.categories[categoryName]) {
// 			this.categories[categoryName] = [];
// 		}
// 	}

// 	addItem(categoryName, item) {
// 		this.addCategory(categoryName);
// 		if (!item.id) {
// 			throw new Error("Item must have an 'id' field.");
// 		}
// 		this.categories[categoryName].push(item);
// 	}

// 	getItems(categoryName) {
// 		return this.categories[categoryName] || [];
// 	}

// 	sortItems(categoryName, field = "id", ascending = true) {
// 		const items = this.getItems(categoryName);
// 		return [...items].sort((a, b) => {
// 			if (typeof a[field] === 'string') {
// 				return ascending ?
// 					a[field].localeCompare(b[field]) :
// 					b[field].localeCompare(a[field]);
// 			} else {
// 				return ascending ? a[field] - b[field] : b[field] - a[field];
// 			}
// 		});
// 	}

// 	getItemById(categoryName, id) {
// 		return this.getItems(categoryName).find(item => item.id === id);
// 	}

// 	removeItem(categoryName, id) {
// 		const items = this.getItems(categoryName);
// 		this.categories[categoryName] = items.filter(item => item.id !== id);
// 	}

// 	filterByRange(categoryName, field, min, max) {
// 		return this.getItems(categoryName).filter(item => {
// 			const value = item[field];
// 			return typeof value === 'number' && value >= min && value <= max;
// 		});
// 	}
// }


const productCategories = [
{
	title: 'bricks',
	image: '/assets/media/images/products/interlocking-red-paver-brick.png',
	description: ''
}];


const productItems = [
	{
		// Product Id - bas ek unique number / roll number ki tarah
		id: 1, // Number
		
		// Product ka naam
		name: 'interlocking red paver brick', // String
		
		// Product ke baare me ek line
		description: "", // String
		
		// Product kis category ka hai - bricks/benches/fences/pots…
		category: "bricks", // String
		
		// Price aur unit - ₹ [value] / [unit]
		price: {
			value: 1, // Number
			unit: "square Feet" // String
		}, // Object
		
		// Product ki quality rating
		rating: 4.5, // Number/Float
		
		// Product ka ek image - yeh rehne do
		image: "./image.png", // String/
		
		// Product ki sample images - yeh bhi rehne do
		gallery: [
			"./image(2).png",
			"./image(3).png"
		] // Array
	}, // Object
]; // Array