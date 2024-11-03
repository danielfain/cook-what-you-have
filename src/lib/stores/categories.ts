import { type Category } from '$lib/stores/ingredients.svelte';

export const categories: Category[] = [
    { id: 'produce', name: 'produce', displayName: 'Fruits & Vegetables', icon: 'apple' },
    { id: 'dairy', name: 'dairy', displayName: 'Dairy & Eggs', icon: 'milk' },
    { id: 'pantry', name: 'pantry', displayName: 'Pantry Staples', icon: 'package' },
    { id: 'meat', name: 'meat', displayName: 'Meat & Seafood', icon: 'beef' },
    { id: 'spices', name: 'spices', displayName: 'Herbs & Spices', icon: 'pepper' },
    { id: 'grains', name: 'grains', displayName: 'Grains & Pasta', icon: 'wheat' }
];