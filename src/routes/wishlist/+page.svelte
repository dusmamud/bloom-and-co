<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { wishlist, removeWish } from '#lib/wishlist.svelte.ts';
	import { addLine } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { ShoppingBag, Trash2 } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Your Wishlist — Bloom &amp; Co.</title>
	<meta name="description" content="Your saved bouquets at Bloom & Co. — wishlist items you loved, ready to add to cart." />
</svelte:head>

<PageHero
	eyebrow="Wishlist"
	title="Saved for Later"
	subtitle="Bouquets you loved, kept in one place. Saved on this device — add any of them to your cart when you are ready."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	{#if wishlist.count === 0}
		<div class="mx-auto max-w-xl rounded-[2rem] bg-blush px-6 py-14 text-center">
			<p class="font-script text-4xl text-rose">Nothing saved yet</p>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
				Tap the heart on any bouquet to save it here — for a birthday you are planning, or just for yourself.
			</p>
			<a
				href="/shop"
				class="mt-6 inline-flex min-h-12 items-center rounded-full bg-rose px-8 text-base font-bold text-white"
			>
				Browse flowers
			</a>
		</div>
	{:else}
		<p class="text-muted">{wishlist.count} saved bouquet{wishlist.count === 1 ? '' : 's'}</p>
		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each wishlist.items as product (product.id)}
				<div class="relative">
					<ProductCard {product} />
					<div class="mt-3 flex gap-2">
						<button
							type="button"
							onclick={() => {
								addLine({ id: product.id });
								drawer.open = true;
							}}
							class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-rose text-sm font-bold text-white transition-colors duration-200 hover:bg-rose-dark"
						>
							<ShoppingBag size={17} aria-hidden="true" /> Add to cart
						</button>
						<button
							type="button"
							onclick={() => removeWish(product.id)}
							aria-label={`Remove ${product.name} from wishlist`}
							class="flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted hover:text-rose-dark"
						>
							<Trash2 size={18} aria-hidden="true" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
