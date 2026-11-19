// Bloom & Co. — ALL mock data lives here. Swap in real data after the client
// approves the design. Prices in ₹ (Indian context, mock data).
export const site = {
	name: 'Bloom & Co.',
	tagline: 'Flowers for a Brighter Tomorrow',
	url: 'https://bloom-and-co.pages.dev',
	phoneDisplay: '+91 98765 43210',
	phoneHref: 'tel:+919876543210',
	email: 'hello@bloomandco.in',
	whatsappHref: 'https://wa.me/919876543210?text=Hi%20Bloom%20%26%20Co.!%20I%27d%20like%20to%20order%20flowers.',
	address: '14 Rosewood Lane, Linking Road, Bandra West, Mumbai 400 050, India',
	hours: 'Mon–Sat 8am–8pm IST · Sun 9am–6pm IST',
	instagram: 'https://www.instagram.com/bloomandco',
	facebook: 'https://www.facebook.com/bloomandco',
	pinterest: 'https://www.pinterest.com/bloomandco'
};

export const money = (n: number) => `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

export type Product = {
	id: string;
	name: string;
	price: number;
	compareAt?: number;
	rating: number;
	reviews: number;
	image: string;
	occasions: string[];
	flowers: string[];
	badge?: string;
	blurb: string;
	description: string;
	stems: string;
	size: string;
	vase: string;
};

export const products: Product[] = [
	{
		id: 'classic-red-roses',
		name: 'Classic Red Roses',
		price: 1499,
		compareAt: 1799,
		rating: 4.9,
		reviews: 124,
		image: 'product-red-roses',
		occasions: ['love', 'anniversary', 'birthday'],
		flowers: ['Red Roses'],
		badge: 'Bestseller',
		blurb: 'A dozen deep-red roses, hand-tied and wrapped in black paper with a red ribbon.',
		description:
			'Our signature dozen. Long-stemmed deep-red roses are hand-selected each morning, trimmed to a uniform length, and tied with a satin ribbon. A timeless way to say “I love you” — or “I’m sorry, and I mean it.”',
		stems: '12 long-stem red roses',
		size: 'Standard · 12 stems',
		vase: 'Optional glass vase +₹349'
	},
	{
		id: 'blush-elegance',
		name: 'Blush Elegance',
		price: 1199,
		rating: 4.8,
		reviews: 98,
		image: 'product-blush-elegance',
		occasions: ['anniversary', 'love', 'congratulations'],
		flowers: ['Pink Roses', 'Lilies'],
		badge: 'Bestseller',
		blurb: 'Soft pink roses and lilac lilies in lavender wrap — gentle, graceful, unforgettable.',
		description:
			'Blush pink roses meet fragrant lilac lilies in a bouquet that feels like a slow Sunday morning. Wrapped in lavender paper and finished with a silk ribbon, it suits anniversaries, thank-yous, and “just because” days alike.',
		stems: '10 pink roses + 3 lilac lilies',
		size: 'Standard · 13 stems',
		vase: 'Optional ceramic vase +₹399'
	},
	{
		id: 'sunshine-delight',
		name: 'Sunshine Delight',
		price: 999,
		rating: 4.9,
		reviews: 76,
		image: 'product-sunshine',
		occasions: ['birthday', 'congratulations', 'just-because'],
		flowers: ['Sunflowers'],
		badge: 'Bestseller',
		blurb: 'Bright sunflowers in kraft paper — instant sunshine for any room, any day.',
		description:
			'Seven golden sunflowers with eucalyptus sprigs, wrapped in kraft paper and tied with twine. It is our happiest bouquet: bold, sunny, and impossible to ignore. Perfect for birthdays, new jobs, and cheering someone up.',
		stems: '7 sunflowers + eucalyptus',
		size: 'Standard · 7 stems',
		vase: 'Optional mason jar vase +₹299'
	},
	{
		id: 'tulip-bliss',
		name: 'Tulip Bliss',
		price: 899,
		rating: 4.7,
		reviews: 54,
		image: 'product-tulip-bliss',
		occasions: ['birthday', 'just-because', 'congratulations'],
		flowers: ['Tulips'],
		blurb: 'Pink and white tulips in blush wrap — fresh, light, and spring-bright.',
		description:
			'Fifteen pink and white tulips, cut at the perfect moment so they open slowly over a week in the vase. Light, fresh, and cheerful — the spring bouquet that works all year round.',
		stems: '15 pink + white tulips',
		size: 'Standard · 15 stems',
		vase: 'Optional glass vase +₹349'
	},
	{
		id: 'lavender-dreams',
		name: 'Lavender Dreams',
		price: 1299,
		rating: 4.8,
		reviews: 63,
		image: 'product-lavender-dreams',
		occasions: ['sympathy', 'anniversary', 'just-because'],
		flowers: ['Lavender', 'White Roses'],
		blurb: 'Fragrant lavender with white roses — calm, soothing, and beautifully scented.',
		description:
			'French lavender and white roses, gathered with dusty miller and wrapped in soft grey-lilac paper. The scent alone is worth it. A gentle choice for sympathy, rest, and quiet celebrations.',
		stems: '8 white roses + lavender bunches',
		size: 'Standard · 12 stems',
		vase: 'Optional ceramic vase +₹399'
	},
	{
		id: 'peony-cloud',
		name: 'Peony Cloud',
		price: 1799,
		compareAt: 2099,
		rating: 5.0,
		reviews: 41,
		image: 'product-peony-cloud',
		occasions: ['anniversary', 'love', 'congratulations'],
		flowers: ['Peonies'],
		badge: 'Limited season',
		blurb: 'Cloud-soft pink peonies in cream wrap — the bouquet everyone asks about.',
		description:
			'Peonies only bloom for a few precious weeks, and we chase them every year. Nine blush peonies, barely open, wrapped in cream paper. Order early in the season — when they are gone, they are gone until next spring.',
		stems: '9 blush peonies',
		size: 'Standard · 9 stems',
		vase: 'Optional ceramic vase +₹399'
	},
	{
		id: 'orchid-grace',
		name: 'Orchid Grace',
		price: 1949,
		rating: 4.9,
		reviews: 88,
		image: 'product-orchid-grace',
		occasions: ['congratulations', 'sympathy', 'just-because'],
		flowers: ['Orchids'],
		badge: 'Long-lasting',
		blurb: 'A white phalaenopsis orchid in a ceramic pot — months of blooms, zero fuss.',
		description:
			'A double-stem white phalaenopsis orchid potted in a hand-glazed ceramic pot. With a little light and a weekly ice cube, it blooms for two to three months. The gift for people who say they kill plants.',
		stems: 'Double-stem orchid plant',
		size: 'Plant · ceramic pot included',
		vase: 'Pot included'
	},
	{
		id: 'birthday-burst',
		name: 'Birthday Burst',
		price: 1199,
		rating: 4.8,
		reviews: 112,
		image: 'occasion-birthday',
		occasions: ['birthday'],
		flowers: ['Red Roses', 'Mixed'],
		blurb: 'A joyful burst of red roses and seasonal blooms — the birthday classic.',
		description:
			'Red roses, pink carnations and seasonal fillers in a celebratory mix, wrapped in blush paper with a gift tag. Add a birthday card at checkout and we will hand-write your message.',
		stems: '12 mixed stems',
		size: 'Standard · 12 stems',
		vase: 'Optional glass vase +₹349'
	},
	{
		id: 'white-lily-serenity',
		name: 'White Lily Serenity',
		price: 1299,
		rating: 4.9,
		reviews: 67,
		image: 'occasion-congratulations',
		occasions: ['congratulations', 'sympathy'],
		flowers: ['White Lilies'],
		blurb: 'Pure white lilies — elegant for congratulations, gentle for sympathy.',
		description:
			'Six white oriental lilies with soft greenery, wrapped in white paper. Fragrant, serene, and dignified — the arrangement our florists reach for when the moment matters most.',
		stems: '6 white lilies',
		size: 'Standard · 6 stems',
		vase: 'Optional glass vase +₹349'
	},
	{
		id: 'pastel-surprise',
		name: 'Pastel Surprise',
		price: 1099,
		rating: 4.7,
		reviews: 49,
		image: 'occasion-just-because',
		occasions: ['just-because', 'birthday'],
		flowers: ['Mixed Pastel'],
		blurb: 'A cheerful mix of pastel blooms in a glass vase — no reason needed.',
		description:
			'Our florist’s choice of the freshest pastel blooms of the day — pinks, peaches and creams — arranged in a clear glass vase, ready to drop on a desk or a dining table.',
		stems: 'Florist’s choice · 14 stems',
		size: 'Standard · vase included',
		vase: 'Glass vase included'
	},
	{
		id: 'pink-romance',
		name: 'Pink Romance',
		price: 1649,
		rating: 4.9,
		reviews: 93,
		image: 'occasion-love',
		occasions: ['love', 'anniversary'],
		flowers: ['Pink Roses'],
		blurb: 'Deep-pink roses with baby’s breath — romance, without the cliché.',
		description:
			'A dozen deep-pink roses with clouds of baby’s breath, wrapped in soft pink paper. It says everything the red ones say, just a little softer — and with a little more personality.',
		stems: '12 deep-pink roses',
		size: 'Standard · 12 stems',
		vase: 'Optional glass vase +₹349'
	},
	{
		id: 'sympathy-bloom',
		name: 'Sympathy Bloom',
		price: 1399,
		rating: 5.0,
		reviews: 38,
		image: 'occasion-sympathy',
		occasions: ['sympathy'],
		flowers: ['White Lilies', 'Chrysanthemums'],
		blurb: 'White lilies and chrysanthemums — a quiet, respectful tribute.',
		description:
			'White lilies and chrysanthemums arranged with soft greenery in a low, gentle bouquet. Delivered with care and a blank card for your own words. Our team handles sympathy orders with extra attention.',
		stems: '8 white lilies + chrysanthemums',
		size: 'Standard · 12 stems',
		vase: 'Optional glass vase +₹349'
	}
];

export type Occasion = {
	id: string;
	name: string;
	tagline: string;
	image: string;
	description: string;
};

export const occasions: Occasion[] = [
	{
		id: 'birthday',
		name: 'Birthday',
		tagline: 'Make their day bloom',
		image: 'occasion-birthday',
		description:
			'Bright, joyful bouquets that arrive like a party. Add a hand-written card and a balloon at checkout.'
	},
	{
		id: 'anniversary',
		name: 'Anniversary',
		tagline: 'Years together, still blooming',
		image: 'occasion-anniversary',
		description:
			'Romantic roses, lilies and peonies for the day you said yes — whether it is year one or year fifty.'
	},
	{
		id: 'congratulations',
		name: 'Congratulations',
		tagline: 'Cheers to the big win',
		image: 'occasion-congratulations',
		description:
			'Fresh white lilies and sunny mixes for promotions, graduations, new homes and new babies.'
	},
	{
		id: 'love',
		name: 'Love & Romance',
		tagline: 'Say it without words',
		image: 'occasion-love',
		description:
			'Classic reds and soft pinks, hand-tied by our florists. The bouquet that never needs explaining.'
	},
	{
		id: 'sympathy',
		name: 'Sympathy',
		tagline: 'With love and condolences',
		image: 'occasion-sympathy',
		description:
			'Peaceful white arrangements delivered with care and discretion, with a blank card for your words.'
	},
	{
		id: 'just-because',
		name: 'Just Because',
		tagline: 'No reason needed',
		image: 'occasion-just-because',
		description:
			'The best reason to send flowers is no reason at all. Surprise someone today — including yourself.'
	}
];

export type Testimonial = { name: string; occasion: string; rating: number; text: string };

export const testimonials: Testimonial[] = [
	{
		name: 'Sarah Mitchell',
		occasion: 'Anniversary',
		rating: 5,
		text: 'Ordered the Blush Elegance for our tenth anniversary and my husband actually teared up. The lilies were still opening a week later. This is our florist now.'
	},
	{
		name: 'James Carter',
		occasion: 'Birthday',
		rating: 5,
		text: 'Same-day delivery saved me — ordered at 11am, flowers at my mum’s door by 3pm, and she called me crying happy tears. The card was hand-written, exactly as I wrote it.'
	},
	{
		name: 'Emily Rodriguez',
		occasion: 'Just Because',
		rating: 5,
		text: 'I send myself the subscription box every month now. The peonies in May were unreal. It is the one treat I never cancel.'
	},
	{
		name: 'David Kim',
		occasion: 'Congratulations',
		rating: 4.5,
		text: 'Sent Sunshine Delight to a colleague who got promoted. Bright, fresh, and the kraft wrapping looked far more expensive than the price. Will order again.'
	},
	{
		name: 'Laura Bennett',
		occasion: 'Sympathy',
		rating: 5,
		text: 'They handled a sympathy order with such gentleness — called to confirm the delivery time, no fuss, beautiful white lilies. Thank you for making a hard day softer.'
	},
	{
		name: 'Michael Thompson',
		occasion: 'Love & Romance',
		rating: 5,
		text: 'The Classic Red Roses are the real deal — long stems, deep colour, and they lasted twelve days. My wife has already told me what to order next month.'
	}
];

export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
	{
		q: 'How does same-day delivery work?',
		a: 'Order by 2pm and we will deliver the same day, seven days a week, within Mumbai city limits. Orders after 2pm go out first thing the next morning. You will get a text when your flowers leave the shop and another when they arrive.'
	},
	{
		q: 'How long will my bouquet last?',
		a: 'Most bouquets last 7–10 days with fresh water and a trim every couple of days. Orchid plants bloom for 2–3 months. Every order includes a care card, and our flower care guide has the full routine.'
	},
	{
		q: 'Can I add a card message?',
		a: 'Yes — every bouquet includes a free hand-written card. Write your message at checkout and our florists will copy it by hand onto our signature gift tag.'
	},
	{
		q: 'Do you deliver outside Mumbai?',
		a: 'We deliver across Mumbai — Bandra, Andheri, Juhu, South Mumbai, Powai and beyond. Same-day delivery covers Bandra West and nearby areas; the rest of Mumbai is same-day or next-day depending on distance. If you are further away, write to us and we will arrange a trusted partner florist.'
	},
	{
		q: 'What if the recipient is not home?',
		a: 'Our courier will call the recipient first. If nobody answers, we leave the flowers in a safe shaded spot and send a photo by text — or bring them back to the shop for a free re-delivery the same day.'
	},
	{
		q: 'Can I change or cancel my order?',
		a: 'You can change the delivery date, address or message up to 2 hours before the scheduled delivery — just call or WhatsApp us. Cancellations before the bouquet is made are refunded in full.'
	},
	{
		q: 'Are your flowers sustainably sourced?',
		a: 'Yes. We buy from local Maharashtra growers and flower markets whenever the season allows, and our imported stems come from Rainforest Alliance certified farms. Our wrapping paper is recycled and compostable.'
	}
];

export type Plan = {
	id: string;
	name: string;
	price: number;
	per: string;
	image: string;
	blurb: string;
	features: string[];
};

export const plans: Plan[] = [
	{
		id: 'petal',
		name: 'Petal',
		price: 899,
		per: 'per month',
		image: 'product-tulip-bliss',
		blurb: 'A small seasonal bouquet, every month.',
		features: ['1 seasonal bouquet monthly', 'Free delivery', 'Pause or skip anytime', 'Care card included']
	},
	{
		id: 'bloom',
		name: 'Bloom',
		price: 1499,
		per: 'per month',
		image: 'product-blush-elegance',
		blurb: 'Our most loved subscription — a full bouquet monthly.',
		features: [
			'1 signature bouquet monthly',
			'Free delivery + vase on first box',
			'Early access to peony season',
			'Pause or skip anytime'
		]
	},
	{
		id: 'grand',
		name: 'Grand Bloom',
		price: 2699,
		per: 'per month',
		image: 'product-peony-cloud',
		blurb: 'A show-stopping arrangement, twice a month.',
		features: [
			'2 premium arrangements monthly',
			'Free delivery + ceramic vase',
			'Florist’s choice of rare stems',
			'Birthday month bonus bouquet'
		]
	}
];

export type GiftCard = { amount: number; blurb: string };

export const giftCards: GiftCard[] = [
	{ amount: 500, blurb: 'A small hello' },
	{ amount: 1000, blurb: 'The classic gift' },
	{ amount: 2000, blurb: 'A generous bouquet' },
	{ amount: 3000, blurb: 'Something truly special' },
	{ amount: 5000, blurb: 'The grand gesture' }
];

export const heroProduct = products[0];
export const bestsellers = products.slice(0, 3);
export const freeDeliveryOver = 999;
export const deliveryFee = 199;
export const sameDayCutoff = '2pm';
