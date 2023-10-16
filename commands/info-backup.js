const Discord = require('discord.js');
const backup = require('discord-backup');

exports.run = async (client, message, args) => {
    // Проверка на наличие прав у пользователя
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send('❌ У вас должны быть права "Управление сообщениями" для создания бекапа на этом сервере.');
    }

    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send('❌ Пожалуйста, укажите действительный ID бекапа!');

    backup.fetch(backupID).then((backup) => {
        const date = new Date(backup.data.createdTimestamp);
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        const embed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Информация о бекапе')
            .setThumbnail(backup.data.iconURL)
            .addField('Название сервера', backup.data.name)
            .addField('Размер', backup.size + ' кб')
            .addField('Создан', formattedDate)
            .setFooter('ID бекапа: ' + backup.id);

        return message.channel.send(embed);

    }).catch((err) => {
        if (err === 'No backup found')
            return message.channel.send('❌ Нет информации о бекапе с ID ' + backupID + '!');
        else
            return message.channel.send('❌ Произошла ошибка: ' + (typeof err === 'string') ? err : JSON.stringify(err));
    });
};
