'use strict';

let p1 = document.createElement('p'),
    p2 = document.createElement('p'),
    p3 = document.createElement('p'),
    p4 = document.createElement('p'),
    body = document.getElementsByTagName('body'),
    days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

let nowDate = new Date();
console.log(nowDate);
if (nowDate.getHours() > 5 && nowDate.getHours() <= 12){
    p1.textContent = 'Доброе утро!';
} else if (nowDate.getHours() > 12 && nowDate.getHours() <= 17){
    p1.textContent = 'Добрый день!';
} else if (nowDate.getHours() > 17 && nowDate.getHours() <= 0){
    p1.textContent = 'Добрый вечер!';
} else {
    p1.textContent = 'Доброй ночи!';
}

p2.textContent = 'Сегодня: ' + days[nowDate.getDay()];

p3.textContent = 'Текущее время: ' + nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getSeconds();

let newYear = new Date('01 01 2021');
console.log(newYear);

p4.textContent = 'До нового года осталось ' + (Math.floor((newYear.getTime() - nowDate.getTime()) / 1000 / 60 / 60 / 24)) + ' дней';

document.body.append(p1);
document.body.append(p2);
document.body.append(p3);
document.body.append(p4);