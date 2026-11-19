<script lang="ts">
	import { Clock, Mail, MapPin, Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let sent = $state(false);
</script>

<PageHero
	eyebrow="Contact Us"
	title="We’d Love to Hear From You"
	subtitle="Custom bouquets, weddings, events, or just a question about roses — write to us or drop by the shop."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-8 lg:grid-cols-2">
		<div class="space-y-5">
			<div class="flex items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-line">
				<MapPin size={26} class="mt-0.5 shrink-0 text-rose" aria-hidden="true" />
				<div>
					<h2 class="font-display text-xl font-bold text-ink">Visit the shop</h2>
					<p class="mt-1 leading-relaxed text-muted">{site.address}</p>
				</div>
			</div>
			<div class="flex items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-line">
				<Clock size={26} class="mt-0.5 shrink-0 text-rose" aria-hidden="true" />
				<div>
					<h2 class="font-display text-xl font-bold text-ink">Opening hours</h2>
					<p class="mt-1 leading-relaxed text-muted">{site.hours}</p>
				</div>
			</div>
			<div class="flex items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-line">
				<Phone size={26} class="mt-0.5 shrink-0 text-rose" aria-hidden="true" />
				<div>
					<h2 class="font-display text-xl font-bold text-ink">Call or WhatsApp</h2>
					<p class="mt-1 leading-relaxed text-muted">
						<a href={site.phoneHref} class="font-semibold text-rose-dark hover:underline">{site.phoneDisplay}</a>
						· <a href={site.whatsappHref} target="_blank" rel="noopener" class="font-semibold text-rose-dark hover:underline">WhatsApp us</a>
					</p>
				</div>
			</div>
			<div class="flex items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-line">
				<Mail size={26} class="mt-0.5 shrink-0 text-rose" aria-hidden="true" />
				<div>
					<h2 class="font-display text-xl font-bold text-ink">Email</h2>
					<p class="mt-1 leading-relaxed text-muted">
						<a href="mailto:{site.email}" class="font-semibold text-rose-dark hover:underline">{site.email}</a>
					</p>
				</div>
			</div>
		</div>

		{#if sent}
			<div class="flex flex-col items-center justify-center rounded-[2rem] bg-leaf px-6 py-12 text-center text-white">
				<p class="font-script text-5xl">Thank you, {name.split(' ')[0] || 'friend'}!</p>
				<p class="mt-4 max-w-sm leading-relaxed text-white/85">
					Your message is with our florists (mock — nothing was sent). We usually reply within the hour, 8am–8pm.
				</p>
				<button type="button" onclick={() => (sent = false)} class="mt-7 inline-flex min-h-12 items-center rounded-full bg-white px-8 text-base font-bold text-leaf">
					Send another message
				</button>
			</div>
		{:else}
			<form
				class="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8"
				onsubmit={(e) => {
					e.preventDefault();
					sent = true;
				}}
			>
				<h2 class="font-display text-2xl font-bold text-leaf">Send us a message</h2>
				<div class="mt-5 space-y-4">
					<label class="block text-sm font-bold text-ink">
						Your name
						<input required bind:value={name} placeholder="e.g. Alex Morgan" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Email
						<input required type="email" bind:value={email} placeholder="you@example.in" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Message
						<textarea required bind:value={message} rows="5" placeholder="Tell us about your occasion, date, budget…" class="mt-1.5 w-full rounded-2xl border border-line px-4 py-3 text-base font-normal outline-none focus:border-rose"></textarea>
					</label>
				</div>
				<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-rose text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark">
					Send message (mock)
				</button>
			</form>
		{/if}
	</div>
</section>
