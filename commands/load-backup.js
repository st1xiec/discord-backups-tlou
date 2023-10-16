const Discord = require('discord.js');
const backup = require('discord-backup');
const db = require('../database.js'); 

exports.run = async (client, message, args) => {
    // Проверка на наличие прав у пользователя
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        const noPermissionsEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Недостаточно прав')
            .setDescription('Для восстановления бекапа на сервере вам необходимы права "Администратор".')
        return message.channel.send(noPermissionsEmbed);
    }

    const backupID = args.join(' ');

    try {
        const fetchedBackup = await backup.fetch(backupID);

        const confirmEmbed = new Discord.MessageEmbed()
            .setColor('#FFFF00')
            .setTitle('Подтверждение')
            .setDescription('Внимание! Восстановление бекапа приведет к удалению всех каналов, ролей и настроек сервера. Хотите продолжить? Отправьте `-confirm` или `cancel`!')
        message.channel.send(confirmEmbed);

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
            time: 60000,
            max: 1
        });

        collector.on('collect', async (m) => {
            const confirm = m.content === '-confirm';
            collector.stop();
            if (confirm) {
                try {
                    await backup.load(backupID, message.guild);

                    // Удаляем информацию о бекапе из базы данных
                    db.deleteBackup(backupID);

                    const successEmbed = new Discord.MessageEmbed()
                        .setColor('#00FF00')
                        .setTitle('Бекап загружен')
                        .setDescription('Бекап успешно восстановлен! Все каналы, роли и настройки были восстановлены.')
                    message.author.send(successEmbed);
                } catch (err) {
                    const errorEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Ошибка')
                        .setDescription('Произошла ошибка при восстановлении бекапа: ' + (typeof err === 'string' ? err : JSON.stringify(err)))
                    message.author.send(errorEmbed);
                }
            } else {
                const cancelEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Отменено')
                    .setDescription('Операция отменена.')
                message.channel.send(cancelEmbed);
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                const timeoutEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Тайм-аут')
                    .setDescription('Время на выполнение команды истекло. Повторите попытку.')
                message.channel.send(timeoutEmbed);
            }
        });
    } catch (err) {
        const noBackupEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Бекап не найден')
            .setDescription('Бекап с указанным ID ' + backupID + ' не найден.')
        message.channel.send(noBackupEmbed);
    }
};
