<script lang="ts">
	import {
		getGroupedIngredients,
		size,
		remove,
		clear,
	} from "$lib/stores/selected-ingredients.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";
	import { Scale, Trash2 } from "lucide-svelte";
	import { slide } from "svelte/transition";
</script>

<Card class="w-full">
	<CardHeader
		class="flex flex-row items-center justify-between space-y-0 pb-4"
	>
		<CardTitle class="text-xl font-bold">My Ingredients</CardTitle>

		{#if size() > 0}
			<div class="flex items-center gap-2">
				<Badge variant="secondary">
					<Scale class="w-3 h-3 mr-1" />
					{size()}
				</Badge>
				<Button
					variant="ghost"
					size="sm"
					on:click={clear}
					class="text-destructive hover:text-destructive hover:bg-destructive/10"
				>
					<Trash2 class="w-4 h-4" />
				</Button>
			</div>
		{/if}
	</CardHeader>

	<CardContent>
		{#if size() === 0}
			<div
				class="flex flex-col items-center justify-center py-8 text-center text-muted-foreground"
			>
				<div class="text-sm">No ingredients selected yet</div>
			</div>
		{:else}
			<div class="space-y-6">
				{#each Object.entries(getGroupedIngredients()) as [category, selectedIngredients]}
					<div transition:slide>
						<div class="flex items-center gap-2 mb-2">
							<h3
								class="text-sm font-medium text-muted-foreground"
							>
								{category}
							</h3>
							<Badge variant="outline" size="sm">
								{size()}
							</Badge>
						</div>

						<div class="flex flex-wrap gap-2">
							{#each selectedIngredients as selectedIngredient}
								<Badge
									variant="secondary"
									class="pl-3 pr-2 py-1.5 flex items-center gap-2 group"
								>
									{selectedIngredient.ingredient.name}
									<Button
										variant="ghost"
										size="icon"
										class="h-4 w-4 p-0 opacity-50 group-hover:opacity-100 transition-opacity"
										on:click={() =>
											remove(
												selectedIngredient.ingredient
													.id,
											)}
									>
										<Trash2 class="h-3 w-3" />
										<span class="sr-only">
											Remove {selectedIngredient
												.ingredient.name}
										</span>
									</Button>
								</Badge>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>
