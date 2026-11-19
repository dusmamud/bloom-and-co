<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Accessibility — Bloom &amp; Co.</title>
	<meta name="description" content="Bloom & Co. accessibility statement — our WCAG 2.2 AA commitment, keyboard and screen-reader support, and how to reach us for help." />
</svelte:head>

<PageHero
	eyebrow="Accessibility"
	title="Flowers for Everyone"
	subtitle="We aim for WCAG 2.2 AA across this website, so everyone can order flowers with confidence — by keyboard, screen reader, or phone call."
/>

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
	<div class="space-y-8 leading-relaxed text-muted">
		<div>
			<h2 class="font-display text-2xl font-bold text-leaf">Our commitment</h2>
			<p class="mt-2">
				Bloom &amp; Co. is committed to making our website usable by everyone, including people using keyboards, screen
				readers, and other assistive technology. Our target is WCAG 2.2 AA: text contrast of at least 4.5:1, tap targets of
				at least 44×44 pixels, visible focus indicators, and labelled form fields throughout.
			</p>
		</div>
		<div>
			<h2 class="font-display text-2xl font-bold text-leaf">What we do</h2>
			<ul class="mt-2 list-disc space-y-1.5 pl-5">
				<li>Every image has alt text describing the arrangement — what it is, its main colours and its size.</li>
				<li>Size options, delivery dates and add-ons are real radio groups and checkboxes, not picture tiles — so screen readers announce the name and price of each choice.</li>
				<li>The delivery date picker works by keyboard as well as touch, and closed or full days are named in text, not shown only in grey.</li>
				<li>Animations use only transform and opacity, last 300ms at most, and switch off entirely when your system asks for reduced motion.</li>
				<li>Body text is at least 16px, and the site works at 320px wide with no horizontal scrolling.</li>
			</ul>
		</div>
		<div>
			<h2 class="font-display text-2xl font-bold text-leaf">Prefer to talk?</h2>
			<p class="mt-2">
				You can order entirely by phone or WhatsApp — no website needed. Call us on
				<a href={site.phoneHref} class="font-bold text-leaf">{site.phoneDisplay}</a> ({site.hours}) or write to
				<a href="mailto:{site.email}" class="font-bold text-leaf"> {site.email}</a>. Tell us the occasion, the budget and
				the delivery address, and we will take care of the rest.
			</p>
		</div>
		<div>
			<h2 class="font-display text-2xl font-bold text-leaf">Found a barrier?</h2>
			<p class="mt-2">
				If something on this site is hard to use, please tell us — email
				<a href="mailto:{site.email}" class="font-bold text-leaf">{site.email}</a> with the page and the problem, and we
				will fix it and reply within two working days.
			</p>
		</div>
	</div>
</section>
