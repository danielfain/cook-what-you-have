<script>
	import IngredientSearch from '$lib/components/IngredientSearch.svelte';
	import SelectedIngredients from '$lib/components/SelectedIngredients.svelte';
</script>

<div class="flex flex-col items-center m-5">
	<div class="w-3/4 mb-5">
		<IngredientSearch />
	</div>

	<SelectedIngredients />
</div>
