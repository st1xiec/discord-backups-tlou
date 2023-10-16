const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('backups.db');

// Создание таблицы для хранения информации о бекапах
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS backups (id TEXT PRIMARY KEY, guildId TEXT, date INTEGER)");
});

module.exports = {
    // Добавление бекапа в базу данных
    addBackup: (id, guildId, date) => {
        db.run("INSERT INTO backups (id, guildId, date) VALUES (?, ?, ?)", id, guildId, date);
    },
    
    // Получение всех бекапов для конкретного сервера
    getBackupsByGuild: (guildId, callback) => {
        db.all("SELECT * FROM backups WHERE guildId = ?", guildId, (err, rows) => {
            if (err) {
                console.error(err);
                if (callback) callback([]); // Вернуть пустой массив в случае ошибки
            } else {
                if (callback) callback(rows); // Вернуть результаты запроса
            }
        });
    },

    // Удаление бекапа по его ID
    deleteBackup: (id) => {
        db.run("DELETE FROM backups WHERE id = ?", id);
    },
};
