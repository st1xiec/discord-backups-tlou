@echo off
:loop
echo Запускаем бот...
node index.js
echo Бот завершил работу. Перезапуск через 5 секунд...
ping -n 5 127.0.0.1 > nul
goto loop