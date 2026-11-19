<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import PinChecker from '#lib/components/PinChecker.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { money, site } from '#lib/data/site.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const area = $derived(data.area);
	const picks = $derived(data.picks);
</script>

<svelte:head>
	<title>Flower Delivery in {area.name} — Bloom &amp; Co.</title>
	<meta
		name="description"
		content={`Same-day flower delivery in ${area.name}, Mumbai — ${area.fee === 0 ? 'free delivery' : `delivery ${money(area.fee)}`}, order by ${area.cutoff}. ${area.blurb}`}
	/>
</svelte:head>

<PageHero
	eyebrow="Delivery Area · Mumbai"
	title={`Flower Delivery in ${area.name}`}
	subtitle={area.blurb}
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-5 md:grid-cols-3">
		<div class="rounded-[2rem] bg-white p-7 ring-1 ring-line">
			<p class="text-xs font-bold tracking-wide text-rose-dark uppercase">Delivery fee</p>
			<p class="mt-2 font-display text-4xl font-bold text-leaf">{area.fee === 0 ? 'Free' : money(area.fee)}</p>
			<p class="mt-1 text-sm text-muted">Free on orders over ₹999, everywhere in Mumbai.</p>
		</div>
		<div class="rounded-[2rem] bg-white p-7 ring-1 ring-line">
			<p class="text-xs font-bold tracking-wide text-rose-dark uppercase">Same-day cutoff</p>
			<p class="mt-2 font-display text-4xl font-bold text-leaf">Order by {area.cutoff}</p>
			<p class="mt-1 text-sm text-muted">Orders after the cutoff go out first thing next morning.</p>
		</div>
		<div class="rounded-[2rem] bg-white p-7 ring-1 ring-line">
			<p class="text-xs font-bold tracking-wide text-rose-dark uppercase">PIN code</p>
			<p class="mt-2 font-display text-4xl font-bold text-leaf">{area.pin}</p>
			<p class="mt-1 text-sm text-muted">And nearby PIN codes — check yours below.</p>
		</div>
	</div>

	<div class="mt-10 grid gap-8 lg:grid-cols-2">
		<div>
			<h2 class="font-display text-3xl font-bold text-leaf">Where we deliver in {area.name}</h2>
			<ul class="mt-4 space-y-2 text-muted">
				{#each area.landmarks as place}
					<li class="flex items-start gap-2.5">
						<span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-rose" aria-hidden="true"></span>
						<span>{place}</span>
					</li>
				{/each}
			</ul>
			<p class="mt-5 leading-relaxed text-muted">
				We deliver to homes, offices, hotels and hospitals across {area.name}. For hospitals, we call the reception desk
				first; for hotels, we leave the bouquet at the concierge with the recipient’s name.
			</p>
			<p class="mt-3 text-sm text-muted">
				Our shop: {site.address} · {site.hours} · <a href={site.phoneHref} class="font-bold text-leaf">{site.phoneDisplay}</a>
			</p>
		</div>
		<PinChecker />
	</div>

	<section class="mt-14">
		<h2 class="font-display text-3xl font-bold text-leaf">Most loved in {area.name}</h2>
		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each picks as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	</section>
</section>
