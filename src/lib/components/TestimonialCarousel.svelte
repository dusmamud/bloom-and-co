<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { testimonials } from '#lib/data/site.ts';

	let emblaApi: {
		scrollPrev: () => void;
		scrollNext: () => void;
		scrollTo: (i: number) => void;
		selectedScrollSnap: () => number;
		on: (e: string, f: () => void) => void;
	} | null = $state(null);
	let selected = $state(0);

	function onInit(event: CustomEvent) {
		const api = event.detail as NonNullable<typeof emblaApi>;
		emblaApi = api;
		api.on('select', () => (selected = api.selectedScrollSnap()));
	}
</script>

<div class="relative">
	<div class="overflow-hidden" use:emblaCarouselSvelte={{ options: { loop: true, align: 'start' }, plugins: [] }} onemblaInit={onInit}>
		<div class="flex gap-5">
			{#each testimonials as t}
				<figure class="flex min-w-0 shrink-0 basis-[85%] flex-col rounded-3xl bg-white p-6 ring-1 ring-line sm:basis-[47%] lg:basis-[31.5%]">
					<Stars rating={t.rating} size={17} />
					<blockquote class="mt-3 flex-1 leading-relaxed text-ink">“{t.text}”</blockquote>
					<figcaption class="mt-4">
						<p class="font-bold text-ink">{t.name}</p>
						<p class="text-sm text-muted">{t.occasion}</p>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
	<div class="mt-6 flex items-center justify-center gap-4">
		<button
			type="button"
			onclick={() => emblaApi?.scrollPrev()}
			aria-label="Previous reviews"
			class="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-rose hover:text-rose-dark"
		>
			<ChevronLeft size={21} aria-hidden="true" />
		</button>
		<div class="flex gap-2" role="tablist" aria-label="Choose review">
			{#each testimonials as _, i}
				<button
					type="button"
					role="tab"
					aria-selected={selected === i}
					aria-label={`Go to review ${i + 1}`}
					onclick={() => emblaApi?.scrollTo(i)}
					class="h-2.5 rounded-full transition-all duration-200 {selected === i ? 'w-7 bg-rose' : 'w-2.5 bg-line'}"
				></button>
			{/each}
		</div>
		<button
			type="button"
			onclick={() => emblaApi?.scrollNext()}
			aria-label="Next reviews"
			class="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-rose hover:text-rose-dark"
		>
			<ChevronRight size={21} aria-hidden="true" />
		</button>
	</div>
</div>
