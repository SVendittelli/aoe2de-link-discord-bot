const { prefix, redirectUrl } = require('./config.json');
const { token } = require('./token.json');
const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const gameId = message.content.slice(prefix.length).trim();
	if (!gameId || isNaN(gameId)) {
		return message.reply('you didn\'t provide a valid game ID!');
	}
	const redirect = `${redirectUrl}${gameId}`;

	const exampleEmbed = new Discord.MessageEmbed()
		.setColor('0000FF')
		.setTitle('Wololo')
		.setURL(redirect)
		.setDescription(`Join game: [${message.content}](${redirect})`)
		.setTimestamp()
		.setFooter('Converted', 'https://static.wikia.nocookie.net/ageofempires/images/f/f5/Converticon_aoe2de.png/revision/latest?cb=20200421154852');

	message.channel.send(exampleEmbed);
});

client.login(token);
