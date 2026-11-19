<script lang="ts">
	import { Check, Package, Search, Truck } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';

	let ref = $state('');
	let phone = $state('');
	let looked = $state(false);
	let demo = $state(false);

	// Mock status timeline. Any ref that looks like a Bloom order shows the
	// journey; the demo button fills in a sample order.
	const stages = [
		{ name: 'Order confirmed', time: 'Today, 10:04am', done: true, text: 'Our florists received your order and started hand-tying your bouquet.' },
		{ name: 'Out for delivery', time: 'Today, 1:30pm', done: true, text: 'Your bouquet left the Bandra shop with our courier. The recipient gets a call first.' },
		{ name: 'Delivered', time: 'Today, 3:15pm', done: false, text: 'Photo proof of the delivered arrangement is sent to the sender by text.' }
	];

	function track(e: Event) {
		e.preventDefault();
		looked = true;
	}
</script>

<svelte:head>
	<title>Track Your Order — Bloom &amp; Co.</title>
	<meta name="description" content="Track your Bloom & Co. flower delivery — order number and phone. See confirmed, out for delivery and delivered status." />
</svelte:head>

<PageHero
	eyebrow="Track Order"
	title="Where Are My Flowers?"
	subtitle="Enter your order number and phone number to see your bouquet's journey — confirmed, out for delivery, delivered."
/>

<section class="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:py-14">
	<form
		class="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8"
		onsubmit={track}
	>
		<label class="block text-sm font-bold text-ink">
			Order number
			<input
				required
				bind:value={ref}
				placeholder="e.g. BLM-2026-0142"
				class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 font-mono text-base outline-none placeholder:text-muted focus:border-rose"
			/>
		</label>
		<label class="mt-4 block text-sm font-bold text-ink">
			Phone number (used at checkout)
			<input
				required
				type="tel"
				bind:value={phone}
				placeholder="+91 98765 43210"
				class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base outline-none placeholder:text-muted focus:border-rose"
			/>
		</label>
		<button
			type="submit"
			class="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-rose text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark"
		>
			<Search size={18} aria-hidden="true" /> Track my order
		</button>
		<button
			type="button"
			onclick={() => {
				ref = 'BLM-2026-0142';
				phone = '+91 98765 43210';
				looked = true;
				demo = true;
			}}
			class="mt-3 w-full text-center text-sm font-bold text-rose-dark underline-offset-4 hover:underline"
		>
			Try a demo order instead →
		</button>
	</form>

	{#if looked}
		<div class="mt-8 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8" role="status">
			<div class="flex items-center gap-3">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-leaf-soft text-leaf">
					<Package size={24} aria-hidden="true" />
				</span>
				<div>
					<p class="font-display text-2xl font-bold text-leaf">Order {ref || 'BLM-2026-0142'}</p>
					<p class="text-sm text-muted">{demo ? 'Demo order — Classic Red Roses, Deluxe' : 'Mock status — no real order is tracked.'}</p>
				</div>
			</div>
			<ol class="mt-6 space-y-0">
				{#each stages as stage, i}
					<li class="relative flex gap-4 pb-6 last:pb-0">
						{#if i < stages.length - 1}
							<span class="absolute top-10 left-5 h-full w-px bg-line" aria-hidden="true"></span>
						{/if}
						<span
							class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full {stage.done
								? 'bg-leaf text-white'
								: 'bg-blush text-muted'}"
						>
							{#if stage.done}<Check size={18} aria-hidden="true" />{:else}<Truck size={18} aria-hidden="true" />{/if}
						</span>
						<div>
							<p class="font-bold text-ink">{stage.name} <span class="font-normal text-muted">· {stage.time}</span></p>
							<p class="mt-0.5 text-sm leading-relaxed text-muted">{stage.text}</p>
						</div>
					</li>
				{/each}
			</ol>
			<p class="mt-6 rounded-2xl bg-blush px-4 py-3 text-sm leading-relaxed text-muted">
				When your flowers are delivered, we text the sender a photo of the arrangement at the door. Questions about an
				order? Call us on <a href="tel:+919876543210" class="font-bold text-leaf">+91 98765 43210</a>.
			</p>
		</div>
	{/if}
</section>
