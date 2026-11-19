<script lang="ts">
	import { Clock, MapPin, PackageCheck, Truck } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { deliveryZones, money } from '#lib/data/site.ts';

	const steps = [
		{ icon: Clock, title: 'Order by 2pm', text: 'Same-day delivery, seven days a week. After 2pm, your bouquet goes out first thing tomorrow.' },
		{ icon: Truck, title: 'Our own couriers', text: 'Flowers travel upright in water, never flat in a van. No gig drivers, no crushed petals.' },
		{ icon: PackageCheck, title: 'We call first', text: 'The courier calls the recipient before arriving. If nobody answers, we leave the flowers safe and send a photo by text.' },
		{ icon: MapPin, title: 'Track every step', text: 'A text when your bouquet leaves the shop, and another when it arrives.' }
	];
</script>

<PageHero
	eyebrow="Delivery Information"
	title="Same-Day Delivery, Done Properly"
	subtitle="Because special moments can't wait. Order by 2pm and your bouquet is at their door today."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each steps as s}
			<div class="rounded-3xl bg-blush p-6">
				<s.icon size={30} class="text-rose" aria-hidden="true" />
				<h2 class="mt-4 font-display text-xl font-bold text-ink">{s.title}</h2>
				<p class="mt-2 leading-relaxed text-muted">{s.text}</p>
			</div>
		{/each}
	</div>

	<h2 class="mt-14 font-display text-3xl font-bold text-leaf">Delivery zones &amp; fees</h2>
	<p class="mt-2 text-muted">Same fees as the PIN checker on the home page — no surprises at checkout. Free delivery on all orders over ₹999.</p>
	<div class="mt-6 overflow-x-auto rounded-3xl ring-1 ring-line">
		<table class="w-full min-w-[560px] bg-white text-left">
			<thead>
				<tr class="bg-blush text-sm font-bold text-ink">
					<th class="px-5 py-4">Area</th>
					<th class="px-5 py-4">Same-day cutoff</th>
					<th class="px-5 py-4">Fee</th>
					<th class="px-5 py-4">Note</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-line">
				{#each deliveryZones as z}
					<tr>
						<td class="px-5 py-4 font-semibold text-ink">{z.area}</td>
						<td class="px-5 py-4 text-muted">{z.cutoff}</td>
						<td class="px-5 py-4 text-muted">{z.fee === 0 ? 'Free' : money(z.fee)}</td>
						<td class="px-5 py-4 text-muted">{z.note}</td>
					</tr>
				{/each}
				<tr>
					<td class="px-5 py-4 font-semibold text-ink">Outside Mumbai</td>
					<td class="px-5 py-4 text-muted">—</td>
					<td class="px-5 py-4 text-muted">From ₹399</td>
					<td class="px-5 py-4 text-muted">Via a trusted partner florist</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="mt-10 grid gap-5 lg:grid-cols-2">
		<div class="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-bold text-leaf">If nobody is home</h2>
			<p class="mt-3 leading-relaxed text-muted">
				We call the recipient first. If there is no answer, we leave the bouquet in a safe shaded spot and send a
				photo by text — or bring it back to the shop for a free re-delivery the same day. Flowers are never left
				in direct sun or rain.
			</p>
		</div>
		<div class="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-bold text-leaf">Need it at a specific time?</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Choose a morning, afternoon or evening slot at checkout. For weddings and events, call us at +91 98765 43210
				and we will plan the delivery around your schedule.
			</p>
		</div>
	</div>
</section>
