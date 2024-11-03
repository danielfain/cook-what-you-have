<script lang="ts">
	import {
		type Ingredient,
		type Category,
		selectedIngredients
	} from '$lib/stores/ingredients.svelte';
	import { availableIngredients } from '$lib/stores/ingredients';
	import { categories } from '$lib/stores/categories';
	import { Badge } from './ui/badge';
	import { Card } from '$lib/components/ui/card';
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import { ScrollArea } from './ui/scroll-area';
	import {
		Apple,
		Gauge,
		Beef,
		Check,
		Milk,
		Plus,
		Flower2,
		Wheat,
		Cake,
		Cookie,
		Beer,
		Fish,
		Pizza,
		MessageCircleQuestion
	} from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	let selectedCategory = $state<Category>();
	let isModalOpen = $state(false);
	const categoryIngredients: Ingredient[] = $derived.by(() => {
		if (!selectedCategory) {
			return [];
		}

		return availableIngredients.filter((i) => i.categoryId === selectedCategory?.id);
	});

	function getCategoryIngredientCount(categoryId: string): number {
		return availableIngredients.filter((i) => i.categoryId === categoryId).length;
	}

	function handleIngredientClick(ingredient: Ingredient): void {
		if (!selectedIngredients.contains(ingredient)) {
			selectedIngredients.add(ingredient);
		}
	}

	function handleCategoryClick(category: Category): void {
		selectedCategory = category;
		isModalOpen = true;
	}

	function getCategoryIcon(categoryId: string): ComponentType {
		const iconMap: Record<string, ComponentType> = {
			produce: Apple,
			dairy: Milk,
			pantry: Gauge,
			meat: Beef,
			spices: Flower2,
			grains: Wheat,
			seafood: Fish,
			baking: Cake,
			snacks: Cookie,
			beverages: Beer,
			prepared: Pizza
		};

		return iconMap[categoryId] ?? MessageCircleQuestion;
	}
</script>

<h1 class="text-xl font-bold">Browse</h1>

<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
	{#each categories as category}
		{@const CategoryIcon = getCategoryIcon(category.id)}

		<Card
			class="group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
			onclick={() => handleCategoryClick(category)}
		>
			<div class="p-6 flex flex-col items-center text-center space-y-4">
				<div class="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
					<CategoryIcon class="w-8 h-8 text-primary" />
				</div>
				<h3 class="font-semibold text-lg group-hover:text-primary transition-colors">
					{category.displayName}
				</h3>
				<Badge variant="secondary">
					{getCategoryIngredientCount(category.id)} ingredients
				</Badge>
			</div>
		</Card>
	{/each}
</div>

<Dialog
	open={isModalOpen}
	closeOnEscape
	closeOnOutsideClick
	onOpenChange={() => (isModalOpen = false)}
>
	<DialogContent class="max-w-3xl">
		<DialogHeader>
			<DialogTitle class="flex items-center gap-2 text-2xl">
				{#if selectedCategory}
					{@const CategoryIcon = getCategoryIcon(selectedCategory.id)}
					<CategoryIcon class="w-8 h-8" />
					{selectedCategory.displayName}
				{/if}
			</DialogTitle>
		</DialogHeader>

		<ScrollArea class="h-[500px] pr-4">
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-4">
				{#each categoryIngredients as ingredient}
					{@const isSelected: boolean = selectedIngredients.contains(ingredient)}

					<button
						class="relative group"
						class:opacity-75={isSelected}
						disabled={isSelected}
						onclick={() => handleIngredientClick(ingredient)}
					>
						<Card
							class="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
						>
							<div class="p-4 flex flex-col items-center text-center gap-3">
								{#if isSelected}
									<div class="absolute top-2 right-2">
										<div class="bg-primary text-primary-foreground rounded-full p-1">
											<Check class="w-4 h-4" />
										</div>
									</div>
								{:else}
									<div
										class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<div class="bg-primary text-primary-foreground rounded-full p-1">
											<Plus class="w-4 h-4" />
										</div>
									</div>
								{/if}

								{#if selectedCategory}
									{@const CategoryIcon = getCategoryIcon(selectedCategory.id)}

									<div class="p-3 bg-secondary rounded-full">
										<CategoryIcon class="w-6 h-6" />
									</div>
								{/if}

								<span class="font-medium text-sm">
									{ingredient.name}
								</span>
							</div>
						</Card>
					</button>
				{/each}
			</div>
		</ScrollArea>
	</DialogContent>
</Dialog>

<style lang="postcss">
	/* Optional: Customize scrollbar */
	:global(.scroll-area-viewport) {
		scrollbar-width: thin;
		scrollbar-color: theme(colors.gray.200) transparent;
	}
</style>
