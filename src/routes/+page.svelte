<script lang="ts">
	import { ArrowRight, BellRing, CalendarHeart, Gift, Heart, Leaf, Search, Truck } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import PinChecker from '#lib/components/PinChecker.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import TestimonialCarousel from '#lib/components/TestimonialCarousel.svelte';
	import { bestsellers, hamperPicks, occasions, plantPicks } from '#lib/data/site.ts';

	const heroTrust = [
		{ icon: Truck, label: 'Fast & Reliable Delivery' },
		{ icon: Leaf, label: 'Fresh Flowers Always' },
		{ icon: Heart, label: 'Happiness Guaranteed' }
	];
	const marquee = [
		'Same-day delivery',
		'Fresh from local growers',
		'Hand-tied by our florists',
		'Free delivery over ₹999',
		'Hand-written card included'
	];
</script>

<!-- HERO — same-to-same as the reference -->
<section class="bg-cream">
	<div class="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-12 sm:px-6 lg:grid-cols-2 lg:pt-14 lg:pb-16">
		<div class="reveal is-visible">
			<p class="text-xs font-bold tracking-[0.28em] text-rose-dark uppercase">
				Fresh Flowers • Happy Moments
			</p>
			<h1 class="mt-4 font-display text-5xl leading-[1.05] font-bold text-leaf sm:text-6xl lg:text-[4.2rem]">
				Say It Better<br />With Flowers
			</h1>
			<p class="mt-5 max-w-md text-lg leading-relaxed text-muted">
				Beautiful blooms for every occasion. Handcrafted with love, delivered with care.
			</p>
			<a
				href="/shop"
				class="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-rose px-8 text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark"
			>
				Shop Now <ArrowRight size={19} aria-hidden="true" />
			</a>
			<ul class="mt-10 flex flex-wrap gap-x-8 gap-y-4">
				{#each heroTrust as item}
					<li class="flex flex-col items-start gap-1.5">
						<item.icon size={26} class="text-leaf" aria-hidden="true" />
						<span class="max-w-[7.5rem] text-sm leading-tight font-semibold text-ink">{item.label}</span>
					</li>
				{/each}
			</ul>
		</div>
		<div class="relative mx-auto w-full max-w-[520px]">
			<div class="overflow-hidden rounded-[2rem] shadow-xl">
				<Picture
					name="hero-bouquet"
					alt="Bouquet of pink roses and white lilies wrapped in blush-pink paper"
					width={1120}
					height={2240}
					sizes="(min-width: 1024px) 45vw, 100vw"
					eager={true}
					imgClass="aspect-[1/1.15] w-full object-cover sm:aspect-[1/1.05]"
				/>
			</div>
			<div
				class="absolute top-[58%] -left-2 rotate-[-4deg] rounded-xl bg-white px-4 py-3 text-center shadow-lg sm:left-2"
			>
				<p class="font-display text-base leading-tight font-bold text-leaf">Good<br />Things<br />Bloom<br />Here</p>
				<p class="mt-1 text-rose" aria-hidden="true">♥</p>
			</div>
			<p
				class="absolute right-3 bottom-4 rotate-[-3deg] font-script text-3xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] sm:text-4xl"
			>
				Fresh Flowers<br />Brighter Days ♡
			</p>
		</div>
	</div>
</section>

<!-- Marquee -->
<div class="marquee overflow-hidden border-y border-line bg-white py-3" aria-hidden="true">
	<div class="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
		{#each [...marquee, ...marquee, ...marquee, ...marquee] as item}
			<span class="flex items-center gap-8 text-sm font-bold tracking-wide text-leaf uppercase">
				{item} <span class="text-rose">✿</span>
			</span>
		{/each}
	</div>
</div>

<!-- PIN CHECKER — before the catalogue (fulfilment honesty first) -->
<section class="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
	<PinChecker />
</section>

<!-- SHOP BY OCCASION -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
	<div class="text-center reveal">
		<p class="text-xs font-bold tracking-[0.28em] text-rose-dark uppercase">Shop by Occasion</p>
		<h2 class="mt-3 font-display text-4xl font-bold text-leaf sm:text-5xl">Flowers for Every Moment</h2>
		<p class="mx-auto mt-2 flex items-center justify-center gap-2 text-muted" aria-hidden="true">
			<span class="h-px w-10 bg-rose/50"></span> ♥ <span class="h-px w-10 bg-rose/50"></span>
		</p>
	</div>
	<div class="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6">
		{#each occasions as occasion}
			<a
				href={`/occasions/${occasion.id}`}
				class="group overflow-hidden rounded-3xl bg-blush ring-1 ring-line transition-shadow duration-200 hover:shadow-lg"
			>
				<div class="overflow-hidden">
					<Picture
						name={occasion.image}
						alt={`${occasion.name} bouquet`}
						width={800}
						height={800}
						sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 33vw, 50vw"
						imgClass="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
					/>
				</div>
				<p
					class="flex items-center justify-between px-4 py-3.5 text-sm font-bold text-ink group-hover:text-rose-dark sm:text-base"
				>
					{occasion.name}
					<ArrowRight size={17} class="shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
				</p>
			</a>
		{/each}
	</div>
</section>

<!-- HOW IT WORKS -->
<section class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:pb-20">
	<div class="grid gap-5 md:grid-cols-3">
		{#each [
			{ icon: Search, title: 'Pick your flowers', text: 'Browse by occasion, flower or price. Every bouquet shows its size, stems and price up front.' },
			{ icon: CalendarHeart, title: 'Pick a date & message', text: 'Choose a delivery date — today, if you order by 2pm — and add a free hand-written card.' },
			{ icon: Gift, title: 'We deliver today', text: 'Hand-tied by our florists and delivered across Mumbai, with a text when it leaves the shop.' }
		] as step}
			<article class="rounded-[2rem] bg-white p-6 ring-1 ring-line">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-rose-soft text-rose-dark">
					<step.icon size={23} aria-hidden="true" />
				</span>
				<h3 class="mt-3 font-display text-xl font-bold text-leaf">{step.title}</h3>
				<p class="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
			</article>
		{/each}
	</div>
	<p class="mt-5 text-center text-sm">
		<a href="/how-it-works" class="font-bold text-rose-dark underline-offset-4 hover:underline">First time here? See the full guide →</a>
	</p>
</section>

<!-- BEST SELLERS -->
<section class="bg-blush">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_2fr] lg:py-20">
		<div class="reveal lg:pt-4">
			<p class="text-xs font-bold tracking-[0.28em] text-rose-dark uppercase">Best Sellers</p>
			<h2 class="mt-3 font-display text-4xl leading-tight font-bold text-leaf sm:text-5xl">
				Our Most<br />Loved Bouquets
			</h2>
			<p class="mt-4 max-w-sm leading-relaxed text-muted">
				Handpicked favourites, designed to make every moment special.
			</p>
			<a
				href="/shop"
				class="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-rose px-7 text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark"
			>
				View All Flowers <ArrowRight size={19} aria-hidden="true" />
			</a>
		</div>
		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each bestsellers as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>

<!-- PLANTS & HAMPERS -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<p class="text-xs font-bold tracking-[0.28em] text-rose-dark uppercase">More Than Bouquets</p>
			<h2 class="mt-3 font-display text-4xl font-bold text-leaf sm:text-5xl">Plants &amp; Hampers</h2>
			<p class="mt-2 max-w-md leading-relaxed text-muted">Gifts that keep growing — and combos that cover every base.</p>
		</div>
		<div class="flex gap-3">
			<a href="/plants" class="inline-flex min-h-12 items-center rounded-full border border-line bg-white px-6 text-sm font-bold text-ink transition-colors duration-200 hover:border-rose">All plants →</a>
			<a href="/hampers" class="inline-flex min-h-12 items-center rounded-full border border-line bg-white px-6 text-sm font-bold text-ink transition-colors duration-200 hover:border-rose">All hampers →</a>
		</div>
	</div>
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each [...plantPicks.slice(0, 2), ...hamperPicks.slice(0, 2)] as product (product.id)}
			<ProductCard {product} />
		{/each}
	</div>
