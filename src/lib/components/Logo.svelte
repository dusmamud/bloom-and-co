<script lang="ts">
	// Bloom & Co. logo — hand-drawn flower mark (SVG, currentColor) + wordmark.
	let { size = 40 }: { size?: number } = $props();
</script>

<a href="/" class="flex shrink-0 items-center gap-2.5" aria-label="Bloom & Co. — home">
	<svg
		width={size}
		height={size}
		viewBox="0 0 48 48"
		fill="none"
		aria-hidden="true"
		class="shrink-0 text-rose"
	>
		<g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path
				d="M24 8c2.5 3.5 2.5 7 0 10.5C21.5 15 21.5 11.5 24 8Z"
				fill="#fbe3e8"
			/>
			<path
				d="M36 14c.5 4.3-1.3 7.4-5 9.3.3-4.3-1.5-7.4-5-9.3 3.5-1.5 7.5-.7 10 0Z"
				fill="#fbe3e8"
			/>
			<path
				d="M38 28c-2.5 3.5-6 4.3-9.7 3 .6-4.3-.7-7.4-3.3-9.7 3.9.3 7.5 1.9 13 6.7Z"
				fill="#fbe3e8"
			/>
			<path
				d="M24 42c-2.5-3.5-2.5-7 0-10.5 2.5 3.5 2.5 7 0 10.5Z"
				fill="#fbe3e8"
			/>
			<path
				d="M10 28c2.5-3.5 6-4.3 9.7-3-.6 4.3.7 7.4 3.3 9.7-3.9-.3-7.5-1.9-13-6.7Z"
				fill="#fbe3e8"
			/>
			<path
				d="M12 14c-.5 4.3 1.3 7.4 5 9.3-.3-4.3 1.5-7.4 5-9.3-3.5-1.5-7.5-.7-10 0Z"
				fill="#fbe3e8"
			/>
		</g>
		<circle cx="24" cy="24" r="3.4" fill="#e85a7a" />
		<path d="M24 27.5c0 5-1.5 8.5-4.5 11" stroke="#1e4636" stroke-width="2" stroke-linecap="round" />
	</svg>
	<span class="leading-none">
		<span class="block font-display text-[1.4rem] font-bold tracking-tight text-leaf sm:text-[1.65rem]"
			>Bloom &amp; Co.</span
		>
		<span
			class="mt-1 hidden text-[0.6rem] font-semibold tracking-[0.22em] text-muted uppercase sm:block"
			>Flowers for a brighter tomorrow</span
		>
	</span>
</a>
