<script lang="ts">
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "./ui/select";
    import { Input } from "./ui/input";
    import { Label } from "./ui/label";
    import { Button } from "./ui/button";
    import { Scale, Beaker, Hash, CircleAlert } from "lucide-svelte";
    import type { ComponentType } from "svelte";
    import {
        MeasurementType,
        Unit,
        type Ingredient,
    } from "$lib/stores/ingredients.svelte";
    import { Alert } from "./ui/alert";
    import AlertTitle from "./ui/alert/alert-title.svelte";
    import AlertDescription from "./ui/alert/alert-description.svelte";

    interface Props {
        ingredient: Ingredient;
        save: (ingredient: Ingredient, amount: number, unit: Unit) => void;
    }

    let { ingredient, save }: Props = $props();

    let quantity = $state("1");
    let fraction = $state("");
    let selectedUnit = $state<Unit>();
    let selectedMeasurementType = $state("Volume");
    let error = $state("");

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

    function parseFraction(fractionStr: string): number {
        if (!fractionStr) {
            return 0;
        }
        const [numerator, denominator] = fractionStr.split("/").map(Number);
        return numerator / denominator;
    }

    function parseQuantity(quantityStr: string): number {
        if (!quantityStr) {
            return 0;
        }

        return parseInt(quantityStr);
    }

    function handleSave(): void {
        error = "";

        if (!selectedUnit) {
            error = "Please select a unit";
            return;
        }

        const amount = parseQuantity(quantity) + parseFraction(fraction);
        if (amount <= 0) {
            error = "Amount must be greater than 0";
            return;
        }

        save(ingredient, amount, selectedUnit);
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
            min="0"
        />
    </div>

    <div class="col-span-3">
        <Label for="fraction">Fraction</Label>

        <Select items={fractionOptions}>
            <SelectTrigger value={fraction} id="fraction">
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

{#if error}
    <Alert variant="destructive" class="mt-4">
        <CircleAlert class="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
    </Alert>
{/if}

<div class="flex justify-center">
    <Button on:click={handleSave}>Save</Button>
</div>
