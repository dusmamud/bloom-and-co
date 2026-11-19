<script lang="ts">
	import { Menu, Search, ShoppingBag, User, X } from '@lucide/svelte';
	import Logo from '#lib/components/Logo.svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { page } from '$app/state';

	let menuOpen = $state(false);

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/shop', label: 'Shop' },
		{ href: '/occasions', label: 'Occasions' },
		{ href: '/subscriptions', label: 'Subscriptions' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<header class="sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur">
	<div class="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
		<Logo />
		<nav aria-label="Main" class="hidden items-center gap-7 lg:flex">
			{#each links as link}
				<a
					href={link.href}
					aria-current={isActive(link.href) ? 'page' : undefined}
					class="text-[0.95rem] font-semibold transition-colors duration-200 {isActive(link.href)
						? 'text-rose-dark'
						: 'text-ink hover:text-rose-dark'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>
		<div class="flex items-center gap-1 sm:gap-2">
			<a
				href="/shop"
				aria-label="Search flowers"
				class="hidden h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-blush hover:text-rose-dark sm:flex"
			>
				<Search size={21} aria-hidden="true" />
			</a>
			<a
				href="/faq"
				aria-label="Help and account"
				class="hidden h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-blush hover:text-rose-dark sm:flex"
			>
				<User size={21} aria-hidden="true" />
			</a>
			<button
				type="button"
				onclick={() => (drawer.open = true)}
				aria-label={`Open your cart, ${cart.count} items`}
				class="relative flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-blush hover:text-rose-dark"
			>
				<ShoppingBag size={21} aria-hidden="true" />
				{#if cart.count > 0}
					<span
						class="absolute top-0.5 right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose px-1 text-[0.7rem] font-bold text-white"
					>
						{cart.count}
					</span>
				{/if}
			</button>
			<button
				type="button"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				class="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-blush lg:hidden"
			>
				{#if menuOpen}<X size={22} aria-hidden="true" />{:else}<Menu size={22} aria-hidden="true" />{/if}
			</button>
		</div>
	</div>
	{#if menuOpen}
		<nav aria-label="Mobile" class="border-t border-line bg-white px-4 py-3 lg:hidden">
			{#each links as link}
				<a
					href={link.href}
					onclick={() => (menuOpen = false)}
					class="flex min-h-12 items-center border-b border-line/60 text-base font-semibold text-ink last:border-0 {isActive(
						link.href
					)
						? 'text-rose-dark'
						: ''}"
				>
					{link.label}
				</a>
			{/each}
			<a
				href="/checkout"
				onclick={() => (menuOpen = false)}
				class="mt-3 flex min-h-12 items-center justify-center rounded-full bg-rose text-base font-bold text-white"
			>
				Checkout{#if cart.count > 0} · {cart.count} item{cart.count === 1 ? '' : 's'}{/if}
			</a>
		</nav>
	{/if}
</header>
