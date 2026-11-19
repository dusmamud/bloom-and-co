<script lang="ts">
	import { Search } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { occasions, products } from '#lib/data/site.ts';
	import { page } from '$app/state';

	let query = $state('');
	let occasion = $state('all');
	let sort = $state('featured');
	let category = $state('all');
	let priceBand = $state('all');

	// searchParams is unavailable during prerender — read it client-side only.
	$effect(() => {
		occasion = page.url.searchParams.get('occasion') ?? 'all';
		category = page.url.searchParams.get('category') ?? 'all';
	});

	const flowerTypes = $derived([...new Set(products.flatMap((p) => p.flowers))].sort());
	let flower = $state('all');

	const filtered = $derived.by(() => {
		let list = products.filter((p) => {
			if (occasion !== 'all' && !p.occasions.includes(occasion)) return false;
			if (flower !== 'all' && !p.flowers.includes(flower)) return false;
			if (category !== 'all' && p.category !== category) return false;
			if (priceBand === 'under-999' && p.price >= 999) return false;
			if (priceBand === '999-1999' && (p.price < 999 || p.price > 1999)) return false;
			if (priceBand === '2000-plus' && p.price < 2000) return false;
			if (query.trim()) {
				const q = query.trim().toLowerCase();
				if (!`${p.name} ${p.blurb} ${p.flowers.join(' ')}`.toLowerCase().includes(q)) return false;
			}
			return true;
		});
		if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
		if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
		if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
		return list;
	});
</script>

<PageHero
	eyebrow="Shop All Flowers"
	title="Fresh Bouquets, Hand-Tied Daily"
	subtitle="Every bouquet is made to order by our florists on Rosewood Lane — same-day delivery across Mumbai when you order by 2pm."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<!-- Search + sort -->
	<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
		<label class="relative block w-full max-w-md">
			<span class="sr-only">Search flowers</span>
			<Search size={19} class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden="true" />
			<input
				type="search"
				bind:value={query}
				placeholder="Search roses, lilies, sunflowers…"
				class="min-h-12 w-full rounded-full border border-line bg-white pr-4 pl-11 text-base text-ink outline-none placeholder:text-muted focus:border-rose"
			/>
		</label>
		<label class="flex items-center gap-2 text-sm font-semibold text-ink">
			Sort by
			<select
				bind:value={sort}
				class="min-h-12 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink outline-none focus:border-rose"
			>
				<option value="featured">Featured</option>
				<option value="price-asc">Price: low to high</option>
				<option value="price-desc">Price: high to low</option>
				<option value="rating">Top rated</option>
			</select>
		</label>
	</div>

	<!-- Occasion chips -->
	<div class="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by occasion">
		<button
			type="button"
			onclick={() => (occasion = 'all')}
			aria-pressed={occasion === 'all'}
			class="min-h-11 rounded-full px-5 text-sm font-bold transition-colors duration-200 {occasion === 'all'
				? 'bg-rose text-white'
				: 'bg-blush text-ink hover:bg-blush-deep'}"
		>
			All Occasions
		</button>
		{#each occasions as o}
			<button
				type="button"
				onclick={() => (occasion = o.id)}
				aria-pressed={occasion === o.id}
				class="min-h-11 rounded-full px-5 text-sm font-bold transition-colors duration-200 {occasion === o.id
					? 'bg-rose text-white'
					: 'bg-blush text-ink hover:bg-blush-deep'}"
			>
				{o.name}
			</button>
		{/each}
	</div>

	<!-- Flower chips -->
	<div class="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by flower">
		<button
			type="button"
			onclick={() => (flower = 'all')}
			aria-pressed={flower === 'all'}
			class="min-h-11 rounded-full border border-line px-5 text-sm font-bold transition-colors duration-200 {flower ===
			'all'
				? 'border-rose bg-rose-soft text-rose-dark'
				: 'bg-white text-ink hover:border-rose'}"
		>
			All Flowers
		</button>
		{#each flowerTypes as f}
			<button
				type="button"
				onclick={() => (flower = f)}
				aria-pressed={flower === f}
				class="min-h-11 rounded-full border border-line px-5 text-sm font-bold transition-colors duration-200 {flower ===
				f
					? 'border-rose bg-rose-soft text-rose-dark'
					: 'bg-white text-ink hover:border-rose'}"
			>
				{f}
			</button>
		{/each}
	</div>

	<!-- Category + price chips -->
	<div class="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by type and price">
		{#each [['all', 'Everything'], ['bouquet', 'Bouquets'], ['plant', 'Plants'], ['hamper', 'Hampers & Combos']] as [value, label]}
			<button
				type="button"
				onclick={() => (category = value)}
				aria-pressed={category === value}
				class="min-h-11 rounded-full border border-line px-5 text-sm font-bold transition-colors duration-200 {category ===
				value
					? 'border-leaf bg-leaf text-white'
					: 'bg-white text-ink hover:border-leaf'}"
			>
				{label}
			</button>
		{/each}
		<span class="mx-1 hidden h-11 w-px bg-line sm:block" aria-hidden="true"></span>
		{#each [['all', 'Any price'], ['under-999', 'Under ₹999'], ['999-1999', '₹999 – ₹1,999'], ['2000-plus', '₹2,000+']] as [value, label]}
			<button
				type="button"
				onclick={() => (priceBand = value)}
				aria-pressed={priceBand === value}
				class="min-h-11 rounded-full border border-line px-5 text-sm font-bold transition-colors duration-200 {priceBand ===
				value
					? 'border-leaf bg-leaf text-white'
					: 'bg-white text-ink hover:border-leaf'}"
			>
				{label}
			</button>
		{/each}
	</div>

	<p class="mt-8 text-sm font-semibold text-muted" aria-live="polite">
		{filtered.length} bouquet{filtered.length === 1 ? '' : 's'}
		{occasion !== 'all' ? ` for ${occasions.find((o) => o.id === occasion)?.name ?? ''}` : ''}
		{flower !== 'all' ? ` · ${flower}` : ''}
		{category !== 'all' ? ` · ${category === 'bouquet' ? 'Bouquets' : category === 'plant' ? 'Plants' : 'Hampers'}` : ''}
	</p>

	{#if filtered.length === 0}
		<div class="mt-6 rounded-3xl bg-blush px-6 py-14 text-center">
			<p class="font-script text-4xl text-rose">No blooms match that search</p>
			<p class="mx-auto mt-3 max-w-md text-muted">
				Try a different flower or occasion — or call us and our florists will build something custom.
			</p>
			<button
				type="button"
				onclick={() => {
					query = '';
					occasion = 'all';
					flower = 'all';
					category = 'all';
					priceBand = 'all';
				}}
				class="mt-6 inline-flex min-h-12 items-center rounded-full bg-rose px-7 text-sm font-bold text-white"
			>
				Clear all filters
			</button>
		</div>
	{:else}
		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each filtered as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	{/if}
</section>
