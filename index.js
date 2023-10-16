const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
client.config = config;

/* Load all events */
fs.readdir('./events/', (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith('.js')) return;
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        console.log(`👌 Event loaded: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.commands = new Discord.Collection();

/* Load all commands */
fs.readdir('./commands/', (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split('.')[0];
        client.commands.set(commandName, props);
        console.log(`👌 Command loaded: ${commandName}`);
    });
});

client.once('ready', () => {
    console.log(`👌 Bot is ready. Logged in as ${client.user.tag}`);

    // Установите активность вашего бота здесь
    client.user.setActivity('🍂The Last of Us', { type: 'STREAMING', url: 'https://twitch.tv/stixiecc' });
});

// Включаем backup-cleaner.js
require('./backup-cleaner.js')(client);

// Login
client.login(config.token);
