const { POSTER_ID, POSTER_TOKEN, POSTER_ALBUM, POSTER_TIME, IMGUR_KEY } = process.env;
const request = require('node-superfetch');
const used = new Set();
const time = Number.parseFloat(POSTER_TIME);

setInterval(async () => {
	try {
		const { body } = await request
			.get(`https://api.imgur.com/3/album/${POSTER_ALBUM}`)
			.set({ Authorization: `Client-ID ${IMGUR_KEY}` });
		if (!body.data.images.length) return;
		if (used.size === body.data.images.length) used.clear();
		const valid = body.data.images.filter(image => !used.has(image.id));
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
