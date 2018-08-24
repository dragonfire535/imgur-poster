const { POSTER_ID, POSTER_TOKEN, POSTER_ALBUM, POSTER_TIME, IMGUR_KEY } = process.env;
const { WebhookClient } = require('discord.js');
const client = new WebhookClient(POSTER_ID, POSTER_TOKEN);
const request = require('node-superfetch');
const used = new Set();
const time = Number.parseFloat(POSTER_TIME);

client.setInterval(async () => {
	try {
		const { body } = await request
			.get(`https://api.imgur.com/3/album/${POSTER_ALBUM}`)
			.set({ Authorization: `Client-ID ${IMGUR_KEY}` });
		if (!body.data.images.length) return;
		if (used.size === body.length) used.clear();
		const valid = body.filter(image => !used.has(image.id));
		const image = valid[Math.floor(Math.random() * valid.length)];
		await client.send({ files: [image.link] });
		used.add(image.id);
	} catch (err) {
		return;
	}
}, time);
