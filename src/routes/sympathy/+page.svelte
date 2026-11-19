<script lang="ts">
	import { Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';

	let sent = $state(false);
	let yourName = $state('');
	let deceased = $state('');
	let venue = $state('');
	let serviceDate = $state('');
	let serviceTime = $state('');
	let wording = $state('With deepest sympathy');
</script>

<svelte:head>
	<title>Sympathy Flowers — Bloom &amp; Co.</title>
	<meta name="description" content="Bloom & Co. sympathy flowers in Mumbai — peaceful white arrangements for home, funeral service or graveside, delivered with care and discretion." />
</svelte:head>

<PageHero
	eyebrow="Sympathy"
	title="With Love and Condolences"
	subtitle="Peaceful white arrangements, delivered with care and discretion — to a home, a funeral service, or a graveside."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-8 lg:grid-cols-2">
		<div>
			<div class="overflow-hidden rounded-[2rem] ring-1 ring-line">
				<Picture name="occasion-sympathy" alt="White lilies and chrysanthemums — a quiet, respectful tribute" width={1200} height={1200} sizes="(min-width: 1024px) 50vw, 100vw" imgClass="aspect-square w-full object-cover" />
			</div>
			<div class="mt-6 space-y-5">
				<div>
					<h2 class="font-display text-2xl font-bold text-leaf">Where should they go?</h2>
					<ul class="mt-3 space-y-3 text-muted">
						<li><strong class="text-ink">To the home</strong> — a gentle bouquet for the family, with a blank card for your own words.</li>
						<li><strong class="text-ink">To the service</strong> — standing sprays and wreaths, delivered to the funeral home before the service begins.</li>
						<li><strong class="text-ink">To the graveside</strong> — low, weather-hardy arrangements placed with care.</li>
					</ul>
				</div>
				<div class="rounded-2xl bg-blush px-5 py-4">
					<h3 class="font-bold text-ink">If words are hard, use one of these</h3>
					<ul class="mt-2 space-y-1 text-sm text-muted">
						<li>“With deepest sympathy”</li>
						<li>“Thinking of you and your family”</li>
						<li>“With love and condolences”</li>
						<li>“In loving memory”</li>
					</ul>
				</div>
				<p class="text-sm leading-relaxed text-muted">
					Prefer to talk? Call us on <a href={site.phoneHref} class="font-bold text-leaf">{site.phoneDisplay}</a> — our
					team handles sympathy orders with extra attention, and will confirm the delivery time with the funeral home for you.
				</p>
			</div>
		</div>

		<div class="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8">
			{#if sent}
				<div class="py-8 text-center" role="status">
					<p class="font-script text-4xl text-rose">Thank you.</p>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
						Your sympathy order request is in (mock). We will call {yourName || 'you'} to confirm the details before
						anything is made — and handle the delivery with care.
					</p>
				</div>
			{:else}
				<h2 class="font-display text-2xl font-bold text-leaf">Arrange sympathy flowers</h2>
				<p class="mt-1 text-sm text-muted">Mock form — nothing is sent anywhere.</p>
				<form
					class="mt-5 grid gap-4"
					onsubmit={(e) => {
						e.preventDefault();
						sent = true;
					}}
				>
					<label class="block text-sm font-bold text-ink">
						Your name
						<input required bind:value={yourName} placeholder="e.g. Ananya Iyer" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Name of the deceased
						<input required bind:value={deceased} placeholder="e.g. Late Mr. R. Iyer" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Funeral home / venue
						<input required bind:value={venue} placeholder="e.g. St. Peter’s Church, Bandra" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<div class="grid grid-cols-2 gap-4">
						<label class="block text-sm font-bold text-ink">
							Service date
							<input required type="date" bind:value={serviceDate} class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
						</label>
						<label class="block text-sm font-bold text-ink">
							Service time
							<input required type="time" bind:value={serviceTime} class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
						</label>
					</div>
					<label class="block text-sm font-bold text-ink">
						Card wording
						<select bind:value={wording} class="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base font-normal outline-none focus:border-rose">
							<option>With deepest sympathy</option>
							<option>Thinking of you and your family</option>
							<option>With love and condolences</option>
							<option>In loving memory</option>
						</select>
					</label>
					<button type="submit" class="mt-2 flex min-h-12 items-center justify-center rounded-full bg-leaf text-base font-bold text-white transition-colors duration-200 hover:bg-leaf-dark">
						Send my request
					</button>
					<a
						href={site.phoneHref}
						class="flex min-h-12 items-center justify-center gap-2 rounded-full border border-line text-base font-bold text-ink"
					>
						<Phone size={18} aria-hidden="true" /> Call us instead — {site.phoneDisplay}
					</a>
				</form>
			{/if}
		</div>
	</div>
</section>
