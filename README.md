Описание фалов и папок:

compoments - вынес создание клавиатуры в отдельный файл;

core содержит 
    calculator - основная логика приложения 
    formatPercent - модуль для вывода цифр (решал проблему с выводом лишних значений вроде 0.00450000005);

services - вынес логику смены темы в отдельный сервис;

Для того чтобы запустить проект введите следующие команды :

1) npm install

2) npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader @babel/core @babel/preset-env style-loader css-loader

3) npm run start

3)* npm run build создаст bundle


