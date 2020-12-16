const { prefix, redirectUrl } = require('./config.json');
const { token } = process.env.DISCORD_TOKEN;
const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
	console.log(`I am ready! Logged in as ${client.user.tag}!`);

	client.user.setActivity('Capture the Relic', { type: 'PLAYING' })
		.then(presence => console.log(`Activity set to '${presence.activities[0].name}'`))
		.catch(console.error);

	client.generateInvite({ permissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES', 'ADD_REACTIONS', 'EMBED_LINKS'] })
		.then(link => console.log(`Generated bot invite link: ${link}`));
});

client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const gameId = message.content.slice(prefix.length).trim();
	if (!gameId) {
		return message.reply('you didn\'t provide a valid game ID!');
	}
	const redirect = `${redirectUrl}${gameId}`;

	const exampleEmbed = new Discord.MessageEmbed()
		.setColor('4b53f3')
		.setTitle('Wololo')
		.setURL(redirect)
		.setDescription(`Join game: [${message.content}](${redirect})`)
		.setTimestamp()
		.setFooter('Converted', 'https://static.wikia.nocookie.net/ageofempires/images/f/f5/Converticon_aoe2de.png/revision/latest?cb=20200421154852');

	message.channel.send(exampleEmbed)
		.then(console.log)
		.catch(console.error);
});

client.login(token);
