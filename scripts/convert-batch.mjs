// Convert only the PNG masters named on the command line, e.g.
//   node scripts/convert-batch.mjs occasion-love.png product-red-roses.png
// Same output chain as convert-images.mjs (AVIF/WebP/JPG @ 480/800/1200/1600).
// Batching keeps memory/CPU bounded on the small VM.
import { mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = new URL('../static/images/original/', import.meta.url);
const OUT = new URL('../static/images/', import.meta.url);
const WIDTHS = [480, 800, 1200, 1600];

const files = process.argv.slice(2);
if (files.length === 0) {
	console.log('Usage: node scripts/convert-batch.mjs <file.png> [...]');
	process.exit(1);
}
await mkdir(OUT, { recursive: true });

for (const file of files) {
	const { name } = parse(file);
	const input = join(SRC.pathname, file);
	for (const width of WIDTHS) {
		const base = sharp(input).resize(width, null, { withoutEnlargement: true });
		await base.clone().avif({ quality: 50 }).toFile(join(OUT.pathname, `${name}-${width}.avif`));
		await base.clone().webp({ quality: 80 }).toFile(join(OUT.pathname, `${name}-${width}.webp`));
		await base
			.clone()
			.flatten({ background: '#fdf9f4' })
			.jpeg({ quality: 84 })
			.toFile(join(OUT.pathname, `${name}-${width}.jpg`));
	}
	console.log(`✓ ${name}`);
}
console.log(`Done — ${files.length} master(s) converted.`);
