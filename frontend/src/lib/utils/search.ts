import type { Ingredient } from '$lib/stores/ingredients.svelte';

export function searchIngredients(
    ingredients: Ingredient[],
    query: string,
    options = { limit: 10, onlyCommon: false }
): Ingredient[] {
    if (!query) {
        return options.onlyCommon
            ? ingredients.filter(i => i.isCommon).slice(0, options.limit)
            : ingredients.slice(0, options.limit);
    }

    const searchQuery = query.toLowerCase();

    // Score each ingredient based on match quality
    const scored = ingredients
        .map(ingredient => {
            let score = 0;

            // Exact name match gets highest score
            if (ingredient.name.toLowerCase() === searchQuery) {
                score += 100;
            }

            // Starting with search query gets high score
            if (ingredient.name.toLowerCase().startsWith(searchQuery)) {
                score += 50;
            }

            // Each search term match adds to score
            ingredient.searchTerms.forEach(term => {
                if (term.toLowerCase().includes(searchQuery)) {
                    score += 25;
                }
            });

            // Common ingredients get a small boost
            if (ingredient.isCommon) {
                score += 10;
            }

            return { ingredient, score };
        })
        .filter(({ score }) => score > 0) // Only include matches
        .sort((a, b) => b.score - a.score) // Sort by score
        .slice(0, options.limit) // Limit results
        .map(({ ingredient }) => ingredient); // Return just the ingredients

    return scored;
}