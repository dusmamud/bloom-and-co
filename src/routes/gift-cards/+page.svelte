<script lang="ts">
	import { Gift } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { giftCards, money } from '#lib/data/site.ts';

	let amount = $state(1000);
	let recipient = $state('');
	let sender = $state('');
	let sent = $state(false);
</script>

<PageHero
	eyebrow="Gift Cards"
	title="Give Flowers, Their Way"
	subtitle="Not sure which bouquet? A Bloom & Co. gift card lets them choose — delivered instantly by email, never expires."
/>

<section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
	{#if sent}
		<div class="rounded-[2rem] bg-leaf px-6 py-12 text-center text-white sm:px-10">
			<Gift size={44} class="mx-auto text-rose-soft" aria-hidden="true" />
			<h2 class="mt-4 font-display text-3xl font-bold">Gift card sent (mock)!</h2>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-white/85">
				A {money(amount)} gift card is on its way to {recipient || 'your recipient'} from {sender || 'you'}.
				It never expires and works on every bouquet, subscription and vase.
			</p>
			<button
				type="button"
				onclick={() => (sent = false)}
				class="mt-7 inline-flex min-h-12 items-center rounded-full bg-white px-8 text-base font-bold text-leaf"
			>
				Send another
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
			<fieldset>
				<legend class="font-display text-2xl font-bold text-leaf">Choose an amount</legend>
				<div class="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5">
					{#each giftCards as card}
						<button
							type="button"
							onclick={() => (amount = card.amount)}
							aria-pressed={amount === card.amount}
							class="rounded-2xl border-2 px-3 py-4 transition-colors duration-200 {amount === card.amount
								? 'border-rose bg-rose-soft'
								: 'border-line bg-white hover:border-rose'}"
						>
							<span class="block text-xl font-black text-ink">{money(card.amount)}</span>
							<span class="mt-1 block text-xs text-muted">{card.blurb}</span>
						</button>
					{/each}
				</div>
			</fieldset>
			<div class="mt-6 grid gap-4 sm:grid-cols-2">
				<label class="block text-sm font-bold text-ink">
					Recipient email
					<input required type="email" bind:value={recipient} placeholder="friend@example.in" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
				</label>
				<label class="block text-sm font-bold text-ink">
					Your name
					<input required bind:value={sender} placeholder="e.g. Alex" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
				</label>
			</div>
			<button
				type="submit"
				class="mt-7 flex min-h-12 w-full items-center justify-center rounded-full bg-rose text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark"
			>
				Send {money(amount)} gift card (mock)
			</button>
			<p class="mt-4 text-center text-sm text-muted">
				No payment is taken in this mock checkout. Gift cards never expire.
			</p>
		</form>
	{/if}
</section>
