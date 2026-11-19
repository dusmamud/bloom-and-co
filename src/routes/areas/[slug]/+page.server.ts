import { error } from '@sveltejs/kit';
import { areas, products } from '#lib/data/site.ts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export function entries() {
	return areas.map((a) => ({ slug: a.id }));
}

export const load: PageServerLoad = ({ params }) => {
	const area = areas.find((a) => a.id === params.slug);
	if (!area) error(404, 'Area not found');
	const picks = products.slice(0, 3);
	return { area, picks };
};
