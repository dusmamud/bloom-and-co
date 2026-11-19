// Real mock cart state (frontend only — no checkout, no payment).
// Kept in a .svelte.ts module so Header, product cards and /checkout share
// one live cart. Prices in ₹ (Indian context); delivery ₹199, free above ₹999.
// Lines carry size tier, add-ons and the card message — so what the customer
// picks on the product page actually reaches checkout. Persisted to
// localStorage (mock persistence; a refresh no longer empties the cart).
import { addons, deliveryFee, freeDeliveryOver, products, tiersFor } from '#lib/data/site.ts';

export type CartLine = {
	key: string;
	id: string;
	name: string;
	tier: string;
	price: number;
	qty: number;
	addons: string[];
	cardMessage: string;
	deliveryDate: string;
};

const STORAGE_KEY = 'bloom-cart-v1';

function loadLines(): CartLine[] {
	if (typeof window === 'undefined') return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw) as CartLine[];
		return Array.isArray(parsed) ? parsed.filter((l) => l && typeof l.price === 'number') : [];
	} catch {
		return [];
	}
}

function saveLines() {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
	} catch {
		// Storage full or blocked — cart still works in memory.
	}
}

const lines = $state<CartLine[]>(loadLines());

export const cart = {
	get lines() {
		return lines;
	},
	get count() {
		return lines.reduce((a, l) => a + l.qty, 0);
	},
	get subtotal() {
		return lines.reduce((a, l) => a + l.qty * l.price, 0);
	},
	get delivery() {
		if (this.subtotal === 0) return 0;
		return this.subtotal >= freeDeliveryOver ? 0 : deliveryFee;
	},
	get total() {
		return this.subtotal + this.delivery;
	},
	get lastAdded() {
		return lines.length ? lines[lines.length - 1].name : '';
	}
};

export type AddLineInput = {
	id: string;
	tier?: string;
	qty?: number;
	addonIds?: string[];
	cardMessage?: string;
	deliveryDate?: string;
};

export function addLine(input: AddLineInput) {
	const item = products.find((p) => p.id === input.id);
	if (!item) return;
	const tier = tiersFor(item).find((t) => t.name === (input.tier ?? 'Standard')) ?? tiersFor(item)[0];
	const addonNames = (input.addonIds ?? [])
		.map((id) => addons.find((a) => a.id === id))
		.filter((a): a is NonNullable<typeof a> => Boolean(a));
	const unitPrice = tier.price + addonNames.reduce((a, x) => a + x.price, 0);
	const key = [input.id, tier.name, (input.addonIds ?? []).sort().join('+')].join('|');
	const existing = lines.find((l) => l.key === key);
	if (existing) {
		existing.qty += input.qty ?? 1;
		if (input.cardMessage) existing.cardMessage = input.cardMessage;
	} else {
		lines.push({
			key,
			id: item.id,
			name: item.name,
			tier: tier.name,
			price: unitPrice,
			qty: input.qty ?? 1,
			addons: addonNames.map((a) => a.name),
			cardMessage: input.cardMessage ?? '',
			deliveryDate: input.deliveryDate ?? ''
		});
	}
	saveLines();
}

// Back-compat: add the Standard tier of a product, no add-ons.
export function addToOrder(name: string, price: number) {
	const item = products.find((p) => p.name === name);
	if (item) addLine({ id: item.id });
	else {
		const key = `legacy|${name}`;
		const existing = lines.find((l) => l.key === key);
		if (existing) existing.qty += 1;
		else lines.push({ key, id: '', name, tier: 'Standard', price, qty: 1, addons: [], cardMessage: '', deliveryDate: '' });
		saveLines();
	}
}

export function setQty(key: string, qty: number) {
	const line = lines.find((l) => l.key === key);
	if (!line) return;
	if (qty <= 0) lines.splice(lines.indexOf(line), 1);
	else line.qty = qty;
	saveLines();
}

export function removeLine(key: string) {
	const i = lines.findIndex((l) => l.key === key);
	if (i >= 0) lines.splice(i, 1);
	saveLines();
}

export function clearCart() {
	lines.splice(0, lines.length);
	saveLines();
}

export function addProduct(id: string) {
	addLine({ id });
}
