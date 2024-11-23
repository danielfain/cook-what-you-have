import { availableIngredients } from "./ingredients";

export interface Category {
	id: string;
	name: string;
	displayName: string;
	icon: string;
}

export enum Unit {
	TSP = "tsp",
	TBSP = "tbsp",
	CUP = "cup",
	OZ = "oz",
	ML = "ml",
	L = "l",
	GRAM = "gram",
	KG = "kg",
	LB = "lb",
	MG = "mg",
	WHOLE = "whole",
	PIECE = "piece",
	SLICE = "slice",
	PINCH = "pinch",
	BUNCH = "bunch",
	CLOVE = "clove"
}

export enum MeasurementType {
	VOLUME = "Volume",
	WEIGHT = "Weight",
	COUNT = "Count"
}

export interface MeasurementUnit {
	unit: Unit
}

export interface Ingredient {
	id: string;
	name: string;
	categoryId: string;
	searchTerms: string[];
	isCommon: boolean;
}

export interface SelectedIngredient {
	ingredient: Ingredient;
	amount: number;
	unit: Unit;
}

export function searchIngredients(query: string): Ingredient[] {
	if (!query) {
		return [];
	}

	return availableIngredients
		.filter((ingredient) =>
			ingredient.searchTerms.some((term) =>
				term.toLowerCase().includes(query.toLowerCase())
			)
		)
		.slice(0, 5);
}