</section>

<!-- SAME-DAY DELIVERY BANNER -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
	<div class="grid overflow-hidden rounded-[2rem] shadow-xl lg:grid-cols-[1.6fr_1fr]">
		<div class="relative min-h-[280px]">
			<Picture
				name="banner-worktable"
				alt="Florist's worktable with pink roses, kraft paper, scissors and twine"
				width={1600}
				height={1067}
				sizes="(min-width: 1024px) 60vw, 100vw"
				imgClass="absolute inset-0 h-full w-full object-cover"
			/>
			<p
				class="absolute bottom-6 left-6 rotate-[-3deg] font-script text-4xl leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-5xl"
			>
				More Than Flowers<br />Moments That Matter ♡
			</p>
		</div>
		<div class="flex flex-col justify-center bg-leaf px-8 py-12 text-white sm:px-10">
			<p class="font-display text-3xl leading-tight font-bold sm:text-4xl">Same Day Delivery</p>
			<p class="mt-3 leading-relaxed text-white/80">Because special moments can’t wait.</p>
			<p class="mt-5 text-sm leading-relaxed text-white/70">
				Order by 2pm and your bouquet arrives today, hand-delivered across Mumbai.
			</p>
			<a
				href="/shop"
				class="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-white px-7 text-base font-bold text-leaf transition-colors duration-200 hover:bg-blush"
			>
				Order Now <ArrowRight size={19} aria-hidden="true" />
			</a>
		</div>
	</div>
