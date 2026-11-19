<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);

	const articleJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.excerpt,
		image: `${site.url}/images/${post.image}-1200.avif`,
		author: { '@type': 'Organization', name: 'Bloom & Co.' },
		publisher: { '@type': 'Organization', name: 'Bloom & Co.', url: site.url },
		datePublished: post.date,
		mainEntityOfPage: `${site.url}/blog/${post.slug}`
	});
</script>

<svelte:head>
	<title>{post.title} — Bloom &amp; Co.</title>
	<meta name="description" content={post.excerpt} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(articleJsonLd)}</script>`}
</svelte:head>

<PageHero eyebrow="{post.category} · {post.date} · {post.readMins} min read" title={post.title} subtitle={post.excerpt} />

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="overflow-hidden rounded-[2rem] ring-1 ring-line">
		<Picture name={post.image} alt={post.title} width={1600} height={1067} sizes="100vw" imgClass="aspect-[3/2] w-full object-cover" />
	</div>
	<article class="mt-8 space-y-5 text-lg leading-relaxed text-muted">
		{#each post.body as para}
			<p>{para}</p>
		{/each}
	</article>
	<div class="mt-10 rounded-[2rem] bg-blush px-6 py-8 text-center">
		<p class="font-script text-4xl text-rose">Put it into practice</p>
		<p class="mx-auto mt-2 max-w-md leading-relaxed text-muted">
			Order by 2pm for same-day delivery across Mumbai — free over ₹999.
		</p>
		<a
			href="/shop"
			class="mt-5 inline-flex min-h-12 items-center rounded-full bg-rose px-8 text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark"
		>
			Shop flowers →
		</a>
		<p class="mt-4 text-sm">
			<a href="/blog" class="font-bold text-rose-dark underline-offset-4 hover:underline">← Back to the journal</a>
		</p>
	</div>
</section>
