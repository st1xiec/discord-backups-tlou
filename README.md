# Discord backup Бот для проекта "The Last of Us" на FiveM

## Описание

Этот Discord-бот был специально создан для поддержки проекта "The Last of Us" на платформе FiveM. Бот предоставляет разнообразные функциональные возможности и инструменты, которые облегчают взаимодействие участников проекта, администрации и игроков на вашем сервере Discord.


## Содержание

- [Описание](#описание)
- [Функциональность](#функциональность)
- [Установка](#установка)
- [Команды](#команды)
- [Примеры использования](#примеры-использования)
- [Содействие](#содействие)
- [Лицензия](#лицензия)
- [Поддержка](#поддержка)


## Функциональность

- Этот бот предоставляет следующие ключевые функции и инструменты для проекта "The Last of Us" на FiveM:
- Создание бекапов сервера.
- Восстановление бекапов сервера.
- Информация о бекапах.
- Удаление устаревших бекапов автоматически.
- Другие команды и функции, специфические для вашего проекта.


## Установка

- Установка и настройка
- Для начала работы с ботом на сервере, выполните следующие шаги:

Клонируйте репозиторий: Склонируйте репозиторий с кодом бота на ваш сервер.

```shell
git clone https://github.com/st1xiec/discord-backups-tlou.git
```
- Установите зависимости: Перейдите в папку с ботом и установите необходимые зависимости.

```shell
cd ваш-репозиторий
```

```shell
npm install
```
- Настройте конфигурацию: Создайте файл config.json и укажите в нем параметры конфигурации для бота, такие как токен, префикс команд и другие настройки.

```json
{
    "token": "ТОКЕН_ВАШЕГО_БОТА",
    "prefix": "!"
    // Другие параметры конфигурации
}
```
- Отредактируйте файл **backup-cleaner.js** для настройки параметров бекапов. Важно указать следующие параметры:

- **YOUR SERVER ID:** Замените на идентификатор вашего Discord-сервера, для которого будут создаваться бекапы.
- **webhookURL:** Замените на URL вашего вебхука Discord, который будет использоваться для отправки уведомлений о создании и удалении бекапов.

- Пример настройки **backup-cleaner.js:**

```js
const myGuild = client.guilds.cache.get('YOUR SERVER ID');
const webhookURL = 'YOUR webhookURL';
```
- Отредактируйте файл **create-backup.js** для настройки параметров бекапов. Важно указать следующие параметры:

- Замените **'YOUR_WEBHOOK_ID'** на идентификатор вашего вебхука Discord, и **'YOUR_WEBHOOK_TOKEN'** на токен вашего вебхука Discord.

```js
const webhookID = 'YOUR_WEBHOOK_ID'; // Замените YOUR_WEBHOOK_ID на идентификатор вебхука
const webhookToken = 'YOUR_WEBHOOK_TOKEN'; // Замените YOUR_WEBHOOK_TOKEN на токен вебхука
const webHookClient = new Discord.WebhookClient(webhookID, webhookToken);
```

- Запустите бота: Запустите бота на вашем сервере.

```shell
node index.js
```

- Теперь бот настроен для регулярного создания и удаления бекапов на вашем Discord-сервере, а также отправки уведомлений через вебхук.

- Если у вас возникли вопросы или проблемы с установкой, обратитесь к разделу **"Содействие"** для получения дополнительной информации и поддержки.

## Команды

- **!create-backup: Создает** бекап текущего состояния сервера.
- **!load-backup <ID-бекапа>:** Восстанавливает сервер из указанного бекапа.
- **!info-backup <ID-бекапа>:** Показывает информацию о бекапе, включая дату создания и размер.
- **!delete-backup <ID-бекапа>:** Удаляет бекап по его ID.

## Примеры использования:

- Пример 1: Создание бекапа сервера
```shell
!create-backup
```
- Пример 2: Восстановление бекапа сервера
```shell
!load-backup <ID-бекапа>
```
- Пример 3: Получение информации о бекапе
```shell
!info-backup <ID-бекапа>
```
- Пример 4: Удаление бекапа
```shell
!delete-backup <ID-бекапа>
```
## Содействие

Если вы хотите внести вклад в развитие этого бота или улучшить его функциональность для проекта "The Last of Us" на FiveM, мы приветствуем ваше участие! Ваше содействие может включать в себя следующие действия:

1. **Создание запросов на объединение (Pull Requests):** Если у вас есть идеи или улучшения для кода бота, вы можете создать запрос на объединение, чтобы предложить свои изменения. Убедитесь, что ваш код соответствует стандартам и тестам перед отправкой запроса.

2. **Сообщение об ошибках (Issues):** Если вы обнаружили ошибку или имеете предложения по улучшению, создайте соответствующий issue. Пожалуйста, предоставьте подробное описание проблемы и, если возможно, шаги для воспроизведения.

3. **Тестирование:** Помогите в тестировании бота, проверьте его функциональность и предоставьте обратную связь о любых проблемах.

4. **Документация:** Если вы обладаете навыками документации, вы можете помочь улучшить документацию бота, чтобы сделать ее более информативной и понятной для других пользователей.

***Спасибо за ваш интерес к боту и проекту "The Last of Us" на FiveM!***


## Лицензия

***Этот проект лицензирован в соответствии с лицензией MIT. См. [LICENSE](LICENSE)***


## Поддержка

Если вы цените мой труд и хотели бы поддержать развитие этого бота для проекта "The Last of Us" на FiveM, вы можете сделать пожертвование в криптовалюте. Ваша поддержка будет очень ценной и поможет в дальнейшем улучшении функциональности и качества бота.

### Bitcoin (BTC)

Адрес для пожертвований в Bitcoin: bc1qyzad2wszc6uznq2s66lult085l7vkzfpamqwtj

### Ethereum (ETH)

Адрес для пожертвований в Ethereum: 0xfa29710f48DB349C59d5F4b99064a979a33A4590

### Tether (USDT)

Адрес для пожертвований в Tether (TRC20): TSDMfRcHu1R5Z8uCHgP5VeR8E6QknKfYoP

