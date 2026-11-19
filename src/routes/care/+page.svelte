<script lang="ts">
	import { Droplets, Scissors, Sun, Thermometer } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';

	const basics = [
		{ icon: Scissors, title: 'Trim the stems', text: 'Cut 1 inch off each stem at a 45° angle, under running water if you can. Repeat every 2–3 days.' },
		{ icon: Droplets, title: 'Fresh water, daily', text: 'Change the water every day and rinse the vase. Cloudy water is the number-one bouquet killer.' },
		{ icon: Sun, title: 'Cool and bright', text: 'Keep bouquets out of direct sun and away from radiators — and far from fruit bowls (ripening fruit releases ethylene).' },
		{ icon: Thermometer, title: 'Room temperature', text: 'Most flowers prefer 18–22°C. A cool room at night adds days to their life.' }
	];
	const perFlower = [
		{ name: 'Roses', tip: 'Remove any leaves below the waterline. If a head droops, re-cut the stem and stand it in warm water for an hour.' },
		{ name: 'Lilies', tip: 'Snip off the pollen stamens as they open — it stops orange stains and makes blooms last longer.' },
		{ name: 'Sunflowers', tip: 'They drink a lot. Top up the water twice a day and keep them in a tall, sturdy vase.' },
		{ name: 'Tulips', tip: 'They keep growing in the vase! Leave room at the top and re-trim every other day.' },
		{ name: 'Peonies', tip: 'Open slowly in the vase. If a bud feels stuck, hold it under lukewarm water for a minute.' },
		{ name: 'Orchids', tip: 'One ice cube a week, bright indirect light, and never overwater. Blooms last 2–3 months.' }
	];
</script>

<PageHero
	eyebrow="Flower Care Guide"
	title="Make Your Bouquet Last 10 Days, Not 3"
	subtitle="A little care goes a long way. Follow these four basics and your flowers will thank you — for over a week."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each basics as b}
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<b.icon size={30} class="text-rose" aria-hidden="true" />
				<h2 class="mt-4 font-display text-xl font-bold text-ink">{b.title}</h2>
				<p class="mt-2 leading-relaxed text-muted">{b.text}</p>
			</div>
		{/each}
	</div>

	<h2 class="mt-14 font-display text-3xl font-bold text-leaf">Care by flower</h2>
	<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each perFlower as f}
			<div class="rounded-3xl bg-blush p-6">
				<h3 class="font-display text-xl font-bold text-leaf">{f.name}</h3>
				<p class="mt-2 leading-relaxed text-muted">{f.tip}</p>
			</div>
		{/each}
	</div>

	<div class="mt-10 rounded-[2rem] bg-leaf px-6 py-10 text-center text-white sm:px-10">
		<p class="font-script text-4xl">Still stuck?</p>
		<p class="mx-auto mt-3 max-w-md leading-relaxed text-white/85">
			Send us a photo of your bouquet on WhatsApp and a florist will tell you exactly what it needs.
		</p>
		<a href="/contact" class="mt-6 inline-flex min-h-12 items-center rounded-full bg-white px-8 text-base font-bold text-leaf">
			Ask a florist →
		</a>
	</div>
</section>
