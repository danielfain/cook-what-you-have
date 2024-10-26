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
export const availableIngredients: Ingredient[] = [
	{
		id: 'onion',
		name: 'Onion',
		categoryId: 'produce',
		searchTerms: ['onion', 'yellow onion', 'brown onion', 'red onion'],
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
		id: 'milk',
		name: 'Milk',
		categoryId: 'dairy',
		searchTerms: ['milk', 'whole milk', 'dairy'],
		isCommon: true
	},
];

class SelectedIngredientStore {
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

	search(query: string): Ingredient[] {
		if (!query) {
			return [];
		}

		return availableIngredients
			.filter((ingredient) =>
				ingredient.searchTerms.some((term) => term.toLowerCase().includes(query.toLowerCase()))
			)
			.slice(0, 10);
	}

	getByCategory(categoryId: string): Ingredient[] {
		return availableIngredients.filter((ingredient) => ingredient.categoryId === categoryId);
	}

	getCommonIngredients(): Ingredient[] {
		return availableIngredients.filter((ingredient) => ingredient.isCommon);
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
export const selectedIngredients = new SelectedIngredientStore();