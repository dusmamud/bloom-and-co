<script lang="ts">
	import { Check } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { money, plans } from '#lib/data/site.ts';

	let chosen = $state('');
</script>

<PageHero
	eyebrow="Flower Subscriptions"
	title="Fresh Flowers, Every Month, On Autopilot"
	subtitle="A seasonal bouquet at your door, every month. Pause, skip or cancel anytime — no commitments, just flowers."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-6 lg:grid-cols-3">
		{#each plans as plan, i}
			<article
				class="flex flex-col overflow-hidden rounded-[2rem] bg-white ring-1 {i === 1
					? 'ring-2 ring-rose shadow-lg'
					: 'ring-line'}"
			>
				<div class="relative">
					<Picture
						name={plan.image}
						alt={`${plan.name} subscription bouquet`}
						width={800}
						height={800}
						sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
						imgClass="aspect-[16/10] w-full object-cover"
					/>
					{#if i === 1}
						<span class="absolute top-3 left-3 rounded-full bg-rose px-3 py-1 text-xs font-bold text-white">Most popular</span>
					{/if}
				</div>
				<div class="flex flex-1 flex-col p-6">
					<h2 class="font-display text-2xl font-bold text-leaf">{plan.name}</h2>
					<p class="mt-2 flex items-baseline gap-1">
						<span class="text-4xl font-black text-ink">{money(plan.price)}</span>
						<span class="text-muted">{plan.per}</span>
					</p>
					<p class="mt-2 leading-relaxed text-muted">{plan.blurb}</p>
					<ul class="mt-5 flex-1 space-y-2.5">
						{#each plan.features as f}
							<li class="flex items-start gap-2.5 text-sm text-ink">
								<Check size={17} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" /> {f}
							</li>
						{/each}
					</ul>
					{#if chosen === plan.id}
						<p class="mt-6 rounded-2xl bg-leaf-soft px-4 py-3 text-center text-sm font-bold text-leaf">
							You’re in! (Mock) — we’ll email you to confirm your first {plan.name} box.
						</p>
					{:else}
						<button
							type="button"
							onclick={() => (chosen = plan.id)}
							class="mt-6 flex min-h-12 items-center justify-center rounded-full text-base font-bold text-white transition-colors duration-200 {i === 1
								? 'bg-rose hover:bg-rose-dark'
								: 'bg-leaf hover:bg-leaf-dark'}"
						>
							Subscribe to {plan.name}
						</button>
					{/if}
				</div>
			</article>
		{/each}
	</div>
	<div class="mx-auto mt-10 max-w-3xl rounded-[2rem] bg-blush px-6 py-8 text-center">
		<h2 class="font-display text-2xl font-bold text-leaf">How it works</h2>
		<ol class="mt-5 grid gap-4 text-left sm:grid-cols-3">
			<li class="rounded-2xl bg-white p-4 ring-1 ring-line">
				<p class="font-bold text-rose-dark">1 · Pick a plan</p>
				<p class="mt-1 text-sm leading-relaxed text-muted">Choose Petal, Bloom or Grand Bloom. Change plans anytime.</p>
			</li>
			<li class="rounded-2xl bg-white p-4 ring-1 ring-line">
				<p class="font-bold text-rose-dark">2 · We arrange it</p>
				<p class="mt-1 text-sm leading-relaxed text-muted">Our florists build your bouquet from the freshest seasonal stems.</p>
			</li>
			<li class="rounded-2xl bg-white p-4 ring-1 ring-line">
				<p class="font-bold text-rose-dark">3 · It arrives</p>
				<p class="mt-1 text-sm leading-relaxed text-muted">Free delivery, first week of the month, with a care card.</p>
			</li>
		</ol>
	</div>
</section>
