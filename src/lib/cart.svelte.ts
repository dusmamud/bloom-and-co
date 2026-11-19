// Real mock cart state (frontend only — no checkout, no payment).
// Kept in a .svelte.ts module so Header, product cards and /checkout share
// one live cart. Prices in ₹ (Indian context); delivery ₹199, free above ₹999.
import { deliveryFee, freeDeliveryOver, products } from '#lib/data/site.ts';

export type CartLine = { name: string; price: number; qty: number };

const lines = $state<CartLine[]>([]);

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

export function addToOrder(name: string, price: number) {
	const line = lines.find((l) => l.name === name);
	if (line) line.qty += 1;
	else lines.push({ name, price, qty: 1 });
}

export function setQty(name: string, qty: number) {
	const line = lines.find((l) => l.name === name);
	if (!line) return;
	if (qty <= 0) lines.splice(lines.indexOf(line), 1);
	else line.qty = qty;
}

export function removeLine(name: string) {
	const i = lines.findIndex((l) => l.name === name);
	if (i >= 0) lines.splice(i, 1);
}

export function clearCart() {
	lines.splice(0, lines.length);
}

export function addProduct(id: string) {
	const item = products.find((p) => p.id === id);
	if (item) addToOrder(item.name, item.price);
}
