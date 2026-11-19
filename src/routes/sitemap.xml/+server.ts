import { areas, blogPosts, occasions, products, site } from '#lib/data/site.ts';

export const prerender = true;

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/shop', priority: '0.9', changefreq: 'weekly' },
	{ path: '/occasions', priority: '0.9', changefreq: 'weekly' },
	{ path: '/plants', priority: '0.8', changefreq: 'weekly' },
	{ path: '/hampers', priority: '0.8', changefreq: 'weekly' },
	{ path: '/weddings', priority: '0.8', changefreq: 'monthly' },
	{ path: '/corporate', priority: '0.7', changefreq: 'monthly' },
	{ path: '/sympathy', priority: '0.8', changefreq: 'monthly' },
	{ path: '/blog', priority: '0.8', changefreq: 'weekly' },
	{ path: '/areas', priority: '0.8', changefreq: 'monthly' },
	{ path: '/track-order', priority: '0.7', changefreq: 'monthly' },
	{ path: '/how-it-works', priority: '0.7', changefreq: 'monthly' },
	{ path: '/reminders', priority: '0.6', changefreq: 'monthly' },
	{ path: '/wishlist', priority: '0.5', changefreq: 'monthly' },
	{ path: '/accessibility', priority: '0.4', changefreq: 'yearly' },
	{ path: '/checkout', priority: '0.8', changefreq: 'monthly' },
	{ path: '/subscriptions', priority: '0.8', changefreq: 'monthly' },
	{ path: '/gift-cards', priority: '0.8', changefreq: 'monthly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/delivery', priority: '0.7', changefreq: 'monthly' },
	{ path: '/care', priority: '0.7', changefreq: 'monthly' },
	{ path: '/reviews', priority: '0.7', changefreq: 'weekly' },
	{ path: '/faq', priority: '0.7', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.8', changefreq: 'monthly' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly' }
];

const productPages = products.map((p) => ({
	path: `/shop/${p.id}`,
	priority: '0.8',
	changefreq: 'monthly'
}));

const occasionPages = occasions.map((o) => ({
	path: `/occasions/${o.id}`,
	priority: '0.8',
	changefreq: 'monthly'
}));

const areaPages = areas.map((a) => ({
	path: `/areas/${a.id}`,
	priority: '0.7',
	changefreq: 'monthly'
}));

const blogPages = blogPosts.map((b) => ({
	path: `/blog/${b.slug}`,
	priority: '0.7',
	changefreq: 'monthly'
}));

export function GET() {
	const pages = [...staticPages, ...productPages, ...occasionPages, ...areaPages, ...blogPages];
	const urls = pages.map(
		(p) =>
			`  <url><loc>${site.url}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
	);
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
