<script lang="ts">
	import { Check, Clock, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addToOrder } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { money, occasions } from '#lib/data/site.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const product = $derived(data.product);
	const related = $derived(data.related);
	let qty = $state(1);
	let added = $state(false);
	let cardMessage = $state('');

	function add() {
		for (let i = 0; i < qty; i++) addToOrder(product.name, product.price);
		added = true;
		drawer.open = true;
		setTimeout(() => (added = false), 1800);
	}
</script>

<svelte:head>
	<title>{product.name} — Bloom &amp; Co.</title>
	<meta name="description" content={`${product.name} — ${product.blurb} ${money(product.price)}. Same-day delivery in Mumbai.`} />
	<meta property="og:title" content={`${product.name} — Bloom & Co.`} />
	<meta property="og:description" content={product.blurb} />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<p class="text-sm text-muted">
		<a href="/" class="hover:text-rose-dark">Home</a> ·
		<a href="/shop" class="hover:text-rose-dark">Shop</a> · {product.name}
	</p>
	<div class="mt-6 grid gap-10 lg:grid-cols-2">
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
		<div>
			{#if product.badge}
				<span class="inline-block rounded-full bg-leaf px-3 py-1 text-xs font-bold text-white">{product.badge}</span>
			{/if}
			<h1 class="mt-3 font-display text-4xl leading-tight font-bold text-leaf sm:text-5xl">{product.name}</h1>
			<div class="mt-3 flex items-center gap-2">
				<Stars rating={product.rating} size={18} showValue={true} />
				<span class="text-sm text-muted">({product.reviews} reviews)</span>
			</div>
			<div class="mt-4 flex items-baseline gap-3">
				<p class="text-3xl font-black text-ink">{money(product.price)}</p>
				{#if product.compareAt}
					<p class="text-lg text-muted line-through">{money(product.compareAt)}</p>
					<span class="rounded-full bg-rose-soft px-2.5 py-1 text-xs font-bold text-rose-dark">
						Save {money(product.compareAt - product.price)}
					</span>
				{/if}
			</div>
			<p class="mt-5 text-lg leading-relaxed text-muted">{product.description}</p>

			<dl class="mt-6 space-y-2 border-y border-line py-5 text-sm sm:text-base">
				<div class="flex gap-3"><dt class="w-24 shrink-0 font-bold text-ink">Stems</dt><dd class="text-muted">{product.stems}</dd></div>
				<div class="flex gap-3"><dt class="w-24 shrink-0 font-bold text-ink">Size</dt><dd class="text-muted">{product.size}</dd></div>
				<div class="flex gap-3"><dt class="w-24 shrink-0 font-bold text-ink">Vase</dt><dd class="text-muted">{product.vase}</dd></div>
				<div class="flex gap-3">
					<dt class="w-24 shrink-0 font-bold text-ink">Occasions</dt>
					<dd class="text-muted">
						{product.occasions.map((o) => occasions.find((x) => x.id === o)?.name ?? o).join(', ')}
					</dd>
				</div>
			</dl>

			<label for="card-message" class="mt-6 block text-sm font-bold text-ink">
				Free hand-written card message
			</label>
			<input
				id="card-message"
				type="text"
				bind:value={cardMessage}
				placeholder="e.g. Happy birthday, love Mum — x"
				class="mt-2 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base outline-none placeholder:text-muted focus:border-rose"
			/>

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
					class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-base font-bold text-white transition-colors duration-200 {added
						? 'bg-leaf'
						: 'bg-rose hover:bg-rose-dark'}"
				>
					<ShoppingBag size={19} aria-hidden="true" />
					{added ? 'Added to cart ✓' : `Add to Cart · ${money(product.price * qty)}`}
				</button>
			</div>

			<ul class="mt-7 space-y-3 text-sm text-muted">
				<li class="flex items-start gap-2.5">
					<Truck size={19} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
					<span><strong class="text-ink">Same-day delivery</strong> — order by 2pm, across Mumbai. Free over ₹999.</span>
				</li>
				<li class="flex items-start gap-2.5">
					<Clock size={19} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
					<span><strong class="text-ink">Fresh for 7–10 days</strong> — care card included with every bouquet.</span>
				</li>
				<li class="flex items-start gap-2.5">
					<ShieldCheck size={19} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
					<span><strong class="text-ink">Happiness guaranteed</strong> — if it arrives less than perfect, we replace it free.</span>
				</li>
				<li class="flex items-start gap-2.5">
					<Check size={19} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
					<span><strong class="text-ink">Sustainably sourced</strong> — local growers first, recycled wrapping.</span>
				</li>
			</ul>
		</div>
	</div>

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
