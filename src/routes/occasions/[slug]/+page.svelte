<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const occasion = $derived(data.occasion);
	const items = $derived(data.items);
</script>

<svelte:head>
	<title>{occasion.name} Flowers — Bloom &amp; Co.</title>
	<meta name="description" content={`${occasion.name} flowers — ${occasion.description}`} />
</svelte:head>

<PageHero eyebrow="Shop by Occasion" title={`${occasion.name} Flowers`} subtitle={occasion.description} />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<p class="text-sm font-semibold text-muted" aria-live="polite">
		{items.length} bouquet{items.length === 1 ? '' : 's'} for {occasion.name}
	</p>
	<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each items as product (product.id)}
			<ProductCard {product} />
		{/each}
	</div>
	<p class="mt-10 text-center">
		<a href="/occasions" class="font-bold text-rose-dark underline-offset-4 hover:underline">
			← Browse all occasions
		</a>
	</p>
</section>