</section>

<!-- TESTIMONIALS -->
<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
		<div class="text-center reveal">
			<p class="text-xs font-bold tracking-[0.28em] text-rose-dark uppercase">Happy Customers</p>
			<h2 class="mt-3 font-display text-4xl font-bold text-leaf sm:text-5xl">Loved, Delivered, Remembered</h2>
		</div>
		<TestimonialCarousel />
		<p class="mt-8 text-center">
			<a href="/reviews" class="font-bold text-rose-dark underline-offset-4 hover:underline">
				Read all customer reviews →
			</a>
		</p>
	</div>
</section>

<!-- WEDDINGS & CORPORATE + REMINDERS -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
	<div class="grid gap-5 lg:grid-cols-3">
		<a href="/weddings" class="group overflow-hidden rounded-[2rem] bg-leaf p-7 text-white transition-shadow duration-200 hover:shadow-xl">
			<p class="font-script text-3xl text-rose-soft">Weddings &amp; Events</p>
			<p class="mt-2 leading-relaxed text-white/80">Bridal bouquets, mandap florals and table centrepieces — designed with you, styled on the day.</p>
			<p class="mt-4 text-sm font-bold text-white">Plan your wedding flowers →</p>
		</a>
		<a href="/corporate" class="group overflow-hidden rounded-[2rem] bg-white p-7 ring-1 ring-line transition-shadow duration-200 hover:shadow-lg">
			<p class="font-script text-3xl text-rose">Corporate Flowers</p>
			<p class="mt-2 leading-relaxed text-muted">Weekly reception flowers for offices, hotels and restaurants — one monthly invoice.</p>
			<p class="mt-4 text-sm font-bold text-rose-dark">Request a quote →</p>
		</a>
		<a href="/reminders" class="group overflow-hidden rounded-[2rem] bg-blush p-7 ring-1 ring-line transition-shadow duration-200 hover:shadow-lg">
			<p class="flex items-center gap-2 font-display text-2xl font-bold text-leaf"><BellRing size={22} class="text-rose" aria-hidden="true" /> Never miss a date</p>
			<p class="mt-2 leading-relaxed text-muted">Birthdays, anniversaries, Mother’s Day — we remind you a week before, with a bouquet suggestion.</p>
			<p class="mt-4 text-sm font-bold text-rose-dark">Set a reminder →</p>
		</a>
	</div>
</section>

<!-- CTA -->
<section class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:pb-20">
	<div class="rounded-[2rem] bg-rose px-6 py-12 text-center text-white sm:px-10">
		<p class="font-script text-4xl sm:text-5xl">Say it with flowers today</p>
		<p class="mx-auto mt-3 max-w-md leading-relaxed text-white/85">
			Order by 2pm for same-day delivery. Free delivery on orders over ₹999.
		</p>
		<a
			href="/shop"
			class="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-8 text-base font-bold text-rose-dark transition-colors duration-200 hover:bg-blush"
		>
			Shop All Flowers <ArrowRight size={19} aria-hidden="true" />
		</a>
	</div>
</section>
