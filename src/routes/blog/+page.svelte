<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { blogPosts } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Flower Journal — Bloom &amp; Co.</title>
	<meta name="description" content="The Bloom & Co. journal — flower care guides, wedding flower advice and vase-life charts, written by our Bandra florists." />
</svelte:head>

<PageHero
	eyebrow="Flower Journal"
	title="Notes From Our Florists"
	subtitle="Care guides, wedding advice and honest vase-life charts — short, useful, and written by the people who tie your bouquets."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-6 md:grid-cols-3">
		{#each blogPosts as post}
			<a href={`/blog/${post.slug}`} class="group overflow-hidden rounded-[2rem] bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-lg">
				<div class="overflow-hidden">
					<Picture
						name={post.image}
						alt={post.title}
						width={1600}
						height={1067}
						sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
						imgClass="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
					/>
				</div>
				<div class="p-6">
					<p class="text-xs font-bold tracking-wide text-rose-dark uppercase">{post.category} · {post.date} · {post.readMins} min read</p>
					<h2 class="mt-2 font-display text-2xl leading-snug font-bold text-ink group-hover:text-rose-dark">{post.title}</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
					<p class="mt-4 text-sm font-bold text-rose-dark">Read the guide →</p>
				</div>
			</a>
		{/each}
	</div>
</section>
