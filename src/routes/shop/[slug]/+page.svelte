<script lang="ts">
	import { Check, Clock, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import PinChecker from '#lib/components/PinChecker.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addLine } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { toggleWish, wishlist } from '#lib/wishlist.svelte.ts';
	import { addons, careByCategory, money, occasions, productReviews, site, tiersFor } from '#lib/data/site.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const product = $derived(data.product);
	const related = $derived(data.related);
	const tiers = $derived(tiersFor(product));
	const reviews = $derived(productReviews[product.id] ?? []);

	let tierIdx = $state(0);
	let qty = $state(1);
	let added = $state(false);
	let cardMessage = $state('');
	let chosenAddons = $state<string[]>([]);
	let subscribe = $state(false);
	let deliveryDate = $state('');
	let days = $state<{ value: string; label: string; sub: string }[]>([]);

	// Delivery dates: client-side only (prerender must not bake build-time dates).
	// Earliest date auto-advances once the 2pm IST same-day cutoff passes.
	$effect(() => {
		const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
		const afterCutoff = ist.getHours() >= 14;
		const start = new Date(ist);
		if (afterCutoff) start.setDate(start.getDate() + 1);
		const fmtDay = new Intl.DateTimeFormat('en-IN', { weekday: 'short', timeZone: 'Asia/Kolkata' });
		const fmtDate = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' });
		const out: { value: string; label: string; sub: string }[] = [];
		for (let i = 0; i < 7; i++) {
			const d = new Date(start);
			d.setDate(start.getDate() + i);
			const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
			const label = i === 0 ? (afterCutoff ? 'Tomorrow' : 'Today') : i === 1 ? (afterCutoff ? 'Day after' : 'Tomorrow') : fmtDay.format(d);
			out.push({ value: iso, label, sub: fmtDate.format(d) });
		}
		days = out;
		deliveryDate = out[0]?.value ?? '';
	});

	const tier = $derived(tiers[tierIdx] ?? tiers[0]);
	const addonsTotal = $derived(
		chosenAddons.reduce((sum, id) => sum + (addons.find((a) => a.id === id)?.price ?? 0), 0)
	);
	const unitPrice = $derived(tier.price + addonsTotal);
	const totalPrice = $derived(unitPrice * qty);

	function add() {
		addLine({
			id: product.id,
			tier: tier.name,
			qty,
			addonIds: chosenAddons,
			cardMessage: cardMessage.trim(),
			deliveryDate
		});
		added = true;
		drawer.open = true;
		setTimeout(() => (added = false), 1800);
	}

	const productJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		description: product.description,
		image: `${site.url}/images/${product.image}-1200.avif`,
		sku: product.id,
		brand: { '@type': 'Brand', name: 'Bloom & Co.' },
		offers: {
			'@type': 'Offer',
			priceCurrency: 'INR',
			price: tier.price,
			availability: 'https://schema.org/InStock',
			url: `${site.url}/shop/${product.id}`
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: product.rating,
			reviewCount: product.reviews
		},
		review: reviews.map((r) => ({
			'@type': 'Review',
			author: { '@type': 'Person', name: r.name },
			datePublished: r.date,
			reviewRating: { '@type': 'Rating', ratingValue: r.rating },
			reviewBody: r.text
		}))
	});

	const breadcrumbJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
			{ '@type': 'ListItem', position: 2, name: 'Shop', item: `${site.url}/shop` },
			{ '@type': 'ListItem', position: 3, name: product.name, item: `${site.url}/shop/${product.id}` }
		]
	});
</script>

