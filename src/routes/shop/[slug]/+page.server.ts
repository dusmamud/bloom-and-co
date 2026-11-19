import { error } from '@sveltejs/kit';
import { products } from '#lib/data/site.ts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export function entries() {
	return products.map((p) => ({ slug: p.id }));
}

export const load: PageServerLoad = ({ params }) => {
	const product = products.find((p) => p.id === params.slug);
	if (!product) error(404, 'Bouquet not found');
	const related = products
		.filter((p) => p.id !== product.id && p.occasions.some((o) => product.occasions.includes(o)))
		.slice(0, 3);
	return { product, related };
};
