<script lang="ts">
	import { Gift } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { hamperPicks } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Hampers &amp; Combos — Bloom &amp; Co.</title>
	<meta name="description" content="Bloom & Co. hampers and combos — roses with chocolates, cake with flowers, dry fruits with lilies. The gift that covers every base." />
</svelte:head>

<PageHero
	eyebrow="Hampers & Combos"
	title="Flowers, Plus a Little More"
	subtitle="Roses with chocolates, cake with a bouquet, dry fruits with lilies — when flowers alone are not quite enough."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each hamperPicks as product (product.id)}
			<ProductCard {product} />
		{/each}
	</div>

	<div class="mt-12 rounded-[2rem] bg-leaf px-6 py-10 text-white sm:px-10">
		<p class="flex items-center gap-2 font-display text-2xl font-bold"><Gift size={24} aria-hidden="true" /> What is inside a hamper?</p>
		<p class="mt-3 max-w-2xl leading-relaxed text-white/80">
			Every hamper shows exactly what is inside — the bouquet, the treats, and the box — with a photo, not a generic
			“gift hamper” tile. Choose Classic, Deluxe or Grand on the product page: more stems, more treats, same careful packing.
			Festive and corporate gifting? See our <a href="/corporate" class="font-bold text-white underline underline-offset-4">corporate page</a>.
		</p>
	</div>
</section>
