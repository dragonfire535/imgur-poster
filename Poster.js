const { POSTER_ID, POSTER_TOKEN, POSTER_ALBUM_ID, POSTER_TIME, IMGUR_KEY } = process.env;
const request = require('node-superfetch');
const used = new Set();
const time = Number.parseFloat(POSTER_TIME) || 1.8e+6;
let cache = null;

setInterval(async () => {
	try {
		let images;
		if (cache && used.size !== cache.length) {
			images = cache;
		} else {
			const { body } = await request
				.get(`https://api.imgur.com/3/album/${POSTER_ALBUM_ID}`)
				.set({ Authorization: `Client-ID ${IMGUR_KEY}` });
			if (!body.data.images.length) return;
			if (body.data.images.length === used.size) used.clear();
			images = body.data.images;
			cache = images;
		}
		const valid = images.filter(image => !used.has(image.id));
		const image = valid[Math.floor(Math.random() * valid.length)];
		await request
			.post(`https://discordapp.com/api/webhooks/${POSTER_ID}/${POSTER_TOKEN}`)
			.send({ content: image.link });
		used.add(image.id);
		console.log('[IMGUR POSTER] Posted image', image.id);
	} catch (err) {
		console.error('[IMGUR POSTER]', err);
	}
}, time);
