export interface Category {
	id: string;
	name: string;
	displayName: string;
	icon: string;
}

export interface Ingredient {
	id: string;
	name: string;
	categoryId: string;
	searchTerms: string[];
	isCommon: boolean;
}

// Categories data
export const categories: Category[] = [
	{ id: 'produce', name: 'produce', displayName: 'Fruits & Vegetables', icon: 'apple' },
	{ id: 'dairy', name: 'dairy', displayName: 'Dairy & Eggs', icon: 'milk' },
	{ id: 'pantry', name: 'pantry', displayName: 'Pantry Staples', icon: 'package' },
	{ id: 'meat', name: 'meat', displayName: 'Meat & Seafood', icon: 'beef' },
	{ id: 'spices', name: 'spices', displayName: 'Herbs & Spices', icon: 'pepper' },
	{ id: 'grains', name: 'grains', displayName: 'Grains & Pasta', icon: 'wheat' }
];

// Initial ingredients data
export const availableIngredients = [
	// Produce
	{
		id: 'onion',
		name: 'Onion',
		categoryId: 'produce',
		searchTerms: ['onion', 'yellow onion', 'brown onion'],
		isCommon: true
	},
	{
		id: 'garlic',
		name: 'Garlic',
		categoryId: 'produce',
		searchTerms: ['garlic', 'garlic clove', 'fresh garlic'],
		isCommon: true
	},
	{
		id: 'tomato',
		name: 'Tomato',
		categoryId: 'produce',
		searchTerms: ['tomato', 'tomatoes', 'fresh tomato'],
		isCommon: true
	},
	{
		id: 'potato',
		name: 'Potato',
		categoryId: 'produce',
		searchTerms: ['potato', 'potatoes', 'russet potato'],
		isCommon: true
	},

	// Dairy
	{
		id: 'milk',
		name: 'Milk',
		categoryId: 'dairy',
		searchTerms: ['milk', 'whole milk', 'dairy'],
		isCommon: true
	},
	{
		id: 'butter',
		name: 'Butter',
		categoryId: 'dairy',
		searchTerms: ['butter', 'unsalted butter', 'salted butter'],
		isCommon: true
	},
	{
		id: 'cheese',
		name: 'Cheese',
		categoryId: 'dairy',
		searchTerms: ['cheese', 'cheddar', 'cheese blend'],
		isCommon: true
	},

	// Pantry
	{
		id: 'flour',
		name: 'All-Purpose Flour',
		categoryId: 'pantry',
		searchTerms: ['flour', 'all purpose flour', 'plain flour'],
		isCommon: true
	},
	{
		id: 'sugar',
		name: 'Sugar',
		categoryId: 'pantry',
		searchTerms: ['sugar', 'granulated sugar', 'white sugar'],
		isCommon: true
	},
	{
		id: 'salt',
		name: 'Salt',
		categoryId: 'pantry',
		searchTerms: ['salt', 'table salt', 'kosher salt'],
		isCommon: true
	},

	// Meat
	{
		id: 'chicken-breast',
		name: 'Chicken Breast',
		categoryId: 'meat',
		searchTerms: ['chicken', 'chicken breast', 'chicken breasts'],
		isCommon: true
	},
	{
		id: 'ground-beef',
		name: 'Ground Beef',
		categoryId: 'meat',
		searchTerms: ['beef', 'ground beef', 'hamburger'],
		isCommon: true
	},

	// Spices
	{
		id: 'black-pepper',
		name: 'Black Pepper',
		categoryId: 'spices',
		searchTerms: ['pepper', 'black pepper', 'ground pepper'],
		isCommon: true
	},
	{
		id: 'paprika',
		name: 'Paprika',
		categoryId: 'spices',
		searchTerms: ['paprika', 'ground paprika'],
		isCommon: true
	},

	// Grains
	{
		id: 'rice',
		name: 'White Rice',
		categoryId: 'grains',
		searchTerms: ['rice', 'white rice', 'long grain rice'],
		isCommon: true
	},
	{
		id: 'pasta',
		name: 'Pasta',
		categoryId: 'grains',
		searchTerms: ['pasta', 'spaghetti', 'noodles'],
		isCommon: true
	}
];

export function searchIngredients(query: string): Ingredient[] {
	if (!query) {
		return [];
	}

	return availableIngredients
		.filter((ingredient) =>
			ingredient.searchTerms.some((term) => term.toLowerCase().includes(query.toLowerCase()))
		)
		.slice(0, 10);
}

class SelectedIngredientsStore {
	ingredients = $state<Ingredient[]>([]);

	add(ingredient: Ingredient) {
		if (!this.ingredients.find((item) => item.id === ingredient.id)) {
			this.ingredients = [...this.ingredients, ingredient];
		}
	}

	remove(ingredientId: string) {
		this.ingredients = this.ingredients.filter((item) => item.id !== ingredientId);
	}

	clear() {
		this.ingredients = [];
	}

	size(): number {
		return this.ingredients.length;
	}

	contains(ingredient: Ingredient): boolean {
		return this.ingredients.some(i => i.id === ingredient.id);
	}

	get groupedSelected() {
		return this.ingredients.reduce(
			(groups, ingredient) => {
				const category = categories.find((c) => c.id === ingredient.categoryId);
				const categoryName = category ? category.displayName : 'Other';

				if (!groups[categoryName]) {
					groups[categoryName] = [];
				}

				groups[categoryName].push(ingredient);
				return groups;
			},
			{} as Record<string, Ingredient[]>
		);
	}
}

// Create a single instance of the manager
export const selectedIngredients = new SelectedIngredientsStore();