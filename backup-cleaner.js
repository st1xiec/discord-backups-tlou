const cron = require('node-cron');
const db = require('./database.js');
const backup = require('discord-backup');
const fetch = require('node-fetch');

// 24 h
module.exports = (client) => {
    cron.schedule('0 0 * * *', async () => {
        const now = Date.now();

        db.getBackupsByGuild(null, async (backups) => {
            backups.forEach(async (backupData) => {
                if (backupData.date <= now) {
                    try {
                        await backup.remove(backupData.id);
                        db.deleteBackup(backupData.id);

                        const webhookURL = 'YOUR webhookURL';
                        await fetch(webhookURL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                embeds: [
                                    {
                                        title: 'Backup Deleted',
                                        color: 0xFF0000, // Красный цвет
                                        description: `Backup with ID ${backupData.id} has been deleted due to expiration.`,
                                    },
                                ],
                            }),
                        });
                    } catch (error) {
                        console.error('Error deleting backup: ' + error);
                    }
                }
            });
        });

        try {
            const myGuild = client.guilds.cache.get('YOUR SERVER ID');
            if (!myGuild) {
                console.error('Guild not found');
                return;
            }

            const backupData = await backup.create(myGuild);

            db.addBackup(backupData.id, myGuild.id, Date.now() + 7 * 24 * 60 * 60 * 1000);

            const webhookURL = 'webhookURL';
            await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    embeds: [
                        {
                            title: 'Backup Created',
                            color: 0x00FF00, // Зеленый цвет
                            description: `Backup with ID ${backupData.id} has been successfully created.`,
                        },
                    ],
                }),
            });
        } catch (error) {
            console.error('Error creating backup: ' + error);
        }
    });
};
