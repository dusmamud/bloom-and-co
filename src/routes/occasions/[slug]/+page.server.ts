import { error } from '@sveltejs/kit';
import { occasions, products } from '#lib/data/site.ts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export function entries() {
	return occasions.map((o) => ({ slug: o.id }));
}

export const load: PageServerLoad = ({ params }) => {
	const occasion = occasions.find((o) => o.id === params.slug);
	if (!occasion) error(404, 'Occasion not found');
	const items = products.filter((p) => p.occasions.includes(occasion.id));
	return { occasion, items };
};
