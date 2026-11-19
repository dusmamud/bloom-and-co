<script lang="ts">
	import { Heart, ShoppingBag } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addProduct } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { toggleWish, wishlist } from '#lib/wishlist.svelte.ts';
	import { money, type Product } from '#lib/data/site.ts';

	let { product }: { product: Product } = $props();
	let added = $state(false);

	function add() {
		addProduct(product.id);
		added = true;
		drawer.open = true;
		setTimeout(() => (added = false), 1600);
	}
</script>

<article class="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-lg">
	<div class="relative">
		<a href={`/shop/${product.id}`} aria-label={product.name}>
			<Picture
				name={product.image}
				alt={product.name}
				width={800}
				height={800}
				sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
				imgClass="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
			/>
		</a>
		{#if product.badge}
			<span class="absolute top-3 left-3 rounded-full bg-leaf px-3 py-1 text-xs font-bold text-white">
				{product.badge}
			</span>
		{/if}
		<button
			type="button"
			onclick={() => toggleWish(product.id)}
			aria-label={wishlist.has(product.id) ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
			aria-pressed={wishlist.has(product.id)}
			class="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors duration-200 {wishlist.has(product.id)
				? 'text-rose'
				: 'text-muted hover:text-rose'}"
		>
			<Heart size={19} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} aria-hidden="true" />
		</button>
	</div>
	<div class="flex flex-1 flex-col p-4 sm:p-5">
		<a href={`/shop/${product.id}`}>
			<h3 class="font-display text-xl leading-snug font-bold text-ink hover:text-rose-dark">
				{product.name}
			</h3>
		</a>
		<p class="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{product.blurb}</p>
		<div class="mt-2 flex items-center gap-1.5">
			<Stars rating={product.rating} size={15} />
			<span class="text-sm text-muted">({product.reviews})</span>
		</div>
		<div class="mt-3 flex items-baseline gap-2">
			<p class="text-xl font-black text-ink">{money(product.price)}</p>
			{#if product.compareAt}
				<p class="text-sm text-muted line-through">{money(product.compareAt)}</p>
			{/if}
		</div>
		<button
			type="button"
			onclick={add}
			class="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-bold text-white transition-colors duration-200 {added
				? 'bg-leaf'
				: 'bg-rose hover:bg-rose-dark'}"
		>
			<ShoppingBag size={17} aria-hidden="true" />
			{added ? 'Added to cart ✓' : 'Add to Cart'}
		</button>
	</div>
</article>