<svelte:head>
	<title>{product.name} — Bloom &amp; Co.</title>
	<meta name="description" content={`${product.name} — ${product.blurb} ${money(product.price)}. Same-day delivery in Mumbai.`} />
	<meta property="og:title" content={`${product.name} — Bloom & Co.`} />
	<meta property="og:description" content={product.blurb} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(productJsonLd)}</script>`}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<nav aria-label="Breadcrumb" class="text-sm text-muted">
		<a href="/" class="hover:text-rose-dark">Home</a> ·
		<a href="/shop" class="hover:text-rose-dark">Shop</a> · {product.name}
	</nav>
	<div class="mt-6 grid gap-10 lg:grid-cols-2">
		<div class="min-w-0">
			<div class="overflow-hidden rounded-[2rem] ring-1 ring-line">
				<Picture
					name={product.image}
					alt={product.name}
					width={1200}
					height={1200}
					sizes="(min-width: 1024px) 50vw, 100vw"
					eager={true}
					imgClass="aspect-square w-full object-cover"
				/>
			</div>
			<div class="mt-4 hidden lg:block">
				<PinChecker compact={true} />
			</div>
		</div>
		<div class="min-w-0">
			<div class="flex items-start justify-between gap-3">
				<div>
					{#if product.badge}
						<span class="inline-block rounded-full bg-leaf px-3 py-1 text-xs font-bold text-white">{product.badge}</span>
					{/if}
					<h1 class="mt-3 font-display text-4xl leading-tight font-bold text-leaf sm:text-5xl">{product.name}</h1>
				</div>
				<button
					type="button"
					onclick={() => toggleWish(product.id)}
					aria-label={wishlist.has(product.id) ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
					aria-pressed={wishlist.has(product.id)}
					class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush transition-colors duration-200 {wishlist.has(product.id)
						? 'text-rose'
						: 'text-muted hover:text-rose'}"
				>
					<Heart size={22} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} aria-hidden="true" />
				</button>
			</div>
			<div class="mt-3 flex items-center gap-2">
				<Stars rating={product.rating} size={18} showValue={true} />
				<a href="#reviews" class="text-sm text-muted underline-offset-4 hover:underline">({product.reviews} reviews)</a>
			</div>
			<div class="mt-4 flex items-baseline gap-3">
				<p class="text-3xl font-black text-ink">{money(tier.price)}</p>
				{#if product.compareAt && tierIdx === 0}
					<p class="text-lg text-muted line-through">{money(product.compareAt)}</p>
					<span class="rounded-full bg-rose-soft px-2.5 py-1 text-xs font-bold text-rose-dark">
						Save {money(product.compareAt - product.price)}
					</span>
				{/if}
			</div>
			<p class="mt-1 text-sm text-muted">Fresh for {product.vaseLife} · Free delivery over ₹999</p>
			<p class="mt-5 text-lg leading-relaxed text-muted">{product.description}</p>

			<!-- Size tiers (real radio group — price in the label) -->
			<fieldset class="mt-7 min-w-0">
				<legend class="text-sm font-bold text-ink">Choose a size</legend>
				<div class="mt-3 grid gap-2 sm:grid-cols-3">
					{#each tiers as t, i}
						<label
							class="cursor-pointer rounded-2xl border px-4 py-3 transition-colors duration-200 {tierIdx === i
								? 'border-rose bg-rose-soft'
								: 'border-line bg-white hover:border-rose/60'}"
						>
							<input type="radio" name="size" value={i} bind:group={tierIdx} class="sr-only" />
							<span class="block text-sm font-bold {tierIdx === i ? 'text-rose-dark' : 'text-ink'}">{t.name}</span>
							<span class="mt-0.5 block text-sm font-black text-ink">{money(t.price)}</span>
							<span class="mt-0.5 block text-xs leading-snug text-muted">{t.stems}</span>
						</label>
					{/each}
				</div>
			</fieldset>

			<!-- Delivery date picker -->
			<fieldset class="mt-7 min-w-0">
				<legend class="text-sm font-bold text-ink">Choose a delivery date</legend>
				<p class="mt-1 text-xs text-muted">Order by 2pm IST for delivery today in Mumbai. The earliest date moves automatically after the cutoff.</p>
				{#if days.length === 0}
					<p class="mt-3 text-sm text-muted">Loading delivery dates…</p>
				{:else}
					<div class="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="radiogroup" aria-label="Delivery date">
						{#each days as d}
							<button
								type="button"
								role="radio"
								aria-checked={deliveryDate === d.value}
								onclick={() => (deliveryDate = d.value)}
								class="min-h-12 shrink-0 rounded-2xl border px-4 py-2 text-left transition-colors duration-200 {deliveryDate === d.value
									? 'border-rose bg-rose-soft'
									: 'border-line bg-white hover:border-rose/60'}"
							>
								<span class="block text-xs font-bold {deliveryDate === d.value ? 'text-rose-dark' : 'text-muted'}">{d.label}</span>
								<span class="block text-sm font-black text-ink">{d.sub}</span>
							</button>
						{/each}
					</div>
				{/if}
			</fieldset>

			<!-- Add-ons (unchecked by default) -->
			<fieldset class="mt-7 min-w-0">
				<legend class="text-sm font-bold text-ink">Make it extra special <span class="font-normal text-muted">(optional)</span></legend>
				<div class="mt-3 space-y-2">
					{#each addons as addon}
						<label class="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-white px-4 py-3 transition-colors duration-200 hover:border-rose/60">
							<input
								type="checkbox"
								value={addon.id}
								bind:group={chosenAddons}
								class="mt-0.5 h-5 w-5 shrink-0 accent-[#e85a7a]"
							/>
							<span class="min-w-0 flex-1">
								<span class="block text-sm font-bold text-ink">{addon.name} · {money(addon.price)}</span>
								<span class="block text-xs leading-snug text-muted">{addon.blurb}</span>
							</span>
						</label>
					{/each}
				</div>
			</fieldset>

			<!-- Card message (150 chars, carried into the cart) -->
			<label for="card-message" class="mt-7 block text-sm font-bold text-ink">
				Free hand-written card message
				<span class="float-right font-normal text-muted">{cardMessage.length}/150</span>
			</label>
			<input
				id="card-message"
				type="text"
				maxlength="150"
				bind:value={cardMessage}
				placeholder="e.g. Happy birthday, love Mum — x"
				class="mt-2 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base outline-none placeholder:text-muted focus:border-rose"
			/>

			<!-- Make it a subscription -->
			<label class="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl bg-leaf-soft px-4 py-3">
				<input type="checkbox" bind:checked={subscribe} class="mt-0.5 h-5 w-5 shrink-0 accent-[#1e4636]" />
				<span class="text-sm leading-snug text-ink">
					<strong>Make it a monthly subscription</strong> — same bouquet every month, save 10%, pause or skip anytime.
					<a href="/subscriptions" class="font-bold text-leaf underline-offset-4 hover:underline">See plans →</a>
				</span>
			</label>

			<!-- Qty + Add to cart -->
			<div class="mt-6 flex flex-wrap items-center gap-3">
				<div class="flex items-center rounded-full bg-blush">
					<button
						type="button"
						onclick={() => (qty = Math.max(1, qty - 1))}
						aria-label="One less bouquet"
						class="flex h-12 w-12 items-center justify-center rounded-full text-ink"
					>
						<Minus size={18} aria-hidden="true" />
					</button>
					<span class="w-8 text-center text-base font-bold" aria-label={`${qty} bouquets`}>{qty}</span>
					<button
						type="button"
						onclick={() => (qty = Math.min(9, qty + 1))}
						aria-label="One more bouquet"
						class="flex h-12 w-12 items-center justify-center rounded-full text-ink"
					>
						<Plus size={18} aria-hidden="true" />
					</button>
				</div>
				<button
					type="button"
					onclick={add}
					class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-base font-bold text-white transition-colors duration-200 active:scale-[0.97] {added
						? 'bg-leaf'
						: 'bg-rose hover:bg-rose-dark'}"
				>
					<ShoppingBag size={19} aria-hidden="true" />
					{added ? 'Added to cart ✓' : `Add to Cart · ${money(totalPrice)}`}
				</button>
			</div>
			{#if subscribe}
				<p class="mt-2 text-sm text-muted">Subscription note added — your first box ships on the delivery date above.</p>
			{/if}

			<!-- Trust + substitution + care -->
			<ul class="mt-7 space-y-3 text-sm text-muted">
				<li class="flex items-start gap-2.5">
					<Truck size={19} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
					<span><strong class="text-ink">Same-day delivery</strong> — order by 2pm, across Mumbai. Free over ₹999.</span>
				</li>
				<li class="flex items-start gap-2.5">
					<Clock size={19} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
					<span><strong class="text-ink">Fresh for {product.vaseLife}</strong> — care card included with every bouquet.</span>
				</li>
				<li class="flex items-start gap-2.5">
					<ShieldCheck size={19} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
					<span><strong class="text-ink">Happiness guaranteed</strong> — if it arrives wilted or damaged, tell us within 48 hours and we replace it free.</span>
				</li>
				<li class="flex items-start gap-2.5">
					<Check size={19} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
					<span><strong class="text-ink">Sustainably sourced</strong> — local growers first, recycled wrapping.</span>
				</li>
			</ul>

			<details class="mt-6 rounded-2xl border border-line bg-white px-4 py-3">
				<summary class="cursor-pointer text-sm font-bold text-ink">Substitution policy &amp; care</summary>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					If a stem is unavailable, we will substitute a similar bloom in the same style and colour palette — never a
					cheaper flower. {careByCategory[product.category]}
				</p>
			</details>

			<dl class="mt-6 space-y-2 border-y border-line py-5 text-sm sm:text-base">
				<div class="flex gap-3"><dt class="w-24 shrink-0 font-bold text-ink">Stems</dt><dd class="text-muted">{tier.stems}</dd></div>
				<div class="flex gap-3"><dt class="w-24 shrink-0 font-bold text-ink">Size</dt><dd class="text-muted">{tier.name}</dd></div>
				<div class="flex gap-3"><dt class="w-24 shrink-0 font-bold text-ink">Vase</dt><dd class="text-muted">{product.vase}</dd></div>
				<div class="flex gap-3">
					<dt class="w-24 shrink-0 font-bold text-ink">Occasions</dt>
					<dd class="text-muted">
						{product.occasions.map((o) => occasions.find((x) => x.id === o)?.name ?? o).join(', ')}
					</dd>
				</div>
			</dl>
		</div>
	</div>

	<!-- Reviews -->
	<section id="reviews" class="mt-16 scroll-mt-24">
		<h2 class="font-display text-3xl font-bold text-leaf">What customers say</h2>
		<p class="mt-2 text-muted">
			<Stars rating={product.rating} size={17} showValue={true} /> · {product.reviews} verified reviews for {product.name}
		</p>
		<div class="mt-6 grid gap-5 md:grid-cols-2">
			{#each reviews as r}
				<figure class="rounded-3xl bg-white p-6 ring-1 ring-line">
					<Stars rating={r.rating} size={16} />
					<blockquote class="mt-3 leading-relaxed text-ink">“{r.text}”</blockquote>
					<figcaption class="mt-4 flex items-center justify-between gap-3">
						<p class="font-bold text-ink">{r.name}</p>
						<p class="text-sm text-muted">{r.date}</p>
					</figcaption>
				</figure>
			{/each}
		</div>
		<p class="mt-6 text-center">
			<a href="/reviews" class="font-bold text-rose-dark underline-offset-4 hover:underline">Read all customer reviews →</a>
		</p>
	</section>

	{#if related.length > 0}
		<section class="mt-16">
			<h2 class="font-display text-3xl font-bold text-leaf">You may also love</h2>
			<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each related as item (item.id)}
					<ProductCard product={item} />
				{/each}
			</div>
		</section>
	{/if}
</section>

<!-- Sticky mobile add-to-cart (sits above the global Call/WhatsApp/Cart bar) -->
<div class="fixed inset-x-0 bottom-14 z-40 flex items-center gap-3 border-t border-line bg-white/95 px-4 py-2.5 backdrop-blur lg:hidden">
	<div class="min-w-0 flex-1">
		<p class="truncate text-sm font-bold text-ink">{product.name} · {tier.name}</p>
		<p class="text-sm font-black text-rose-dark">{money(totalPrice)}</p>
	</div>
	<button
		type="button"
		onclick={add}
		class="flex min-h-11 shrink-0 items-center gap-2 rounded-full px-6 text-sm font-bold text-white transition-colors duration-200 active:scale-[0.97] {added
			? 'bg-leaf'
			: 'bg-rose'}"
	>
		<ShoppingBag size={17} aria-hidden="true" />
		{added ? 'Added ✓' : 'Add to Cart'}
	</button>
</div>
