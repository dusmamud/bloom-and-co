<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { testimonials } from '#lib/data/site.ts';

	const avg = (testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length).toFixed(1);
	const dist = [
		{ stars: 5, pct: 82 },
		{ stars: 4, pct: 13 },
		{ stars: 3, pct: 4 },
		{ stars: 2, pct: 1 },
		{ stars: 1, pct: 0 }
	];
</script>

<PageHero
	eyebrow="Reviews"
	title="What Our Customers Say"
	subtitle="Real words from real flower-givers. Every review below is mock data for the design review."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="mx-auto grid max-w-4xl gap-8 rounded-[2rem] bg-blush p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
		<div class="text-center md:text-left">
			<p class="font-display text-6xl font-bold text-leaf">{avg}</p>
			<Stars rating={Number(avg)} size={20} />
			<p class="mt-2 text-sm font-semibold text-muted">Based on 480+ reviews</p>
		</div>
		<div class="space-y-2">
			{#each dist as d}
				<div class="flex items-center gap-3 text-sm">
					<span class="w-8 shrink-0 font-bold text-ink">{d.stars}★</span>
					<div class="h-2.5 flex-1 overflow-hidden rounded-full bg-white">
						<div class="h-full rounded-full bg-rose" style="width: {d.pct}%"></div>
					</div>
					<span class="w-9 shrink-0 text-right text-muted">{d.pct}%</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
		{#each testimonials as t}
			<figure class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<Stars rating={t.rating} size={17} />
				<blockquote class="mt-3 leading-relaxed text-ink">“{t.text}”</blockquote>
				<figcaption class="mt-4">
					<p class="font-bold text-ink">{t.name}</p>
					<p class="text-sm text-muted">{t.occasion}</p>
				</figcaption>
			</figure>
		{/each}
	</div>
	<p class="mt-10 text-center">
		<a href="/shop" class="inline-flex min-h-12 items-center rounded-full bg-rose px-8 text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark">
			Order your bouquet →
		</a>
	</p>
</section>
