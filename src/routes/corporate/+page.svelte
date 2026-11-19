<script lang="ts">
	import { Briefcase, Check, FileText, RefreshCw } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	let sent = $state(false);
	let company = $state('');
	let name = $state('');
	let email = $state('');

	const services = [
		{ icon: RefreshCw, title: 'Weekly reception flowers', text: 'A fresh arrangement on your reception desk every Monday — same day, same style, no chasing.' },
		{ icon: Briefcase, title: 'Offices, hotels & restaurants', text: 'Lobby, restaurant-table and boardroom florals, styled to your space and refreshed on schedule.' },
		{ icon: FileText, title: 'Monthly invoicing', text: 'One monthly invoice for all standing orders. Change, pause or cancel by email any time.' }
	];
</script>

<svelte:head>
	<title>Corporate Flowers — Bloom &amp; Co.</title>
	<meta name="description" content="Bloom & Co. corporate flowers in Mumbai — weekly reception arrangements, office and hotel florals, monthly invoicing. Request a quote." />
</svelte:head>

<PageHero
	eyebrow="Corporate"
	title="Flowers for Your Workplace"
	subtitle="Standing weekly orders for offices, hotels and restaurants — fresh arrangements, fixed delivery days, one monthly invoice."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="overflow-hidden rounded-[2rem] ring-1 ring-line">
		<Picture name="corporate-reception" alt="Modern office reception desk with a tall white orchid arrangement" width={1920} height={1280} sizes="100vw" imgClass="aspect-[16/9] w-full object-cover lg:aspect-[21/9]" />
	</div>

	<div class="mt-10 grid gap-5 md:grid-cols-3">
		{#each services as s}
			<article class="rounded-[2rem] bg-white p-7 ring-1 ring-line">
				<span class="flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft text-rose-dark">
					<s.icon size={26} aria-hidden="true" />
				</span>
				<h2 class="mt-4 font-display text-2xl font-bold text-leaf">{s.title}</h2>
				<p class="mt-2 leading-relaxed text-muted">{s.text}</p>
			</article>
		{/each}
	</div>

	<div class="mt-10 grid gap-8 lg:grid-cols-2">
		<div>
			<h2 class="font-display text-3xl font-bold text-leaf">How it works</h2>
			<ul class="mt-4 space-y-3 text-muted">
				{#each ['We visit your space and suggest arrangements that suit it', 'You pick a fixed delivery day — weekly, fortnightly or monthly', 'We deliver, style and take away last week’s arrangement', 'One monthly invoice; change or pause by email any time'] as item}
					<li class="flex items-start gap-2.5">
						<Check size={19} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
						<span>{item}</span>
					</li>
				{/each}
			</ul>
			<p class="mt-6 rounded-2xl bg-blush px-5 py-4 text-sm leading-relaxed text-muted">
				Standing orders start at ₹2,999 a month for a single reception arrangement. Festive gifting for clients and
				teams — Diwali hampers, New Year bouquets — is quoted separately.
			</p>
		</div>
		<div class="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8">
			{#if sent}
				<div class="py-8 text-center" role="status">
					<p class="font-script text-4xl text-rose">Thank you!</p>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
						Your corporate enquiry is in (mock). Our team replies within one working day with a quote for {company || 'your workplace'}.
					</p>
				</div>
			{:else}
				<h2 class="font-display text-2xl font-bold text-leaf">Request a quote</h2>
				<p class="mt-1 text-sm text-muted">Mock form — nothing is sent anywhere.</p>
				<form
					class="mt-5 grid gap-4"
					onsubmit={(e) => {
						e.preventDefault();
						sent = true;
					}}
				>
					<label class="block text-sm font-bold text-ink">
						Company
						<input required bind:value={company} placeholder="e.g. Meridian Hotels" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Your name
						<input required bind:value={name} placeholder="e.g. Rahul Desai" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Work email
						<input required type="email" bind:value={email} placeholder="you@company.com" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						What do you need?
						<select class="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base font-normal outline-none focus:border-rose">
							<option>Weekly reception flowers</option>
							<option>Office / lobby florals</option>
							<option>Restaurant table flowers</option>
							<option>Festive client gifting</option>
							<option>Something else</option>
						</select>
					</label>
					<button type="submit" class="mt-2 flex min-h-12 items-center justify-center rounded-full bg-rose text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark">
						Request my quote
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>
