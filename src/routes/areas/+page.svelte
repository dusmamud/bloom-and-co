<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import PinChecker from '#lib/components/PinChecker.svelte';
	import { areas, money } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Flower Delivery Areas in Mumbai — Bloom &amp; Co.</title>
	<meta name="description" content="Bloom & Co. flower delivery areas in Mumbai — Bandra West, Andheri West, South Mumbai and Powai, with delivery fees and same-day cutoffs." />
</svelte:head>

<PageHero
	eyebrow="Delivery Areas"
	title="Flower Delivery Across Mumbai"
	subtitle="Same-day delivery in Bandra, Andheri, South Mumbai and Powai — with the fee and cutoff for each area, stated plainly."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-5 sm:grid-cols-2">
		{#each areas as area}
			<a href={`/areas/${area.id}`} class="group rounded-[2rem] bg-white p-7 ring-1 ring-line transition-shadow duration-200 hover:shadow-lg">
				<h2 class="font-display text-2xl font-bold text-leaf group-hover:text-rose-dark">{area.name}</h2>
				<p class="mt-2 leading-relaxed text-muted">{area.blurb}</p>
				<p class="mt-4 text-sm font-bold text-ink">
					Delivery {area.fee === 0 ? 'free' : money(area.fee)} · order by {area.cutoff} · PIN {area.pin}
				</p>
				<p class="mt-1 text-sm text-muted">We deliver to: {area.landmarks.join(', ')}</p>
				<p class="mt-4 text-sm font-bold text-rose-dark">See delivery details →</p>
			</a>
		{/each}
	</div>

	<div class="mt-10">
		<PinChecker />
	</div>
	<p class="mt-6 text-center text-muted">
		Outside these areas? We deliver across all of Mumbai — check your PIN above, or
		<a href="/contact" class="font-bold text-rose-dark underline-offset-4 hover:underline">write to us</a>.
	</p>
</section>
