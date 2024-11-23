import type { Ingredient, Unit } from "./ingredients.svelte";

export interface SelectedIngredient {
    ingredient: Ingredient;
    amount: number;
    unit: Unit;
}

let selectedIngredients = $state<SelectedIngredient[]>([]);

export function select(ingredient: Ingredient, amount: number, unit: Unit): void {
    const alreadySelected = selectedIngredients.some(selectedIngredient => selectedIngredient.ingredient.id === ingredient.id);

    if (!alreadySelected) {
        selectedIngredients.push({ ingredient, amount, unit });
    } else {
        console.error('Tried to select an ingredient previously selected. Should not be possible.');
    }
}

export function remove(ingredientId: string): void {
    selectedIngredients = selectedIngredients.filter(selectedIngredient => selectedIngredient.ingredient.id !== ingredientId);
}

export function clear() {
    selectedIngredients = [];
}

export function size() {
    return selectedIngredients.length;
}

export function contains(ingredientId: string): boolean {
    return selectedIngredients.some(selectedIngredient => selectedIngredient.ingredient.id === ingredientId);
}

export function getGroupedIngredients(): Record<string, SelectedIngredient[]> {
    return selectedIngredients.reduce((groups, ingredient) => {
        const categoryId = ingredient.ingredient.categoryId;
        if (!groups[categoryId]) {
            groups[categoryId] = [];
        }
        groups[categoryId].push(ingredient);
        return groups;
    }, {} as Record<string, SelectedIngredient[]>);
}
