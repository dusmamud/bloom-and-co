<script lang="ts">
	import { ArrowRight, CalendarHeart, Check, Flower2, Handshake, Sparkles } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	let sent = $state(false);
	let name = $state('');
	let phone = $state('');
	let date = $state('');
	let venue = $state('');
	let guests = $state('');
	let style = $state('Classic romance');
	let budget = $state('₹50,000 – ₹1,00,000');

	const process = [
		{ icon: Handshake, title: 'Consultation', text: 'A free 30-minute chat at our Bandra shop or on video — your story, your venue, your colours.' },
		{ icon: Flower2, title: 'Design & tasting', text: 'We sketch your arrangements and show you real stems, so you see exactly what your day will look like.' },
		{ icon: Sparkles, title: 'The day itself', text: 'Our team delivers, sets up and styles every piece — then quietly disappears before the first guest arrives.' }
	];

	const styles = ['Classic romance', 'Modern minimal', 'Traditional Indian', 'Garden party', 'Royal / palace'];
</script>

<svelte:head>
	<title>Weddings &amp; Events — Bloom &amp; Co.</title>
	<meta name="description" content="Bloom & Co. wedding flowers in Mumbai — bridal bouquets, mandap and stage florals, table centrepieces. Free consultation, reply within one working day." />
</svelte:head>

<PageHero
	eyebrow="Weddings & Events"
	title="Your Day, in Full Bloom"
	subtitle="Bridal bouquets, mandap florals, stage and table centrepieces — designed with you, delivered and styled on the day."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-6 lg:grid-cols-2">
		<div class="overflow-hidden rounded-[2rem] ring-1 ring-line">
			<Picture name="wedding-bouquet" alt="Bridal bouquet of white roses, peonies and eucalyptus" width={1600} height={1067} sizes="(min-width: 1024px) 50vw, 100vw" imgClass="aspect-[3/2] w-full object-cover" />
		</div>
		<div class="overflow-hidden rounded-[2rem] ring-1 ring-line">
			<Picture name="wedding-table" alt="Wedding reception table with white and blush floral centrepieces and candles" width={1600} height={1067} sizes="(min-width: 1024px) 50vw, 100vw" imgClass="aspect-[3/2] w-full object-cover" />
		</div>
	</div>

	<div class="mt-12 grid gap-5 md:grid-cols-3">
		{#each process as step}
			<article class="rounded-[2rem] bg-white p-7 ring-1 ring-line">
				<span class="flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft text-rose-dark">
					<step.icon size={26} aria-hidden="true" />
				</span>
				<h2 class="mt-4 font-display text-2xl font-bold text-leaf">{step.title}</h2>
				<p class="mt-2 leading-relaxed text-muted">{step.text}</p>
			</article>
		{/each}
	</div>

	<div class="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
		<div>
			<h2 class="font-display text-3xl font-bold text-leaf">What we design</h2>
			<ul class="mt-4 space-y-3 text-muted">
				{#each ['Bridal & bridesmaid bouquets', 'Mandap, stage & entrance florals', 'Table centrepieces & aisle décor', 'Car décor & varmala', 'Haldi, mehndi & sangeet flowers', 'Reception & after-party arrangements'] as item}
					<li class="flex items-start gap-2.5">
						<Check size={19} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
						<span>{item}</span>
					</li>
				{/each}
			</ul>
			<p class="mt-6 rounded-2xl bg-blush px-5 py-4 text-sm leading-relaxed text-muted">
				Most full weddings start at ₹50,000; intimate ceremonies from ₹15,000. We like 6–8 weeks of lead time — a
				venue visit, a design tasting, and a backup plan for the one flower that will be out of season.
			</p>
		</div>

		<div class="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8">
			{#if sent}
				<div class="py-8 text-center" role="status">
					<p class="font-script text-4xl text-rose">Thank you, {name || 'lovely'}!</p>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
						Your wedding enquiry is in (mock). Our weddings team replies within one working day — usually much faster —
						to book your free consultation.
					</p>
					<a href="/shop" class="mt-6 inline-flex min-h-12 items-center rounded-full bg-rose px-8 text-base font-bold text-white">
						Browse bouquets meanwhile →
					</a>
				</div>
			{:else}
				<h2 class="font-display text-2xl font-bold text-leaf">Tell us about your wedding</h2>
				<p class="mt-1 text-sm text-muted">Mock enquiry — no details are sent anywhere.</p>
				<form
					class="mt-5 grid gap-4 sm:grid-cols-2"
					onsubmit={(e) => {
						e.preventDefault();
						sent = true;
					}}
				>
					<label class="block text-sm font-bold text-ink">
						Your name
						<input required bind:value={name} placeholder="e.g. Priya Sharma" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Phone
						<input required type="tel" bind:value={phone} placeholder="+91 98765 43210" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Wedding date
						<input required type="date" bind:value={date} class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Venue
						<input required bind:value={venue} placeholder="e.g. Taj Lands End, Bandra" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Guest count
						<input required type="number" min="10" bind:value={guests} placeholder="e.g. 200" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Style
						<select bind:value={style} class="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base font-normal outline-none focus:border-rose">
							{#each styles as s}<option>{s}</option>{/each}
						</select>
					</label>
					<label class="block text-sm font-bold text-ink sm:col-span-2">
						Budget range
						<select bind:value={budget} class="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base font-normal outline-none focus:border-rose">
							<option>Under ₹25,000</option>
							<option>₹25,000 – ₹50,000</option>
							<option>₹50,000 – ₹1,00,000</option>
							<option>₹1,00,000 – ₹2,50,000</option>
							<option>₹2,50,000+</option>
						</select>
					</label>
					<button type="submit" class="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark sm:col-span-2">
						<CalendarHeart size={19} aria-hidden="true" /> Request my free consultation
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>
