<script lang="ts">
	// Slide-in cart drawer: line items, qty steppers, bill with delivery,
	// free-delivery progress. Opens from the header bag / sticky bar.
	import { Minus, Plus, Trash2, X } from '@lucide/svelte';
	import { cart, clearCart, removeLine, setQty } from '#lib/cart.svelte.ts';
	import { freeDeliveryOver, money } from '#lib/data/site.ts';

	let { open = $bindable(false) }: { open: boolean } = $props();

	const remaining = $derived(Math.max(0, freeDeliveryOver - cart.subtotal));
	const progress = $derived(Math.min(100, (cart.subtotal / freeDeliveryOver) * 100));
</script>

{#if open}
	<div class="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Your cart">
		<button
			type="button"
			class="absolute inset-0 bg-leaf-dark/50"
			aria-label="Close cart"
			onclick={() => (open = false)}
		></button>
		<aside
			class="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl"
			data-lenis-prevent
		>
			<div class="flex items-center justify-between border-b border-line px-5 py-4">
				<h2 class="font-display text-2xl font-bold text-leaf">Your cart</h2>
				<button
					type="button"
					onclick={() => (open = false)}
					aria-label="Close cart"
					class="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-blush"
				>
					<X size={22} aria-hidden="true" />
				</button>
			</div>

			{#if cart.count === 0}
				<div class="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
					<p class="font-script text-4xl text-rose">Need flowers?</p>
					<p class="text-muted">Your cart is empty. Add a bouquet — someone will smile.</p>
					<a
						href="/shop"
						onclick={() => (open = false)}
						class="mt-2 flex min-h-12 items-center rounded-full bg-rose px-8 text-sm font-bold tracking-wide text-white uppercase"
					>
						Browse flowers
					</a>
				</div>
			{:else}
				<div class="border-b border-line px-5 py-3">
					{#if remaining > 0}
						<p class="text-sm font-semibold text-ink">Add {money(remaining)} more for free delivery</p>
					{:else}
						<p class="text-sm font-semibold text-leaf">Free delivery unlocked</p>
					{/if}
					<div class="mt-2 h-2 overflow-hidden rounded-full bg-blush">
						<div class="h-full rounded-full bg-rose transition-all duration-300" style="width: {progress}%"></div>
					</div>
				</div>

				<ul class="flex-1 overflow-y-auto px-5 py-4" data-lenis-prevent>
					{#each cart.lines as line (line.key)}
						<li class="flex items-center justify-between gap-3 border-b border-line/70 py-3">
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
									<p class="truncate text-xs text-muted italic">“{line.cardMessage}”</p>
								{/if}
							</div>
							<div class="flex shrink-0 items-center gap-2">
								<div class="flex items-center rounded-full bg-blush">
									<button
										type="button"
										onclick={() => setQty(line.key, line.qty - 1)}
										aria-label={`One less ${line.name}`}
										class="flex h-11 w-11 items-center justify-center rounded-full text-ink"
									>
										<Minus size={15} aria-hidden="true" />
									</button>
									<span class="w-6 text-center text-sm font-bold" aria-label={`${line.qty} of ${line.name}`}
										>{line.qty}</span
									>
									<button
										type="button"
										onclick={() => setQty(line.key, line.qty + 1)}
										aria-label={`One more ${line.name}`}
										class="flex h-11 w-11 items-center justify-center rounded-full text-ink"
									>
										<Plus size={15} aria-hidden="true" />
									</button>
								</div>
								<p class="w-16 text-right text-sm font-black text-ink">{money(line.price * line.qty)}</p>
								<button
									type="button"
									onclick={() => removeLine(line.key)}
									aria-label={`Remove ${line.name}`}
									class="flex h-11 w-11 items-center justify-center rounded-full text-muted hover:text-ink"
								>
									<Trash2 size={16} aria-hidden="true" />
								</button>
							</div>
						</li>
					{/each}
				</ul>

				<div class="space-y-1 border-t border-line px-5 py-4 text-sm">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{money(cart.subtotal)}</span></p>
					<p class="flex justify-between">
						<span class="text-muted">Delivery</span><span class="font-semibold"
							>{cart.delivery === 0 ? 'Free' : money(cart.delivery)}</span
						>
					</p>
					<p class="flex justify-between border-t border-line pt-2 text-base font-black text-ink">
						<span>Total</span><span>{money(cart.total)}</span>
					</p>
					<div class="flex gap-3 pt-3">
						<button
							type="button"
							onclick={clearCart}
							class="min-h-12 rounded-full border border-line px-5 text-sm font-bold text-muted"
						>
							Clear
						</button>
						<a
							href="/checkout"
							onclick={() => (open = false)}
							class="flex min-h-12 flex-1 items-center justify-center rounded-full bg-rose text-sm font-bold tracking-wide text-white uppercase"
						>
							Checkout · {money(cart.total)}
						</a>
					</div>
				</div>
			{/if}
		</aside>
	</div>
{/if}
