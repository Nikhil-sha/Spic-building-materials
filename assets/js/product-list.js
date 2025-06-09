const productCategories = [
	{
		title: 'blocks',
		image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968',
		description: 'High-quality construction blocks including pavers, hollow blocks, and retaining wall systems',
		url: '/products/?category=blocks'
	},
	{
		title: 'pots',
		image: 'https://images.unsplash.com/photo-1591951425328-48c0ac857ca1',
		description: 'Beautiful planters and pots in various materials including ceramic, terracotta, and metal',
		url: '/products/?category=pots'
	},
	{
		title: 'boundary walls',
		image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
		description: 'Durable and stylish boundary wall solutions for property demarcation and security',
		url: '/products/?category=boundary-walls'
	},
	{
		title: 'fencing',
		image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
		description: 'Privacy fences, decorative railings, and garden enclosures in various materials',
		url: '/products/?category=fencing'
	},
	{
		title: 'paving',
		image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
		description: 'Premium paving materials for driveways, walkways, and outdoor surfaces',
		url: '/products/?category=paving'
	},
	{
		title: 'decor',
		image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
		description: 'Garden ornaments, statues, fountains, and decorative elements for outdoor spaces',
		url: '/products/?category=decor'
	},
	
];


const featuredProducts = [
	{
		id: 1,
		name: 'Interlocking Red Paver Block',
		description: 'High-quality interlocking blocks for durable paving surfaces.',
		category: 'blocks',
		price: {
			value: 1,
			unit: 'square Feet'
		},
		rating: '4.5',
		image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
		gallery: [
			'https://images.unsplash.com/photo-1600585152220-90363fe7e115',
			'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6'
		]
	},
	{
		id: 2,
		name: 'Decorative Ceramic Pot',
		description: 'Beautiful handcrafted ceramic pot for indoor plants.',
		category: 'pots',
		price: {
			value: 15,
			unit: 'piece'
		},
		rating: '4.7',
		image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
		gallery: [
			'https://images.unsplash.com/photo-1525498128493-380d1990a112',
			'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae'
		]
	},
	{
		id: 3,
		name: 'Concrete Boundary Wall',
		description: 'Strong and durable concrete wall panels for property boundaries.',
		category: 'boundary walls',
		price: {
			value: 45,
			unit: 'panel'
		},
		rating: '4.3',
		image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
		gallery: [
			'https://images.unsplash.com/photo-1600566752225-3f8511f60c4b',
			'https://images.unsplash.com/photo-1600566752355-35792bedcfea'
		]
	},
	{
		id: 4,
		name: 'Terracotta Garden Pot',
		description: 'Classic terracotta pot with excellent drainage for healthy plants.',
		category: 'pots',
		price: {
			value: 12,
			unit: 'piece'
		},
		rating: '4.6',
		image: 'https://images.unsplash.com/photo-1591951425328-48c0ac857ca1',
		gallery: [
			'https://images.unsplash.com/photo-1519336056110-31a4964a0d9a',
			'https://images.unsplash.com/photo-1517705008128-361805f42e86'
		]
	}
	
];


