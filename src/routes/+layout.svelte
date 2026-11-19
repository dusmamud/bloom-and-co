<script lang="ts">
	import '@fontsource/playfair-display/400.css';
	import '@fontsource/playfair-display/700.css';
	import '@fontsource/playfair-display/800.css';
	import '@fontsource/great-vibes/400.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '../app.css';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onNavigate } from '$app/navigation';
	import { Phone, ShoppingBag } from '@lucide/svelte';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import WhatsAppIcon from '#lib/components/WhatsAppIcon.svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { site } from '#lib/data/site.ts';

	let { children } = $props();

	// Live same-day countdown (IST, 2pm cutoff). Client-side only — the
	// server render shows the static promise, the effect swaps in the timer.
	// After the cutoff it flips to "tomorrow" automatically; never a fake timer.
	let countdown = $state('Order by 2pm for same-day delivery in Mumbai');
	$effect(() => {
		const tick = () => {
			const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
			const cutoff = new Date(now);
			cutoff.setHours(14, 0, 0, 0);
			if (now >= cutoff) {
				countdown = 'Same-day cutoff passed — order now for delivery tomorrow in Mumbai';
				return;
			}
			const ms = cutoff.getTime() - now.getTime();
			const h = Math.floor(ms / 3_600_000);
			const m = Math.floor((ms % 3_600_000) / 60_000);
			countdown = `Order in the next ${h}h ${String(m).padStart(2, '0')}m for delivery today in Mumbai`;
		};
		tick();
		const id = setInterval(tick, 30_000);
		return () => clearInterval(id);
	});

	// View Transitions between pages (reduced-motion gated, transform/opacity only).
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Florist JSON-LD. No aggregateRating: self-published stars are not
	// allowed in schema (Google, 2026). No FAQPage schema: Google ended
	// FAQ rich results in May 2026.
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Florist',
		name: site.name,
		slogan: site.tagline,
		description:
			'Bloom & Co. — fresh handcrafted bouquets for every occasion, same-day delivery in Mumbai. Roses, lilies, sunflowers, tulips, peonies and orchids.',
		telephone: site.phoneDisplay,
		email: site.email,
		priceRange: '₹₹',
		url: site.url,
		address: {
			'@type': 'PostalAddress',
			streetAddress: '14 Rosewood Lane, Linking Road, Bandra West',
			addressLocality: 'Mumbai',
			addressRegion: 'MH',
			postalCode: '400050',
			addressCountry: 'IN'
		},
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			opens: '08:00',
			closes: '20:00'
		},
		hasMap: 'https://www.google.com/maps/search/Bloom+%26+Co.+Bandra+West+Mumbai',
		geo: { '@type': 'GeoCoordinates', latitude: 19.076, longitude: 72.8777 },
		sameAs: [site.instagram, site.facebook]
	};

	// Smooth scroll (Lenis) + GSAP ScrollTrigger, one rAF loop, reduced-motion gated.
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.registerPlugin(ScrollTrigger);
		const lenis = new Lenis({
			autoRaf: false,
			lerp: 0.1,
			smoothWheel: true,
			syncTouch: false // native inertia on touch devices
		});
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);
		const progress = document.getElementById('scroll-progress');
		if (progress) {
			gsap.to(progress, {
				scaleX: 1,
				ease: 'none',
				scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
			});
		}
		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);
		return () => {
			window.removeEventListener('load', onLoad);
			lenis.destroy();
		};
	});

	// Reveal-on-scroll: transform + opacity only, 300ms, respects reduced motion via CSS.
	$effect(() => {
		const els = document.querySelectorAll('.reveal');
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) e.target.classList.add('is-visible');
			},
			{ threshold: 0.12 }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<svelte:head>
	<title>Bloom &amp; Co. — Say It Better With Flowers</title>
	<meta
		name="description"
		content="Bloom & Co. — fresh handcrafted bouquets for every occasion. Classic Red Roses ₹1,499, Blush Elegance ₹1,199, Sunshine Delight ₹999. Same-day delivery in Mumbai."
	/>
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Bloom & Co. — Say It Better With Flowers" />
	<meta
		property="og:description"
		content="Beautiful blooms for every occasion. Handcrafted with love, delivered with care. Same-day delivery."
	/>
	<meta property="og:url" content={site.url} />
	<meta name="twitter:card" content="summary_large_image" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-leaf focus:px-5 focus:py-3 focus:text-white"
>
	Skip to main content
</a>

<!-- Scroll progress (rose line, transform only) -->
<div
	id="scroll-progress"
	class="fixed top-9 left-0 z-[55] h-[3px] w-full origin-left scale-x-0 bg-rose"
	aria-hidden="true"
></div>

<Header />
<main id="main">{@render children()}</main>
<Footer />

<!-- Live same-day countdown bar -->
<div class="fixed inset-x-0 top-0 z-[58] flex min-h-9 items-center justify-center bg-leaf px-4 py-1.5 text-center text-xs font-bold text-white sm:text-sm" role="status">
	{countdown}
</div>
<div class="h-9" aria-hidden="true"></div>

<!-- Floating WhatsApp (desktop/tablet) -->
<a
	href={site.whatsappHref}
	target="_blank"
	rel="noopener"
	aria-label="Chat with Bloom & Co. on WhatsApp"
	class="fixed right-5 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform duration-200 hover:scale-105 md:flex"
>
	<WhatsAppIcon size={26} />
</a>

<!-- Sticky mobile bottom bar: Call / WhatsApp / Cart -->
<nav
	aria-label="Quick actions"
	class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
>
	<a href={site.phoneHref} class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink">
		<Phone size={20} class="text-leaf" aria-hidden="true" />
		Call
	</a>
	<a
		href={site.whatsappHref}
		target="_blank"
		rel="noopener"
		class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink"
	>
		<span class="text-[#25d366]"><WhatsAppIcon size={20} /></span>
		WhatsApp
	</a>
	<button
		type="button"
		onclick={() => (drawer.open = true)}
		class="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-rose text-sm font-bold text-white"
	>
		<ShoppingBag size={20} aria-hidden="true" />
		Cart{#if cart.count > 0} ({cart.count}){/if}
	</button>
</nav>
<!-- Spacer so the sticky bar never covers footer content on mobile -->
<div class="h-14 lg:hidden" aria-hidden="true"></div>

<CartDrawer bind:open={drawer.open} />
