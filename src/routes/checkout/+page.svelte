<script lang="ts">
	import { Check, PartyPopper } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { cart, clearCart, setQty } from '#lib/cart.svelte.ts';
	import { money } from '#lib/data/site.ts';

	let step = $state(1);
	let name = $state('');
	let phone = $state('');
	let address = $state('');
	let pin = $state('');
	let date = $state('');
	let slot = $state('Morning (9am–12pm)');
	let message = $state('');
	let payment = $state('upi');
	let orderRef = $state('');
	let minDate = $state('');

	// Date picker bounds are client-side (prerender must not bake build-time dates).
	$effect(() => {
		const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
		if (ist.getHours() >= 14) ist.setDate(ist.getDate() + 1);
		minDate = `${ist.getFullYear()}-${String(ist.getMonth() + 1).padStart(2, '0')}-${String(ist.getDate()).padStart(2, '0')}`;
		if (!date) date = minDate;
	});

	function toStep2() {
		// Carry the card message typed on the product page into checkout.
		if (!message.trim()) {
			const withMessage = cart.lines.find((l) => l.cardMessage.trim());
			if (withMessage) message = withMessage.cardMessage;
		}
		if (!date && cart.lines[0]?.deliveryDate) date = cart.lines[0].deliveryDate;
		step = 2;
	}

	function placeOrder() {
		orderRef = `BLM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
		step = 3;
		clearCart();
	}
</script>

<svelte:head>
	<title>Checkout — Bloom &amp; Co.</title>
	<meta name="description" content="Checkout — mock order for Bloom & Co. flowers. No payment is taken." />
</svelte:head>

<PageHero
	eyebrow="Checkout"
	title="Almost There — Beautiful Blooms Await"
	subtitle="This is a mock checkout for the design review. No payment is taken and no flowers are sent — yet."
/>

<section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
	{#if step === 3}
		<div class="rounded-[2rem] bg-leaf px-6 py-12 text-center text-white sm:px-10">
			<PartyPopper size={44} class="mx-auto text-rose-soft" aria-hidden="true" />
			<h2 class="mt-4 font-display text-3xl font-bold sm:text-4xl">Thank you — your order is in!</h2>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-white/85">
				Order <strong class="text-white">{orderRef}</strong> is confirmed (mock). Our florists will hand-tie your
				bouquet and deliver it on <strong class="text-white">{date || 'your chosen date'}</strong>, {slot.toLowerCase()}.
			</p>
			<p class="mt-2 text-sm text-white/70">A confirmation text is on its way to {phone || 'your phone'}.</p>
			<div class="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a
					href="/track-order"
					class="inline-flex min-h-12 items-center rounded-full bg-white px-8 text-base font-bold text-leaf"
				>
					Track your order →
				</a>
				<a
					href="/shop"
					class="inline-flex min-h-12 items-center rounded-full border border-white/40 px-8 text-base font-bold text-white"
				>
					Shop more flowers
				</a>
			</div>
		</div>
	{:else if cart.count === 0}
		<div class="rounded-[2rem] bg-blush px-6 py-14 text-center">
			<p class="font-script text-4xl text-rose">Your cart is empty</p>
			<p class="mx-auto mt-3 max-w-md text-muted">Add a bouquet first — someone out there deserves flowers today.</p>
			<a
				href="/shop"
				class="mt-6 inline-flex min-h-12 items-center rounded-full bg-rose px-8 text-base font-bold text-white"
			>
				Browse flowers
			</a>
		</div>
	{:else}
		<!-- Steps -->
		<ol class="flex items-center gap-2 text-sm font-bold" aria-label="Checkout steps">
			<li class="flex items-center gap-2 {step === 1 ? 'text-rose-dark' : 'text-leaf'}">
				<span class="flex h-8 w-8 items-center justify-center rounded-full {step === 1 ? 'bg-rose text-white' : 'bg-leaf text-white'}">1</span>
				Review
			</li>
			<li class="h-px flex-1 bg-line" aria-hidden="true"></li>
			<li class="flex items-center gap-2 {step === 2 ? 'text-rose-dark' : 'text-muted'}">
				<span class="flex h-8 w-8 items-center justify-center rounded-full {step === 2 ? 'bg-rose text-white' : 'bg-blush text-muted'}">2</span>
				Delivery &amp; payment
			</li>
			<li class="h-px flex-1 bg-line" aria-hidden="true"></li>
			<li class="flex items-center gap-2 text-muted">
				<span class="flex h-8 w-8 items-center justify-center rounded-full bg-blush text-muted">
					<Check size={15} aria-hidden="true" />
				</span>
				Done
			</li>
		</ol>

		{#if step === 1}
			<div class="mt-8 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-bold text-leaf">Your bouquets</h2>
				<ul class="mt-4 divide-y divide-line">
					{#each cart.lines as line (line.key)}
						<li class="flex items-center justify-between gap-4 py-4">
							<div class="min-w-0">
								<p class="font-bold text-ink">{line.name}</p>
								<p class="text-sm text-muted">{line.tier} · {money(line.price)} each</p>
								{#if line.addons.length > 0}
									<p class="text-xs text-muted">+ {line.addons.join(', ')}</p>
								{/if}
								{#if line.deliveryDate}
									<p class="text-xs font-semibold text-leaf">Deliver on {line.deliveryDate}</p>
								{/if}
								{#if line.cardMessage}
									<p class="truncate text-xs text-muted italic">Card: “{line.cardMessage}”</p>
								{/if}
							</div>
							<div class="flex shrink-0 items-center gap-3">
								<div class="flex items-center rounded-full bg-blush">
									<button type="button" onclick={() => setQty(line.key, line.qty - 1)} aria-label={`One less ${line.name}`} class="flex h-11 w-11 items-center justify-center rounded-full">−</button>
									<span class="w-6 text-center text-sm font-bold">{line.qty}</span>
									<button type="button" onclick={() => setQty(line.key, line.qty + 1)} aria-label={`One more ${line.name}`} class="flex h-11 w-11 items-center justify-center rounded-full">+</button>
								</div>
								<p class="w-20 text-right font-black text-ink">{money(line.price * line.qty)}</p>
							</div>
						</li>
					{/each}
				</ul>
				<div class="space-y-1 border-t border-line pt-4 text-sm">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{money(cart.subtotal)}</span></p>
					<p class="flex justify-between"><span class="text-muted">Delivery {cart.delivery === 0 ? '(free over ₹999)' : ''}</span><span class="font-semibold">{cart.delivery === 0 ? 'Free' : money(cart.delivery)}</span></p>
					<p class="flex justify-between border-t border-line pt-2 text-lg font-black text-ink"><span>Total</span><span>{money(cart.total)}</span></p>
				</div>
				<button
					type="button"
					onclick={toStep2}
					class="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-rose text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark"
				>
					Continue to delivery →
				</button>
			</div>
		{:else}
			<form
				class="mt-8 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8"
				onsubmit={(e) => {
					e.preventDefault();
					placeOrder();
				}}
			>
				<h2 class="font-display text-2xl font-bold text-leaf">Delivery details</h2>
				<div class="mt-5 grid gap-4 sm:grid-cols-2">
					<label class="block text-sm font-bold text-ink">
						Recipient name
						<input required bind:value={name} placeholder="e.g. Priya Sharma" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Recipient phone
						<input required type="tel" bind:value={phone} placeholder="+91 98765 43210" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink sm:col-span-2">
						Delivery address
						<input required bind:value={address} placeholder="Street, apartment, city" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						PIN code
						<input required type="text" inputmode="numeric" maxlength="6" pattern="[0-9]{6}" bind:value={pin} placeholder="400 050" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal tracking-widest outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Delivery date
						<input required type="date" min={minDate} bind:value={date} class="mt-1.5 min-h-12 w-full rounded-2xl border border-line px-4 text-base font-normal outline-none focus:border-rose" />
					</label>
					<label class="block text-sm font-bold text-ink">
						Time slot
						<select bind:value={slot} class="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base font-normal outline-none focus:border-rose">
							<option>Morning (9am–12pm)</option>
							<option>Afternoon (12–4pm)</option>
							<option>Evening (4–8pm)</option>
						</select>
					</label>
					<label class="block text-sm font-bold text-ink sm:col-span-2">
						Card message (free, hand-written)
						<textarea bind:value={message} rows="2" placeholder="Your message for the gift tag…" class="mt-1.5 w-full rounded-2xl border border-line px-4 py-3 text-base font-normal outline-none focus:border-rose"></textarea>
					</label>
				</div>

				<fieldset class="mt-7">
					<legend class="text-sm font-bold text-ink">Payment method (mock — no payment is taken)</legend>
					<div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
						{#each [['upi', 'UPI'], ['card', 'Card'], ['wallet', 'Wallet'], ['cod', 'Pay on delivery']] as [value, label]}
							<label class="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors duration-200 {payment === value ? 'border-rose bg-rose-soft text-rose-dark' : 'border-line text-ink'}">
								<input type="radio" name="payment" {value} bind:group={payment} class="sr-only" />
								{label}
							</label>
						{/each}
					</div>
				</fieldset>

				<!-- Order recap before Pay: date + slot + card message -->
				<div class="mt-7 rounded-2xl bg-blush px-5 py-4 text-sm leading-relaxed">
					<p class="font-bold text-ink">Please check before you pay</p>
					<p class="mt-1 text-muted">
						Delivery on <strong class="text-ink">{date || 'your chosen date'}</strong>, {slot.toLowerCase()} · to {name || 'the recipient'}{pin ? `, PIN ${pin}` : ''}
					</p>
					{#if message.trim()}
						<p class="mt-1 text-muted">Card message: <em>“{message.trim()}”</em></p>
					{/if}
					<p class="mt-1 text-muted">Guest checkout — no account needed. We will offer to save your details after payment.</p>
				</div>

				<div class="mt-7 space-y-1 border-t border-line pt-4 text-sm">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{money(cart.subtotal)}</span></p>
					<p class="flex justify-between"><span class="text-muted">Delivery</span><span class="font-semibold">{cart.delivery === 0 ? 'Free' : money(cart.delivery)}</span></p>
					<p class="flex justify-between border-t border-line pt-2 text-lg font-black text-ink"><span>Total</span><span>{money(cart.total)}</span></p>
				</div>
				<div class="mt-6 flex flex-col gap-3 sm:flex-row">
					<button type="button" onclick={() => (step = 1)} class="min-h-12 rounded-full border border-line px-7 text-sm font-bold text-muted">← Back to cart</button>
					<button type="submit" class="min-h-12 flex-1 rounded-full bg-rose text-base font-bold text-white transition-colors duration-200 hover:bg-rose-dark">
						Place order · {money(cart.total)} (mock)
					</button>
				</div>
			</form>
		{/if}
	{/if}
</section>