const productItems = [
	{
		id: 1,
		name: 'Interlocking Red Paver Block',
		description: 'High-quality interlocking blocks for durable paving surfaces.',
		category: 'blocks',
		price: {
			value: 1,
			unit: 'square Feet'
		},
		rating: '4.5',
		image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
		gallery: [
			'https://images.unsplash.com/photo-1600585152220-90363fe7e115',
			'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6'
		]
	},
	{
		id: 2,
		name: 'Decorative Ceramic Pot',
		description: 'Beautiful handcrafted ceramic pot for indoor plants.',
		category: 'pots',
		price: {
			value: 15,
			unit: 'piece'
		},
		rating: '4.7',
		image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
		gallery: [
			'https://images.unsplash.com/photo-1525498128493-380d1990a112',
			'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae'
		]
	},
	{
		id: 3,
		name: 'Concrete Boundary Wall',
		description: 'Strong and durable concrete wall panels for property boundaries.',
		category: 'boundary walls',
		price: {
			value: 45,
			unit: 'panel'
		},
		rating: '4.3',
		image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
		gallery: [
			'https://images.unsplash.com/photo-1600566752225-3f8511f60c4b',
			'https://images.unsplash.com/photo-1600566752355-35792bedcfea'
		]
	},
	{
		id: 4,
		name: 'Terracotta Garden Pot',
		description: 'Classic terracotta pot with excellent drainage for healthy plants.',
		category: 'pots',
		price: {
			value: 12,
			unit: 'piece'
		},
		rating: '4.6',
		image: 'https://images.unsplash.com/photo-1591951425328-48c0ac857ca1',
		gallery: [
			'https://images.unsplash.com/photo-1519336056110-31a4964a0d9a',
			'https://images.unsplash.com/photo-1517705008128-361805f42e86'
		]
	},
	{
		id: 5,
		name: 'Cement Hollow Blocks',
		description: 'Standard cement blocks for construction projects.',
		category: 'blocks',
		price: {
			value: 2.5,
			unit: 'piece'
		},
		rating: '4.4',
		image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968',
		gallery: [
			'https://images.unsplash.com/photo-1605152276897-4f618f831968',
			'https://images.unsplash.com/photo-1600607688969-a5bfa4fe99c8'
		]
	},
	{
		id: 6,
		name: 'Modern Metal Planter',
		description: 'Sleek metal planter with minimalist design for contemporary spaces.',
		category: 'pots',
		price: {
			value: 28,
			unit: 'piece'
		},
		rating: '4.8',
		image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86',
		gallery: [
			'https://images.unsplash.com/photo-1591951425328-48c0ac857ca1',
			'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f'
		]
	},
	{
		id: 7,
		name: 'Brick Boundary Wall',
		description: 'Traditional brick wall with excellent durability and classic look.',
		category: 'boundary walls',
		price: {
			value: 35,
			unit: 'square feet'
		},
		rating: '4.2',
		image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
		gallery: [
			'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
			'https://images.unsplash.com/photo-1600566752225-3f8511f60c4b'
		]
	},
	{
		id: 8,
		name: 'Decorative Glass Pebbles',
		description: 'Colorful glass pebbles for garden decoration and landscaping.',
		category: 'decor',
		price: {
			value: 8,
			unit: 'pound'
		},
		rating: '4.1',
		image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
		gallery: [
			'https://images.unsplash.com/photo-1525498128493-380d1990a112',
			'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f'
		]
	},
	{
		id: 9,
		name: 'Wooden Garden Fence Panel',
		description: 'Natural wood fence panels for garden boundaries.',
		category: 'fencing',
		price: {
			value: 22,
			unit: 'panel'
		},
		rating: '4.0',
		image: 'https://images.unsplash.com/photo-1600566752225-3f8511f60c4b',
		gallery: [
			'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
			'https://images.unsplash.com/photo-1600566752355-35792bedcfea'
		]
	},
	{
		id: 10,
		name: 'Granite Cobblestone',
		description: 'Premium granite cobblestones for elegant pathways.',
		category: 'paving',
		price: {
			value: 4.5,
			unit: 'piece'
		},
		rating: '4.7',
		image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
		gallery: [
			'https://images.unsplash.com/photo-1600585152220-90363fe7e115',
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
		]
	},
	{
		id: 11,
		name: 'Hanging Basket Planter',
		description: 'Macrame hanging planter for stylish vertical gardening.',
		category: 'pots',
		price: {
			value: 18,
			unit: 'piece'
		},
		rating: '4.5',
		image: 'https://images.unsplash.com/photo-1525498128493-380d1990a112',
		gallery: [
			'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
			'https://images.unsplash.com/photo-1591951425328-48c0ac857ca1'
		]
	},
	{
		id: 12,
		name: 'Concrete Retaining Wall Block',
		description: 'Heavy-duty blocks for building retaining walls.',
		category: 'blocks',
		price: {
			value: 3.2,
			unit: 'piece'
		},
		rating: '4.6',
		image: 'https://images.unsplash.com/photo-1600607688969-a5bfa4fe99c8',
		gallery: [
			'https://images.unsplash.com/photo-1605152276897-4f618f831968',
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
		]
	},
	{
		id: 13,
		name: 'Wrought Iron Fence',
		description: 'Ornate wrought iron fencing for elegant property boundaries.',
		category: 'fencing',
		price: {
			value: 65,
			unit: 'linear foot'
		},
		rating: '4.9',
		image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
		gallery: [
			'https://images.unsplash.com/photo-1600566752225-3f8511f60c4b',
			'https://images.unsplash.com/photo-1600566752355-35792bedcfea'
		]
	},
	{
		id: 14,
		name: 'Self-Watering Planter',
		description: 'Innovative planter with built-in water reservoir for easy maintenance.',
		category: 'pots',
		price: {
			value: 32,
			unit: 'piece'
		},
		rating: '4.7',
		image: 'https://images.unsplash.com/photo-1519336056110-31a4964a0d9a',
		gallery: [
			'https://images.unsplash.com/photo-1517705008128-361805f42e86',
			'https://images.unsplash.com/photo-1591951425328-48c0ac857ca1'
		]
	},
	{
		id: 15,
		name: 'Decorative Garden Statue',
		description: 'Elegant stone statue for garden decoration.',
		category: 'decor',
		price: {
			value: 85,
			unit: 'piece'
		},
		rating: '4.3',
		image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
		gallery: [
			'https://images.unsplash.com/photo-1525498128493-380d1990a112',
			'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f'
		]
	},
	{
		id: 16,
		name: 'Bamboo Screening Panel',
		description: 'Natural bamboo panels for privacy screening.',
		category: 'fencing',
		price: {
			value: 28,
			unit: 'panel'
		},
		rating: '4.4',
		image: 'https://images.unsplash.com/photo-1600566752225-3f8511f60c4b',
		gallery: [
			'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
			'https://images.unsplash.com/photo-1600566752355-35792bedcfea'
		]
	},
	{
		id: 17,
		name: 'Stackable Stone Wall Block',
		description: 'Interlocking stone blocks for easy wall construction.',
		category: 'blocks',
		price: {
			value: 4.8,
			unit: 'piece'
		},
		rating: '4.5',
		image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115',
		gallery: [
			'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
		]
	},
	{
		id: 18,
		name: 'Ceramic Succulent Pot',
		description: 'Small ceramic pots perfect for succulents and cacti.',
		category: 'pots',
		price: {
			value: 9,
			unit: 'piece'
		},
		rating: '4.8',
		image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
		gallery: [
			'https://images.unsplash.com/photo-1525498128493-380d1990a112',
			'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae'
		]
	},
	{
		id: 19,
		name: 'Decorative Garden Fountain',
		description: 'Beautiful water fountain for garden ambiance.',
		category: 'decor',
		price: {
			value: 120,
			unit: 'piece'
		},
		rating: '4.9',
		image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86',
		gallery: [
			'https://images.unsplash.com/photo-1519336056110-31a4964a0d9a',
			'https://images.unsplash.com/photo-1591951425328-48c0ac857ca1'
		]
	},
	{
		id: 20,
		name: 'Vinyl Privacy Fence',
		description: 'Low-maintenance vinyl fencing for privacy and security.',
		category: 'fencing',
		price: {
			value: 42,
			unit: 'linear foot'
		},
		rating: '4.6',
		image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
		gallery: [
			'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
			'https://images.unsplash.com/photo-1600566752225-3f8511f60c4b'
		]
	}
	
];


export {
	productCategories,
	featuredProducts,
	productItems
};