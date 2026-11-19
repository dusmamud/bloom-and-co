<script lang="ts">
	import { ArrowRight, CalendarHeart, Gift, MapPin, Search } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import PinChecker from '#lib/components/PinChecker.svelte';
	import { occasions } from '#lib/data/site.ts';

	const steps = [
		{
			icon: Search,
			title: '1. Pick your flowers',
			text: 'Browse by occasion, flower or price — or start with our bestsellers. Every bouquet shows its size, stems and price up front.'
		},
		{
			icon: CalendarHeart,
			title: '2. Pick a date & a message',
			text: 'Choose a delivery date (today, if you order by 2pm), add a free hand-written card message, and pick any extras — vase, chocolates, balloon.'
		},
		{
			icon: Gift,
			title: '3. We deliver today',
			text: 'Our florists hand-tie your bouquet and deliver it across Mumbai. You get a text when it leaves the shop and a photo when it arrives.'
		}
	];
</script>

<svelte:head>
	<title>How It Works — Bloom &amp; Co.</title>
	<meta name="description" content="First time ordering flowers online? How Bloom & Co. works in 3 steps — pick, pick a date and message, we deliver today in Mumbai." />
</svelte:head>

<PageHero
	eyebrow="First Visit?"
	title="Ordering Flowers, in 3 Easy Steps"
	subtitle="New here? This is everything you need to know — no account, no fuss, and same-day delivery if you order by 2pm."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-5 md:grid-cols-3">
		{#each steps as step}
			<article class="rounded-[2rem] bg-white p-7 ring-1 ring-line">
				<span class="flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft text-rose-dark">
					<step.icon size={26} aria-hidden="true" />
				</span>
				<h2 class="mt-4 font-display text-2xl font-bold text-leaf">{step.title}</h2>
				<p class="mt-2 leading-relaxed text-muted">{step.text}</p>
			</article>
		{/each}
	</div>

	<div class="mt-10 grid gap-5 lg:grid-cols-2">
		<PinChecker />
		<div class="rounded-3xl bg-leaf p-6 text-white sm:p-8">
			<p class="flex items-center gap-2 font-display text-2xl font-bold"><MapPin size={22} aria-hidden="true" /> Not sure what to send?</p>
			<p class="mt-2 leading-relaxed text-white/80">
				Tell us the occasion and we will point you to the right bouquet. Birthdays love bright and cheerful, anniversaries
				love roses and peonies, and sympathy calls for quiet whites.
			</p>
			<div class="mt-5 flex flex-wrap gap-2">
				{#each occasions as o}
					<a
						href={`/occasions/${o.id}`}
						class="rounded-full bg-white/15 px-4 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-white/25"
					>
						{o.name}
					</a>
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-10 rounded-[2rem] bg-blush px-6 py-10 text-center sm:px-10">
		<p class="font-script text-4xl text-rose sm:text-5xl">Ready when you are</p>
		<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
			First order? Use code <strong class="text-ink">BLOOM10</strong> at checkout for 10% off (mock code for the design review).
		</p>
		<a
			href="/shop"
			class="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-rose px-8 text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark"
		>
			Shop bestsellers <ArrowRight size={19} aria-hidden="true" />
		</a>
	</div>
</section>
