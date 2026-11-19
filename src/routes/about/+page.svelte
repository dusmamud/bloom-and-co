<script lang="ts">
	import { Flower2, HandHeart, Leaf, Truck } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	const values = [
		{ icon: Flower2, title: 'Fresh, always', text: 'Stems arrive from growers each morning. Anything past its best goes to compost, never into a bouquet.' },
		{ icon: HandHeart, title: 'Hand-tied, never machine-made', text: 'Every bouquet is arranged by a florist who knows your occasion — not an assembly line.' },
		{ icon: Leaf, title: 'Grown kindly', text: 'Local Maharashtra growers first, certified farms for the rest, and wrapping you can compost.' },
		{ icon: Truck, title: 'Delivered with care', text: 'Our own couriers, not a gig app — flowers upright, watered, and on time.' }
	];
	const milestones = [
		{ year: '2016', text: 'Maya opens a tiny stall at the Bandra flower market with a bicycle and a bucket of roses.' },
		{ year: '2019', text: 'Bloom & Co. moves into its Rosewood Lane shop — and hires its first two florists.' },
		{ year: '2022', text: 'Same-day delivery launches across Mumbai, with our own courier team.' },
		{ year: '2026', text: '12,000+ bouquets a year, a monthly subscription club, and still hand-tied, every single one.' }
	];
</script>

<PageHero
	eyebrow="About Bloom & Co."
	title="A Little Flower Shop With a Big Heart"
	subtitle="We started with a market stall and a bicycle. Ten years later, we still arrange every bouquet by hand — because flowers are feelings, and feelings deserve a human touch."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid items-center gap-10 lg:grid-cols-2">
		<div class="overflow-hidden rounded-[2rem] shadow-xl">
			<Picture
				name="about-florist"
				alt="Florist arranging a pink rose bouquet inside the Bloom & Co. shop"
				width={1600}
				height={1067}
				sizes="(min-width: 1024px) 50vw, 100vw"
				imgClass="aspect-[4/3] w-full object-cover"
			/>
		</div>
		<div>
			<p class="font-script text-4xl text-rose">Hi, I’m Maya</p>
			<p class="mt-4 text-lg leading-relaxed text-muted">
				I founded Bloom &amp; Co. because I believe a bouquet is never just flowers. It is the apology you could not
				find words for, the congratulations that arrived before the phone call, the Tuesday that became somebody’s
				best day.
			</p>
			<p class="mt-4 text-lg leading-relaxed text-muted">
				Today our team of six florists works out of a sunlit shop on Rosewood Lane. We buy from local growers
				whenever the season allows, we compost every stem that does not make the cut, and we still hand-write
				every card message — because a printed message is not a message.
			</p>
			<div class="mt-8 grid grid-cols-3 gap-4 text-center">
				<div class="rounded-3xl bg-blush px-3 py-5">
					<p class="font-display text-3xl font-bold text-leaf">10 yrs</p>
					<p class="mt-1 text-sm text-muted">Blooming since 2016</p>
				</div>
				<div class="rounded-3xl bg-blush px-3 py-5">
					<p class="font-display text-3xl font-bold text-leaf">12k+</p>
					<p class="mt-1 text-sm text-muted">Bouquets a year</p>
				</div>
				<div class="rounded-3xl bg-blush px-3 py-5">
					<p class="font-display text-3xl font-bold text-leaf">4.9★</p>
					<p class="mt-1 text-sm text-muted">From 480+ reviews</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
		<h2 class="text-center font-display text-4xl font-bold text-leaf">What we stand for</h2>
		<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each values as v}
				<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
					<v.icon size={30} class="text-rose" aria-hidden="true" />
					<h3 class="mt-4 font-display text-xl font-bold text-ink">{v.title}</h3>
					<p class="mt-2 leading-relaxed text-muted">{v.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
	<h2 class="text-center font-display text-4xl font-bold text-leaf">Our story</h2>
	<ol class="mt-10 space-y-6 border-l-2 border-rose/40 pl-6">
		{#each milestones as m}
			<li class="relative">
				<span class="absolute -left-[2.1rem] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose ring-4 ring-white" aria-hidden="true"></span>
				<p class="font-display text-2xl font-bold text-rose-dark">{m.year}</p>
				<p class="mt-1 leading-relaxed text-muted">{m.text}</p>
			</li>
		{/each}
	</ol>
	<p class="mt-12 text-center">
		<a href="/shop" class="inline-flex min-h-12 items-center rounded-full bg-rose px-8 text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark">
			Shop our bouquets →
		</a>
	</p>
</section>
