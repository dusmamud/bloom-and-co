<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { occasions, products } from '#lib/data/site.ts';
</script>

<PageHero
	eyebrow="Shop by Occasion"
	title="Flowers for Every Moment"
	subtitle="Birthdays, anniversaries, apologies, Tuesdays — whatever the moment, there is a bouquet for it."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each occasions as occasion}
			{@const count = products.filter((p) => p.occasions.includes(occasion.id)).length}
			<a
				href={`/occasions/${occasion.id}`}
				class="group overflow-hidden rounded-[2rem] bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-lg"
			>
				<div class="overflow-hidden">
					<Picture
						name={occasion.image}
						alt={`${occasion.name} bouquet`}
						width={800}
						height={800}
						sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
						imgClass="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
					/>
				</div>
				<div class="p-6">
					<h2 class="font-display text-2xl font-bold text-leaf group-hover:text-rose-dark">{occasion.name}</h2>
					<p class="mt-1 font-script text-2xl text-rose">{occasion.tagline}</p>
					<p class="mt-2 leading-relaxed text-muted">{occasion.description}</p>
					<p class="mt-4 flex items-center gap-1.5 text-sm font-bold text-rose-dark">
						Shop {count} bouquet{count === 1 ? '' : 's'}
						<ArrowRight size={16} class="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
					</p>
				</div>
			</a>
		{/each}
	</div>
</section>
