const { prefix, token } = require('./config.json');
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

	const exampleEmbed = new Discord.MessageEmbed()
		.setTitle('Wololo')
		.setURL('http://localhost:8080')
		// .setDescription(`Link pls [${message.content}](${message.content})`)
		.setTimestamp()
		.setFooter('Convert', 'https://static.wikia.nocookie.net/ageofempires/images/f/f5/Converticon_aoe2de.png/revision/latest?cb=20200421154852');

	message.channel.send(exampleEmbed);
});

client.login(token);
