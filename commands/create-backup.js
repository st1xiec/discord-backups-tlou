const Discord = require('discord.js');
const backup = require('discord-backup');
const config = require('../config.json');
const db = require('../database.js'); // Импортируем модуль базы данных

exports.run = async (client, message, args) => {
    // Проверка на наличие прав у пользователя
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        const noPermissionsEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Недостаточно прав')
            .setDescription('Для создания бекапа сервера вам необходимо разрешение "Администратор".')
            .setFooter('Команду вызвал: ' + message.author.tag);
        return message.channel.send(noPermissionsEmbed);
    }

    try {
        const existingBackups = await db.getBackupsByGuild(message.guild.id);

        // Удаляем предыдущий бекап, если он существует
        if (existingBackups && existingBackups.length > 0) {
            for (const existingBackup of existingBackups) {
                await backup.remove(existingBackup.id);
                db.deleteBackup(existingBackup.id);
            }
        }

        // Получаем текстовые каналы без сообщений от участников
        const textChannels = message.guild.channels.cache.filter(
            (channel) => channel.type === 'text' && !channel.deleted
        );

        // Создаем новый бекап
        const backupData = await backup.create(message.guild, {
            maxMessagesPerChannel: 0, // Устанавливаем максимальное количество сообщений на канал в 0, чтобы исключить сообщения
            textChannelIDs: textChannels.map((channel) => channel.id), // Используем только ID текстовых каналов
        });

        // Отправляем ID бекапа через вебхук
        const webhookID = 'YOUR_WEBHOOK_ID'; // Замените YOUR_WEBHOOK_ID на идентификатор вебхука
        const webhookToken = 'YOUR_WEBHOOK_TOKEN'; // Замените YOUR_WEBHOOK_TOKEN на токен вебхука
        const webHookClient = new Discord.WebhookClient(webhookID, webhookToken);

        if (webHookClient) {
            const idEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('ID Нового Бекапа')
                .setDescription(`ID нового бекапа: \`${backupData.id}\``);
            webHookClient.send(idEmbed);
        } else {
            console.error('Webhook not found');
        }

        // Добавляем информацию о бекапе в базу данных
        db.addBackup(backupData.id, message.guild.id, Date.now() + 7 * 24 * 60 * 60 * 1000); // Добавляем 7 дней

        const successEmbed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Бекап сервера создан')
            .setDescription(`Бекап сервера успешно создан и сохранен на 7 дней!\nВы можете использовать \`${config.prefix}load-backup ${backupData.id}\` для восстановления этого бекапа на другом сервере.`)
            .addField('ID Бекапа', `\`${backupData.id}\``)
            .addField('Создан', `\`${new Date(backupData.createdTimestamp).toUTCString()}\``)
            .setFooter('Команду вызвал: ' + message.author.tag);
        message.channel.send(successEmbed);
    } catch (error) {
        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Ошибка')
            .setDescription('Произошла ошибка при создании бекапа. Пожалуйста, убедитесь, что бот имеет разрешение "Администратор".')
            .setFooter('Команду вызвал: ' + message.author.tag);
        message.channel.send(errorEmbed);
    }
};
