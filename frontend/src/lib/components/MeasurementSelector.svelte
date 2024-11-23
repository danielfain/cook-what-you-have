<script lang="ts">
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectTrigger,
		SelectValue,
	} from "./ui/select";
	import { Input } from "./ui/input";
	import { Label } from "./ui/label";
	import { Button } from "./ui/button";
	import { Scale, Beaker, Hash } from "lucide-svelte";
	import type { ComponentType } from "svelte";
	import {
		MeasurementType,
		Unit,
		type Ingredient,
	} from "$lib/stores/ingredients.svelte";

	interface Props {
		ingredient: Ingredient;
		save: (ingredient: Ingredient, amount: number, unit: Unit) => void;
	}

	let { ingredient, save }: Props = $props();

	let quantity = $state("1");
	let fraction = $state("");
	let selectedUnit = $state<Unit>();
	let selectedMeasurementType = $state("Volume");

	const fractionOptions = [
		{ value: "", label: "" },
		{ value: "1/4", label: "¼" },
		{ value: "1/3", label: "⅓" },
		{ value: "1/2", label: "½" },
		{ value: "2/3", label: "⅔" },
		{ value: "3/4", label: "¾" },
	];

	type MeasurementOption = {
		type: MeasurementType;
		icon: ComponentType;
		units: Unit[];
	};

	const measurementOptions: MeasurementOption[] = [
		{
			type: MeasurementType.VOLUME,
			icon: Beaker,
			units: [Unit.TSP, Unit.TBSP, Unit.CUP, Unit.OZ, Unit.ML, Unit.L],
		},
		{
			type: MeasurementType.WEIGHT,
			icon: Scale,
			units: [Unit.GRAM, Unit.KG, Unit.OZ, Unit.LB, Unit.MG],
		},
		{
			type: MeasurementType.COUNT,
			icon: Hash,
			units: [
				Unit.WHOLE,
				Unit.PIECE,
				Unit.SLICE,
				Unit.PINCH,
				Unit.BUNCH,
				Unit.CLOVE,
			],
		},
	];

	function handleSave() {
		if (!selectedUnit) {
			console.error("Unit is required");
			return;
		}

		save(ingredient, parseInt(quantity), selectedUnit);
	}
</script>

<div class="space-y-2 pb-4">
	<Label>Measurement Type</Label>
	<div class="flex gap-2">
		{#each measurementOptions as { icon: Icon, type }}
			<Button
				variant={selectedMeasurementType === type
					? "default"
					: "outline"}
				class="flex-1"
				on:click={() => {
					selectedMeasurementType = type;
				}}
			>
				<Icon class="w-4 h-4 mr-2" />
				{type}
			</Button>
		{/each}
	</div>
</div>

<div class="grid grid-cols-12 gap-4">
	<div class="col-span-4">
		<Label for="quantity">Amount</Label>

		<Input
			id="quantity"
			type="number"
			inputmode="decimal"
			value={quantity}
		/>
	</div>

	<div class="col-span-3">
		<Label for="fraction">Fraction</Label>

		<Select items={fractionOptions}>
			<SelectTrigger id="fraction">
				<SelectValue placeholder="—" />
			</SelectTrigger>

			<SelectContent>
				{#each fractionOptions as { value, label }}
					<SelectItem {value}>{label}</SelectItem>
				{/each}
			</SelectContent>
		</Select>
	</div>

	<div class="col-span-5">
		<Label for="unit">Unit</Label>

		<Select>
			<SelectTrigger id="unit">
				<SelectValue placeholder="Select unit" />
			</SelectTrigger>

			<SelectContent>
				{#each measurementOptions as { type, units }}
					{#if selectedMeasurementType === type}
						{#each units as unit}
							<SelectItem
								value={unit}
								on:click={() => (selectedUnit = unit)}
							>
								{unit}
							</SelectItem>
						{/each}
					{/if}
				{/each}
			</SelectContent>
		</Select>
	</div>
</div>

<div class="flex justify-center">
	<Button on:click={handleSave}>Save</Button>
</div>
