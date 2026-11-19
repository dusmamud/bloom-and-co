<script lang="ts">
	import { BellRing, CalendarHeart } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';

	let sent = $state(false);
	let name = $state('');
	let contact = $state('');
	let occasion = $state('Birthday');
	let date = $state('');
	let relation = $state('');

	const occasions = ['Birthday', 'Anniversary', 'Mother’s Day', 'Father’s Day', 'Valentine’s Day', 'Wedding anniversary', 'Other'];
</script>

<svelte:head>
	<title>Occasion Reminders — Bloom &amp; Co.</title>
	<meta name="description" content="Never miss a birthday or anniversary — Bloom & Co. occasion reminders by email or SMS, a week before the day, with a bouquet suggestion." />
</svelte:head>

<PageHero
	eyebrow="Never Miss a Date"
	title="Occasion Reminders"
	subtitle="Tell us the birthdays and anniversaries that matter. We will remind you a week before — with a bouquet suggestion, never spam."
/>

<section class="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8">
		{#if sent}
			<div class="py-8 text-center" role="status">
				<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf-soft text-leaf">
					<BellRing size={30} aria-hidden="true" />
				</span>
				<p class="mt-4 font-script text-4xl text-rose">You’re all set!</p>
				<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
					We will remind you about {occasion.toLowerCase()} on {date || 'your date'} — a week before, at {contact || 'your contact'}.
					Mock reminder — nothing is stored or sent.
				</p>
				<a href="/shop" class="mt-6 inline-flex min-h-12 items-center rounded-full bg-rose px-8 text-base font-bold text-white">
					Browse flowers meanwhile →
				</a>
			</div>
		{:else}
			<form
				class="grid gap-4 sm:grid-cols-2"
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
					Email or phone
					<input required bind:value={contact} placeholder="you@example.com" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
				</label>
				<label class="block text-sm font-bold text-ink">
					Occasion
					<select bind:value={occasion} class="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base font-normal outline-none focus:border-rose">
						{#each occasions as o}<option>{o}</option>{/each}
					</select>
				</label>
				<label class="block text-sm font-bold text-ink">
					Date
					<input required type="date" bind:value={date} class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
				</label>
				<label class="block text-sm font-bold text-ink sm:col-span-2">
					Who is it for?
					<input bind:value={relation} placeholder="e.g. My mother, my husband, my best friend" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
				</label>
				<button type="submit" class="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark sm:col-span-2">
					<CalendarHeart size={19} aria-hidden="true" /> Remind me a week before
				</button>
				<p class="text-center text-xs leading-relaxed text-muted sm:col-span-2">
					One reminder per occasion, a week before the day. No spam, no sharing your details — unsubscribe any time.
				</p>
			</form>
		{/if}
	</div>
</section>
