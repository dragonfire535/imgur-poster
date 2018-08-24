# Imgur Poster
[![Build Status](https://travis-ci.org/dragonfire535/imgur-poster.svg?branch=master)](https://travis-ci.org/dragonfire535/imgur-poster)
[![Discord Server](https://discordapp.com/api/guilds/252317073814978561/embed.png)](https://discord.gg/sbMe32W)
[![Donate on Patreon](https://img.shields.io/badge/patreon-donate-orange.svg)](https://www.patreon.com/dragonfire535)
[![Donate on PayPal](https://img.shields.io/badge/paypal-donate-blue.svg)](https://www.paypal.me/dragonfire535)

Imgur Poster is a Discord Webhook coded in JavaScript with
[discord.js](https://discord.js.org/). It posts Imgur images from an album to a
webhook on an interval you define in your `process.env`, and stores their IDs
so they won't be sent again. When it runs out, it clears the array and goes
from the top.

## Licensing
The bot is licensed under the GPL 3.0 license. See the file `LICENSE` for more
information. If you plan to use any part of this source code in your own bot, I
would be grateful if you would include some form of credit somewhere.
