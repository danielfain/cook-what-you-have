<script lang="ts">
	import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '$lib/components/ui/command';
	import { type Ingredient, searchIngredients, selectedIngredients } from '$lib/stores/ingredients.svelte.ts';
	import { slide } from 'svelte/transition';

	let isOpen = $state(false);
	let query = $state('');
	let searchResults = $state<Ingredient[]>([]);

	function handleInput() {
		// TODO: Debounce
		searchResults = searchIngredients(query);
	}

	function handleSelect(ingredient: Ingredient) {
		selectedIngredients.add(ingredient);
		query = '';
		searchResults = [];
		isOpen = false;
	}
</script>

<Command class="rounded-lg border shadow-md">
	<CommandInput placeholder="Search ingredients..." bind:value={query} oninput={handleInput} />

	{#if query || isOpen}
		<div class="max-h-[300px] overflow-y-auto" transition:slide|local={{ duration: 200 }}>
			{#if searchResults.length === 0}
				<CommandEmpty>No ingredients found.</CommandEmpty>
			{:else}
				<CommandGroup>
					{#each searchResults as ingredient}
						<CommandItem
							value={ingredient.name}
							onclick={() => handleSelect(ingredient)}
							class="cursor-pointer"
						>
							<span>{ingredient.name}</span>
						</CommandItem>
					{/each}
				</CommandGroup>
			{/if}
		</div>
	{/if}
</Command>

<style lang="postcss">
    .overflow-y-auto {
        scrollbar-width: thin;
        scrollbar-color: theme(colors.gray.200) transparent;
    }

    .overflow-y-auto::-webkit-scrollbar {
        width: 6px;
    }

    .overflow-y-auto::-webkit-scrollbar-track {
        background: transparent;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb {
        background-color: theme(colors.gray.200);
        border-radius: 3px;
    }
</style>
