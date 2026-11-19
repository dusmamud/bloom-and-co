<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { plantPicks } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Plants — Bloom &amp; Co.</title>
	<meta name="description" content="Bloom & Co. plants in Mumbai — monstera, snake plant, money plant and orchids in ceramic pots. Long-lasting gifts with care cards." />
</svelte:head>

<PageHero
	eyebrow="Plants"
	title="Gifts That Keep Growing"
	subtitle="Potted plants in ceramic pots — monstera, snake plant, money plant and orchids. They outlast any bouquet by months, even years."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each plantPicks as product (product.id)}
			<ProductCard {product} />
		{/each}
	</div>

	<div class="mt-12 grid gap-5 md:grid-cols-3">
		{#each [
			{ t: 'Bright, indirect light', d: 'Most indoor plants are happiest near a window — but not in harsh afternoon sun.' },
			{ t: 'Water once a week', d: 'A weekly water is enough for most of our plants. Less in winter, a little more in May.' },
			{ t: 'Every plant ships with a care card', d: 'Light, water and repotting — written plainly, so the gift keeps growing.' }
		] as tip}
			<article class="rounded-[2rem] bg-white p-6 ring-1 ring-line">
				<h2 class="font-display text-xl font-bold text-leaf">{tip.t}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">{tip.d}</p>
			</article>
		{/each}
	</div>

	<p class="mt-10 text-center text-muted">
		Looking for a bouquet instead? <a href="/shop" class="font-bold text-rose-dark underline-offset-4 hover:underline">Shop all flowers →</a>
	</p>
</section>
