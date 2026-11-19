// Shared wishlist (save-for-later hearts). Persisted to localStorage so a
// saved bouquet survives navigation and refresh. Mock only.
import { products } from '#lib/data/site.ts';

const STORAGE_KEY = 'bloom-wishlist-v1';

function loadIds(): string[] {
	if (typeof window === 'undefined') return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw) as string[];
		return Array.isArray(parsed) ? parsed.filter((id) => products.some((p) => p.id === id)) : [];
	} catch {
		return [];
	}
}

function saveIds() {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
	} catch {
		// Storage blocked — wishlist still works in memory.
	}
}

const ids = $state<string[]>(loadIds());

export const wishlist = {
	get ids() {
		return ids;
	},
	get count() {
		return ids.length;
	},
	get items() {
		return ids.map((id) => products.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p));
	},
	has(id: string) {
		return ids.includes(id);
	}
};

export function toggleWish(id: string) {
	const i = ids.indexOf(id);
	if (i >= 0) ids.splice(i, 1);
	else ids.push(id);
	saveIds();
}

export function removeWish(id: string) {
	const i = ids.indexOf(id);
	if (i >= 0) ids.splice(i, 1);
	saveIds();
}
