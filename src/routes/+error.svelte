<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Page not found — Bloom &amp; Co.</title>
	<meta name="description" content="That page does not exist. Find your way back to Bloom & Co." />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
	<p class="font-display text-7xl font-bold text-rose">404</p>
	<h1 class="mt-4 font-display text-3xl font-bold text-leaf">This bouquet does not exist</h1>
	<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
		The page you are looking for ({page.url.pathname}) has moved or never existed. Let us take you somewhere
		prettier.
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a
			href="/"
			class="inline-flex min-h-12 items-center rounded-full bg-rose px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-rose-dark"
		>
			Back to home
		</a>
		<a
			href="/shop"
			class="inline-flex min-h-12 items-center rounded-full border border-rose/50 px-7 text-base font-semibold text-rose-dark transition-colors duration-200 hover:border-rose-dark"
		>
			Shop flowers
		</a>
	</div>
</section>
