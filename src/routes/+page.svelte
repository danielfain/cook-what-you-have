<script>
	import IngredientSearch from '$lib/components/IngredientSearch.svelte';
	import SelectedIngredients from '$lib/components/SelectedIngredients.svelte';
</script>

<div class="flex flex-col items-center w-full">
	<h1 class="p-3 items-center">Ingredients</h1>

	<div class="w-3/4">
		<IngredientSearch />
	</div>

	<SelectedIngredients />
</div>
