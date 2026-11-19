<script lang="ts">
	let {
		eyebrow,
		title,
		subtitle = ''
	}: { eyebrow: string; title: string; subtitle?: string } = $props();
</script>

<section class="bg-blush px-4 py-14 text-center sm:px-6 sm:py-16">
	<p class="text-xs font-bold tracking-[0.25em] text-rose-dark uppercase">{eyebrow}</p>
	<h1 class="mx-auto mt-3 max-w-2xl font-display text-4xl leading-tight font-bold text-leaf sm:text-5xl">
		{title}
	</h1>
	{#if subtitle}
		<p class="mx-auto mt-4 max-w-xl leading-relaxed text-muted">{subtitle}</p>
	{/if}
</section>
