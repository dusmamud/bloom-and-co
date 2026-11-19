<script lang="ts">
	import { Check, MapPin, X } from '@lucide/svelte';
	import { money, zoneForPin } from '#lib/data/site.ts';

	let { compact = false }: { compact?: boolean } = $props();

	let pin = $state('');
	let checked = $state(false);
	let zone = $derived(checked && pin.length === 6 ? zoneForPin(pin) : null);

	function check() {
		checked = true;
	}
</script>

<div class="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-6">
	<div class="flex items-center gap-2">
		<MapPin size={20} class="shrink-0 text-rose" aria-hidden="true" />
		<p class="font-display text-lg font-bold text-ink">Check delivery to your PIN code</p>
	</div>
	{#if !compact}
		<p class="mt-1 text-sm text-muted">
			Enter your 6-digit Mumbai PIN code — we will confirm the delivery fee and today’s cutoff before you choose.
		</p>
	{/if}
	<form
		class="mt-4 flex gap-2"
		onsubmit={(e) => {
			e.preventDefault();
			check();
		}}
	>
		<label for="pin-code" class="sr-only">6-digit PIN code</label>
		<input
			id="pin-code"
			type="text"
			inputmode="numeric"
			autocomplete="postal-code"
			maxlength="6"
			pattern="[0-9]{6}"
			bind:value={pin}
			oninput={() => (checked = false)}
			placeholder="e.g. 400 050"
			class="min-h-12 w-full min-w-0 flex-1 rounded-2xl border border-line bg-white px-4 text-base tracking-widest outline-none placeholder:text-muted focus:border-rose"
		/>
		<button
			type="submit"
			class="min-h-12 shrink-0 rounded-full bg-leaf px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-leaf-dark"
		>
			Check
		</button>
	</form>
	{#if checked}
		{#if pin.length !== 6 || !/^\d{6}$/.test(pin)}
			<p class="mt-3 flex items-start gap-2 text-sm font-semibold text-rose-dark" role="status">
				<X size={17} class="mt-0.5 shrink-0" aria-hidden="true" />
				Please enter a valid 6-digit PIN code.
			</p>
		{:else if zone}
			<p class="mt-3 flex items-start gap-2 text-sm leading-relaxed text-ink" role="status">
				<Check size={17} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
				<span>
					<strong>Yes — we deliver to {zone.area}.</strong>
					Delivery {zone.fee === 0 ? 'is free' : `${money(zone.fee)}`} · order by {zone.cutoff} for same-day delivery · {zone.note}.
				</span>
			</p>
		{/if}
	{/if}
</div>
