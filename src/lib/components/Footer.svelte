<script lang="ts">
	import { Gift, Headphones, Leaf, ShieldCheck } from '@lucide/svelte';
	import Logo from '#lib/components/Logo.svelte';
	import { site } from '#lib/data/site.ts';

	let email = $state('');
	let subscribed = $state(false);

	const trust = [
		{ icon: Leaf, title: 'Premium Quality', text: 'Only the freshest blooms' },
		{ icon: ShieldCheck, title: 'Secure Payment', text: 'Your data is safe with us' },
		{ icon: Gift, title: 'Beautiful Packaging', text: 'Thoughtfully wrapped' },
		{ icon: Headphones, title: '24/7 Support', text: "We're here to help" }
	];
</script>

<!-- Trust strip — same four promises as the reference design -->
<section class="border-t border-line bg-white" aria-label="Our promises">
	<div class="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
		{#each trust as item}
			<div class="flex items-start gap-3">
				<item.icon size={30} class="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
				<div>
					<p class="font-display text-lg font-bold text-ink">{item.title}</p>
					<p class="text-sm text-muted">{item.text}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<footer class="bg-leaf text-white">
	<div class="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
		<div>
			<div class="brightness-0 invert"><Logo /></div>
			<p class="mt-4 max-w-xs leading-relaxed text-white/75">
				Beautiful blooms for every occasion. Handcrafted with love, delivered with care — since 2016.
			</p>
			<p class="mt-4 font-script text-3xl text-rose-soft">Fresh flowers, brighter days</p>
		</div>
		<nav aria-label="Shop">
			<p class="font-display text-lg font-bold">Shop</p>
			<ul class="mt-4 space-y-2.5 text-white/80">
				<li><a class="hover:text-white" href="/shop">All Flowers</a></li>
				<li><a class="hover:text-white" href="/occasions">Shop by Occasion</a></li>
				<li><a class="hover:text-white" href="/occasions/birthday">Birthday</a></li>
				<li><a class="hover:text-white" href="/occasions/love">Love &amp; Romance</a></li>
				<li><a class="hover:text-white" href="/subscriptions">Subscriptions</a></li>
				<li><a class="hover:text-white" href="/gift-cards">Gift Cards</a></li>
			</ul>
		</nav>
		<nav aria-label="Help">
			<p class="font-display text-lg font-bold">Help</p>
			<ul class="mt-4 space-y-2.5 text-white/80">
				<li><a class="hover:text-white" href="/delivery">Delivery Information</a></li>
				<li><a class="hover:text-white" href="/care">Flower Care Guide</a></li>
				<li><a class="hover:text-white" href="/faq">FAQ</a></li>
				<li><a class="hover:text-white" href="/contact">Contact Us</a></li>
				<li><a class="hover:text-white" href="/reviews">Reviews</a></li>
				<li><a class="hover:text-white" href="/privacy">Privacy Policy</a></li>
				<li><a class="hover:text-white" href="/terms">Terms of Service</a></li>
			</ul>
		</nav>
		<div>
			<p class="font-display text-lg font-bold">Visit the shop</p>
			<address class="mt-4 leading-relaxed text-white/80 not-italic">
				{site.address}<br />
				{site.hours}<br />
				<a class="hover:text-white" href={site.phoneHref}>{site.phoneDisplay}</a><br />
				<a class="hover:text-white" href="mailto:{site.email}">{site.email}</a>
			</address>
			{#if subscribed}
				<p class="mt-5 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold">
					Thank you — you are on the list. Fresh flower news, once a month.
				</p>
			{:else}
				<form
					class="mt-5"
					onsubmit={(e) => {
						e.preventDefault();
						if (email.trim()) subscribed = true;
					}}
				>
					<label for="newsletter-email" class="text-sm font-semibold text-white/90">
						Join the Bloom Letter
					</label>
					<div class="mt-2 flex overflow-hidden rounded-full bg-white">
						<input
							id="newsletter-email"
							type="email"
							required
							bind:value={email}
							placeholder="Your email"
							class="min-w-0 flex-1 px-4 py-3 text-sm text-ink outline-none"
						/>
						<button
							type="submit"
							class="min-h-12 shrink-0 bg-rose px-5 text-sm font-bold text-white transition-colors duration-200 hover:bg-rose-dark"
						>
							Join
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
	<div
		class="border-t border-white/15 py-5 text-center text-sm text-white/60"
	>
		© 2026 Bloom &amp; Co. All rights reserved. · Mock website — prices and availability are samples.
	</div>
</footer>
