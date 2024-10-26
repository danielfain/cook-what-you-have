<script>
	import IngredientSearch from '$lib/components/IngredientSearch.svelte';
	import SelectedIngredients from '$lib/components/SelectedIngredients.svelte';
	import IngredientCategories from '$lib/components/IngredientCategories.svelte';
</script>

<div class="flex flex-col items-center m-5 space-y-5">
	<div class="w-3/4">
		<IngredientSearch />
	</div>

	<SelectedIngredients />

	<IngredientCategories />
</div>
