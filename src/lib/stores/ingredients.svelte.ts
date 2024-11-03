import { availableIngredients } from './ingredients';
import { categories } from './categories';

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

export const selectedIngredients = new SelectedIngredientsStore();