<script lang="ts">
	import {
		searchIngredients,
		selectedIngredients,
		type Ingredient
	} from '$lib/stores/ingredients.svelte.ts';

	let ingredientQuery = $state('');
	let ingredientResults = $state<Ingredient[]>([]);

	function handleInput() {
		ingredientResults = searchIngredients(ingredientQuery);
	}

	function handleAddIngredient(ingredient: Ingredient) {
		selectedIngredients.add(ingredient);
		ingredientQuery = '';
		ingredientResults = [];
	}
</script>

<div class="w-full">
	<input
		class="w-full p-1 text-s"
		type="text"
		bind:value={ingredientQuery}
		oninput={handleInput}
		placeholder="Search ingredients..."
	/>

	{#if ingredientQuery && ingredientResults.length > 0}
		<ul class="w-full max-h-52 p-0 mt-1">
			{#each ingredientResults as ingredient}
				<li class="p-1 hover:bg-slate-300" onclick={() => handleAddIngredient(ingredient)}>
					{ingredient.name}
				</li>
			{/each}
		</ul>
	{/if}
</div>
