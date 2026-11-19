// Bloom & Co. — ALL mock data lives here. Swap in real data after the client
// approves the design. Prices in ₹ (Indian context, mock data).
export const site = {
	name: 'Bloom & Co.',
	tagline: 'Flowers for a Brighter Tomorrow',
	url: 'https://bloom-and-co-bfk.pages.dev',
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
	stemsCount: number;
	size: string;
	vase: string;
	category: 'bouquet' | 'plant' | 'hamper';
	vaseLife: string;
	tierLabels?: [string, string, string];
	tierStems?: [string, string, string];
};

export type Tier = { name: string; price: number; stems: string };

// Size tiers: Standard (base price), Deluxe (+40%), Premium (+80%).
// Stem counts scale 1x / 1.5x / 2x unless the product overrides tierStems.
export function tiersFor(p: Product): Tier[] {
	const labels = p.tierLabels ?? ['Standard', 'Deluxe', 'Premium'];
	const round10 = (n: number) => Math.round(n / 10) * 10;
	const prices = [p.price, round10(p.price * 1.4), round10(p.price * 1.8)];
	const stems = p.tierStems ?? [
		p.stems,
		`${Math.round(p.stemsCount * 1.5)} stems — fuller bunch`,
		`${p.stemsCount * 2} stems — grandest bunch`
	];
	return labels.map((name, i) => ({ name, price: prices[i], stems: stems[i] }));
}

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
		stemsCount: 12,
		size: 'Standard · 12 stems',
		vase: 'Optional glass vase +₹349',
		category: 'bouquet',
		vaseLife: '7–10 days'
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
		stemsCount: 13,
		size: 'Standard · 13 stems',
		vase: 'Optional ceramic vase +₹399',
		category: 'bouquet',
		vaseLife: '7–10 days'
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
		stemsCount: 7,
		size: 'Standard · 7 stems',
		vase: 'Optional mason jar vase +₹299',
		category: 'bouquet',
		vaseLife: '7–10 days'
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
		stemsCount: 15,
		size: 'Standard · 15 stems',
		vase: 'Optional glass vase +₹349',
		category: 'bouquet',
		vaseLife: '5–7 days'
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
		stemsCount: 12,
		size: 'Standard · 12 stems',
		vase: 'Optional ceramic vase +₹399',
		category: 'bouquet',
		vaseLife: '7–10 days'
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
		stemsCount: 9,
		size: 'Standard · 9 stems',
		vase: 'Optional ceramic vase +₹399',
		category: 'bouquet',
		vaseLife: '5–7 days'
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
		stemsCount: 2,
		size: 'Plant · ceramic pot included',
		vase: 'Pot included',
		category: 'plant',
		vaseLife: '2–3 months',
		tierLabels: ['Single', 'Double', 'Triple'],
		tierStems: ['Single stem · 6-inch pot', 'Double stem · 8-inch pot', 'Triple stem · 10-inch pot']
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
		stemsCount: 12,
		size: 'Standard · 12 stems',
		vase: 'Optional glass vase +₹349',
		category: 'bouquet',
		vaseLife: '7–10 days'
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
		stemsCount: 6,
		size: 'Standard · 6 stems',
		vase: 'Optional glass vase +₹349',
		category: 'bouquet',
		vaseLife: '7–10 days'
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
		stemsCount: 14,
		size: 'Standard · vase included',
		vase: 'Glass vase included',
		category: 'bouquet',
		vaseLife: '7–10 days'
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
		stemsCount: 12,
		size: 'Standard · 12 stems',
		vase: 'Optional glass vase +₹349',
		category: 'bouquet',
		vaseLife: '7–10 days'
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
		stemsCount: 12,
		size: 'Standard · 12 stems',
		vase: 'Optional glass vase +₹349',
		category: 'bouquet',
		vaseLife: '7–10 days'
	},
	// --- Round-2 additions: plants & hampers ---
	{
		id: 'monstera-deliciosa',
		name: 'Monstera Deliciosa',
		price: 1299,
		rating: 4.8,
		reviews: 57,
		image: 'plant-monstera',
		occasions: ['congratulations', 'just-because'],
		flowers: ['Monstera'],
		badge: 'Pet-friendly pick',
		blurb: 'A lush monstera in a white ceramic pot — the houseplant everyone wants.',
		description:
			'A healthy monstera deliciosa with split leaves, potted in a white ceramic pot with drainage. Loves bright indirect light and a weekly water. Our most gifted plant for new homes and new offices.',
		stems: '1 potted monstera plant',
		stemsCount: 1,
		size: 'Plant · ceramic pot included',
		vase: 'Pot included',
		category: 'plant',
		vaseLife: 'Years, with care',
		tierLabels: ['Small', 'Medium', 'Large'],
		tierStems: ['6-inch pot', '8-inch pot', '10-inch pot']
	},
	{
		id: 'snake-plant',
		name: 'Snake Plant',
		price: 899,
		rating: 4.9,
		reviews: 74,
		image: 'plant-snake',
		occasions: ['congratulations', 'just-because'],
		flowers: ['Snake Plant'],
		blurb: 'A sculptural snake plant in terracotta — nearly impossible to kill.',
		description:
			'Sansevieria in a classic terracotta pot. It tolerates low light, forgetful watering and Mumbai summers, and it purifies the air while it is at it. The plant for people who say they kill plants.',
		stems: '1 potted snake plant',
		stemsCount: 1,
		size: 'Plant · terracotta pot included',
		vase: 'Pot included',
		category: 'plant',
		vaseLife: 'Years, with care',
		tierLabels: ['Small', 'Medium', 'Large'],
		tierStems: ['6-inch pot', '8-inch pot', '10-inch pot']
	},
	{
		id: 'money-plant',
		name: 'Money Plant',
		price: 699,
		rating: 4.8,
		reviews: 91,
		image: 'plant-money',
		occasions: ['congratulations', 'just-because'],
		flowers: ['Money Plant'],
		blurb: 'A trailing money plant in ceramic — good luck, in a pot.',
		description:
			'A lush pothos with trailing vines in a hand-glazed ceramic pot. Grows happily in water or soil, in sunlight or shade — and, as every Indian grandmother will tell you, it brings good fortune to the home.',
		stems: '1 potted money plant',
		stemsCount: 1,
		size: 'Plant · ceramic pot included',
		vase: 'Pot included',
		category: 'plant',
		vaseLife: 'Years, with care',
		tierLabels: ['Small', 'Medium', 'Large'],
		tierStems: ['6-inch pot', '8-inch pot', '10-inch pot']
	},
	{
		id: 'roses-chocolate-hamper',
		name: 'Roses & Chocolates Hamper',
		price: 2499,
		compareAt: 2799,
		rating: 4.9,
		reviews: 66,
		image: 'hamper-roses-chocolate',
		occasions: ['love', 'anniversary', 'birthday'],
		flowers: ['Red Roses'],
		badge: 'Bestseller',
		blurb: 'A dozen red roses with a box of premium chocolates — the classic combo.',
		description:
			'Our Classic Red Roses paired with a 16-piece box of premium assorted chocolates, arranged in a keepsake gift box with ribbon. The combo our customers order most for anniversaries and Valentine’s week.',
		stems: '12 red roses + 16 chocolates',
		stemsCount: 12,
		size: 'Classic hamper',
		vase: 'Gift box included',
		category: 'hamper',
		vaseLife: '7–10 days',
		tierLabels: ['Classic', 'Deluxe', 'Grand'],
		tierStems: ['12 roses + 16 chocolates', '18 roses + 24 chocolates + candle', '24 roses + 32 chocolates + candle + teddy']
	},
	{
		id: 'cake-flowers-combo',
		name: 'Cake & Flowers Combo',
		price: 2199,
		rating: 4.8,
		reviews: 58,
		image: 'hamper-cake-flowers',
		occasions: ['birthday', 'congratulations'],
		flowers: ['Mixed'],
		blurb: 'A half-kilo celebration cake with a pastel bouquet — birthday, sorted.',
		description:
			'A half-kilo chocolate-truffle cake (eggless on request) with a cheerful pastel bouquet and candles. Order by 2pm for same-day birthday delivery anywhere in Mumbai.',
		stems: 'Pastel bouquet + ½ kg cake',
		stemsCount: 14,
		size: 'Classic combo',
		vase: 'Gift box included',
		category: 'hamper',
		vaseLife: '7–10 days',
		tierLabels: ['Classic', 'Deluxe', 'Grand'],
		tierStems: ['½ kg cake + bouquet', '1 kg cake + bouquet + chocolates', '2 kg cake + grand bouquet + chocolates']
	},
	{
		id: 'dry-fruit-lily-hamper',
		name: 'Dry Fruit & Lily Hamper',
		price: 2999,
		rating: 4.9,
		reviews: 43,
		image: 'hamper-dry-fruit',
		occasions: ['congratulations', 'just-because'],
		flowers: ['White Lilies'],
		blurb: 'Premium dry fruits with white lilies — the elegant festive gift.',
		description:
			'A curated basket of roasted almonds, cashews, pistachios and dates with a serene white lily arrangement. Our go-to for Diwali, housewarmings and corporate festive gifting.',
		stems: 'White lilies + 1 kg dry fruits',
		stemsCount: 6,
		size: 'Classic hamper',
		vase: 'Basket included',
		category: 'hamper',
		vaseLife: '7–10 days',
		tierLabels: ['Classic', 'Deluxe', 'Grand'],
		tierStems: ['1 kg dry fruits + lilies', '1.5 kg dry fruits + lilies + chocolates', '2 kg dry fruits + grand lilies + chocolates']
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
		name: 'Priya Sharma',
		occasion: 'Anniversary',
		rating: 5,
		text: 'Ordered the Blush Elegance for our tenth anniversary and my husband actually teared up. The lilies were still opening a week later. This is our florist now.'
	},
	{
		name: 'Arjun Mehta',
		occasion: 'Birthday',
		rating: 5,
		text: 'Same-day delivery saved me — ordered at 11am, flowers at my mum’s door by 3pm, and she called me crying happy tears. The card was hand-written, exactly as I wrote it.'
	},
	{
		name: 'Kavya Nair',
		occasion: 'Just Because',
		rating: 5,
		text: 'I send myself the subscription box every month now. The peonies in May were unreal. It is the one treat I never cancel.'
	},
	{
		name: 'Rahul Desai',
		occasion: 'Congratulations',
		rating: 4.5,
		text: 'Sent Sunshine Delight to a colleague who got promoted. Bright, fresh, and the kraft wrapping looked far more expensive than the price. Will order again.'
	},
	{
		name: 'Ananya Iyer',
		occasion: 'Sympathy',
		rating: 5,
		text: 'They handled a sympathy order with such gentleness — called to confirm the delivery time, no fuss, beautiful white lilies. Thank you for making a hard day softer.'
	},
	{
		name: 'Vikram Kapoor',
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

// --- Round-2: PDP add-ons (unchecked by default, never pre-ticked) ---
export type Addon = { id: string; name: string; price: number; blurb: string };

export const addons: Addon[] = [
	{ id: 'vase', name: 'Premium glass vase', price: 349, blurb: 'So it is ready to display the moment it arrives' },
	{ id: 'chocolates', name: 'Box of 8 chocolates', price: 499, blurb: 'Assorted premium chocolates in a gift box' },
	{ id: 'balloon', name: 'Foil balloon', price: 299, blurb: '“Happy Birthday” or “Congratulations” foil balloon' },
	{ id: 'teddy', name: 'Plush teddy bear', price: 449, blurb: 'A soft 30 cm teddy, perfect with any bouquet' },
	{ id: 'wrap', name: 'Luxury gift wrap', price: 149, blurb: 'Gold-foil wrap with a hand-tied ribbon' }
];

// --- Round-2: delivery zones by PIN prefix (mock). ---
// Check a 6-digit Mumbai PIN before the customer falls in love with a bouquet.
export type DeliveryZone = {
	area: string;
	prefixes: string[];
	fee: number;
	cutoff: string;
	note: string;
};

export const deliveryZones: DeliveryZone[] = [
	{ area: 'Bandra West', prefixes: ['400050', '400052'], fee: 0, cutoff: '2pm', note: 'Same-day, free delivery' },
	{ area: 'Bandra East & Khar', prefixes: ['400051', '400054', '400055'], fee: 99, cutoff: '2pm', note: 'Same-day delivery' },
	{ area: 'Andheri & Juhu', prefixes: ['400053', '400049', '400058', '400069'], fee: 99, cutoff: '1pm', note: 'Same-day delivery' },
	{ area: 'South Mumbai', prefixes: ['400001', '400002', '400005', '400007', '400021', '400026'], fee: 149, cutoff: '12pm', note: 'Same-day or next morning' },
	{ area: 'Powai & Hiranandani', prefixes: ['400076'], fee: 149, cutoff: '12pm', note: 'Same-day or next morning' },
	{ area: 'Rest of Mumbai', prefixes: ['400'], fee: 199, cutoff: '12pm', note: 'Next-day delivery' }
];

export function zoneForPin(pin: string): DeliveryZone | null {
	if (!/^\d{6}$/.test(pin)) return null;
	const hit = deliveryZones.find((z) => z.prefixes.some((p) => pin.startsWith(p)));
	return hit ?? deliveryZones[deliveryZones.length - 1];
}

// --- Round-2: Mumbai delivery-area pages (local SEO) ---
export type Area = {
	id: string;
	name: string;
	pin: string;
	fee: number;
	cutoff: string;
	blurb: string;
	landmarks: string[];
	image: string;
};

export const areas: Area[] = [
	{
		id: 'bandra-west',
		name: 'Bandra West',
		pin: '400 050',
		fee: 0,
		cutoff: '2pm',
		blurb: 'Our home ground — same-day delivery, free, from the Linking Road shop to every lane of Bandra West.',
		landmarks: ['Lilavati Hospital', 'Bandra–Worli Sea Link', 'Pali Hill', 'Carter Road'],
		image: 'occasion-birthday'
	},
	{
		id: 'andheri-west',
		name: 'Andheri West',
		pin: '400 053',
		fee: 99,
		cutoff: '1pm',
		blurb: 'Same-day delivery across Andheri West and Juhu — from Lokhandwala to the beach, flowers in a few hours.',
		landmarks: ['Juhu Beach', 'Kokilaben Hospital', 'Lokhandwala', 'Versova'],
		image: 'occasion-just-because'
	},
	{
		id: 'south-mumbai',
		name: 'South Mumbai',
		pin: '400 001',
		fee: 149,
		cutoff: '12pm',
		blurb: 'Colaba to Dadar — heritage hotels, offices and homes, delivered same day or first thing next morning.',
		landmarks: ['Taj Mahal Palace', 'Breach Candy Hospital', 'Horniman Circle', 'Worli Sea Face'],
		image: 'occasion-congratulations'
	},
	{
		id: 'powai',
		name: 'Powai',
		pin: '400 076',
		fee: 149,
		cutoff: '12pm',
		blurb: 'Powai and Hiranandani Gardens — same-day or next-morning delivery for homes, offices and the lakefront.',
		landmarks: ['Powai Lake', 'Hiranandani Gardens', 'IIT Bombay', 'Galleries & offices'],
		image: 'occasion-love'
	}
];

// --- Round-2: blog / care guides ---
export type BlogPost = {
	slug: string;
	title: string;
	excerpt: string;
	image: string;
	date: string;
	readMins: number;
	category: string;
	body: string[];
};

export const blogPosts: BlogPost[] = [
	{
		slug: 'how-to-care-for-cut-roses',
		title: 'How to Care for Cut Roses (So They Last 10 Days)',
		excerpt: 'Trim, fresh water, shade — the three-minute routine that keeps your roses opening for a week and more.',
		image: 'blog-care-roses',
		date: '12 Nov 2026',
		readMins: 4,
		category: 'Care Guide',
		body: [
			'Roses arrive thirsty. The moment they reach you, trim 2 cm off each stem at a 45° angle under running water — the angle keeps the stem from sitting flat on the vase bottom, so it can drink.',
			'Use a clean vase, lukewarm water, and the flower food sachet we include. Change the water every two days and re-trim the stems each time; cloudy water is the fastest way to kill a bouquet.',
			'Keep roses out of direct sun and away from fruit bowls — ripening fruit releases ethylene, which ages roses fast. A cool room with indirect light is ideal.',
			'Remove any leaves below the waterline (they rot) and pull off outer petals as they fade. With this routine, our red roses regularly last 10 days in Mumbai homes.'
		]
	},
	{
		slug: 'best-flowers-for-a-mumbai-wedding',
		title: 'Best Flowers for a Mumbai Wedding: A Florist’s Guide',
		excerpt: 'Roses, jasmine, marigolds and orchids — what holds up in December humidity and what to order when.',
		image: 'blog-wedding-guide',
		date: '28 Oct 2026',
		readMins: 6,
		category: 'Weddings',
		body: [
			'Start with the season. December to February is Mumbai’s kindest wedding window: roses, lilies and orchids hold their shape, and jasmine is at its most fragrant in the evening.',
			'For the mandap and stage, mix marigolds (for colour and tradition) with white roses and tuberoses (for scent). Marigolds are the workhorse — cheap, bright, and they survive a long ceremony without wilting.',
			'For bridal bouquets, choose flowers that photograph well and travel well: white roses, peonies in season, and phalaenopsis orchids. Avoid delicate sweet peas for outdoor afternoon ceremonies.',
			'Order the conversation early. Our wedding team likes 6–8 weeks for a full wedding — a tasting of styles, a venue visit, and a backup plan for the one flower that will inevitably be out of season.'
		]
	},
	{
		slug: 'how-long-do-cut-flowers-last',
		title: 'How Long Do Cut Flowers Last? Vase Life by Variety',
		excerpt: 'Roses 7–10 days, tulips 5–7, orchids 2–3 months — the honest vase-life chart for every flower we sell.',
		image: 'blog-vase-life',
		date: '5 Nov 2026',
		readMins: 5,
		category: 'Care Guide',
		body: [
			'Roses and lilies: 7–10 days. Sunflowers: 7–10 days, and they keep turning towards the light, which is half the charm. Tulips: 5–7 days — they keep growing in the vase, so give them room.',
			'Peonies: 5–7 days of pure drama, but only in season. Lavender dries beautifully and keeps its scent for months after the fresh flowers fade.',
			'Orchid plants are the outlier: 2–3 months of blooms with a weekly ice cube and bright indirect light. They are the longest-lasting gift we sell, by far.',
			'Whatever the variety, the rules are the same: clean vase, fresh water every two days, trim the stems, keep out of sun and away from fruit. And if anything arrives less than perfect, call us within 48 hours — we replace it free.'
		]
	}
];

// --- Round-2: per-product reviews (visible on the PDP; genuine mock reviews) ---
export type ProductReview = { name: string; date: string; rating: number; text: string };

export const productReviews: Record<string, ProductReview[]> = {
	'classic-red-roses': [
		{ name: 'Vikram Kapoor', date: '2 Nov 2026', rating: 5, text: 'Long stems, deep colour, lasted twelve days. My wife has already told me what to order next month.' },
		{ name: 'Meera Joshi', date: '18 Oct 2026', rating: 5, text: 'Ordered at 10am, delivered by 2pm in Bandra. The black wrap looked far more premium than the price.' }
	],
	'blush-elegance': [
		{ name: 'Priya Sharma', date: '28 Oct 2026', rating: 5, text: 'Ordered for our tenth anniversary — the lilies were still opening a week later. This is our florist now.' },
		{ name: 'Sana Sheikh', date: '9 Oct 2026', rating: 4, text: 'Beautiful and fragrant. One lily was slightly bruised, but the shop replaced it the same day.' }
	],
	'sunshine-delight': [
		{ name: 'Rahul Desai', date: '21 Oct 2026', rating: 5, text: 'Sent to a colleague who got promoted. Bright, fresh, and the kraft wrapping looked expensive.' },
		{ name: 'Neha Agarwal', date: '3 Nov 2026', rating: 5, text: 'The sunflowers were huge and cheerful. My mother-in-law has asked for the same bouquet twice.' }
	],
	'tulip-bliss': [
		{ name: 'Kavya Nair', date: '14 Oct 2026', rating: 5, text: 'The tulips opened slowly over a week — so lovely to watch. Perfect spring gift.' },
		{ name: 'Amit Verma', date: '30 Sep 2026', rating: 4, text: 'Fresh and light. Wish the Deluxe size was a little fuller, but the Standard is great value.' }
	],
	'lavender-dreams': [
		{ name: 'Ananya Iyer', date: '25 Oct 2026', rating: 5, text: 'The scent filled the whole room. A gentle, calming bouquet — exactly what we needed.' },
		{ name: 'Farah Khan', date: '11 Oct 2026', rating: 5, text: 'Beautifully arranged, and the lavender dried wonderfully afterwards. Will reorder.' }
	],
	'peony-cloud': [
		{ name: 'Kavya Nair', date: '19 May 2026', rating: 5, text: 'The peonies in May were unreal — cloud-soft and barely open, just as described.' },
		{ name: 'Rohan Malhotra', date: '12 May 2026', rating: 5, text: 'Worth every rupee. My fiancée cried. Order early in the season, they sell out.' }
	],
	'orchid-grace': [
		{ name: 'Meera Joshi', date: '6 Nov 2026', rating: 5, text: 'Still blooming after two months with just a weekly ice cube. The ceramic pot is gorgeous.' },
		{ name: 'Sanjay Patel', date: '22 Oct 2026', rating: 5, text: 'Bought for my office desk — it has survived me, which says everything.' }
	],
	'birthday-burst': [
		{ name: 'Arjun Mehta', date: '31 Oct 2026', rating: 5, text: 'Same-day delivery saved me — ordered at 11am, flowers at my mum’s door by 3pm.' },
		{ name: 'Divya Reddy', date: '17 Oct 2026', rating: 5, text: 'So joyful and bright. The hand-written card was the perfect touch.' }
	],
	'white-lily-serenity': [
		{ name: 'Ananya Iyer', date: '8 Nov 2026', rating: 5, text: 'Dignified and fragrant. The florist called to confirm the delivery time — such care.' },
		{ name: 'Grace D’Souza', date: '27 Sep 2026', rating: 5, text: 'Elegant white lilies, exactly as pictured. Delivered with great care.' }
	],
	'pastel-surprise': [
		{ name: 'Neha Agarwal', date: '29 Oct 2026', rating: 5, text: 'The florist’s choice was perfect — pinks, peaches and creams, and the vase was included.' },
		{ name: 'Karan Bedi', date: '15 Oct 2026', rating: 4, text: 'Lovely surprise bouquet. Colours vary with the day, which is part of the fun.' }
	],
	'pink-romance': [
		{ name: 'Sana Sheikh', date: '4 Nov 2026', rating: 5, text: 'Deep-pink roses with baby’s breath — romance without the cliché. He loved it.' },
		{ name: 'Vikram Kapoor', date: '20 Sep 2026', rating: 5, text: 'Softer than red roses and somehow more personal. My go-to now.' }
	],
	'sympathy-bloom': [
		{ name: 'Ananya Iyer', date: '12 Nov 2026', rating: 5, text: 'Handled with such gentleness — no fuss, beautiful white lilies. Thank you for making a hard day softer.' },
		{ name: 'David D’Souza', date: '5 Oct 2026', rating: 5, text: 'A quiet, respectful tribute. Delivered on time with a blank card for our words.' }
	],
	'monstera-deliciosa': [
		{ name: 'Rohan Malhotra', date: '1 Nov 2026', rating: 5, text: 'The monstera is thriving on my balcony. The white pot looks straight out of a magazine.' },
		{ name: 'Priya Sharma', date: '19 Oct 2026', rating: 4, text: 'Healthy plant, well packed. A little smaller than expected in Small — go Medium.' }
	],
	'snake-plant': [
		{ name: 'Sanjay Patel', date: '26 Oct 2026', rating: 5, text: 'Nearly impossible to kill, as promised. It has survived my office and my forgetfulness.' },
		{ name: 'Meera Joshi', date: '13 Oct 2026', rating: 5, text: 'Sculptural and elegant. The terracotta pot suits our home perfectly.' }
	],
	'money-plant': [
		{ name: 'Divya Reddy', date: '30 Oct 2026', rating: 5, text: 'Trailing beautifully already. My grandmother approves — good luck in a pot.' },
		{ name: 'Amit Verma', date: '8 Oct 2026', rating: 5, text: 'Great housewarming gift. Arrived healthy with clear care instructions.' }
	],
	'roses-chocolate-hamper': [
		{ name: 'Vikram Kapoor', date: '3 Nov 2026', rating: 5, text: 'The anniversary classic. Roses perfect, chocolates gone in a day.' },
		{ name: 'Sana Sheikh', date: '21 Oct 2026', rating: 5, text: 'The keepsake box is lovely — we still use it. The combo feels very premium.' }
	],
	'cake-flowers-combo': [
		{ name: 'Arjun Mehta', date: '2 Nov 2026', rating: 5, text: 'Birthday sorted in one order — cake, flowers and candles, all delivered by 3pm.' },
		{ name: 'Neha Agarwal', date: '24 Oct 2026', rating: 5, text: 'The truffle cake was delicious and the pastel bouquet matched it perfectly.' }
	],
	'dry-fruit-lily-hamper': [
		{ name: 'Rahul Desai', date: '28 Oct 2026', rating: 5, text: 'Our Diwali gift to clients this year. Elegant, generous, and the lilies were stunning.' },
		{ name: 'Karan Bedi', date: '10 Oct 2026', rating: 5, text: 'Premium dry fruits, beautiful basket. Perfect for festive gifting.' }
	]
};

export const careByCategory: Record<Product['category'], string> = {
	bouquet:
		'Trim 2 cm off each stem at a 45° angle, place in a clean vase with lukewarm water and the flower food sachet, change the water every two days, and keep out of direct sun and away from fruit bowls.',
	plant:
		'Bright indirect light, water once a week (less in winter), and wipe the leaves with a damp cloth now and then. Every plant ships with a care card.',
	hamper:
		'Enjoy the treats first, then trim the stems at a 45° angle and place the bouquet in a clean vase with fresh water. Change the water every two days.'
};

export const heroProduct = products[0];
export const bestsellers = products.slice(0, 3);
export const plantPicks = products.filter((p) => p.category === 'plant');
export const hamperPicks = products.filter((p) => p.category === 'hamper');
export const freeDeliveryOver = 999;
export const deliveryFee = 199;
export const sameDayCutoff = '2pm';
