<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import FaqAccordion from '#lib/components/FaqAccordion.svelte';
	import { faqs } from '#lib/data/site.ts';
</script>

<PageHero
	eyebrow="FAQ"
	title="Questions? We’ve Got Answers"
	subtitle="Everything about delivery, freshness, cards, cancellations and more. Still stuck? Call us — a human answers."
/>

<section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
	<FaqAccordion items={faqs} />
	<div class="mt-10 rounded-[2rem] bg-blush px-6 py-8 text-center">
		<h2 class="font-display text-2xl font-bold text-leaf">Can’t find your answer?</h2>
		<p class="mt-2 text-muted">Call +91 98765 43210 or WhatsApp us — we reply within the hour, 8am–8pm IST.</p>
		<a href="/contact" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-rose px-8 text-base font-bold text-white">
			Contact us →
		</a>
	</div>
</section>
